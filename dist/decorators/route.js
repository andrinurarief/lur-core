"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
function Checkout(path) {
    return helperForRoutes('checkout', path);
}
exports.Checkout = Checkout;
function Copy(path) {
    return helperForRoutes('copy', path);
}
exports.Copy = Copy;
function Delete(path) {
    return helperForRoutes('delete', path);
}
exports.Delete = Delete;
function Get(path) {
    return helperForRoutes('get', path);
}
exports.Get = Get;
function Head(path) {
    return helperForRoutes('head', path);
}
exports.Head = Head;
function Lock(path) {
    return helperForRoutes('lock', path);
}
exports.Lock = Lock;
function Merge(path) {
    return helperForRoutes('merge', path);
}
exports.Merge = Merge;
function Mkactivity(path) {
    return helperForRoutes('mkactivity', path);
}
exports.Mkactivity = Mkactivity;
function Mkcol(path) {
    return helperForRoutes('mkcol', path);
}
exports.Mkcol = Mkcol;
function Move(path) {
    return helperForRoutes('move', path);
}
exports.Move = Move;
function MSearch(path) {
    return helperForRoutes('m-search', path);
}
exports.MSearch = MSearch;
function Notify(path) {
    return helperForRoutes('notify', path);
}
exports.Notify = Notify;
function Options(path) {
    return helperForRoutes('options', path);
}
exports.Options = Options;
function Patch(path) {
    return helperForRoutes('patch', path);
}
exports.Patch = Patch;
function Post(path) {
    return helperForRoutes('post', path);
}
exports.Post = Post;
function Purge(path) {
    return helperForRoutes('purge', path);
}
exports.Purge = Purge;
function Put(path) {
    return helperForRoutes('put', path);
}
exports.Put = Put;
function Report(path) {
    return helperForRoutes('report', path);
}
exports.Report = Report;
function Search(path) {
    return helperForRoutes('search', path);
}
exports.Search = Search;
function Subscribe(path) {
    return helperForRoutes('subscribe', path);
}
exports.Subscribe = Subscribe;
function Trace(path) {
    return helperForRoutes('trace', path);
}
exports.Trace = Trace;
function Unlock(path) {
    return helperForRoutes('unlock', path);
}
exports.Unlock = Unlock;
function Unsubscribe(path) {
    return helperForRoutes('unsubscribe', path);
}
exports.Unsubscribe = Unsubscribe;
function helperForRoutes(httpVerb, path) {
    return (target, propertyKey, descriptor) => {
        let routeProperties = Reflect.getOwnMetadata(propertyKey, target);
        if (!routeProperties) {
            routeProperties = {};
        }
        routeProperties = Object.assign({ httpVerb, path: path ? ('/' + path) : '' }, routeProperties);
        Reflect.defineMetadata(propertyKey, routeProperties, target);
        if (descriptor) {
            return descriptor;
        }
    };
}
