import { NgModule } from '@angular/core';
import { TabLabelComponent } from './tab-label.component';
import { TabsComponent } from './tabs.component';
import { TabItemComponent } from './tab-item.component';
import { TabBodyComponent } from './tab-body.component';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [TabLabelComponent, TabsComponent, TabItemComponent, TabBodyComponent],
  imports: [
    CommonModule
  ],
  exports: [TabsComponent, TabLabelComponent, TabsComponent, TabItemComponent, TabBodyComponent]
})
export class CustomTabsModule { }
