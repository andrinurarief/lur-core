import 'reflect-metadata'
import { IUploadOption } from "../interfaces/IUploadOption";

export function Upload(option: IUploadOption) : MethodDecorator {
    return(target: any, propertyKey?: string, descriptor?: PropertyDescriptor) => {
        let routeProperties = Reflect.getOwnMetadata(propertyKey, target)
        
        if(!routeProperties)
            routeProperties = {}
        
        routeProperties = {
            upload: option,
            ...routeProperties
        }

        Reflect.defineMetadata(propertyKey, routeProperties, target)
        if(descriptor)
            return descriptor
    }
}