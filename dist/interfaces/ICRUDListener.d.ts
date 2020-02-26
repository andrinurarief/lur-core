export interface ICRUDListener {
    beforeInit?: (any: any) => any;
    afterInit?: (any: any) => any;
    beforeInsert?: (any: any) => any;
    afterInsert?: (any: any) => any;
    beforeDelete?: (any: any) => any;
    afterDelete?: (any: any) => any;
    beforeUpdate?: (any: any) => any;
    afterUpdate?: (any: any) => any;
    beforeFindAll?: (any: any) => any;
    afterFindAll?: (any: any) => any;
    beforeFindOne?: (any: any) => any;
    afterFindOne?: (any: any) => any;
}
