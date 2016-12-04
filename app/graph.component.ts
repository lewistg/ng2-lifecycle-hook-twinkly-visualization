import { Component, Input } from '@angular/core';

@Component({
    selector: 'graph',
    template: `
        <div>Graph</div>
        <div *ngFor="let level of levels">level</div>
    `,
    styles: [`
    `]
})
export class GraphComponent {
    levels: number[];
    @Input() set numLevels(value: number) {
        this.levels = new Array(value);
    }
    get numLevels() {
        return this.levels.length;
    }
}
