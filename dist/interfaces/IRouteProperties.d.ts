import { IUploadOption } from "./IUploadOption";
import { Middleware } from "./ICommon";
export interface IRouteProperties {
    path: string;
    httpVerb: string;
    routeMiddleware: Middleware[];
    upload: IUploadOption;
}
