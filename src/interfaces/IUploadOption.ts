import { Field } from "multer";
import { IControllerUpload } from "./IController";

export enum UploadMode {
    SINGLE,
    ARRAY,
    FIELDS,
    NONE,
    ANY
}
export interface IUploadOption {
    fieldName: string
    fields: Field[]
    mode: UploadMode
    option: IControllerUpload
}