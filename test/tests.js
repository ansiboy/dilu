/// <reference path="../out/dilu.d.ts"/>

QUnit.test("require check", function (assert) {
    let input = document.createElement("input")
    document.body.appendChild(input);

    const r = dilu.rules;
    var formValidator = new dilu.FormValidator(
        { rule: r.required(input) }
    );


    let result = formValidator.check();
    assert.ok(result == false, "not pass check");

    input.value = 'hello world';
    result = formValidator.check();
    assert.ok(result, "Required rule pass check.");
});

QUnit.test("email rule test", function (assert) {

    let input = document.createElement("input")
    document.body.appendChild(input);
    const r = dilu.rules;
    var formValidator = new dilu.FormValidator(
        { rule: r.email(input) }
    );


    let result = formValidator.check();
    assert.ok(result == false, "not pass check");

    input.value = "ansiboy@163.com";
    result = formValidator.check();
    assert.ok(result == true, "pass check");

});

// 依赖测试
QUnit.test("depends test", function (assert) {

});