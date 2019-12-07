import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ResponseResetComponent } from './components/password/response-reset/response-reset.component';
import { RequestResetComponent } from './components/password/request-reset/request-reset.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignupComponent } from './components/signup/signup.component';
import { BeforeLoginService } from './Services/before-login.service';
import { AfterLoginService } from './Services/after-login.service';


const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate:[BeforeLoginService] },
  { path: 'signup', component: SignupComponent, canActivate:[BeforeLoginService]  },
  { path: 'profile', component: ProfileComponent, canActivate:[AfterLoginService]  },
  { path: 'request-password-reset', component: RequestResetComponent, canActivate:[BeforeLoginService] },
  { path: 'response-password-reset', component: ResponseResetComponent, canActivate:[BeforeLoginService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
