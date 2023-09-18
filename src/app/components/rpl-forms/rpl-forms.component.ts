import { Component, OnInit } from '@angular/core';
import { AddExperienceComponent } from './../add-experience/add-experience.component';

import {MatDialog} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';

@Component({
  selector: 'app-rpl-forms',
  templateUrl: './rpl-forms.component.html',
  styleUrls: ['./rpl-forms.component.scss']
})
export class RplFormsComponent implements OnInit {

  months: string[]= []
  years: number[] = [];
  public form = this.fb.group({
        jobTitle: ['', Validators.required]
      });
  public closeResult = '';
  constructor(private fb: FormBuilder) { 
     
      const currentYear = new Date().getFullYear();
      const startYear = 1980; 
      for (let year = currentYear; year >= startYear; year--) {
        this.years.push(year);
      }
      this.months = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December'
    ];
  }

  ngOnInit(): void {
  }

  // public openModal(): void {
  //   this.modalService.open(AddExperienceComponent, {
  //      position: {
  //       top: '0',
  //       right: '0',
  //     },
  //     width: '500px',
  //     height: '100%',
  //   })
	// }
}
