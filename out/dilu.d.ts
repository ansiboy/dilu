declare namespace dilu {
    interface ValidateField {
        rule: Rule;
        display?: string;
        message?: string;
        depends?: (HTMLInputElement | (() => boolean))[];
    }
}
declare namespace dilu {
    let errors: {
        argumentNull(parameterName: any): Error;
        ruleNotExists(name: string): Error;
        elementValidateRuleNotSet(element: HTMLInputElement): Error;
    };
}
declare namespace dilu {
    interface ValidateField {
        rule: Rule;
        display?: string;
        message?: string;
        depends?: (HTMLInputElement | (() => boolean))[];
    }
    class FormValidator {
        private fields;
        constructor(...fields: ValidateField[]);
        clearErrors(): void;
        clearElementError(element: HTMLInputElement): void;
        check(): boolean;
        checkElement(element: HTMLInputElement): boolean;
        private getElementValidators(element);
    }
}
declare namespace dilu {
    class Rule {
        private _validate;
        private _element;
        private _errorElement;
        private _errorMessage;
        constructor(element: HTMLInputElement, validate: (value: string) => boolean, errorMessage: string);
        readonly element: HTMLInputElement;
        readonly errorElement: HTMLElement;
        readonly errorMessage: string;
        check(): boolean;
        showError(): void;
        hideError(): void;
    }
}
declare namespace dilu {
    type Options = {
        display?: string;
        message?: string;
    };
    let rules: {
        required: (element: HTMLInputElement, options?: Options) => Rule;
        matches: (element: HTMLInputElement, otherElement: HTMLInputElement, options?: Options) => Rule;
        email: (element: HTMLInputElement, options?: Options) => Rule;
        minLength: (element: HTMLInputElement, length: number, options?: Options) => Rule;
        maxLength: (element: HTMLInputElement, length: number, options?: Options) => Rule;
        greaterThan: (element: HTMLInputElement, value: number | Date, options: Options) => Rule;
        lessThan: (element: HTMLInputElement, value: string | number | Date, options: Options) => Rule;
        equal: (element: HTMLInputElement, value: string | number | Date, options?: Options) => Rule;
        ip: (element: HTMLInputElement, options: Options) => Rule;
        url: (element: HTMLInputElement, options?: Options) => Rule;
        mobile: (element: HTMLInputElement, options?: Options) => {
            name: string;
            element: HTMLInputElement;
            display: string;
            messages: {
                'mobile': string;
            };
            rules: string[];
        };
    };
}
