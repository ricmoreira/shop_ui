import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { List as ReqList} from '../models/request/list';
import { List as ResList} from '../models/response/list';
import { Configs } from '../assets/config';
import { Router } from "@angular/router";
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class HeadersService {

  private _headers_Url: string;

  constructor(private http: HttpClient, private router: Router, private _authService: AuthenticationService) {
    this._headers_Url = Configs.pos_api + Configs.pos_api_headers;
  }

  /**
  * Lists Headers
  * @param req - List request
  */
  list(req: ReqList): Observable<ResList> {
    let url = this._headers_Url + `?page=${req.page}&per_page=${req.per_page}&order=reverse&sort=_id`
    return this.http.get<ResList>(url, { headers: this._authService.getAdminAPIRequestHeaders() });
  }
}