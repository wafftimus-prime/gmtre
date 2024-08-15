import { CdkScrollable } from '@angular/cdk/scrolling';
import {
  CommonModule,
  I18nPluralPipe,
  NgClass,
  NgFor,
  NgIf,
  PercentPipe,
} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { UiKitBaseClass } from '../uikit/base';
import { GmtreFindByKeyPipe } from '@gmtre-pipes';

@Component({
  selector: 'hub-main',
  styleUrl: './hub.component.scss',
  templateUrl: './hub.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    CdkScrollable,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    NgFor,
    MatIconModule,
    MatInputModule,
    MatSlideToggleModule,
    NgIf,
    NgClass,
    MatTooltipModule,
    MatProgressBarModule,
    MatButtonModule,
    RouterLink,
    GmtreFindByKeyPipe,
    PercentPipe,
    I18nPluralPipe,
  ],
})
export class GmtreHubComponent
  extends UiKitBaseClass
  implements OnInit, OnDestroy {
  categories: any[] = [];

  /**
   * Constructor
   */
  constructor() {
    super();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void { }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index: number, item: any): any {
    //   return item.id || index;
  }
}
