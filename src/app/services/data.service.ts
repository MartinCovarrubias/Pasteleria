import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioI } from '../models/usuario.interface';
import { ResponseI } from '../models/response.interface';
import { CookieService } from 'ngx-cookie-service';
import { PastelI } from '../models/pastel.interface';



@Injectable({
  providedIn: 'root'
})
export class DataService {
 urlLogin: string = 'http://localhost:8080/auth/';
 url: string = 'http://localhost:8080/api/';
 urlp: string = 'http://localhost:8080/public/';
 header = new HttpHeaders()


  constructor(private http: HttpClient, private cookieService: CookieService) { 
    const token = this.cookieService.get('token');
    this.header.append('Content-Type', 'application/json');
   // this.header.append('HTTP_AUTHORIZATION', 'Bearer ' + token);

  }
  

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
  return this.http.get(this.url+'clientes');
 }

 //*Este metodo es para eliminar usuarios

  eliminarUsuario(id:any){
    return this.http.delete(this.url+'usuarios/delete/'+id,{headers:this.header});
  }

  //*Este metodo es para ver un solo usuario
  getUser(id:any):Observable<UsuarioI>{
    let direccion = this.url + "usuarios/edit/" + id;
    return this.http.get<UsuarioI>(direccion);
  }

  //*Este metodo es para ver los roles
  getRoles(){
    return this.http.get(this.url+'roles',{headers:this.header});
  }

  //*metodo para editar usuario
editUser(form:UsuarioI,id:any):Observable<ResponseI>{
  let direccion = this.url + "usuarios/update/" + id;
  return this.http.put<ResponseI>(direccion,form);
  }

  //*metodo para ver los administradores
  getAdmins(){
    return this.http.get(this.url+'administradores');
   }

   //* para ver todos los pasteles 

   getCakes(){
    return this.http.get(this.url+'pasteles');
   }

   getCakesC(){
    return this.http.get(this.urlp+'pasteles');
   }

   
//* metodo para eliminar un pastel
   eliminarCakes(id:any){
    return this.http.delete(this.url+'pasteles/delete/'+id,{headers:this.header});
  }

  //* metodo para ver un solo pastel
  getCake(id:any):Observable<PastelI>{
    let direccion = this.url + "pasteles/edit/" + id;
    return this.http.get<PastelI>(direccion);
  }

//* metodo para editar un pastel
  editCake(form:PastelI,id:any):Observable<ResponseI>{
    let direccion = this.url + "pasteles/update/" + id;
    return this.http.put<ResponseI>(direccion,form);
  }
  
  
}
