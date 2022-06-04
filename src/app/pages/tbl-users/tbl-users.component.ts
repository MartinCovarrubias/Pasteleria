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
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, eliminar!',
      background:'#fef2f7',
    }).then((result) => {
      if(result.isConfirmed){
        this.dataservice.eliminarUsuario(id).subscribe(
          (data)=>{
            Swal.fire({
              title: '¡Eliminado!',
              text: 'El cliente ha sido eliminado.',
              icon: 'success',
              confirmButtonText: '¡Listo!',
              background:'#fef2f7',
            }).then(() => {
              window.location.reload();
            });
          },
          (error)=>{
            Swal.fire({
              title: '¡Error!',
              text: 'No se pudo eliminar el cliente.',
              icon: 'error',
              confirmButtonText: '¡Listo!',
              background:'#fef2f7',
            }).then(() => {
              window.location.reload();
            }
            );
          }
    
          );
      }
    });
  }


  editarUsuario(id: any){
    this.router.navigate(['/edit-user/',id]);
  }










}
