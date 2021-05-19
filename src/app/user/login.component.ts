import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AuthService } from './auth.service';

import * as fromUser from '../user/state/user.reducer';
import * as userActions from '../user/state/user.actions';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  pageTitle = 'Log In';

  maskUserName: boolean;

  constructor(private authService: AuthService, private router: Router, private  store: Store<fromUser.UserState>) { }

  ngOnInit(): void {

    this.store.select(fromUser.getMaskUserName).subscribe((users) => {
      this.maskUserName = users;
    } )
  }

  cancel(): void {
    this.router.navigate(['welcome']);
  }

  checkChanged(event): void {
    // this.maskUserName = !this.maskUserName;
    const val = event.target.checked;
    this.store.dispatch(new userActions.MaskUserName(val));
  }

  login(loginForm: NgForm): void {
    if (loginForm && loginForm.valid) {
      const userName = loginForm.form.value.userName;
      const password = loginForm.form.value.password;
      this.authService.login(userName, password);

      if (this.authService.redirectUrl) {
        this.router.navigateByUrl(this.authService.redirectUrl);
      } else {
        this.router.navigate(['/products']);
      }
    }
  }
}
