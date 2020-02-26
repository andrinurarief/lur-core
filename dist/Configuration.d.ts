import { IConfig } from './interfaces/IConfig';
import { ConnectionOptions } from 'typeorm';
export declare class Configuration implements IConfig {
    port: number;
    host: string;
    env: string;
    server?: import('./interfaces/IServer').IServer;
    controller?: string;
    session?: import('./interfaces/ISession').ISession;
    bodyParser?: import('./interfaces/IBodyParser').IBodyParser;
    ui?: import('./interfaces/IUI').IUI;
    logger?: import('./interfaces/ILogger').ILogger;
    authentication?: import('./interfaces/IAuthentication').IAuthentication;
    static?: import('./interfaces/IStatic').IStatic[];
    databases?: ConnectionOptions[];
    setConfiguration(configuration: Partial<Configuration>): void;
}
