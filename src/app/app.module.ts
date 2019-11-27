import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import {SlimLoadingBarModule} from 'ng2-slim-loading-bar';
import { LoginShelterEmpComponent } from './login-shelter-emp/login-shelter-emp.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ListpetsComponent } from './listpets/listpets.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductAddComponent,
    ProductEditComponent,
    LoginShelterEmpComponent,
    RegisterComponent,
    HomeComponent,
    ListpetsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlimLoadingBarModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
