import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/shared/service.service';

@Component({
  selector: 'app-nivedane',
  templateUrl: './nivedane.component.html',
  styleUrls: ['./nivedane.component.scss']
})
export class NivedaneComponent implements OnInit {
  nivedaneForm!: FormGroup;
  nivedaneImage: File | null | undefined;

  constructor(private service: ServiceService, private fb: FormBuilder, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.nivedaneForm = this.fb.group({
      n_date: this.fb.control(''),
      n_label: this.fb.control('')
      // Add form controls here if needed
    });
  }

  onImageSelected(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.nivedaneImage = fileList[0];
    } else {
      this.nivedaneImage = null; // Reset file if no file is selected
    }
  }

  postNivedaneData() {
    const nivedaneData = {
      n_label: this.nivedaneForm.value.n_label,
      n_date: this.nivedaneForm.value.n_date,
      n_photos: this.nivedaneImage,
    };

    const { n_label, n_date, n_photos } = nivedaneData;

    if (!n_label || !n_date || !n_photos) {
      this.toastr.error('Please fill all the fields.', 'Error');
      return;
    }

    const formData: FormData = new FormData();
    for (const [key, value] of Object.entries(nivedaneData)) {
      formData.append(key, value)
    }
    this.service.postNivedaneData(formData).subscribe(
      (res) => {
        if (res === 'success') {
          this.toastr.success('Yojaneche Arja Data Added Successfully!', 'Success');
        } else {
          this.toastr.success('Yojaneche Arja Data Added Successfully!', 'Success');
          this.router.navigate(['/सर्व-योजनेचे-अर्ज'], { state: { newyojanaData: nivedaneData } });
          this.nivedaneForm.reset();
        }
      });
  }
}

