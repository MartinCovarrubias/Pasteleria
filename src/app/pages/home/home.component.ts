import { Component, OnInit } from '@angular/core';
import {CargarScriptsService} from '../../cargar-scripts.service';
import { CookieService } from 'ngx-cookie-service';
import { DataService } from '../../services/data.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public edit : boolean;
  cakes:any;
  estado:any;
  constructor(private _CargarScripts:CargarScriptsService,
    private cookie:CookieService,
    private DataService:DataService,
    private _sanitizer: DomSanitizer) { 
   _CargarScripts.carga('arriba.js');
  }

  ngOnInit(): void {
    this.DataService.getCakesC().subscribe(
      (data)=>{
        this.cakes = data;
        this.cakes['imagen_pastel'] = this._sanitizer.bypassSecurityTrustResourceUrl(this.cakes['imagen_pastel']);
     
      
      }
    );

  }

  hiddenElments(){
    const token = this.cookie.check('token');
  
     if (token==true){
      return  this.edit = false;
     }else{
       return this.edit = true;
     }
   }

 

}
