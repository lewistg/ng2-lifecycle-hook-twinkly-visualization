import { 
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Input,
    QueryList,
    TemplateRef,
    ViewChild,
    ViewChildren,
    ViewContainerRef 
} from '@angular/core';

import { NodeComponent } from './componentnode.component';
import { DOMLineSegment, getClientRectLocation } from './domgeometry';

@Component({
    selector: 'graph',
    template: `
        <div class="levels">
            <div class="level" *ngFor="let level of levels; let i = index">
                <div #levelAnchor></div>
            </div>
        </div>
        <node 
            #rootNode 
            [level]="numLevels - 1"
            [boundData]="false"
        ></node>
        <connector
            *ngFor="let connector of connections"
            [domLineSegment]="connector"
        ></connector>
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
    `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GraphComponent implements AfterViewInit {
    @ViewChildren('levelAnchor', {read: ViewContainerRef}) levelViewContainers: QueryList<ViewContainerRef>;
    @ViewChildren('compDiv') componentDivs: QueryList<ElementRef>;
    @ViewChild('rootNode') rootNode: NodeComponent;

    levels: any[];
    @Input() set numLevels(value: number) {
        this.levels = new Array(value);
    }
    get numLevels(): number {
        return this.levels.length;
    }

    connections: DOMLineSegment[] = [];

    private _connectionsInitialized = false;

    constructor(private _cdr: ChangeDetectorRef) { } 

    private _tickThenInitializeConnections() {
        setTimeout(() => {
            this.connections = [];
            let calculateSubgraphConnections = (subgraphRoot: NodeComponent) => {
                let p0 = getClientRectLocation(subgraphRoot.componentDiv.nativeElement, 0.5, 1);
                subgraphRoot.childNodes.forEach((child: NodeComponent) => {
                    let p1 = getClientRectLocation(child.componentDiv.nativeElement, 0.5, 0);
                    this.connections.push(new DOMLineSegment(p0, p1));

                    calculateSubgraphConnections(child);
                })
            }
            calculateSubgraphConnections(this.rootNode);

            this._cdr.markForCheck();

            this._connectionsInitialized = true;
        }, 0)
    }

    private _tickThenBuildNodes() {
        setTimeout(() => {
            let levelViewContainers = this.levelViewContainers.toArray();
            let renderSubgraph = (subgraphRoot: NodeComponent) => {
                let vc = levelViewContainers[subgraphRoot.level];
                vc.createEmbeddedView(subgraphRoot.componentDivTemplate);
                subgraphRoot.cdr.markForCheck();
                subgraphRoot.childNodes.forEach(renderSubgraph);
            }
            renderSubgraph(this.rootNode);
        }, 0)
    }

    ngAfterViewInit() {
        this._tickThenBuildNodes();
    }

    ngAfterViewChecked() {
        if (!this._connectionsInitialized && !!this.rootNode.componentDiv) {
            this._tickThenInitializeConnections();
        }
    }
}
