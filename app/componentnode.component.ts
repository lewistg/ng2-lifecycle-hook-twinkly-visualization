import { Component, ElementRef, Host, Input, Optional, QueryList, SkipSelf, TemplateRef, ViewChild, ViewChildren } from '@angular/core';

@Component({
    selector: 'node',
    template: `
        <template 
            #compTemplate
        >
            <div 
                #compDiv 
                [style.margin-left.px]="padding"
                [style.margin-right.px]="padding"
                class="node-box"
            >C</div>
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
            padding: 5px;
            font-size: 12px;
            font-weight: bold;
            border: solid 2px black;
            border-radius: 15px;
            width: 15px;
            height: 15px;
        }
    `]
})
export class NodeComponent {
    private static BASE_PADDING = 5;
    @Input() level: number = 0;
    @ViewChild('compDiv') componentDiv: ElementRef;
    @ViewChild('compTemplate') componentDivTemplate: TemplateRef<any>;
    @ViewChildren(NodeComponent) childNodes: QueryList<NodeComponent>;

    get padding(): number {
        let scalar = Math.pow((this.level + 1), 2);
        return scalar * NodeComponent.BASE_PADDING;
    }

    constructor(@Optional() @SkipSelf() public parentNode: NodeComponent) {}

    ngAfterViewChecked() {
        //console.log('template ref', this.componentDivTemplate);
        //console.log('compDiv', this.componentDiv);
    }
}
