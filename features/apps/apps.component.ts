import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { CommonModule, NgClass, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { PlatformStore } from '@gmtre-devkit';
import { FirstNamePipe } from '@gmtre-pipes';


@Component({
  selector: 'apps',
  templateUrl: './apps.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'apps',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    FirstNamePipe,
    MatIconModule,
    NgIf,
    MatTooltipModule,
    NgFor,
    NgClass,
    NgTemplateOutlet,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
  ],
})
export class AppsComponent
  implements OnInit, OnDestroy
{
  @ViewChild('shortcutsOrigin') private _shortcutsOrigin!: MatButton;
  @ViewChild('shortcutsPanel') private _shortcutsPanel!: TemplateRef<any>;
  ps:any=inject(PlatformStore)

  mode: 'view' | 'modify' | 'add' | 'edit' = 'view';
  private _overlayRef!: OverlayRef;

  /**
   * Constructor
   */
  constructor(
    private _overlay: Overlay,
    private _viewContainerRef: ViewContainerRef
  ) {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Initialize the form



    // Get the shortcuts
    // this._appsService.shortcuts$
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe((shortcuts: App[]) => {
    //     // Load the shortcuts
    //     this.shortcuts = shortcuts;

    //     // Mark for check
    //     this._changeDetectorRef.markForCheck();
    //   });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {

    // Dispose the overlay
    if (this._overlayRef) {
      this._overlayRef.dispose();
    }
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------
  protected get apps(){
    return this.ps.getPlatformApps()
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Open the shortcuts panel
   */
  openPanel(): void {
    // Return if the shortcuts panel or its origin is not defined
    if (!this._shortcutsPanel || !this._shortcutsOrigin) {
      return;
    }

    // Make sure to start in 'view' mode
    this.mode = 'view';

    // Create the overlay if it doesn't exist
    if (!this._overlayRef) {
      this._createOverlay();
    }

    // Attach the portal to the overlay
    this._overlayRef.attach(
      new TemplatePortal(this._shortcutsPanel, this._viewContainerRef)
    );
  }

  /**
   * Close the shortcuts panel
   */
  closePanel(): void {
    this._overlayRef.detach();
  }

  /**
   * Change the mode
   */
  changeMode(mode: 'view' | 'modify' | 'add' | 'edit'): void {
    // Change the mode
    this.mode = mode;
  }



  /**
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Create the overlay
   */
  private _createOverlay(): void {
    // Create the overlay
    this._overlayRef = this._overlay.create({
      hasBackdrop: true,
      backdropClass: 'gmtre-backdrop-on-mobile',
      scrollStrategy: this._overlay.scrollStrategies.block(),
      positionStrategy: this._overlay
        .position()
        .flexibleConnectedTo(this._shortcutsOrigin._elementRef.nativeElement)
        .withLockedPosition(true)
        .withPush(true)
        .withPositions([
          {
            originX: 'start',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'top',
          },
          {
            originX: 'start',
            originY: 'top',
            overlayX: 'start',
            overlayY: 'bottom',
          },
          {
            originX: 'end',
            originY: 'bottom',
            overlayX: 'end',
            overlayY: 'top',
          },
          {
            originX: 'end',
            originY: 'top',
            overlayX: 'end',
            overlayY: 'bottom',
          },
        ]),
    });

    // Detach the overlay from the portal on backdrop click
    this._overlayRef.backdropClick().subscribe(() => {
      this._overlayRef.detach();
    });
  }
}
