import {
    Component,OnInit, AfterViewInit
} from '@angular/core';

import { NotifyContext } from './dialog-context';

import { ComponentBase } from './component-base';

@Component({
    selector: 'iui-dialog-notify',
    template: `
    <iui-dimmer class="inverted"
        [dimmed]="dimmed"
        >

        <div class="iui-dialog nofity" 
            >

            {{context.content}}

        </div>

    </iui-dimmer>
`,
    styleUrls: ['./dialog.component.less']
})
export class NotifyComponent extends ComponentBase<NotifyContext> implements OnInit, AfterViewInit {

    ngAfterViewInit() {
        super.ngAfterViewInit();

        setTimeout(() => this.close(), (this.context.duration || 3) * 1000);
    }

}
