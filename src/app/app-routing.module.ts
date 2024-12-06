import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './admin/home/home.component';
import { LoginComponent } from './admin/login/login.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { SuperAdminComponent } from './admin/dashboard/superAdmin/superadmin.component';
import { EditsuperMsgComponent } from './admin/Editforms/edit-admin/editsuper-msg.component';
import { AddNewadminComponent } from './admin/Editforms/add-newadmin/add-newadmin.component';
import { AuthGuard } from './guard/auth.guard';
import { KatranPageComponent } from './admin/sidebar/katrane/add-katrane/katran-page.component';
import { EventsPageComponent } from './admin/sidebar/karykrame/add-events/events-page.component';
import { AavakJavakPageComponent } from './admin/sidebar/aavak-javak/add-aavak-javak/aavak-javak-page.component';
import { PatravyavharComponent } from './admin/sidebar/patravyavhar/patravyavhar.component';
import { NivedaneComponent } from './admin/sidebar/yojaneche-arja/add-yojaneche-arja/nivedane.component';
import { KatranImagesComponent } from './admin/sidebar/katrane/all-katrane/katran-images.component';
import { AavakJavakImagesComponent } from './admin/sidebar/aavak-javak/all-aavak-javak/aavak-javak-images.component';
import { NivedaneImagesComponent } from './admin/sidebar/yojaneche-arja/all-yojaneche-arja/nivedane-images.component';
import { EventsImagesComponent } from './admin/sidebar/karykrame/all-events/events-images.component';
import { RecordsComponent } from './admin/sidebar/visitors/all-records/records.component';
import { AddRecordsComponent } from './admin/sidebar/visitors/add-records/add-records.component';
import { NotificationsPageComponent } from './admin/sidebar/visitors/notifications-page/notifications-page.component';
import { SplashscreenComponent } from './splashscreen/splashscreen.component';
import { EditRecordsComponent } from './admin/sidebar/visitors/edit-records/edit-records.component';
import { EventNotificationsComponent } from './admin/sidebar/karykrame/event-notifications/event-notifications.component';
import { ContactUsComponent } from './admin/sidebar/contact-us/contact-us.component';
import { PrivacyPolicyComponent } from './admin/sidebar/privacy-policy/privacy-policy.component';

const routes: Routes = [
  { path: 'splash', component: SplashscreenComponent }, // Splash screen route
  { path: 'login', component: LoginComponent },
  {
    path: '', component: HomeComponent, canActivate: [AuthGuard],
    children: [
      { path: 'superadmin-dashboard', component: SuperAdminComponent },
      { path: 'edit_admin/:id', component: EditsuperMsgComponent },
      { path: 'add_new_admin', component: AddNewadminComponent },
      { path: 'admin-dashboard', component: DashboardComponent },
      { path: 'कात्रणे', component: KatranPageComponent },
      { path: 'आवक/जावक', component: AavakJavakPageComponent },
      { path: 'पत्रव्यवहार', component: PatravyavharComponent },
      { path: 'योजनेचे-अर्ज', component: NivedaneComponent },
      { path: 'कार्यक्रम', component: EventsPageComponent },
      { path: 'सर्व-कात्रणे', component: KatranImagesComponent },
      { path: 'सर्व-आवक/जावक', component: AavakJavakImagesComponent },
      { path: 'सर्व-योजनेचे-अर्ज', component: NivedaneImagesComponent },
      { path: 'सर्व-कार्यक्रम', component: EventsImagesComponent },
      { path: 'all-records', component: RecordsComponent },
      { path: 'add-records', component: AddRecordsComponent },
      { path: 'edit-records/:v_id', component: EditRecordsComponent },
      { path: 'notifications', component: NotificationsPageComponent },
      { path: 'events-notifications', component: EventNotificationsComponent },
      { path: 'contact_us', component: ContactUsComponent },
      { path: 'privacy_policy', component: PrivacyPolicyComponent }
    ]
  },
  { path: '**', redirectTo: 'splash' } // Redirect to splash by default
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
