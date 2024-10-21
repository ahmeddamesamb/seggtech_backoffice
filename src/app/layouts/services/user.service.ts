import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {environment} from '../../environment/environment';
import {IUser} from "../models/iuser";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/users`;
  private inactiveUsersSubject = new BehaviorSubject<IUser[]>([]);
  inactiveUsers$ = this.inactiveUsersSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
  }

  setInactiveUsers(users: IUser[]) {
    this.inactiveUsersSubject.next(users);
  }

  getAllUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.apiUrl).pipe(
      tap(users => console.log('liste users:', users)),
      catchError(this.handleError)
    );
  }

  saveUser(user: IUser): Observable<IUser> {
    console.warn(user)
    return this.http.post<IUser>(this.apiUrl, user).pipe(
      tap(newUser => console.log('Added user:', newUser)),
      catchError(this.handleError)
    );
  }

  getUserById(id?: number): Observable<IUser> {
    return this.http.get<IUser>(`${this.apiUrl}/${id}`).pipe(
      tap(user => console.log('Fetched user:', user)),
      catchError(this.handleError)
    );
  }

  updateUser(id?: number, user?: IUser): Observable<IUser> {
    return this.http.put<IUser>(`${this.apiUrl}/${id}`, user).pipe(
      tap(updatedUser => console.log('Updated user:', updatedUser)),
      catchError(this.handleError)
    );
  }

  archiveUser(id?: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}/archive`, {is_active: false});
  }

  activateUser(id?: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}/activate`, {is_active: true});
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => console.log('Deleted user with id:', id)),
      catchError(this.handleError)
    );
  }

  // Error handling method
  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError('Something went wrong; please try again later.');
  }

  private detailUser() {
    this.getUserById();
    console.log(this.getUserById())
  }
}
