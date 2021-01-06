"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const flash = require("connect-flash");
const yaml = require("js-yaml");
const path = require("path");
const fs = require("fs");
const session = require("express-session");
const redis = require("redis");
const RedisStore = require("connect-redis");
const logger = require("signale");
const https = require("https");
const pug = require("pug");
const passportLocal = require("passport-local");
const LocalStrategy = passportLocal.Strategy;
const ISession_1 = require("./interfaces/ISession");
const IAuthentication_1 = require("./interfaces/IAuthentication");
const passport = require("passport");
const morgan = require("morgan");
const bcryptjs_1 = require("bcryptjs");
const Configuration_1 = require("./Configuration");
const IServer_1 = require("./interfaces/IServer");
const sub_events_1 = require("sub-events");
const controller_1 = require("./decorators/controller");
const express_1 = require("./decorators/express");
const typeorm_1 = require("typeorm");
const jwt = require('jsonwebtoken');
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
class Application {
    constructor(configFilename) {
        this.app = null;
        this.config = new Configuration_1.Configuration();
        this.beforeStart = new sub_events_1.SubEvent();
        this.afterStart = new sub_events_1.SubEvent();
        this.onError = new sub_events_1.SubEvent();
        this.logger = logger;
        Application;
        //binding function
        this.startInfo = this.startInfo.bind(this);
        this.config.setConfiguration(this.loadConfiguration(configFilename));
        if (this.config === null) {
            logger.fatal("Configuration file not valid or exist");
            process.exit(1);
        }
        this.app = express();
    }
    loadConfiguration(filename) {
        const extname = path.extname(filename).toLowerCase();
        if (!fs.existsSync(filename))
            return null;
        const content = fs.readFileSync(filename).toString();
        if (extname === '.json') {
            return JSON.parse(content);
        }
        else if (extname === '.yaml') {
            return yaml.safeLoad(content);
        }
        else if (extname === '.js') {
            return require(filename);
        }
        else {
            return null;
        }
    }
    getConfig() {
        return this.config;
    }
    getInstance() {
        return this.app;
    }
    init() {
        this.logger = logger;
        this.initHTTPLogger();
        this.initStatic();
        this.initBodyParser();
        this.initSession();
        this.initAuth();
        this.initUI();
        this.initController();
        this.initNotFoundError();
        this.initErrorHandler();
    }
    initNotFoundError() {
        this.app.use('*', (req, res) => {
            if (req.xhr)
                res.send({ code: 404, message: 'Not Found' });
            else
                res.send(`
                    <html>
                        <body style="font-family:verdana">
                            404 - Page Not Found
                        </body>
                    </html>
                `);
        });
    }
    initErrorHandler() {
        this.app.use((err, req, res, next) => {
            this.onError.emit(err);
            res.status(500);
            if (this.config.env === 'development') {
                logger.fatal(err);
                if (req.xhr)
                    res.send(err);
                else
                    res.send(`
                        <html>
                            <body style="font-family:verdana">
                                500 - Internal Server Error
                            </body>
                        </html>
                    `);
            }
            else {
            }
            res.end();
        });
    }
    initBodyParser() {
        const config = this.config.bodyParser;
        if (!config) {
            logger.warn("Body Parser disabled");
            return;
        }
        else {
            logger.success("Body Parser enabled");
        }
        this.app.use(express.urlencoded({ extended: true, limit: '50mb', parameterLimit: 50000 }));
        this.app.use(express.json({ limit: '50mb' }));
        // if(config.json)
        // this.app.use(express.json({ limit: config.limit }))
        // this.app.use(express.json({ limit: '50m' }))
        // if(config.urlencoded)
        // this.app.use(express.urlencoded({ extended: config.extended, limit: config.limit, parameterLimit: config.parameterLimit }))
    }
    initHTTPLogger() {
        const config = this.config.logger;
        if (!config) {
            logger.warn("HTTP Logger disabled");
            return;
        }
        if (config.enabled) {
            this.app.use(morgan(config.format));
            logger.success("HTTP Logger enabled");
        }
        else {
            logger.warn("HTTP Logger disabled");
        }
    }
    initUI() {
        const config = this.config.ui;
        if (!config) {
            logger.warn("UI disabled");
            return;
        }
        else {
            logger.success("UI enabled");
        }
        if (config.enabled && !config.reverseProxy)
            this.app.use(express.static(config.path));
    }
    initStatic() {
        const config = this.config.static;
        if (!config) {
            logger.warn("Static disabled");
            return;
        }
        else {
            logger.success("Static enabled");
        }
        if (config.length > 0) {
            config.forEach(s => {
                this.app.use(s.mount, express.static(s.path));
            });
        }
    }
    initAuth() {
        const config = this.config.authentication;
        if (!config) {
            logger.warn("Auth disabled");
            return;
        }
        else {
            logger.success("Auth enabled");
        }
        if (config.enabled) {
            if (config.mode == IAuthentication_1.IAuthenticationMode.session) {
                this.app.use(passport.initialize());
                this.app.use(passport.session());
                passport.deserializeUser((id, done) => {
                    done(null, id);
                });
                this.app.use((req, res, next) => {
                    if (req.isUnauthenticated()) {
                        res.redirect(config.sso.authURL);
                    }
                    else {
                        next();
                    }
                });
            }
            else if (config.mode == IAuthentication_1.IAuthenticationMode.local) {
                this.localAuth();
            }
            else {
                //sso
            }
        }
    }
    registerLoginPage() {
        const config = this.config.authentication.local;
        const secret = this.config.authentication.secret;
        this.app.get('/login', (req, res) => {
            if (req.isAuthenticated())
                return res.redirect('/');
            const config = this.config.authentication.local;
            // const filename = path.join(process.cwd(), config.loginPage)
            const html = pug.renderFile(config.loginPage);
            res.send(html);
        });
        this.app.post('/login', passport.authenticate('local', {
            failureRedirect: '/login',
            failureFlash: 'Invalid username or password',
            successRedirect: '/'
        }), (req, res) => {
            res.redirect('/');
        });
        this.app.all('/logout', (req, res) => {
            req.session.destroy(_ => {
                req.logout();
                res.redirect('/login');
            });
        });
        this.app.post('/login/token', (req, res, next) => {
            passport.authenticate('local', { session: false }, (err, user, info) => {
                if (err || !user) {
                    return res.status(400).json({
                        message: 'Something is not right',
                        user: user,
                    });
                }
                req.login(user, { session: false }, (err) => {
                    if (err) {
                        res.send(err);
                    }
                    const token = jwt.sign({ user }, secret);
                    return res.json({ user, token });
                });
            })(req, res);
        });
        // this.app.use(passport.authenticate('jwt', { session: false }), (req, res, next) => {
        //     return next();
        // }); 
        this.app.use((req, res, next) => {
            if (req.headers.authorization) {
                const { req, res } = passport.authenticate('jwt', { session: false });
                next();
            }
            else {
                if (req.isAuthenticated()) {
                    return next();
                }
                else {
                    return res.redirect('/login');
                }
            }
        });
        this.app.use((req, res, next) => {
            return next();
        });
        this.app.get('/user', (req, res) => {
            res.send(req.user);
        });
    }
    localAuth() {
        const config = this.config.authentication.local;
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        passport.use('jwt', new JWTStrategy({
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'your_jwt_secret'
        }, function (jwtPayload, cb) {
            console;
            //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
            typeorm_1.getRepository(config.userEntity).findOne({ username: jwtPayload.user.username }).then(user => {
                return cb(null, user);
            }).catch(err => {
                return cb(err);
            });
        }));
        passport.use('local', new LocalStrategy((username, password, done) => {
            typeorm_1.getRepository(config.userEntity).findOne({ username }).then(user => {
                if (!user)
                    return done(null, false);
                bcryptjs_1.compare(password.toString(), user['password'], (err, valid) => {
                    if (err)
                        return done(err, null);
                    if (valid) {
                        delete user['password'];
                        return done(null, user);
                    }
                    return done(null, false);
                });
            }).catch(err => {
                return done(err, null);
            });
        }));
        passport.serializeUser((user, done) => {
            return done(null, user);
        });
        passport.deserializeUser((user, done) => {
            return done(null, user);
        });
        this.registerLoginPage();
    }
    initSession() {
        const config = this.config.session;
        let options;
        if (!config) {
            logger.warn("Session disabled");
            return;
        }
        else {
            logger.success("Session enabled");
        }
        if (config.enabled) {
            options = {
                secret: config.secret,
                resave: config.resave,
                saveUninitialized: config.saveUninitialized
            };
            if (config.mode === ISession_1.ISessionMode.redis) {
                const redisStore = RedisStore(session);
                options['store'] = new redisStore({ client: redis.createClient({
                        host: config.store.hostname,
                        port: config.store.port
                    }) });
            }
            this.app.use(session(options));
            //set flash
            this.app.use(flash());
        }
    }
    initController() {
        logger.start('Scanning controller');
        const dir = this.config.controller;
        const controllers = controller_1.scanControllers(dir);
        if (controllers.length > 0) {
            controllers.forEach((controller) => {
                const { basePath, router } = express_1.getRouter(controller);
                if (basePath && router) {
                    this.app.use(basePath, router);
                }
            });
        }
        logger.success(`Found ${controllers.length} controllers`);
    }
    startInfo() {
        logger.success(`Server running on ${this.config.server.mode}://${this.config.host}:${this.config.port}`);
        this.afterStart.emit(this);
    }
    startServer() {
        const config = this.config.server;
        const startHTTPS = () => {
            const options = {
                key: fs.readFileSync(path.join(process.cwd(), config.key)),
                cert: fs.readFileSync(path.join(process.cwd(), config.cert))
            };
            https
                .createServer(options, this.app)
                .listen(this.config.port, this.config.host, this.startInfo);
        };
        const startHTTP = () => {
            this.app.listen(this.config.port, this.config.host, this.startInfo);
        };
        const start = () => {
            if (config.mode === IServer_1.IServerMode.http)
                startHTTP();
            else if (config.mode === IServer_1.IServerMode.https)
                startHTTPS();
            else {
                logger.fatal("Can't start server");
                process.exit(1);
            }
        };
        if (!this.config.databases) {
            start();
        }
        else {
            typeorm_1.createConnections(this.config.databases).then(_ => {
                start();
            }).catch(err => {
                logger.fatal(err);
            });
        }
    }
    start() {
        this.beforeStart.emit(this);
        this.init();
        this.startServer();
    }
}
exports.Application = Application;
