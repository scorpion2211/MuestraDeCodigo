import { AfterContentInit, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { FinishedLoadingAction, LoadingAction } from './state/loading.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterContentInit {
  showLoading = false;

  constructor(private store: Store<{ loading: boolean }>) {
    this.store.select('loading').subscribe((state) => {
      this.showLoading = state;
    });

    const loading = new LoadingAction();
    this.store.dispatch(loading);
  }

  ngAfterContentInit() {
    const loading = new FinishedLoadingAction();
    this.store.dispatch(loading);
  }
}
