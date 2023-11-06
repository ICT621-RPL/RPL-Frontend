import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { FeedbacksComponent } from '../feedbacks/feedbacks.component';

@Component({
  selector: 'app-view-experiences',
  templateUrl: './view-experiences.component.html',
  styleUrls: ['./view-experiences.component.scss']
})
export class ViewExperiencesComponent implements OnInit {
  public isLoading;
  public applicationId: string;
  public data: any;
  public expData: any;
  public exp_id: number;
  public files: any;
  isStatusLoading: boolean = false;
  content = ""
  constructor(private route: ActivatedRoute,
              private router: Router,
              private http: HttpClient, 
              public dialog: MatDialog,
              private toastr: ToastrService) {
    this.isLoading = true;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.exp_id = params['id']; // if your parameter is named 'id'
    });
    this.route.queryParams.subscribe(params => {
      this.applicationId = params.application_id
    })
    this.getData();
  }

  filterExperienceData(data): void {
    this.expData = data.experiences.filter(experience =>experience.experience_id == this.exp_id)[0]
    this.content = this.expData.description
    this.isLoading = false;
  }

  public onApprove(id): void {
    let dialogRef = this.dialog.open(FeedbacksComponent, {
        height: '400px',
        width: '600px',
      });
      dialogRef.afterClosed().subscribe((message) => {
        if(message!==""){
          this.isStatusLoading = true;

         this.http.post(environment.api + 'transaction', {recommendation_id: id, status_id: 4, reason: message}).subscribe(response => {
             this.getData();
          }, err => {
            this.toastr.error(err.message)
            this.isLoading = false;
            this.isStatusLoading = false;

          })
        }
      })
   
  }

  public onReject(id): void {
    let dialogRef = this.dialog.open(FeedbacksComponent, {
        height: '400px',
        width: '600px',
      });
      dialogRef.afterClosed().subscribe((message) => {
        if(message!==""){
          this.isStatusLoading = true;
          this.http.post(environment.api + 'transaction', {recommendation_id: id, status_id: 3,  reason: message}).subscribe(response => {
                        this.getData();
                    }, err => {
                      this.toastr.error(err.message)
                      this.isStatusLoading = false;

                    })
                  }
      })

  }

  public getData(): void{
    this.isStatusLoading = false;
    this.getFiles();
    setTimeout(() => {
     if(this.applicationId) {
      this.http.get(environment.api + 'application/' + this.applicationId).subscribe(response => {
          this.data = response
          this.filterExperienceData(response)
      }, err => {
        this.toastr.error(err.message)
        this.isLoading = false;
      })
    }
    } , 2000);


}

  public getFiles(): void {
    this.http.get(environment.api + 'download/' + this.applicationId).subscribe(response => {
          this.files = response
      }, err => {
        this.toastr.error(err.message)
      })
  }

  public getFile(filePath): void {
    this.http.get(environment.api + 'get-file/' + filePath, {responseType: 'blob'}).subscribe((data: Blob) => {
      const downloadURL = window.URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = downloadURL;
      link.download = filePath;
      link.click();
    });
  }

  public onActionChanged(): void {
    let dialogRef = this.dialog.open(FeedbacksComponent, {
        height: '400px',
        width: '600px',
      });
      dialogRef.afterClosed().subscribe((d) => {
        console.log(d)
      })
  }
}
