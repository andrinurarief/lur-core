import { BaseController } from './base-controller';
import { IRouterPath } from '../interfaces/IRoutePath';
export declare class CRUDController extends BaseController {
    private findAll;
    private find;
    private delete;
    private update;
    private insert;
    build(): IRouterPath;
}
