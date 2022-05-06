import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class DataService {
 urlLogin: string = 'http://localhost:8080/auth/';
 url: string = 'http://localhost:8080/public/';



  constructor(private http: HttpClient) { }
  header = new HttpHeaders()
  .set('Content-Type', 'application/json');


  // *Este metodo es para el registro de clientes
  public post (url:string, body: any){
    return this.http.post(url, body);
  }

   // *Este metodo es para el inicio de sesion
   enviarCredenciales(correo:string, password:string): Observable<any>{
    const body ={
      correo,
      password
    }
  return  this.http.post(`${this.urlLogin}login`,body,{headers:this.header});
  }

  //*Este metodo es para ver solo clientes
 getClientes(){
  return this.http.get(this.url+'clientes',{headers:this.header});
 }

 //*Este metodo es para eliminar usuarios

  eliminarUsuario(id:any){
    return this.http.delete(this.url+'usuarios/delete/'+id,{headers:this.header});
  }

  
}
