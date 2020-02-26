export enum IDatabaseType {
    postgres = "postgres"
}

export interface IDatabase {
    type: IDatabaseType
    name: string | "default"
    extra: string
    host: string | "127.0.0.1"
    port: number
    username: string
    password: string
    database: string
    schema: string | "public"
    entities: string[]
    subscribers: string[]
    logging: object | false
}