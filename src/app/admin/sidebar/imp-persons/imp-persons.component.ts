import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/shared/service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-imp-persons',
  templateUrl: './imp-persons.component.html',
  styleUrls: ['./imp-persons.component.scss']
})
export class ImpPersonsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'contactno', 'subject', 'date', 'area', 'contact_now', 'text_msg', 'action'];
  dataSource!: MatTableDataSource<any>;

  constructor(private service: ServiceService, private router: Router, private datePipe: DatePipe, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.allPersonData();

    const state = history.state;
    if (state && state.newPersonData) {
      this.newPersonData(state.newPersonData);
    }
  }

  newPersonData(newPersonData: any) {
    if (!this.dataSource) {
      this.dataSource = new MatTableDataSource([newPersonData]);
    } else {
      this.dataSource.data = [...this.dataSource.data, newPersonData];
    }
  }

  allPersonData() {
    this.service.getAllPersonData().subscribe({
      next: (res: any) => {
        this.dataSource = new MatTableDataSource(res.all_persons);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onChange(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  encodeMessage(row: any): string {
    const formattedVDate = this.datePipe.transform(row.p_time, 'dd-MMM-yyyy, h:mm a');

    const message = `
नमस्कार,
  
*महत्त्वाच्या व्यक्तींची माहिती :*

नाव : ${row.p_name}
संपर्क क्रमांक : ${row.p_contact}
भेटण्याचा विषय : ${row.p_subject}
तारीख व वेळ : ${formattedVDate}
ठिकाण/क्षेत्र : ${row.p_area}
  `;
    return encodeURIComponent(message.trim());
  }

  downloadReport() {
    this.service.personExcelReport().subscribe((response: Blob) => {
      const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const downloadURL = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadURL;
      link.download = 'महत्त्वाच्या व्यक्ती रिपोर्ट.xlsx';  // Set the desired file name
      link.click();
    });
  }

  sendSMS(row: any) {
    const phoneNumber = row.v_contactno;
    const data = { phone_number: phoneNumber };

    this.service.textMsg(data).subscribe(
      response => {
        this.toastr.success('SMS sent successfully!', 'Success');
      },
      error => {
        this.toastr.error('Error sending SMS', 'Error');
      }
    );
  }

  edit(id: number) {
    this.router.navigate(['/edit-important-persons', id]);
  }
}