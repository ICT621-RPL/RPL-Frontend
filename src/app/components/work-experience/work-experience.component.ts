import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';

@Component({
  selector: 'app-work-experience',
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.scss']
})
export class WorkExperienceComponent implements OnInit {

  @Input() expForm: any;
  months: string[]= []
  years: number[] = [];
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

}
