namespace dilu {

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

    let msgs = {
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
        mobile: '请输入正确的手机号码'
    }


    export type RuleError = string;
    export type Validate = (value) => boolean | Promise<boolean>;
    export type RuleDepend = Rule | (() => boolean);
    export type Rule = {
        validate: (value) => boolean | Promise<boolean>,
        error?: RuleError,
    }

    function createValidation(validate: (value) => boolean | Promise<boolean>, error: RuleError): Rule {
        return {
            validate: validate,
            error: error
        }
    }

    export let rules = {
        required(error?: RuleError) {
            let validate = (value) => value != '';
            return createValidation(validate, error || msgs.required);
        },
        matches: function (otherElement: InputElement, error?: RuleError): Rule {
            var validate = (value: string) => value == FormValidator.elementValue(otherElement); //otherElement.value;
            return createValidation(validate, error || msgs.required);
        },
        email: function (error?: RuleError): Rule {
            var validate = (value) => emailRegex.test(value);
            return createValidation(validate, error || msgs.required);
        },
        minLength: function (length: number, error?: RuleError): Rule {
            var validate = (value) => (value || '').length >= length;
            return createValidation(validate, error || msgs.minLength);
        },
        maxLength: function (length: number, error?: RuleError) {
            var validate = (value) => (value || '').length <= length;
            return createValidation(validate, error || msgs.matches);
        },
        greaterThan: function (value: number | Date, error: RuleError) {
            var validate = (o) => elementValueCompare(o, value) == 'greaterThan';
            return createValidation(validate, error || msgs.greater_than);
        },
        lessThan: function (value: number | Date | string, error: RuleError) {
            var validate = (o) => elementValueCompare(o, value) == 'lessThan';
            return createValidation(validate, error || msgs.less_than);
        },
        equal: function (value: number | Date | string, error?: RuleError) {
            var validate = (o) => elementValueCompare(o, value) == 'greaterThan';
            return createValidation(validate, error || msgs.equal);
        },
        ip: function (error: RuleError): Rule {
            var validate = (value) => ipRegex.test(value);
            return createValidation(validate, error || msgs.ip);
        },
        url: function (error?: RuleError): Rule {
            var validate = (value) => urlRegex.test(value);
            return createValidation(validate, error || msgs.valid_url);
        },
        mobile: function (error?: RuleError): Rule {
            var validate = (value) => mobileRegex.test(value);
            return createValidation(validate, error || msgs.mobile);
        },
        numeric: function (error?: RuleError): Rule {
            var validate = (value) => numericRegex.test(value);
            return createValidation(validate, error || msgs.numeric);
        },
        custom: function (validate: (value) => boolean | Promise<boolean>, error: string) {
            return createValidation(validate, error);
        }
    };

    function elementValueCompare<T extends number | Date | string>(value: string, otherValue: T): 'lessThan' | 'greaterThan' | 'equal' {

        let elementValue: number | Date | string;
        if (typeof otherValue == 'number') {
            elementValue = decimalRegex.test(value) ? parseFloat(value) : null;
        }
        else if (typeof otherValue == 'string') {
            elementValue = value;
        }
        else {
            elementValue = getValidDate(value);
        }

        if (elementValue < otherValue)
            return 'lessThan';
        else if (elementValue > otherValue)
            return 'greaterThan';
        else
            return 'equal';
    }

    /**
     * private function _getValidDate: helper function to convert a string date to a Date object
     * @param date (String) must be in format yyyy-mm-dd or use keyword: today
     * @returns {Date} returns false if invalid
     */
    function getValidDate(date): Date {
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
    };
}