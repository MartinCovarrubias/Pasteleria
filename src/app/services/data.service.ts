import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {
 urlLogin: string = 'http://localhost:8080/auth/';



  constructor(private http: HttpClient) { }
  header = new HttpHeaders()
  .set('Content-Type', 'application/json');

  public post (url:string, body: any){
    return this.http.post(url, body);
  }

   //metodo encargado de hacer el login con cabezera form-data
   enviarCredenciales(correo:string, password:string): Observable<any>{
    const body ={
      correo,
      password
    }
  return  this.http.post(`${this.urlLogin}login`,body,{headers:this.header});
  }


  
}
