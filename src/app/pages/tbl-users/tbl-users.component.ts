import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tbl-users',
  templateUrl: './tbl-users.component.html',
  styleUrls: ['./tbl-users.component.css']
})
export class TblUsersComponent implements OnInit,OnDestroy {
  clientes:any;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<any>();
  
  constructor(private dataservice: DataService, private router:Router) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      language: {
        "url": "//cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json"
      }
     
    };

   //consumir servicio que esta dentro de un arreglo
    this.dataservice.getClientes().subscribe(
      (data)=>{
        this.clientes = data;
        this.dtTrigger.next(0);
      });

    
  }

  ngOnDestroy():void {
    this.dtTrigger.unsubscribe();
  }


//*Este metodo es para eliminar usuarios
  eliminarUsuario(id:any){
    this.dataservice.eliminarUsuario(id).subscribe(
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
          this.clientes = data;
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



  editarUsuario(id: any){
    this.router.navigate(['/edit-user/',id]);
  }










}
