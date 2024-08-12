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
  adminType: string | null = localStorage.getItem('adminType');

  constructor(private service: ServiceService, private fb: FormBuilder, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.aavakjavakForm = this.fb.group({
      a_inward: this.fb.control(''),
      a_outward: this.fb.control(''),
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
      a_outward: this.aavakjavakForm.value.a_outward,
      a_date: this.aavakjavakForm.value.a_date,
      a_photos: this.aavakjavakImage,
    };

    // const { a_inward, a_outward, a_date, a_photos } = aavakjavakData;

    // if (!a_inward || !a_outward || !a_date || !a_photos) {
    //   this.toastr.error('Please fill all the fields.', 'Error');
    //   return;
    // }

    const formData: FormData = new FormData();
    for (const [key, value] of Object.entries(aavakjavakData)) {
      formData.append(key, value)
    }

    this.service.postAavakJavakData(formData).subscribe((res) => {
      if (res === 'success') {
        this.toastr.success('Successfully added', 'Success');
      } else {
        this.toastr.success('Successfully added', 'Success');
      }
    });

    this.aavakjavakForm.reset();
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
