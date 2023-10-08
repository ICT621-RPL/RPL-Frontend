import { Component, OnInit } from '@angular/core';

import {MatDialog} from '@angular/material/dialog';
import { FormBuilder,  Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rpl-forms',
  templateUrl: './rpl-forms.component.html',
  styleUrls: ['./rpl-forms.component.scss']
})
export class RplFormsComponent implements OnInit {

  months: string[]= []
  years: number[] = [];

  public formFields;
  public form = this.fb.group({
        formArray: this.fb.array([
        ])
      });
  public closeResult = '';
  constructor(private fb: FormBuilder, private router: Router) { 
    this.formFields ={
      jobTitle: ['', Validators.required],
      company: ['', Validators.required],
      country: ['', Validators.required],
      from_month: ['', Validators.required],
      from_year: ['', Validators.required],
      to_month: ['', Validators.required],
      to_year: ['', Validators.required],
      description: ['', Validators.required],
      courses: [[]]
    }
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
    this.router.navigate(['/upload'])
  }
  

  public onDeleteForm(ids): void {
    if(this.formArray.length > 1) {
      this.formArray.removeAt(ids.index);
    }
    if(ids.experienceId) {
      console.log("deelete")
    }
  }
}
