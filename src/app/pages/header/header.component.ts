import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private cookie:CookieService) { }

  //declarame la variable edit tipo  boolean
  public edit : boolean;



  ngOnInit(): void {
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

}
