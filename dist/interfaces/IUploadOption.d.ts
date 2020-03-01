import { Field } from "multer";
import { IControllerUpload } from "./IController";
export declare enum UploadMode {
    SINGLE = 0,
    ARRAY = 1,
    FIELDS = 2,
    NONE = 3,
    ANY = 4
}
export interface IUploadOption {
    fieldName: string;
    fields?: Field[];
    mode: UploadMode;
    option?: IControllerUpload;
}
