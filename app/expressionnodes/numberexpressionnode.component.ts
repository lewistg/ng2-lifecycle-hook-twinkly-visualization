import { Component, ElementRef, Input, TemplateRef, ViewChild } from '@angular/core';

import { ExpressionNodeComponent, EXPRESSION_NODE_COMPONENT } from './expressionnode.component';

import { Expression, NumberExpression } from '../expression';

@Component({
    selector: 'number-expression-node',
    template:  `
        <template #nodeDivTemplate>
            <flash-node #nodeElementRef>
                <div #nodeDiv>
                    <select [(ngModel)]="expression.value">
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
    providers: [{provide: EXPRESSION_NODE_COMPONENT, useExisting: NumberExpressionNodeComponent}]
})
export class NumberExpressionNodeComponent implements ExpressionNodeComponent  {
    @Input() expression: Expression = new NumberExpression(0);
    @ViewChild('nodeDivTemplate') nodeDivTemplate: TemplateRef<void>;
    @ViewChild('nodeElementRef', {read: ElementRef}) nodeElementRef: ElementRef;
    readonly childNodes: ExpressionNodeComponent[] = [];
}
