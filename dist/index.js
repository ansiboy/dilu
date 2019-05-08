/*!
 * 
 *  maishu-dilu v1.3.8
 *  https://github.com/ansiboy/dilu
 *  
 *  Copyright (c) 2016-2018, shu mai <ansiboy@163.com>
 *  Licensed under the MIT License.
 * 
 */
define(function() { return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./out/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./out/errors.js":
/*!***********************!*\
  !*** ./out/errors.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports) {\r\n    \"use strict\";\r\n    Object.defineProperty(exports, \"__esModule\", { value: true });\r\n    // namespace dilu {\r\n    exports.errors = {\r\n        argumentNull(parameterName) {\r\n            let msg = `Parameter ${parameterName} can not be null or empty.`;\r\n            return new Error(msg);\r\n        },\r\n        elementValidateRuleNotSet(element) {\r\n            let msg = `元素'${element.name}'没有设置验证规则`;\r\n            return new Error(msg);\r\n        },\r\n        fieldElementCanntNull(fieldIndex) {\r\n            // if (fieldIndex != null)\r\n            let msg = fieldIndex != null ?\r\n                `The element value in the field cannt be null, field index is ${fieldIndex}.` :\r\n                `The element in the field is null`;\r\n            return new Error(msg);\r\n        },\r\n        elementNotExists(name) {\r\n            let msg = `Element ${name} is not exits in the form.`;\r\n            return new Error(msg);\r\n        },\r\n        fieldResultExpectBooleanType(name) {\r\n            let msg = `Result of ${name} field is expected boolean.`;\r\n            return new Error(msg);\r\n        }\r\n    };\r\n}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\r\n// }\r\n\n\n//# sourceURL=webpack:///./out/errors.js?");

/***/ }),

