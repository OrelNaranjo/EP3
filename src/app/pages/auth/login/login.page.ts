import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  wrongCredentialsSubscription!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });

    this.wrongCredentialsSubscription = this.authService.wrongCredentials.subscribe(() => {
      this.presentToast('Las credenciales son incorrectas');
    });
  }

  ngOnDestroy() {
    if (this.wrongCredentialsSubscription) {
      this.wrongCredentialsSubscription.unsubscribe();
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: 'danger',
      position: 'top'
    });
    toast.present();
  }

  login() {
    if (this.loginForm.valid) {
      const { email, password, rememberMe } = this.loginForm.value;
      this.authService.login(email, password, rememberMe)
        .then(() => this.router.navigate(['/home']))
    }
  }
  
  forgotPassword() {
    // Implementar la lógica para el olvido de contraseña aquí
  }
}