import { Component, ElementRef, Input } from '@angular/core';

import { DOMLineSegment, DOMLocation } from './domgeometry';

@Component({
    selector: 'connector',
    template: `
        <svg
            [style.left.px]="x0"
            [style.top.px]="y0"
            [attr.width]="width"
            [attr.height]="height"
        >
            <line
                [attr.x1]="x1"
                [attr.y1]="y1"
                [attr.x2]="x2"
                [attr.y2]="y2"
                style="stroke:rgb(0, 0, 0); stroke-width:2"
            ></line>
        </svg>
    `,
    styles: [`
        svg {
            position: absolute;
        }
    `]
})
export class ConnectorComponent {
    private _padding: number = 10;
    private _strokeWidth: number = 2;
    get width(): number {
        return this.domLineSegment.width + (2 * this._padding);
    }
    get height(): number {
        return this.domLineSegment.height + (2 * this._padding);
    }
    get left(): number {
        return Math.min(this.domLineSegment.p0.left, this.domLineSegment.p1.left);
    }
    get top(): number {
        return Math.min(this.domLineSegment.p0.top, this.domLineSegment.p1.top);
    }
    get x0(): number {
        return Math.min(this.domLineSegment.p0.left, this.domLineSegment.p1.left) - this._padding;
    }
    get y0(): number {
        return Math.min(this.domLineSegment.p0.top, this.domLineSegment.p1.top) - this._padding;
    }
    get x1(): number {
        return this.domLineSegment.p0.left - this.x0;
    }
    get y1(): number {
        return this.domLineSegment.p0.top - this.y0;
    }
    get x2(): number {
        return this.domLineSegment.p1.left - this.x0;
    }
    get y2(): number {
        return this.domLineSegment.p1.top - this.y0;
    }

    @Input() domLineSegment: DOMLineSegment;
}
