import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-work-experience',
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.scss'],
})
export class WorkExperienceComponent implements OnInit, OnChanges {
  @ViewChild('fileInput') fileInput: ElementRef ;
   @Input() expForm: any;
  public isLoading = false;
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // Add any other required headers here
    }),
  };
  public experienceUploadInfo;
  months: string[] = [];
  api = environment.api;
  years: number[] = [];
  public closeResult = '';
  selectedFiles: File[] = [];

  quillConfig = {
    toolbar: {
      container: [[{ list: 'ordered' }, { list: 'bullet' }], ['link']],
    },
  };

  constructor(private fb: FormBuilder, private http: HttpClient) {
    const currentYear = new Date().getFullYear();
    const startYear = 1980;
    for (let year = currentYear; year >= startYear; year--) {
      this.years.push(year);
    }
    this.months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    this.experienceUploadInfo = "Upload your experience documents for applying the RPL"
  }

  ngOnInit(): void {
    this.expForm.valueChanges.subscribe((value: any) => {
      console.log(value);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    changes;
  }



  public onSubmitForm(): void {
    console.log(this.expForm.value);
    this.isLoading = true;
    this.http
      .post(this.api + 'experience', { studentId: 1, ...this.expForm.value })
      .subscribe(
        (data) => {
          console.log(data);
          this.isLoading = false;
        },
        (err) => console.log(err)
      );
    this.isLoading = false;
  }
}
