import { Component, Input, TemplateRef, ViewChild } from '@angular/core';

import { ExpressionNodeComponent, EXPRESSION_NODE_COMPONENT } from './expressionnode.component';

import { Expression } from '../expression';

@Component({
    selector: 'number-expression-node',
    template:  `
        <div>Here</div>
        <template #nodeDivTemplate>
            <div #nodeDiv>
                <select>
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
        </template>
    `,
    providers: [{provide: EXPRESSION_NODE_COMPONENT, useExisting: NumberExpressionNodeComponent}]
})
export class NumberExpressionNodeComponent implements ExpressionNodeComponent  {
    @Input() expression: Expression;
    @ViewChild('nodeDivTemplate') nodeDivTemplate: TemplateRef<void>;
    readonly childNodes: ExpressionNodeComponent[] = [];

    /*ngAfterViewInit() {
        debugger;
        console.log('here');
    }*/
}
