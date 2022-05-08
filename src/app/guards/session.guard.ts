import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanActivate {

constructor(private cookieService: CookieService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.revisaSession();
  }

  revisaSession(): boolean {
    try{
    const token:boolean = this.cookieService.check('token');
    if(token ){
     return token;
    }else{
      Swal.fire({
        title: 'Error',
        text: 'No has iniciado sesión',
        icon: 'error'
      });
      this.router.navigate(['/']);
      return false;
    }

    }catch (e) {
      console.log('No hay session');
      return false;

    }

}

}