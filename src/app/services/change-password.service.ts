import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChangePasswordDTO } from '../model/change-password-dto';
import { EmailValuesDTO } from '../model/email-values-dto';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  URL = "http://localhost:8085/email"

  constructor(private httpClient: HttpClient) { }

  public sendEmail(dto: EmailValuesDTO): Observable<any>{
    return this.httpClient.post<any>(this.URL + "/send-html", dto);
   }
   public changePassword(dto: ChangePasswordDTO): Observable<any>{
    return this.httpClient.post<any>(this.URL + "/change-password", dto);
   }
}
