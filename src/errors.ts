namespace dilu {
    export let errors = {
        argumentNull(parameterName) {
            let msg = `Parameter ${parameterName} can not be null or empty.`
            return new Error(msg);
        },
        ruleNotExists(name: string) {
            return new Error(`Rule named ${name} is not exists.`);
        },
        elementValidateRuleNotSet(element: HTMLInputElement) {
            let msg = `元素'${element.name}'没有设置验证规则`;
            return new Error(msg);
        }
    }
}