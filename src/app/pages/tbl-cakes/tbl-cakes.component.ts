import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-tbl-cakes',
  templateUrl: './tbl-cakes.component.html',
  styleUrls: ['./tbl-cakes.component.css']
})
export class TblCakesComponent implements OnInit {

  constructor(private dataservice: DataService, private router:Router,private _sanitizer: DomSanitizer) { }
  public previsualizacion: string;
  public archivos: any = [];

  cakes:any;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<any>();

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      language: {
        "url": "//cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json"
      }
     
    };
    this.dataservice.getCakes().subscribe(
      (data)=>{
        console
        this.cakes = data;
        this.dtTrigger.next(0);
        this.cakes['imagen_pastel'] = this._sanitizer.bypassSecurityTrustResourceUrl(this.cakes['imagen_pastel']);
      });

}




ngOnDestroy():void {
  this.dtTrigger.unsubscribe();
}


editarCakes(id: any){
  //this.router.navigate(['/edit-user/',id]);
}

eliminarCakes(id: any){
  this.dataservice.eliminarCakes(id).subscribe(
    (data)=>{
      Swal.fire({
        title: 'Eliminado',
        text: 'El usuario ha sido eliminado',
        icon: 'success',
        confirmButtonText: 'Ok',
        background:'#fef2f7',
        allowOutsideClick:true,
        allowEscapeKey:true,
        allowEnterKey:true,
        padding: '2rem',
        backdrop:true
      }).then(()=>{
        this.cakes = data;
        window.location.reload();
       
      }
      )


    },
    error =>{
      Swal.fire({
        title: 'Error',
        text: 'No se pudo eliminar el usuario',
        icon: 'error',
        confirmButtonText: 'Ok',
        background:'#fef2f7',
        allowOutsideClick:true,
        allowEscapeKey:true,
        allowEnterKey:true,
        padding: '2rem',
        backdrop:true
      }).then(()=>{
       window.location.reload();
        console.log(error, "no se pudo eliminar");
      }
      )
      
    })
}









}