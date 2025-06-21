import { Injectable } from '@angular/core';
import { catchError, firstValueFrom, map, Observable, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientService } from './http-client.service';
import { environment } from '../../environments/environment';
import { ILoginPayload } from '../core/interfaces/auth.service.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly AiServiceEndPoint = environment.ai_service_endpoint;


  constructor(private httpClientService: HttpClientService) { }

  isAuthenticated() {
    return this.httpClientService
      .get<any>(`${this.AiServiceEndPoint}/user/validate-session`)
      .pipe(
        map(() => true),
        catchError(() => {
          return of(false);
        })
      );
  }
  SignUp(payload: ILoginPayload) {
    return this.httpClientService.post(
      `${this.AiServiceEndPoint}/user/no-check/signup`,
      payload
    ).pipe(
      catchError((error: HttpErrorResponse) => { throw error; })
    );
  }

  login(payload: ILoginPayload): Observable<any> {
    return this.httpClientService.post(
      `${this.AiServiceEndPoint}/user/no-check/login`,
      payload
    ).pipe(
      catchError((error: HttpErrorResponse) => { throw error; })
    );
  }
  LogOut(): Promise<any> {
    const observable = this.httpClientService.post(
      `${this.AiServiceEndPoint}/user/logout`,
    ).pipe(
      catchError((error: HttpErrorResponse) => { throw error; })
    );
    return firstValueFrom(observable);
  }

}
