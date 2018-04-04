import {
    Injectable,
    ApplicationRef,
    ComponentFactoryResolver,
    Injector,
    ComponentRef,
    ReflectiveInjector,
    Provider,
    Type,
    ViewContainerRef,
    TemplateRef
} from '@angular/core';

import { ComponentBase } from './component-base';
import { AlertComponent } from './alert.component';
import { ConfirmComponent } from './confirm.component';
import { LoaderComponent } from './loader.component';
import { NotifyComponent } from './notify.component';

import { ActiveDialog, ActiveConfirm } from './active-dialog';

import { AlertContext, ConfirmContext, NotifyContext, DialogContext, DIALOG_CONTEXT_TOKEN } from './dialog-context';


@Injectable()
export class DialogService {

    constructor(
        //private suiModalService: SuiModalService,
        private applicationRef: ApplicationRef,
        private componentFactoryResolver: ComponentFactoryResolver,
        private injector: Injector
    ) { }

    alert(context: AlertContext | string) {
        return this.createDialog(AlertComponent, context);
    }

    confirm(context: ConfirmContext | string) {
        return this.createDialog(ConfirmComponent, context) as ActiveConfirm;
    }

    loader() {
        return this.createDialog(LoaderComponent);
    }

    notify(context: NotifyContext) {
        return this.createDialog(NotifyComponent, context);
    }

    private createDialog(component: Type<ComponentBase<DialogContext>>, context?: DialogContext | string) {

        let providers;

        if (context) {
            if (typeof context === 'string') {
                context = {
                    content: context
                }
            }
            providers = [
                {
                    provide: DIALOG_CONTEXT_TOKEN,
                    useValue: context
                }
            ];
        }

        let componentRef = this.createComponent(component, providers);

        let dialog: ActiveDialog<ComponentBase<DialogContext>>;
        if (component === ConfirmComponent) {
            dialog = new ActiveConfirm(componentRef as ComponentRef<ConfirmComponent>);
        } else {
            dialog = new ActiveDialog(componentRef);
        }
        return dialog;
    }

    private createComponent(component: Type<ComponentBase<DialogContext>>, providers: Provider[] = []) {
        const factory = this.componentFactoryResolver.resolveComponentFactory(component);

        // Resolve and create an injector with the specified providers.
        const injector = ReflectiveInjector.resolveAndCreate(providers, this.injector);

        // Create a component using the previously resolved factory & injector.
        const componentRef = factory.create(injector);

        this.applicationRef.attachView(componentRef.hostView);

        return componentRef;
    }

}
