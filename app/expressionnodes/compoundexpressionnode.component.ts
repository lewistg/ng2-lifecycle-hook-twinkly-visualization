import { 
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    QueryList,
    TemplateRef,
    ViewChild,
    ViewChildren 
} from '@angular/core';

import { ExpressionNodeComponent, EXPRESSION_NODE_COMPONENT } from './expressionnode.component';
import { CompoundExpression, Expression } from '../expression';

@Component({
    selector: 'compound-expression-node',
    template: `
        <template #nodeDivTemplate>
            <div
                #nodeDiv
                class="node-box"
                [style.margin-left.px]="padding"
                [style.margin-right.px]="padding"
            >
                <select>
                   <option>+</option>
                   <option>-</option>
                   <option>*</option>
                </select> 
                <canvas #flashCanvas width="40" height="40"></canvas>
            </div>
        </template>
        <expression-node
            #leftExpression
            [(expression)]="expression && expression.left"
        ></expression-node>
        <expression-node
            #rightExpression
            [(expression)]="expression && expression.right"
        ></expression-node>
    `,
    providers: [{provide: EXPRESSION_NODE_COMPONENT, useExisting: CompoundExpressionComponent}]
})
export class CompoundExpressionComponent implements ExpressionNodeComponent {
    @Output() expressionChange: EventEmitter<Expression> = new EventEmitter<Expression>(false);

    private _expression: Expression; 
    @Input() set expression(value: Expression) {
        this._expression = value;
        this.expressionChange.emit();
    }
    get expression(): Expression {
        return this._expression;
    }

    @ViewChild('nodeDivTemplate') nodeDivTemplate: TemplateRef<void>;
    @ViewChild('nodeDiv') nodeDiv: ElementRef;
    @ViewChildren('leftExpression, rightExpression', {read: EXPRESSION_NODE_COMPONENT}) childExpressions: QueryList<ExpressionNodeComponent>;

    get childNodes(): ExpressionNodeComponent[] {
        if (!!this.childExpressions) {
            return this.childExpressions.toArray();
        } else {
            return [];
        }
    }

    /*ngAfterViewInit() {
        debugger;
        console.log(this);
    }*/
}
