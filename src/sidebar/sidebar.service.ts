import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class SidebarService {

    height: number

    width: number

    direction: string

    /**
     * 是否是固定的
     */
    isFixed: boolean

    isVisibleChange = new EventEmitter<boolean>()

    isVisible = false

    isResponsive = false

    wasJustOpened = false

    isAnimating = false

    private isAnimatingTimout

    constructor() {
    }

    setVisible(value: boolean) {
        if (value === this.isVisible) {
            return;
        }
        this.wasJustOpened = true;
        this.isAnimating = true;

        this.isVisible = value;
        this.isVisibleChange.emit(value);

        setTimeout(() => this.wasJustOpened = false);
        clearTimeout(this.isAnimatingTimout);
        this.isAnimatingTimout = setTimeout(() => this.isAnimating = false, 500);
    }

    toggleVisible() {
        this.setVisible(!this.isVisible);
    }

}