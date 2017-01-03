import { AfterViewInit, Component, ElementRef, NgZone, ViewChild } from '@angular/core';

import { CanvasFlasher } from '../model/canvasflasher';
import { Color, Flasher } from '../model/flasher';

@Component({
    selector: 'ng-lifecylce-hook-flasher',
    template: `
        <div class="node">
            <canvas #flashCanvas width="50" height="50"></canvas>
            <div class="content-wrapper">
                <ng-content></ng-content>
            </div>
        </div>
    `,
    styles: [`
        .node {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 38px;
            height: 38px;
            border-radius: 19px;
            border: solid 1px black;
            overflow: hidden;
        }
        .node canvas {
            position: absolute;
            left: -5px;
            top: -5px;
            pointer-events: none;
        }
        .content-wrapper {
            position: relative;
        }
    `]
})
export class FlasherComponent implements AfterViewInit, Flasher {
    @ViewChild('flashCanvas') flashCanvas: ElementRef;
    private _flasher: Flasher; 

    constructor(private _zone: NgZone) { }

    ngAfterViewInit() {
        this._flasher = new CanvasFlasher(this.flashCanvas.nativeElement);
    }

    flash(color: Color) {
        if (!!this._flasher) {
            this._zone.runOutsideAngular(() => this._flasher.flash(color));
        }
    }

    flashAndPause(color: Color) {
        if (!!this._flasher) {
            this._zone.runOutsideAngular(() => this._flasher.flashAndPause(color));
        }
    }

    unpause() {
        if (!!this._flasher) {
            this._zone.runOutsideAngular(() => this._flasher.unpause());
        }
    }
}
