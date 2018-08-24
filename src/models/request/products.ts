export class Product {
    id: string;
    ProductType: string;
    ProductCode: string;
    ProductGroup: string;
    ProductDescription: string;
    ProductNumberCode: string;
    CustomsDetails: CustomsDetails;
}

export class CustomsDetails {
    CNCode: Array<string>;
    UNNumber: Array<string>;
}
