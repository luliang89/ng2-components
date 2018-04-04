import {
    Inject,
    InjectionToken,
    ElementRef,
    ComponentRef,
    EventEmitter,
    Output,
    Optional
} from '@angular/core';

import { DialogContext, DIALOG_CONTEXT_TOKEN } from './dialog-context';

export class ComponentBase<T extends DialogContext> {

    public dimmed: boolean;

    public isClosing: boolean;

    @Output("dismissed")
    public onDismiss: EventEmitter<void>;

    constructor(
        public elementRef: ElementRef,
        @Inject(DIALOG_CONTEXT_TOKEN) @Optional() public context: T
    ) {

        this.dimmed = false;
        this.isClosing = false;

        this.onDismiss = new EventEmitter();
    }

    ngOnInit() {

        setTimeout(() => this.dimmed = true);
    }

    ngAfterViewInit() {
        document.querySelector("body")!.appendChild(this.elementRef.nativeElement);
    }

    close() {
        if (this.isClosing) {
            return false;
        }

        this.isClosing = true;

        this.dimmed = false;

        setTimeout(() => this.onDismiss.emit(), 500);

        return true;
    }

}