/***/ "./out/formValidator.js":
/*!******************************!*\
  !*** ./out/formValidator.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\n!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! ./errors */ \"./out/errors.js\")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, errors_1) {\r\n    \"use strict\";\r\n    Object.defineProperty(exports, \"__esModule\", { value: true });\r\n    /**\r\n     * 表单验证器，用于对表单中的字段进行验证\r\n     */\r\n    class FormValidator {\r\n        constructor(form, ...fields) {\r\n            /** 输入框的值发生改变，是否重新校验该输入框的值，默认为 true */\r\n            this.validateOnChanged = true;\r\n            if (!form)\r\n                throw errors_1.errors.argumentNull('form');\r\n            this.fields = fields || [];\r\n            this.form = form;\r\n            this.elementEvents = {};\r\n        }\r\n        appendField(field) {\r\n            this.fields.push(field);\r\n        }\r\n        /**\r\n         * 清除表单的错误信息\r\n         */\r\n        clearErrors() {\r\n            this.fields.map(o => o.errorElement)\r\n                .filter(o => o != null)\r\n                .forEach(o => o.style.display = 'none');\r\n        }\r\n        /**\r\n         * 清除表单的指定元素错误信息\r\n         * @param name 指定的元素名称\r\n         */\r\n        clearElementError(name) {\r\n            if (!name)\r\n                throw errors_1.errors.argumentNull('name');\r\n            let fields = this.fields.filter(o => o.name == name);\r\n            for (let field of fields) {\r\n                let errorElement = this.fieldErrorElement(field);\r\n                errorElement.style.display = 'none';\r\n            }\r\n        }\r\n        /**\r\n         * 设置表单的指定元素错误信息\r\n         * @param name 指定的元素名称\r\n         * @param error 错误信息\r\n         */\r\n        setElementError(name, error) {\r\n            if (!name)\r\n                throw errors_1.errors.argumentNull('name');\r\n            if (!error)\r\n                throw errors_1.errors.argumentNull('error');\r\n            let fields = this.fields.filter(o => o.name == name);\r\n            for (let field of fields) {\r\n                let errorElement = this.fieldErrorElement(field);\r\n                errorElement.style.removeProperty('display');\r\n                errorElement.innerHTML = error;\r\n            }\r\n        }\r\n        fieldElement(field) {\r\n            let name = field.name;\r\n            let element = this.form.querySelectorAll(`[name='${name}']`)[0];\r\n            if (element == null)\r\n                throw errors_1.errors.elementNotExists(name);\r\n            return element;\r\n        }\r\n        fieldErrorElement(field) {\r\n            if (!field.errorElement) {\r\n                let errorElement = this.form.getElementsByClassName(`${FormValidator.errorClassName} ${field.name}`)[0];\r\n                if (!errorElement) {\r\n                    let element = this.fieldElement(field);\r\n                    errorElement = document.createElement(\"span\");\r\n                    errorElement.className = FormValidator.errorClassName;\r\n                    errorElement.style.display = 'none';\r\n                    if (element.nextSibling)\r\n                        element.parentElement.insertBefore(errorElement, element.nextSibling);\r\n                    else\r\n                        element.parentElement.appendChild(errorElement);\r\n                }\r\n                field.errorElement = errorElement;\r\n            }\r\n            return field.errorElement;\r\n            // return errorElement;\r\n        }\r\n        /**\r\n         * 验证字段\r\n         */\r\n        check() {\r\n            let ps = new Array();\r\n            for (let i = 0; i < this.fields.length; i++) {\r\n                let field = this.fields[i];\r\n                let element = this.fieldElement(field);\r\n                if (field.condition && field.condition(element) == false)\r\n                    continue;\r\n                let p = this.checkField(field);\r\n                ps.push(p);\r\n            }\r\n            let result = ps.filter(o => o == false).length == 0;\r\n            return result;\r\n        }\r\n        /**\r\n         * 异步验证字段\r\n         */\r\n        checkAsync() {\r\n            return __awaiter(this, void 0, void 0, function* () {\r\n                let ps = new Array();\r\n                for (let i = 0; i < this.fields.length; i++) {\r\n                    let field = this.fields[i];\r\n                    let element = this.fieldElement(field);\r\n                    if (field.condition && field.condition(element) == false)\r\n                        continue;\r\n                    let p = this.checkFieldAsync(field);\r\n                    ps.push(p);\r\n                }\r\n                let checkResults = yield Promise.all(ps);\r\n                let result = checkResults.filter(o => o == false).length == 0;\r\n                return result;\r\n            });\r\n        }\r\n        bindElementEvent(field, isAsync) {\r\n            if (this.elementEvents[field.name]) {\r\n                return;\r\n            }\r\n            let element = this.fieldElement(field);\r\n            let validateFunc = (() => {\r\n                let checking = false;\r\n                return () => {\r\n                    if (checking)\r\n                        return;\r\n                    checking = true;\r\n                    // isAsync ? this.checkFieldAsync(field) : this.checkField(field);\r\n                    if (isAsync) {\r\n                        this.checkFieldAsync(field)\r\n                            .then(() => checking = false)\r\n                            .catch(() => checking = false);\r\n                    }\r\n                    else {\r\n                        this.checkField(field);\r\n                        checking = false;\r\n                    }\r\n                };\r\n            })();\r\n            if (this.validateOnChanged) {\r\n                element.addEventListener('change', validateFunc);\r\n                if (element.tagName != 'select') {\r\n                    element.addEventListener('keyup', validateFunc);\r\n                }\r\n            }\r\n            this.elementEvents[field.name] = true;\r\n        }\r\n        checkField(field) {\r\n            this.bindElementEvent(field, false);\r\n            let element = this.fieldElement(field);\r\n            let depends = field.depends || [];\r\n            for (let j = 0; j < depends.length; j++) {\r\n                let dependResult = depends[j](element);\r\n                if (typeof dependResult == 'object') {\r\n                    throw new Error('Please use checkAsync method.');\r\n                }\r\n                let dependIsOK = dependResult;\r\n                if (!dependIsOK)\r\n                    return false;\r\n            }\r\n            for (let j = 0; j < field.rules.length; j++) {\r\n                let rule = field.rules[j];\r\n                let element = this.fieldElement(field);\r\n                if (element == null)\r\n                    throw errors_1.errors.fieldElementCanntNull();\r\n                let value = FormValidator.elementValue(element);\r\n                let isPass = rule.validate(value);\r\n                if (typeof isPass == 'object') {\r\n                    throw new Error('Please use checkAsync method.');\r\n                }\r\n                this.showElement(!isPass, field, rule, element);\r\n                if (!isPass)\r\n                    return false;\r\n            }\r\n            return true;\r\n        }\r\n        checkFieldAsync(field) {\r\n            return __awaiter(this, void 0, void 0, function* () {\r\n                this.bindElementEvent(field, true);\r\n                let element = this.fieldElement(field);\r\n                let depends = field.depends || [];\r\n                for (let j = 0; j < depends.length; j++) {\r\n                    let dependResult = depends[j](element);\r\n                    if (typeof dependResult == 'boolean') {\r\n                        dependResult = Promise.resolve(dependResult);\r\n                    }\r\n                    let dependIsOK = yield dependResult;\r\n                    if (!dependIsOK)\r\n                        return false;\r\n                }\r\n                for (let j = 0; j < field.rules.length; j++) {\r\n                    let rule = field.rules[j];\r\n                    let element = this.fieldElement(field);\r\n                    if (element == null)\r\n                        throw errors_1.errors.fieldElementCanntNull();\r\n                    let value = FormValidator.elementValue(element);\r\n                    let p = rule.validate(value);\r\n                    if (typeof p == 'boolean') {\r\n                        p = Promise.resolve(p);\r\n                    }\r\n                    let isPass = yield p;\r\n                    this.showElement(!isPass, field, rule, element);\r\n                    if (!isPass)\r\n                        return false;\r\n                }\r\n                return true;\r\n            });\r\n        }\r\n        showElement(display, field, rule, element) {\r\n            let errorElement = this.fieldErrorElement(field);\r\n            console.assert(errorElement != null, 'errorElement cannt be null.');\r\n            if (rule.error != null) {\r\n                errorElement = field.errorElement;\r\n                let name = this.elementName(element);\r\n                let errorText = typeof rule.error == 'string' ? rule.error : rule.error() || '';\r\n                errorElement.innerHTML = errorText.replace('%s', name);\r\n            }\r\n            if (display) {\r\n                errorElement.style.removeProperty('display');\r\n            }\r\n            else {\r\n                errorElement.style.display = 'none';\r\n            }\r\n        }\r\n        /**\r\n         * 异步验证 HTML 元素\r\n         * @param name HTML 元素名称\r\n         */\r\n        checkElementAsync(name) {\r\n            let field = this.fields.filter(o => o.name == name)[0];\r\n            if (!field)\r\n                throw errors_1.errors.elementNotExists(name);\r\n            return this.checkFieldAsync(field);\r\n        }\r\n        /**\r\n         * 同步验证 HTML 元素\r\n         * @param name HTML 元素名称\r\n         */\r\n        checkElement(name) {\r\n            let field = this.fields.filter(o => o.name == name)[0];\r\n            if (!field)\r\n                throw errors_1.errors.elementNotExists(name);\r\n            return this.checkField(field);\r\n        }\r\n        static elementValue(element) {\r\n            if (element.tagName == \"TEXTAREA\") {\r\n                return element.value;\r\n            }\r\n            return element.value;\r\n        }\r\n        elementName(element) {\r\n            if (element.tagName == \"TEXTAREA\") {\r\n                return element.name;\r\n            }\r\n            return element.name;\r\n        }\r\n    }\r\n    FormValidator.errorClassName = 'validationMessage';\r\n    exports.FormValidator = FormValidator;\r\n}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\r\n// }\r\n\n\n//# sourceURL=webpack:///./out/formValidator.js?");

