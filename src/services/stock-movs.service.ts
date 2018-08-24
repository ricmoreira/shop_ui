import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StockMovCreate as ReqStockMov } from '../models/request/stock-movs';
import { StockMov as RespStockMov } from '../models/response/stock-movs';
import { List as ReqList } from '../models/request/list';
import { List as ResList } from '../models/response/list';
import { Configs } from '../assets/config';
import { Router } from "@angular/router";
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/throw';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class StockMovsService {

  private _stockMovUrl: string;
  private _stockCountUrl: string;

  constructor(private http: HttpClient, private router: Router, private _authService: AuthenticationService) {
    this._stockMovUrl = `${Configs.pos_api}${Configs.pos_api_stocks}/movement`;
    this._stockCountUrl = `${Configs.pos_api}${Configs.pos_api_stocks}/count`;
  }

  /**
  * Creates a Stock Movement
  * @param req - Stock Movement Create request
  */
  create(req: ReqStockMov): Observable<RespStockMov> {
    return this.http.post<RespStockMov>(this._stockMovUrl, req, { headers: this._authService.getAdminAPIRequestHeaders() });
  }

  createMany(req: ReqStockMov[]): Observable<RespStockMov[]> {
    let responses = [];

    req.forEach(reqStockMov => {
      let response = this.http.post<RespStockMov>(this._stockMovUrl, reqStockMov, { headers: this._authService.getAdminAPIRequestHeaders() });
      responses.push(response);
    });

    return Observable.forkJoin(responses);
  }

  /**
  * Lists Stock Movements
  * @param req - List request
  */
  list(req: ReqList): Observable<ResList> {
    let url = this._stockMovUrl + `?page=${req.page}&per_page=${req.per_page}&order=${req.order}&sort=${req.sort}`

    if (req.filter != null) {
      url = url.concat(`&${req.filter.key}=${req.filter.value}`);
    }
    return this.http.get<ResList>(url, { headers: this._authService.getAdminAPIRequestHeaders() });
  }

  /**
  * Lists Stock Movements
  * @param req - List request
  */
  listStockCount(req: ReqList): Observable<ResList> {
    let url = this._stockCountUrl + `?page=${req.page}&per_page=${req.per_page}&order=${req.order}&sort=${req.sort}`

    if (req.filter != null) {
      url = url.concat(`&${req.filter.key}=${req.filter.value}`);
    }
    return this.http.get<ResList>(url, { headers: this._authService.getAdminAPIRequestHeaders() });
  }
}
