namespace dilu {
    const errorClassName = 'validationMessage';

    export class Rule {
        private _validate: (value: string) => boolean;
        private _element: HTMLInputElement;
        private _errorElement: HTMLElement;
        private _errorMessage: string;

        constructor(element: HTMLInputElement, validate: (value: string) => boolean, errorMessage: string) {
            this._element = element;
            this._validate = validate;
            this._errorMessage = errorMessage;
        }
        get element() {
            return this._element;
        }
        get errorElement() {
            if (this._errorElement == null) {
                this._errorElement = document.createElement("span");
                this._errorElement.className = errorClassName;
                this._errorElement.innerText = this._errorMessage;
                this._errorElement.style.display = 'none';
                document.body.insertBefore(this._errorElement, this.element.nextSibling);
            }
            return this._errorElement;
        }
        get errorMessage() {
            return this._errorMessage;
        }
        check(): boolean {
            let value = this.element.value;
            if (!this._validate(value)) {
                this.showError();
                return false;
            }
            this.hideError();
            return true;
        }
        showError() {
            this.errorElement.style.removeProperty('display');
        }
        hideError() {
            this.errorElement.style.display = 'none';
        }
    }

}