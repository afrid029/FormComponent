import { Component, forwardRef, inject, Input } from '@angular/core';
// import { Direction, InputType, KeyFilter } from '../../models/componentTypes';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { CustomControlValueAccessorDirective } from '../directives/custom-control-value-accessor.directive';
import { CommonModule } from '@angular/common';
import { PrimeErrorComponent } from '../prime-error/prime-error.component';
import { InputTextModule } from 'primeng/inputtext';
import { DataLoaderComponent } from '../data-loader/data-loader.component';

@Component({
  selector: 'app-prime-input',
  templateUrl: './prime-input.component.html',
  styleUrl: './prime-input.component.scss',
  imports:[CommonModule,ReactiveFormsModule, PrimeErrorComponent, InputTextModule, DataLoaderComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PrimeInputComponent),
      multi: true,
    },
  ],
})
export class PrimeInputComponent<T> extends CustomControlValueAccessorDirective<T> {
  @Input() label: string | undefined;
  @Input() type: string = 'text';
  @Input() placeholder: string | undefined;
  @Input() isDisabled: boolean = true;
  @Input() submitted: boolean = false;
  @Input() hasSmallText: boolean = false;
  @Input() smallText: string = '';
  @Input() customErrorMessages: Record<string, string> = {};
  @Input() uniqueId: string = '';
  @Input() showRequiredIcon: boolean = true;
  @Input() autoFocus: boolean = false;
  @Input() isReadOnly: boolean = false;
  @Input() dataLoaded: boolean = true;
  @Input() direction: 'ltr' | 'rtl' = 'ltr';

  /**
   *
   */

  isCurrentControlRequired: boolean = false;

  isCurrentControlRequiredOnDefault(): boolean {

    if (this.control) {
      if (this.control?.hasValidator(Validators.required)) {
        return true;
      }
    }

    return false;
  }

  isError(): boolean {
    if (!this.control) return false;

    return (
      this.control.invalid &&
      (this.control.dirty || this.control.touched || this.submitted)
    );
  }
}
