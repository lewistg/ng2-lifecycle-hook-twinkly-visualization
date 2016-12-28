import { Component, ElementRef, EventEmitter, Input, OpaqueToken, Output, TemplateRef, ViewChild } from '@angular/core';

import { ExpressionNodeComponent, EXPRESSION_NODE_COMPONENT } from './expressionnode.component';
import { CompoundExpressionComponent } from './compoundexpressionnode.component';
import { CompoundExpression, NumberExpression, Expression } from '../expression';

@Component({
    selector: 'expression-node',
    template: `
        <template [ngIf]="isCompoundExpression">
            <compound-expression-node 
                #node
                [expression]="expression"
            ></compound-expression-node>
        </template>
        <template [ngIf]="isNumberExpression">
            <number-expression-node
                #node
                [expression]="expression"
            ></number-expression-node>
        </template>
    `,
    providers: [{provide: EXPRESSION_NODE_COMPONENT, useExisting: GenericExpressionNodeComponent}]
})
export class GenericExpressionNodeComponent implements ExpressionNodeComponent {
    private _expression: Expression;
    @Input() get expression(): Expression {
        return this._expression;
    }
    set expression(value: Expression) {
        this._expression = value;
    }
    @Output() expressionChange: EventEmitter<Expression> = new EventEmitter<Expression>(false);
    @ViewChild('node', {read: EXPRESSION_NODE_COMPONENT}) node: ExpressionNodeComponent;

    get nodeDivTemplate(): TemplateRef<void> {
        if (!!this.node) {
            return this.node.nodeDivTemplate;
        }
    }

    get nodeElementRef(): ElementRef {
        if (!!this.node) {
            return this.node.nodeElementRef;
        }
    }

    get childNodes(): ExpressionNodeComponent[] {
        if (!!this.node) {
            return this.node.childNodes || [];
        } else {
            return [];
        }
    }

    get isCompoundExpression(): boolean {
        return this.expression instanceof CompoundExpression;
    }

    get isNumberExpression(): boolean {
        return this.expression instanceof NumberExpression;
    }

    constructor(public elementRef: ElementRef) {}
}
