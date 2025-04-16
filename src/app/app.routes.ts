import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './vistas/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './vistas/user/user-dashboard/user-dashboard.component';
import { ListarUsuariosComponent } from './vistas/admin/control-usuarios/listar-usuarios/listar-usuarios.component';
import { EditarUsuariosComponent } from './vistas/admin/control-usuarios/editar-usuarios/editar-usuarios.component';
import { EditarEspecimenComponent } from './vistas/admin/control-especimen/editar-especimen/editar-especimen.component';
import { ListarComponent } from './vistas/admin/control-especimen/listar/listar.component';
import { AgregarEspecimenComponent } from './vistas/admin/control-especimen/agregar-especimen/agregar-especimen.component';
import { AuthGuard } from './services/auth.guard';
import { AccesoDenegadoComponent } from './vistas/acceso-denegado/acceso-denegado.component';
import { ListarEstacionComponent } from './vistas/admin/control-estacion/listar-estacion/listar-estacion.component';
import { EditarEstacionComponent } from './vistas/admin/control-estacion/editar-estacion/editar-estacion.component';
import { EstacionComponent } from './vistas/user/estacion/estacion.component';
import { CrearEstacionComponent } from './vistas/admin/control-estacion/crear-estacion/crear-estacion.component';
import { ListarActividadComponent } from './vistas/admin/control-actividad/listar-actividad/listar-actividad.component';
import { EditarActividadComponent } from './vistas/admin/control-actividad/editar-actividad/editar-actividad.component';
import { ActividadComponent } from './vistas/user/actividad/actividad.component';
import { AgregarActividadComponent } from './vistas/admin/control-actividad/agregar-actividad/agregar-actividad.component';
import { ListarReinoComponent } from './vistas/admin/control-reino/listar-reino/listar-reino.component';
import { EditarReinoComponent } from './vistas/admin/control-reino/editar-reino/editar-reino.component';
import { CrearReinoComponent } from './vistas/admin/control-reino/crear-reino/crear-reino.component';
import { ListarEtapaComponent } from './vistas/admin/control-etapa/listar-etapa/listar-etapa.component';
import { EditarEtapaComponent } from './vistas/admin/control-etapa/editar-etapa/editar-etapa.component';
import { CrearEtapaComponent } from './vistas/admin/control-etapa/crear-etapa/crear-etapa.component';

export const routes: Routes = [
    
    {path: '', component: LoginComponent},
    {path: 'user-dashboard', component: UserDashboardComponent, pathMatch: 'full'},
    {path: 'admin-dashboard', component: DashboardComponent, canActivate: [AuthGuard],data: { roles: ['ADMIN'] } },

    {path: 'editar-especimen', component: EditarEspecimenComponent,  canActivate: [AuthGuard],data: { roles: ['ADMIN']}},
    {path: 'crear-especimen', component: AgregarEspecimenComponent,  canActivate: [AuthGuard],data: { roles: ['ADMIN']}},
    {path: 'editar-especimen/:id', component: EditarEspecimenComponent,   canActivate: [AuthGuard],data: { roles: ['ADMIN']}},

    {path: 'crear-actividad', component: AgregarActividadComponent,  canActivate: [AuthGuard],data: { roles: ['ADMIN']}},
    {path: 'listar-actividad', component: ListarActividadComponent,  canActivate: [AuthGuard],data: { roles: ['ADMIN']}},
    {path: 'editar-actividad/:id', component: EditarActividadComponent,  canActivate: [AuthGuard],data: { roles: ['ADMIN']}},
    

    {path: 'crear-estacion', component: CrearEstacionComponent,  canActivate: [AuthGuard],data: { roles: ['ADMIN']}},
    {path: 'listar', component: ListarComponent,  canActivate: [AuthGuard],data: { roles: ['ADMIN']}},
    {path: 'listar-estacion', component: ListarEstacionComponent,  canActivate: [AuthGuard],data: { roles: ['ADMIN']}},
    {path: 'editar-estacion/:id', component: EditarEstacionComponent,  canActivate: [AuthGuard],data: { roles: ['ADMIN']}},

    {path: 'listar-reino', component: ListarReinoComponent,  canActivate: [AuthGuard],data: { roles: ['ADMIN']}},
    {path: 'crear-reino', component: CrearReinoComponent,  canActivate: [AuthGuard],data: { roles: ['ADMIN']}},
    {path: 'editar-reino/:id', component: EditarReinoComponent,  canActivate: [AuthGuard],data: { roles: ['ADMIN']}},

    {path: 'listar-etapa', component: ListarEtapaComponent,  canActivate: [AuthGuard],data: { roles: ['ADMIN']}},
    {path: 'editar-etapa/:id', component: EditarEtapaComponent,  canActivate: [AuthGuard],data: { roles: ['ADMIN']}},
    {path: 'crear-etapa', component: CrearEtapaComponent,  canActivate: [AuthGuard],data: { roles: ['ADMIN']}},

    {path: 'usuarios', component: ListarUsuariosComponent,   canActivate: [AuthGuard],data: { roles: ['ADMIN']}},
    {path: 'editar-usuarios/:username', component: EditarUsuariosComponent,   canActivate: [AuthGuard],data: { roles: ['ADMIN']}},

    {path: 'estacion/:numero', component: EstacionComponent,   canActivate: [AuthGuard],data: { roles: ['NORMAL']}},
    {path: 'actividad', component: ActividadComponent,   canActivate: [AuthGuard],data: { roles: ['NORMAL']}},

    { path: 'acceso-denegado', component: AccesoDenegadoComponent }
];
