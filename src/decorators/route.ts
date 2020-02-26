import 'reflect-metadata'


export function Checkout(path?: string): MethodDecorator {
    return helperForRoutes('checkout', path);
}

export function Copy(path?: string): MethodDecorator {
    return helperForRoutes('copy', path);
}

export function Delete(path?: string): MethodDecorator {
    return helperForRoutes('delete', path);
}

export function Get(path?: string): MethodDecorator {
    return helperForRoutes('get', path);
}

export function Head(path?: string): MethodDecorator {
    return helperForRoutes('head', path);
}

export function Lock(path?: string): MethodDecorator {
    return helperForRoutes('lock', path);
}

export function Merge(path?: string): MethodDecorator {
    return helperForRoutes('merge', path);
}

export function Mkactivity(path?: string): MethodDecorator {
    return helperForRoutes('mkactivity', path);
}

export function Mkcol(path?: string): MethodDecorator {
    return helperForRoutes('mkcol', path);
}

export function Move(path?: string): MethodDecorator {
    return helperForRoutes('move', path);
}

export function MSearch(path?: string): MethodDecorator {
    return helperForRoutes('m-search', path);
}

export function Notify(path?: string): MethodDecorator {
    return helperForRoutes('notify', path);
}

export function Options(path?: string): MethodDecorator {
    return helperForRoutes('options', path);
}

export function Patch(path?: string): MethodDecorator {
    return helperForRoutes('patch', path);
}

export function Post(path?: string): MethodDecorator {
    return helperForRoutes('post', path);
}

export function Purge(path?: string): MethodDecorator {
    return helperForRoutes('purge', path);
}

export function Put(path?: string): MethodDecorator {
    return helperForRoutes('put', path);
}

export function Report(path?: string): MethodDecorator {
    return helperForRoutes('report', path);
}

export function Search(path?: string): MethodDecorator {
    return helperForRoutes('search', path);
}

export function Subscribe(path?: string): MethodDecorator {
    return helperForRoutes('subscribe', path);
}

export function Trace(path?: string): MethodDecorator {
    return helperForRoutes('trace', path);
}

export function Unlock(path?: string): MethodDecorator {
    return helperForRoutes('unlock', path);
}

export function Unsubscribe(path?: string): MethodDecorator {
    return helperForRoutes('unsubscribe', path);
}

function helperForRoutes(httpVerb: string, path?: string): MethodDecorator {

    return (target: any, propertyKey: string | symbol, descriptor?: PropertyDescriptor) => {
        let routeProperties = Reflect.getOwnMetadata(propertyKey, target);
        if (!routeProperties) {
            routeProperties = {};
        }
        routeProperties = {
            httpVerb,
            path: path ? ('/' + path) : '',
            ...routeProperties,
        };
        Reflect.defineMetadata(propertyKey, routeProperties, target);
        if (descriptor) {
            return descriptor;
        }
    };
}