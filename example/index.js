var FormValidator = dilu.FormValidator, rules = dilu.rules;
var required = rules.required, mobile = rules.mobile, equal = rules.equal;
var mobileInput = document.getElementById('mobile');
var verifyCodeInput = document.getElementById('verifyCode');
var passwordInput = document.getElementById('password');
var confirmPasswordInput = document.getElementById('confirmPassword');
var validator = new dilu.FormValidator({ element: mobileInput, rules: [required(), mobile()] }, {
    element: verifyCodeInput,
    errorElement: document.getElementById('verifyCodeError'),
    rules: [required()], depends: [function () { return validator.checkElement(mobileInput); }]
}, { element: passwordInput, rules: [required('请输入密码')] }, {
    element: confirmPasswordInput,
    rules: [
        required('请再次输入密码'),
        equal(function () { return passwordInput.value; }, '两次输入的密码不一致')
    ]
});
document.getElementById('btn-register').onclick = function () {
    validator.check();
};
document.getElementById('btn-verifyCode').onclick = function () {
    validator.checkElement(verifyCodeInput);
};
