import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './vistas/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './vistas/user/user-dashboard/user-dashboard.component';

export const routes: Routes = [
    
    {path: '', component: LoginComponent},
    {path: 'user-dashboard', component: UserDashboardComponent, pathMatch: 'full'},
    {path: 'admin-dashboard', component: DashboardComponent, pathMatch: 'full'},
];
