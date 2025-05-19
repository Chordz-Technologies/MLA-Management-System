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

  constructor(private service: ServiceService, private fb: FormBuilder, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.eventsForm = this.fb.group({
      k_name: this.fb.control(''),
      k_contactno: this.fb.control(''),
      k_date: this.fb.control(''),
      k_time: this.fb.control(''),
      k_location: this.fb.control(''),
      k_subject: this.fb.control(''),
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

  scheduleEvent() {
    const eventName = this.eventsForm.get('k_name')?.value || 'New Event';
    const eventDate = this.eventsForm.get('k_date')?.value;
    const eventTime = this.eventsForm.get('k_time')?.value;
    const location = this.eventsForm.get('k_location')?.value || '';
    const details = this.eventsForm.get('k_subject')?.value || '';

    if (!eventDate || !eventTime) {
      this.toastr.error('कृपया तारीख आणि वेळ प्रविष्ट करा.', 'Error');
      return;
    }

    const startDateTime = new Date(`${eventDate}T${eventTime}:00`);
    const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000); // Adds 1 hour

    const startDateTimeUTC = startDateTime.toISOString().replace(/-|:|\.\d+/g, '');
    const endDateTimeUTC = endDateTime.toISOString().replace(/-|:|\.\d+/g, '');

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      eventName
    )}&dates=${startDateTimeUTC}/${endDateTimeUTC}&details=${encodeURIComponent(
      details
    )}&location=${encodeURIComponent(location)}`;

    window.open(googleCalendarUrl, '_blank');
  }

  postEventsData() {
    const eventsData = {
      k_name: this.eventsForm.value.k_name || '',
      k_contactno: this.eventsForm.value.k_contactno || '',
      k_date: this.eventsForm.value.k_date || '',
      k_time: this.eventsForm.value.k_time || '',
      k_location: this.eventsForm.value.k_location || '',
      k_subject: this.eventsForm.value.k_subject || '',
      comments: this.eventsForm.value.comments || '',
    };

    const formData: FormData = new FormData();
    // Append only non-null values to the FormData
    for (const [key, value] of Object.entries(eventsData)) {
      formData.append(key, value as string);
    }

    // Check if the image (arja file) exists and append it to the FormData if present
    if (this.eventImage) {
      formData.append('k_photos', this.eventImage || '');
    }

    this.service.postEventsData(formData).subscribe((res) => {
      if (res === 'success') {
        this.toastr.success('Events Data Added Successfully!', 'Success');
      } else {
        this.toastr.success('Events Data Added Successfully!', 'Success');
        this.router.navigate(['/सर्व-कार्यक्रम'], { state: { newEventsData: eventsData } });
        this.eventsForm.reset();
      }
    });
  }
}
