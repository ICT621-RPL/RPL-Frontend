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

  isStudent = 1;
  studentValue = {student: 1, notStudent: 0}
  months: string[]= []
  years: number[] = [];
  files: File[]=[]
  public formFields;
  public form = this.fb.group({
        studentId: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
        experiences: this.fb.array([
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
      courses: [[]],
      experience_id: [''],
      unitName: [''],
      unitCode: ['']
    }
     this.formArray.push(this.fb.group(this.formFields));
  }

  ngOnInit(): void {
  }


  get formArray(): FormArray {
    return this.form.get('experiences') as FormArray;
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
    let isCourseSelected = this.form.value['experiences'].some(d => d.courses.length > 0)
    if (isCourseSelected) {
    if(this.form.valid) {
       this.httpClient
      .post(environment.api + 'experiences', this.form.value)
      .subscribe(
        (data: any) => {
          console.log(data);
          this.router.navigate(['/upload'],{ queryParams: { applicationId: data.application_id, appDate: data.application_date } })
        },
        (err) => {
           this.toastr.error(err.error.message)
        }
      );
    }
    else {
      this.toastr.error("Please fill all fields which are required")
    }
    }
    else {
       this.toastr.error("Please select at least one course to move forward.")
    }
  }
  

  public onDeleteForm(ids): void {
    if(this.formArray.length > 1) {
      this.formArray.removeAt(ids.index);
    }
    if(ids.experienceId) {
      console.log("deelete")
    }
  }

  public isStudentChange(value): void {
     const controllerValue = this.form.get('studentId');
    if(value !== this.studentValue.student) {
      controllerValue.setValidators([Validators.required, Validators.email])
    }
    else {
      controllerValue.setValidators([Validators.required, Validators.pattern('^[0-9]+$')])
    }
    controllerValue.updateValueAndValidity();
  }
}
