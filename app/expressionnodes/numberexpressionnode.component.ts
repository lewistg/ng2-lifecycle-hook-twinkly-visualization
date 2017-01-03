import { 
    AfterViewChecked,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    TemplateRef,
    ViewChild,
} from '@angular/core';

import { Expression, NumberExpression } from '../expression';
import { ExpressionNodeComponent, EXPRESSION_NODE_COMPONENT } from './expressionnode.component';
import { FlashLog } from '../model/flashlog';
import { FlashLogPlayback } from '../model/flashlogplayback';
import { FlasherComponent } from '../view/flasher/flasher.component';
import { NgOnChangesCalled, NgAfterViewChecked } from '../view/flashlogentries';

@Component({
    selector: 'number-expression-node',
    template:  `
        <template #nodeDivTemplate>
            <ng-lifecylce-hook-flasher #nodeElementRef>
                <div #nodeDiv>
                    <select [(ngModel)]="value">
                        <option>0</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                    </select>
                </div>
            </ng-lifecylce-hook-flasher>
        </template>
    `,
    providers: [{provide: EXPRESSION_NODE_COMPONENT, useExisting: NumberExpressionNodeComponent}],
    styles: [`
        select {
            background-color: rgba(255, 255, 255, 0);
            font-size: 16px;
            border: none;
        }
    `]
})
export class NumberExpressionNodeComponent implements AfterViewChecked, ExpressionNodeComponent, OnChanges  {
    @Output() expressionChange: EventEmitter<Expression> = new EventEmitter<Expression>(false);
    @Input() expression: NumberExpression = new NumberExpression(0);

    get value(): string {
        return this.expression.value.toString();
    }
    set value(value: string) {
        if (this.value.toString() === value) {
            return;
        }
        this.expression = this.expression.setValue(parseInt(value, 10));
        this.expressionChange.emit(this.expression);
    }

    @ViewChild('nodeDivTemplate') nodeDivTemplate: TemplateRef<void>;
    @ViewChild('nodeElementRef', {read: ElementRef}) nodeElementRef: ElementRef;
    @ViewChild(FlasherComponent) flasher: FlasherComponent;
    readonly childNodes: ExpressionNodeComponent[] = [];

    constructor(private _log: FlashLog, private _logPlayback: FlashLogPlayback) { }

    ngAfterViewChecked() {
        if (!!this.flasher) {
            this._log.log(new NgAfterViewChecked(this.flasher), !this._logPlayback.isPlayingBack);
        }
    }

    ngOnChanges() {
        if (!!this.flasher) {
            this._log.log(new NgOnChangesCalled(this.flasher), !this._logPlayback.isPlayingBack);
        }
    }
}
