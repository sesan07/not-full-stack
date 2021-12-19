import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth/auth-guard.service';
import { AuthService } from './auth/auth.service';
import { HomeComponent } from './home/home.component';
import { UserManagementComponent } from './user-management/user-management.component';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent
	},
	{
		path: 'home',
		component: HomeComponent
	},
	{
		canActivate: [AuthGuardService],
		path: 'user-management',
		component: UserManagementComponent,
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
