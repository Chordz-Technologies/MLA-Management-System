import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/shared/service.service';

@Component({
  selector: 'app-add-javak',
  templateUrl: './add-javak.component.html',
  styleUrls: ['./add-javak.component.scss']
})
export class AddJavakComponent implements OnInit {
  javakForm!: FormGroup;
  javakImage: File | null | undefined;

  constructor(private service: ServiceService, private fb: FormBuilder, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.javakForm = this.fb.group({
      j_outward: this.fb.control(''),
      j_subject: this.fb.control(''),
      j_date: this.fb.control(''),
      j_comment: this.fb.control(''),
    });
  }

  onImageSelected(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.javakImage = fileList[0];
    } else {
      this.javakImage = null; // Reset file if no file is selected
    }
  }

  postJavakData() {
    const javakData = {
      j_outward: this.javakForm.value.j_outward,
      j_subject: this.javakForm.value.j_subject,
      j_date: this.javakForm.value.j_date,
      j_comment: this.javakForm.value.j_comment,
      j_photos: this.javakForm,
    };

    const { j_photos } = javakData;

    if (!j_photos) {
      this.toastr.error('Please fill all the fields.', 'Error');
      return;
    }

    const formData: FormData = new FormData();
    for (const [key, value] of Object.entries(javakData)) {
      formData.append(key, value)
    }

    this.service.postJavakData(formData).subscribe((res) => {
      if (res === 'success') {
        this.toastr.success('Javak Data Added Successfully!', 'Success');
      } else {
        this.toastr.success('Javak Data Added Successfully!', 'Success');
        this.router.navigate(['/सर्व-जावक'], { state: { newjavakData: javakData } });
        this.javakForm.reset();
      }
    });
  }
}
