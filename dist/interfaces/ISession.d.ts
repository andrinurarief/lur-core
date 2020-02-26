export declare enum ISessionMode {
    memory = 0,
    redis = 1
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
    mode?: ISessionMode | ISessionMode.memory;
    secret?: string | "th1sIs53cretK3y";
    resave?: boolean | false;
    saveUninitialized?: boolean | true;
    store?: ISessionStore;
}
