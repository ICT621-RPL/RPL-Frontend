import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-feedbacks',
  templateUrl: './feedbacks.component.html',
  styleUrls: ['./feedbacks.component.scss']
})
export class FeedbacksComponent implements OnInit {

  public messages: string = ""

  constructor(public dialogRef: MatDialogRef<FeedbacksComponent>) { }

  closeDialog() {
    this.dialogRef.close(this.messages);
  }

  onCancle() {
    this.dialogRef.close("")
  }

  ngOnInit(): void {
    
  }
  

}
