import { NgModule } from '@angular/core';

import { IuiSidebarComponent } from './sidebar.component';
import { IuiSidebarSiblingComponent } from './sidebar-sibling.component';
import { IuiSidebarContainerComponent } from './sidebar-container.component';

@NgModule({
    providers: [
    ],
    declarations: [
        IuiSidebarComponent,
        IuiSidebarSiblingComponent,
        IuiSidebarContainerComponent,
    ],
    exports: [
        IuiSidebarComponent,
        IuiSidebarSiblingComponent,
        IuiSidebarContainerComponent,
    ]
})
export class IuiSidebarModule {

}