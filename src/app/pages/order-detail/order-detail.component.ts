import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
public hidden: boolean = true;
pastelid = this.activerouter.snapshot.paramMap.get('id');
datosPastel:any;
  constructor(private DataService:DataService,
    private activerouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.DataService.getCake(this.pastelid).subscribe(data =>{
      this.datosPastel = data;
    
     })
  }

//calcular el total de la orden



 
  getDate() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    return year + '-' + month + '-' + day;
  }
}
