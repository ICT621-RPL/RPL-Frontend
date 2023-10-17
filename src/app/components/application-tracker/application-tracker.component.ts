import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-application-tracker',
  templateUrl: './application-tracker.component.html',
  styleUrls: ['./application-tracker.component.scss']
})
export class ApplicationTrackerComponent implements OnInit {

  public applicationId: string;
  public data: any = [];
  public units = []
  public status = {
    1: "Not Applied",
    2: "In progress",
    3: "Viewed",
    4: "Rejected",
    5: "Approved"
  }
  public applicationDate: Date;
  constructor(private http: HttpClient, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  onSearchApplication(): void {
    this.http.get(environment.api + 'application/' + this.applicationId).subscribe((response: any) => {
        this.applicationDate = new Date(response.application.application_date)
        this.data = response.experiences
        this.filterUnits();
    }, (error) => {
        this.toastr.error(error.message)
    })
  }
  public filterUnits(): void {
    this.data.map((d) => {
      d.recommendations.map((r) => {
        this.units.push(r)
      })
    })
    console.log(this.units)
  }

  public getStatus(d): string {
    return this.status[d]
  }

  formatDate(date) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"];

    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return `${monthNames[monthIndex]} ${day}, ${year}`;
}
}
