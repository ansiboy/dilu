'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var dilu;
(function (dilu) {
    dilu.errors = {
        argumentNull: function argumentNull(parameterName) {
            var msg = 'Parameter ' + parameterName + ' can not be null or empty.';
            return new Error(msg);
        },
        elementValidateRuleNotSet: function elementValidateRuleNotSet(element) {
            var msg = '\u5143\u7D20\'' + element.name + '\'\u6CA1\u6709\u8BBE\u7F6E\u9A8C\u8BC1\u89C4\u5219';
            return new Error(msg);
        },
        fieldElementCanntNull: function fieldElementCanntNull(fieldIndex) {
            // if (fieldIndex != null)
            var msg = fieldIndex != null ? 'The element value in the field cannt be null, field index is ' + fieldIndex + '.' : 'The element in the field is null';
            return new Error(msg);
        },
        elementNotExists: function elementNotExists(name) {
            var msg = 'Element ' + name + ' is not exits in the form.';
            return new Error(msg);
        },
        fieldResultExpectBooleanType: function fieldResultExpectBooleanType(name) {
            var msg = 'Result of ' + name + ' field is expected boolean.';
            return new Error(msg);
        }
    };
})(dilu || (dilu = {}));
var dilu;
(function (dilu) {
    /**
     * 表单验证器，用于对表单中的字段进行验证
     */
    var FormValidator = function () {
        function FormValidator(form) {
            _classCallCheck(this, FormValidator);

            for (var _len = arguments.length, fields = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                fields[_key - 1] = arguments[_key];
            }

            this.fields = fields || [];
            this.form = form;
            this.elementEvents = {};
        }

        _createClass(FormValidator, [{
            key: 'appendField',
            value: function appendField(field) {
                this.fields.push(field);
            }
            /**
             * 清除表单的错误信息
             */

        }, {
            key: 'clearErrors',
            value: function clearErrors() {
                this.fields.map(function (o) {
                    return o.errorElement;
                }).filter(function (o) {
                    return o != null;
                }).forEach(function (o) {
                    return o.style.display = 'none';
                });
            }
            /**
             * 清除表单的指定元素错误信息
             * @param name 指定的元素名称
             */

        }, {
            key: 'clearElementError',
            value: function clearElementError(name) {
                if (!name) throw dilu.errors.argumentNull('name');
                var fields = this.fields.filter(function (o) {
                    return o.name == name;
                });
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = fields[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var field = _step.value;

                        var errorElement = this.fieldErrorElement(field);
                        errorElement.style.display = 'none';
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }
            /**
             * 设置表单的指定元素错误信息
             * @param name 指定的元素名称
             * @param error 错误信息
             */

        }, {
            key: 'setElementError',
            value: function setElementError(name, error) {
                if (!name) throw dilu.errors.argumentNull('name');
                if (!error) throw dilu.errors.argumentNull('error');
                var fields = this.fields.filter(function (o) {
                    return o.name == name;
                });
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = fields[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var field = _step2.value;

                        var errorElement = this.fieldErrorElement(field);
                        errorElement.style.removeProperty('display');
                        errorElement.innerHTML = error;
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }
            }
        }, {
            key: 'fieldElement',
            value: function fieldElement(field) {
                var name = field.name;
                var element = this.form.querySelectorAll('[name=\'' + name + '\']')[0];
                if (element == null) throw dilu.errors.elementNotExists(name);
                return element;
            }
        }, {
            key: 'fieldErrorElement',
            value: function fieldErrorElement(field) {
                if (field.errorElement) {
                    return field.errorElement;
                }
                var element = this.fieldElement(field);
                var errorElement = field.errorElement = document.createElement("span");
                errorElement.className = FormValidator.errorClassName;
                errorElement.style.display = 'none';
                if (element.nextSibling) element.parentElement.insertBefore(errorElement, element.nextSibling);else element.parentElement.appendChild(errorElement);
                return errorElement;
            }
            /**
             * 验证字段
             */

        }, {
            key: 'check',
            value: function check() {
                var ps = new Array();
                for (var i = 0; i < this.fields.length; i++) {
                    var field = this.fields[i];
                    if (field.condition && field.condition() == false) continue;
                    var p = this.checkField(field);
                    ps.push(p);
                }
                var result = ps.filter(function (o) {
                    return o == false;
                }).length == 0;
                return result;
            }
            /**
             * 异步验证字段
             */

        }, {
            key: 'checkAsync',
            value: function checkAsync() {
                return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                    var ps, i, field, p, checkResults, result;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    ps = new Array();
                                    i = 0;

                                case 2:
                                    if (!(i < this.fields.length)) {
                                        _context.next = 11;
                                        break;
                                    }

                                    field = this.fields[i];

                                    if (!(field.condition && field.condition() == false)) {
                                        _context.next = 6;
                                        break;
                                    }

                                    return _context.abrupt('continue', 8);

                                case 6:
                                    p = this.checkFieldAsync(field);

                                    ps.push(p);

                                case 8:
                                    i++;
                                    _context.next = 2;
                                    break;

                                case 11:
                                    _context.next = 13;
                                    return Promise.all(ps);

                                case 13:
                                    checkResults = _context.sent;
                                    result = checkResults.filter(function (o) {
                                        return o == false;
                                    }).length == 0;
                                    return _context.abrupt('return', result);

                                case 16:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, this);
                }));
            }
        }, {
            key: 'bindElementEvent',
            value: function bindElementEvent(field, isAsync) {
                var _this = this;

                if (this.elementEvents[field.name]) {
                    return;
                }
                var element = this.fieldElement(field);
                var validateFunc = function () {
                    var checking = false;
                    return function () {
                        if (checking) return;
                        checking = true;
                        // isAsync ? this.checkFieldAsync(field) : this.checkField(field);
                        if (isAsync) {
                            _this.checkFieldAsync(field).then(function () {
                                return checking = false;
                            }).catch(function () {
                                return checking = false;
                            });
                        } else {
                            _this.checkField(field);
                            checking = false;
                        }
                    };
                }();
                element.addEventListener('change', validateFunc);
                if (element.tagName != 'select') {
                    element.addEventListener('keyup', validateFunc);
                }
                this.elementEvents[field.name] = true;
            }
        }, {
            key: 'checkField',
            value: function checkField(field) {
                this.bindElementEvent(field, false);
                var depends = field.depends || [];
                for (var j = 0; j < depends.length; j++) {
                    var dependResult = depends[j]();
                    if ((typeof dependResult === 'undefined' ? 'undefined' : _typeof(dependResult)) == 'object') {
                        throw new Error('Please use checkAsync method.');
                    }
                    var dependIsOK = dependResult;
                    if (!dependIsOK) return false;
                }
                for (var _j = 0; _j < field.rules.length; _j++) {
                    var rule = field.rules[_j];
                    var element = this.fieldElement(field);
                    if (element == null) throw dilu.errors.fieldElementCanntNull();
                    var value = FormValidator.elementValue(element);
                    var isPass = rule.validate(value);
                    if ((typeof isPass === 'undefined' ? 'undefined' : _typeof(isPass)) == 'object') {
                        throw new Error('Please use checkAsync method.');
                    }
                    this.showElement(!isPass, field, rule, element);
                    if (!isPass) return false;
                }
                return true;
            }
        }, {
            key: 'checkFieldAsync',
            value: function checkFieldAsync(field) {
                return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                    var depends, j, dependResult, dependIsOK, _j2, rule, element, value, p, isPass;

                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    this.bindElementEvent(field, true);
                                    depends = field.depends || [];
                                    j = 0;

                                case 3:
                                    if (!(j < depends.length)) {
                                        _context2.next = 14;
                                        break;
                                    }

                                    dependResult = depends[j]();

                                    if (typeof dependResult == 'boolean') {
                                        dependResult = Promise.resolve(dependResult);
                                    }
                                    _context2.next = 8;
                                    return dependResult;

                                case 8:
                                    dependIsOK = _context2.sent;

                                    if (dependIsOK) {
                                        _context2.next = 11;
                                        break;
                                    }

                                    return _context2.abrupt('return', false);

                                case 11:
                                    j++;
                                    _context2.next = 3;
                                    break;

                                case 14:
                                    _j2 = 0;

                                case 15:
                                    if (!(_j2 < field.rules.length)) {
                                        _context2.next = 32;
                                        break;
                                    }

                                    rule = field.rules[_j2];
                                    element = this.fieldElement(field);

                                    if (!(element == null)) {
                                        _context2.next = 20;
                                        break;
                                    }

                                    throw dilu.errors.fieldElementCanntNull();

                                case 20:
                                    value = FormValidator.elementValue(element);
                                    p = rule.validate(value);

                                    if (typeof p == 'boolean') {
                                        p = Promise.resolve(p);
                                    }
                                    _context2.next = 25;
                                    return p;

                                case 25:
                                    isPass = _context2.sent;

                                    this.showElement(!isPass, field, rule, element);

                                    if (isPass) {
                                        _context2.next = 29;
                                        break;
                                    }

                                    return _context2.abrupt('return', false);

                                case 29:
                                    _j2++;
                                    _context2.next = 15;
                                    break;

                                case 32:
                                    return _context2.abrupt('return', true);

                                case 33:
                                case 'end':
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, this);
                }));
            }
        }, {
            key: 'showElement',
            value: function showElement(display, field, rule, element) {
                var errorElement = this.fieldErrorElement(field);
                console.assert(errorElement != null, 'errorElement cannt be null.');
                if (rule.error != null) {
                    errorElement = field.errorElement;
                    var name = this.elementName(element);
                    var errorText = typeof rule.error == 'string' ? rule.error : rule.error() || '';
                    errorElement.innerHTML = errorText.replace('%s', name);
                }
                if (display) {
                    errorElement.style.removeProperty('display');
                } else {
                    errorElement.style.display = 'none';
                }
            }
            /**
             * 异步验证 HTML 元素
             * @param name HTML 元素名称
             */

        }, {
            key: 'checkElementAsync',
            value: function checkElementAsync(name) {
                var field = this.fields.filter(function (o) {
                    return o.name == name;
                })[0];
                if (!field) throw dilu.errors.elementNotExists(name);
                return this.checkFieldAsync(field);
            }
            /**
             * 同步验证 HTML 元素
             * @param name HTML 元素名称
             */

        }, {
            key: 'checkElement',
            value: function checkElement(name) {
                var field = this.fields.filter(function (o) {
                    return o.name == name;
                })[0];
                if (!field) throw dilu.errors.elementNotExists(name);
                return this.checkField(field);
            }
        }, {
            key: 'elementName',
            value: function elementName(element) {
                if (element.tagName == "TEXTAREA") {
                    return element.name;
                }
                return element.name;
            }
        }], [{
            key: 'elementValue',
            value: function elementValue(element) {
                if (element.tagName == "TEXTAREA") {
                    return element.value;
                }
                return element.value;
            }
        }]);

        return FormValidator;
    }();

    FormValidator.errorClassName = 'validationMessage';
    dilu.FormValidator = FormValidator;
})(dilu || (dilu = {}));
var dilu;
(function (dilu) {
    var ruleRegex = /^(.+?)\[(.+)\]$/,
        numericRegex = /^[0-9]+$/,
        integerRegex = /^\-?[0-9]+$/,
        decimalRegex = /^\-?[0-9]*\.?[0-9]+$/,
        emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        alphaRegex = /^[a-z]+$/i,
        alphaNumericRegex = /^[a-z0-9]+$/i,
        alphaDashRegex = /^[a-z0-9_\-]+$/i,
        naturalRegex = /^[0-9]+$/i,
        naturalNoZeroRegex = /^[1-9][0-9]*$/i,
        ipRegex = /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/i,
        base64Regex = /[^a-zA-Z0-9\/\+=]/i,
        numericDashRegex = /^[\d\-\s]+$/,
        urlRegex = /^((http|https):\/\/(\w+:{0,1}\w*@)?(\S+)|)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,
        mobileRegex = /^1[34578]\d{9}$/,
        dateRegex = /\d{4}-\d{1,2}-\d{1,2}/;
    var msgs = {
        required: '%s不能为空',
        matches: '%s与%s不匹配',
        "default": 'The %s field is still set to default, please change.',
        equal: '%s和%s必须相同',
        email: '不是有效的邮箱地址',
        valid_emails: 'The %s field must contain all valid email addresses.',
        minLength: '%s至少包含%s个字符',
        maxLength: '%s不能超过%s字符',
        exact_length: 'The %s field must be exactly %s characters in length.',
        greater_than: 'The %s field must contain a number greater than %s.',
        less_than: 'The %s field must contain a number less than %s.',
        alpha: 'The %s field must only contain alphabetical characters.',
        alpha_numeric: 'The %s field must only contain alpha-numeric characters.',
        alpha_dash: 'The %s field must only contain alpha-numeric characters, underscores, and dashes.',
        numeric: '请数入数字',
        integer: 'The %s field must contain an integer.',
        decimal: 'The %s field must contain a decimal number.',
        is_natural: 'The %s field must contain only positive numbers.',
        is_natural_no_zero: 'The %s field must contain a number greater than zero.',
        ip: 'The %s field must contain a valid IP.',
        valid_base64: 'The %s field must contain a base64 string.',
        valid_credit_card: 'The %s field must contain a valid credit card number.',
        is_file_type: 'The %s field must contain only %s files.',
        valid_url: 'The %s field must contain a valid URL.',
        greater_than_date: 'The %s field must contain a more recent date than %s.',
        less_than_date: 'The %s field must contain an older date than %s.',
        greater_than_or_equal_date: 'The %s field must contain a date that\'s at least as recent as %s.',
        less_than_or_equal_date: 'The %s field must contain a date that\'s %s or older.',
        mobile: '请输入正确的手机号码',
        custom: '请输入正确制'
    };
    function createValidation(validate, error) {
        return {
            validate: validate,
            error: error
        };
    }
    function calc(value) {
        if (typeof value == 'function') return value();
        return value;
    }
    /**
     * 表单验证规则
     */
    dilu.rules = {
        /**
         * 验证必填字段
         * @param error 错误提示文字
         */
        required: function required(error) {
            var validate = function validate(value) {
                return value != '';
            };
            return createValidation(validate, error || msgs.required);
        },

        /**
         * 验证两个字段值是否相等
         * @param otherElement 另外一个字段
         * @param error 错误提示文字
         */
        matches: function matches(otherElement, error) {
            var validate = function validate(value) {
                return value == dilu.FormValidator.elementValue(otherElement);
            };
            return createValidation(validate, error || msgs.required);
        },

        /**
         * 验证邮箱
         * @param error 错误提示文字
         */
        email: function email(error) {
            var validate = function validate(value) {
                return emailRegex.test(value);
            };
            return createValidation(validate, error || msgs.required);
        },

        /**
         * 验证字段最小长度
         * @param length 最小长度
         * @param error 错误提示文字
         */
        minLength: function minLength(length, error) {
            var validate = function validate(value) {
                return (value || '').length >= calc(length);
            };
            return createValidation(validate, error || msgs.minLength);
        },

        /**
         * 验证字段的最大长度
         * @param length 最大长度
         * @param error 错误提示文字
         */
        maxLength: function maxLength(length, error) {
            var validate = function validate(value) {
                return (value || '').length <= calc(length);
            };
            return createValidation(validate, error || msgs.matches);
        },

        /**
         * 验证字段大于指定的值
         * @param value 指定的值
         * @param error 错误提示文字
         */
        greaterThan: function greaterThan(value, error) {
            var validate = function validate(o) {
                return elementValueCompare(o, calc(value)) == 'greaterThan';
            };
            return createValidation(validate, error || msgs.greater_than);
        },

        /**
         * 验证字段小于指定的值
         * @param value 指定的值
         * @param error 错误提示文字
         */
        lessThan: function lessThan(value, error) {
            var validate = function validate(o) {
                return elementValueCompare(o, calc(value)) == 'lessThan';
            };
            return createValidation(validate, error || msgs.less_than);
        },

        /**
         * 验证字段等于指定的值
         * @param value 指定的值
         * @param error 错误提示文字
         */
        equal: function equal(value, error) {
            var validate = function validate(o) {
                return elementValueCompare(o, calc(value)) == 'equal';
            };
            return createValidation(validate, error || msgs.equal);
        },

        /**
         * 验证字段为 IP
         * @param error 错误提示文字
         */
        ip: function ip(error) {
            var validate = function validate(value) {
                return ipRegex.test(value);
            };
            return createValidation(validate, error || msgs.ip);
        },

        /**
         * 验证字段为 URL
         * @param error 错误提示文字
         */
        url: function url(error) {
            var validate = function validate(value) {
                return urlRegex.test(value);
            };
            return createValidation(validate, error || msgs.valid_url);
        },

        /**
         * 验证字段为手机号码
         * @param error 错误提示文字
         */
        mobile: function mobile(error) {
            var validate = function validate(value) {
                return mobileRegex.test(value);
            };
            return createValidation(validate, error || msgs.mobile);
        },

        /**
         * 验证字段为数字
         * @param error 错误提示文字
         */
        numeric: function numeric(error) {
            var validate = function validate(value) {
                return numericRegex.test(value);
            };
            return createValidation(validate, error || msgs.numeric);
        },

        /**
         * 自定义验证
         * @param validate 自定义验证的方法
         * @param error 错误提示文字
         */
        custom: function custom(validate, error) {
            return createValidation(validate, error || msgs.custom);
        }
    };
    function elementValueCompare(value, otherValue) {
        var elementValue = void 0;
        if (typeof otherValue == 'number') {
            elementValue = decimalRegex.test(value) ? parseFloat(value) : null;
        } else if (typeof otherValue == 'string') {
            elementValue = value;
        } else {
            elementValue = getValidDate(value);
        }
        if (elementValue < otherValue) return 'lessThan';else if (elementValue > otherValue) return 'greaterThan';else return 'equal';
    }
    /**
     * private function _getValidDate: helper function to convert a string date to a Date object
     * @param date (String) must be in format yyyy-mm-dd or use keyword: today
     * @returns {Date} returns false if invalid
     */
    function getValidDate(date) {
        if (!date.match('today') && !date.match(dateRegex)) {
            return null;
        }
        var validDate = new Date(),
            validDateArray;
        if (!date.match('today')) {
            validDateArray = date.split('-');
            validDate.setFullYear(validDateArray[0]);
            validDate.setMonth(validDateArray[1] - 1);
            validDate.setDate(validDateArray[2]);
        }
        return validDate;
    }
    ;
})(dilu || (dilu = {}));
