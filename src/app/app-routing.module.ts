import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { TblUsersComponent } from './pages/tbl-users/tbl-users.component';

const routes: Routes = [
  { path:'', component:HomeComponent},
  { path:'login', component:LoginComponent},
  { path:'register', component:RegisterComponent},
  { path:'tbl-users', component:TblUsersComponent},
  { path:'edit-user/:id', component:EditUserComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
