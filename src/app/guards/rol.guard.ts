import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot,Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class RolGuard implements CanActivate {
  constructor(private cookieService: CookieService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   return this.revisarol();
  }

  revisarol(): boolean {
    try{
      const id_rol:string = this.cookieService.get('id_rol');
      if(id_rol==='1'){
        return true;
      }else{
        Swal.fire({
          title: 'Error',
          text: 'No tiene permisos para acceder a esta página',
          icon: 'error'
        });
        this.router.navigate(['/']);
        return false;
      }
    }
    catch (e) {
      console.log('No hay session');
      return false;
    }
  }



  
}
