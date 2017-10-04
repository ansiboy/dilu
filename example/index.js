var FormValidator = dilu.FormValidator, rules = dilu.rules;
var required = rules.required, mobile = rules.mobile;
var mobileElement = document.getElementById('mobile');
var verifyCodeElement = document.getElementById('verifyCode');
var validator = new dilu.FormValidator({ element: mobileElement, rules: [required(), mobile()] }, {
    element: verifyCodeElement, errorElement: document.getElementById('verifyCodeError'),
    rules: [required()], depends: [function () { return validator.checkElement(mobileElement); }]
});
document.getElementById('btn-register').onclick = function () {
    validator.check();
};
document.getElementById('btn-verifyCode').onclick = function () {
    validator.checkElement(verifyCodeElement);
};
