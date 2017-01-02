import { AfterViewChecked, Component, ElementRef, ViewChild } from '@angular/core';

import { FlashLog, FlashLogEntry } from '../../model/flashlog';
import { FlashLogPlayback } from '../../model/flashlogplayback';

@Component({
    selector: 'log-playback-messages',
    template: `
        <div 
            #linesContainer
            class="lines-container"
        >
            <div 
                *ngFor="let entry of log.entries; let i = index;"
                class="line"
            >
                <div class="current-step-marker">
                    <span 
                        #currentStepMarker
                        *ngIf="flashLogPlayback.currEntryIndex == i && flashLogPlayback.isPlayingBack"
                    >-></span>
                </div>
                <input 
                    [value]="entry.message"
                    [style.color]="lineColor(entry)"
                />
            </div>
        </div>
    `,
    styles: [`
        .lines-container {
            border: 1px solid black;
            height: 75px;
            width: 400px;
            overflow-y: scroll;
            position: relative;
        }
        .line {
            display: flex;
        }
        .line input {
            font-family: monospace;
            border: none;
            flex-grow: 1;
        }
        .current-step-marker {
            color: #2546ff;
            font-weight: bold;
            font-family: monospace;
            width: 22px;
        }
    `]
})
export class LogMessagesPlaybackComponent implements AfterViewChecked {
    @ViewChild('linesContainer') linesContainer: ElementRef;
    @ViewChild('currentStepMarker') currentStepMarker: ElementRef;

    constructor(public log: FlashLog, public flashLogPlayback: FlashLogPlayback) {}

    lineColor(entry: FlashLogEntry): string {
        return `rgb(${entry.color.r}, ${entry.color.g}, ${entry.color.b})`
    }

    ngAfterViewChecked() {
        if (!this.linesContainer || !this.currentStepMarker) {
            return;
        }
        
        if (this.currentStepMarker.nativeElement.parentElement.offsetTop < this.linesContainer.nativeElement.scrollTop 
            || this.currentStepMarker.nativeElement.parentElement.offsetTop > this.linesContainer.nativeElement.scrollTop + this.linesContainer.nativeElement.offsetHeight) {
                this.linesContainer.nativeElement.scrollTop = this.currentStepMarker.nativeElement.parentElement.offsetTop;
        }
    }
}
