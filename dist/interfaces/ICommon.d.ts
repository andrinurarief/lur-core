import { RequestHandler } from 'express';
export declare type Middleware = RequestHandler;
export declare enum ClassType {
    CONTROLLER = 0,
    CRUD = 1,
    API = 2,
    MIDDLEWARE = 3,
    WRAPPER = 4,
    CHILDREN = 5,
    OPTIONS = 6
}
export declare enum PropertyType {
    CONNECTION = 0,
    REPOSITORY = 1,
    USERID = 2
}
export declare enum ParameterType {
    REQUEST = 0,
    RESPONSE = 1,
    NEXT = 2,
    CONFIGURATION = 3,
    FILE = 4,
    CONNECTION = 5,
    USERINFO = 6,
    USERID = 7,
    REPOSITORY = 8,
    SQL = 9,
    PARAMS = "params",
    QUERY = "query",
    BODY = "body",
    HEADERS = "headers",
    COOKIES = "cookies",
    SESSION = "session"
}
export declare enum MetadataType {
    PARAMETERS = "PARAMETERS"
}
