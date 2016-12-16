import { AfterViewInit, Component, ElementRef, Input, QueryList, TemplateRef, ViewChildren, ViewContainerRef } from '@angular/core';

import { NodeComponent } from './componentnode.component';

@Component({
    selector: 'graph',
    template: `
        <div>Graph</div>
        <div class="levels">
            <div class="level" *ngFor="let level of levelTemplates; let i = index">
                <div #levelAnchor></div>
            </div>
        </div>
        <node [level]="numLevels - 1"></node>
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

    @Input() set numLevels(value: number) {
        this.levelTemplates = [];
        for (let i = 0; i < value; i++) {
            this.levelTemplates[i] = [];
        }
    }
    get numLevels() {
        return (this.levelTemplates && this.levelTemplates.length) || 0;
    }

    appendNodeToLevel(nodeTemplate: TemplateRef<any>, levelIndex: number) {
        this.levelTemplates[levelIndex].push(nodeTemplate);
    }

    ngAfterViewInit() {
        let levelViewContainers = this.levelViewContainers.toArray();
        for (let i = 0; i < this.numLevels; i++) {
            let vc = levelViewContainers[i];
            this.levelTemplates[i].forEach((t: TemplateRef<any>) => vc.createEmbeddedView(t));
        }

        // draw connectors
    }
}
