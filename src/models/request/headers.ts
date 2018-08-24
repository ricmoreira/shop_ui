export class Header {
    id: string; 
    AuditFileVersion: string;
    TaxEntity: string;
    HeaderComment: string;
    Website: string;
    Email: string;
    ProductID: string;
    Telephone: string;
    Fax: string;
    TaxRegistrationNumber: number;
    BusinessName: string;
    CompanyAddress: CompanyAddress;                  
    CurrencyCode: string;
    DateCreated: string;
    EndDate: string;
    ProductCompanyTaxID: string;
    SoftwareCertificateNumber: number;
    CompanyID: string;
    TaxAccountingBasis: string;
    CompanyName: string;
    FiscalYear: number;
    StartDate: string;
    ProductVersion: string;
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
