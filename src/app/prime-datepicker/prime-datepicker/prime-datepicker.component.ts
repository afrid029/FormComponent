import { Component, forwardRef, Input } from '@angular/core';
import { CustomControlValueAccessorDirective } from '../../directives/custom-control-value-accessor.directive';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PrimeErrorComponent } from '../../prime-error/prime-error.component';
import { CalendarModule } from 'primeng/calendar';
import { DatePickerModule } from 'primeng/datepicker';
import { DataLoaderComponent } from '../../data-loader/data-loader.component';

@Component({
  selector: 'app-prime-datepicker',
  templateUrl: './prime-datepicker.component.html',
  styleUrl: './prime-datepicker.component.scss',
  imports:[CommonModule, PrimeErrorComponent, ReactiveFormsModule,DatePickerModule, DataLoaderComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PrimeDatepickerComponent),
      multi: true,
    },
  ]
})
export class PrimeDatepickerComponent<T> extends CustomControlValueAccessorDirective<T> {
  @Input() label: string | undefined;
  @Input() placeholder: string | undefined;
  @Input() isDisabled: boolean = true;
  @Input() submitted: boolean = false;
  @Input() hasSmallText: boolean = false;
  @Input() smallText: string = '';
  @Input() customErrorMessages: Record<string, string> = {};
  @Input() direction: 'ltr' | 'rtl' = 'ltr';

  @Input() dateFormat: string = 'dd-mm-yy';
  @Input() showIcon: boolean = true;

  @Input() isEditable: boolean = false;

  @Input() minDate: Date | undefined;
  @Input() maxDate: Date | undefined;

  @Input() showButtonBar: boolean = false;
  @Input() disabledDates: any[] = [];
    @Input() dataLoaded: boolean = true;

  isError(): boolean {
 
    
    if (!this.control) return false;

    return (
      this.control.invalid &&
      (this.control.dirty || this.control.touched || this.submitted)
    );
  }

  isCurrentControlRequiredOnDefault(): boolean {
    if (this.control) {
      if (this.control?.hasValidator(Validators.required)) {
        return true;
      }
    }

    return false;
  }
}
