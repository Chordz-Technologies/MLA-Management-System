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
  showupdate!: boolean;
  showdelete!: boolean;
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
    // Get the ID of the product from the route parameters
    this.route.params.subscribe(val => {
      this.AdminId = val['id']; // Assuming the parameter name is 'id'
      // Fetch the product details using the ID and populate the form
      this.service.getSuperAdminDetailsById(this.AdminId).subscribe({
        next: (res) => {
          this.onedit(res.admin_details);
          console.log('Super Admin Details:', res.admin_details);
        }, error: (err) => {
          console.log(err)
        }
      });
      // return this.AdminId;
    });

    this.addAdminForm.reset()
    this.showsubmit = true;
    this.showupdate = false;
    this.showdelete = false;
  }

  onedit(superAdmin: Admin_model) {
    this.showsubmit = false;
    this.showupdate = true;
    this.showdelete = true;
    this.addAdminForm.setValue({
      // id: superAdmin.a_id,
      adminUsername: superAdmin.a_username,
      adminname: superAdmin.a_name,
      contactno: superAdmin.a_contactno,
      // passWord: superAdmin.a_name,
      // conPassword: superAdmin.a_name,
      smessage: superAdmin.a_message,
      // pracharImage: superAdmin.a_image
    })


  }
  // for image upload
  onImageSelected(product: any) {

    const fileList: FileList = product.target.files;
    if (fileList.length > 0) {
      this.adminImageData = fileList[0];
      console.log('Selected image:', this.adminImageData);
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
      a_typeadmin: this.addAdminForm.value.options === '1' ? 1 : 0,
      a_files: this.adminImageData,
    };

    const { a_username, a_name, a_contactno, a_password, a_confirmpassword, a_message, a_typeadmin } = adminData;

    if (!a_username || !a_name || !a_contactno || !a_password || !a_confirmpassword || !a_typeadmin || !a_message) {
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

    // const postData = { ...adminData };

    console.log("Before submitting the data is", adminData);
    // let formData2 = new FormData();
    const formData: FormData = new FormData();
    for (const [key, value] of Object.entries(adminData)) {
      console.log(key, value);

      formData.append(key, value)
    }
    console.log("the data is", formData);

    this.service.SuperAdminPost(formData).subscribe((res) => {
      console.log(res)
      if (res === 'success') {
        this.toastr.success('Successfully added', 'Success');
      } else {
        this.toastr.success('Successfully added', 'Success');
      }
    });

    // Reset the form after submitting
    this.addAdminForm.reset();
    this.router.navigate(['/admin'])
  }



  deleteProduct(): void {
    this.service.deleteSuperAdminById(this.AdminId).subscribe(
      () => {
        // console.log('Product deleted successfully');
        this.toastr.success('Admin deleted successfully!', 'Success');
        // Redirect the user to a different page after successful deletion
        this.router.navigate(['/admin']);
      },
      error => {
        console.error('Error deleting product:', error);
      }
    );
  }

  updateproduct() {
    this.Admin_model.a_name = this.addAdminForm.value.adminUsername;
    this.Admin_model.a_message = this.addAdminForm.value.smessage;
    this.Admin_model.a_files = this.addAdminForm.value.pracharImage;

    this.service.updateAdmminById(this.AdminId, this.Admin_model).subscribe(res => {
      console.log(res)
      this.toastr.success('Product Updated successfully!', 'Success');
      // alert('updated')
      this.addAdminForm.reset();
      this.router.navigate(['/admin'])
    })
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
