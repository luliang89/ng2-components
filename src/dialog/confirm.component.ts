import {
    Component,
    OnInit,
    AfterViewInit,
    Output,
    ElementRef,
    EventEmitter,
    Inject
} from '@angular/core';

import { ConfirmContext, DIALOG_CONTEXT_TOKEN } from './dialog-context';

import { ComponentBase } from './component-base';

@Component({
    selector: 'iui-dialog-confirm',
    template: `
        <iui-dimmer
            [dimmed]="dimmed"
            >

            <div class='iui-dialog confirm'  
                >   

                <div class="content">
                    <div class="header" *ngIf='context.title'>{{context.title}}</div>
                    {{context.content}}
                </div>
                
			    <div class="footer">
                    <button class="reject" (click)='deny()'>取消</button>
                    <button class="resolve" (click)='approve()'>确定</button>
                </div>

            </div>

        </iui-dimmer>
    `,
    styleUrls: ['./dialog.component.less',]
})
export class ConfirmComponent extends ComponentBase<ConfirmContext> implements OnInit, AfterViewInit {

    @Output("approved")
    public onApprove: EventEmitter<void>;

    @Output("denied")
    public onDeny: EventEmitter<void>;

    constructor(
        elementRef: ElementRef,
        @Inject(DIALOG_CONTEXT_TOKEN) context: ConfirmContext
    ) {
        super(elementRef, context);

        this.onApprove = new EventEmitter();
        this.onDeny = new EventEmitter();
    }

    approve() {
        if (this.close()) {
            this.onApprove.emit();
        }
    }

    deny() {
        if (this.close()) {
            this.onDeny.emit();
        }
    }

}