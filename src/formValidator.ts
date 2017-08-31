namespace dilu {

    export interface ValidateField {
        rule: Rule,
        display?: string,
        message?: string,
        depends?: (HTMLInputElement | (() => boolean))[]
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
            for (let i = 0; i < this.fields.length; i++) {
                let field = this.fields[i];
                let depends = field.depends || [];
                for (let j = 0; j < depends.length; j++) {
                    let dependIsOK: boolean;
                    if (typeof depends[j] == 'function') {
                        dependIsOK = (depends[i] as Function)();
                    }
                    else {
                        dependIsOK = this.checkElement(depends[j] as HTMLInputElement);
                    }

                    if (!dependIsOK)
                        return false;
                }

                if (!this.fields[i].rule.check())
                    return false;
            }

            return true;

        };

        checkElement(element: HTMLInputElement): boolean {
            let itemValidators = this.getElementValidators(element);


            if (itemValidators.length == 0)
                throw errors.elementValidateRuleNotSet(element);

            var checkFails = itemValidators.map(o => o.check()).filter(chechSuccess => !chechSuccess);
            return checkFails.length == 0;
        }

        private getElementValidators(element: HTMLElement) {
            return this.fields.map(o => o.rule).filter(o => o.element == element);
        }
    }
}