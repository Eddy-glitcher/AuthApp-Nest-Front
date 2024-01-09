import { Component, ElementRef, Renderer2, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormValidationsService } from '../../services/form-validations.service';

// SweetAlert
import Swal from 'sweetalert2'
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: false,
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {

  public fb          = inject(FormBuilder);
  public fvs         = inject(FormValidationsService);
  public ren         = inject(Renderer2);
  public authService = inject(AuthService);
  public router       = inject(Router);
  // Podemos usar injects en funciones para que las aplicaciones sean mas rápidas.

  @ViewChild('myPassword') myPassword!: ElementRef<HTMLElement>;

  color           : string  = 'red';
  showPassword    : boolean = false;

  // TODO: Cambiar dorber de login container html
  isAuthenticated : boolean = true;

  loginForm  : FormGroup = this.fb.group({
    email    : ['jude@hotmail.com', [Validators.required, Validators.pattern(this.fvs.emailPattern)]],
    password : ['judeballin5ñparis123', [Validators.required]],
  });

  logIn(): void{
    this.color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));

    this.loginForm.markAllAsTouched();

    if(this.loginForm.valid){

      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe({
        next  : (resp) => {


          // Navegacion al dashboard, pero antes mpasa por el guard
          this.router.navigateByUrl('/dashboard');

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Iniciaste Sesion",
            showConfirmButton: false,
            timer: 1500
          });


        },
        error : (errorMessage) => {

          // Mensaje de SweetAlert2

          Swal.fire({
            title: "Error!",
            text: errorMessage || 'Error al iniciar Sesión',
            icon: "error"
          });

          this.isAuthenticated = false;

        }
      });
    }
  }

  showFullPassword(): void{
    this.showPassword = !this.showPassword;
    if(this.showPassword){
      this.ren.setAttribute(this.myPassword.nativeElement, 'type', 'text');
    }else{
      this.ren.setAttribute(this.myPassword.nativeElement, 'type', 'password');
    }
  };

}
