import { Component, ElementRef, Renderer2, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomFormErrorsDirective } from '../../directives/custom-form-errors.directive';
import { RouterLink } from '@angular/router';
import { FormValidationsService } from '../../services/form-validations.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-page',
  standalone: false,
  // imports: [ ReactiveFormsModule, CustomFormErrorsDirective, RouterLink, CommonModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss'
})
export class RegisterPageComponent {

  private _ren2 = inject(Renderer2);

  color : string = 'red';

  private _fb  =  inject(FormBuilder);
  private _fvs =  inject(FormValidationsService);
  show1Password : boolean = false;
  show2Password : boolean = false;

  @ViewChild('password1') password1!: ElementRef<HTMLElement>
  @ViewChild('password2') password2!: ElementRef<HTMLElement>

  registerForm : FormGroup = this._fb.group({
    name            : ['', [Validators.required]],
    email           : ['', [Validators.required, Validators.pattern(this._fvs.emailPattern)]],
    password        : ['', [Validators.required, Validators.minLength(6) ]],
    confirmPassword : ['', [Validators.required, Validators.minLength(6) ]],
  }, {
    validators : [this._fvs.passwordValidator('password','confirmPassword')]
  });

  register(){
    this.color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));

    this.registerForm.markAllAsTouched();

    if(this.registerForm.valid){
      console.log("Todo bien", this.registerForm.value);
    }
  }

  showFullPassword(): void{
    if(this.show1Password){
      this._ren2.setAttribute(this.password1.nativeElement, 'type', 'text');
    }else{
      this._ren2.setAttribute(this.password1.nativeElement, 'type', 'password');
    }

    if(this.show2Password){
      this._ren2.setAttribute(this.password2.nativeElement, 'type', 'text');
    }else{
      this._ren2.setAttribute(this.password2.nativeElement, 'type', 'password');
    }
  };

}
