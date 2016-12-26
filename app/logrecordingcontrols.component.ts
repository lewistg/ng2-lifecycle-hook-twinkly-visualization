import { Component,  ChangeDetectionStrategy, ElementRef, NgZone, ViewChild } from '@angular/core';

import { LogEntry, ComponentNodeLifecycleLog } from './componentnodelifecyclehooklog';

@Component({
    selector: 'log-controls',
    template: `
        <div class="step-indicator">
            <div class="track">
                 <div 
                    [ngStyle]="{'left': indicatorLeftOffsetStyle}"
                    class="indicator"
                ></div>
            </div>
        </div>
        <div class="controls">
            <div 
                #recordButton
                class="button record"
                [class.recording]="logger.record"
                tabindex="-1"
            >⚫</div>
            <div class="separator"></div>
            <div 
                class="button"
                tabindex="-1"
                (click)="step(-1)"
                [class.disabled]="!canStepBackwards"
            >⏮</div>
            <div 
                *ngIf="!isPlaying"
                class="button play"
                (click)="onClickPlay()"
                tabindex="-1"
                [class.disabled]="!canPlay"
            >▶</div>
            <div 
                *ngIf="isPlaying"
                class="button"
                tabindex="-1"
                (click)="onClickStop()"
            >■</div>
            <div 
                class="button"
                tabindex="-1"
                (click)="step(1)"
                [class.disabled]="!canStepForwards"
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
            user-select: none;
        }
        .button:active {
            background-color: #979797;
        }
        .button.disabled {
            color: #9e9e9e;
            pointer-events: none;
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
        .step-indicator {
            display: flex;
            justify-content: center;
            margin-bottom: 9px;
        }
        .track {
            width: 300px;
            height: 5px;
            background-color: #e7e7e7;
            display: flex;
            align-items: center;
        }
        .indicator {
            width: 12px;
            height: 12px;
            background-color: black;
            border-radius: 12px;
            position: relative;
        }
    `],
})
export class LogControlsComponent { 
    @ViewChild('recordButton') recordButton: ElementRef;

    private _currLogEntry: LogEntry|undefined;
    private _currLogEntryIndex: number = -1;
    
    constructor(
        public logger: ComponentNodeLifecycleLog,
        private _ngZone: NgZone 
    ) { }

    ngAfterViewInit() {
        this._ngZone.runOutsideAngular(() => {
            this.recordButton.nativeElement.addEventListener('mousedown', () => {
                this._stopStepping();
        
                this.logger.record = !this.logger.record
                if (this.logger.record) {
                    this.logger.clear(); 
                }
            });
        });
    }

    /*onClickRecord() {
        this._stopStepping();

    }*/

    onClickPlay() {
        this.logger.record = false;
        this.logger.livePlayback = false;
        this.step(1); // take the first step
    }

    get canPlay(): boolean {
        return this.logger.length > 0 && !this.isRecording;
    }

    get canStepForwards(): boolean {
        return  this.isPlaying && this._currLogEntryIndex < this.logger.length - 1;
    }

    get canStepBackwards(): boolean {
        return this.isPlaying && this._currLogEntryIndex > 0;
    }

    get isPlaying(): boolean {
        return !!this._currLogEntry;
    }

    get isRecording(): boolean {
        return this.logger.record;
    }

    get indicatorLeftOffsetStyle(): string {
        //return `calc(${this.percentThroughSteps} - 6px)`
        return `calc(${this.percentThroughSteps * 100}% - 6px)`
    }

    private get percentThroughSteps(): number {
        return (this._currLogEntryIndex + 1) / this.logger.length;
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
        if (this._currLogEntry) {
            this._currLogEntry.node.releaseFlash();
        }
        this._currLogEntry = undefined;
        this._currLogEntryIndex = -1;
    }

    onClickStop() {
        this.logger.livePlayback = true;
        this._stopStepping();
    }
}
