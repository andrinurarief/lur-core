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
    PARAMS = 2,
    QUERY = 3,
    BODY = 4,
    HEADERS = 5,
    COOKIES = 6,
    NEXT = 7,
    SESSION = 8,
    CONFIGURATION = 9,
    FILE = 10,
    CONNECTION = 11,
    USERINFO = 12,
    USERID = 13,
    REPOSITORY = 14,
    SQL = 15
}
export declare enum MetadataType {
    PARAMETERS = "PARAMETERS"
}
