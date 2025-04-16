import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubjec = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private router: Router // Inyectamos Router para navegación
  ) { }

  // Generamos el token
  public generateToken(loginData: any) {
    return this.http.post(`${baserUrl}/generate-token`, loginData);
  }

  public getCurrentUser() {
    return this.http.get(`${baserUrl}/actual-usuario`);
  }

  // Iniciamos sesión y establecemos el token en el localStorage
  public loginUser(token: string) {
    localStorage.setItem('token', token);
    this.loginStatusSubjec.next(true); // Emitimos cambio de estado
    return true;
  }

  public isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token; // Simplificación de la verificación
  }

  // Cerramos sesión y eliminamos datos
  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.loginStatusSubjec.next(false); // Emitimos cambio de estado
    this.router.navigate(['/login']); // Redirigimos a login
    return true;
  }

  // Obtenemos el token
  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  public setUser(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.loginStatusSubjec.next(true); // Actualizamos estado
  }

  public getUser(): any {
    const userStr = localStorage.getItem('user');
    try {
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      this.logout();
      return null;
    }
  }

  public getUserRole(): string {
    const user = this.getUser();
    if (user?.authorities?.length > 0) {
      return user.authorities[0].authority; // Asumiendo estructura {authorities: [{authority: 'ROL'}]}
    }
    return '';
  }

  // Nuevo: Verificar expiración del token (opcional)
  public isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;
    
    const expiry = JSON.parse(atob(token.split('.')[1]))?.exp;
    return expiry ? (Math.floor(Date.now() / 1000) >= expiry) : true;
  }
}