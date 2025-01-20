import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-patravyavhar',
  templateUrl: './patravyavhar.component.html',
  styleUrls: ['./patravyavhar.component.scss']
})
export class PatravyavharComponent {
  currentTemplate: string = 'शिधापत्रिका शिफारस पत्र';
  javak_no1: string = '';
  javak_no2: string = '';
  javak_no3: string = '';
  javak_no4: string = '';
  javak_no5: string = '';
  javak_no6: string = '';
  date1: string = '';
  date2: string = '';
  date3: string = '';
  date4: string = '';
  date5: string = '';
  date6: string = '';
  name1: string = '';
  name2: string = '';
  name3: string = '';
  name4: string = '';
  address1: string = '';
  address2: string = '';
  address3: string = '';
  family_count: string = '';
  year1: string = '';
  year2: string = '';
  patientName: string = '';
  patientAge: string = '';
  patientAddress: string = '';
  patientMobileNo: string = '';
  hospitalName: string = '';
  disease: string = '';
  totalCost: string = '';
  reasons: string = '';
  trainName: string = '';
  trainDate: string = '';
  trainNo: string = '';
  destination: string = '';
  class: string = '';
  PNRNo: string = '';
  waitingNo: string = '';
  heading: string = '';
  subheading: string = '';
  paragraph: string = '';

  showTemplate(template: string) {
    this.currentTemplate = template;
  }

  printPage() {
    const printSection = document.getElementById('print-section');
    if (printSection) {
      const printContent = printSection.innerHTML;
      const originalContent = document.body.innerHTML;

      document.body.innerHTML = printContent;
      window.print();
      document.body.innerHTML = originalContent;

      window.location.reload(); // Reload the page to restore the original content
    } else {
      console.error('Print section not found');
    }
  }
}
