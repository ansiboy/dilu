declare namespace dilu {
    let errors: {
        argumentNull(parameterName: any): Error;
        ruleNotExists(name: string): Error;
        elementValidateRuleNotSet(element: HTMLInputElement): Error;
        fieldElementCanntNull(fieldIndex: any): Error;
    };
}
declare namespace dilu {
    type InputElement = HTMLElement & {
        name: string;
        value: string;
    };
    type ValidateField = {
        element: InputElement;
        rules: Rule[];
        errorElement?: HTMLElement;
        depends?: ((() => Promise<boolean>) | (() => boolean))[];
    };
    class FormValidator {
        private fields;
        constructor(...fields: ValidateField[]);
        clearErrors(): void;
        clearElementError(element: HTMLInputElement): void;
        check(): Promise<boolean>;
        private checkField(field);
        checkElement(inputElement: HTMLInputElement): Promise<boolean>;
    }
}
declare namespace dilu {
    type RuleError = string | HTMLElement;
    type Validate = (value) => boolean | Promise<boolean>;
    type RuleDepend = Rule | (() => boolean);
    type Rule = {
        validate: (value) => boolean | Promise<boolean>;
        error?: RuleError;
    };
    let rules: {
        required(error?: RuleError, depends?: RuleDepend[]): Rule;
        matches: (otherElement: InputElement, error?: RuleError) => Rule;
        email: (error?: RuleError) => Rule;
        minLength: (length: number, error?: RuleError) => Rule;
        maxLength: (length: number, error?: RuleError) => Rule;
        greaterThan: (value: number | Date, error: RuleError) => Rule;
        lessThan: (value: string | number | Date, error: RuleError) => Rule;
        equal: (value: string | number | Date, error?: RuleError) => Rule;
        ip: (error: RuleError) => Rule;
        url: (error?: RuleError) => Rule;
        mobile: (error?: RuleError) => Rule;
    };
}
