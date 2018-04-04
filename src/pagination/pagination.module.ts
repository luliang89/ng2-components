import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IuiPaginationComponent } from './pagination.component';

@NgModule({
    imports:[
        CommonModule
    ],
    providers: [
    ],
    declarations: [
        IuiPaginationComponent,
    ],
    exports: [
        IuiPaginationComponent,
    ]
})
export class IuiPaginationModule {

}