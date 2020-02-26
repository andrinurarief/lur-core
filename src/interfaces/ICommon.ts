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
    PARAMS,
    QUERY,
    BODY,
    HEADERS,
    COOKIES,
    NEXT,
    SESSION,
    CONFIGURATION,
    FILE,
    CONNECTION,
    USERINFO,
    USERID,
    REPOSITORY,
    SQL
}

export enum MetadataType {
    PARAMETERS = 'PARAMETERS'
}