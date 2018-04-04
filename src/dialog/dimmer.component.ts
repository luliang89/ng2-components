
import { Component,Input,HostBinding } from '@angular/core';

@Component({
    selector: 'iui-dimmer',
    template:'<div><ng-content></ng-content></div>',
    styleUrls:['./dimmer.component.less']
})
export class IuiDimmerComponent{

    @Input()
    @HostBinding('class.active')
    dimmed = false;

}