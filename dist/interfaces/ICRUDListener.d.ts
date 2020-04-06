export interface ICRUDListener {
    beforeInit?: (data: any) => any;
    afterInit?: (data: any) => any;
    afterFetchAll?: (data: any) => any;
    afterFetchOne?: (data: any) => any;
    beforeInsert?: (req: any, res: any, data: any) => any;
    afterInsert?: (data: any) => any;
    beforeDelete?: (data: any) => any;
    afterDelete?: (data: any) => any;
    beforeUpdate?: (data: any) => any;
    afterUpdate?: (data: any) => any;
    beforeFindAll?: (data: any) => any;
    afterFindAll?: (data: any) => any;
    beforeFindOne?: (data: any) => any;
    afterFindOne?: (data: any) => any;
}
