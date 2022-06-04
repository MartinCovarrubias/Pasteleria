import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';
import {CargarScriptsService} from '../../cargar-scripts.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formlogin: FormGroup = new FormGroup({});


  constructor(
    private ds:DataService,
     private cookie:CookieService, 
     private router:Router,
     private activerouter:ActivatedRoute,
     private CargarScripts:CargarScriptsService) {
      CargarScripts.carga('form-validations.js');
      }

  ngOnInit(): void {
    this.formlogin=new FormGroup(
      {
      email: new FormControl('',[
        Validators.required,
        Validators.email

      ]),
      password:new FormControl('',[
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(8)
      ]),
     
    }
    )
  }

  enviarLogin(){
    const {email, password} = this.formlogin.value
    this.ds.enviarCredenciales(email, password)
    .subscribe(response =>{
           Swal.fire({
        title: 'Bienvenido',
        text: 'Has iniciado sesión correctamente',
        icon: 'success',
        confirmButtonText: 'Ok',
        background:'#fef2f7',
        allowOutsideClick:true,
        allowEscapeKey:true,
        allowEnterKey:true,
        padding: '2rem',
        backdrop:true
       
      
      }).then(()=>{
    
      }
      )
     
     
  
      const {token} = response;
      const {id_usuario} = response;
      const {id_rol} = response;
      this.cookie.set('id_rol',id_rol);
      this.cookie.set('id_usuario',id_usuario);
      //duracion del token de una hora
      this.cookie.set('token',token,1/24);
     //si id_rol es 1 es admin redirecciona a la pagina de view pedidos
      if(id_rol==1){
        this.router.navigate(['/view-pedidos']);
      }else{
        this.router.navigate(['/']);
      }
      

    },
      error =>{
      console.log('error al iniciar sesion'); 
      const err = error
      Swal.fire({
        title: 'Error',
        text: 'Correo o contraseña incorrectos',
        icon: 'error',
        confirmButtonText: 'Ok',
        background:'#fef2f7',
        allowOutsideClick:false,
        allowEscapeKey:false,
        allowEnterKey:false,
        padding: '2rem',
        backdrop:true
      
      }
      ).then(()=>{
        this.formlogin.reset();
      }
      )
     
    })
  }



  
}

