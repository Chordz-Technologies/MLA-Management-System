import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { HomeComponent } from './admin/home/home.component';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { LoginComponent } from './admin/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ToastrModule } from 'ngx-toastr';
import { SuperAdminComponent } from './admin/dashboard/superAdmin/superadmin.component';
import { MatSelectModule } from '@angular/material/select';
import { EditsuperMsgComponent } from './admin/Editforms/edit-admin/editsuper-msg.component';
import { AddNewadminComponent } from './admin/Editforms/add-newadmin/add-newadmin.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { KatranPageComponent } from './admin/sidebar/katrane/add-katrane/katran-page.component';
import { EventsPageComponent } from './admin/sidebar/karykrame/add-events/events-page.component';
import { AavakPageComponent } from './admin/sidebar/aavak-javak/add-aavak/aavak-page.component';
import { PatravyavharComponent } from './admin/sidebar/patravyavhar/patravyavhar.component';
import { KatranImagesComponent } from './admin/sidebar/katrane/all-katrane/katran-images.component';
import { AllAavakComponent } from './admin/sidebar/aavak-javak/all-aavak/all-aavak.component';
import { EventsImagesComponent } from './admin/sidebar/karykrame/all-events/events-images.component';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RecordsComponent } from './admin/sidebar/visitors/all-records/records.component';
import { AddRecordsComponent } from './admin/sidebar/visitors/add-records/add-records.component';
import { NotificationsPageComponent } from './admin/sidebar/visitors/notifications-page/notifications-page.component';
import { SplashscreenComponent } from './splashscreen/splashscreen.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { EditRecordsComponent } from './admin/sidebar/visitors/edit-records/edit-records.component';
import { EventNotificationsComponent } from './admin/sidebar/karykrame/event-notifications/event-notifications.component';
import { ContactUsComponent } from './admin/sidebar/contact-us/contact-us.component';
import { PrivacyPolicyComponent } from './admin/sidebar/privacy-policy/privacy-policy.component';
import { AddJavakComponent } from './admin/sidebar/aavak-javak/add-javak/add-javak.component';
import { AllJavakComponent } from './admin/sidebar/aavak-javak/all-javak/all-javak.component';
import { AddContactsComponent } from './admin/sidebar/contact-us/add-contacts/add-contacts.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
    SidebarComponent,
    LoginComponent,
    SuperAdminComponent,
    EditsuperMsgComponent,
    AddNewadminComponent,
    KatranPageComponent,
    EventsPageComponent,
    AavakPageComponent,
    PatravyavharComponent,
    KatranImagesComponent,
    AllAavakComponent,
    EventsImagesComponent,
    RecordsComponent,
    AddRecordsComponent,
    NotificationsPageComponent,
    SplashscreenComponent,
    ChatbotComponent,
    EditRecordsComponent,
    EventNotificationsComponent,
    ContactUsComponent,
    PrivacyPolicyComponent,
    AddJavakComponent,
    AllJavakComponent,
    AddContactsComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatCardModule,
    FlexLayoutModule,
    NgChartsModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    NgbDropdownModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ToastrModule.forRoot(),
    NgbModule,

  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
