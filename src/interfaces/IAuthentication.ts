export enum IAuthenticationMode {
    session = "session",
    sso = "sso",
    local = "local"
}

export interface ISSO {
    loginURL: string
    authURL: string
    logoutURL: string
    userInfoURL: string
    verifyTokenURL: string
    refreshTokenURL: string
    clientID: string
    clientSecret: string
    grantType: string
}

export interface ILocalAuth {
    userEntity: string  
    groupEntity: string
    loginPage: string    
}

export interface IAuthentication {
    enabled: boolean | false
    mode: IAuthenticationMode
    sso: ISSO
    local: ILocalAuth
}