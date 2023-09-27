import { Component, OnInit } from '@angular/core';

import {MatDialog} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-rpl-forms',
  templateUrl: './rpl-forms.component.html',
  styleUrls: ['./rpl-forms.component.scss']
})
export class RplFormsComponent implements OnInit {

  months: string[]= []
  years: number[] = [];

  formFields ={
      jobTitle: ['', Validators.required],
      company: ['', Validators.required],
      country: ['', Validators.required],
      from_month: ['', Validators.required],
      from_year: ['', Validators.required],
      to_month: ['', Validators.required],
      to_year: ['', Validators.required],
      description: ['', Validators.required],
    }
  public form = this.fb.group({
        formArray: this.fb.array([
        ])
      });
  public closeResult = '';
  constructor(private fb: FormBuilder) { 
     this.formArray.push(this.fb.group(this.formFields));
  }

  ngOnInit(): void {
  }


  get formArray(): FormArray {
    return this.form.get('formArray') as FormArray;
  }
  public addFormControl() {
    this.formArray.push(this.fb.control('', Validators.required));
  }

   onAddFormGroup() {
    this.formArray.push(this.fb.group(this.formFields));
  }

  removeFormControl(index: number) {
    this.formArray.removeAt(index);
  }

  public onSubmitFormGroup(): void {
    console.log(this.formArray.value)
  }
  
}
