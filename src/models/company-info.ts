export class CompanyInfo {
    id: string;
    TaxRegistrationNumber: number;
    CompanyName: string;
    BusinessName: string;
    CompanyID: string;
    CurrencyCode: string;
    TaxAccountingBasis: string;
    CompanyAddress: CompanyAddress;
}

class CompanyAddress {
    Country: string;
    BuildingNumber: string;
    StreetName: string;
    AddressDetail: string;
    City: string;
    PostalCode: string;
    Region: string;
}