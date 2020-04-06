import express = require('express')
import yaml = require('js-yaml')
import path = require('path')
import fs = require('fs')
import session = require('express-session')
import redis = require('redis')
import RedisStore = require('connect-redis')
import logger = require('signale')
import https = require('https')
import pug = require('pug')
import passportLocal = require('passport-local')
const LocalStrategy = passportLocal.Strategy
// import http = require('http')

import { Application as ExApp, Request, Response, NextFunction } from 'express'
import { ISessionMode } from './interfaces/ISession'
import { IAuthenticationMode } from './interfaces/IAuthentication'
import passport = require('passport')
import morgan = require('morgan')
import { compare } from 'bcryptjs'
import { Configuration } from './Configuration'
import { IServerMode } from './interfaces/IServer'
import { SubEvent } from 'sub-events'
import { scanControllers } from './decorators/controller'
import { BaseController } from './decorators/base-controller'
import { getRouter } from './decorators/express'
import { HttpException } from './exceptions/HttpException'
import { createConnections, getRepository } from 'typeorm'


class Application {

    private app : ExApp = null
    private config : Configuration = new Configuration()

    readonly beforeStart: SubEvent<Application> = new SubEvent()
    readonly afterStart: SubEvent<Application> = new SubEvent()
    readonly onError: SubEvent<HttpException> = new SubEvent()
    protected logger = logger

    constructor(configFilename : string) {Application

        //binding function
        this.startInfo = this.startInfo.bind(this)

        this.config.setConfiguration(this.loadConfiguration(configFilename))

        if(this.config === null) {
            logger.fatal("Configuration file not valid or exist")
            process.exit(1)
        }

        this.app = express()
    }

    private loadConfiguration(filename : string) : Configuration {
        const extname = path.extname(filename).toLowerCase()        

        if(!fs.existsSync(filename)) return null

        const content = fs.readFileSync(filename).toString()

        if(extname === '.json') {
            return JSON.parse(content)
        } else if(extname === '.yaml') {
            return yaml.safeLoad(content)
        } else if(extname === '.js') {
            return require(filename)
        } else {
            return null
        }
    }

    public getConfig() : Configuration {
        return this.config
    }

    public getInstance() : ExApp {
        return this.app
    }

    private init() : void {

        this.logger = logger

        this.initHTTPLogger()
        this.initStatic()
        this.initBodyParser()
        this.initSession()
        this.initAuth()             
        this.initUI()        
        this.initController()       
        this.initNotFoundError()
        this.initErrorHandler()
    }



    private initNotFoundError() : void {
        this.app.use('*', (req : Request, res : Response) => {
            if(req.xhr)
                res.send({code: 404, message: 'Not Found'})
            else
                res.send(`
                    <html>
                        <body style="font-family:verdana">
                            404 - Page Not Found
                        </body>
                    </html>
                `)
        })
    }

    private initErrorHandler() : void { 
        this.app.use((err: HttpException, req: Request, res: Response, next: NextFunction) => {   

            this.onError.emit(err)
            res.status(500)


            if(this.config.env === 'development') {

                logger.fatal(err)

                if(req.xhr)
                    res.send(err)
                else
                    res.send(`
                        <html>
                            <body style="font-family:verdana">
                                500 - Internal Server Error
                            </body>
                        </html>
                    `)
            } else {

            }

            res.end()
        })
    }

    private initBodyParser() : void {
        const config = this.config.bodyParser

        if(!config) {
            logger.warn("Body Parser disabled")
            return
        } else {
            logger.success("Body Parser enabled")            
        }

        this.app.use(express.urlencoded({ extended: true, limit: '50mb', parameterLimit: 50000 }))
        this.app.use(express.json({ limit: '50mb' }))

        // if(config.json)
            // this.app.use(express.json({ limit: config.limit }))
            // this.app.use(express.json({ limit: '50m' }))
    
        // if(config.urlencoded)
            // this.app.use(express.urlencoded({ extended: config.extended, limit: config.limit, parameterLimit: config.parameterLimit }))

    }

    private initHTTPLogger() : void {
        const config = this.config.logger

        if(!config) {
            logger.warn("HTTP Logger disabled")
            return
        }

        if(config.enabled) {
            this.app.use(morgan(config.format))
            logger.success("HTTP Logger enabled")     
        } else {
            logger.warn("HTTP Logger disabled")
        }
    }

    private initUI() : void {
        const config = this.config.ui

        if(!config) {
            logger.warn("UI disabled")
            return
        } else {
            logger.success("UI enabled")            
        }

        if(config.enabled && !config.reverseProxy)
            this.app.use(express.static(config.path))
    }

    private initStatic() : void {
        const config = this.config.static

        if(!config) {
            logger.warn("Static disabled")
            return
        } else {
            logger.success("Static enabled")            
        }

        if(config.length > 0) {
            config.forEach(s => {
                this.app.use(s.mount, express.static(s.path))
            })
        }
    }

