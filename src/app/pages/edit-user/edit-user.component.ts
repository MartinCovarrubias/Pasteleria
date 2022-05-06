import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { UsuarioI } from '../../models/usuario.interface'
import { DataService } from 'src/app/services/data.service'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { CookieService } from 'ngx-cookie-service'
import { ResponseI } from '../../models/response.interface';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  constructor(
    private activerouter: ActivatedRoute,
    private router: Router,
    private api: DataService,
    private cookie: CookieService
  ) { }

  public edit : boolean;

   roles:any;
  datosUsuarios:UsuarioI;
  usuarioid = this.activerouter.snapshot.paramMap.get('id');

  editarForm = new FormGroup({
    nombre: new FormControl({ value: "", disabled: true }),
    apellidoP: new FormControl({ value: "", disabled: true }),
    correo: new FormControl({ value: "", disabled: true }),
   
    password: new FormControl({ value: "", disabled: true }),
    telefono:new FormControl('',[
      Validators.required,
      Validators.pattern('[0-9]*')
    ]),
    direccion:new FormControl('',[
      Validators.required,
      Validators.pattern('[a-zA-Z0-9 ]*')
    ]),

    
    id_rol:new FormControl('',[
      Validators.required,
      Validators.pattern('[a-zA-Z0-9 ]*')
    ]),



  })

  ngOnInit(): void {
  
    this.api.getUser(this.usuarioid).subscribe(data =>{
      this.datosUsuarios = data;
       console.log(this.datosUsuarios.id_rol);
       this.getRoles();
      
      this.editarForm.setValue({
         'nombre': this.datosUsuarios.nombre, 
         'apellidoP': this.datosUsuarios.apellidoP,
         'correo': this.datosUsuarios.correo,
          'password': this.datosUsuarios.password,
          'telefono': this.datosUsuarios.telefono,
          'direccion': this.datosUsuarios.direccion,
          'id_rol': this.datosUsuarios.id_rol
      });
    
     })
}

  postForm(form: UsuarioI){
    
    this.api.editUser(form,this.usuarioid).subscribe(data=>{
      console.log(data);
      
     })
 
  }
 

    getRoles(){
      this.api.getRoles().subscribe
      (data =>{
     this.roles = data;
      })
    }

    ocultar(){
      const token = this.cookie.check('token');
    
       if (token==true){
        return  this.edit = false;
       }else{
         return this.edit = true;
       }
     }

     ocultarA(){
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

    ocultarU(){
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
