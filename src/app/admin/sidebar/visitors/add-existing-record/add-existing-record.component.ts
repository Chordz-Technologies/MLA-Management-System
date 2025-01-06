import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from 'src/app/shared/service.service';
import { ToastrService } from 'ngx-toastr';
import { Visitor_model } from 'src/app/models';

@Component({
  selector: 'app-add-existing-record',
  templateUrl: './add-existing-record.component.html',
  styleUrls: ['./add-existing-record.component.scss']
})
export class AddExistingRecordComponent implements OnInit {
  editVisitorsForm!: FormGroup;
  public visitorId!: number;
  applicationImg: File | null | undefined;

  constructor(private fb: FormBuilder, private service: ServiceService, private activatedRoute: ActivatedRoute, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.editVisitorsForm = this.fb.group({
      v_id: [''],
      v_name: [''],
      v_contactno: [''],
      v_birthdate: [''],
      v_votingno: [''],
      v_address: [''],
      v_area: [''],
      v_problem: [''],
      v_date: [''],
      completion_date: [''],
      v_comment: [''],
      v_status: [''],
      office: ['']
    });

    this.activatedRoute.params.subscribe(val => {
      this.visitorId = val['v_id'];
      this.service.getVisitorDataById(this.visitorId)
        .subscribe({
          next: (res) => {
            this.fillFormToUpdate(res.visitor_details);
          },
          error: (err) => {
            console.log(err);
          }
        })
    })
  }

  onImageSelected(image: any) {
    const fileList: FileList = image.target.files;
    if (fileList.length > 0) {
      this.applicationImg = fileList[0];
    } else {
      this.applicationImg = null;
    }
  }

  fillFormToUpdate(visitor: Visitor_model) {
    this.editVisitorsForm.setValue({
      v_id: visitor.v_id,
      v_name: visitor.v_name,
      v_contactno: visitor.v_contactno,
      v_birthdate: visitor.v_birthdate,
      v_votingno: visitor.v_votingno,
      v_address: visitor.v_address,
      v_area: visitor.v_area,
      v_problem: visitor.v_problem,
      v_date: visitor.v_date,
      completion_date: visitor.completion_date,
      v_comment: visitor.v_comment,
      v_status: visitor.v_status,
      office: visitor.office
    });
  }

  add() {
    const VisitorData = {
      v_name: this.editVisitorsForm.value.v_name || '',
      v_contactno: this.editVisitorsForm.value.v_contactno || '',
      v_birthdate: this.editVisitorsForm.value.v_birthdate || '',
      v_votingno: this.editVisitorsForm.value.v_votingno || '',
      v_address: this.editVisitorsForm.value.v_address || '',
      v_area: this.editVisitorsForm.value.v_area || '',
      v_problem: this.editVisitorsForm.value.v_problem || '',
      v_date: this.editVisitorsForm.value.v_date || '',
      completion_date: this.editVisitorsForm.value.completion_date || '',
      v_comment: this.editVisitorsForm.value.v_comment || '',
      v_status: this.editVisitorsForm.value.v_status || '',
      office: this.editVisitorsForm.value.office || '',
      ...(this.applicationImg ? { v_arja: this.applicationImg } : {})      // aphotos: this.artistForm.value.artist_photos || '',
    };

    const formData: FormData = new FormData();
    for (const [key, value] of Object.entries(VisitorData)) {
      formData.append(key, value)
    }

    this.service.postVisitorData(formData).subscribe((res) => {
      if (res === 'success') {
        this.toastr.success('Visitor Data Added Successfully!', 'Success');
      } else {
        this.toastr.success('Visitor Data Added Successfully!', 'Success');
        this.router.navigate(['/all-records'], { state: { newVisitor: VisitorData } });
        this.editVisitorsForm.reset();
      }
    });
  }
}
