import { Directive, ElementRef, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[CustomFormErrors]',
  standalone: true
})
export class CustomFormErrorsDirective {
  public  _formTouched  ?: boolean | undefined;
  private _htmlElement  ?: ElementRef<HTMLElement>;
  private _color         : string = 'red';

  private _formErrors   ?: ValidationErrors | null | undefined;

  @Input() set color(color : string){
    this._color = color;
    this.setColorStyle();
  }

  @Input() set controlTouched(touched : boolean | undefined){
    this._formTouched = touched;
    this.setErrorMessage();
  }

  @Input() set formControls(errors : ValidationErrors | null | undefined){
    this._formErrors = errors;
    this.setErrorMessage();
  }

  constructor(private el : ElementRef<HTMLElement>) {
    this._htmlElement = el;
  }

  setColorStyle(){
    if(!this._htmlElement)return;
    this._htmlElement.nativeElement.setAttribute
    this._htmlElement!.nativeElement.style.color = this._color;
  }

  setErrorMessage(){

    if(!this._htmlElement)return;

    if(!this._formTouched)return;

    if(!this._formErrors) {
      this._htmlElement.nativeElement.innerText = '';
      return;
    }

    const errors = Object.keys(this._formErrors!);

    console.log(errors);

    const formErrorsMessage : any = {
        required     : "Este campo es requerido!",
        pattern      : "Ingrese un correo válido",
        minlength    : `Minimo ${this._formErrors!['minlength']?.requiredLength} / ${this._formErrors!['minlength']?.actualLength}`,
        passNotEqual : "Las contraseñas deben ser iguales!",
    }

      for (const error of errors) {
        if(formErrorsMessage.hasOwnProperty(error)){
          this._htmlElement.nativeElement.innerText = formErrorsMessage[error];
          return;
        }
      }

  }

}
