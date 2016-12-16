import { Component, ElementRef, Host, Input, Optional, SkipSelf } from '@angular/core';

@Component({
    selector: 'node',
    template: `
        <connector
           [parentNode]="parentNode && parentNode.elementRef"
           [childNode]="elementRef"
        ></connector>
        <template 
            node-placement
            [level]="level"
        >
            <div class="node-box">Component</div>
        </template>
        <node
            #childA
            *ngIf="level > 0"
            [level]="level - 1"
        ></node>
        <node
            #childB
            *ngIf="level > 0"
            [level]="level - 1"
        ></node>
    `,
    styles: [`
        .node-box {
            display: flex;
            justify-content: center;
            alignt-items: center;
            font-family: sans-serif;
            padding: 10px;
            border: solid 2px black;
        }
    `]
})
export class NodeComponent {
    @Input() level: number = 0;

    constructor(public elementRef: ElementRef, @Optional() @SkipSelf() public parentNode: NodeComponent) {}
}
