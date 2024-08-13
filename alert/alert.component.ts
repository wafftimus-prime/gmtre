import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { gmtreAnimations } from '@gmtre-core';
import { GmtreUtilsService } from '@gmtre-services';
import { GmtreAlertService } from './alert.service';
import { GmtreAlertAppearance, GmtreAlertType } from './alert.types';
import { filter, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'gmtre-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: gmtreAnimations,
  exportAs: 'gmtreAlert',
  standalone: true,
  imports: [NgIf, MatIconModule, MatButtonModule],
})
export class GmtreAlertComponent implements OnChanges, OnInit, OnDestroy {
  /* eslint-disable @typescript-eslint/naming-convention */
  static ngAcceptInputType_dismissible: BooleanInput;
  static ngAcceptInputType_dismissed: BooleanInput;
  static ngAcceptInputType_showIcon: BooleanInput;
  /* eslint-enable @typescript-eslint/naming-convention */

  @Input() appearance: GmtreAlertAppearance = 'soft';
  @Input() dismissed: boolean = false;
  @Input() dismissible: boolean = false;
  @Input() name: string = this._gmtreUtilsService.randomId();
  @Input() showIcon: boolean = true;
  @Input() type: GmtreAlertType = 'primary';
  @Output() readonly dismissedChanged: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _gmtreAlertService: GmtreAlertService,
    private _gmtreUtilsService: GmtreUtilsService
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Host binding for component classes
   */
  @HostBinding('class') get classList(): any {
    /* eslint-disable @typescript-eslint/naming-convention */
    return {
      'gmtre-alert-appearance-border': this.appearance === 'border',
      'gmtre-alert-appearance-fill': this.appearance === 'fill',
      'gmtre-alert-appearance-outline': this.appearance === 'outline',
      'gmtre-alert-appearance-soft': this.appearance === 'soft',
      'gmtre-alert-dismissed': this.dismissed,
      'gmtre-alert-dismissible': this.dismissible,
      'gmtre-alert-show-icon': this.showIcon,
      'gmtre-alert-type-primary': this.type === 'primary',
      'gmtre-alert-type-accent': this.type === 'accent',
      'gmtre-alert-type-warn': this.type === 'warn',
      'gmtre-alert-type-basic': this.type === 'basic',
      'gmtre-alert-type-info': this.type === 'info',
      'gmtre-alert-type-success': this.type === 'success',
      'gmtre-alert-type-warning': this.type === 'warning',
      'gmtre-alert-type-error': this.type === 'error',
    };
    /* eslint-enable @typescript-eslint/naming-convention */
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On changes
   *
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    // Dismissed
    if ('dismissed' in changes) {
      // Coerce the value to a boolean
      this.dismissed = coerceBooleanProperty(changes['dismissed'].currentValue);

      // Dismiss/show the alert
      this._toggleDismiss(this.dismissed);
    }

    // Dismissible
    if ('dismissible' in changes) {
      // Coerce the value to a boolean
      this.dismissible = coerceBooleanProperty(
        changes['dismissible'].currentValue
      );
    }

    // Show icon
    if ('showIcon' in changes) {
      // Coerce the value to a boolean
      this.showIcon = coerceBooleanProperty(changes['showIcon'].currentValue);
    }
  }

  /**
   * On init
   */
  ngOnInit(): void {
    // Subscribe to the dismiss calls
    this._gmtreAlertService.onDismiss
      .pipe(
        filter((name) => this.name === name),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe(() => {
        // Dismiss the alert
        this.dismiss();
      });

    // Subscribe to the show calls
    this._gmtreAlertService.onShow
      .pipe(
        filter((name) => this.name === name),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe(() => {
        // Show the alert
        this.show();
      });
  }

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
   * Dismiss the alert
   */
  dismiss(): void {
    // Return if the alert is already dismissed
    if (this.dismissed) {
      return;
    }

    // Dismiss the alert
    this._toggleDismiss(true);
  }

  /**
   * Show the dismissed alert
   */
  show(): void {
    // Return if the alert is already showing
    if (!this.dismissed) {
      return;
    }

    // Show the alert
    this._toggleDismiss(false);
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Dismiss/show the alert
   *
   * @param dismissed
   * @private
   */
  private _toggleDismiss(dismissed: boolean): void {
    // Return if the alert is not dismissible
    if (!this.dismissible) {
      return;
    }

    // Set the dismissed
    this.dismissed = dismissed;

    // Execute the observable
    this.dismissedChanged.next(this.dismissed);

    // Notify the change detector
    this._changeDetectorRef.markForCheck();
  }
}
