import { Component, HostBinding, ContentChild, AfterContentInit } from '@angular/core';

import { SidebarService } from './sidebar.service';
import { IuiSidebarComponent } from './sidebar.component';
import { IuiSidebarSiblingComponent } from './sidebar-sibling.component';

@Component({
    selector: 'iui-sidebar-container',
    template: `<ng-content></ng-content>`,
    styles: [`
        :host { 
            display:block; 
            position:relative; 
            height:100%; 
            overflow-x:hidden;
        }`
    ]
})
export class IuiSidebarContainerComponent implements AfterContentInit {

    /** 
    @HostBinding("class.sidebar-container")
    private classes = true;
    */

    @ContentChild(IuiSidebarComponent)
    public sidebar: IuiSidebarComponent;

    @ContentChild(IuiSidebarSiblingComponent)
    public sibling: IuiSidebarSiblingComponent;

    constructor() {
    }

    ngAfterContentInit() {
        if (!this.sidebar) {
            throw new Error("You must include a <iui-sidebar> element within the container.");
        }

        if (!this.sibling) {
            throw new Error("You must include a <iui-sidebar-sibling> element within the container.");
        }

        this.sibling.service = this.sidebar.service;
    }

}