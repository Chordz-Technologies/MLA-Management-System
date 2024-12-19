import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/shared/service.service';

@Component({
  selector: 'app-aavak-page',
  templateUrl: './aavak-page.component.html',
  styleUrls: ['./aavak-page.component.scss']
})
export class AavakPageComponent implements OnInit {
  aavakForm!: FormGroup;
  aavakImage: File | null | undefined;

  constructor(private service: ServiceService, private fb: FormBuilder, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.aavakForm = this.fb.group({
      a_inward: this.fb.control(''),
      a_subject: this.fb.control(''),
      a_date: this.fb.control(''),
      a_comment: this.fb.control(''),
    });
  }

  onImageSelected(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.aavakImage = fileList[0];
    } else {
      this.aavakImage = null; // Reset file if no file is selected
    }
  }

  postAavakData() {
    const aavakData = {
      a_inward: this.aavakForm.value.a_inward,
      a_subject: this.aavakForm.value.a_subject,
      a_date: this.aavakForm.value.a_date,
      a_comment: this.aavakForm.value.a_comment,
      a_photos: this.aavakForm,
    };

    const { a_photos } = aavakData;

    if (!a_photos) {
      this.toastr.error('Please fill all the fields.', 'Error');
      return;
    }

    const formData: FormData = new FormData();
    for (const [key, value] of Object.entries(aavakData)) {
      formData.append(key, value)
    }

    this.service.postAavakData(formData).subscribe((res) => {
      if (res === 'success') {
        this.toastr.success('Aavak Data Added Successfully!', 'Success');
      } else {
        this.toastr.success('Aavak Data Added Successfully!', 'Success');
        this.router.navigate(['/सर्व-आवक'], { state: { newaavakData: aavakData } });
        this.aavakForm.reset();
      }
    });
  }
}