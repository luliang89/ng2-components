import { ComponentRef, Type, EventEmitter } from "@angular/core";

import { DialogContext, DIALOG_CONTEXT_TOKEN } from './dialog-context';

import { ComponentBase } from './component-base';

import { AlertComponent } from './alert.component';
import { ConfirmComponent } from './confirm.component';
import { LoaderComponent } from './loader.component';
import { NotifyComponent } from './notify.component';

export class ActiveDialog<T extends ComponentBase<DialogContext>> {

    private _onDismiss: EventEmitter<void>;

    public get onDismiss() {
        return this._onDismiss;
    }

    constructor(
        protected componentRef: ComponentRef<T>
    ) {
        this._onDismiss = new EventEmitter();

        this.componentRef.instance.onDismiss.subscribe(() => {
            this.componentRef.destroy();
            this._onDismiss.emit();
        });
    }

    public close(): void {
        this.componentRef.instance.close();
    }

}

export class ActiveConfirm extends ActiveDialog<ConfirmComponent> {

    private promise: Promise<boolean>;

    public get onApprove() {
        if (this.promise) {
            return null;
        }
        return this.componentRef.instance.onApprove;
    }

    public get onDeny() {
        if (this.promise) {
            return null;
        }
        return this.componentRef.instance.onDeny;
    }

    public toPromise() {
        if (!this.promise) {
            this.promise = new Promise<boolean>((resolve, reject) => {
                this.componentRef.instance.onApprove.subscribe(() => resolve(true));
                this.componentRef.instance.onDeny.subscribe(() => resolve(false));
            });
        }
        return this.promise;
    }

}