import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
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
  ],
  templateUrl: './reactive-form.component.html',
  styleUrl: './reactive-form.component.scss',
})
export class ReactiveFormComponent implements OnInit, AfterViewInit, OnDestroy {
  dynamicForm: FormGroup | undefined;
  disable: boolean = true;
  loading : boolean = false;
  dataLoaded : boolean = true;
  gender: Record<string, string>[] = [
    { type: 'Male' },
    { type: 'Female' },
    { type: 'Not Prefer To Say' },
  ];

  countries: Record<string, string>[] = [
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
  ];

  stateOptions: Record<string, string>[] = [
    { label: 'No', value: 'no' },
    { label: 'Yes', value: 'yes' },
  ];
  minDate: Date | undefined;
  @Input() visible: boolean = true;
  @Input() editData: any = {};
  @Output() onClose = new EventEmitter();

  constructor(private fb: FormBuilder, private dataServ: GetDataService) {}

  ngOnInit(): void {
    const today = new Date();
    this.minDate = new Date(
      today.getFullYear() - 10,
      today.getMonth(),
      today.getDate()
    );

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
    this.dynamicForm.valueChanges.subscribe(() => {
      this.disable = this.dynamicForm?.invalid ? true : false;
    });
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
      this.dataLoaded = false;
    
       this.dynamicForm?.patchValue(this.editData);
      // this.dynamicForm?.get('dob')?.updateValueAndValidity(); 
      this.loadCustomValidators();
      this.dynamicForm?.markAllAsTouched();
      this.dynamicForm?.updateValueAndValidity();
      this.dataLoaded = true;
     
     
 
    }
  }
  ngOnDestroy(): void {
    this.editData = {};
  }
  getAllCountry() {
    this.dataServ.getCountry().subscribe((data) => {
      this.countries.push(data);
    });
  }

  onSubmit() {
    this.loading = true;
    console.log(this.dynamicForm?.value);
  }

  onHide() {
    this.onClose.emit();
  }
}
