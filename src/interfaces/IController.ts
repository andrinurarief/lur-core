import { IRouterPath } from "./IRoutePath"
import multer = require("multer")
import { IUploadOption } from "./IUploadOption"
import { ICRUDListener } from "./ICRUDListener"

export type Controller = InstanceType<any>
export type ApiController = InstanceType<any>
export type CRUDController = InstanceType<any>

export interface IController {
    build: () => IRouterPath
}

export interface IControllerData {
    type: ControllerType
    path: string | ''
    option: IControllerOption
    tree?: IControllerTreeOption
    listener?: ICRUDListener
}

export interface IControllerOption {
    entity: IControllerEntity
    viewEntity?: string //deprecated
    upload?: IControllerUpload
    uploadOption?: IUploadOption
    listener?: ICRUDListener
}

export interface IControllerTreeOption {

}

export interface IControllerUpload {        
    dest?: string
    storage?: multer.StorageEngine
    fileFilter?: any
    limits?: any
    preservePath?: boolean
}

export interface IControllerEntity {
    name: string
    viewEntity?: string //set if view entity different with DDL entity
    id?: string
    order?: object
    filter?: object
    sql?: string
}

export enum ControllerType {
    BASIC = 'BASIC',
    CRUD = 'CRUD'    
}