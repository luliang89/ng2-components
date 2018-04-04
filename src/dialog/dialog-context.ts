import { InjectionToken } from '@angular/core';

export interface DialogContext {

    /**
     * 内容
     */
    content: string;

}

export interface NotifyContext extends DialogContext {

    /**
     * 显示时间，单位秒
     */
    duration?: number;

}

export interface AlertContext extends DialogContext {

    /**
     * 标题
     */
    title?: string;

    btnResolveText?: string;

}

export interface ConfirmContext extends AlertContext {

    btnRejectText?: string;

}


export const DIALOG_CONTEXT_TOKEN = new InjectionToken<DialogContext>('DialogContext');
