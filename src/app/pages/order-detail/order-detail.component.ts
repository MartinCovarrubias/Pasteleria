import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import {  FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
public hidden: boolean = true;
pastelid = this.activerouter.snapshot.paramMap.get('id');
datosPastel:any;
id_pedidos:any;
pedido:any;
total:number;
precio:number;
formpedido: FormGroup = new FormGroup({});
public datos:any [] = [];


  constructor(private DataService:DataService,
    private activerouter: ActivatedRoute,
    private CookieService:CookieService,
    private formBuilder:FormBuilder,) { }

  ngOnInit(): void {
    this.DataService.getCake(this.pastelid).subscribe(data =>{
      this.datosPastel = data;
      this.datos.push(this.datosPastel);
      this.precio = this.datosPastel.precio;

     })
     this.formpedido = this.formBuilder.group(
      {
        id_usuario: new FormControl({ value: this.getIdUser(), disabled: true }),
        fecha_pedido: new FormControl({ value:this.getDate(), disabled: true }),
        estado: new FormControl({ value:'pendiente', disabled: true }),
        
        cantidad:new FormControl('',[
          Validators.required,
          Validators.pattern('[1-9]*')
        ])
        
      }
    )
  }


enviarData(){
  this.formpedido.value.id_usuario = this.getIdUser();
  this.formpedido.value.fecha_pedido = this.getDate();
  this.formpedido.value.estado = 'pendiente';
  this.DataService.post('http://localhost:8080/api/pedidos/create', 
  this.formpedido.value)
  .subscribe(data =>{
    this.pedido=data;
    this.id_pedidos = this.pedido.id;
    this.DataService.post('http://localhost:8080/api/carrito/create',
    {
      id_pedido:this.id_pedidos,
      id_pastel:this.pastelid
    }).subscribe(data=>{
      console.log(data);
    }
    )
  })
}



  getIdUser(){
    return this.CookieService.get('id_usuario');
  }

  obtenertotal(){
    this.total = this.formpedido.value.cantidad * this.precio;
    return this.total;
  }

 
  getDate() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    return year + '-' + month + '-' + day;
  }
}
