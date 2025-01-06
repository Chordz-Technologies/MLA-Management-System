import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from 'src/app/shared/service.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-imp-person',
  templateUrl: './add-imp-person.component.html',
  styleUrls: ['./add-imp-person.component.scss']
})
export class AddImpPersonComponent implements OnInit {

  personForm!: FormGroup;
  selectedId: number | null = null;

  constructor(private fb: FormBuilder, private service: ServiceService, private toastr: ToastrService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // Initialize the form
    this.personForm = this.fb.group({
      p_name: [''],
      p_contact: [''],
      p_subject: [''],
      p_time: [''],
      p_area: ['']
    });

    // Check if editing an existing disease
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.selectedId = +id;
        this.loadPersonDetails(this.selectedId);
      }
    });
  }

  submit(): void {
    if (this.personForm.valid) {
      const personData = this.personForm.value;
      this.service.postPersonData(personData).subscribe(
        () => {
          this.toastr.success('Important person added successfully!');
          this.resetForm();
          this.router.navigate(['/all-important-persons']);
        },
        () => {
          this.toastr.error('Failed to add important person.');
        }
      );
    } else {
      this.toastr.warning('Please fill out the form correctly.');
    }
  }

  update(): void {
    if (this.personForm.valid && this.selectedId) {
      const personData = this.personForm.value;
      this.service.updatePersonData(this.selectedId, personData).subscribe(
        () => {
          this.toastr.success('Important person updated successfully!');
          this.resetForm();
          this.router.navigate(['/all-important-persons']);
        },
        () => {
          this.toastr.error('Failed to update important person.');
        }
      );
    } else {
      this.toastr.warning('Please select a person to update.');
    }
  }

  // delete(): void {
  //   if (this.selectedId) {
  //     this.service.deletePersonData(this.selectedId).subscribe(
  //       () => {
  //         this.toastr.success('Important person deleted successfully!');
  //         this.resetForm();
  //         this.router.navigate(['/all-important-persons']);
  //       },
  //       () => {
  //         this.toastr.error('Failed to delete person.');
  //       }
  //     );
  //   }
  // }

  loadPersonDetails(personId: number): void {
    this.service.getPersonDataById(personId).subscribe(
      (response) => {
        const personDetails = response.person_details;

        // Convert the date and time to the correct format for datetime-local input
        let localDateTime = ''; // Default to blank

        if (personDetails.p_time) {
          const dateObj = new Date(personDetails.p_time);

          // Extract local date and time components
          const year = dateObj.getFullYear();
          const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are 0-based
          const day = String(dateObj.getDate()).padStart(2, '0');
          const hours = String(dateObj.getHours()).padStart(2, '0');
          const minutes = String(dateObj.getMinutes()).padStart(2, '0');

          // Format to YYYY-MM-DDTHH:MM
          localDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
        }

        // Update p_time in the personDetails object
        personDetails.p_time = localDateTime;

        this.personForm.patchValue(personDetails);
        this.selectedId = personId;
      },
      () => {
        this.toastr.error('Failed to load important person details.');
      }
    );
  }

  resetForm(): void {
    this.personForm.reset();
    this.selectedId = null;
  }
}
