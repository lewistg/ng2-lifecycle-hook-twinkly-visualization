import {
    ChangeDetectorRef,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Host,
    Input,
    NgZone,
    QueryList,
    TemplateRef,
    ViewChild,
    ViewChildren
} from '@angular/core';

import { Flasher, Color } from './flasher';
import { LifecycleHook, ComponentNodeLifecycleLog } from './componentnodelifecyclehooklog';

@Component({
    selector: 'node',
    template: `
        <template
            #compTemplate
        >
            <div
                #compDiv
                class="node-box"
                [style.margin-left.px]="padding"
                [style.margin-right.px]="padding"
                (click)="boundData = !boundData"
            >
                C
                <canvas #flashCanvas width="40" height="40"></canvas>
            </div>
        </template>
        <node
            #childA
            *ngIf="level > 0"
            [level]="level - 1"
            [boundData]="boundData"
        ></node>
        <node
            #childB
            *ngIf="level > 0"
            [level]="level - 1"
            [boundData]="boundData"
        ></node>
    `,
    styles: [`
        .node-box {
            position: relative;
            display: flex;
            overflow: hidden;
            justify-content: center;
            alignt-items: center;
            font-family: sans-serif;
            padding: 5px;
            font-size: 12px;
            font-weight: bold;
            border: solid 2px black;
            border-radius: 15px;
            width: 15px;
            height: 15px;
            cursor: pointer;
        }

        .node-box canvas {
            position: absolute;
            left: -10px;
            top: -10px;
            z-index: -1;
        }
    `],
    /* changeDetection: ChangeDetectionStrategy.OnPush */
})
export class NodeComponent {
    private static BASE_PADDING = 5;

    @Input() level: number = 0;
    private _boundData: boolean = true;
    @Input() set boundData(value: boolean) {
        this._boundData = value;
        /* this.cdr.markForCheck(); */
    }
    get boundData(): boolean {
        return this._boundData;
    }


    @ViewChild('compDiv') componentDiv: ElementRef;
    @ViewChild('compTemplate') componentDivTemplate: TemplateRef<any>;
    @ViewChild('flashCanvas') flashCanvas: ElementRef;
    @ViewChildren(NodeComponent) childNodes: QueryList<NodeComponent>;
    private _callbackFlasher: Flasher;

    get padding(): number {
        let scalar = Math.pow((this.level + 1), 2);
        return scalar * NodeComponent.BASE_PADDING;
    }

    constructor(
        /* public cdr: ChangeDetectorRef, */
        private _logger: ComponentNodeLifecycleLog,
        private _ngZone: NgZone
    ) {}

    flash(color: Color) {
        if (!!this._callbackFlasher) {
            this._ngZone.runOutsideAngular(() => this._callbackFlasher.flash(color));
        }
    }

    holdFlash(color: Color) {
        if (!!this._callbackFlasher) {
            this._ngZone.runOutsideAngular(() => this._callbackFlasher.flashAndPause(color));
        }
    }

    releaseFlash() {
        if (!!this._callbackFlasher) {
            this._ngZone.runOutsideAngular(() => this._callbackFlasher.unpause());
        }
    }

    ngOnChanges() {
        this._logger.log({node: this, lifecycleHook: LifecycleHook.NG_ON_CHANGES});
    }

    /* ngDoCheck() {
        this._logger.log({node: this, lifecycleHook: LifecycleHook.NG_DO_CHECK});
    } */

    ngAfterViewChecked() {
        if (!this._callbackFlasher && !!this.flashCanvas) {
            this._callbackFlasher = new Flasher(this.flashCanvas.nativeElement);
        } else {
            this._logger.log({node: this, lifecycleHook: LifecycleHook.NG_AFTER_VIEW_CHECKED});
        }
    }
}
