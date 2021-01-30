"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const formValidator_1 = require("./formValidator");
let elementId = "maishu-dilu-style";
if (!document.getElementById(elementId) && document.head != null) {
    let element = document.createElement('style');
    element.type = 'text/css';
    element.id = "maishu-jueying-core-style";
    document.head.appendChild(element);
    element.innerHTML = `
    .${formValidator_1.FormValidator.errorClassName} {
        color: red;
        font-weight: bold;
    }
    `;
}
