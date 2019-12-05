import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductAddComponent } from './product-add/product-add.component';
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
import { HomeComponent } from './home/home.component';
import { AdopterViewAnimalsComponent } from './adopter-view-animals/adopter-view-animals.component';
import { AdopterViewAnimalComponent } from './adopter-view-animal/adopter-view-animal.component';
import { AdoptionApplicationComponent } from './adoption-application/adoption-application.component';
import { ShelterEditAnimalComponent } from './shelter-edit-animal/shelter-edit-animal.component';
import { AdopterScheduleTrainerComponent } from './adopter-schedule-trainer/adopter-schedule-trainer.component';
import { VetScheduleComponent } from './vet-schedule/vet-schedule.component';
import { AdopterScheduleVetComponent } from './adopter-schedule-vet/adopter-schedule-vet.component';
import { ShelterViewAdoptionRequestsComponent } from './shelter-view-adoption-requests/shelter-view-adoption-requests.component';
import { ViewPendingComponent } from './view-pending/view-pending.component';
import { ViewAdoptedComponent } from './view-adopted/view-adopted.component';
import { ViewAdoptedAnimalComponent } from './view-adopted-animal/view-adopted-animal.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductAddComponent,
   // ProductGetComponent,
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
    VetViewAnimalComponent,
    ShelterViewAnimalComponent,
    RegisterComponent,
    HomeComponent,
    AdopterViewAnimalsComponent,
    AdopterViewAnimalComponent,
    AdoptionApplicationComponent,
    AdopterViewAnimalComponent,
    ShelterViewAnimalComponent,
    ShelterEditAnimalComponent,
    AdopterScheduleTrainerComponent,
    VetScheduleComponent,
    AdopterScheduleVetComponent,
    ShelterViewAdoptionRequestsComponent,
    ViewPendingComponent,
    ViewAdoptedComponent,
    ViewAdoptedAnimalComponent
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
