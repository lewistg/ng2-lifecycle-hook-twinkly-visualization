import { Component } from '@angular/core';

import { LogEntry, ComponentNodeLifecycleLog } from './componentnodelifecyclehooklog';

@Component({
    selector: 'log-controls',
    template: `
        <div class="controls">
            <div 
                class="button record"
                (click)="onClickRecord()"
                [class.recording]="logger.record"
                tabindex="-1"
            >⚫</div>
            <div class="separator"></div>
            <div 
                class="button"
                tabindex="-1"
                (click)="step(-1)"
            >⏮</div>
            <div 
                class="button play"
                (click)="onClickPlay()"
                tabindex="-1"
            >▶</div>
            <div 
                class="button"
                tabindex="-1"
                (click)="onClickStop()"
            >■</div>
            <div 
                class="button"
                tabindex="-1"
                (click)="step(1)"
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
    private _currLogEntry: LogEntry|undefined;
    private _currLogEntryIndex: number = -1;
    
    constructor(public logger: ComponentNodeLifecycleLog) { }

    onClickRecord() {
        this.logger.record = !this.logger.record
        if (this.logger.record) {
            this.logger.clear(); 
        }
    }

    onClickPlay() {
        this.logger.record = false;
        this.logger.livePlayback = false;
        this.step(1); // take the first step
    }

    step(offset: number) {
        if (this.logger.length == 0) {
            this._stopStepping();
            return;
        }

        if (this._currLogEntry) {
            this._currLogEntry.node.releaseFlash();
        }

        this._currLogEntryIndex += offset;
        this._currLogEntryIndex = Math.min(Math.max(0, this._currLogEntryIndex), this.logger.length - 1);

        let entry = this.logger.get(this._currLogEntryIndex);
        entry.node.holdFlash(ComponentNodeLifecycleLog.LIFECYCLE_HOOK_COLORS.get(entry.lifecycleHook));
        this._currLogEntry = entry;
    }

    private _stopStepping() {
        this._currLogEntry = undefined;
        this._currLogEntryIndex = -1;
        if (this._currLogEntry) {
            this._currLogEntry.node.releaseFlash();
        }
    }

    onClickStop() {
        this.logger.livePlayback = true;
        this._stopStepping();
    }
}
