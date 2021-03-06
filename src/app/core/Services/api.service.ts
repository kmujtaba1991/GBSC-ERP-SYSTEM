import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { _throw } from 'rxjs/observable/throw';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ApiService {
    constructor(
        public http: HttpClient,
        // public jwtService: JwtService
    ) { }

    public formatErrors(error: any) {
        return _throw(error.error);
    }

    get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
        console.log(`${environment.api_url}${path}`);
        return this.http.get(`${environment.api_url}${path}`, { params })
            .pipe(catchError(this.formatErrors));
    }

    put(path: string, body: Object = {}): Observable<any> {
        return this.http.put(
            `${environment.api_url}${path}`,
            body
        ).pipe(catchError(this.formatErrors));
    }

    post(path: string, body: Object = {}): Observable<any> {
        return this.http.post(
            `${environment.api_url}${path}`,
            body
        ).pipe(catchError(this.formatErrors));
    }

    delete(path): Observable<any> {
        return this.http.delete(
            `${environment.api_url}${path}`
        ).pipe(catchError(this.formatErrors));
    }
}
