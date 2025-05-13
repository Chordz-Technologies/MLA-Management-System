import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from 'src/app/shared/service.service';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-event-notifications',
  templateUrl: './event-notifications.component.html',
  styleUrls: ['./event-notifications.component.scss']
})
export class EventNotificationsComponent {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'name', 'contactno', 'date', 'time', 'location', 'subject', 'photos', 'comments', 'remaining_days', 'contact_now'];

  constructor(private service: ServiceService, private datePipe: DatePipe, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllEvents();
  }

  getAllEvents() {
    this.service.getEventNotifications().subscribe({
      next: (res: any) => {
        this.dataSource = new MatTableDataSource(res.data);
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

  encodeMessage(row: any): string {
    const formattedDate = this.datePipe.transform(row.date, 'dd-MMM-yyyy');

    const message = `
नमस्कार,
  
*कार्यक्रमाची माहिती :*

नाव : ${row.k_name}
संपर्क क्रमांक : ${row.k_contactno}
तारीख व वेळ : ${formattedDate}, ${row.time}
पत्ता : ${row.location}
कार्यक्रमाचा विषय : ${row.k_subject}
उरलेले दिवस : ${row.remaining_days}
  `;
    return encodeURIComponent(message.trim());
  }

  // sendSMS(row: any) {
  //   const phoneNumber = '+917020327718';
  //   const data = { phone_number: phoneNumber };

  //   this.service.eventTextMsg(data).subscribe(
  //     response => {
  //       this.toastr.success('SMS sent successfully!', 'Success');
  //     },
  //     error => {
  //       this.toastr.error('Error sending SMS', 'Error');
  //     }
  //   );
  // }
}
