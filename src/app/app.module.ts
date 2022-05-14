import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {CargarScriptsService} from './cargar-scripts.service';
import { CookieService } from 'ngx-cookie-service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './pages/footer/footer.component';
import { HeaderComponent } from './pages/header/header.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TblUsersComponent } from './pages/tbl-users/tbl-users.component';
import { DataTablesModule } from "angular-datatables";
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { InjectSessionInterceptor } from './interceptors/inject-session.interceptor';
import { TblAdminComponent } from './pages/tbl-admin/tbl-admin.component';
import { TblCakesComponent } from './pages/tbl-cakes/tbl-cakes.component';
import { AddCakesComponent } from './pages/add-cakes/add-cakes.component';
import { AlifeFileToBase64Module } from 'alife-file-to-base64';
import { EditCakesComponent } from './pages/edit-cakes/edit-cakes.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    TblUsersComponent,
    EditUserComponent,
    TblAdminComponent,
    TblCakesComponent,
    AddCakesComponent,
    EditCakesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    DataTablesModule,
    AlifeFileToBase64Module
  ],
  providers: [
    CargarScriptsService,
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InjectSessionInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
