import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DialogService } from './dialog.service';

import { IuiDimmerComponent } from './dimmer.component';
import { ConfirmComponent } from './confirm.component';
import { AlertComponent } from './alert.component';
import { LoaderComponent } from './loader.component';
import { NotifyComponent } from './notify.component';

@NgModule({
    imports: [
        CommonModule,
        //NoopAnimationsModule
    ],
    declarations: [
        IuiDimmerComponent,
        AlertComponent,
        ConfirmComponent,
        LoaderComponent,
        NotifyComponent
    ],
    providers: [
        DialogService
    ],
    entryComponents: [
        IuiDimmerComponent,
        AlertComponent,
        ConfirmComponent,
        LoaderComponent,
        NotifyComponent
    ],
})
export class IuiDialogModule { }