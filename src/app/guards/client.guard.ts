import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate,Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ClientGuard implements CanActivate {
  constructor(private cookieService: CookieService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.revisarol();
  }

  revisarol(): boolean {
    try{
      const id_rol:string = this.cookieService.get('id_rol');
      if(id_rol!=='1'){
        return true;
      }else{
        this.router.navigate(['/view-pedidos']);
        return false;
      }
    }
    catch (e) {
     
      return false;
    }
  }
  
}
