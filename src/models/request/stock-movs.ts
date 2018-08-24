export class StockMov {
    id: string
    MovementType: string
    DocumentID: string
    Line: number
    Quantity: number
    ProductCode: string
    UnitOfMeasure: string
    Time: Date
    Dir: string
    WharehouseID: string
}

export class StockMovCreate {
    MovementType: string
    DocumentID: string
    Line: number
    Quantity: number
    ProductCode: string
    UnitOfMeasure: string
    Time: Date
    Dir: string
    WharehouseID: string
}
