import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';

import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';

import { IconsProviderModule } from '../icons-provider.module';
import { CardProdComponent } from './card-prod/card-prod.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HeaderComponent, CardProdComponent],
  imports: [
    CommonModule,
    RouterModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzBadgeModule,
    NzCollapseModule,
    NzToolTipModule,
    NzCardModule,
    NzButtonModule,
    NzModalModule,
    NzListModule,
  ],
  exports: [HeaderComponent, CardProdComponent],
})
export class ComponentsModule {}
