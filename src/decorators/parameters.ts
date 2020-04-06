import { ParameterType, MetadataType } from "../interfaces/ICommon"
import { getConnection, getConnectionManager } from 'typeorm'
import { Request, Response, NextFunction } from "express"

function getParam(source: any, parameterType: ParameterType, parameterName: string) : any {
    const param = source[parameterType] || source
    return parameterName ? param[parameterName] : param
}

function helperForParameters(parameterType: ParameterType, name?: string, option?: any) : ParameterDecorator {
    return (target: any, propertyKey: string, parameterIndex: number) => {
        if(!Reflect.hasMetadata(MetadataType.PARAMETERS, target))
            Reflect.defineMetadata(MetadataType.PARAMETERS, {}, target)

        const parameters = Reflect.getOwnMetadata(MetadataType.PARAMETERS, target)
        if(!parameters[propertyKey])
            parameters[propertyKey] = []
        
        parameters[propertyKey].push({
            parameterName: name,
            parameterType,
            parameterIndex,
            parameterOptions: option
        })

        Reflect.defineMetadata(MetadataType.PARAMETERS, parameters, target)
    }
}

export function Request(name?: string) { return helperForParameters(ParameterType.REQUEST, name) }
export function Response(name?: string) { return helperForParameters(ParameterType.RESPONSE, name) }
export function Params(name?: string) { return helperForParameters(ParameterType.PARAMS, name) }
export function Query(name?: string) { return helperForParameters(ParameterType.QUERY, name) }
export function Body(name?: string) { return helperForParameters(ParameterType.BODY, name) }
export function Headers(name?: string) { return helperForParameters(ParameterType.HEADERS, name) }
export function Cookies(name?: string) { return helperForParameters(ParameterType.COOKIES, name) }
export function Next(name?: string) { return helperForParameters(ParameterType.NEXT, name) }
export function Session(name?: string) { return helperForParameters(ParameterType.SESSION, name) }
export function Configuration(name?: string) { return helperForParameters(ParameterType.CONFIGURATION, name) }
export function File(name?: string, options? : any) { return helperForParameters(ParameterType.FILE, name, options) }
export function Connection(name?: string) { return helperForParameters(ParameterType.CONNECTION, name) }
export function UserInfo(name?: string) { return helperForParameters(ParameterType.USERINFO, name) }
export function UserId() { return helperForParameters(ParameterType.USERID) }
export function Repository(name?: any) { return helperForParameters(ParameterType.REPOSITORY, null, name) }
export function Model(name?: any) { return helperForParameters(ParameterType.REPOSITORY, null, name) }
export function Sql(name?: any) { return helperForParameters(ParameterType.SQL, null, name) }

export function extractParameters(req: Request, res: Response, next: NextFunction, params: []) : any[] {
    if (!params || !params.length) {
        return [req, res, next];
    }
    const args = []
    for (const { parameterName, parameterType, parameterIndex, parameterOptions } of params) {
        switch (parameterType) {
            case ParameterType.RESPONSE:
                args[parameterIndex] = res;
                break;
            case ParameterType.REQUEST:
                args[parameterIndex] = getParam(req, null, parameterName);
                break;
            case ParameterType.NEXT:
                args[parameterIndex] = next;
                break;
            case ParameterType.PARAMS:
                args[parameterIndex] = getParam(req, ParameterType.PARAMS, parameterName);
                break;
            case ParameterType.QUERY:
                args[parameterIndex] = getParam(req, ParameterType.QUERY, parameterName);
                break;
            case ParameterType.BODY:
                args[parameterIndex] = getParam(req, ParameterType.BODY, parameterName);
                break;
            case ParameterType.HEADERS:
                args[parameterIndex] = getParam(req, ParameterType.HEADERS, parameterName);
                break;
            case ParameterType.COOKIES:
                args[parameterIndex] = getParam(req, ParameterType.COOKIES, parameterName);
                break;
            case ParameterType.SESSION:
                args[parameterIndex] = getParam(req, ParameterType.SESSION, parameterName);
                break;
            case ParameterType.CONFIGURATION:
                args[parameterIndex] = parameterName ? req.app.get('config')[parameterName] : req.app.get('config');
                break;
            case ParameterType.FILE:
                args[parameterIndex] = req.file ? [req.file] : req.files
                break;
            case ParameterType.CONNECTION:
                args[parameterIndex] = parameterName ? getConnection(parameterName) : getConnection()
                break;
            // case ParameterType.USERINFO:
            //     args[parameterIndex] = getUserInfo(req);
            //     break;
            case ParameterType.REPOSITORY:
                args[parameterIndex] = getConnection().getRepository(parameterOptions)
                break
            case ParameterType.USERID:
                args[parameterIndex] = req.session.userid
                break;
            case ParameterType.SQL:
                args[parameterIndex] = getConnectionManager().connections[0].query
                break;
        }
    }
    return args
}