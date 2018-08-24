import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Invoice as ReqInvoice } from '../models/request/invoices';
import { Invoice as RespInvoice } from '../models/response/invoices';
import { List as ReqList} from '../models/request/list';
import { List as ResList} from '../models/response/list';
import { Configs } from '../assets/config';
import { Router } from "@angular/router";
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class InvoicesService {

  private _invoices_Url: string;

  constructor(private http: HttpClient, private router: Router, private _authService: AuthenticationService) {
    this._invoices_Url = Configs.pos_api + Configs.pos_api_invoices;
  }

  /**
  * Creates an invoice
  * @param req - Invoice Create request
  */
  createInvoice(req: ReqInvoice): Observable<RespInvoice> {
    return this.http.post<RespInvoice>(this._invoices_Url, req, { headers: this._authService.getAdminAPIRequestHeaders() });
  }

  /**
  * Lists Invoices
  * @param req - List request
  */
  listInvoices(req: ReqList): Observable<ResList> {
    let url = this._invoices_Url + `?page=${req.page}&per_page=${req.per_page}&order=${req.order}&sort=${req.sort}`

    if (req.filter != null) {
      url = url.concat(`&${req.filter.key}=${req.filter.value}`);
    }

    return this.http.get<ResList>(url, { headers: this._authService.getAdminAPIRequestHeaders() });
  }
}