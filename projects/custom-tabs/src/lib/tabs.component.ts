import { Component, OnInit, AfterContentInit, AfterContentChecked, ContentChildren, QueryList } from '@angular/core';
import { TabItemComponent } from './tab-item.component';
import { Observable, Subscription } from 'rxjs';
import { startWith, map, take, tap, delay } from 'rxjs/operators';


@Component({
  selector: 'as-tabs',
  template: `
  <ul class="nav nav-tabs nav-pills with-arrow flex-column flex-sm-row text-center">
    <li class="nav-item flex-sm-fill" (click)="selectTab(item)"  *ngFor="let item of tabItems$ | async">
    <a class="nav-link text-uppercase font-weight-bold mr-sm-3 rounded-0 border" [class.active]="activeTab === item">
      <ng-container *ngIf="item.labelComponent">
        <ng-container *ngTemplateOutlet="item.labelComponent.labelContent">
        </ng-container>
      </ng-container>

      <ng-container *ngIf="!item.labelComponent">
        {{ item.label }}
      </ng-container></a>
    </li>
  </ul>
  <div class="tab-content">
    <ng-container > <!-- *ngIf="activeTab && activeTab.bodyComponent" -->
      <ng-container *ngTemplateOutlet="activeTab.bodyComponent.bodyContent">
      </ng-container>
    </ng-container>
  </div>
`,
  styles: [
    `
    @media (min-width: 576px) {
    .rounded-nav {
      border-radius: 50rem !important;
    }
  }
  
  @media (min-width: 576px) {
    .rounded-nav .nav-link {
      border-radius: 50rem !important;
    }
  }
  
  /* With arrow tabs */
  
  .with-arrow .nav-link.active {
    position: relative;
  }
  
  .with-arrow .nav-link.active::after {
    content: '';
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid #2b90d9;
    position: absolute;
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%);
    display: block;
  }
  
  /* lined tabs */
  
  .lined .nav-link {
    border: none;
    border-bottom: 3px solid transparent;
  }
  
  .lined .nav-link:hover {
    border: none;
    border-bottom: 3px solid transparent;
  }
  
  .lined .nav-link.active {
    background: none;
    color: #555;
    border-color: #2b90d9;
  }
  `,
  ],
})
export class TabsComponent implements AfterContentInit, AfterContentChecked {
  @ContentChildren(TabItemComponent)
  tabs: QueryList<TabItemComponent>;

  tabItems$: Observable<TabItemComponent[]>;

  activeTab: TabItemComponent;


  constructor() { }

  ngAfterContentInit(): void {
    this.tabItems$ = this.tabs.changes
      .pipe(startWith(''))
      .pipe(delay(0))
      .pipe(map(() => this.tabs.toArray()));
  }

  // tslint:disable-next-line: typedef
  ngAfterContentChecked() {
    if (!this.activeTab) {
      Promise.resolve().then(() => {
        this.activeTab = this.tabs.first;
      });
    }
  }

  selectTab(tabItem: TabItemComponent): any {
    if (this.activeTab === tabItem) {
      return;
    }

    if (this.activeTab) {
      this.activeTab.isActive = false;

    }

    this.activeTab = tabItem;
    tabItem.isActive = true;
  }
}
