export declare enum IAuthenticationMode {
    session = "session",
    sso = "sso"
}
export interface ISSO {
    loginURL: string;
    authURL: string;
    logoutURL: string;
    userInfoURL: string;
    verifyTokenURL: string;
    refreshTokenURL: string;
    clientID: string;
    clientSecret: string;
    grantType: string;
}
export interface IAuthentication {
    enabled: boolean | false;
    mode: IAuthenticationMode;
    sso: ISSO;
}
