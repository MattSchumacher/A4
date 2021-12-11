import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiResponse } from '../models/article.model';
import { Observable } from 'rxjs';

@Injectable( {
  providedIn: 'root'
} )
export class NewsApiService {
  private base_url = 'https://newsapi.org/v2';
  private apiKeyHeader = new HttpHeaders( { 'X-Api-Key': '08832b7a3a5949afa40e545ce5b4b657' } );


  constructor ( private http: HttpClient ) { }

  getTopNews() {
    return this.http.get( `${this.base_url}/top-headlines?country=ca`, { headers: this.apiKeyHeader } );
  }

  getNewsByTitle( title: string ): Observable<ApiResponse> {
    return this.http.get<ApiResponse>( `${this.base_url}/everything`, {
      headers: this.apiKeyHeader, params: {
        'q': title
      }
    } );
  }
}
