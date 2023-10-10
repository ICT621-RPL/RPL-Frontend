import { Component, OnInit } from '@angular/core';

import {MatDialog} from '@angular/material/dialog';
import { FormBuilder,  Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rpl-forms',
  templateUrl: './rpl-forms.component.html',
  styleUrls: ['./rpl-forms.component.scss']
})
export class RplFormsComponent implements OnInit {

  months: string[]= []
  years: number[] = [];
  files: File[]=[]
  public formFields;
  public form = this.fb.group({
        formArray: this.fb.array([
        ])
      });
  public closeResult = '';
  constructor(private fb: FormBuilder, 
              private router: Router, 
              private httpClient: HttpClient, 
              private toastr: ToastrService) { 
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
    // if(this.form.valid) {
    //    this.httpClient
    //   .post(environment.api + 'experiences', this.formArray.value)
    //   .subscribe(
    //     (data: any) => {
    //       console.log(data);
          this.router.navigate(['/upload'])
    //     },
    //     (err) => console.log(err)
    //   );
    // }
    // else {
    //   this.toastr.error("Please fill all fields which are required")
    // }
  
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
