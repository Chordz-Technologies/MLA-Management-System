import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Admin_model } from 'src/app/models';
import { ServiceService } from 'src/app/shared/service.service';

@Component({
  selector: 'app-add-newadmin',
  templateUrl: './add-newadmin.component.html',
  styleUrls: ['./add-newadmin.component.scss']
})
export class AddNewadminComponent implements OnInit {
  addAdminForm!: FormGroup;
  Admin_model: Admin_model = new Admin_model();
  AdminId!: number; // Variable to store the ID of the product to be edited
  hidePassword: boolean = false;
  hideCPassword: boolean = false;

  showsubmit!: boolean;
  adminImageData: File | null | undefined;

  constructor(private service: ServiceService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.addAdminForm = this.fb.group({
      id: [''],
      adminUsername: this.fb.control('', [Validators.required]),
      adminname: this.fb.control('', [Validators.required]),
      contactno: this.fb.control('', [
        Validators.required,
        Validators.minLength(10),
        Validators.pattern('[0-9]*'),
      ]),
      passWord: this.fb.control('', [Validators.required]),
      conPassword: this.fb.control('', [Validators.required]),
      smessage: this.fb.control('', [
        Validators.required,
        Validators.maxLength(150),
      ]),
      options: this.fb.control('', [Validators.required]),
      // pracharImage: ['']
    })

    this.addAdminForm.reset()
    this.showsubmit = true;
  }

  // for image upload
  onImageSelected(image: any) {
    const fileList: FileList = image.target.files;
    if (fileList.length > 0) {
      this.adminImageData = fileList[0];
    } else {
      this.adminImageData = null; // Reset file if no file is selected
    }

  }

  postSuperAdminDetails() {
    const adminData = {
      a_username: this.addAdminForm.value.adminUsername,
      a_name: this.addAdminForm.value.adminname,
      a_contactno: this.addAdminForm.value.contactno,
      a_password: this.addAdminForm.value.passWord,
      a_confirmpassword: this.addAdminForm.value.conPassword,
      a_message: this.addAdminForm.value.smessage,
      a_typesuperadmin: 0,
      a_typesupersuperadmin: 0,
      a_typeadmin: this.addAdminForm.value.options === '1' ? 1 : 0,
      a_files: this.adminImageData,
    };

    const { a_username, a_name, a_contactno, a_password, a_confirmpassword, a_message, a_typeadmin, a_files } = adminData;

    if (!a_username || !a_name || !a_contactno || !a_password || !a_confirmpassword || !a_typeadmin || !a_files || !a_message) {
      this.toastr.error('Please fill all the fields.', 'Error');
      return;
    }

    if (a_password !== a_confirmpassword) {
      this.toastr.error('Password and Confirm Password do not match.', 'Error');
      return;
    }

    if (a_message.length > 150) {
      this.toastr.error('Message cannot be more than 150 characters.', 'Error');
      return;
    }

    const formData: FormData = new FormData();
    for (const [key, value] of Object.entries(adminData)) {
      formData.append(key, value)
    }

    this.service.SuperAdminPost(formData).subscribe((res) => {
      console.log(res)
      if (res === 'success') {
        this.toastr.success('Admin Data Added Successfully!', 'Success');
      } else {
        this.toastr.success('Admin Data Added Successfully!', 'Success');
      }
    });

    // Reset the form after submitting
    this.addAdminForm.reset();
    this.router.navigate(['/superadmin-dashboard'])
  }

  togglePasswordVisibility(field: string) {
    if (field === 'passWord') {
      this.hidePassword = !this.hidePassword;
    } else if (field === 'conPassword') {
      this.hideCPassword = !this.hideCPassword;
    }
  }

  get adminUsername(): FormControl {
    return this.addAdminForm.get('adminUsername') as FormControl;
  }
  get adminFullname(): FormControl {
    return this.addAdminForm.get('adminname') as FormControl;
  }
  get Password(): FormControl {
    return this.addAdminForm.get('passWord') as FormControl;
  }
  get ConfirmPassword(): FormControl {
    return this.addAdminForm.get('conPassword') as FormControl;
  }
  get Adminmessage(): FormControl {
    return this.addAdminForm.get('smessage') as FormControl;
  }
  get ContactNo(): FormControl {
    return this.addAdminForm.get('contactno') as FormControl;
  }

}
