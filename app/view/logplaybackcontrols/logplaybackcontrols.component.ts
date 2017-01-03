import { Component } from '@angular/core';

import { FlashLogPlayback } from '../../model/flashlogplayback';

@Component({
    selector: 'log-playback-controls',
    template: `
        <div class="controls">
            <div
                class="button record" tabindex="-1"
                [class.recording]="flashLogPlayback.isRecording"
                (mousedown)="flashLogPlayback.toggleRecording()"
            >
                <div class="icon"></div>
            </div>
            <div
                class="button backwards" tabindex="-1"
                [class.disabled]="!flashLogPlayback.canStepBackwards"
                (mousedown)="flashLogPlayback.stepBackwards()"
            >
                <div class="icon"></div>
                <div class="icon"></div>
            </div>
            <div
                *ngIf="!flashLogPlayback.isPlayingBack"
                class="button play" tabindex="-1"
                [class.disabled]="!flashLogPlayback.canPlayback"
                (mousedown)="flashLogPlayback.startPlayback()"
            >
                <div class="icon"></div>
            </div>
            <div
                *ngIf="flashLogPlayback.isPlayingBack"
                class="button stop" tabindex="-1"
                (mousedown)="flashLogPlayback.endPlayback()"
            >
                <div class="icon"></div>
            </div>
            <div
                class="button forwards" tabindex="-1"
                [class.disabled]="!flashLogPlayback.canStepForwards"
                (mousedown)="flashLogPlayback.stepForwards()"
            >
                <div class="icon"></div>
                <div class="icon"></div>
            </div>
        </div>
    `,
    styles: [`
        .controls {
            display: flex;
        }
        .button {
            box-sizing: border-box;
            width: 32px;
            height: 32px;
            border: solid 1px black;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .button.disabled {
            pointer-events: none;
        }
        .button.disabled .icon {
            opacity: 0.25;
        }
        .button:active {
            background-color: #d6d6d6;
        }
        .button:nth-child(n + 2) {
           border-left: none;
        }
        .button.record .icon {
            width: 7px;
            height: 7px;
            border-radius: 7px;
            background-color: black;
        }
        .button.record.recording .icon {
            background-color: red;
        }
        .button.play .icon {
            box-sizing: border-box;
            border-width: 5px;
            border-style: solid;
            border-top-color: rgba(0, 0, 0, 0);
            border-right: none;
            border-bottom-color: rgba(0, 0, 0, 0);
        }
        .button.stop .icon {
            width: 7px;
            height: 7px;
            background-color: black;
        }
        .button.forwards .icon {
            height: 5px;
            width: 5px;
            box-sizing: border-box;
            border-width: 5px;
            border-style: solid;
            border-top-color: rgba(0, 0, 0, 0);
            border-right: none;
            border-bottom-color: rgba(0, 0, 0, 0);
        }
        .button.backwards .icon {
            height: 5px;
            width: 5px;
            box-sizing: border-box;
            border-width: 5px;
            border-style: solid;
            border-top-color: rgba(0, 0, 0, 0);
            border-left: none;
            border-bottom-color: rgba(0, 0, 0, 0);
        }
    `]
})
export class LogPlaybackControlsComponent {
    constructor(
        public flashLogPlayback: FlashLogPlayback,
    ) {}
}
