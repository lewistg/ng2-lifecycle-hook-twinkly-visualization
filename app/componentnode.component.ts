import { Component, Input } from '@angular/core';

@Component({
    selector: 'node',
    template: `
        <div class="node-box">Component</div>
        <node
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
}
