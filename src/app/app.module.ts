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
import { EditsuperMsgComponent } from './admin/Editforms/editsuper-msg/editsuper-msg.component';
import { EditadminMsgComponent } from './admin/Editforms/editadmin-msg/editadmin-msg.component';
import { AddNewadminComponent } from './admin/Editforms/add-newadmin/add-newadmin.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AllRecordsComponent } from './all-records/all-records.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { AdminFilesComponent } from './admin-files/admin-files.component';
import { KatranPageComponent } from './admin/sidebar/katran-page/katran-page.component';
import { EventsPageComponent } from './admin/sidebar/events-page/events-page.component';
import { AavakJavakPageComponent } from './admin/sidebar/aavak-javak-page/aavak-javak-page.component';
import { NivedaneComponent } from './admin/sidebar/nivedane-page/nivedane.component';
import { PatravyavharComponent } from './admin/sidebar/patravyavhar/patravyavhar.component';
import { KatranImagesComponent } from './admin/sidebar/katran-images/katran-images.component';
import { AavakJavakImagesComponent } from './admin/sidebar/aavak-javak-images/aavak-javak-images.component';
import { NivedaneImagesComponent } from './admin/sidebar/nivedane-images/nivedane-images.component';
import { EventsImagesComponent } from './admin/sidebar/events-images/events-images.component';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RecordsComponent } from './admin/sidebar/records/records.component';
import { AddRecordsComponent } from './admin/sidebar/add-records/add-records.component';
import { NotificationsPageComponent } from './notifications-page/notifications-page.component';
import { SplashscreenComponent } from './splashscreen/splashscreen.component';
import { ChatbotComponent } from './chatbot/chatbot.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
    SidebarComponent,
    LoginComponent,
    SuperAdminComponent,
    EditsuperMsgComponent,
    EditadminMsgComponent,
    AddNewadminComponent,
    AllRecordsComponent,
    AdminFilesComponent,
    KatranPageComponent,
    EventsPageComponent,
    AavakJavakPageComponent,
    NivedaneComponent,
    PatravyavharComponent,
    KatranImagesComponent,
    AavakJavakImagesComponent,
    NivedaneImagesComponent,
    EventsImagesComponent,
    RecordsComponent,
    AddRecordsComponent,
    NotificationsPageComponent,
    SplashscreenComponent,
    ChatbotComponent
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
