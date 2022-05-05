import { Component, OnInit } from '@angular/core';
import {CargarScriptsService} from '../../cargar-scripts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _CargarScripts:CargarScriptsService) { 
   _CargarScripts.carga('arriba.js');
  }

  ngOnInit(): void {
  }

}
