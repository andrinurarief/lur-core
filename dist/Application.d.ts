import logger = require('signale');
import { Application as ExApp } from 'express';
import { Configuration } from './Configuration';
import { SubEvent } from 'sub-events';
import { HttpException } from './exceptions/HttpException';
declare class Application {
    private app;
    private config;
    readonly beforeStart: SubEvent<Application>;
    readonly afterStart: SubEvent<Application>;
    readonly onError: SubEvent<HttpException>;
    protected logger: logger.SignaleBase<logger.DefaultMethods> & Record<logger.DefaultMethods, logger.LoggerFunc> & {
        Signale: logger.SignaleConstructor;
        SignaleConfig: logger.SignaleConfig;
        SignaleOptions: logger.SignaleOptions<logger.DefaultMethods>;
        DefaultMethods: logger.DefaultMethods;
    };
    constructor(configFilename: string);
    private loadConfiguration;
    getConfig(): Configuration;
    getInstance(): ExApp;
    private init;
    private initNotFoundError;
    private initErrorHandler;
    private initBodyParser;
    private initHTTPLogger;
    private initUI;
    private initStatic;
    private initAuth;
    private initSession;
    private initController;
    private startInfo;
    private startServer;
    start(): void;
}
export { Application };
