"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClassType;
(function (ClassType) {
    ClassType[ClassType["CONTROLLER"] = 0] = "CONTROLLER";
    ClassType[ClassType["CRUD"] = 1] = "CRUD";
    ClassType[ClassType["API"] = 2] = "API";
    ClassType[ClassType["MIDDLEWARE"] = 3] = "MIDDLEWARE";
    ClassType[ClassType["WRAPPER"] = 4] = "WRAPPER";
    ClassType[ClassType["CHILDREN"] = 5] = "CHILDREN";
    ClassType[ClassType["OPTIONS"] = 6] = "OPTIONS";
})(ClassType = exports.ClassType || (exports.ClassType = {}));
var PropertyType;
(function (PropertyType) {
    PropertyType[PropertyType["CONNECTION"] = 0] = "CONNECTION";
    PropertyType[PropertyType["REPOSITORY"] = 1] = "REPOSITORY";
    PropertyType[PropertyType["USERID"] = 2] = "USERID";
})(PropertyType = exports.PropertyType || (exports.PropertyType = {}));
var ParameterType;
(function (ParameterType) {
    ParameterType[ParameterType["REQUEST"] = 0] = "REQUEST";
    ParameterType[ParameterType["RESPONSE"] = 1] = "RESPONSE";
    ParameterType[ParameterType["NEXT"] = 2] = "NEXT";
    ParameterType[ParameterType["CONFIGURATION"] = 3] = "CONFIGURATION";
    ParameterType[ParameterType["FILE"] = 4] = "FILE";
    ParameterType[ParameterType["CONNECTION"] = 5] = "CONNECTION";
    ParameterType[ParameterType["USERINFO"] = 6] = "USERINFO";
    ParameterType[ParameterType["USERID"] = 7] = "USERID";
    ParameterType[ParameterType["REPOSITORY"] = 8] = "REPOSITORY";
    ParameterType[ParameterType["SQL"] = 9] = "SQL";
    ParameterType["PARAMS"] = "params";
    ParameterType["QUERY"] = "query";
    ParameterType["BODY"] = "body";
    ParameterType["HEADERS"] = "headers";
    ParameterType["COOKIES"] = "cookies";
    ParameterType["SESSION"] = "session";
})(ParameterType = exports.ParameterType || (exports.ParameterType = {}));
var MetadataType;
(function (MetadataType) {
    MetadataType["PARAMETERS"] = "PARAMETERS";
})(MetadataType = exports.MetadataType || (exports.MetadataType = {}));
