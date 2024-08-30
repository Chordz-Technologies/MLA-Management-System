import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/shared/service.service';

@Component({
  selector: 'app-katran-page',
  templateUrl: './katran-page.component.html',
  styleUrls: ['./katran-page.component.scss']
})
export class KatranPageComponent implements OnInit {
  paperCuttingForm!: FormGroup;
  paperImage: File | null | undefined;
  adminType: string | null = localStorage.getItem('adminType');

  constructor(private service: ServiceService, private fb: FormBuilder, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.paperCuttingForm = this.fb.group({
      k_date: this.fb.control(''),
      k_paper: this.fb.control('')
    })
  }

  onImageSelected(paper: any) {

    const fileList: FileList = paper.target.files;
    if (fileList.length > 0) {
      this.paperImage = fileList[0];
    } else {
      this.paperImage = null; // Reset file if no file is selected
    }
  }

  postPaperCuttings() {
    const paperCuttingData = {
      k_date: this.paperCuttingForm.value.k_date,
      k_paper: this.paperCuttingForm.value.k_paper,
      k_image: this.paperImage,
    };

    const { k_date, k_paper, k_image } = paperCuttingData;

    if (!k_date || !k_paper || !k_image) {
      this.toastr.error('Please fill all the fields.', 'Error');
      return;
    }

    const formData: FormData = new FormData();
    for (const [key, value] of Object.entries(paperCuttingData)) {
      formData.append(key, value)
    }

    this.service.postPaperCuttings(formData).subscribe((res) => {
      if (res === 'success') {
        this.toastr.success('Successfully added', 'Success');
      } else {
        this.toastr.success('Successfully added', 'Success');
      }
    });

    this.paperCuttingForm.reset();
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
