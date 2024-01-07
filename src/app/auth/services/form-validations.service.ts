import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormValidationsService {

  public emailPattern : string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  passwordValidator(pass1: string, pass2 : string){

    return (formGroup : AbstractControl): ValidationErrors | null | any => {
      const password        = formGroup.get(pass1)?.value;
      const confirmPassword = formGroup.get(pass2)?.value;

      if(!confirmPassword){
        return formGroup.get(pass2)?.errors;
      }

      if(password !== confirmPassword){

        formGroup.get(pass2)?.setErrors({
          passNotEqual : true
        });
      }else{
        formGroup.get(pass2)?.setErrors(null);
      }

      if(formGroup.get(pass2)?.errors){
        return formGroup.get(pass2)?.errors;
      }

      return formGroup.get(pass2)?.setErrors(null);
    }
  }
}
