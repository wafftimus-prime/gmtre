import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GmtreCaptureComponent } from './capture.component';

@NgModule({
  declarations: [GmtreCaptureComponent],
  imports: [
  ],
  exports: [GmtreCaptureComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GmtreCaptureModule { }
