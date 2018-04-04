import { Component, HostBinding, Input, Output, OnInit, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';

import { SidebarService } from './sidebar.service';

@Component({
    selector: 'iui-sidebar',
    template: `<ng-content></ng-content>`,
    styleUrls: ['./sidebar.component.less']
})
export class IuiSidebarComponent implements OnInit, AfterViewInit {

    @HostBinding("class.sidebar")
    private classes = true;

    private _service: SidebarService

    public get service() {
        return this._service;
    }

    @Input()
    @HostBinding("class.fixed")
    get isFixed() {
        return this.service.isFixed;
    }

    set isFixed(value: boolean) {
        this.service.isFixed = value;
    }

    @Input()
    get direction() {
        return this.service.direction;
    }

    set direction(value: string) {
        this.setClass(this.service.direction, false);
        this.service.direction = value;
        this.setClass(this.service.direction, true);
    }

    @HostBinding("class.visible")
    @Input()
    public get isVisible(): boolean {
        return this.service.isVisible;
    }

    public set isVisible(isVisible: boolean) {
        setTimeout(() => {
            this.service.setVisible(isVisible)
        });
    }

    @Output()
    public get isVisibleChange() {
        return this.service.isVisibleChange;
    }

    @HostBinding("class.animating")
    get isAnimating() {
        return this.service.isAnimating;
    }

    @Input()
    get isResponsive() {
        return this.service.isResponsive;
    }

    set isResponsive(value: boolean) {
        this.service.isResponsive = value;
        this.setFixed();
    }

    constructor(
        private element: ElementRef,
        private renderer: Renderer2
    ) {
        this._service = new SidebarService();
        this.direction = 'left';
    }

    private setClass(className: string, isAdd: boolean = true): void {
        if (isAdd) {
            this.renderer.addClass(this.element.nativeElement, className);
        } else {
            this.renderer.removeClass(this.element.nativeElement, className);
        }
    }

    ngOnInit() {
        this.onVisibleChange();
    }

    ngAfterViewInit() {
        let ele = this.element.nativeElement;
        this.service.width = ele.offsetWidth;
        this.service.height = ele.offsetHeight;
    }

    private onVisibleChange() {
        this.service.isVisibleChange.subscribe(() => {
            this.setFixed();
        });
    }

    private setFixed() {
        if (this.isResponsive) {
            this.isFixed = document.body.clientWidth > 1144;
        }
    }

    open() {
        this.service.setVisible(true);
    }

    close() {
        this.service.setVisible(false);
    }

    toggle() {
        this.service.toggleVisible();
    }

}