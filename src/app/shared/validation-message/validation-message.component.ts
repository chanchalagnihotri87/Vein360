import { Component, input } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
  ValidationErrors,
} from '@angular/forms';

@Component({
  selector: 'app-validation-message',
  imports: [ReactiveFormsModule],
  templateUrl: './validation-message.component.html',
  styleUrl: './validation-message.component.scss',
})
export class ValidationMessageComponent {
  public formGroup = input.required<FormGroup>();
  public fieldName = input.required<string>();
  public ngFormTemplate = input.required<FormGroupDirective>();
  public arrayIndex = input<number>();
  public arrayFieldName = input<string>();

  protected get fieldErrors() {
    return this.formControl.errors as ValidationErrors;
  }

  get formControl() {
    if (this.isArrayFeild) {
      return this.arrayFormControl;
    }

    return this.fieldFormControl;
  }

  private get arrayFormControl() {
    let formArray = this.formGroup().get(this.arrayFieldName()!) as FormArray;

    let arrayFormGroup = formArray.at(this.arrayIndex()!) as FormGroup;
    return arrayFormGroup.get(this.fieldName()) as FormControl;
  }

  private get fieldFormControl() {
    return this.formGroup().get(this.fieldName()) as FormControl;
  }

  private get isArrayFeild() {
    return (
      this.arrayIndex() !== undefined && this.arrayFieldName() !== undefined
    );
  }
}
