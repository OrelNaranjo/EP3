import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, authState } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Credentials } from 'src/app/interfaces/auth/credentials';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth, private router: Router) { }

  async login(credentials: Credentials) {
    try {
      await signInWithEmailAndPassword(this.auth, credentials.email, credentials.password);
      this.router.navigateByUrl('home');
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async logout() {
    try {
      await this.auth.signOut();
      this.router.navigateByUrl('');
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
