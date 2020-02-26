export interface ICRUDListener {

    beforeInit?: (any) => any
    afterInit?: (any) => any
    
    beforeInsert?: (any) => any
    afterInsert?: (any) => any
    beforeDelete?: (any) => any
    afterDelete?: (any) => any
    beforeUpdate?: (any) => any
    afterUpdate?: (any) => any
    beforeFindAll?: (any) => any
    afterFindAll?: (any) => any
    beforeFindOne?: (any) => any
    afterFindOne?: (any) => any

}