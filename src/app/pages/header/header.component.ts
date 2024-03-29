import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { NotifyService } from 'src/app/services/notify.service';
import { DataService } from '../../services/data.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  public edit : boolean;
  contador:number = 0;

 pedido:any;
  constructor(private cookie:CookieService,
    private router:Router,
    private notificaciones:NotifyService,
    private DataService:DataService, 
    private _sanitizer: DomSanitizer) { }



  ngOnInit(): void {
    this.notificaciones.enviarContadorObservable.subscribe(res => {
      this.contador = res;
    });
     //si existe el token
      const token = this.cookie.check('token');
      if (token==true){
        this.DataService.getPedidos(this.cookie.get('id_usuario')).subscribe(
          (data)=>{
            this.pedido = data;
          
          }
        )
      }
  }


  // logout function
  logout(){
    this.cookie.delete('token');
    this.cookie.delete('id_rol');
    this.cookie.delete('id_usuario');
  
  }

  hiddenElments(){
    const token = this.cookie.check('token');
  
     if (token==true){
      return  this.edit = false;
     }else{
       return this.edit = true;
     }
   }

   hiddenElmentsAdmin(){
    const rol_id = this.cookie.get('id_rol');
    const token = this.cookie.check('token');

    if (rol_id == '1' && token==true){
      
      return  this.edit = true;
    }if(rol_id == '2' && token == true){
      return this.edit = false;
    
    }else{
      return this.edit = false;
    }
  }

hiddenElmentsUser(){
  const rol_id = this.cookie.get('id_rol');
  const token = this.cookie.check('token');
  if (rol_id == '2' && token==true){
    return  this.edit = true;
  }
  if(rol_id == '1' && token == true){
    return this.edit = false;
  
  }
  else{
    return this.edit = false;
  }
}



editarUsuario(){
  const id_usuario = this.cookie.get('id_usuario');
  this.router.navigate(['/edit-user',id_usuario]);
}

ocultahome(){
 //si id_rol es 1 redirecciona a tbl-pedidos, si es 2 a home
  const rol_id = this.cookie.get('id_rol');
  const token = this.cookie.check('token');
  if (rol_id == '1' && token==true){
    this.router.navigate(['/view-pedidos']);
  }
  if(rol_id == '2' && token == true){
    this.router.navigate(['/home']);
  
  }
}




}
