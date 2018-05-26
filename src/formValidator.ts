namespace dilu {

    export type InputElement = HTMLElement & { name: string, value: string } | HTMLAreaElement;

    // export const errorClassName = 'validateMessage';

    export type ValidateField = {
        // element: InputElement | (() => InputElement),
        name: string,
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
        private form: HTMLElement;
        private fields: ValidateField[];
        constructor(form: HTMLElement, ...fields: ValidateField[]) {
            this.fields = fields;
            this.form = form;
        }

        clearErrors() {
            this.fields.map(o => o.errorElement)
                .filter(o => o != null)
                .forEach(o => o.style.display = 'none');
        }

        clearElementError(name: string) {
            if (!name) throw errors.argumentNull('element');
            let fields = this.fields.filter(o => o.name == name);
            for (let field of fields) {
                let errorElement = this.fieldErrorElement(field);
                errorElement.style.display = 'none';
            }
        }

        private fieldElement(field: ValidateField): InputElement {
            let name = field.name;
            let element = this.form.querySelectorAll(`[name='${name}']`)[0] as InputElement;
            if (element == null)
                throw errors.elementNotExists(name);

            return element;
        }

        private fieldErrorElement(field: ValidateField): HTMLElement {
            if (field.errorElement) {
                return field.errorElement;
            }

            let element = this.fieldElement(field);

            // let element = typeof self.element == 'function' ? self.element() : self.element;
            // if (element == null) {
            //     throw errors.fieldElementCanntNull(i);
            // }

            let errorElement = field.errorElement = document.createElement("span");
            errorElement.className = FormValidator.errorClassName;
            errorElement.style.display = 'none';

            if (element.nextSibling)
                element.parentElement.insertBefore(errorElement, element.nextSibling);
            else
                element.parentElement.appendChild(errorElement);

            return errorElement;
        }

        async check() {
            let ps = new Array<Promise<any>>();
            for (let i = 0; i < this.fields.length; i++) {
                let field = this.fields[i];
                if (field.condition && field.condition() == false)
                    continue;

                let element = this.fieldElement(field);
                element.addEventListener('change', () => {
                    this.checkField(field);
                });

                let p = this.checkField(field);
                ps.push(p);
            }

            let checkResults = await Promise.all(ps);
            let result = checkResults.filter(o => o == false).length == 0;
            return result;
        };

        private async checkField(field: ValidateField): Promise<boolean> {

            let depends = field.depends || [];
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

                let element = this.fieldElement(field); //typeof field.element == 'function' ? field.element() : field.element;
                if (element == null)
                    throw errors.fieldElementCanntNull();

                let value = FormValidator.elementValue(element);
                let p = rule.validate(value);

                if (typeof p == 'boolean') {
                    p = Promise.resolve(p);
                }

                let isPass = await p;
                // result = isPass == false ? false : result;

                let errorElement = this.fieldErrorElement(field); //field.getErrorElement();
                console.assert(errorElement != null, 'errorElement cannt be null.');
                if (rule.error != null) {
                    errorElement = field.errorElement;
                    let name = this.elementName(element);
                    errorElement.innerHTML = rule.error.replace('%s', name);
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

        checkElement(name: string): Promise<boolean> {
            // if (!inputElement) throw errors.argumentNull('inputElement');
            let field = this.fields.filter(o => o.name == name)[0];
            if (!field)
                throw errors.elementNotExists(name); //errors.elementValidateRuleNotSet(inputElement);

            return this.checkField(field);
        }

        static elementValue(element: InputElement): string {
            if (element.tagName == "TEXTAREA") {
                return (element as any).value;
            }

            return (element as HTMLInputElement).value;
        }

        private elementName(element: InputElement) {
            if (element.tagName == "TEXTAREA") {
                return (element as any).name;
            }

            return (element as HTMLInputElement).name
        }
    }
}