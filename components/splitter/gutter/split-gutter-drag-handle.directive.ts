import { Directive, OnInit, OnDestroy, Inject, ElementRef } from '@angular/core'
import { SplitGutterDirective } from './split-gutter.directive'
import { GUTTER_NUM_TOKEN } from './gutter-num-token'

@Directive({
  selector: '[gmtreSplitGutterDragHandle]',
})
export class SplitGutterDragHandleDirective implements OnInit, OnDestroy {
  constructor(
    @Inject(GUTTER_NUM_TOKEN) private gutterNum: number,
    private elementRef: ElementRef<HTMLElement>,
    private gutterDir: SplitGutterDirective,
  ) {}

  ngOnInit(): void {
    this.gutterDir.addToMap(this.gutterDir.gutterToHandleElementMap, this.gutterNum, this.elementRef)
  }

  ngOnDestroy(): void {
    this.gutterDir.removedFromMap(this.gutterDir.gutterToHandleElementMap, this.gutterNum, this.elementRef)
  }
}
