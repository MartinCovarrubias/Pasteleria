import { DomSanitizer } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import {CargarScriptsService} from '../../cargar-scripts.service';
import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-add-cakes',
  templateUrl: './add-cakes.component.html',
  styleUrls: ['./add-cakes.component.css']
})
export class AddCakesComponent implements OnInit {
 cakeImg: any;
 viewImg:any;
 formAddCake: FormGroup = new FormGroup({});
  constructor(private _sanitizer: DomSanitizer,
    private DataService:DataService,
    private formBuilder:FormBuilder,
     private router: Router,
    private CargarScripts:CargarScriptsService) { }

  ngOnInit(): void {
    this.formAddCake = this.formBuilder.group(
      {
        nombre: new FormControl('',[
          Validators.required,
          Validators.pattern('[a-zA-Z ]*')
  
        ]),
        imagen_pastel:new FormControl(this.sendimg(),[
          Validators.required,
      
        ]), 
        precio:new FormControl('',[
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(8)
        ]),
        descripcion:new FormControl('',[
          Validators.required,
          Validators.pattern('[a-zA-Z ]*')
        ]), 
        estado:new FormControl('',[
          Validators.required
        ])
      }
    )
  }

  onFileChange(e: any) {
     this.cakeImg = e[0].base64.split(',')[1];
     this.viewImg = this.cakeImg;
     this.cakeImg = this._sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpg;base64,${this.cakeImg}`);
  }

  sendimg(){
    return this.viewImg;
  }



  enviarData(){
    this.formAddCake.value.imagen_pastel = this.sendimg();
    this.DataService.post('http://localhost:8080/api/pasteles/create', 
    this.formAddCake.value)
    .subscribe(respuesta => {
      Swal.fire({
        title: 'Creado',
        text: 'El pastel ha sido creado',
        icon: 'success',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.value) {
          this.router.navigate(['/tbl-cakes']);
        }
      })
     
    },
    error => {
     Swal.fire({
        title: 'Error',
        text: 'No se ha podido agregar el pastel',
        icon: 'error',
        confirmButtonText: 'Ok',
        background:'#fef2f7',
        allowOutsideClick:false,
        allowEscapeKey:true,
        allowEnterKey:true,
        padding: '2rem',
        backdrop:true
    }
    ).then (()=>{
      window.location.reload();

    });
    });
  }


}
