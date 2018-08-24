import { Component } from '@angular/core';
import { SAFTService } from '../../services/saft.service';
import { NotificationService } from '../../services/notification.service';
import { SaftToKafka } from '../../models/response/saft-to-kafka';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorResponse } from '../../models/response/error';

@Component({
  templateUrl: 'saft.component.html'
})
export class SAFTComponent {

  selectedFile: File = null;

  constructor(private notificationService: NotificationService, private saftService: SAFTService) { }

  onFileSelected(event: HTMLInputEvent) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    this.saftService.postFile(this.selectedFile)
    .subscribe(
      (res: SaftToKafka) => {
        this.notificationService.success(`Uploaded ${res.products.products_count} products.\n
        Uploaded ${res.invoices.invoices_count} invoices.\n
        Uploaded company information.
        `)
      },
      (err: HttpErrorResponse) => {
        console.log(err);
        this.notificationService.error(err.error.response)
      }
    );
  }

  reset() {
    this.selectedFile = null;
  }
}

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
