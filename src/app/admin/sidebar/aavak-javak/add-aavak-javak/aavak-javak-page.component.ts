import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/shared/service.service';

@Component({
  selector: 'app-aavak-javak-page',
  templateUrl: './aavak-javak-page.component.html',
  styleUrls: ['./aavak-javak-page.component.scss']
})
export class AavakJavakPageComponent implements OnInit {
  aavakjavakForm!: FormGroup;
  aavakjavakImage: File | null | undefined;

  constructor(private service: ServiceService, private fb: FormBuilder, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.aavakjavakForm = this.fb.group({
      a_inward: this.fb.control(''),
      inward_label: this.fb.control(''),
      a_outward: this.fb.control(''),
      outward_label: this.fb.control(''),
      a_date: this.fb.control(''),
    });
  }

  onImageSelected(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.aavakjavakImage = fileList[0];
    } else {
      this.aavakjavakImage = null; // Reset file if no file is selected
    }
  }

  postAavakJavakData() {
    const aavakjavakData = {
      a_inward: this.aavakjavakForm.value.a_inward,
      inward_label: this.aavakjavakForm.value.inward_label,
      a_outward: this.aavakjavakForm.value.a_outward,
      outward_label: this.aavakjavakForm.value.outward_label,
      a_date: this.aavakjavakForm.value.a_date,
      a_photos: this.aavakjavakImage,
    };

    const { a_photos } = aavakjavakData;

    if (!a_photos) {
      this.toastr.error('Please fill all the fields.', 'Error');
      return;
    }

    const formData: FormData = new FormData();
    for (const [key, value] of Object.entries(aavakjavakData)) {
      formData.append(key, value)
    }

    this.service.postAavakJavakData(formData).subscribe((res) => {
      if (res === 'success') {
        this.toastr.success('Aavak Javak Data Added Successfully!', 'Success');
      } else {
        this.toastr.success('Aavak Javak Data Added Successfully!', 'Success');
        this.router.navigate(['/सर्व-आवक/जावक'], { state: { newaavakjavakData: aavakjavakData } });
        this.aavakjavakForm.reset();
      }
    });
  }
}