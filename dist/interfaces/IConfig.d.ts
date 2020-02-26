import { IUI } from "./IUI";
import { IStatic } from "./IStatic";
import { IServer } from "./IServer";
import { ISession } from "./ISession";
import { IBodyParser } from "./IBodyParser";
import { IAuthentication } from "./IAuthentication";
import { ILogger } from "./ILogger";
import { ConnectionOptions } from "typeorm";
export interface IConfig {
    port: number;
    host: string;
    env: string;
    controller?: string | string[];
    server?: IServer;
    session?: ISession;
    bodyParser?: IBodyParser;
    ui?: IUI;
    logger?: ILogger;
    authentication?: IAuthentication;
    static?: IStatic[];
    databases?: ConnectionOptions[];
}
