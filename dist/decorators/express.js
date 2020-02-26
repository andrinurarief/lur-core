"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const IController_1 = require("../interfaces/IController");
const ICommon_1 = require("../interfaces/ICommon");
const basic_controller_1 = require("./basic-controller");
const crud_controller_1 = require("./crud-controller");
function getRouter(controller) {
    const prototype = controller.prototype;
    const controllerData = Reflect.getOwnMetadata(ICommon_1.ClassType.CONTROLLER, prototype);
    if (!controllerData) {
        return {
            basePath: null,
            router: null
        };
    }
    let c = null;
    switch (controllerData.type) {
        case IController_1.ControllerType.BASIC:
            return new basic_controller_1.BasicController(controller, controllerData).build();
        case IController_1.ControllerType.CRUD:
            return new crud_controller_1.CRUDController(controller, controllerData).build();
    }
}
exports.getRouter = getRouter;
