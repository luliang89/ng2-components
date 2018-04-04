import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarComponent } from './calendar.component';

@NgModule({
    imports:[
        CommonModule
    ],
    providers: [
    ],
    declarations: [
        CalendarComponent,
    ],
    exports: [
        CalendarComponent,
    ]
})
export class IuiCalendarModule {

}