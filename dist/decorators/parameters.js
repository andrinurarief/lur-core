"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ICommon_1 = require("../interfaces/ICommon");
const typeorm_1 = require("typeorm");
function getParam(source, parameterType, parameterName) {
    const param = source[parameterType] || source;
    return parameterName ? param[parameterName] : param;
}
function helperForParameters(parameterType, name, option) {
    return (target, propertyKey, parameterIndex) => {
        if (!Reflect.hasMetadata(ICommon_1.MetadataType.PARAMETERS, target))
            Reflect.defineMetadata(ICommon_1.MetadataType.PARAMETERS, {}, target);
        const parameters = Reflect.getOwnMetadata(ICommon_1.MetadataType.PARAMETERS, target);
        if (!parameters[propertyKey])
            parameters[propertyKey] = [];
        parameters[propertyKey].push({
            parameterName: name,
            parameterType,
            parameterIndex,
            parameterOptions: option
        });
        Reflect.defineMetadata(ICommon_1.MetadataType.PARAMETERS, parameters, target);
    };
}
function Request(name) { return helperForParameters(ICommon_1.ParameterType.REQUEST, name); }
exports.Request = Request;
function Response(name) { return helperForParameters(ICommon_1.ParameterType.RESPONSE, name); }
exports.Response = Response;
function Params(name) { return helperForParameters(ICommon_1.ParameterType.PARAMS, name); }
exports.Params = Params;
function Query(name) { return helperForParameters(ICommon_1.ParameterType.QUERY, name); }
exports.Query = Query;
function Body(name) { return helperForParameters(ICommon_1.ParameterType.BODY, name); }
exports.Body = Body;
function Headers(name) { return helperForParameters(ICommon_1.ParameterType.HEADERS, name); }
exports.Headers = Headers;
function Cookies(name) { return helperForParameters(ICommon_1.ParameterType.COOKIES, name); }
exports.Cookies = Cookies;
function Next(name) { return helperForParameters(ICommon_1.ParameterType.NEXT, name); }
exports.Next = Next;
function Session(name) { return helperForParameters(ICommon_1.ParameterType.SESSION, name); }
exports.Session = Session;
function Configuration(name) { return helperForParameters(ICommon_1.ParameterType.CONFIGURATION, name); }
exports.Configuration = Configuration;
function File(name, options) { return helperForParameters(ICommon_1.ParameterType.FILE, name, options); }
exports.File = File;
function Connection(name) { return helperForParameters(ICommon_1.ParameterType.CONNECTION, name); }
exports.Connection = Connection;
function UserInfo(name) { return helperForParameters(ICommon_1.ParameterType.USERINFO, name); }
exports.UserInfo = UserInfo;
function UserId() { return helperForParameters(ICommon_1.ParameterType.USERID); }
exports.UserId = UserId;
function Repository(name) { return helperForParameters(ICommon_1.ParameterType.REPOSITORY, null, name); }
exports.Repository = Repository;
function Model(name) { return helperForParameters(ICommon_1.ParameterType.REPOSITORY, null, name); }
exports.Model = Model;
function Sql(name) { return helperForParameters(ICommon_1.ParameterType.SQL, null, name); }
exports.Sql = Sql;
function extractParameters(req, res, next, params) {
    if (!params || !params.length) {
        return [req, res, next];
    }
    const args = [];
    for (const { parameterName, parameterType, parameterIndex, parameterOptions } of params) {
        switch (parameterType) {
            case ICommon_1.ParameterType.RESPONSE:
                args[parameterIndex] = res;
                break;
            case ICommon_1.ParameterType.REQUEST:
                args[parameterIndex] = getParam(req, null, parameterName);
                break;
            case ICommon_1.ParameterType.NEXT:
                args[parameterIndex] = next;
                break;
            case ICommon_1.ParameterType.PARAMS:
                args[parameterIndex] = getParam(req, ICommon_1.ParameterType.PARAMS, parameterName);
                break;
            case ICommon_1.ParameterType.QUERY:
                args[parameterIndex] = getParam(req, ICommon_1.ParameterType.QUERY, parameterName);
                break;
            case ICommon_1.ParameterType.BODY:
                args[parameterIndex] = getParam(req, ICommon_1.ParameterType.BODY, parameterName);
                break;
            case ICommon_1.ParameterType.HEADERS:
                args[parameterIndex] = getParam(req, ICommon_1.ParameterType.HEADERS, parameterName);
                break;
            case ICommon_1.ParameterType.COOKIES:
                args[parameterIndex] = getParam(req, ICommon_1.ParameterType.COOKIES, parameterName);
                break;
            case ICommon_1.ParameterType.SESSION:
                args[parameterIndex] = getParam(req, ICommon_1.ParameterType.SESSION, parameterName);
                break;
            case ICommon_1.ParameterType.CONFIGURATION:
                args[parameterIndex] = parameterName ? req.app.get('config')[parameterName] : req.app.get('config');
                break;
            case ICommon_1.ParameterType.FILE:
                args[parameterIndex] = req.file ? [req.file] : req.files;
                break;
            case ICommon_1.ParameterType.CONNECTION:
                args[parameterIndex] = parameterName ? typeorm_1.getConnection(parameterName) : typeorm_1.getConnection();
                break;
            // case ParameterType.USERINFO:
            //     args[parameterIndex] = getUserInfo(req);
            //     break;
            case ICommon_1.ParameterType.REPOSITORY:
                args[parameterIndex] = typeorm_1.getConnection().getRepository(parameterOptions);
                break;
            case ICommon_1.ParameterType.USERID:
                args[parameterIndex] = req.session.userid;
                break;
            case ICommon_1.ParameterType.SQL:
                args[parameterIndex] = typeorm_1.getConnectionManager().connections[0].query;
                break;
        }
    }
    return args;
}
exports.extractParameters = extractParameters;
