import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { environments } from '../../../environments/environments';
import { User, LoginResponse, AuthStatus } from '../interfaces';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private http = inject(HttpClient);

  private _baseUrl : string = environments.baseUrl;
  private _currentUser = signal<User | null>(null);

  // Estamos verificando el estado de la autenticacion...
  private _authStatus  = signal<AuthStatus>(AuthStatus.checking);


  // Lo que exponemos al mundo
  public currentUser = computed(()=> this._currentUser() );
  public authStatus  = computed(()=> this._authStatus() );

  // De esta manera nadie fuera del servicio va poder cambiar mis señales directamente como el usuario activo y el estado de autenticidad

  logIn(formData : User) : Observable<boolean | any>{
    // TODO: Mejorar el tipo de dato que retorna el observable

    const fullUrl = `${this._baseUrl}/login`;
    console.log(fullUrl);

    return this.http.post<LoginResponse>(fullUrl, formData).pipe(
      tap(
        ({user, token})=>{
          console.log({user,token});
          this._currentUser.set(user);
          console.log("Inicio sesion signal: ", this.currentUser());
          this._authStatus.set(AuthStatus.authenticated);
          this.setTokenToLocalStorage(token);
        }
      ),
      map((resp)=>{
        return true;
      }),
      catchError ((err: HttpErrorResponse)=> {

        return throwError(()=> err.error.message);
      })
      // Si pasamos por el guard deberiamos retornar un Observable que emite un booleano
    );
  }

  setTokenToLocalStorage(token : string): void{
    if(!token)return;
    localStorage.setItem('token', token);
  }

}
