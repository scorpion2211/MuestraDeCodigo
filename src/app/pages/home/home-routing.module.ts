import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from 'src/app/guards/login.guard';
import { AuthService } from 'src/app/services/auth.service';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    //canActivate: [LoginGuard], se quita guarda dado que permitira arma el carrito sin estar logueado, pero no permitirá generar la orden sin él
    children: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthService],
})
export class HomeRoutingModule {}
