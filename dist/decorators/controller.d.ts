import 'reflect-metadata';
import { IControllerOption } from '../interfaces/IController';
declare function Controller(path: string, option?: IControllerOption): ClassDecorator;
declare function CRUDController(path: string): ClassDecorator;
declare function CRUDController(path: string, entityName: string): ClassDecorator;
declare function CRUDController(path: string, option: IControllerOption): ClassDecorator;
declare function scanControllers(dir?: string): any[];
export { Controller, CRUDController, scanControllers };
