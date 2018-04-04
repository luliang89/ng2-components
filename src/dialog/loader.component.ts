import {
    Component,OnInit, AfterViewInit
} from '@angular/core';

import { DialogContext } from './dialog-context';

import { ComponentBase } from './component-base';

@Component({
    selector: "iui-dialog-loader",
    template: `
        <iui-dimmer class="inverted" [dimmed]="dimmed"
            >

            <div class="iui-dialog loader"
                >

                <div class="ui active centered inline inverted loader"></div>
            
            </div>

        </iui-dimmer>
    `,
    styleUrls: ['./dialog.component.less']
})
export class LoaderComponent extends ComponentBase<DialogContext> implements OnInit, AfterViewInit {

}
