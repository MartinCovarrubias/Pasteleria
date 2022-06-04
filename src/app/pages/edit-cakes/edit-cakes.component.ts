import { DomSanitizer } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import {CargarScriptsService} from '../../cargar-scripts.service';
import Swal from 'sweetalert2'; 
import { PastelI } from 'src/app/models/pastel.interface';


@Component({
  selector: 'app-edit-cakes',
  templateUrl: './edit-cakes.component.html',
  styleUrls: ['./edit-cakes.component.css']
})
export class EditCakesComponent implements OnInit {
  cakeImg: any;
  viewImg:any;
  pastelid = this.activerouter.snapshot.paramMap.get('id');
  datosPastel:PastelI;
  constructor(
    private DataService:DataService,
    private formBuilder:FormBuilder,
     private router: Router,
     private _sanitizer: DomSanitizer,
     private activerouter: ActivatedRoute
  ) { }

    formEditCake = new FormGroup({
      nombre:new FormControl('',[
        Validators.required,
        Validators.pattern('[a-zA-Z]*')
      ]),

      imagen_pastel:new FormControl('',[
        Validators.required,
      ]),

      precio:new FormControl('',[
      Validators.required,
      Validators.pattern('[0-9]*'),
      Validators.minLength(1),
      Validators.maxLength(8)
    ]),

    descripcion:new FormControl('',[
      Validators.required,
      Validators.pattern('[a-zA-Z0-9 ]*')
    ]),

    
    estado:new FormControl('',[
      Validators.required,
      Validators.pattern('[a-zA-Z]*')
    ]),
  })



  ngOnInit(): void {
    this.DataService.getCake(this.pastelid).subscribe(data =>{
      this.datosPastel = data;
      this.formEditCake.setValue({
         'nombre': this.datosPastel.nombre, 
          'imagen_pastel': "",
          'precio': this.datosPastel.precio,
          'descripcion': this.datosPastel.descripcion,
          'estado': this.datosPastel.estado,
      });
    
     })
  }



enviarData(form : PastelI){
  this.formEditCake.value.imagen_pastel = this.sendimg();
  this.DataService.editCake(form,this.pastelid).subscribe(data =>{
    Swal.fire({
      icon: 'success',
      title: 'Pastel editado',
      showConfirmButton: false,
      background:'#fef2f7',
      timer: 2500
    })
   this.router.navigate(['/tbl-cakes']);
  })
}

sendimg(){
  return this.viewImg;
}

  onFileChange(e: any) {
    this.cakeImg = e[0].base64.split(',')[1];
    this.viewImg = this.cakeImg;
    this.cakeImg = this._sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpg;base64,${this.cakeImg}`);
 }

}
