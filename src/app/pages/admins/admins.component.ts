import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss']
})
export class AdminsComponent {

  admins: any[] = []

  addAdmin: FormGroup = new FormGroup({
    Username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(16)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    phone: new FormControl(null, [Validators.required]),
  })

  submitForm(data: FormGroup) {

    console.log(data.value);

    this._AuthService.addAdmin(data.value).subscribe({
      next: (res) => {
        console.log(res);
      }
    })


  }


  getAllAdmins() {
    this._AuthService.getAllAdmins().subscribe({
      next: (res) => {
        this.admins = res.data;

        console.log(this.admins);
      },
      error: (err) => {
        console.log('getAllCategories' + err);

      }
    })
  }

  deleteAdmin(data: any) {
    this._AuthService.deleteAdmin(data.id).subscribe((res) => {

      if (res.succes = "false") {
        console.log(res);
        alert(res.message);

      }
      else {
        console.log(res);
        alert("admin deleted successful")
        this.getAllAdmins()
      }

    })
  }

  constructor(
    private _AuthService: AuthService, private _Router: Router
  ) {
    this.getAllAdmins()
  }

}
