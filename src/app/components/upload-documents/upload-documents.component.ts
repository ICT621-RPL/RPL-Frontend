import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-documents',
  templateUrl: './upload-documents.component.html',
  styleUrls: ['./upload-documents.component.scss']
})
export class UploadDocumentsComponent implements OnInit {
  public experienceUploadInfo: string;
  public isUploading: boolean;
  constructor(private router: Router) {
    this.isUploading = false;
   this.experienceUploadInfo = "Upload your experience documents for applying the RPL"
   }

  ngOnInit(): void {
  }

  onSubmit(): void {

    this.router.navigate(['/submit'])
  }

  uploadedFiles(files): void {
    console.log(files)
  }

  uploadingDocument(isUploading): void {
    console.log(isUploading)
      this.isUploading = isUploading
  }
}
