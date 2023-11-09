import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private authService: AuthService, private router: Router) {}

  Logout(){
    this.authService.logout();
    this.router.navigateByUrl('');
  }

  welcomeMessage!: string;

  ngOnInit() {
    const userDataItem = localStorage.getItem('userData');
    if (userDataItem) {
      const userData = JSON.parse(userDataItem);
      if (userData) {
        this.welcomeMessage = `¡Bienvenido, ${userData.first_name} ${userData.last_name}!`;
      }
    }
  }
}