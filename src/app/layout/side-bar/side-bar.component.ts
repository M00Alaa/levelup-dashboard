import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {
  isLogin: boolean = false

  logOut() {
    this._AuthService.logOut()
  }
  constructor(
    router: Router,
    private _AuthService: AuthService
  ) {

    this._AuthService.currentUser.subscribe({
      next: () => {
        if (this._AuthService.currentUser.getValue() != null) {
          this.isLogin = true
        }
        else {
          this.isLogin = false
        }
      }
    })
  }

}
