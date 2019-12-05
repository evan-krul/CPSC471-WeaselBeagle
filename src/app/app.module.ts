import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductGetComponent } from './product-get/product-get.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import {SlimLoadingBarModule} from 'ng2-slim-loading-bar';
import { LoginComponent } from './login/login.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { NotifierModule } from 'angular-notifier';
import { AddShelterComponent } from './add-shelter/add-shelter.component';
import { TrainerScheduleComponent } from './trainer-schedule/trainer-schedule.component';
import {FullCalendarModule} from '@fullcalendar/angular';
import { ShelterAddAnimalComponent } from './shelter-add-animal/shelter-add-animal.component';
import {TagInputModule} from 'ngx-chips';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ShelterViewAnimalsComponent } from './shelter-view-animals/shelter-view-animals.component';
import { ShelterViewAnimalComponent } from './shelter-view-animal/shelter-view-animal.component';
import { VetAddHealthRecordComponent } from './vet-add-health-record/vet-add-health-record.component';
import { VetViewAnimalsComponent } from './vet-view-animals/vet-view-animals.component';
import { VetViewAnimalComponent } from './vet-view-animal/vet-view-animal.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductAddComponent,
    ProductGetComponent,
    ProductEditComponent,
    LoginComponent,
    RegisterComponent,
    AddShelterComponent,
    TrainerScheduleComponent,
    ShelterAddAnimalComponent,
    ShelterViewAnimalsComponent,
    ShelterViewAnimalComponent,
    VetAddHealthRecordComponent,
    VetViewAnimalsComponent,
    VetViewAnimalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlimLoadingBarModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NotifierModule,
    FullCalendarModule,
    TagInputModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
