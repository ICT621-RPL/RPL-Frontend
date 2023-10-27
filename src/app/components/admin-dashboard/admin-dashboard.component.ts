import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  public applicationId: string;
  public applicationDate: Date;
  public data;
  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private toastr: ToastrService) {}
  
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.applicationId = params.application_id
    })
    if(this.applicationId) {
      this.http.get(environment.api + 'application/' + this.applicationId).subscribe((response: {application: any, experiences: any}) => {
          this.getData(response)
          this.applicationDate = new Date(response?.application.application_date);

      }, err => {
        this.toastr.error(err.message)
      })
    }
  }

  onApplicationClick(id) {
    this.router.navigate(['admin', id], {queryParams: {application_id:this.applicationId}})
  }

  public getData(data): void {
    this.data = data.experiences
  }

  formatDate(date) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"];

    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return `${monthNames[monthIndex]} ${day}, ${year}`;
}

  public onCompleteApplication(): void {
    this.http.post(environment.api + "complete-application", {application_id: this.applicationId}).subscribe(response => {
      this.toastr.success("Email sent to applicant.")
    }, error => {
      this.toastr.error(error.message)
    })
  }
}
