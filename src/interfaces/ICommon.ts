import { RequestHandler } from 'express';

export type Middleware = RequestHandler

export enum ClassType {
    CONTROLLER,
    CRUD,
    API,
    MIDDLEWARE,
    WRAPPER,
    CHILDREN,
    OPTIONS
}

export enum PropertyType {
    CONNECTION,
    REPOSITORY,
    USERID
}

export enum ParameterType {
    REQUEST,
    RESPONSE,
    NEXT,
    CONFIGURATION,
    FILE,
    CONNECTION,
    USERINFO,
    USERID,
    REPOSITORY,
    SQL,
    PARAMS = 'params',
    QUERY = 'query',
    BODY = 'body',
    HEADERS = 'headers',
    COOKIES = 'cookies',
    SESSION = 'session',
}

export enum MetadataType {
    PARAMETERS = 'PARAMETERS'
}