/***/ }),

/***/ "./out/index.js":
/*!**********************!*\
  !*** ./out/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! ./formValidator */ \"./out/formValidator.js\"), __webpack_require__(/*! ./rules */ \"./out/rules.js\")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, formValidator_1, rules_1) {\r\n    \"use strict\";\r\n    Object.defineProperty(exports, \"__esModule\", { value: true });\r\n    exports.FormValidator = formValidator_1.FormValidator;\r\n    exports.rules = rules_1.rules;\r\n}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\r\n\n\n//# sourceURL=webpack:///./out/index.js?");

/***/ }),

/***/ "./out/rules.js":
/*!**********************!*\
  !*** ./out/rules.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! ./formValidator */ \"./out/formValidator.js\")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, formValidator_1) {\r\n    \"use strict\";\r\n    Object.defineProperty(exports, \"__esModule\", { value: true });\r\n    // namespace dilu {\r\n    var ruleRegex = /^(.+?)\\[(.+)\\]$/, numericRegex = /^[0-9]+$/, integerRegex = /^\\-?[0-9]+$/, decimalRegex = /^\\-?[0-9]*\\.?[0-9]+$/, emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/, alphaRegex = /^[a-z]+$/i, alphaNumericRegex = /^[a-z0-9]+$/i, alphaDashRegex = /^[a-z0-9_\\-]+$/i, naturalRegex = /^[0-9]+$/i, naturalNoZeroRegex = /^[1-9][0-9]*$/i, ipRegex = /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/i, base64Regex = /[^a-zA-Z0-9\\/\\+=]/i, numericDashRegex = /^[\\d\\-\\s]+$/, urlRegex = /^((http|https):\\/\\/(\\w+:{0,1}\\w*@)?(\\S+)|)(:[0-9]+)?(\\/|\\/([\\w#!:.?+=&%@!\\-\\/]))?$/, mobileRegex = /^1[34578]\\d{9}$/, dateRegex = /\\d{4}-\\d{1,2}-\\d{1,2}/;\r\n    let msgs = {\r\n        required: '%s不能为空',\r\n        matches: '%s与%s不匹配',\r\n        \"default\": 'The %s field is still set to default, please change.',\r\n        equal: '%s和%s必须相同',\r\n        email: '不是有效的邮箱地址',\r\n        valid_emails: 'The %s field must contain all valid email addresses.',\r\n        minLength: '%s至少包含%s个字符',\r\n        maxLength: '%s不能超过%s字符',\r\n        exact_length: 'The %s field must be exactly %s characters in length.',\r\n        greater_than: 'The %s field must contain a number greater than %s.',\r\n        less_than: 'The %s field must contain a number less than %s.',\r\n        alpha: 'The %s field must only contain alphabetical characters.',\r\n        alpha_numeric: 'The %s field must only contain alpha-numeric characters.',\r\n        alpha_dash: 'The %s field must only contain alpha-numeric characters, underscores, and dashes.',\r\n        numeric: '请数入数字',\r\n        integer: 'The %s field must contain an integer.',\r\n        decimal: 'The %s field must contain a decimal number.',\r\n        is_natural: 'The %s field must contain only positive numbers.',\r\n        is_natural_no_zero: 'The %s field must contain a number greater than zero.',\r\n        ip: 'The %s field must contain a valid IP.',\r\n        valid_base64: 'The %s field must contain a base64 string.',\r\n        valid_credit_card: 'The %s field must contain a valid credit card number.',\r\n        is_file_type: 'The %s field must contain only %s files.',\r\n        valid_url: 'The %s field must contain a valid URL.',\r\n        greater_than_date: 'The %s field must contain a more recent date than %s.',\r\n        less_than_date: 'The %s field must contain an older date than %s.',\r\n        greater_than_or_equal_date: 'The %s field must contain a date that\\'s at least as recent as %s.',\r\n        less_than_or_equal_date: 'The %s field must contain a date that\\'s %s or older.',\r\n        mobile: '请输入正确的手机号码',\r\n        custom: '请输入正确制',\r\n    };\r\n    function createValidation(validate, error) {\r\n        return {\r\n            validate: validate,\r\n            error: error\r\n        };\r\n    }\r\n    function calc(value) {\r\n        if (typeof value == 'function') {\r\n            return value();\r\n        }\r\n        return value;\r\n    }\r\n    /**\r\n     * 表单验证规则\r\n     */\r\n    exports.rules = {\r\n        /**\r\n         * 验证必填字段\r\n         * @param error 错误提示文字\r\n         */\r\n        required(error) {\r\n            let validate = (value) => value != '';\r\n            return createValidation(validate, error || msgs.required);\r\n        },\r\n        /**\r\n         * 验证两个字段值是否相等\r\n         * @param otherElement 另外一个字段\r\n         * @param error 错误提示文字\r\n         */\r\n        matches(otherElement, error) {\r\n            var validate = (value) => value == formValidator_1.FormValidator.elementValue(otherElement);\r\n            return createValidation(validate, error || msgs.required);\r\n        },\r\n        /**\r\n         * 验证邮箱\r\n         * @param error 错误提示文字\r\n         */\r\n        email(error) {\r\n            var validate = (value) => emailRegex.test(value);\r\n            return createValidation(validate, error || msgs.required);\r\n        },\r\n        /**\r\n         * 验证字段最小长度\r\n         * @param length 最小长度\r\n         * @param error 错误提示文字\r\n         */\r\n        minLength(length, error) {\r\n            var validate = (value) => (value || '').length >= calc(length);\r\n            return createValidation(validate, error || msgs.minLength);\r\n        },\r\n        /**\r\n         * 验证字段的最大长度\r\n         * @param length 最大长度\r\n         * @param error 错误提示文字\r\n         */\r\n        maxLength(length, error) {\r\n            var validate = (value) => (value || '').length <= calc(length);\r\n            return createValidation(validate, error || msgs.matches);\r\n        },\r\n        /**\r\n         * 验证字段大于指定的值\r\n         * @param value 指定的值\r\n         * @param error 错误提示文字\r\n         */\r\n        greaterThan(value, error) {\r\n            var validate = (o) => elementValueCompare(o, calc(value)) == 'greaterThan';\r\n            return createValidation(validate, error || msgs.greater_than);\r\n        },\r\n        /**\r\n         * 验证字段小于指定的值\r\n         * @param value 指定的值\r\n         * @param error 错误提示文字\r\n         */\r\n        lessThan(value, error) {\r\n            var validate = (o) => elementValueCompare(o, calc(value)) == 'lessThan';\r\n            return createValidation(validate, error || msgs.less_than);\r\n        },\r\n        /**\r\n         * 验证字段等于指定的值\r\n         * @param value 指定的值\r\n         * @param error 错误提示文字\r\n         */\r\n        equal(value, error) {\r\n            var validate = (o) => elementValueCompare(o, calc(value)) == 'equal';\r\n            return createValidation(validate, error || msgs.equal);\r\n        },\r\n        /**\r\n         * 验证字段为 IP\r\n         * @param error 错误提示文字\r\n         */\r\n        ip(error) {\r\n            var validate = (value) => ipRegex.test(value);\r\n            return createValidation(validate, error || msgs.ip);\r\n        },\r\n        /**\r\n         * 验证字段为 URL\r\n         * @param error 错误提示文字\r\n         */\r\n        url(error) {\r\n            var validate = (value) => urlRegex.test(value);\r\n            return createValidation(validate, error || msgs.valid_url);\r\n        },\r\n        /**\r\n         * 验证字段为手机号码\r\n         * @param error 错误提示文字\r\n         */\r\n        mobile(error) {\r\n            var validate = (value) => mobileRegex.test(value);\r\n            return createValidation(validate, error || msgs.mobile);\r\n        },\r\n        /**\r\n         * 验证字段为数字\r\n         * @param error 错误提示文字\r\n         */\r\n        numeric(error) {\r\n            var validate = (value) => numericRegex.test(value);\r\n            return createValidation(validate, error || msgs.numeric);\r\n        },\r\n        /**\r\n         * 自定义验证\r\n         * @param validate 自定义验证的方法\r\n         * @param error 错误提示文字\r\n         */\r\n        custom(validate, error) {\r\n            return createValidation(validate, error || msgs.custom);\r\n        }\r\n    };\r\n    function elementValueCompare(value, otherValue) {\r\n        let elementValue;\r\n        if (typeof otherValue == 'number') {\r\n            elementValue = decimalRegex.test(value) ? parseFloat(value) : null;\r\n        }\r\n        else if (typeof otherValue == 'string') {\r\n            elementValue = value;\r\n        }\r\n        else {\r\n            elementValue = getValidDate(value);\r\n        }\r\n        if (elementValue < otherValue)\r\n            return 'lessThan';\r\n        else if (elementValue > otherValue)\r\n            return 'greaterThan';\r\n        else\r\n            return 'equal';\r\n    }\r\n    /**\r\n     * private function _getValidDate: helper function to convert a string date to a Date object\r\n     * @param date (String) must be in format yyyy-mm-dd or use keyword: today\r\n     * @returns {Date} returns false if invalid\r\n     */\r\n    function getValidDate(date) {\r\n        if (!date.match('today') && !date.match(dateRegex)) {\r\n            return null;\r\n        }\r\n        var validDate = new Date(), validDateArray;\r\n        if (!date.match('today')) {\r\n            validDateArray = date.split('-');\r\n            validDate.setFullYear(validDateArray[0]);\r\n            validDate.setMonth(validDateArray[1] - 1);\r\n            validDate.setDate(validDateArray[2]);\r\n        }\r\n        return validDate;\r\n    }\r\n    ;\r\n}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\r\n// }\r\n\n\n//# sourceURL=webpack:///./out/rules.js?");

/***/ })

/******/ })});;