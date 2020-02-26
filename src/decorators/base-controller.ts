import { Controller, IControllerData } from '../interfaces/IController';
import { IRouterPath } from '../interfaces/IRoutePath';
import { Router, Request, Response, NextFunction } from 'express';
import { MetadataType, Middleware } from '../interfaces/ICommon';
import { IRouteProperties } from '../interfaces/IRouteProperties';
import { extractParameters } from './parameters';
import { UploadMode } from '../interfaces/IUploadOption';
import multer = require('multer');

export abstract class BaseController {

    protected controller: Controller = null
    protected controllerData: IControllerData = null
    protected router: Router = Router()

    constructor(controller : Controller, controllerData : IControllerData) {
        this.controller = controller
        this.controllerData = controllerData
    }

    build() : IRouterPath {
        const router = this.router
        const controller = this.controller
        const prototype = controller.prototype
        const members = Object.getOwnPropertyNames(controller).concat(Object.getOwnPropertyNames(prototype))
        const parameters = Reflect.getOwnMetadata(MetadataType.PARAMETERS, prototype)

        const instance = new controller()

        members.forEach(member => {
            const route = instance[member]
            const routeProperties : IRouteProperties = Reflect.getOwnMetadata(member, prototype)

            if(route && routeProperties) {
                const { path, httpVerb, upload, routeMiddleware } = routeProperties
                const callback = (req : Request, res : Response, next : NextFunction) => {
                    const args = extractParameters(req, res, next, parameters[member])
                    const handler = route.apply(controller, args)

                    if(handler instanceof Promise)
                        handler.catch(next)

                    return handler
                }

                const middlewares : Middleware[] = routeMiddleware ? [...routeMiddleware] : []

                if(upload) {
                    switch(upload.mode) {
                        case UploadMode.SINGLE: middlewares.push(multer({ ...upload.option }).single(upload.fieldName)) 
                                                break;
                        case UploadMode.NONE: middlewares.push(multer({ ...upload.option }).none())
                                                break;
                        case UploadMode.ANY: middlewares.push(multer({ ...upload.option }).any())
                                                break;
                        case UploadMode.ARRAY: middlewares.push(multer({ ...upload.option }).array(upload.fieldName))
                                                break
                        case UploadMode.FIELDS: middlewares.push(multer({ ...upload.option }).fields(upload.fields))
                    }
                }

                if(middlewares.length > 0)
                    router[httpVerb](path, callback)
                else
                    router[httpVerb](path, [...middlewares], callback)
            }
        })

        return {
            basePath: this.controllerData.path,
            router
        }
    }
}