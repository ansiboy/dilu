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
requirejs(['dilu'],function(){

})
```

## 示例

```ts
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
```

## 样式

## 验证