import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from 'src/app/shared/service.service';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-birthday',
  templateUrl: './birthday.component.html',
  styleUrls: ['./birthday.component.scss']
})
export class BirthdayComponent {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'name', 'contactno', 'date', 'contact_now', 'text_msg'];

  constructor(private service: ServiceService, private datePipe: DatePipe, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getBirthdayDetails();
  }

  getBirthdayDetails() {
    this.service.getBirthdayDetails().subscribe({
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
    // const formattedDate = this.datePipe.transform(row.Birthdate, 'dd-MMM-yyyy');

    const message = `
नमस्कार,

तुम्हाला वाढदिवसाच्या हार्दिक शुभेच्छा.

  `;
    return encodeURIComponent(message.trim());
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
}
