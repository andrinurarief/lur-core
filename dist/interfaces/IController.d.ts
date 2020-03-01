import { IRouterPath } from "./IRoutePath";
import multer = require("multer");
import { IUploadOption } from "./IUploadOption";
import { ICRUDListener } from "./ICRUDListener";
export declare type Controller = InstanceType<any>;
export declare type ApiController = InstanceType<any>;
export declare type CRUDController = InstanceType<any>;
export interface IController {
    build: () => IRouterPath;
}
export interface IControllerData {
    type: ControllerType;
    path: string | '';
    option: IControllerOption;
    tree?: IControllerTreeOption;
}
export interface IControllerOption {
    entity: IControllerEntity;
    viewEntity?: string;
    upload?: IControllerUpload;
    uploadOption?: IUploadOption;
    listener?: ICRUDListener;
}
export interface IControllerTreeOption {
}
export interface IControllerUpload {
    dest?: string;
    storage?: multer.StorageEngine;
    fileFilter?: any;
    limits?: any;
    preservePath?: boolean;
}
export interface IControllerEntity {
    name: string;
    viewEntity?: string;
    id?: string;
    order?: object;
    filter?: object;
    sql?: string;
}
export declare enum ControllerType {
    BASIC = "BASIC",
    CRUD = "CRUD"
}
