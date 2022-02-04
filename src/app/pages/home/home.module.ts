import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconsProviderModule } from 'src/app/icons-provider.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomeRoutingModule } from './home-routing.module';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

import { AngularFireModule } from '@angular/fire/compat';

import { AuthService } from 'src/app/services/auth.service';

import { HomeComponent } from './home.component';

import { environment } from 'src/environments/environment';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzButtonModule,
    NzAlertModule,
    NzListModule,
    NzCollapseModule,
    NzNotificationModule,
    NzRadioModule,
    NzToolTipModule,
    NzCheckboxModule,
    RouterModule,
    HttpClientModule,
    HomeRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [AuthService, FirestoreService],
})
export class HomeModule {}
