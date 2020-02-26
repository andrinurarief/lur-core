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
    ParameterType[ParameterType["PARAMS"] = 2] = "PARAMS";
    ParameterType[ParameterType["QUERY"] = 3] = "QUERY";
    ParameterType[ParameterType["BODY"] = 4] = "BODY";
    ParameterType[ParameterType["HEADERS"] = 5] = "HEADERS";
    ParameterType[ParameterType["COOKIES"] = 6] = "COOKIES";
    ParameterType[ParameterType["NEXT"] = 7] = "NEXT";
    ParameterType[ParameterType["SESSION"] = 8] = "SESSION";
    ParameterType[ParameterType["CONFIGURATION"] = 9] = "CONFIGURATION";
    ParameterType[ParameterType["FILE"] = 10] = "FILE";
    ParameterType[ParameterType["CONNECTION"] = 11] = "CONNECTION";
    ParameterType[ParameterType["USERINFO"] = 12] = "USERINFO";
    ParameterType[ParameterType["USERID"] = 13] = "USERID";
    ParameterType[ParameterType["REPOSITORY"] = 14] = "REPOSITORY";
    ParameterType[ParameterType["SQL"] = 15] = "SQL";
})(ParameterType = exports.ParameterType || (exports.ParameterType = {}));
var MetadataType;
(function (MetadataType) {
    MetadataType["PARAMETERS"] = "PARAMETERS";
})(MetadataType = exports.MetadataType || (exports.MetadataType = {}));
