import { Component, ElementRef, Renderer2, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CustomFormErrorsDirective } from '../../directives/custom-form-errors.directive';
import { FormValidationsService } from '../../services/form-validations.service';
import { CommonModule } from '@angular/common';
import { AuthServiceService } from '../../services/auth-service.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
// SweetAlert
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ RouterLink, ReactiveFormsModule, CustomFormErrorsDirective, CommonModule, HttpClientModule ],
  providers : [ AuthServiceService, HttpClient ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {

  public fb          = inject(FormBuilder);
  public fvs         = inject(FormValidationsService);
  public ren         = inject(Renderer2);
  public authService = inject(AuthServiceService);
  public  router     = inject(Router);
  // Podemos usar injects en funciones para que las aplicaciones sean mas rápidas.

  @ViewChild('myPassword') myPassword!: ElementRef<HTMLElement>;

  color           : string  = 'red';
  showPassword    : boolean = false;

  // TODO: Cambiar dorber de login container html
  isAuthenticated : boolean = true;

  loginForm  : FormGroup = this.fb.group({
    email    : ['salito@hotmail.com', [Validators.required, Validators.pattern(this.fvs.emailPattern)]],
    password : ['123456', [Validators.required]],
  });

  logIn(): void{
    this.color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));

    this.loginForm.markAllAsTouched();

    if(this.loginForm.valid){
      this.authService.logIn(this.loginForm.value).subscribe({
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
            text: errorMessage,
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
