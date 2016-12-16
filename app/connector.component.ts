import { Component, ElementRef, Input } from '@angular/core';

interface DOMLocation {
    top: number,
    left: number
}

@Component({
    selector: 'connector'
    template: `
        <svg></svg>
    `
})
export class ConnectorComponent {
    @Input() parentNode: ElementRef;
    @Input() childNode: ElementRef;

    parentConnectionPoint: DOMLocation;
    childConnectionPoint: DOMLocation;

    ngOnChanges() {
        if (!this.parentConnectionPoint && !!this.parentNode) {
            let parentRect = this.parentNode.nativeElement.getBoundingClientRect();
            this.parentConnectionPoint = {
                top: parentRect.top + parentRect.height,
                left: parentRect.left + (parentRect.width / 2)
            }
        }
        if (!this.childConnectionPoint && !!this.childConnectionPoint) {
            let childRect = this.childNode.nativeElement.getBoundingRect();
            this.childConnectionPoint = {
                top: childRect.top,
                left: childRect.left + (childRect.width / 2)
            }
        }
        console.log('connector', this.parentNode, this.childNode);
    }
}
