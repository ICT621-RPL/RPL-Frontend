import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-submit-success',
  templateUrl: './submit-success.component.html',
  styleUrls: ['./submit-success.component.scss']
})
export class SubmitSuccessComponent implements OnInit {
  public applicationId: string;
  public applicationDate: string;
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
     this.activatedRoute.queryParams.subscribe(params => {
        this.applicationId = params['applicationId'];
        this.applicationDate = params['appDate'];
    });
  }

  showDate(): string {
   const dateString = "2023-10-11T19:30:43";

    // Create a Date object
    const date = new Date(dateString);
    // Extract and log the day, month, and year
    const day = date.getDate();  // Day of the month (1-31)
    const month = date.getMonth() + 1;  // Month number (1-12)
    const year = date.getFullYear();  // Year

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // Get the day of the week
    const dayOfWeekNumber = date.getDay();
    const dayOfWeekName = daysOfWeek[dayOfWeekNumber];
    return `${year}-${month}-${day}, ${dayOfWeekName}`;
  }

}
