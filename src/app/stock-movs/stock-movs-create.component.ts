import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StockMovsService } from '../../services/stock-movs.service';
import { StockMovCreate as StockMovReq } from '../../models/request/stock-movs';
import { StockMov as StockMovRes } from '../../models/response/stock-movs';
import { NotificationService } from '../../services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UUID } from 'angular2-uuid';

@Component({
  templateUrl: './stock-movs-create.component.html'
})

export class StockMovsCreateComponent {

  public stockMov: StockMovReq;

  constructor(private notificationService: NotificationService, private service: StockMovsService, private router: Router, ) { }

  ngOnInit() {
    this.stockMov = new StockMovReq();
    this.generateDocumentID();
    this.stockMov.MovementType = "ADMIN";
    this.stockMov.UnitOfMeasure = "UNI";
    this.stockMov.WharehouseID = "1";
    this.stockMov.Dir = "OUT";
  }

  private generateDocumentID() {
    this.stockMov.DocumentID = UUID.UUID();
    this.stockMov.Line = 1;
  }

  public create(): void {
    this.stockMov.Time = new Date();
    console.log(this.stockMov);

    this.service.create(this.stockMov)
      .subscribe(
        (stockMov: StockMovRes) => {
          this.notificationService.success(`Stock movement added with success`);
        },
        ((error: HttpErrorResponse) => {
          console.log(error)
          this.notificationService.error(error.message);
        })
      );
  }

  public doNothing() {
    return false;
  }
}
