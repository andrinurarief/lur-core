import { IConfig } from './interfaces/IConfig';
import { IServerMode } from './interfaces/IServer';
import { ConnectionOptions } from 'typeorm';

export class Configuration implements IConfig {

    port: number = 3000;    
    host: string = '127.0.0.1';    
    
    env: string = 'development'
    
    server?: import('./interfaces/IServer').IServer = {
        'mode': IServerMode.http
    }

    controller?: string
    
    session?: import('./interfaces/ISession').ISession;
    bodyParser?: import('./interfaces/IBodyParser').IBodyParser = {
        extended: true,
        json: true,
        limit: '10mb',
        parameterLimit: 10000,
        urlencoded: true
    }
    ui?: import('./interfaces/IUI').IUI;
    logger?: import('./interfaces/ILogger').ILogger;
    authentication?: import('./interfaces/IAuthentication').IAuthentication;
    static?: import('./interfaces/IStatic').IStatic[];
    databases?: ConnectionOptions[]

    public setConfiguration(configuration : Partial<Configuration>) : void {
        Object.assign(this, configuration)
    }
}