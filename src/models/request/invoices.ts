export class Invoice {
    id: string;
    InvoiceNo: string;
    InvoiceDate: Date;
    NetTotal: number;
    GrossTotal: number;
    TaxPayable: number;
}

export class InvoiceCreate {
    InvoiceNo: string;
    InvoiceDate: string;
    SystemEntryDate: string;
    Line: Array<Line>;
}

export class Line {
    Quantity: number;
    ProductCode: string;
    UnitOfMeasure: string;
}
