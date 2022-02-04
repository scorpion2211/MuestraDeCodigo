import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import {
  FinishedLoadingAction,
  LoadingAction,
} from 'src/app/state/loading.action';
import { IS_LOGIN, LoginAction } from 'src/app/state/user.actions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  registro = false;
  formLogin: FormGroup;
  constructor(
    private fBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private store: Store<{ cartCount: number; stateLogged: boolean }>
  ) {
    this.formLogin = this.fBuilder.group({
      email: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          //Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      password2: [''],
    });
  }

  ngOnInit(): void {}

  get passInvalid() {
    return !(this.formLogin.value.password === this.formLogin.value.password2);
  }

  SingIn() {
    const { email, password } = this.formLogin.value;
    const loading = new LoadingAction();
    this.store.dispatch(loading);
    this.auth.login(email, password).then((res: any) => {
      if (res) {
        sessionStorage.setItem('email', email);
        sessionStorage.setItem('token', res.user.multiFactor.user.accessToken);
        this.formLogin.reset();
        this.registro = false;
        const action = new LoginAction();
        this.store.dispatch(action);
        this.router.navigate(['/home']);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'DATOS INCORRECTOS',
          text: 'El correo o contraseña no son validos',
        });
      }

      const loading = new FinishedLoadingAction();
      this.store.dispatch(loading);
    });
  }

  SingUp() {
    const { email, password } = this.formLogin.value;
    if (this.passInvalid) {
      Swal.fire({ icon: 'warning', text: 'Las claves no coinciden' });
    } else {
      const loading = new LoadingAction();
      this.store.dispatch(loading);
      this.auth.register(email, password).then((res) => {
        if (res) {
          Swal.fire({ icon: 'success', title: 'Correo Registado' });
          this.formLogin.reset();
          this.registro = false;
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'El correo ya existe o no es válido',
          });
        }

        const loading = new FinishedLoadingAction();
        this.store.dispatch(loading);
      });
    }
  }
}
