import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  constructor(private http: HttpClient) { }
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  post<T>(
    url: string,
    body?: any,
    params?: any,
    withCredentials: boolean = true
  ): Observable<T> {
    const httpParams = new HttpParams({
      fromObject: params || {},
    });
    return this.http.post<T>(url, body, {
      headers: this.getHeaders(),
      withCredentials,
      params: httpParams,
    });
  }
  get<T>(
    url: string,
    params?: any,
    withCredentials: boolean = true
  ): Observable<T> {
    const httpParams = new HttpParams({
      fromObject: params || {},
    });
    return this.http.get<T>(url, {
      headers: this.getHeaders(),
      withCredentials,
      params: httpParams,
    });
  }

  delete<T>(
    url: string,
    params?: any,
    withCredentials: boolean = true
  ): Observable<T> {
    const httpParams = new HttpParams({
      fromObject: params || {},
    });
    return this.http.delete<T>(url, {
      headers: this.getHeaders(),
      withCredentials,
      params: httpParams,
    });
  }

}
