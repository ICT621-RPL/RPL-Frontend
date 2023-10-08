import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  @Output() uploadedFiles: EventEmitter<any> = new EventEmitter();
  @Output() uploading: EventEmitter<any> = new EventEmitter();
  files: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

   /**
   * on file drop handler
   */
  onFileDropped($event) {
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(event) {
    this.prepareFilesList(event.files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    this.files.splice(index, 1);
  }

  /**
   * Simulate the upload process
   */
  // uploadFilesSimulator(index: number) {
  //   setTimeout(() => {
  //     if (index === this.files.length) {
  //       return;
  //     } else {
  //       const progressInterval = setInterval(() => {
  //         if (this.files[index].progress === 100) {
  //           clearInterval(progressInterval);
  //           this.uploadFilesSimulator(index + 1);
  //         } else {
  //           this.files[index].progress += 5;
  //         }
  //       }, 200);
  //     }
  //   }, 1000);
  // }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
    this.uploadedFiles.emit(this.files);
    this.uploadFilesSimulator();
  }

 
  formatBytes(bytes, decimals) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }




uploadFilesSimulator() {
  // Loop through all files
  for (let index = 0; index < this.files.length; index++) {
    // Start the upload simulation for each file
    this.simulateFileUpload(index);
  }
}

simulateFileUpload(index: number) {
  // Assuming network speed is 1000 KB/s
  const networkSpeed = 700000; 
  const fileSize = this.files[index].size; 
  const uploadTime = (fileSize / networkSpeed) * 1000;
  const updateInterval = 200; 
  const progressIncrement = (updateInterval / uploadTime) * 100; 
  
  this.files[index].progress = 0;
  this.uploading.emit(true)
  // Simulate file upload
  const progressInterval = setInterval(() => {

    if (this.files[index].progress >= 100) {
      clearInterval(progressInterval); 
        this.uploading.emit(false)
    } else {
      this.files[index].progress += progressIncrement; 
      if (this.files[index].progress > 100) {
        this.files[index].progress = 100;
      }
    }
  }, updateInterval);

}

}
