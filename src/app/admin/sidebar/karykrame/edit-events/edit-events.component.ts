import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/shared/service.service';

@Component({
  selector: 'app-edit-events',
  templateUrl: './edit-events.component.html',
  styleUrls: ['./edit-events.component.scss']
})
export class EditEventsComponent implements OnInit {
  eventsForm!: FormGroup;
  eventImage: File | null | undefined;
  public selectedEventId!: number;

  constructor(private service: ServiceService, private fb: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.eventsForm = this.fb.group({
      k_name: [''],
      k_contactno: [''],
      k_date: [''],
      k_time: [''],
      k_location: [''],
      k_subject: [''],
      comments: ['']
    });

    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.selectedEventId = +id;
        this.loadEventDetails(this.selectedEventId);
      }
    });
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
    const eventDate = this.eventsForm.get('k_date')?.value;
    const eventTime = this.eventsForm.get('k_time')?.value;

    console.log('Event Date:', eventDate);
    console.log('Event Time:', eventTime);

    if (!eventDate || !eventTime) {
      this.toastr.error('कृपया तारीख आणि वेळ प्रविष्ट करा.', 'Error');
      return;
    }

    const eventName = this.eventsForm.get('k_name')?.value || 'New Event';
    const location = this.eventsForm.get('k_location')?.value || '';
    const details = this.eventsForm.get('k_subject')?.value || '';

    const startDateTime = new Date(`${eventDate}T${eventTime}:00`);
    const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000);

    const startDateTimeUTC = startDateTime.toISOString().replace(/-|:|\.\d+/g, '');
    const endDateTimeUTC = endDateTime.toISOString().replace(/-|:|\.\d+/g, '');

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      eventName
    )}&dates=${startDateTimeUTC}/${endDateTimeUTC}&details=${encodeURIComponent(
      details
    )}&location=${encodeURIComponent(location)}`;

    console.log('Opening URL:', googleCalendarUrl);
    window.open(googleCalendarUrl, '_blank');
  }

  loadEventDetails(eventId: number): void {
    this.service.getEventDataById(eventId).subscribe(
      (response) => {
        const details = response.karyakram_details;

        // Ensure date and time are correctly formatted
        const formattedDate = this.formatDate(details.k_date);
        const formattedTime = this.formatTime(details.k_time);

        this.eventsForm.patchValue({
          ...details,
          k_date: formattedDate,
          k_time: formattedTime
        });

        this.selectedEventId = eventId;
      },
      () => {
        this.toastr.error('Failed to load event details.');
      }
    );
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // yyyy-MM-dd
  }

  formatTime(timeString: string): string {
    if (timeString.includes(':')) return timeString.substring(0, 5); // HH:mm
    return '00:00'; // fallback
  }

  update() {
    if (this.eventsForm.invalid) {
      this.toastr.error('Please fill all required fields.');
      return;
    }

    const formData = new FormData();
    formData.append('k_name', this.eventsForm.get('k_name')?.value);
    formData.append('k_contactno', this.eventsForm.get('k_contactno')?.value);
    formData.append('k_date', this.eventsForm.get('k_date')?.value);
    formData.append('k_time', this.eventsForm.get('k_time')?.value);
    formData.append('k_location', this.eventsForm.get('k_location')?.value);
    formData.append('k_subject', this.eventsForm.get('k_subject')?.value);
    formData.append('comments', this.eventsForm.get('comments')?.value);

    if (this.eventImage) {
      formData.append('k_photos', this.eventImage);
    }

    this.service.updateEventData(this.selectedEventId, formData).subscribe(
      (res) => {
        this.toastr.success('Event updated successfully!');
        this.router.navigate(['/सर्व-कार्यक्रम']); // Navigate back to list or another screen
      },
      (err) => {
        this.toastr.error('Failed to update event.');
      }
    );
  }
}
