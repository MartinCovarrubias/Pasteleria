import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientGuard } from './guards/client.guard';
import { RolGuard } from './guards/rol.guard';
import { SessionGuard } from './guards/session.guard';
import { AddCakesComponent } from './pages/add-cakes/add-cakes.component';
import { EditCakesComponent } from './pages/edit-cakes/edit-cakes.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { OrderDetailComponent } from './pages/order-detail/order-detail.component';
import { RegisterComponent } from './pages/register/register.component';
import { TblAdminComponent } from './pages/tbl-admin/tbl-admin.component';
import { TblCakesComponent } from './pages/tbl-cakes/tbl-cakes.component';
import { TblUsersComponent } from './pages/tbl-users/tbl-users.component';
import { ViewPedidosComponent } from './pages/view-pedidos/view-pedidos.component';

const routes: Routes = [
  { path:'', component:HomeComponent},
  { path:'login', component:LoginComponent},
  { path:'register', component:RegisterComponent},
  { path:'home', component:HomeComponent, canActivate:[ClientGuard]},

  { path:'tbl-users', component:TblUsersComponent, canActivate: [SessionGuard,RolGuard]},
  { path:'tbl-admin', component:TblAdminComponent, canActivate: [SessionGuard,RolGuard]},
  { path:'tbl-cakes', component:TblCakesComponent, canActivate: [SessionGuard,RolGuard]},
  { path:'edit-user/:id', component:EditUserComponent,canActivate: [SessionGuard]},
  { path:'add-cakes', component:AddCakesComponent,canActivate: [SessionGuard,RolGuard]},
  {path: 'editCakes/:id', component:EditCakesComponent,canActivate: [SessionGuard,RolGuard]},
  { path:'view-pedidos', component:ViewPedidosComponent,canActivate: [SessionGuard,RolGuard]},
  { path:'order-detail/:id', component:OrderDetailComponent,canActivate: [SessionGuard,ClientGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
