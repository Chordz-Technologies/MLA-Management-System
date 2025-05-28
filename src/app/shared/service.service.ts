import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from 'src/app/services/config.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private url: string = '';

  constructor(private http: HttpClient, private configService: ConfigService) {

    // Fetch the dynamically loaded apiUrl from ConfigService
    this.url = this.configService.getConfig().apiUrl;
  }

  // Login API
  loginpost(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}/adminmla/adminLogin/`, data);
  }

  //UserDetails API
  getAllSuperAdminDetails(): Observable<any> {
    return this.http.get<any>(`${this.url}/adminmla/allAdmins/`);
  }

  getSuperAdminDetailsById(a_id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/adminmla/adminDetails/${a_id}/`);
  }

  SuperAdminPost(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}/adminmla/createAdmin/`, data);
  }

  deleteSuperAdminById(a_id: number): Observable<any> {
    return this.http.delete(`${this.url}/adminmla/deleteAdmin/${a_id}/`);
  }

  updateAdmminById(a_id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.url}/adminmla/updateAdmin/${a_id}`, data);
  }

  // Visitors API
  postVisitorData(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}/visitors/createvisitor/`, data);
  }

  updateVisitorData(v_id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.url}/visitors/updatevisitor/${v_id}`, data);
  }

  getAllVisitors(): Observable<any> {
    return this.http.get<any>(`${this.url}/visitors/allvisitors/`);
  }

  getVisitorDataById(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/visitors/visitordetails/${id}/`);
  }

  deleteVisitorData(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/visitors/deletevisitor/${id}/`);
  }

  getNotifications(): Observable<any> {
    return this.http.get<any>(`${this.url}/visitors/workendingsoon/`);
  }

  getVisitorsByDate(date: string): Observable<any> {
    return this.http.get(`${this.url}/visitors/visitorbydate/?v_date=${date}`);
  }

  textMsg(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}/visitors/sendsms/`, data);
  }

  getVisitorExcelReport(): Observable<Blob> {
    return this.http.get(`${this.url}/visitors/visitorexcelreport/`, { responseType: 'blob' });
  }

  getDatewiseVisitorExcelReport(date: string): Observable<Blob> {
    return this.http.get(`${this.url}/visitors/visitorreport-datewise/?date=${date}`, { responseType: 'blob' });
  }

  getVisitorHistory(mobileno: string): Observable<any> {
    return this.http.get<any>(`${this.url}/visitors/searchvisitor/?search_term=${mobileno}`);
  }

  getBirthdayDetails(): Observable<any> {
    return this.http.get<any>(`${this.url}/visitors/visitorbirthday/`);
  }

  // Newspaper Cutting API
  postPaperCuttings(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}/katran/createkatran/`, data);
  }

  getAllKatrans(): Observable<any> {
    return this.http.get<any>(`${this.url}/katran/allkatrans/`);
  }

  getKatranImagesByPaper(paper: string): Observable<any> {
    return this.http.get<any>(`${this.url}/katran/searchkatran/?search_term=${paper}`);
  }

  getKatranImagesByDate(date: string): Observable<any> {
    return this.http.get<any>(`${this.url}/katran/katranbydate/?k_date=${date}`);
  }

  deleteKatran(k_id: number): Observable<any> {
    return this.http.delete(`${this.url}/katran/deletekatran/${k_id}/`);
  }

  // Aavak API
  postAavakData(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}/avak/createavak/`, data);
  }

  getAllAavak(): Observable<any> {
    return this.http.get<any>(`${this.url}/avak/allavak/`);
  }

  getInwardExcelReport(): Observable<Blob> {
    return this.http.get(`${this.url}/avak/avakexcelreport/`, { responseType: 'blob' });
  }

  // Javak API
  postJavakData(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}/javak/createjavak/`, data);
  }

  getAllJavak(): Observable<any> {
    return this.http.get<any>(`${this.url}/javak/alljavak/`);
  }

  getJavakDataById(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/javak/javakdetails/${id}/`);
  }

  updateJavakData(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.url}/javak/updatejavak/${id}/`, data);
  }

  getOutwardExcelReport(): Observable<Blob> {
    return this.http.get(`${this.url}/javak/javakexcelreport/`, { responseType: 'blob' });
  }

  // Event API
  postEventsData(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}/karyakram/createkaryakram/`, data);
  }

  getAllKarykramImages(): Observable<any> {
    return this.http.get<any>(`${this.url}/karyakram/allkaryakram/`);
  }

  getEventNotifications(): Observable<any> {
    return this.http.get<any>(`${this.url}/karyakram/karyakramendingsoon/`);
  }

  // eventTextMsg(data: any): Observable<any> {
  //   return this.http.post<any>(`${this.url}/karyakram/sendsms/`, data);
  // }

  getEventsByDate(date: string): Observable<any> {
    return this.http.get<any>(`${this.url}/karyakram/eventbydate/?k_date=${date}`);
  }

  getEventDataById(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/karyakram/karyakramdetails/${id}/`);
  }

  updateEventData(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.url}/karyakram/updatekaryakram/${id}/`, data);
  }

  // Important contact api
  getAllContactData(): Observable<any> {
    return this.http.get<any>(`${this.url}/impcontacts/list/`);
  }

  postContactData(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}/impcontacts/create/`, data);
  }

  getContactDataById(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/impcontacts/getbyid/${id}/`);
  }

  updateContactData(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.url}/impcontacts/update/${id}/`, data);
  }

  deleteContactData(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/impcontacts/delete/${id}/`);
  }

  // Important person api
  getAllPersonData(): Observable<any> {
    return this.http.get<any>(`${this.url}/vippersons/allpersons/`);
  }

  postPersonData(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}/vippersons/addperson/`, data);
  }

  getPersonDataById(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/vippersons/persondetails/${id}/`);
  }

  updatePersonData(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.url}/vippersons/updateperson/${id}/`, data);
  }

  deletePersonData(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/vippersons/deleteperson/${id}/`);
  }

  personTextMsg(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}/vippersons/sendsms/`, data);
  }

  personExcelReport(): Observable<Blob> {
    return this.http.get(`${this.url}/vippersons/vipreport/`, { responseType: 'blob' });
  }
}
