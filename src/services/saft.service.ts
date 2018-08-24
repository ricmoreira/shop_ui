import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Configs } from '../assets/config';
import { Router } from "@angular/router";
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { AuthenticationService } from './authentication.service';
import { SaftToKafka } from '../models/response/saft-to-kafka';
import { Observable } from 'rxjs';

@Injectable()
export class SAFTService {

  private _saft_upload_Url: string;

  public fileToUpload: File;

  constructor(private http: HttpClient, private router: Router, private _authService: AuthenticationService) {
    this._saft_upload_Url = Configs.pos_api + Configs.pos_api_saft + '/upload';
  }


  postFile(fileToUpload: File): Observable<SaftToKafka> {
    const formData = new FormData();
    formData.append('SAFT-XML', fileToUpload, fileToUpload.name);

    return this.http.post<SaftToKafka>(this._saft_upload_Url, formData, { headers: this._authService.getJWTHeaders() })
  }
}
