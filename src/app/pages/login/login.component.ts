import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(16)]),
  })

  submitForm(data: FormGroup) {
    this._AuthService.login(data.value).subscribe({
      next: (res) => {
        if (res.message === 'success') {
          localStorage.setItem('token', res.date)
          this._AuthService.saveCurrentUser()
          // this.toastr.success('logged in success', '');
          console.log('logged in success');

          this._Router.navigate(['/'])
        }
        else {
          // this.toastr.error(res, 'error message!');

          alert(res);

        }

        console.log(res);

      }
    })


  }

  constructor(
    private _AuthService: AuthService, private _Router: Router, /*private toastr: ToastrService*/
  ) { }

}
