namespace dilu {
    export let errors = {
        argumentNull(parameterName) {
            let msg = `Parameter ${parameterName} can not be null or empty.`
            return new Error(msg);
        },
        elementValidateRuleNotSet(element: HTMLInputElement) {
            let msg = `元素'${element.name}'没有设置验证规则`;
            return new Error(msg);
        },
        fieldElementCanntNull(fieldIndex) {
            let msg = `The element value in the field cannt be null, field index is ${fieldIndex}.`;
            return new Error(msg);
        }
    }
}