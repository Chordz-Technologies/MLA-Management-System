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
  isOtherSelected = false;
  paperImage: File | null | undefined;
  tvMedia: File | null | undefined;

  constructor(private service: ServiceService, private fb: FormBuilder, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.paperCuttingForm = this.fb.group({
      k_date: this.fb.control(''),
      k_paper: this.fb.control(''),
      k_label: this.fb.control(''),
      k_otherpaper: this.fb.control(''),
      k_important: this.fb.control(''),
      k_medialink: this.fb.control(''),
      k_newslink: this.fb.control(''),
    })
  }

  onPaperChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    if (selectedValue === 'इतर') {
      this.isOtherSelected = true;
      this.paperCuttingForm.get('k_otherpaper')?.enable();
    } else {
      this.isOtherSelected = false;
      this.paperCuttingForm.get('k_otherpaper')?.disable();
      this.paperCuttingForm.get('k_otherpaper')?.setValue(''); // Clear the field
    }
  }

  onImageSelected(paper: any) {
    const fileList: FileList = paper.target.files;
    if (fileList.length > 0) {
      this.paperImage = fileList[0];
    } else {
      this.paperImage = null;
    }
  }

  onFileSelected(media: any) {
    const fileList: FileList = media.target.files;
    if (fileList.length > 0) {
      this.tvMedia = fileList[0];
    } else {
      this.tvMedia = null;
    }
  }

  postPaperCuttings() {
    const k_important_value = this.paperCuttingForm.value.k_important ? 1 : 0;
    const paperCuttingData = {
      k_date: this.paperCuttingForm.value.k_date || '',
      k_paper: this.paperCuttingForm.value.k_paper || '',
      k_label: this.paperCuttingForm.value.k_label || '',
      // k_image: this.paperImage,
      k_otherpaper: this.paperCuttingForm.value.k_otherpaper || '',
      k_important: k_important_value,
      k_medialink: this.paperCuttingForm.value.k_medialink || '',
      k_newslink: this.paperCuttingForm.value.k_newslink || '',
      // k_file: this.tvMedia,
    };

    // const { k_date, k_paper, k_label, k_image } = paperCuttingData;

    // if (!k_date || !k_paper || !k_label || !k_image) {
    //   this.toastr.error('Please fill all the fields.', 'Error');
    //   return;
    // }

    const formData: FormData = new FormData();

    for (const [key, value] of Object.entries(paperCuttingData)) {
      if (key !== 'k_image' && key !== 'k_file') {
        formData.append(key, value as string);
      }
    }

    // Conditionally append the image if it's selected
    if (this.paperImage) {
      formData.append('k_image', this.paperImage || '');
    }

    // Conditionally append the media file if it's selected
    if (this.tvMedia) {
      formData.append('k_file', this.tvMedia || '');
    }

    this.service.postPaperCuttings(formData).subscribe((res) => {
      if (res === 'success') {
        this.toastr.success('Katrane Data Added Successfully!', 'Success');
      } else {
        this.toastr.success('Katrane Data Added Successfully!', 'Success');
        this.router.navigate(['/सर्व-कात्रणे'], { state: { newpaperCuttingData: paperCuttingData } });
        this.paperCuttingForm.reset();
      }
    });
  }
}
