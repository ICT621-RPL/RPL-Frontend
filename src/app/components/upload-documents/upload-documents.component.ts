import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  public files: File[]=[]

  constructor(private router: Router,private httpClient: HttpClient, private toastr: ToastrService) {
    this.isUploading = false;
   this.experienceUploadInfo = "Upload your experience documents for applying the RPL"
   }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const formData = new FormData()
     for (let file of this.files) {
      formData.append('file', file);
    }
    this.httpClient.post(environment.api + 'upload', formData).subscribe((data: any) => {
      this.toastr.success(data.message);
      this.router.navigate(['/submit'])
    }, err => {
      console.log(err)
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
}
