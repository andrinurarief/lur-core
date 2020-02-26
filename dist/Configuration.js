"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IServer_1 = require("./interfaces/IServer");
class Configuration {
    constructor() {
        this.port = 3000;
        this.host = '127.0.0.1';
        this.env = 'development';
        this.server = {
            'mode': IServer_1.IServerMode.http
        };
        this.bodyParser = {
            extended: true,
            json: true,
            limit: '10mb',
            parameterLimit: 10000,
            urlencoded: true
        };
    }
    setConfiguration(configuration) {
        Object.assign(this, configuration);
    }
}
exports.Configuration = Configuration;
