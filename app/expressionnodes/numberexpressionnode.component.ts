import { 
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    TemplateRef,
    ViewChild,
} from '@angular/core';

import { ExpressionNodeComponent, EXPRESSION_NODE_COMPONENT } from './expressionnode.component';

import { Expression, NumberExpression } from '../expression';

@Component({
    selector: 'number-expression-node',
    template:  `
        <template #nodeDivTemplate>
            <flash-node #nodeElementRef>
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
            </flash-node>
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
export class NumberExpressionNodeComponent implements ExpressionNodeComponent, OnChanges  {
    @Output() expressionChange: EventEmitter<Expression> = new EventEmitter<Expression>(false);
    @Input() expression: NumberExpression = new NumberExpression(0);

    get value(): number {
        return this.expression.value;
    }
    set value(value: number) {
        this.expression = this.expression.setValue(value);
        this.expressionChange.emit(this.expression);
    }

    @ViewChild('nodeDivTemplate') nodeDivTemplate: TemplateRef<void>;
    @ViewChild('nodeElementRef', {read: ElementRef}) nodeElementRef: ElementRef;
    readonly childNodes: ExpressionNodeComponent[] = [];

    ngOnChanges() {
        console.log('here!');
    }
}
