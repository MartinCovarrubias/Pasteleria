import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { DataService } from 'src/app/services/data.service'
import { Router, ActivatedRoute } from '@angular/router'
import { CookieService } from 'ngx-cookie-service'
import { PedidoI } from '../../models/pedido.interface'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-editorders',
  templateUrl: './editorders.component.html',
  styleUrls: ['./editorders.component.css']
})
export class EditordersComponent implements OnInit {

  constructor(  private activerouter: ActivatedRoute,
    private router: Router,
    private api: DataService,
    private cookie: CookieService) { }

estados:any;
datosPedidos:PedidoI;
pedidoid = this.activerouter.snapshot.paramMap.get('id');

editarForm = new FormGroup({
  id_pedido: new FormControl({ value: "", disabled: true }),
  fecha_pedido: new FormControl({ value: "", disabled: true }),
  cantidad: new FormControl({ value: "", disabled: true }),
  estado:new FormControl('',[
    Validators.required,
  ]),
})


  ngOnInit(): void {
    this.api.getPedido(this.pedidoid).subscribe(data =>{
      this.datosPedidos = data;
     // console.log(this.datosPedidos);
      this.editarForm.setValue({
         'id_pedido': this.datosPedidos.id_pedido, 
         'fecha_pedido': this.datosPedidos.fecha_pedido,
         'cantidad': this.datosPedidos.cantidad,
          'estado': this.datosPedidos.estado,
      });
    
     })

}

postForm(form: PedidoI){
    
  this.api.editPedido(form,this.pedidoid).subscribe(data=>{
  Swal.fire({
    icon: 'success',
    title: 'Pedido editado',
    showConfirmButton: true,
    background:'#fef2f7',
      allowOutsideClick:true,
      allowEscapeKey:true,
      allowEnterKey:true,
      padding: '2rem',
      backdrop:true
  }).then((result) => {
    if (result.value) {
      this.router.navigate(['/view-pedidos']);
    }
  }
  )
    
   },
   (error)=>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Algo salio mal!',
        showConfirmButton: true,
        background:'#fef2f7',
        allowOutsideClick:true,
        allowEscapeKey:true,
        allowEnterKey:true,
        padding: '2rem',
        backdrop:true
      })
    }
  )

}





}