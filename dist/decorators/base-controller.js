"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ICommon_1 = require("../interfaces/ICommon");
const parameters_1 = require("./parameters");
const IUploadOption_1 = require("../interfaces/IUploadOption");
const multer = require("multer");
class BaseController {
    constructor(controller, controllerData) {
        this.controller = null;
        this.controllerData = null;
        this.router = express_1.Router();
        this.controller = controller;
        this.controllerData = controllerData;
    }
    build() {
        const router = this.router;
        const controller = this.controller;
        const prototype = controller.prototype;
        const members = Object.getOwnPropertyNames(controller).concat(Object.getOwnPropertyNames(prototype));
        const parameters = Reflect.getOwnMetadata(ICommon_1.MetadataType.PARAMETERS, prototype);
        const instance = new controller();
        members.forEach(member => {
            const route = instance[member];
            const routeProperties = Reflect.getOwnMetadata(member, prototype);
            if (route && routeProperties) {
                const { path, httpVerb, upload, routeMiddleware } = routeProperties;
                const callback = (req, res, next) => {
                    const args = parameters_1.extractParameters(req, res, next, parameters[member]);
                    const handler = route.apply(controller, args);
                    if (handler instanceof Promise)
                        handler.catch(next);
                    return handler;
                };
                const middlewares = routeMiddleware ? [...routeMiddleware] : [];
                if (upload) {
                    switch (upload.mode) {
                        case IUploadOption_1.UploadMode.SINGLE:
                            middlewares.push(multer(Object.assign({}, upload.option)).single(upload.fieldName));
                            break;
                        case IUploadOption_1.UploadMode.NONE:
                            middlewares.push(multer(Object.assign({}, upload.option)).none());
                            break;
                        case IUploadOption_1.UploadMode.ANY:
                            middlewares.push(multer(Object.assign({}, upload.option)).any());
                            break;
                        case IUploadOption_1.UploadMode.ARRAY:
                            middlewares.push(multer(Object.assign({}, upload.option)).array(upload.fieldName));
                            break;
                        case IUploadOption_1.UploadMode.FIELDS: middlewares.push(multer(Object.assign({}, upload.option)).fields(upload.fields));
                    }
                }
                if (middlewares.length > 0) {
                    router[httpVerb](path, [...middlewares], callback);
                }
                else {
                    router[httpVerb](path, callback);
                }
            }
        });
        return {
            basePath: this.controllerData.path,
            router
        };
    }
}
exports.BaseController = BaseController;
