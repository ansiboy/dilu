namespace dilu {

    export type InputElement = HTMLElement & { name: string, value: string };

    // export const errorClassName = 'validateMessage';

    export type ValidateField = {
        element: InputElement | (() => InputElement),
        rules: Rule[],
        errorElement?: HTMLElement,
        depends?: ((() => Promise<boolean>) | (() => boolean))[],
        condition?: () => boolean,
    };

    // type InnerValidateField = {
    //     element: () => InputElement,
    //     rules: Rule[],
    //     errorElement?: HTMLElement,
    //     depends?: ((() => Promise<boolean>) | (() => boolean))[],
    //     condition?: () => boolean,
    // }
    type InnerValidateField = ValidateField & { getErrorElement: () => HTMLElement };
    export class FormValidator {
        static errorClassName = 'validationMessage';

        private fields: InnerValidateField[];
        constructor(...fields: ValidateField[]) {
            this.fields = [];
            this.addFields(...fields);
        }


        addFields(...fields: ValidateField[]) {
            for (let i = 0; i < fields.length; i++) {

                let element = fields[i].element;
                if (element == null) {
                    throw errors.fieldElementCanntNull(i);
                }

                let f: InnerValidateField = Object.assign(fields[i], {
                    getErrorElement: function () {
                        let self = this as ValidateField;
                        if (self.errorElement == null) {
                            let element = typeof self.element == 'function' ? self.element() : self.element;
                            if (element == null) {
                                throw errors.fieldElementCanntNull(i);
                            }

                            let errorElement = self.errorElement = document.createElement("span");
                            errorElement.className = FormValidator.errorClassName;
                            errorElement.style.display = 'none';

                            if (element.nextSibling)
                                element.parentElement.insertBefore(errorElement, element.nextSibling);
                            else
                                element.parentElement.appendChild(errorElement);
                        }
                        return self.errorElement;
                    }
                })
                // let errorElement: HTMLElement = fields[i].errorElement;
                // if (errorElement == null) {
                //     errorElement = document.createElement("span");
                //     errorElement.className = FormValidator.errorClassName;
                //     if (element.nextSibling)
                //         element.parentElement.insertBefore(errorElement, element.nextSibling);
                //     else
                //         element.parentElement.appendChild(errorElement);

                //     fields[i].errorElement = errorElement;
                // }
                fields[i].depends = fields[i].depends || [];
                this.fields.push(f);
            }

            // fields.forEach(o => this.fields.push(o));
        }

        clearErrors() {
            this.fields.map(o => o.errorElement).forEach(o => o.style.display = 'none');
        }

        clearElementError(element: HTMLInputElement) {
            if (element == null) throw errors.argumentNull('element');
            let field = this.fields.filter(o => o.element == element)[0];
            if (field)
                field.errorElement.style.display = 'none';
        }

        async  check() {
            let ps = new Array<Promise<any>>();
            for (let i = 0; i < this.fields.length; i++) {
                let field = this.fields[i];
                if (field.condition && field.condition() == false)
                    continue;

                let p = this.checkField(field);
                ps.push(p);
            }

            let checkResults = await Promise.all(ps);
            let result = checkResults.filter(o => o == false).length == 0;
            return result;
        };

        private async checkField(field: InnerValidateField): Promise<boolean> {

            let depends = field.depends;
            console.assert(depends != null, 'depends is null');

            for (let j = 0; j < depends.length; j++) {
                let dependResult = depends[j]();
                if (typeof dependResult == 'boolean') {
                    dependResult = Promise.resolve(dependResult);
                }

                let dependIsOK = await dependResult;
                if (!dependIsOK)
                    return false;
            }

            // let result = true;
            let ps = new Array<Promise<any>>();
            for (let j = 0; j < field.rules.length; j++) {
                let rule = field.rules[j];
                let element = typeof field.element == 'function' ? field.element() : field.element;
                if (element == null)
                    throw errors.fieldElementCanntNull();

                let p = rule.validate(element.value);
                if (typeof p == 'boolean') {
                    p = Promise.resolve(p);
                }

                let isPass = await p;
                // result = isPass == false ? false : result;

                let errorElement = field.getErrorElement();
                console.assert(errorElement != null, 'errorElement cannt be null.');

                if (rule.error != null) {
                    errorElement.innerHTML = rule.error.replace('%s', field.element.name);
                }

                if (isPass == false) {
                    errorElement.style.removeProperty('display');
                }
                else {
                    errorElement.style.display = 'none';
                }

                if (!isPass)
                    return false;
            }

            return true;
        }

        checkElement(inputElement: HTMLInputElement): Promise<boolean> {
            if (!inputElement) throw errors.argumentNull('inputElement');
            let field = this.fields.filter(o => o.element == inputElement)[0];
            if (!field)
                throw errors.elementValidateRuleNotSet(inputElement);

            return this.checkField(field);
        }
    }
}