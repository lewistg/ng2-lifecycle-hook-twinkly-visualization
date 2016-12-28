import { 
    AfterViewChecked,
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

import { ComponentNodeLifecycleLog, LifecycleHook } from '../componentnodelifecyclehooklog';
import { ExpressionNodeComponent, EXPRESSION_NODE_COMPONENT } from './expressionnode.component';
import { CompoundExpression, Expression, NumberExpression, Operator } from '../expression';
import { NgLifecycleHookFlasher } from '../flashnode.component';

@Component({
    selector: 'compound-expression-node',
    template: `
        <template #nodeDivTemplate>
            <div class="node-wrapper">
                <div class="expression-value">{{expression.value}}</div>
                <ng-lifecylce-hook-flasher #nodeElementRef>
                    <select [(ngModel)]="operator">
                       <option value="{{operators.ADD}}">+</option>
                       <option value="{{operators.SUBTRACT}}">-</option>
                       <option value="{{operators.MULTIPLY}}">*</option>
                    </select> 
                </ng-lifecylce-hook-flasher>
            </div>
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
        .node-wrapper {
            position: relative;
        }
        select {
            background-color: rgba(255, 255, 255, 0);
            font-size: 20px;
            border: none;
        }
        .expression-value {
            font-size: 10px;
            position: relative;
            top: 8px;
            left: 100%;
            font-family: Arial, sans-serif;
            color: gray;
        }
    `],
    providers: [{provide: EXPRESSION_NODE_COMPONENT, useExisting: CompoundExpressionComponent}]
})
export class CompoundExpressionComponent implements AfterViewChecked, ExpressionNodeComponent, OnChanges {
    operators = Operator;

    @Output() expressionChange: EventEmitter<Expression> = new EventEmitter<Expression>(false);

    private _expression: CompoundExpression = new CompoundExpression(new NumberExpression(0), Operator.ADD, new NumberExpression(0)); 
    @Input() set expression(value: CompoundExpression) {
        if (this._expression === value) {
            return;
        }
        this._expression = value;
        this.expressionChange.emit(this._expression);
    }
    get expression(): CompoundExpression {
        return this._expression;
    }

    get operator(): string {
        return this._expression.operator.toString();
    }
    set operator(value: string) {
        this.expression = this.expression.setOperator(parseInt(value, 10));
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
    @ViewChild(NgLifecycleHookFlasher) flasher: NgLifecycleHookFlasher;
    @ViewChildren('leftExpressionNode, rightExpressionNode', {read: EXPRESSION_NODE_COMPONENT}) childExpressions: QueryList<ExpressionNodeComponent>;

    get childNodes(): ExpressionNodeComponent[] {
        if (!!this.childExpressions) {
            return this.childExpressions.toArray();
        } else {
            return [];
        }
    }

    constructor(private _log: ComponentNodeLifecycleLog) { }

    ngAfterViewChecked() {
        if (!!this.flasher) {
            this._log.log({
                flasher: this.flasher,
                lifecycleHook: LifecycleHook.NG_AFTER_VIEW_CHECKED
            });
        }
    }

    ngOnChanges() {
        if (!!this.flasher) {
            this._log.log({
                flasher: this.flasher,
                lifecycleHook: LifecycleHook.NG_ON_CHANGES
            });
        }
    }
}
