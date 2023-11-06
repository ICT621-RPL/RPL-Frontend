import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-upload-documents',
  templateUrl: './upload-documents.component.html',
  styleUrls: ['./upload-documents.component.scss']
})
export class UploadDocumentsComponent implements OnInit {
  public experienceUploadInfo: string;
  public isUploading: boolean;
  public files: File[]=[];
  public applicationId: string;
  public applicationDate: string;
  public isLoading: boolean = false;

  constructor(private router: Router,private httpClient: HttpClient, 
    private toastr: ToastrService, private activatedRoute: ActivatedRoute) {
    this.isUploading = false;
    this.experienceUploadInfo = "Upload your experience documents for applying the RPL"
   }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
        this.applicationId = params['applicationId'];
        this.applicationDate = params['appDate'];
    });
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('application_id', this.applicationId);
     for (let file of this.files) {
      formData.append('file', file);
    }
    this.httpClient.post(environment.api + 'upload', formData).subscribe((data: any) => {
      this.isLoading = true;
      this.onSubmitApplication();
    }, err => {
     this.toastr.error(err.error.error);
    })
  }

  uploadedFiles(files): void {
    this.files = files;
  }

  uploadingDocument(isUploading): void {
    console.log(isUploading)
      this.isUploading = isUploading
  }

  private onSubmitApplication(): void {
    this.httpClient.post(environment.api + 'application', {application_id: this.applicationId}).subscribe((response: any) => {
        this.isLoading = false;
        this.router.navigate(['/submit'], {queryParams: {applicationId: this.applicationId, appDate: this.applicationDate}})
        this.toastr.success(response.Message);
        }, error => {
        this.isLoading = false;
        this.toastr.error(error.Message);
        })
  }
}
