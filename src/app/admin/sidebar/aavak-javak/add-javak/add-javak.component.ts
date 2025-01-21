import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  selectedJavakId: number | null = null;

  constructor(private service: ServiceService, private fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.javakForm = this.fb.group({
      j_number: this.fb.control(''),
      j_outward: this.fb.control(''),
      j_contactno: this.fb.control(''),
      j_subject: this.fb.control(''),
      j_date: this.fb.control(''),
      j_comment: this.fb.control(''),
    });

    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.selectedJavakId = +id;
        this.loadJavakDetails(this.selectedJavakId);
      }
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
      j_number: this.javakForm.value.j_number || '',
      j_outward: this.javakForm.value.j_outward || '',
      j_contactno: this.javakForm.value.j_contactno || '',
      j_subject: this.javakForm.value.j_subject || '',
      j_date: this.javakForm.value.j_date || '',
      j_comment: this.javakForm.value.j_comment || '',
    };

    const formData: FormData = new FormData();
    for (const [key, value] of Object.entries(javakData)) {
      formData.append(key, value)
    }

    if (this.javakImage) {
      formData.append('j_photos', this.javakImage || '');
    }

    this.service.postJavakData(formData).subscribe((res) => {
      if (res === 'success') {
        this.toastr.success('Javak Data Added Successfully!', 'Success');
      } else {
        this.toastr.success('Javak Data Added Successfully!', 'Success');
        this.router.navigate(['/सर्व-जावक'], { state: { newjavakData: javakData } });
        this.resetForm();
      }
    });
  }

  update(): void {
    if (this.javakForm.valid && this.selectedJavakId) {
      const javakData = {
        ...this.javakForm.value, // Get form values
      };

      const formData: FormData = new FormData();
      for (const [key, value] of Object.entries(javakData)) {
        formData.append(key, value as string || ''); // Explicitly cast value to string
      }

      // Append the existing or new image to the FormData
      if (this.javakImage) {
        formData.append('j_photos', this.javakImage); // Add new image
      }

      this.service.updateJavakData(this.selectedJavakId, formData).subscribe(
        () => {
          this.toastr.success('Javak Data Updated Successfully!');
          this.resetForm();
          this.router.navigate(['/सर्व-जावक']);
        },
        () => {
          this.toastr.error('Failed to update javak data.');
        }
      );
    } else {
      this.toastr.warning('Please select a javak data to update.');
    }
  }

  loadJavakDetails(javakId: number): void {
    this.service.getJavakDataById(javakId).subscribe(
      (response) => {
        this.javakForm.patchValue(response.javak_details);
        this.selectedJavakId = javakId;
      },
      () => {
        this.toastr.error('Failed to load javak details.');
      }
    );
  }

  resetForm(): void {
    this.javakForm.reset();
    this.selectedJavakId = null;
  }
}
