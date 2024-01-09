import { Component, computed, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './auth/services/auth.service';
import { AuthStatus } from './auth/interfaces';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'AuthApp';

  // La gente de firebase recomienda que la autenticación de nuestro proyecto se haga aquí, dado que toda aplicacion de Angular pasa por aquí (Este archivo)!!!

  private authService = inject(AuthService);
  private router      = inject(Router);

  public userAuthenticated = computed<boolean>(()=> {
    if(this.authService.authStatus() === AuthStatus.checking){
      return false;
    }
    return true;
  });

  // Los efectos se disparan cada vez que una señal en el efecto cambie
  public authStatusChangeEffect = effect(()=>{

    switch (this.authService.authStatus()) {
      case AuthStatus.checking:
        return;
        break;
      case AuthStatus.authenticated:
        this.router.navigateByUrl('/dashboard');
        return;
        break;
      case 'notAuthenticated':
        this.router.navigateByUrl('auth/login');
        return;
        break;

      default:
        break;
    }

  })

}
