import 'reflect-metadata'
import { Controller, IControllerData, IController, ControllerType } from '../interfaces/IController';
import { IRouterPath } from '../interfaces/IRoutePath';
import { ClassType } from '../interfaces/ICommon';
import { BasicController } from './basic-controller';
import { CRUDController } from './crud-controller';

export function getRouter(controller: Controller) : IRouterPath {
    
    const prototype = controller.prototype
    const controllerData: IControllerData = Reflect.getOwnMetadata(ClassType.CONTROLLER, prototype)

    if(!controllerData) {
        return {
            basePath: null,
            router: null
        }
    }

    let c : IController = null

    switch(controllerData.type) {
        case ControllerType.BASIC:
            return new BasicController(controller, controllerData).build()
        case ControllerType.CRUD:
            return new CRUDController(controller, controllerData).build()
    } 

}