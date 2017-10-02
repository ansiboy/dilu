namespace dilu {



    export interface ValidateField {
        rule: Rule,
        display?: string,
        message?: string,
        depends?: (HTMLElement | (() => boolean))[],
        errorElement?: HTMLElement
    }

    export class FormValidator {
        private fields: ValidateField[];
        constructor(...fields: ValidateField[]) {
            this.fields = fields;
        }

        clearErrors() {
            this.fields.map(o => o.rule).forEach(o => o.hideError());
        }

        clearElementError(element: HTMLInputElement) {
            if (element == null) throw errors.argumentNull('element');

            this.fields
                .filter(o => o.rule.element == element)
                .forEach(o => o.rule.hideError());
        }

        check() {
            var result = true;
            for (let i = 0; i < this.fields.length; i++) {
                let field = this.fields[i];
                let depends = field.depends || [];

                let dependIsOK = true;
                for (let j = 0; j < depends.length; j++) {
                    if (typeof depends[j] == 'function') {
                        dependIsOK = (depends[j] as Function)();
                    }
                    else {
                        dependIsOK = this.checkElement(depends[j] as HTMLInputElement);
                    }
                }

                result = dependIsOK ? this.fields[i].rule.check() : false;
            }

            return result;

        };

        checkElement(inputElement: HTMLInputElement): boolean {
            let itemValidators = this.getElementValidators(inputElement);

            if (itemValidators.length == 0)
                throw errors.elementValidateRuleNotSet(inputElement);

            var checkFails = itemValidators.map(o => o.check()).filter(chechSuccess => !chechSuccess);
            return checkFails.length == 0;
        }

        private getElementValidators(element: HTMLElement) {
            return this.fields.map(o => o.rule).filter(o => o.element == element);
        }
    }
}