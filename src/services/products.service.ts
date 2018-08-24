import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product as ReqProduct } from '../models/request/products';
import { Product as RespProduct } from '../models/response/products';
import { List as ReqList} from '../models/request/list';
import { List as ResList} from '../models/response/list';
import { Configs } from '../assets/config';
import { Router } from "@angular/router";
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class ProductsService {

  private _products_Url: string;

  constructor(private http: HttpClient, private router: Router, private _authService: AuthenticationService) {
    this._products_Url = Configs.pos_api + Configs.pos_api_products;
  }

  /**
  * Creates a Product
  * @param req - Product Create request
  */
  create(req: ReqProduct): Observable<RespProduct> {
    return this.http.post<RespProduct>(this._products_Url, req, { headers: this._authService.getAdminAPIRequestHeaders() });
  }

  /**
  * Lists Products
  * @param req - List request
  */
  list(req: ReqList): Observable<ResList> {
    let url = this._products_Url + `?page=${req.page}&per_page=${req.per_page}&order=${req.order}&sort=${req.sort}`

    if (req.filter != null) {
      url = url.concat(`&${req.filter.key}=${req.filter.value}`);
    }
    return this.http.get<ResList>(url, { headers: this._authService.getAdminAPIRequestHeaders() });
  }
}