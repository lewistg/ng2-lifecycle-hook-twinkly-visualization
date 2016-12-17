import { AfterViewInit, Component, ElementRef, Input, QueryList, TemplateRef, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';

import { NodeComponent } from './componentnode.component';

@Component({
    selector: 'graph',
    template: `
        <div>Graph</div>
        <div class="levels">
            <div class="level" *ngFor="let level of levels; let i = index">
                <div #levelAnchor></div>
            </div>
        </div>
        <node #rootNode [level]="numLevels - 1"></node>
    `,
    styles: [`
        .levels {
            display: flex;
            flex-direction: column-reverse;
        }
        .level {
            display: flex;
            justify-content: center;
            margin-bottom: 15px;
        }
    `]
})
export class GraphComponent implements AfterViewInit {
    levelTemplates: TemplateRef<any>[][] = [];
    @ViewChildren('levelAnchor', {read: ViewContainerRef}) levelViewContainers: QueryList<ViewContainerRef>;
    @ViewChild('rootNode') rootNode: NodeComponent;

    levels: any[];
    @Input() set numLevels(value: number) {
        this.levels = new Array(value);
    }
    get numLevels(): number {
        return this.levels.length;
    }

    appendNodeToLevel(nodeTemplate: TemplateRef<any>, levelIndex: number) {
        this.levelTemplates[levelIndex].push(nodeTemplate);
    }

    ngAfterViewInit() {
        let levelViewContainers = this.levelViewContainers.toArray();
        let renderSubgraph = (node: NodeComponent) => {
            let vc = levelViewContainers[node.level];
            vc.createEmbeddedView(node.componentDivTemplate);
            node.childNodes.forEach(renderSubgraph);
        }
        renderSubgraph(this.rootNode);

        // draw connectors
        console.log('here!');
    }
}
