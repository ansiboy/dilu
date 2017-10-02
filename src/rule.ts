namespace dilu {
    const errorClassName = 'validationMessage';
    export type InputElement = HTMLElement & { value: string, name?: string };
    export class Rule {
        private _validate: (value: string) => boolean;
        private _element: HTMLElement & { value: string };
        private _errorElement: HTMLElement;
        private _errorMessage: string;
        // private _errorElement: HTMLElement;

        constructor(element: InputElement, validate: (value: string) => boolean, errorMessage: string, errorELement?: HTMLElement) {
            this._element = element;
            this._validate = validate;
            this._errorMessage = errorMessage;
            this._errorElement = errorELement;
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
                if (this.element.nextSibling)
                    this.element.parentElement.insertBefore(this._errorElement, this.element.nextSibling);
                else
                    this.element.parentElement.appendChild(this._errorElement);
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