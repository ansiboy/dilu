namespace dilu {

    export type InputElement = HTMLElement & { name: string, value: string } | HTMLAreaElement;

    export type ValidateField = {
        name: string,
        rules: Rule[],
        errorElement?: HTMLElement,
        depends?: ((() => Promise<boolean>) | (() => boolean))[],
        condition?: () => boolean,
    };

    /**
     * 表单验证器，用于对表单中的字段进行验证
     */
    export class FormValidator {
        static errorClassName = 'validationMessage';
        private form: HTMLElement;
        private fields: ValidateField[];
        private elementEvents: { [key: string]: any };
        constructor(form: HTMLElement, ...fields: ValidateField[]) {
            this.fields = fields || [];
            this.form = form;
            this.elementEvents = {};
        }

        appendField(field: ValidateField) {
            this.fields.push(field)
        }

        /**
         * 清除表单的错误信息
         */
        clearErrors() {
            this.fields.map(o => o.errorElement)
                .filter(o => o != null)
                .forEach(o => o.style.display = 'none');
        }

        /**
         * 清除表单的指定元素错误信息
         * @param name 指定的元素名称
         */
        clearElementError(name: string) {
            if (!name) throw errors.argumentNull('name');
            let fields = this.fields.filter(o => o.name == name);
            for (let field of fields) {
                let errorElement = this.fieldErrorElement(field);
                errorElement.style.display = 'none';
            }
        }

        /**
         * 设置表单的指定元素错误信息
         * @param name 指定的元素名称
         * @param error 错误信息
         */
        setElementError(name: string, error: string) {
            if (!name) throw errors.argumentNull('name');
            if (!error) throw errors.argumentNull('error');
            let fields = this.fields.filter(o => o.name == name);
            for (let field of fields) {
                let errorElement = this.fieldErrorElement(field);
                errorElement.style.removeProperty('display')
                errorElement.innerHTML = error
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

                let p = this.checkField(field);
                ps.push(p);
            }

            let result = ps.filter(o => o == false).length == 0;
            return result;
        }

        /**
         * 异步验证字段
         */
        async checkAsync(): Promise<boolean> {
            let ps = new Array<Promise<any>>();
            for (let i = 0; i < this.fields.length; i++) {
                let field = this.fields[i];
                if (field.condition && field.condition() == false)
                    continue;

                let p = this.checkFieldAsync(field);
                ps.push(p);
            }

            let checkResults = await Promise.all(ps);
            let result = checkResults.filter(o => o == false).length == 0;
            return result;
        }

        private bindElementEvent(field: ValidateField, isAsync: boolean) {
            if (this.elementEvents[field.name]) {
                return;
            }

            let element = this.fieldElement(field);
            let validateFunc = (() => {
                let checking = false;
                return () => {
                    if (checking)
                        return;

                    checking = true;
                    // isAsync ? this.checkFieldAsync(field) : this.checkField(field);
                    if (isAsync) {
                        this.checkFieldAsync(field)
                            .then(() => checking = false)
                            .catch(() => checking = false)
                    }
                    else {
                        this.checkField(field);
                        checking = false;
                    }
                }
            })()

            element.addEventListener('change', validateFunc);
            if (element.tagName != 'select') {
                element.addEventListener('keyup', validateFunc);
            }

            this.elementEvents[field.name] = true;
        }

        private checkField(field: ValidateField): boolean {
            this.bindElementEvent(field, false);

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
            this.bindElementEvent(field, true);
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
                let errorText = typeof rule.error == 'string' ? rule.error : rule.error() || '';
                errorElement.innerHTML = errorText.replace('%s', name);
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
         * 同步验证 HTML 元素
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