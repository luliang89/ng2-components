import { Component, HostListener, HostBinding, Input, Output, OnInit, AfterViewInit, ElementRef, Renderer2, Host } from '@angular/core';

import { SidebarService } from './sidebar.service';

@Component({
    selector: 'iui-sidebar-sibling',
    template: `<ng-content></ng-content>`,
    styleUrls: ['./sidebar-sibling.component.less']
})
export class IuiSidebarSiblingComponent implements OnInit {

    @HostBinding("class.sidebar-sibling")
    private classes = true;

    private _service: SidebarService

    public get service() {
        return this._service;
    }

    public set service(service: SidebarService) {
        this._service = service;
        this.onVisibleChange();
    }

    @HostBinding("class.dimmed")
    isDimmedWhenVisible = true;

    @HostBinding("class.fixed")
    public get isFixed(){
        return this._service.isFixed;
    }
    
    @HostBinding("class.visible")
    public get isVisible(){
        return this._service.isVisible;
    }

    constructor(
        private element: ElementRef,
        private renderer: Renderer2
    ) { }

    ngOnInit() {

    }

    private onVisibleChange() {
        this.service.isVisibleChange.subscribe(visible => {
            if (this.service.isFixed) {
                let value: string;
                let direction = this.service.direction;
                if (direction === 'right' || direction === 'left') {
                    value = visible ? this.service.width + 'px' : '0';
                }
                //this.setStyle('margin-' + direction, visible ? `calc(${value} - 1rem)` : value);
                this.setStyle('margin-' + direction, value);
            }
        })
    }

    private setStyle(style: string, value: any) {
        this.renderer.setStyle(this.element.nativeElement, style, value);
    }

    @HostListener("click", ["$event"])
    public onClick(event: MouseEvent): void {
        if (!this.service.isFixed && this.service.isVisible && !this.service.wasJustOpened) {
            //console.log(this.service.isVisible);
            this.service.setVisible(false);
            event.preventDefault();
            event.stopPropagation();
        }
    }

}