import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  implements OnInit {

  isLogged = false;
  currentUser: User | null = null ;

  constructor(private authService: AuthService) { }

  ngOnInit() {  }

  itemPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Perfil',
      url: '/perfil',
      icon: 'person'
    },
  ];

  logout() {
    this.authService.logout();
  }
}
