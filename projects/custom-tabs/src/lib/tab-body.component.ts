import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'as-tab-body',
  template: '<ng-template><ng-content></ng-content></ng-template>',
  styles: [
  ]
})
export class TabBodyComponent implements OnInit {
  @ViewChild(TemplateRef)
  bodyContent: TemplateRef<any>;
  constructor() { }

  ngOnInit(): void {
  }

}
