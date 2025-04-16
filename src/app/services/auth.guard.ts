// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    // Verificar si está autenticado
    if (!this.loginService.isLoggedIn()) {
      this.loginService.logout();
      this.router.navigate(['/login']);
      return false;
    }

    // Obtener roles esperados de la data de la ruta
    const rolesEsperados = next.data['roles'] as Array<string>;
    
    // Si la ruta no requiere roles específicos, permitir acceso
    if (!rolesEsperados || rolesEsperados.length === 0) return true;

    // Verificar si el rol del usuario coincide
    const userRol = this.loginService.getUserRole();
    if (!rolesEsperados.includes(userRol)) {
      this.router.navigate(['/acceso-denegado']); // Ruta para acceso no autorizado
      return false;
    }

    return true;
  }
}