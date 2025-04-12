import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './vistas/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './vistas/user/user-dashboard/user-dashboard.component';
import { ListarUsuariosComponent } from './vistas/admin/control-usuarios/listar-usuarios/listar-usuarios.component';
import { EditarUsuariosComponent } from './vistas/admin/control-usuarios/editar-usuarios/editar-usuarios.component';
import { EditarEspecimenComponent } from './vistas/admin/control-especimen/editar-especimen/editar-especimen.component';
import { ListarComponent } from './vistas/admin/control-especimen/listar/listar.component';

export const routes: Routes = [
    
    {path: '', component: LoginComponent},
    {path: 'user-dashboard', component: UserDashboardComponent, pathMatch: 'full'},
    {path: 'admin-dashboard', component: DashboardComponent, pathMatch: 'full'},
    {path: 'editar-especimen', component: EditarEspecimenComponent, pathMatch: 'full'},
    {path: 'listar', component: ListarComponent, pathMatch: 'full'},
    {path: 'usuarios', component: ListarUsuariosComponent, pathMatch: 'full'},
    {path: 'editar-usuarios/:username', component: EditarUsuariosComponent, pathMatch: 'full'},
    {path: 'editar-especimen/:id', component: EditarEspecimenComponent, pathMatch: 'full'},
];
