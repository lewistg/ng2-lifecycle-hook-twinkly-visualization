import { Component, NgZone } from '@angular/core';

import { FlashLog } from '../../model/flashlog';
import { FlashLogPlayback } from '../../model/flashlogplayback';

@Component({
    selector: 'log-playback-slider',
    template: `
        <input 
            type="range" 
            min="0" 
            [max]="log.length - 1"
            [disabled]="!flashLogPlayback.isPlayingBack"
            [ngModel]="flashLogPlayback.currEntryIndex"
            (ngModelChange)="onValueChange($event)"
        >
    `,
    styles: [`
        input {
            width: 220px;
        }
        input:disabled {
            opacity: 0.25;
        }
    `]
})
export class SliderComponent {
    constructor(
        public log: FlashLog, 
        public flashLogPlayback: FlashLogPlayback,
        private _zone: NgZone
    ) { }

    onValueChange(entryIndex: number) {
        this.flashLogPlayback.jumpToEntry(entryIndex);
    }
}
