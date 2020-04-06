export interface IBodyParser {
    json: boolean
    urlencoded: boolean
    extended: boolean
    limit: string
    parameterLimit: number
}