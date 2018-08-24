import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeadersService } from '../../services/headers.service';
import { List as ListReq } from '../../models/request/list';
import { List as ListRes } from '../../models/response/list';
import { Header } from '../../models/response/headers';
import { CompanyInfo } from '../../models/company-info';
import { NotificationService } from '../../services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  templateUrl: './company-info.component.html'
})

export class CompanyInfoComponent {

  private INFO_BATCH_SIZE: number = 1;

  public header: Header;
  public companyInfo: CompanyInfo;

  constructor(private notificationService: NotificationService, private service: HeadersService, private router: Router, ) { }

  ngOnInit() {
    // load headers list with first 15 headers
    let req = new ListReq(this.INFO_BATCH_SIZE, 1);
    this.loadData(req);
  }

  public loadData(req: ListReq): void {
    this.service.list(req)
      .subscribe(
        (list: ListRes) => {
          // at the moment, only first on the list will be loaded to show
          if (list.items.length > 0) {
            this.header = list.items[0];
            this.companyInfo = new CompanyInfo();
            this.mapHeaderToCompanyInfo(this.header, this.companyInfo);
          }
        },
        ((error: HttpErrorResponse) => {
          console.log(error)
          this.notificationService.error(error.message);
        })
      );
  }

  private mapHeaderToCompanyInfo(header: Header, companyInfo: CompanyInfo): void {
    companyInfo.BusinessName = header.BusinessName;
    companyInfo.CompanyAddress = Object.assign({}, header.CompanyAddress);
    companyInfo.CompanyID = header.CompanyID;
    companyInfo.CompanyName = header.CompanyName;
    companyInfo.CurrencyCode = header.CurrencyCode;
    companyInfo.id = header.id;
    companyInfo.TaxAccountingBasis = header.TaxAccountingBasis;
    companyInfo.TaxRegistrationNumber = header.TaxRegistrationNumber;
  }
}
