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
  applicationImg: File | null | undefined;

  constructor(private service: ServiceService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.addVisitorsData = this.fb.group({
      id: [''],
      v_name: this.fb.control('', [Validators.required]),
      v_contactno: this.fb.control('', [Validators.required]),
      v_email: this.fb.control('', [Validators.required]),
      v_address: this.fb.control('', [Validators.required]),
      v_area: this.fb.control('', [Validators.required]),
      v_arja: this.fb.control('', [Validators.required]),
      v_problem: this.fb.control('', [Validators.required]),
      v_date: this.fb.control('', [Validators.required]),
      completion_date: this.fb.control('', [Validators.required]),
      v_comment: this.fb.control('', [Validators.required]),
      v_status: this.fb.control('', [Validators.required]),
      office: this.fb.control('', [Validators.required]),
    })
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
      v_name: this.addVisitorsData.value.v_name,
      v_contactno: this.addVisitorsData.value.v_contactno,
      v_email: this.addVisitorsData.value.v_email,
      v_address: this.addVisitorsData.value.v_address,
      v_area: this.addVisitorsData.value.v_area,
      v_problem: this.addVisitorsData.value.v_problem,
      v_date: this.addVisitorsData.value.v_date,
      completion_date: this.addVisitorsData.value.completion_date,
      v_comment: this.addVisitorsData.value.v_comment,
      v_status: this.addVisitorsData.value.v_status,
      office: this.addVisitorsData.value.office,
    };

    const { v_name, v_contactno, v_address, v_area, v_problem, v_date, completion_date, v_status, office } = VisitorData;

    if (!v_name || !v_contactno || !v_address || !v_area || !v_problem || !v_date || !completion_date || !v_status || !office) {
      this.toastr.error('Please fill all the fields.', 'Error');
      return;
    }

    const formData: FormData = new FormData();
    // Append only non-null values to the FormData
    for (const [key, value] of Object.entries(VisitorData)) {
      formData.append(key, value as string);
    }

    // Check if the image (arja file) exists and append it to the FormData if present
    if (this.applicationImg) {
      formData.append('v_arja', this.applicationImg);
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
}
