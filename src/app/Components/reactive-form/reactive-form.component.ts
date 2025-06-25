import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  signal
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DialogService } from 'primeng/dynamicdialog';
import { PrimeInputComponent } from '../../prime-input/prime-input.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PrimeFilterDropdownComponent } from '../../prime-filter-dropdown/prime-filter-dropdown/prime-filter-dropdown.component';
import { PrimeDropdownComponent } from '../../prime-dropdown/prime-dropdown.component';
import { PrimeDatepickerComponent } from '../../prime-datepicker/prime-datepicker/prime-datepicker.component';
import { MinimumAge } from '../../Validators/MinimumAge.validator';
import { PrimeSelectButtonComponent } from '../../prime-select-button/prime-select-button.component';
import { passportExpiry } from '../../Validators/passportExpiry.validator';
import { PrimeInputNumberComponent } from '../../prime-input-number/prime-input-number.component';
import { ButtonComponent } from '../../prime-button/button/button.component';
import { MaximumAge } from '../../Validators/MaximumAge.validator';
import { GetDataService } from '../../Services/get-data.service';
import { AcceptValidator } from '../../Validators/AcceptValidator.validator';
import { DataLoaderComponent } from '../../data-loader/data-loader.component';
import { MessageService } from 'primeng/api';
import { Toast, ToastModule } from 'primeng/toast';
import { ToastService } from '../../Services/toast.service';

@Component({
  selector: 'app-reactive-form',
  imports: [
    DialogModule,
    CommonModule,
    ButtonModule,
    PrimeInputComponent,
    ReactiveFormsModule,
    PrimeFilterDropdownComponent,
    PrimeDropdownComponent,
    PrimeDatepickerComponent,
    PrimeSelectButtonComponent,
    PrimeInputNumberComponent,
    ButtonComponent,
    DataLoaderComponent,
    Toast,
    ToastModule
  ],

  providers : [],
  templateUrl: './reactive-form.component.html',
  styleUrl: './reactive-form.component.scss',
})
export class ReactiveFormComponent implements OnInit, AfterViewInit, OnDestroy {
  dynamicForm: FormGroup | undefined;
  disable = signal<boolean>(false);
  loading = signal<boolean>(false);
  dataLoaded = signal<boolean>(true);

  gender = signal<Record<string, string>[]> ([
    { type: 'Male' },
    { type: 'Female' },
    { type: 'Not Prefer To Say' },
  ]);

  countries = signal<Record<string, string>[]> ([
    { name: 'Australia' },
    { name: 'Austria' },
    { name: 'Bangaladesh' },
    { name: 'Canada' },
    { name: 'Australia' },
    { name: 'Austria' },
    { name: 'Bangaladesh' },
    { name: 'Canada' },
    { name: 'Australia' },
    { name: 'Austria' },
    { name: 'Bangaladesh' },
    { name: 'Canada' },
    { name: 'Australia' },
    { name: 'Austria' },
    { name: 'Bangaladesh' },
    { name: 'Canada' },
    { name: 'Australia' },
    { name: 'Austria' },
    { name: 'Bangaladesh' },
    { name: 'Canada' },
    { name: 'Australia' },
    { name: 'Austria' },
    { name: 'Bangaladesh' },
    { name: 'Canada' },
    { name: 'Australia' },
    { name: 'Austria' },
    { name: 'Bangaladesh' },
    { name: 'Canada' },
    { name: 'Australia' },
    { name: 'Austria' },
    { name: 'Bangaladesh' },
    { name: 'Canada' },
    { name: 'Australia' },
    { name: 'Austria' },
    { name: 'Bangaladesh' },
    { name: 'Canada' },
    { name: 'Australia' },
    { name: 'Austria' },
    { name: 'Bangaladesh' },
    { name: 'Canada' },
    { name: 'Australia' },
    { name: 'Austria' },
    { name: 'Bangaladesh' },
    { name: 'Canada' },
    { name: 'Australia' },
    { name: 'Austria' },
    { name: 'Bangaladesh' },
    { name: 'Canada' },
  ]);

  stateOptions = signal<Record<string, string>[]> ([
    { label: 'No', value: 'no' },
    { label: 'Yes', value: 'yes' },
  ]);
  minDate = signal<Date | undefined> (undefined);

  @Input() visible: boolean = true;
  @Input() editData: any = {};
  @Output() onClose = new EventEmitter();

  constructor(private fb: FormBuilder, private dataServ: GetDataService, private toastServ : ToastService) {}

  ngOnInit(): void {
    const today = new Date();
    this.minDate.set (new Date(
      today.getFullYear() - 10,
      today.getMonth(),
      today.getDate()
    ));

    this.dynamicForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      middlename: new FormControl(''),
      gender: new FormControl('', [Validators.required]),
      dob: new FormControl('', [Validators.required, MinimumAge, MaximumAge]),
      passport: new FormControl(null, [Validators.required]),
      nationality: new FormControl('', [Validators.required]),
      expiry: new FormControl('', [Validators.required]),
      agree: new FormControl('no', [Validators.required, AcceptValidator]),
    });
    // this.dynamicForm.get('expiry')?.setValidators([passportExpiry('dob')]);
    this.loadCustomValidators();

    // this.getAllCountry();
  }

  loadCustomValidators() {
    if (this.dynamicForm) {
      this.dynamicForm.get('expiry')?.addValidators([passportExpiry('dob')]);
      this.dynamicForm.get('expiry')?.updateValueAndValidity();

      this.dynamicForm.get('dob')?.valueChanges.subscribe(() => {
        this.dynamicForm?.get('expiry')?.touched
          ? this.dynamicForm?.get('expiry')?.updateValueAndValidity()
          : '';
      });
    }
  }

  ngAfterViewInit(): void {
    // console.log(this.editData);
    if (this.editData && this.editData.Id) {
      this.dataLoaded.set(false);
    
      setTimeout(() => {
         this.dynamicForm?.patchValue(this.editData);
      // this.dynamicForm?.get('dob')?.updateValueAndValidity(); 
      this.loadCustomValidators();
      this.dynamicForm?.markAllAsTouched();
      this.dynamicForm?.updateValueAndValidity();
      this.dataLoaded.set(true);
      }, 3000)
     
     
 
    }
  }
  ngOnDestroy(): void {
    this.editData = {};
  }
  getAllCountry() {
    this.dataServ.getCountry().subscribe((data) => {
      this.countries.set(data);
    });
  }

  onSubmit() {
    this.loading.set(true);
    if(this.dynamicForm?.invalid){
      console.log('invalid');
      
      this.toastServ.showToastError("Invalid", "There are validation issues in your submission. Please review the form and try again.")

      this.loading.set(false);
    }
    console.log(this.dynamicForm?.value);
  }

  onHide() {
    this.onClose.emit();
  }
}
