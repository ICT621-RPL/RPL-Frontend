import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RplFormsComponent } from './components/rpl-forms/rpl-forms.component';
import { MurdochNavbarComponent } from './components/murdoch-navbar/murdoch-navbar.component';
import { MurdochFooterComponent } from './components/murdoch-footer/murdoch-footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WorkExperienceComponent } from './components/work-experience/work-experience.component';
import { QuillModule } from 'ngx-quill';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DndDirective } from './components/dnd.directive';
import { ProgressComponent } from './components/progress/progress.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { UploadDocumentsComponent } from './components/upload-documents/upload-documents.component';
import { SubmitSuccessComponent } from './components/submit-success/submit-success.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    RplFormsComponent,
    MurdochNavbarComponent,
    MurdochFooterComponent,
    WorkExperienceComponent,
    DndDirective,
    ProgressComponent,
    FileUploadComponent,
    UploadDocumentsComponent,
    SubmitSuccessComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MatDialogModule,
    QuillModule.forRoot(),
    HttpClientModule,
    ToastrModule.forRoot(), 
  ],
  providers: [ 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
function provideAnimations(): import("@angular/core").Provider {
  throw new Error('Function not implemented.');
}

