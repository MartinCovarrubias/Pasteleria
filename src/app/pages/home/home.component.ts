import { Component, OnInit } from '@angular/core';
import {CargarScriptsService} from '../../cargar-scripts.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public edit : boolean;
  constructor(private _CargarScripts:CargarScriptsService,private cookie:CookieService) { 
   _CargarScripts.carga('arriba.js');
  }

  ngOnInit(): void {
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
