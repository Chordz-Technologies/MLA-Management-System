import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/shared/service.service';

@Component({
  selector: 'app-add-records',
  templateUrl: './add-records.component.html',
  styleUrls: ['./add-records.component.scss']
})
export class AddRecordsComponent {
  addVisitorsData!: FormGroup;
  adminType: string | null = localStorage.getItem('adminType');

  constructor(private service: ServiceService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.addVisitorsData = this.fb.group({
      id: [''],
      v_name: this.fb.control('', [Validators.required]),
      v_contactno: this.fb.control('', [Validators.required]),
      v_email: this.fb.control('', [Validators.required]),
      v_address: this.fb.control('', [Validators.required]),
      v_problem: this.fb.control('', [Validators.required]),
      v_date: this.fb.control('', [Validators.required]),
      completion_date: this.fb.control('', [Validators.required]),
    })
  }

  postSuperAdminDetails() {
    const adminData = {
      v_name: this.addVisitorsData.value.v_name,
      v_contactno: this.addVisitorsData.value.v_contactno,
      v_email: this.addVisitorsData.value.v_email,
      v_address: this.addVisitorsData.value.v_address,
      v_problem: this.addVisitorsData.value.v_problem,
      v_date: this.addVisitorsData.value.v_date,
      completion_date: this.addVisitorsData.value.completion_date
    };

    const { v_name, v_contactno, v_address, v_problem, v_date, completion_date } = adminData;

    if (!v_name || !v_contactno || !v_address || !v_problem || !v_date || !completion_date) {
      this.toastr.error('Please fill all the fields.', 'Error');
      return;
    }

    const formData: FormData = new FormData();
    for (const [key, value] of Object.entries(adminData)) {
      formData.append(key, value)
    }

    this.service.postVisitorData(formData).subscribe((res) => {
      console.log(res)
      if (res === 'success') {
        this.toastr.success('Successfully added', 'Success');
      } else {
        this.toastr.success('Successfully added', 'Success');
      }
    });

    this.addVisitorsData.reset();
    if (this.adminType == 'Superadmin') {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

  close() {
    if (this.adminType == 'Superadmin') {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/dashboard']);
    }
  }
}
