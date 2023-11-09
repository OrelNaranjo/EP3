import { Injectable } from '@angular/core';
import { getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence, browserLocalPersistence, createUserWithEmailAndPassword } from "firebase/auth";
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { getFirestore, doc, getDocs, getDoc, collection } from "firebase/firestore";
import { User } from '../../models/user'



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = {} as User;
  public wrongCredentials = new Subject<void>();
  constructor(private router: Router) {  }

  async login(email: string, password: string, rememberMe: boolean) {
    const auth = getAuth();
    try {
      await setPersistence(auth, rememberMe ? browserLocalPersistence: browserSessionPersistence );
      await signInWithEmailAndPassword(auth, email, password);
      this.getCurrentUserData(getAuth().currentUser?.uid as string);
      console.log(getAuth().currentUser?.uid as string);
      this.router.navigateByUrl('home');
    } catch (error: any) {
      if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found' || error.code === 'auth/invalid-login-credentials') {
        this.wrongCredentials.next();
      }
    }
  }

  async logout() {
    try {
      await getAuth().signOut();
      localStorage.removeItem('userData');
      this.router.navigateByUrl('login');
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  
  async getCurrentUserData(uid: string) {
    const db = getFirestore();
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
      const userData = docSnap.data();
      localStorage.setItem('userData', JSON.stringify(userData));
      console.log("Document data:", docSnap.data());
    } else {
      console.log("No such document!");
    }
  }

  async signup(email: string, password: string, user: User) {
    const currentUserData = JSON.parse(localStorage.getItem('userData') || '{}');
    if (currentUserData.role !== 'admin') {
      throw new Error('Only admins can create new users');
    }

    const auth = getAuth();
    const { user: newUser } = await createUserWithEmailAndPassword(auth, email, password);
    user.uid = newUser.uid;
    await this.getCurrentUserData(user.uid);
  }
  
  async listUsers() {
    const currentUserData = JSON.parse(localStorage.getItem('userData') || '{}');
    if (currentUserData.role !== 'admin') {
      throw new Error('Only admins can list users');
    }
  
    const db = getFirestore();
    const querySnapshot = await getDocs(collection(db, "users"));
    return querySnapshot.docs.map(doc => doc.data());
  }
}