import { Router } from "express";
export declare type RouterLib = ((options?: any) => any);
export interface IRouterPath {
    basePath: string | null;
    router: Router | null;
}
