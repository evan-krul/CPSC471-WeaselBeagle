import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductAddComponent} from './product-add/product-add.component';
import {ProductEditComponent} from './product-edit/product-edit.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './helpers/auth.guard';
import {RegisterComponent} from './register/register.component';
import {AddShelterComponent} from './add-shelter/add-shelter.component';
import {TrainerScheduleComponent} from './trainer-schedule/trainer-schedule.component';
import {ShelterAddAnimalComponent} from './shelter-add-animal/shelter-add-animal.component';
import {ShelterViewAnimalsComponent} from './shelter-view-animals/shelter-view-animals.component';
import {ShelterViewAnimalComponent} from './shelter-view-animal/shelter-view-animal.component';
import {TrainerGuard} from './helpers/trainer.guard';
import {ShelterGuard} from './helpers/shelter.guard';
import {HomeComponent} from './home/home.component';
import {AdopterViewAnimalsComponent} from './adopter-view-animals/adopter-view-animals.component';
import {AdopterGuard} from './helpers/adopter.guard';
import {AdopterViewAnimalComponent} from './adopter-view-animal/adopter-view-animal.component';
import {ShelterEditAnimalComponent} from './shelter-edit-animal/shelter-edit-animal.component';
import {AdoptionApplicationComponent} from './adoption-application/adoption-application.component';


/**
 * LOGIN CODE ADAPTED FROM: https://jasonwatmore.com/post/2019/06/10/angular-8-user-registration-and-login-example-tutorial
 */
const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'register/shelter', component: AddShelterComponent },
  { path: 'register/shelter_employee/:shelter_id', component: RegisterComponent },
  { path: 'trainer/manage_schedule', component: TrainerScheduleComponent, canActivate: [TrainerGuard] },
  { path: 'shelter/animals/add', component: ShelterAddAnimalComponent, canActivate: [ShelterGuard]},
  { path: 'shelter/animals', component: ShelterViewAnimalsComponent, canActivate: [ShelterGuard]},
  { path: 'shelter/animals/view/:animal_id', component: ShelterViewAnimalComponent, canActivate: [ShelterGuard]},
  { path: 'add_prod', component: ProductAddComponent, canActivate: [AuthGuard] },
  { path: 'adopter/:type', component: AdopterViewAnimalsComponent, canActivate: [AdopterGuard]},
  { path: 'adopter/view/:animal_id', component: AdopterViewAnimalComponent, canActivate: [AdopterGuard]},
  { path: 'shelter/animals/edit/:animal_id', component: ShelterEditAnimalComponent, canActivate: [ShelterGuard]},
  { path: 'application/:animal_id', component: AdoptionApplicationComponent, canActivate: [AdopterGuard]}

  // otherwise redirect to home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
