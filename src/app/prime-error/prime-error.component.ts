import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges, signal } from '@angular/core';
import { ValidationErrors } from '@angular/forms';


@Component({
  selector: 'app-prime-error',
  templateUrl: './prime-error.component.html',
  styleUrls: ['./prime-error.component.scss'],
  imports : [CommonModule]
})
export class PrimeErrorComponent implements OnInit, OnChanges {
[x: string]: any;
  @Input() errors: Record<string, ValidationErrors > | null = {};
  // @Input() crossErrorMessages: string[] = [];

  @Input() crossErrorMessages: Record<string, string> | any = {};
  @Input() direction: 'ltr' | 'rtl' = 'ltr';

  errorMessages = signal<Record<string, string>>({});
  customErrorMessages: Record<string, string> | any = {};
  error : string = '';

  ngOnInit(): void {
    this.setErrorMessages();
  }

  ngOnChanges(changes: SimpleChanges): void {
// console.log(changes['customErrorMessages'].currentValue);

    if (changes['customErrorMessages'] && changes['customErrorMessages'].currentValue || (changes['errors'] && changes['errors'].currentValue) ) {
      this.setErrorMessages();
    }
    
  }
  hasCrossErrors(): boolean {
     console.log(Object.values(this.crossErrorMessages)[0]);
     if(Object.keys(this.crossErrorMessages).length > 0) {
      this.error = Object.values(this.crossErrorMessages)[0] as string
      return true;
     }

     return false;
  
}


  setErrorMessages(): void {
    const baseErrorMessages = {
      required: 'This field is required.',
      email: 'Invalid email address.',
      pattern: 'Invalid format.',
      maxlength: 'Exceeded maximum length.',
      minlength: 'Below minimum length.',
      emptyString: 'This field cannot be empty.',
      passwordDoesNotMatch: 'Passwords do not match.',
    };

    // Object.keys(this.errors!).forEach((er) => {
    //   const inc = Object.keys(baseErrorMessages).includes(er)
    //   if(!inc) {
    //     this.customErrorMessages[er]! = this.errors?.[er];
    //   }
    // })
  if(this.errors) {
      Object.keys(this.errors).forEach((er) => {
      const inc = Object.keys(baseErrorMessages).includes(er)
      if(!inc) {
        this.customErrorMessages[er]! = this.errors?.[er];
      }
    })
  }

    console.log(this.crossErrorMessages);
    console.log(this.errors);
    
    

    this.errorMessages.set({
      ...baseErrorMessages,
      ...this.customErrorMessages,
    });

    // console.log(this.errorMessages());
    
  }
}
