import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-pedidos',
  templateUrl: './view-pedidos.component.html',
  styleUrls: ['./view-pedidos.component.css']
})
export class ViewPedidosComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<any>();
  pedidos:any;

  constructor(private dataservice: DataService, private router:Router) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      language: {
        "url": "//cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json"
      }
     
  }
  this.dataservice.getAllpedidos().subscribe(
    (data)=>{
      this.pedidos = data;
     // console.log(this.pedidos);
      this.dtTrigger.next(0);
    });

}


ngOnDestroy():void {
  this.dtTrigger.unsubscribe();
}

editarPedido(id:any){
this.router.navigate(['/editorders',id]);
}

}