import { OpaqueToken, TemplateRef } from '@angular/core';

export interface ExpressionNodeComponent {
    nodeDivTemplate: TemplateRef<void>;
    childNodes: ExpressionNodeComponent[];
}

export let EXPRESSION_NODE_COMPONENT = new OpaqueToken('EXPRESSION_NODE_COMPONENT');

