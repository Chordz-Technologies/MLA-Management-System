import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/shared/service.service';

@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.scss']
})
export class EventsPageComponent implements OnInit {
  eventsForm!: FormGroup;
  eventImage: File | null | undefined;
  adminType: string | null = localStorage.getItem('adminType');

  constructor(private service: ServiceService, private fb: FormBuilder, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.eventsForm = this.fb.group({
      k_date: this.fb.control(''),
      k_time: this.fb.control(''),
      k_location: this.fb.control(''),
      comments: this.fb.control('')
    })
  }

  onImageSelected(image: any) {
    const fileList: FileList = image.target.files;
    if (fileList.length > 0) {
      this.eventImage = fileList[0];
    } else {
      this.eventImage = null; // Reset file if no file is selected
    }
  }

  postEventsData() {
    const eventsData = {
      k_date: this.eventsForm.value.k_date,
      k_time: this.eventsForm.value.k_time,
      k_location: this.eventsForm.value.k_location,
      k_photos: this.eventImage,
      comments: this.eventsForm.value.comments
    };

    const { k_date, k_time, k_location } = eventsData;

    if (!k_date || !k_time || !k_location) {
      this.toastr.error('Please fill all the fields.', 'Error');
      return;
    }

    const formData: FormData = new FormData();
    for (const [key, value] of Object.entries(eventsData)) {
      formData.append(key, value)
    }

    this.service.postEventsData(formData).subscribe((res) => {
      if (res === 'success') {
        this.toastr.success('Successfully added', 'Success');
      } else {
        this.toastr.success('Successfully added', 'Success');
      }
    });

    this.eventsForm.reset();
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
