import { Component, ElementRef, Host, Input, Optional, QueryList, SkipSelf, TemplateRef, ViewChild, ViewChildren } from '@angular/core';

@Component({
    selector: 'node',
    template: `
        <!--connector
           [parentNode]="parentNode && parentNode.componentDiv"
           [childNode]="componentDiv"
        ></connector-->
        <template 
            #compTemplate
        >
            <div #compDiv class="node-box">Component</div>
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
    @ViewChild('compDiv') componentDiv: ElementRef;
    @ViewChild('compTemplate') componentDivTemplate: TemplateRef<any>;
    @ViewChildren(NodeComponent) childNodes: QueryList<NodeComponent>;

    constructor(@Optional() @SkipSelf() public parentNode: NodeComponent) {}

    /*ngAfterViewChecked() {
        console.log('template ref', this.componentDivTemplate);
        console.log('compDiv', this.componentDiv);
    }*/
}
