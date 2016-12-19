import { Component, ElementRef, Host, Input, Optional, QueryList, SkipSelf, TemplateRef, ViewChild, ViewChildren } from '@angular/core';

import {Flasher} from './flasher';

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
        }

        .node-box canvas {
            position: absolute;
            left: -10px;
            top: -10px;
        }
    `]
})
export class NodeComponent {
    private static CALLBACK_FLASH_COLORS = {
        ngOnChanges: {r: 153, g: 255, b: 0}
    }
    private static BASE_PADDING = 5;

    @Input() level: number = 0;
    @Input() boundData: boolean = true;
    @ViewChild('compDiv') componentDiv: ElementRef;
    @ViewChild('compTemplate') componentDivTemplate: TemplateRef<any>;
    @ViewChild('flashCanvas') flashCanvas: ElementRef;
    @ViewChildren(NodeComponent) childNodes: QueryList<NodeComponent>;
    private _callbackFlasher: Flasher;

    get padding(): number {
        let scalar = Math.pow((this.level + 1), 2);
        return scalar * NodeComponent.BASE_PADDING;
    }

    constructor(@Optional() @SkipSelf() public parentNode: NodeComponent) {}
    
    ngOnChanges() {
        console.log(`node in level ${this.level} changed`);
        if (!!this._callbackFlasher) {
            this._callbackFlasher.flash(NodeComponent.CALLBACK_FLASH_COLORS.ngOnChanges);
        }
    }

    ngAfterViewChecked() {
        if (!this._callbackFlasher && !!this.flashCanvas) {
            this._callbackFlasher = new Flasher(this.flashCanvas.nativeElement);
        }
        //console.log('template ref', this.componentDivTemplate);
        //console.log('compDiv', this.componentDiv);
    }
}
