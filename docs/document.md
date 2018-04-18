## 使用

* 传统 JS 项目使用，引用 dilu.js
```html
<script src="js/dilu.js"></script>
```
* 使用 AMD 加载
```js
requirejs.config({
    shim: {
        dilu: {
            exports: 'dilu'
        }
    },
    paths: {
        dilu: 'js/dilu'
    }
}
requirejs(['dilu'],function(dilu){

})
```

## 示例

```ts
var FormValidator = dilu.FormValidator, rules = dilu.rules;
var required = rules.required, mobile = rules.mobile, equal = rules.equal;
var mobileInput = document.getElementById('mobile');
var verifyCodeInput = document.getElementById('verifyCode');
var passwordInput = document.getElementById('password');
var confirmPasswordInput = document.getElementById('confirmPassword');
var validator = new dilu.FormValidator(
    { element: mobileInput, rules: [required(), mobile()] }, 
    {
        element: verifyCodeInput,
        errorElement: document.getElementById('verifyCodeError'),
        rules: [required()], 
        depends: [() => validator.checkElement(mobileInput)]
    }, 
    { element: passwordInput, rules: [required('请输入密码')] },
    {
        element: confirmPasswordInput,
        rules: [
            required('请再次输入密码'),
            equal(() => passwordInput.value, '两次输入的密码不一致')
        ]
    }
);
document.getElementById('btn-register').onclick = function () {
    validator.check();
};
document.getElementById('btn-verifyCode').onclick = function () {
    validator.checkElement(verifyCodeInput);
};

```

## 验证方法

验证所有表单字段

```ts
check(): Promise<boolean>
```

验证单个表单字段

```ts
checkElement(inputElement: HTMLInputElement): Promise<boolean>
```

## 验证规则

名称 | 说明
----------------------- | -----------------------
**required**|验证必填字段
**email** |验证邮箱
**equal** |验证字段与某个值相等
**greaterThan** |验证字段大于某个值
**lessThan** |验证字段小于某个值
**custom** |自定义验证规则

**示例**

```html
```

## 样式
