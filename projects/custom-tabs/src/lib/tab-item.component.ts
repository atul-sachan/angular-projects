import { Component, OnInit, Input, ContentChild } from '@angular/core';
import { TabBodyComponent } from './tab-body.component';
import { TabLabelComponent } from './tab-label.component';

@Component({
  selector: 'as-tab-item',
  template: '<ng-content></ng-content>',
  styles: [
  ]
})
export class TabItemComponent implements OnInit {

  @Input()
  label: string;

  @Input()
  isActive: boolean;

  @ContentChild(TabBodyComponent)
  bodyComponent: TabBodyComponent;

  @ContentChild(TabLabelComponent)
  labelComponent: TabLabelComponent;

  constructor() {}

  ngOnInit(): void {}

}
