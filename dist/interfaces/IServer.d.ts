export declare enum IServerMode {
    http = "http",
    https = "https",
    http2 = "http2"
}
export interface IServer {
    mode: IServerMode;
    key?: string;
    cert?: string;
}
