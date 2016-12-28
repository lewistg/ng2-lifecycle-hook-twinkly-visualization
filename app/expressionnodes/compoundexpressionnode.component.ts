import { 
    OnChanges,
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
import { CompoundExpression, Expression, NumberExpression, Operator } from '../expression';

@Component({
    selector: 'compound-expression-node',
    template: `
        <template #nodeDivTemplate>
            <flash-node #nodeElementRef>
                <select>
                   <option>+</option>
                   <option>-</option>
                   <option>*</option>
                </select> 
            </flash-node>
        </template>
        <expression-node
            #leftExpressionNode
            [(expression)]="leftExpression"
        ></expression-node>
        <expression-node
            #rightExpressionNode
            [(expression)]="rightExpression"
        ></expression-node>
    `,
    styles: [`
        .node-div {
            display: flex;
            position: relative;
        }
        select {
            background-color: rgba(255, 255, 255, 0);
            font-size: 20px;
            border: none;
        }
    `],
    providers: [{provide: EXPRESSION_NODE_COMPONENT, useExisting: CompoundExpressionComponent}]
})
export class CompoundExpressionComponent implements ExpressionNodeComponent, OnChanges {
    @Output() expressionChange: EventEmitter<Expression> = new EventEmitter<Expression>(false);

    private _expression: CompoundExpression = new CompoundExpression(new NumberExpression(0), Operator.ADD, new NumberExpression(0)); 
    @Input() set expression(value: CompoundExpression) {
        this._expression = value;
        this.expressionChange.emit(this._expression);
    }
    get expression(): CompoundExpression {
        return this._expression;
    }

    get leftExpression(): Expression {
        return this._expression.left;
    }
    set leftExpression(expression: Expression) {
        this.expression = this.expression.setLeftExpression(expression);
    }

    get rightExpression(): Expression {
        return this._expression.right;
    }
    set rightExpression(expression: Expression) {
        this.expression = this.expression.setRightExpression(expression);
    }

    @ViewChild('nodeDivTemplate') nodeDivTemplate: TemplateRef<void>;
    @ViewChild('nodeElementRef', {read: ElementRef}) nodeElementRef: ElementRef;
    @ViewChildren('leftExpressionNode, rightExpressionNode', {read: EXPRESSION_NODE_COMPONENT}) childExpressions: QueryList<ExpressionNodeComponent>;

    get childNodes(): ExpressionNodeComponent[] {
        if (!!this.childExpressions) {
            return this.childExpressions.toArray();
        } else {
            return [];
        }
    }

    ngOnChanges() {
        console.log('changed!');
    }
}
