export declare enum ISessionMode {
    memory = "memory",
    redis = "redis"
}
export interface ISessionStore {
    hostname?: string;
    username?: string;
    password?: string;
    port?: number;
    prefix?: string;
}
export interface ISession {
    enabled: boolean | false;
    mode?: ISessionMode;
    secret?: string;
    resave?: boolean;
    saveUninitialized?: boolean;
    store?: ISessionStore;
}
