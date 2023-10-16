import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RplFormsComponent } from './components/rpl-forms/rpl-forms.component';
import { UploadDocumentsComponent } from './components/upload-documents/upload-documents.component';
import { SubmitSuccessComponent } from './components/submit-success/submit-success.component';
import { ApplicationTrackerComponent } from './components/application-tracker/application-tracker.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ViewExperiencesComponent } from './components/view-experiences/view-experiences.component';


const routes: Routes = [
  { path: '', component: RplFormsComponent},
  { path: 'admin', component: AdminDashboardComponent},
  { path: 'admin/:id', component: ViewExperiencesComponent},
  {path: 'tracker', component: ApplicationTrackerComponent},
  { path: 'upload', component: UploadDocumentsComponent, pathMatch: 'full'  },
  { path: 'submit', component: SubmitSuccessComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' } // redirect to `home` component
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
