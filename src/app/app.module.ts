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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    TblUsersComponent,
    EditUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    DataTablesModule
  ],
  providers: [
    CargarScriptsService,
    CookieService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
