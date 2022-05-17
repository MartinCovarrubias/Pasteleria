import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor() { }


  contador: number = 0;
  private enviarContadorSubject = new Subject<number>();
  public enviarContadorObservable = this.enviarContadorSubject.asObservable();

  enviarContador(contador: number) {
    this.enviarContadorSubject.next(contador);
    //this.contador = contador;
  }

}



