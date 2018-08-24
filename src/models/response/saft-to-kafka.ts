import { ErrorResponse } from "./error";

export class SaftToKafka {
    products: ProductsToKafka;
    invoices: InvoicesToKafka;
    header: HeaderToKafka;
}

class ProductsToKafka {
    products_count: number;
    products_codes: Array<string>;
    error: ErrorResponse;
}

class InvoicesToKafka {
    invoices_count: number;
    invoices_codes: Array<string>;
    error: ErrorResponse;
}

class HeaderToKafka {
    error: ErrorResponse;
}
