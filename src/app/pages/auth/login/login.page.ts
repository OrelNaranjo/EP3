import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { Credentials } from 'src/app/interfaces/auth/credentials';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credentials: Credentials = { email: '', password: '' };

  constructor(
    private authService: AuthService,
    private router: Router
    ) { };

  login() {
    this.authService.login(this.credentials).then(res => {
      console.log(res);
      this.router.navigateByUrl('home');
    })
  }

  forgotPassword() {
    this.router.navigateByUrl('forgot-password');
  }

  ngOnInit(): void {
  }


}
