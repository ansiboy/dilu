namespace dilu {

    export type InputElement = HTMLElement & { name: string, value: string };

    // export const errorClassName = 'validateMessage';

    export type ValidateField = {
        element: InputElement,
        rules: Rule[],
        errorElement?: HTMLElement,
        depends?: ((() => Promise<boolean>) | (() => boolean))[],
        condition?: () => boolean,
    };

    export class FormValidator {
        static errorClassName = 'validateMessage';

        private fields: ValidateField[];
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

                let errorElement: HTMLElement = fields[i].errorElement;
                if (errorElement == null) {
                    errorElement = document.createElement("span");
                    errorElement.className = FormValidator.errorClassName;
                    if (element.nextSibling)
                        element.parentElement.insertBefore(errorElement, element.nextSibling);
                    else
                        element.parentElement.appendChild(errorElement);

                    fields[i].errorElement = errorElement;
                }

                errorElement.style.display = 'none';

                fields[i].depends = fields[i].depends || [];
            }

            fields.forEach(o => this.fields.push(o));
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

        private async checkField(field: ValidateField): Promise<boolean> {

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
                let p = rule.validate(field.element.value);
                if (typeof p == 'boolean') {
                    p = Promise.resolve(p);
                }

                let isPass = await p;
                // result = isPass == false ? false : result;

                let errorElement: HTMLElement;
                if (typeof rule.error == 'string') {
                    errorElement = field.errorElement;
                    errorElement.innerHTML = rule.error.replace('%s', field.element.name);
                }
                else {
                    errorElement = rule.error;
                }

                console.assert(errorElement != null, 'errorElement cannt be null.');

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