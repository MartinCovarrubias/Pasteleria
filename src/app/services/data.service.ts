import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {
 url: string = 'http://localhost:3000/api/';



  constructor(private http: HttpClient) { }

  public post (url:string, body: any){
    return this.http.post(url, body);
  }
    
  
}
