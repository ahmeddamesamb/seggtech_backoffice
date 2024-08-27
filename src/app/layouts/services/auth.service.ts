import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  initUser() {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
        this.userSubject.next(storedUser);
      }
    }
  }

  login(user: any): void {
    this.http.post<any>(`${environment.apiUrl}/login`, user) // Assurez-vous que `apiUrl` est défini dans votre fichier environment.ts
      .pipe(
        catchError((error) => {
          console.error('Login failed', error);
          throw error; // Vous pourriez aussi renvoyer une observable vide ou un message d'erreur.
        })
      )
      .subscribe(
        (data) => {
          if (data && data.token) {
            console.warn('Token:', data.token);
            localStorage.setItem('token', data.token);
            localStorage.setItem('refresh', data.refresh);
            localStorage.setItem('user', JSON.stringify(data.user));
            this.userSubject.next(data.user);
            this.router.navigateByUrl('/home').then(success => {
              if (!success) {
                console.error('La redirection vers la page d\'accueil a échoué');
              }
            }).catch((error) => {
              console.error('Erreur lors de la redirection', error);
            });
          } else {
            console.error('Les données de la réponse sont incorrectes ou incomplètes', data);
          }
        }
      );
  }


  logout():void {
    this.http.post(`${environment.apiUrl}/logout`, {});
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigateByUrl('');
  }
  isAuthenticated(): boolean {
    return !localStorage.getItem("token");
  }
}
