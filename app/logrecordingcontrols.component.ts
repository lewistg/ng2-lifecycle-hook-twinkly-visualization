import { Component } from '@angular/core';

import { ComponentNodeLifecycleLog } from './componentnodelifecyclehooklog';

@Component({
    selector: 'log-controls',
    template: `
        <div class="controls">
            <div 
                class="button record"
                (click)="logger.clear(); logger.record = !logger.record"
                [class.recording]="logger.record"
                tabindex="-1"
            >⚫</div>
            <div class="separator"></div>
            <div 
                class="button"
                tabindex="-1"
            >⏮</div>
            <div 
                class="button play"
                tabindex="-1"
            >▶</div>
            <div 
                class="button"
                tabindex="-1"
            >■</div>
            <div 
                class="button"
                tabindex="-1"
            >⏭</div>
        </div>
    `,
    styles: [`
        .controls {
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .button {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 5px;
            background-color: #e7e7e7;
            font-size: 14px;
            width: 36px;
            height: 36px;
            cursor: pointer;
            box-sizing: border-box;
        }
        .button:active {
            background-color: #979797;
        }
        .button:focus {
            z-index: 1;
        }
        .button.play {
            padding-bottom: 7px;
        }
        .button.record.recording {
            color: red;
        }
        .separator {
            box-sizing: border-box;
            margin: 0 5px;
            height: 26px;
            width: 2px;
            border-right: solid 2px black;

        }
    `]
})
export class LogControlsComponent { 
    constructor(public logger: ComponentNodeLifecycleLog) {
    }
}
