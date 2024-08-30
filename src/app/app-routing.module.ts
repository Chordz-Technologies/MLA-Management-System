import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './admin/home/home.component';
import { LoginComponent } from './admin/login/login.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { SuperAdminComponent } from './admin/dashboard/superAdmin/superadmin.component';
import { EditsuperMsgComponent } from './admin/Editforms/editsuper-msg/editsuper-msg.component';
import { EditadminMsgComponent } from './admin/Editforms/editadmin-msg/editadmin-msg.component';
import { AddNewadminComponent } from './admin/Editforms/add-newadmin/add-newadmin.component';
import { AuthGuard } from './guard/auth.guard';
import { AllRecordsComponent } from './all-records/all-records.component';
import { AdminFilesComponent } from './admin-files/admin-files.component';
import { KatranPageComponent } from './admin/sidebar/katran-page/katran-page.component';
import { EventsPageComponent } from './admin/sidebar/events-page/events-page.component';
import { AavakJavakPageComponent } from './admin/sidebar/aavak-javak-page/aavak-javak-page.component';
import { PatravyavharComponent } from './admin/sidebar/patravyavhar/patravyavhar.component';
import { NivedaneComponent } from './admin/sidebar/nivedane-page/nivedane.component';
import { KatranImagesComponent } from './admin/sidebar/katran-images/katran-images.component';
import { AavakJavakImagesComponent } from './admin/sidebar/aavak-javak-images/aavak-javak-images.component';
import { NivedaneImagesComponent } from './admin/sidebar/nivedane-images/nivedane-images.component';
import { EventsImagesComponent } from './admin/sidebar/events-images/events-images.component';
import { RecordsComponent } from './admin/sidebar/records/records.component';
import { AddRecordsComponent } from './admin/sidebar/add-records/add-records.component';
import { NotificationsPageComponent } from './notifications-page/notifications-page.component';
import { SplashscreenComponent } from './splashscreen/splashscreen.component';

const routes: Routes = [
  { path: 'splash', component: SplashscreenComponent }, // Splash screen route
  { path: 'login', component: LoginComponent },
  {
    path: '', component: HomeComponent, canActivate: [AuthGuard],
    children: [
      { path: 'admin', component: SuperAdminComponent },
      { path: 'edit_superadmin_text/:id', component: EditsuperMsgComponent },
      { path: 'edit_admin_text/:id', component: EditadminMsgComponent },
      { path: 'add_new_admin', component: AddNewadminComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'allRecords/:id', component: AllRecordsComponent },
      { path: 'adminFiles/:id', component: AdminFilesComponent },
      { path: 'कात्रणे', component: KatranPageComponent },
      { path: 'आवक/जावक', component: AavakJavakPageComponent },
      { path: 'पत्रव्यवहार', component: PatravyavharComponent },
      { path: 'निवेदने', component: NivedaneComponent },
      { path: 'कार्यक्रम', component: EventsPageComponent },
      { path: 'सर्व-कात्रणे', component: KatranImagesComponent },
      { path: 'सर्व-आवक/जावक', component: AavakJavakImagesComponent },
      { path: 'सर्व-निवेदने', component: NivedaneImagesComponent },
      { path: 'सर्व-कार्यक्रम', component: EventsImagesComponent },
      { path: 'records', component: RecordsComponent },
      { path: 'add-records', component: AddRecordsComponent },
      { path: 'notifications', component: NotificationsPageComponent },
    ]
  },
  { path: '**', redirectTo: 'splash' } // Redirect to splash by default
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
