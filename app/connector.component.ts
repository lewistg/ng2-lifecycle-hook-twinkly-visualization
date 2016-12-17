import { Component, ElementRef, Input } from '@angular/core';

interface DOMLocation {
    top: number,
    left: number
}

@Component({
    selector: 'connector',
    template: `
        <template [ngIf]="bothConnectionPointsSet">
            <svg
                [style.left.px]="parentConnectionPoint.left"
                [style.top.px]="parentConnectionPoint.top"
                [attr.width]="width"
                [attr.height]="height"
            >
                <line
                    [attr.x1]="0"
                    [attr.y1]="0"
                    [attr.x2]="width"
                    [attr.y2]="height"
                    style="stroke:rgb(255, 0, 0); stroke-width:2"
                ></line>
            </svg>
        </template>
    `,
    styles: [`
        svg {
            position: fixed;
        }
    `]
})
export class ConnectorComponent {
    @Input() parentNode: ElementRef;
    @Input() childNode: ElementRef;

    parentConnectionPoint: DOMLocation;
    childConnectionPoint: DOMLocation;

    get bothConnectionPointsSet(): boolean {
        return !!this.parentConnectionPoint && !!this.childConnectionPoint;
    }

    get width(): number {
        return (this.bothConnectionPointsSet ? Math.abs(this.parentConnectionPoint.left - this.childConnectionPoint.left) : 0);
    }

    get height(): number {
        console.log('height', Math.abs(this.parentConnectionPoint.top - this.childConnectionPoint.top));
        return (this.bothConnectionPointsSet ? Math.abs(this.parentConnectionPoint.top - this.childConnectionPoint.top) : 0);
    }

    ngDoCheck() {
        if (!!this.parentNode) {
            let parentRect = this.parentNode.nativeElement.getBoundingClientRect();
            this.parentConnectionPoint = {
                top: parentRect.top + parentRect.height,
                left: parentRect.left + (parentRect.width / 2)
            }
            console.log('set parent');
        }
        if (!!this.childNode) {
            let childRect = this.childNode.nativeElement.getBoundingClientRect();
            this.childConnectionPoint = {
                top: childRect.top,
                left: childRect.left + (childRect.width / 2)
            }
            console.log('set child');
        }
        //console.log('connector', this.parentNode, this.childNode);
        console.log('connector', this.bothConnectionPointsSet);
    }
}
