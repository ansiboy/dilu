namespace dilu {

    export type InputElement = HTMLElement & { name: string, value: string } | HTMLAreaElement;

    export type ValidateField = {
        name: string,
        rules: Rule[],
        errorElement?: HTMLElement,
        depends?: ((() => Promise<boolean>) | (() => boolean))[],
        condition?: () => boolean,
    };

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
            let errorElement = field.errorElement = document.createElement("span");
            errorElement.className = FormValidator.errorClassName;
            errorElement.style.display = 'none';

            if (element.nextSibling)
                element.parentElement.insertBefore(errorElement, element.nextSibling);
            else
                element.parentElement.appendChild(errorElement);

            return errorElement;
        }

        /**
         * 验证字段
         */
        check(): boolean {
            let ps = new Array<boolean>();
            for (let i = 0; i < this.fields.length; i++) {
                let field = this.fields[i];
                if (field.condition && field.condition() == false)
                    continue;

                let element = this.fieldElement(field);
                element.addEventListener('keyup', () => {
                    this.checkField(field);
                });

                let p = this.checkField(field);
                ps.push(p);
            }

            let result = ps.filter(o => o == false).length == 0;
            return result;
        };

        /**
         * 异步验证字段
         */
        async checkAsync(): Promise<boolean> {
            let ps = new Array<Promise<any>>();
            for (let i = 0; i < this.fields.length; i++) {
                let field = this.fields[i];
                if (field.condition && field.condition() == false)
                    continue;

                let element = this.fieldElement(field);
                element.addEventListener('keyup', () => {
                    this.checkFieldAsync(field);
                });

                let p = this.checkFieldAsync(field);
                ps.push(p);
            }

            let checkResults = await Promise.all(ps);
            let result = checkResults.filter(o => o == false).length == 0;
            return result;
        };

        private checkField(field: ValidateField): boolean {
            let depends = field.depends || [];
            for (let j = 0; j < depends.length; j++) {
                let dependResult = depends[j]();
                if (typeof dependResult == 'object') {
                    throw new Error('Please use checkAsync method.');
                }

                let dependIsOK = dependResult;
                if (!dependIsOK)
                    return false;
            }

            for (let j = 0; j < field.rules.length; j++) {
                let rule = field.rules[j];

                let element = this.fieldElement(field);
                if (element == null)
                    throw errors.fieldElementCanntNull();

                let value = FormValidator.elementValue(element);
                let isPass = rule.validate(value);

                if (typeof isPass == 'object') {
                    throw new Error('Please use checkAsync method.');
                }

                this.showElement(!isPass, field, rule, element);
                if (!isPass)
                    return false;
            }

            return true;
        }

        private async checkFieldAsync(field: ValidateField): Promise<boolean> {

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

            let ps = new Array<Promise<any>>();
            for (let j = 0; j < field.rules.length; j++) {
                let rule = field.rules[j];

                let element = this.fieldElement(field);
                if (element == null)
                    throw errors.fieldElementCanntNull();

                let value = FormValidator.elementValue(element);
                let p = rule.validate(value);

                if (typeof p == 'boolean') {
                    p = Promise.resolve(p);
                }

                let isPass = await p;
                this.showElement(!isPass, field, rule, element);

                if (!isPass)
                    return false;
            }

            return true;
        }

        private showElement(display: boolean, field: ValidateField, rule: Rule, element: InputElement) {
            let errorElement = this.fieldErrorElement(field);
            console.assert(errorElement != null, 'errorElement cannt be null.');
            if (rule.error != null) {
                errorElement = field.errorElement;
                let name = this.elementName(element);
                errorElement.innerHTML = rule.error.replace('%s', name);
            }

            if (display) {
                errorElement.style.removeProperty('display');
            }
            else {
                errorElement.style.display = 'none';
            }
        }


        /**
         * 异步验证 HTML 元素
         * @param name HTML 元素名称
         */
        checkElementAsync(name: string): Promise<boolean> {
            let field = this.fields.filter(o => o.name == name)[0];
            if (!field)
                throw errors.elementNotExists(name);

            return this.checkFieldAsync(field);
        }

        /**
         * 异步验证 HTML 元素
         * @param name HTML 元素名称
         */
        checkElement(name: string): boolean {
            let field = this.fields.filter(o => o.name == name)[0];
            if (!field)
                throw errors.elementNotExists(name);

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