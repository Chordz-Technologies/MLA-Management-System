import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Login API
  loginpost(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}/adminLogin/`, data);
  }

  //UserDetails API
  getAllSuperAdminDetails(): Observable<any> {
    return this.http.get<any>(`${this.url}/allAdmins/`);
  }

  getSuperAdminDetailsById(a_id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/adminDetails/${a_id}/`);
  }

  SuperAdminPost(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}/createAdmin/`, data);
  }

  deleteSuperAdminById(a_id: number): Observable<any> {
    return this.http.delete(`${this.url}/deleteAdmin/${a_id}/`);
  }

  updateAdmminById(a_id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.url}/updateAdmin/${a_id}`, data);
  }

  // sidebar options API

  postPaperCuttings(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}/createkatran/`, data);
  }

  postAavakData(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}/createavak/`, data);
  }

  postJavakData(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}/createjavak/`, data);
  }

  postNivedaneData(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}/createnivedan/`, data);
  }

  postEventsData(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}/createkaryakram/`, data);
  }

  getAllKatrans(): Observable<any> {
    return this.http.get<any>(`${this.url}/allkatrans/`);
  }

  getKatranImagesByPaper(paper: string): Observable<any> {
    return this.http.get<any>(`${this.url}/katranfilter/${paper}/`);
  }

  getKatranImagesByDate(date: string): Observable<any> {
    return this.http.get<any>(`${this.url}/katranbydate/?k_date=${date}`);
  }

  getAllAavak(): Observable<any> {
    return this.http.get<any>(`${this.url}/allavak/`);
  }

  getAllJavak(): Observable<any> {
    return this.http.get<any>(`${this.url}/alljavak/`);
  }

  getInwardExcelReport(): Observable<Blob> {
    return this.http.get(`${this.url}/avakexcelreport/`, { responseType: 'blob' });
  }

  getOutwardExcelReport(): Observable<Blob> {
    return this.http.get(`${this.url}/javakexcelreport/`, { responseType: 'blob' });
  }

  getAllNivedaneImages(): Observable<any> {
    return this.http.get<any>(`${this.url}/allnivedan/`);
  }

  getAllKarykramImages(): Observable<any> {
    return this.http.get<any>(`${this.url}/allkaryakram/`);
  }

  getEventNotifications(): Observable<any> {
    return this.http.get<any>(`${this.url}/karyakramendingsoon/`);
  }

  // Visitors data

  postVisitorData(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}/createvisitor/`, data);
  }

  updateVisitorData(v_id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.url}/updatevisitor/${v_id}`, data);
  }

  getAllVisitors(): Observable<any> {
    return this.http.get<any>(`${this.url}/allvisitors/`);
  }

  getVisitorDataById(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/visitordetails/${id}/`);
  }

  deleteVisitorData(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/deletevisitor/${id}/`);
  }

  getNotifications(): Observable<any> {
    return this.http.get<any>(`${this.url}/workendingsoon/`);
  }

  getVisitorsByDate(date: string): Observable<any> {
    return this.http.get(`${this.url}/visitorbydate/?v_date=${date}`);
  }

  textMsg(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}/sendsms/`, data);
  }

  getVisitorExcelReport(): Observable<Blob> {
    return this.http.get(`${this.url}/visitorexcelreport/`, { responseType: 'blob' });
  }

  getAllContactData(): Observable<any> {
    return this.http.get<any>(`${this.url}/list/`);
  }

  postContactData(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}/create/`, data);
  }

  getContactDataById(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/getbyid/${id}/`);
  }

  updateContactData(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.url}/update/${id}/`, data);
  }

  deleteContactData(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/delete/${id}/`);
  }
}
