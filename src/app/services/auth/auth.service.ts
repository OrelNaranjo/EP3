import { Injectable } from '@angular/core';
import { getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence, browserLocalPersistence } from "firebase/auth";
import { Router } from '@angular/router';
import { IUser } from 'src/app/interfaces/auth/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) {  }

  async login(user: IUser) {
    const auth = getAuth();
    try {
      await setPersistence(auth, user.rememberMe ? browserLocalPersistence: browserSessionPersistence );
      await signInWithEmailAndPassword(auth, user.email, user.password);
      this.getCurrentUserData(user.email);
      this.router.navigateByUrl('home');
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async logout() {
    try {
      await getAuth().signOut();
      this.router.navigateByUrl('login');
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  
  getCurrentUserData(email: string) {

  }
}