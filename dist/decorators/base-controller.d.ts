import { Controller, IControllerData } from '../interfaces/IController';
import { IRouterPath } from '../interfaces/IRoutePath';
import { Router } from 'express';
export declare abstract class BaseController {
    protected controller: Controller;
    protected controllerData: IControllerData;
    protected router: Router;
    constructor(controller: Controller, controllerData: IControllerData);
    build(): IRouterPath;
}
