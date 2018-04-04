
import {
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/animations';

//const timings = 

export const fade = trigger('fade', [
    state('active', style({ opacity: '1' })),
    transition('void => *, active => void', [
        style({ opacity: '0' }),
        animate(1000)
    ])
]);