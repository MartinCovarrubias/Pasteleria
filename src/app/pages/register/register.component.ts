import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'; 
import {CargarScriptsService} from '../../cargar-scripts.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formregistro: FormGroup = new FormGroup({});

  constructor(
    private DataService:DataService,
    private formBuilder:FormBuilder,
     private router: Router,
    private CargarScripts:CargarScriptsService) {
    CargarScripts.carga('form-validations.js');
     }

  ngOnInit(): void {
    this.formregistro = this.formBuilder.group(
      {
        nombre: new FormControl('',[
          Validators.required,
          Validators.pattern('[a-zA-Z ]*')
  
        ]),
        apellidoP:new FormControl('',[
          Validators.required,
          Validators.pattern('[a-zA-Z ]*')
        ]),
        correo:new FormControl('',[
          Validators.required,
          Validators.email
        ]), 
        telefono:new FormControl('',[
          Validators.required,
          Validators.pattern('[0-9]*')
        ]),
        direccion:new FormControl('',[
          Validators.required,
          Validators.pattern('[a-zA-Z0-9 ]*')
        ]),
        password:new FormControl('',[
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(8)
        ]),
      }
    )
  }


public enviarData(){
  this.DataService.post('http://localhost:8080/public/usuarios/create', 
  this.formregistro.value)
  .subscribe(respuesta => {
    console.log('usuario agregado');
  })
}


}