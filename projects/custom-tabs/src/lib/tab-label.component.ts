import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'as-tab-label',
  template: '<ng-template><ng-content></ng-content></ng-template>',
  styles: [
  ]
})
export class TabLabelComponent implements OnInit {
  @ViewChild(TemplateRef)
  labelContent: TemplateRef<any>;
  constructor() { }

  ngOnInit(): void {
  }

}
