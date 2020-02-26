import 'reflect-metadata'
import { IControllerData, ControllerType, IControllerOption, IController } from '../interfaces/IController'
import { ClassType } from '../interfaces/ICommon'
import glob = require('glob')
import path = require('path')

function Controller(path: string, option?: IControllerOption) : ClassDecorator {
    
    return <TFunction extends Function>(target: TFunction) => {

        const controllerData: IControllerData = {
            type: ControllerType.BASIC,
            path: '/' + path,
            option
        }

        Reflect.defineMetadata(ClassType.CONTROLLER, controllerData, target.prototype)
        return target
    }
}

function CRUDController(path: string) : ClassDecorator;
function CRUDController(path: string, entityName: string) : ClassDecorator;
function CRUDController(path: string, option: IControllerOption) : ClassDecorator;

function CRUDController(path: string, option?: IControllerOption | string) : ClassDecorator {

    if(typeof option === 'string') {
        return <TFunction extends Function>(target: TFunction) => {

            const opt : IControllerOption = {
                entity: {
                    name: option
                }
            }            

            const controllerData: IControllerData = {
                type: ControllerType.CRUD,
                path: '/' + path,
                option: opt
            }

            Reflect.defineMetadata(ClassType.CONTROLLER, controllerData, target.prototype)
            return target
        }
    } else {
        return <TFunction extends Function>(target: TFunction) => {

            const controllerData: IControllerData = {
                type: ControllerType.CRUD,
                path: '/' + path,
                option
            }

            Reflect.defineMetadata(ClassType.CONTROLLER, controllerData, target.prototype)
            return target
        }
    }
}

function scanControllers(dir?: string) : any[] {

    if(!dir)
        dir = 'dist/controllers/**/*.js'

    const controllers = []
    const files = glob.sync(dir)

    files.forEach(file => {
        const controller = require(path.join(process.cwd(), file))
        for(const ctrl in controller) {
            const prototype = Reflect.getOwnMetadata(ClassType.CONTROLLER, controller[ctrl].prototype)
            if(prototype)
                controllers.push(controller[ctrl])
        }
    })

    return controllers

}

export { Controller, CRUDController, scanControllers }