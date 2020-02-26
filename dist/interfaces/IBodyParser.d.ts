export interface IBodyParser {
    json: boolean | true;
    urlencoded: boolean | true;
    extended: boolean | true;
    limit: string | '10mb';
    parameterLimit: number | 10000;
}
