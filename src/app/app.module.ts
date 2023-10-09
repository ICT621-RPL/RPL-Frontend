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
import { MSAL_GUARD_CONFIG, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG, MsalBroadcastService, MsalGuard, MsalGuardConfiguration, MsalInterceptor, MsalInterceptorConfiguration, MsalModule, MsalRedirectComponent, MsalService } from '@azure/msal-angular';
import { BrowserCacheLocation, IPublicClientApplication, InteractionType, LogLevel, PublicClientApplication } from '@azure/msal-browser';

const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;

export function loggerCallback(logLevel: LogLevel, message: string) {
  console.log(message);
}

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: 'd937dd6b-3f2e-45b7-9682-17838719d513',
      authority: 'https://login.microsoftonline.com/consumers',
      redirectUri: 'http://localhost:4200/'
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
      storeAuthStateInCookie: isIE, // set to true for IE 11
    },
    system: {
      loggerOptions: {
        loggerCallback,
        logLevel: LogLevel.Info,
        piiLoggingEnabled: false
      }
    }
  });
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set('https://graph.microsoft.com/v1.0/me', ['user.read']);

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap
  };
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return { 
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: ['user.read']
    }
  };
}
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
    MsalModule,

  ],
  providers: [ {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }
