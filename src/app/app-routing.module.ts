import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductAddComponent} from './product-add/product-add.component';
import {ProductEditComponent} from './product-edit/product-edit.component';
import {ProductGetComponent} from './product-get/product-get.component';
import {LoginShelterEmpComponent} from './login-shelter-emp/login-shelter-emp.component';
import {AuthGuard} from './helpers/auth.guard';


// const routes: Routes = [
//   {
//     path: 'product/create',
//     component: ProductAddComponent
//   },
//   {
//     path: 'product/edit/:id',
//     component: ProductEditComponent
//   },
//   {
//     path: 'products',
//     component: ProductGetComponent
//   }
// ];

/**
 * LOGIN CODE ADAPTED FROM: https://jasonwatmore.com/post/2019/06/10/angular-8-user-registration-and-login-example-tutorial
 */
const routes: Routes = [
  { path: '', component: ProductGetComponent, canActivate: [AuthGuard] },
  { path: 'add_prod', component: ProductAddComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginShelterEmpComponent }
  // { path: 'register', component: RegisterComponent },

  // otherwise redirect to home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
