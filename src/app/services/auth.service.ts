import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private fbAuth: AngularFireAuth) {}

  async login(mail: string, pass: string) {
    try {
      return await this.fbAuth.signInWithEmailAndPassword(mail, pass);
    } catch (error) {
      console.log('Error', error);
      return null;
    }
  }

  async register(mail: string, pass: string) {
    try {
      return await this.fbAuth.createUserWithEmailAndPassword(mail, pass);
    } catch (error) {
      console.log('Error', error);
      return null;
    }
  }

  getUserLogged() {
    return this.fbAuth.authState;
  }

  logout() {
    sessionStorage.setItem('email', '');
    sessionStorage.setItem('token', '');
    this.fbAuth.signOut();
  }
}
