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
import { AavakPageComponent } from './admin/sidebar/aavak-javak/add-aavak/aavak-page.component';
import { PatravyavharComponent } from './admin/sidebar/patravyavhar/patravyavhar.component';
import { KatranImagesComponent } from './admin/sidebar/katrane/all-katrane/katran-images.component';
import { AllAavakComponent } from './admin/sidebar/aavak-javak/all-aavak/all-aavak.component';
import { EventsImagesComponent } from './admin/sidebar/karykrame/all-events/events-images.component';
import { RecordsComponent } from './admin/sidebar/visitors/all-records/records.component';
import { AddRecordsComponent } from './admin/sidebar/visitors/add-records/add-records.component';
import { NotificationsPageComponent } from './admin/sidebar/visitors/notifications-page/notifications-page.component';
import { SplashscreenComponent } from './splashscreen/splashscreen.component';
import { EditRecordsComponent } from './admin/sidebar/visitors/edit-records/edit-records.component';
import { EventNotificationsComponent } from './admin/sidebar/karykrame/event-notifications/event-notifications.component';
import { ContactUsComponent } from './admin/sidebar/contact-us/contact-us.component';
import { PrivacyPolicyComponent } from './admin/sidebar/privacy-policy/privacy-policy.component';
import { AddJavakComponent } from './admin/sidebar/aavak-javak/add-javak/add-javak.component';
import { AllJavakComponent } from './admin/sidebar/aavak-javak/all-javak/all-javak.component';
import { AddContactsComponent } from './admin/sidebar/contact-us/add-contacts/add-contacts.component';
import { AddExistingRecordComponent } from './admin/sidebar/visitors/add-existing-record/add-existing-record.component';
import { ImpPersonsComponent } from './admin/sidebar/imp-persons/imp-persons.component';
import { AddImpPersonComponent } from './admin/sidebar/imp-persons/add-imp-person/add-imp-person.component';
import { BirthdayComponent } from './admin/sidebar/visitors/birthday/birthday.component';

const routes: Routes = [
  { path: 'splash', component: SplashscreenComponent }, // Splash screen route
  { path: 'login', component: LoginComponent },
  {
    path: '', component: HomeComponent, canActivate: [AuthGuard],
    children: [
      { path: 'होम', component: SuperAdminComponent },
      { path: 'edit_admin/:id', component: EditsuperMsgComponent },
      { path: 'add_new_admin', component: AddNewadminComponent },
      { path: 'admin-dashboard', component: DashboardComponent },
      { path: 'कात्रणे', component: KatranPageComponent },
      { path: 'आवक', component: AavakPageComponent },
      { path: 'जावक', component: AddJavakComponent },
      { path: 'पत्रव्यवहार', component: PatravyavharComponent },
      { path: 'कार्यक्रम', component: EventsPageComponent },
      { path: 'सर्व-कात्रणे', component: KatranImagesComponent },
      { path: 'सर्व-आवक', component: AllAavakComponent },
      { path: 'सर्व-जावक', component: AllJavakComponent },
      { path: 'सर्व-कार्यक्रम', component: EventsImagesComponent },
      { path: 'all-records', component: RecordsComponent },
      { path: 'add-records', component: AddRecordsComponent },
      { path: 'add-records/:v_id', component: AddExistingRecordComponent },
      { path: 'edit-records/:v_id', component: EditRecordsComponent },
      { path: 'notifications', component: NotificationsPageComponent },
      { path: 'events-notifications', component: EventNotificationsComponent },
      { path: 'महत्वाचे-संपर्क', component: ContactUsComponent },
      { path: 'add-contacts', component: AddContactsComponent },
      { path: 'edit-contacts/:id', component: AddContactsComponent },
      { path: 'VBH-Helpline', component: PrivacyPolicyComponent },
      { path: 'all-important-persons', component: ImpPersonsComponent },
      { path: 'add-important-persons', component: AddImpPersonComponent },
      { path: 'edit-important-persons/:id', component: AddImpPersonComponent },
      { path: 'birthday', component: BirthdayComponent },
    ]
  },
  { path: '**', redirectTo: 'splash' } // Redirect to splash by default
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
