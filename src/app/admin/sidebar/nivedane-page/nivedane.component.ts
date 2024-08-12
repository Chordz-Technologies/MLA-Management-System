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
  adminType: string | null = localStorage.getItem('adminType');

  constructor(private service: ServiceService, private fb: FormBuilder, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.nivedaneForm = this.fb.group({
      n_date: this.fb.control(''),
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
      n_date: this.nivedaneForm.value.n_date,
      n_photos: this.nivedaneImage,
    };

    const { n_date, n_photos } = nivedaneData;

    if (!n_date || !n_photos ) {
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
          this.toastr.success('Successfully added', 'Success');
        } else {
          this.toastr.success('Successfully added', 'Success');
        }
      });

    // Reset the form after submitting
    this.nivedaneForm.reset();
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

