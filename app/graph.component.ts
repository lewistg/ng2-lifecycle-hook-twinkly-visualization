import { AfterViewInit, Component, ElementRef, Input, OnInit, QueryList, TemplateRef, ViewChildren, ViewContainerRef } from '@angular/core';

import { NodeComponent } from './componentnode.component';

@Component({
    selector: 'graph',
    template: `
        <div>Graph</div>
        <div #level *ngFor="let level of levelTemplates; let i = index">
            <div #levelAnchor>Level: {{i}}</div>
        </div>
        <node [level]="numLevels - 1"></node>
    `,
    styles: [`
    `]
})
export class GraphComponent implements AfterViewInit, OnInit {
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

    ngOnInit() {

    }

    ngAfterViewInit() {
        let levelViewContainers = this.levelViewContainers.toArray();
        for (let i = 0; i < this.numLevels; i++) {
            let vc = levelViewContainers[i];
            this.levelTemplates[i].forEach((t: TemplateRef<any>) => vc.createEmbeddedView(t));
        }
        console.log(this.levelViewContainers);
    }
}
