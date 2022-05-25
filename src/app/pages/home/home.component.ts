import { Component, OnInit } from '@angular/core';
import {CargarScriptsService} from '../../cargar-scripts.service';
import { CookieService } from 'ngx-cookie-service';
import { DataService } from '../../services/data.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public edit : boolean;
  cakes:any;
  estado:any;
  contador:number = 0;
  idsAgregados: number[] = [];
  contadorParaLosIDs: number = 0;

  constructor(private _CargarScripts:CargarScriptsService,
    private cookie:CookieService,
    private DataService:DataService,
    private _sanitizer: DomSanitizer,
    private router:Router,
    private notificaciones:NotifyService) { 
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

   orderdetail(id: any){
    this.router.navigate(['/order-detail/',id]);
  }




mandarValor(id: number) {
  //deshabilitamos el boton despues de dar el click
  this.idsAgregados[this.contadorParaLosIDs] = id;
  this.contadorParaLosIDs++;
  if (this.contador >= 20){
    console.log("Ya no puedes agregar mas articulos kbron!!!!")
  }else {
    this.contador = this.contador + 1;
    this.notificaciones.enviarContador(this.contador);
  }
}

checarId(id: number): boolean {
  //haremos un foreach para los ids agregados del array
  for (let i = 0; i < this.idsAgregados.length; i++) {
    if (this.idsAgregados[i] == id) {
      //si esto es verdad, entonces desactivame el boton
      return true;
    }
  }
  return false;
}

}
