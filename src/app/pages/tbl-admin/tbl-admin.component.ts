import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tbl-admin',
  templateUrl: './tbl-admin.component.html',
  styleUrls: ['./tbl-admin.component.css']
})
export class TblAdminComponent implements OnInit {
  admins:any;
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

  
    this.dataservice.getAdmins().subscribe(
      (data)=>{
        this.admins = data;
        this.dtTrigger.next(0);
      });

  }

  ngOnDestroy():void {
    this.dtTrigger.unsubscribe();
  }


  editarUsuario(id: any){
    this.router.navigate(['/edit-user/',id]);
  }

}
