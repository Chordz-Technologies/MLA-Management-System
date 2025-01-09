import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/shared/service.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-add-records',
  templateUrl: './add-records.component.html',
  styleUrls: ['./add-records.component.scss']
})
export class AddRecordsComponent {
  addVisitorsData!: FormGroup;
  applicationImg: File | null | undefined;
  displayedColumns: string[] = ['id', 'name', 'contactno', 'problems', 'otherProblems', 'action'];
  searchMobileNo: string = '';
  dataSource!: MatTableDataSource<any>;
  isOtherSelected = false;

  constructor(private service: ServiceService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.addVisitorsData = this.fb.group({
      id: [''],
      v_name: this.fb.control(''),
      v_contactno: this.fb.control(''),
      v_birthdate: this.fb.control(''),
      v_votingno: this.fb.control(''),
      v_address: this.fb.control(''),
      v_area: this.fb.control(''),
      v_arja: this.fb.control(''),
      v_problem: this.fb.control(''),
      v_otherproblem: this.fb.control(''),
      v_date: [this.getTodayDate()],
      completion_date: this.fb.control(''),
      v_comment: this.fb.control(''),
      v_status: this.fb.control(''),
      office: this.fb.control('')
    })
  }

  getTodayDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0]; // Format as 'YYYY-MM-DD'
  }

  onProblemChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    if (selectedValue === 'इतर') {
      this.isOtherSelected = true;
      this.addVisitorsData.get('v_otherproblem')?.enable();
    } else {
      this.isOtherSelected = false;
      this.addVisitorsData.get('v_otherproblem')?.disable();
      this.addVisitorsData.get('v_otherproblem')?.setValue(''); // Clear the field
    }
  }

  onImageSelected(image: any) {
    const fileList: FileList = image.target.files;
    if (fileList.length > 0) {
      this.applicationImg = fileList[0];
    } else {
      this.applicationImg = null;
    }
  }

  postSuperAdminDetails() {
    const VisitorData = {
      v_name: this.addVisitorsData.value.v_name || '',
      v_contactno: this.addVisitorsData.value.v_contactno || '',
      v_birthdate: this.addVisitorsData.value.v_birthdate || '',
      v_votingno: this.addVisitorsData.value.v_votingno || '',
      v_address: this.addVisitorsData.value.v_address || '',
      v_area: this.addVisitorsData.value.v_area || '',
      v_problem: this.addVisitorsData.value.v_problem || '',
      v_otherproblem: this.addVisitorsData.value.v_otherproblem || '',
      v_date: this.addVisitorsData.value.v_date || '',
      completion_date: this.addVisitorsData.value.completion_date || '',
      v_comment: this.addVisitorsData.value.v_comment || '',
      v_status: this.addVisitorsData.value.v_status || '',
      office: this.addVisitorsData.value.office || '',
    };

    // const { v_name, v_contactno, v_address, v_area, v_problem, v_date, completion_date, v_status, office } = VisitorData;

    // if (!v_name || !v_contactno || !v_address || !v_area || !v_problem || !v_date || !completion_date || !v_status || !office) {
    //   this.toastr.error('Please fill all the fields.', 'Error');
    //   return;
    // }

    const formData: FormData = new FormData();
    // Append only non-null values to the FormData
    for (const [key, value] of Object.entries(VisitorData)) {
      formData.append(key, value as string);
    }

    // Check if the image (arja file) exists and append it to the FormData if present
    if (this.applicationImg) {
      formData.append('v_arja', this.applicationImg || '');
    }

    this.service.postVisitorData(formData).subscribe((res) => {
      if (res === 'success') {
        this.toastr.success('Visitor Data Added Successfully!', 'Success');
      } else {
        this.toastr.success('Visitor Data Added Successfully!', 'Success');
        this.router.navigate(['/all-records'], { state: { newVisitor: VisitorData } });
        this.addVisitorsData.reset();
      }
    });
  }

  fetchVisitorHistory(mobileNo: string): void {
    this.service.getVisitorHistory(mobileNo).subscribe({
      next: (res: any) => {
        if (res && res.status === 'success' && res.data) {

          // Convert the single object to an array
          const dataArray = Array.isArray(res.data) ? res.data : [res.data];

          this.dataSource = new MatTableDataSource(dataArray);
        } else {
          this.toastr.error('No visitor found with the given mobile number', 'Error');
        }
      },
      error: (err) => {
        this.toastr.error('Failed to fetch visitor history.', 'Error');
        console.error('Error fetching visitor history:', err);
      }
    });
  }

  // Function triggered when the search button is clicked
  onSearch(): void {
    this.fetchVisitorHistory(this.searchMobileNo.trim());
  }

  edit(id: number) {
    this.router.navigate(['/add-records', id]);
  }
}
