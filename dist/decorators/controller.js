"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const IController_1 = require("../interfaces/IController");
const ICommon_1 = require("../interfaces/ICommon");
const glob = require("glob");
const path = require("path");
function Controller(path, option) {
    return (target) => {
        const controllerData = {
            type: IController_1.ControllerType.BASIC,
            path: '/' + path,
            option
        };
        Reflect.defineMetadata(ICommon_1.ClassType.CONTROLLER, controllerData, target.prototype);
        return target;
    };
}
exports.Controller = Controller;
function CRUDController(path, option) {
    if (typeof option === 'string') {
        return (target) => {
            const opt = {
                entity: {
                    name: option
                }
            };
            const controllerData = {
                type: IController_1.ControllerType.CRUD,
                path: '/' + path,
                option: opt
            };
            Reflect.defineMetadata(ICommon_1.ClassType.CONTROLLER, controllerData, target.prototype);
            return target;
        };
    }
    else {
        return (target) => {
            const controllerData = {
                type: IController_1.ControllerType.CRUD,
                path: '/' + path,
                option
            };
            Reflect.defineMetadata(ICommon_1.ClassType.CONTROLLER, controllerData, target.prototype);
            return target;
        };
    }
}
exports.CRUDController = CRUDController;
function scanControllers(dir) {
    if (!dir)
        dir = 'dist/controllers/**/*.js';
    const controllers = [];
    const files = glob.sync(dir);
    files.forEach(file => {
        const controller = require(path.join(process.cwd(), file));
        for (const ctrl in controller) {
            const prototype = Reflect.getOwnMetadata(ICommon_1.ClassType.CONTROLLER, controller[ctrl].prototype);
            if (prototype)
                controllers.push(controller[ctrl]);
        }
    });
    return controllers;
}
exports.scanControllers = scanControllers;
