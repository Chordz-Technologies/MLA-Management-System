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
// @ViewChild('educationTemplate') educationTemplate!: ElementRef;
// @ViewChild('hospitalTemplate') hospitalTemplate!: ElementRef;

// educationTemplateVisible: boolean = false;
// hospitalTemplateVisible: boolean = false;

// openEducationTemplate() {
//   this.educationTemplateVisible = true;
//   this.hospitalTemplateVisible = false;
// }

// openHospitalTemplate() {
//   this.hospitalTemplateVisible = true;
//   this.educationTemplateVisible = false;
// }

// printTemplate() {
//   const printWindow = window.open('');
//   if (printWindow) {
//     printWindow.document.write('<html><head><title>Print Template</title>');
//     printWindow.document.write('<link rel="stylesheet" type="text/css" href="print-template.css"></head>');
//     printWindow.document.write('<body>');
//     // Append only the visible template content to the print window
//     let templateContent = '';
//     if (this.educationTemplateVisible) {
//       templateContent = this.educationTemplate.nativeElement.innerHTML;
//     } else if (this.hospitalTemplateVisible) {
//       templateContent = this.hospitalTemplate.nativeElement.innerHTML;
//     }
//     // Include values entered by the user in the printed content
//     const nameInput = document.getElementById('name') as HTMLInputElement;
//     const addressInput = document.getElementById('address') as HTMLInputElement;
//     const name = nameInput.value;
//     const address = addressInput.value;
//     templateContent = templateContent.replace('{{name}}', name);
//     templateContent = templateContent.replace('{{address}}', address);
//     printWindow.document.write(templateContent);
//     printWindow.document.write('</body></html>');
//     printWindow.document.close();
//     printWindow.print();
//   } else {
//     console.error('Failed to open print window');
//   }
// }
