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

    setRightExpression(right: Expression): CompoundExpression {
        return new CompoundExpression(this.left, this.operator, right);
    }

    setLeftExpression(left: Expression): CompoundExpression {
        return new CompoundExpression(left, this.operator, this.right);
    }

    setOperator(operator: Operator): CompoundExpression {
        return new CompoundExpression(this.left, operator, this.right);
    }
}

export class NumberExpression implements Expression {
    constructor(public value: number = 0) {}

    setValue(value: number): NumberExpression {
        return new NumberExpression(value);
    }
}

