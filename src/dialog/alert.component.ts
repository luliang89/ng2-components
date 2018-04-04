import {
    Component,
    OnInit,
    AfterViewInit
} from '@angular/core';

import { AlertContext } from './dialog-context';

import { ComponentBase } from './component-base';

import * as transitions from '../transitions';

@Component({
    selector: 'iui-dialog-alert',
    template: `
        <iui-dimmer [dimmed]="dimmed"
            >

            <div class='iui-dialog alert'
                >   

                <div class="content">
                    <div class="header" *ngIf='context.title'>{{context.title}}</div>
                    {{context.content}}
                </div>
			    <div class="footer">
                    <button class="resolve" (click)='close()'>好</button>
                </div>

            </div>

        </iui-dimmer>
    `,
    styleUrls: ['./dialog.component.less','./alert.component.less'],
    //animations: [transitions.fade]
})
export class AlertComponent extends ComponentBase<AlertContext> implements OnInit, AfterViewInit {

}