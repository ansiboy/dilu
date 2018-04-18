
let { FormValidator, rules } = dilu;
let { required, mobile, equal } = rules;

// let mobileInput = document.getElementById('mobile') as HTMLInputElement;
// let verifyCodeInput = document.getElementById('verifyCode') as HTMLInputElement;
let passwordInput = document.getElementsByName('password')[0] as HTMLInputElement;
// let confirmPasswordInput = document.getElementById('confirmPassword') as HTMLInputElement;

let form = document.getElementsByClassName('container')[0] as HTMLElement;
let validator: dilu.FormValidator = new dilu.FormValidator(form,
    { name: "mobile", rules: [required(), mobile()] },
    {
        name: 'verifyCode',
        errorElement: document.getElementById('verifyCodeError'),
        rules: [required()], depends: [() => validator.checkElement('mobile')]
    },
    { name: 'password', rules: [required('请输入密码')] },
    {
        name: 'confirmPassword',
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
    validator.checkElement('mobile');
}


