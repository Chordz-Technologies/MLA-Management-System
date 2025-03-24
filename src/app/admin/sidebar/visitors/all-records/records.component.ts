import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from 'src/app/shared/service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit {
  message = '';
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'name', 'address', 'area', 'office', 'contact_no', 'dob', 'votingno', 'problems', 'otherProblems', 'date', 'completion_date', 'status', 'comment', 'arja', 'contact_now', 'text_msg', 'action'];

  constructor(private service: ServiceService, private router: Router, private toastr: ToastrService, private datePipe: DatePipe, private configService: ConfigService) { }

  ngOnInit(): void {
    const config = this.configService.getConfig();
    this.message = config.message;

    this.getAllVisitors();

    const state = history.state;
    if (state && state.newVisitor) {
      this.addNewVisitor(state.newVisitor);
    }
  }

  addNewVisitor(newVisitor: any) {
    if (!this.dataSource) {
      this.dataSource = new MatTableDataSource([newVisitor]);
    } else {
      this.dataSource.data = [...this.dataSource.data, newVisitor];
    }
  }

  getAllVisitors() {
    this.service.getAllVisitors().subscribe({
      next: (res: any) => {
        this.dataSource = new MatTableDataSource(res.all_visitors);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  filterByDate(selectedDate: Date) {
    const formattedDate = this.datePipe.transform(selectedDate, 'yyyy-MM-dd') || '';

    this.service.getVisitorsByDate(formattedDate).subscribe({
      next: (res: any) => {
        if (res.filtered_visitor && res.filtered_visitor.length > 0) {
          this.dataSource = new MatTableDataSource(res.filtered_visitor);
        } else {
          this.dataSource = new MatTableDataSource(res.filtered_visitor);
          this.toastr.error('No data found for the selected date.', 'Error');
        }
      },
      error: (err: any) => {
        console.log(err);
        this.toastr.error('An error occurred while fetching data.', 'Error');
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

  edit(id: number) {
    this.router.navigate(['/edit-records', id]);
  }

  convertNumbers(value: string): string {
    const marathiNumbers = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
    const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    let convertedValue = value;
    for (let i = 0; i < marathiNumbers.length; i++) {
      const regex = new RegExp(marathiNumbers[i], 'g');
      convertedValue = convertedValue.replace(regex, englishNumbers[i]);
    }
    return convertedValue;
  }

  encodeMessage(row: any): string {
    const formattedVDate = this.datePipe.transform(row.v_date, 'dd-MMM-yyyy');
    const formattedCompletionDate = this.datePipe.transform(row.completion_date, 'dd-MMM-yyyy');
    const isComplete = row.v_status === 'काम पूर्ण';

    const wpmessage = `
नमस्कार,
  
*${this.message} यांच्या जनसंपर्क कार्यालयामध्ये आपले स्वागत आहे.*
*आपल्या समस्यांचे निवारण करून चांगली सेवा देणे हेच आमचे प्राथमिक उद्दिष्ट आहे.*
  
आपण नोंदविलेल्या समस्येचे स्वरूप पुढीलप्रमाणे आहे:

तिकीट क्र. : ${row.v_id}
नाव : ${row.v_name}
समस्या नोंद दिनांक : ${formattedVDate}
समस्या : ${row.v_problem} ${row.v_otherproblem ? ', ' + row.v_otherproblem : ''}
काम पूर्ण होण्याची तारीख : ${formattedCompletionDate}
कामाची स्थिती : ${row.v_status}
  
${isComplete
        ? '*आपल्या समस्येचे निवारण झाले आहे.*'
        : 'लवकरच आपल्या समस्येचे निवारण होईल.'
      }
  
*आपली सेवा करण्याची संधी दिलीत त्याबद्दल धन्यवाद!*

आपला,
${this.message}
भाजप
  `;
    return encodeURIComponent(wpmessage.trim());
  }

  sendSMS(row: any) {
    const phoneNumber = row.v_contactno;
    const data = { v_contactno: phoneNumber };

    this.service.textMsg(data).subscribe(
      response => {
        this.toastr.success('SMS sent successfully!', 'Success');
      },
      error => {
        this.toastr.error('Error sending SMS', 'Error');
      }
    );
  }

  downloadReport() {
    this.service.getVisitorExcelReport().subscribe((response: Blob) => {
      const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const downloadURL = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadURL;
      link.download = 'Visitor Report.xlsx';  // Set the desired file name
      link.click();
    });
  }
}
