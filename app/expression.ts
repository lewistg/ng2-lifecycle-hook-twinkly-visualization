export enum Operator {
    ADD,
    SUBTRACT,
    MULTIPLY
}

export interface Expression {
    value: number;
}

export class CompoundExpression implements Expression {
    constructor(
        public left: Expression,
        public operator: Operator,
        public right: Expression
    ) {}

    get value(): number {
        switch(this.operator) {
            case Operator.ADD:
                return this.left.value + this.right.value;
            case Operator.SUBTRACT:
                return this.left.value - this.right.value;
            case Operator.MULTIPLY:
                return this.left.value * this.right.value;
            default:
                return 0;
        }
    }
}

export class NumberExpression implements Expression {
    constructor(public value: number = 0) {}
}

