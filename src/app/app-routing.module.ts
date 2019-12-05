import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProductAddComponent} from './product-add/product-add.component';
import {ProductEditComponent} from './product-edit/product-edit.component';
import {ProductGetComponent} from './product-get/product-get.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './helpers/auth.guard';
import {RegisterComponent} from './register/register.component';
import {AddShelterComponent} from './add-shelter/add-shelter.component';
import {TrainerScheduleComponent} from './trainer-schedule/trainer-schedule.component';
import {ShelterAddAnimalComponent} from './shelter-add-animal/shelter-add-animal.component';
import {ShelterViewAnimalsComponent} from './shelter-view-animals/shelter-view-animals.component';
import {ShelterViewAnimalComponent} from './shelter-view-animal/shelter-view-animal.component';
import {VetAddHealthRecordComponent} from './vet-add-health-record/vet-add-health-record.component';
import {VetViewAnimalsComponent} from './vet-view-animals/vet-view-animals.component';
import { VetViewAnimalComponent } from './vet-view-animal/vet-view-animal.component';
import {TrainerGuard} from './helpers/trainer.guard';
import {ShelterGuard} from './helpers/shelter.guard';
import {VetGuard} from './helpers/vet.guard';

/**
 * LOGIN CODE ADAPTED FROM: https://jasonwatmore.com/post/2019/06/10/angular-8-user-registration-and-login-example-tutorial
 */
const routes: Routes = [
  {path: '', component: ProductEditComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'register/shelter', component: AddShelterComponent},
  {path: 'register/shelter_employee/:shelter_id', component: RegisterComponent},
  {path: 'trainer/manage_schedule', component: TrainerScheduleComponent, canActivate: [TrainerGuard]},
  {path: 'shelter/animals/add', component: ShelterAddAnimalComponent, canActivate: [ShelterGuard]},
  {path: 'shelter/animals', component: ShelterViewAnimalsComponent, canActivate: [ShelterGuard]},
  {path: 'shelter/animals/view/:animal_id', component: ShelterViewAnimalComponent, canActivate: [ShelterGuard]},
  {path: 'vet/appointments/add-health-record/:animal_id', component: VetAddHealthRecordComponent, canActivate: [VetGuard]},
  {path: 'vet/appointments/animals', component: VetViewAnimalsComponent, canActivate: [VetGuard]},
  {path: 'vet/animals/view/:animal_id', component: VetViewAnimalComponent, canActivate: [VetGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
