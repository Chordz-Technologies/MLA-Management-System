import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from 'src/app/shared/service.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-contacts',
  templateUrl: './add-contacts.component.html',
  styleUrls: ['./add-contacts.component.scss']
})
export class AddContactsComponent implements OnInit {

  contactForm!: FormGroup;
  selectedContactId: number | null = null;

  constructor(private fb: FormBuilder, private service: ServiceService, private toastr: ToastrService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // Initialize the form
    this.contactForm = this.fb.group({
      name: [''],
      designation:[''],
      phone_number: ['']
    });

    // Check if editing an existing disease
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.selectedContactId = +id;
        this.loadContactDetails(this.selectedContactId);
      }
    });
  }

  submitContact(): void {
    if (this.contactForm.valid) {
      const contactData = this.contactForm.value;
      this.service.postContactData(contactData).subscribe(
        () => {
          this.toastr.success('Contact added successfully!');
          this.resetForm();
          this.router.navigate(['/महत्वाचे-संपर्क']);
        },
        () => {
          this.toastr.error('Failed to add contact.');
        }
      );
    } else {
      this.toastr.warning('Please fill out the form correctly.');
    }
  }

  update(): void {
    if (this.contactForm.valid && this.selectedContactId) {
      const contactData = this.contactForm.value;
      this.service.updateContactData(this.selectedContactId, contactData).subscribe(
        () => {
          this.toastr.success('Contact updated successfully!');
          this.resetForm();
          this.router.navigate(['/महत्वाचे-संपर्क']);
        },
        () => {
          this.toastr.error('Failed to update contact.');
        }
      );
    } else {
      this.toastr.warning('Please select a contact to update.');
    }
  }

  delete(): void {
    if (this.selectedContactId) {
      this.service.deleteContactData(this.selectedContactId).subscribe(
        () => {
          this.toastr.success('Contact deleted successfully!');
          this.resetForm();
          this.router.navigate(['/महत्वाचे-संपर्क']);
        },
        () => {
          this.toastr.error('Failed to delete contact.');
        }
      );
    }
  }

  loadContactDetails(contactId: number): void {
    this.service.getContactDataById(contactId).subscribe(
      (response) => {
        this.contactForm.patchValue(response.data);
        this.selectedContactId = contactId;
      },
      () => {
        this.toastr.error('Failed to load contact details.');
      }
    );
  }

  resetForm(): void {
    this.contactForm.reset();
    this.selectedContactId = null;
  }
}
