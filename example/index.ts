
let { FormValidator, rules } = dilu;
let { required, mobile } = rules;

let mobileInput = document.getElementById('mobile') as HTMLInputElement;
let verifyCodeInput = document.getElementById('verifyCode') as HTMLInputElement;
let validator: dilu.FormValidator = new dilu.FormValidator(
    { element: mobileInput, rules: [required(), mobile()] },
    {
        element: verifyCodeInput,
        errorElement: document.getElementById('verifyCodeError'),
        rules: [required()], depends: [() => validator.checkElement(mobileInput)]
    }
)

document.getElementById('btn-register').onclick = function () {
    validator.check();
};

document.getElementById('btn-verifyCode').onclick = function () {
    validator.checkElement(verifyCodeInput);
}


