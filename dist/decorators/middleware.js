"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
function Upload(option) {
    return (target, propertyKey, descriptor) => {
        let routeProperties = Reflect.getOwnMetadata(propertyKey, target);
        if (!routeProperties)
            routeProperties = {};
        routeProperties = Object.assign({ upload: option }, routeProperties);
        Reflect.defineMetadata(propertyKey, routeProperties, target);
        if (descriptor)
            return descriptor;
    };
}
exports.Upload = Upload;
