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
import {  HttpClientModule } from '@angular/common/http';
import { DndDirective } from './components/dnd.directive';
import { ProgressComponent } from './components/progress/progress.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { UploadDocumentsComponent } from './components/upload-documents/upload-documents.component';
import { SubmitSuccessComponent } from './components/submit-success/submit-success.component';
import { ToastrModule } from 'ngx-toastr';
import { GoogleLoginProvider, MicrosoftLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';


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
    SocialLoginModule 
  ],
  providers: [ 
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
              id: MicrosoftLoginProvider.PROVIDER_ID,
              provider: new MicrosoftLoginProvider('75a307b2-7676-4270-a565-30febe78fdfb', {
              redirect_uri: 'https://localhost:4200',
              logout_redirect_uri: 'https://localhost:4200/logout'
             })
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
