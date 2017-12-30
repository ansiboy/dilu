
let { FormValidator, rules } = dilu;
let { required, mobile, equal } = rules;

let mobileInput = document.getElementById('mobile') as HTMLInputElement;
let verifyCodeInput = document.getElementById('verifyCode') as HTMLInputElement;
let passwordInput = document.getElementById('password') as HTMLInputElement;
let confirmPasswordInput = document.getElementById('confirmPassword') as HTMLInputElement;
let validator: dilu.FormValidator = new dilu.FormValidator(
    { element: mobileInput, rules: [required(), mobile()] },
    {
        element: verifyCodeInput,
        errorElement: document.getElementById('verifyCodeError'),
        rules: [required()], depends: [() => validator.checkElement(mobileInput)]
    },
    { element: passwordInput, rules: [required('请输入密码')] },
    {
        element: confirmPasswordInput,
        rules: [
            required('请再次输入密码'),
            equal(() => passwordInput.value, '两次输入的密码不一致')
        ]
    }
)

document.getElementById('btn-register').onclick = function () {
    validator.check();
};

document.getElementById('btn-verifyCode').onclick = function () {
    validator.checkElement(verifyCodeInput);
}


