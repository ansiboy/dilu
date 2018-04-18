var FormValidator = dilu.FormValidator, rules = dilu.rules;
var required = rules.required, mobile = rules.mobile, equal = rules.equal;
// let mobileInput = document.getElementById('mobile') as HTMLInputElement;
// let verifyCodeInput = document.getElementById('verifyCode') as HTMLInputElement;
var passwordInput = document.getElementsByName('password')[0];
// let confirmPasswordInput = document.getElementById('confirmPassword') as HTMLInputElement;
var form = document.getElementsByClassName('container')[0];
var validator = new dilu.FormValidator(form, { name: "mobile", rules: [required(), mobile()] }, {
    name: 'verifyCode',
    errorElement: document.getElementById('verifyCodeError'),
    rules: [required()], depends: [function () { return validator.checkElement('mobile'); }]
}, { name: 'password', rules: [required('请输入密码')] }, {
    name: 'confirmPassword',
    rules: [
        required('请再次输入密码'),
        equal(function () { return passwordInput.value; }, '两次输入的密码不一致')
    ]
});
document.getElementById('btn-register').onclick = function () {
    validator.check();
};
document.getElementById('btn-verifyCode').onclick = function () {
    validator.checkElement('mobile');
};
