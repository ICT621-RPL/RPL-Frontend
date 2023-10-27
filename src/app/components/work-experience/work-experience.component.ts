import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  ElementRef,
  Input,
  Output,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
  EventEmitter
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-work-experience',
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.scss'],
})
export class WorkExperienceComponent implements OnInit, OnChanges {
  @Output() onDelete: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('fileInput') fileInput: ElementRef ;
  @Input() expForm: any;
  @Input() indexForm: number;
  enableUnits: boolean = false;
  public recommendations: Array<{experience_id: number,
     is_applied: number, selected?: boolean,
      recommendation_id: number, recommendation_unit_code: string,recommendation_similarity:number,
     recommendation_unit_name: string}> = [];
  public isLoading = false;
  public experienceId: number = 0;
  public itemLoading: boolean = false;
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
  isAllSelected: boolean = false;
  isIndeterminate: boolean = false;
  quillConfig = {
    toolbar: {
      container: [[{ list: 'ordered' }, { list: 'bullet' }], ['link']],
    },
  };

  constructor(private fb: FormBuilder, private http: HttpClient, private toastr: ToastrService) {
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
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    
  }

  onContentChange(change): void {
    this.expForm.controls['description'].setValue(change.getText());
  }


  public onSubmitForm(): void {
    this.enableUnits = true;
    this.isLoading = true;
    this.http
      .post(this.api + 'experience', this.expForm.value )
      .subscribe(
        (data: any) => {
          this.experienceId = data?.experience_id
          this.setRecommendations(data);
        },
        (err) => {
          this.toastr.error(err.message)
        }
      );
    this.isLoading = false;
  }

  public onDeleteForm(): void {
    this.onDelete.emit({index: this.indexForm, experienceId: this.experienceId})
  }

  public setRecommendations(data): void {
      this.itemLoading = true;
      setTimeout(()=> {
        this.itemLoading = false;
        this.toastr.info("You can select multiple courses to apply RPL.")
      }, 2000)
      this.expForm.get('experience_id').setValue(data.experience.experience_id)
      data.recommendations.forEach((recommendation) => recommendation.selected = false)
      this.recommendations = data.recommendations
  }

  public onSelectRecommendation(event, courseId): void {
    const control  = this.expForm.get('courses');
    const recommendations = control.value;
    if(event.target.checked) {
      let unitRecommendation = this.recommendations.filter(recommendation => recommendation.recommendation_id == courseId)
      unitRecommendation[0].selected = true; 
      recommendations.push(unitRecommendation[0])
    }
    else {
      let unitRecommendation = this.recommendations.filter(recommendation => recommendation.recommendation_id == courseId)
      unitRecommendation[0].selected = false; 
      recommendations.pop(unitRecommendation[0])
    }
    control.setValue(recommendations);
    this.isAllSelected = this.recommendations.every(recommendation => recommendation.selected)
    this.isIndeterminate = this.recommendations.some(item => item.selected) && !this.isAllSelected;

  }

  public onSelectAll(event, recommendations): void {
    this.isIndeterminate = false;
    const control  = this.expForm.get('courses');
    this.isAllSelected = event.target.checked;
    for(let recommendation of recommendations) {
        recommendation.selected = this.isAllSelected;
    }
    if(this.isAllSelected) {
      control.setValue(recommendations.map((r)=> r ))
    }
    else {
     control.setValue([])
    }
  }

}