    private initAuth() : void {
        const config = this.config.authentication

        if(!config) {
            logger.warn("Auth disabled")
            return
        } else {
            logger.success("Auth enabled")            
        }

        if(config.enabled) {
            if(config.mode ==  IAuthenticationMode.session) {
                this.app.use(passport.initialize())
                this.app.use(passport.session())

                passport.deserializeUser((id, done) => {
                    done(null, id)
                })

                this.app.use((req, res, next) => {
                    if(req.isUnauthenticated()) {
                        res.redirect(config.sso.authURL)
                    } else {
                        next()
                    }
                })

            } else if(config.mode == IAuthenticationMode.local) {
                this.localAuth()
            } else {
                //sso
            }
        }
    }

    private registerLoginPage() {
        
        this.app.get('/login', (req, res) => {

            if(req.isAuthenticated()) return res.redirect('/')            

            const config = this.config.authentication.local
            // const filename = path.join(process.cwd(), config.loginPage)
            const html = pug.renderFile(config.loginPage)            
            res.send(html)
        })

        this.app.post('/login', passport.authenticate('local', {
            failureRedirect: '/login',
            failureFlash: 'Invalid username or password',
            successRedirect: '/'
        }), (req, res) => {
            res.redirect('/')
        })

        this.app.all('/logout', (req, res) => {
            req.session.destroy(_ => {
                req.logout()
                res.redirect('/login')
            })
        })

        this.app.use((req, res, next) => {            
            if(req.isAuthenticated()) {
                return next()
            } else {
                res.redirect('/login')
            }

        })

        this.app.get('/user', (req, res) => {
            res.send(req.user)
        })

    }

    private localAuth() {

        
        const config = this.config.authentication.local

        this.app.use(passport.initialize())
        this.app.use(passport.session())

        passport.use('local', new LocalStrategy((username, password, done) => {
            getRepository(config.userEntity).findOne({ username }).then(user => {
                
                if(!user) return done(null, false)

                compare(password, user['password'], (err, valid) => {                                        

                    if(err) return done(err, null)
                    
                    if(valid) {
                        delete user['password']
                        return done(null, user)
                    }

                    return done(null, false)
                })

            }).catch(err => {
                return done(err, null)
            })
        }))

        passport.serializeUser((user, done) => {
            return done(null, user)
        })

        passport.deserializeUser((user, done) => {
            return done(null, user)
        })

        this.registerLoginPage()

        
    }

    private initSession() {
        const config = this.config.session        
        let options : session.SessionOptions

        if(!config) {
            logger.warn("Session disabled")
            return
        } else {
            logger.success("Session enabled")            
        }

        if(config.enabled) {
            options = {
                secret: config.secret,
                resave: config.resave,
                saveUninitialized: config.saveUninitialized
            }

            if(config.mode === ISessionMode.redis) {
                const redisStore = RedisStore(session)
                
                options['store'] = new redisStore({ client: redis.createClient({
                    host: config.store.hostname,
                    port: config.store.port                    
                })})
            }

            this.app.use(session(options))
        }
    }

    private initController() {

        logger.start('Scanning controller')

        const dir : string = this.config.controller
        const controllers = scanControllers(dir)

        if(controllers.length > 0) {
            controllers.forEach( (controller: BaseController) => {
                const { basePath, router } = getRouter(controller)
                if( basePath && router ) {
                    this.app.use(basePath, router)
                }
            })            
        }
        logger.success(`Found ${controllers.length} controllers`)
    }

    private startInfo() : void {        
        logger.success(`Server running on ${this.config.server.mode}://${this.config.host}:${this.config.port}`)
        this.afterStart.emit(this)
    }
    
    private startServer() : void {
        
        const config = this.config.server

        const startHTTPS = () => {
            const options : https.ServerOptions = {
                key: fs.readFileSync(path.join(process.cwd(), config.key)),            
                cert: fs.readFileSync(path.join(process.cwd(), config.cert))
            }

            https
                .createServer(options, this.app)
                .listen(this.config.port, this.config.host, this.startInfo)
        }
        
        const startHTTP = () => {
            this.app.listen(this.config.port, this.config.host, this.startInfo)
        }

        const start = () => {
            if(config.mode === IServerMode.http)
                startHTTP()
            else if(config.mode === IServerMode.https)
                startHTTPS()
            else {
                logger.fatal("Can't start server")        
                process.exit(1)
            }
        }

        if(!this.config.databases) {
            start()    
        } else {
            createConnections(this.config.databases).then(_ => {
                start()
            })
        }
    }

    public start() : void {
        this.beforeStart.emit(this)
        this.init()                
        this.startServer()
        
    }

}

export { Application }