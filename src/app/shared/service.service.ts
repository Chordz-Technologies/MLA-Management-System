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

  fetchData(userId: number, date: string): Observable<any> {
    return this.http.get(`${this.url}/filesbydateanduser/?user_id=${userId}&upload_date=${date}`);
  }

  adminFilesDownload(a_id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/userfiles/${a_id}/`);
  }

  downloadFile(url: string, fileName: string) {
    return this.http.get(url, { responseType: 'blob' });
  }

  // sidebar options API

  postPaperCuttings(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}/createkatran/`, data);
  }

  postAavakJavakData(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}/createavakjavak/`, data);
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

  getAllAavakJavakImages(): Observable<any> {
    return this.http.get<any>(`${this.url}/allavakjavak/`);
  }

  getExcelReport(): Observable<Blob> {
    return this.http.get(`${this.url}/excelreport/`, { responseType: 'blob' });
  }

  getAllNivedaneImages(): Observable<any> {
    return this.http.get<any>(`${this.url}/allnivedan/`);
  }

  getAllKarykramImages(): Observable<any> {
    return this.http.get<any>(`${this.url}/allkaryakram/`);
  }

  // Visitors data

  postVisitorData(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}/createvisitor/`, data);
  }

  getAllVisitors(): Observable<any> {
    return this.http.get<any>(`${this.url}/allvisitors/`);
  }

  getNotifications(): Observable<any> {
    return this.http.get<any>(`${this.url}/workendingsoon/`);
  }

}