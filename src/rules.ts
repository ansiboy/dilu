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
        dateRegex = /\d{4}-\d{1,2}-\d{1,2}/;

    let msgs = {
        required: '%s 不允许为空',
        matches: '%s 与 %s 不匹配',
        "default": 'The %s field is still set to default, please change.',
        equal: '%s 字段 和 %s 必须相同',
        email: '%s 不是有效的邮箱地址',
        valid_emails: 'The %s field must contain all valid email addresses.',
        minLength: '%s 至少包含 %s 个字符',
        maxLength: '%s 不能超过 %s 字符',
        exact_length: 'The %s field must be exactly %s characters in length.',
        greater_than: 'The %s field must contain a number greater than %s.',
        less_than: 'The %s field must contain a number less than %s.',
        alpha: 'The %s field must only contain alphabetical characters.',
        alpha_numeric: 'The %s field must only contain alpha-numeric characters.',
        alpha_dash: 'The %s field must only contain alpha-numeric characters, underscores, and dashes.',
        numeric: 'The %s field must contain only numbers.',
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
        mobile: '%s 不是有效的手机号码'
    }


    export type Options = {
        display?: string,
        message?: string
    }

    let errorMessage = (pattern: string, element: HTMLInputElement, options: Options) => {
        options = options || {};
        if (options.message)
            return options.message;

        let display = options.display || element.name || '';
        return pattern.replace('%s', display);
    }

    export let rules = {
        required: function (element: HTMLInputElement, options?: Options): Rule {
            if (!element) throw errors.argumentNull('element');

            let message = errorMessage(msgs.required, element, options);
            let validate = () => (element.value || '') != '';;
            return createInputValidator(element, msgs.required, validate, options);
        },
        matches: function (element: HTMLInputElement, otherElement: HTMLInputElement, options?: Options): Rule {
            if (!element) throw errors.argumentNull('element');
            if (!otherElement) throw errors.argumentNull('otherElement');

            var validate = () => element.value == otherElement.value;
            return createInputValidator(element, msgs.matches, validate, options);
        },
        email: function (element: HTMLInputElement, options?: Options): Rule {
            if (!element) throw errors.argumentNull('element');

            let message = errorMessage(msgs.email, element, options);
            var validate = () => emailRegex.test(element.value);
            return new Rule(element, validate, message);
        },
        minLength: function (element: HTMLInputElement, length: number, options?: Options) {
            if (!element) throw errors.argumentNull('element');

            var validate = () => (element.value || '').length >= length;
            return createInputValidator(element, msgs.minLength, validate, options);
        },
        maxLength: function (element: HTMLInputElement, length: number, options?: Options) {
            if (!element) throw errors.argumentNull('element');

            var validate = () => (element.value || '').length <= length;
            return createInputValidator(element, msgs.maxLength, validate, options);
        },
        greaterThan: function (element: HTMLInputElement, value: number | Date, options: Options) {
            if (!element) throw errors.argumentNull('element');
            if (value == null) throw errors.argumentNull('value');

            var validate = () => elementValueCompare(element, value) == 'greaterThan';

            return createInputValidator(element, msgs.greater_than, validate, options);
        },
        lessThan: function (element: HTMLInputElement, value: number | Date | string, options: Options) {
            if (!element) throw errors.argumentNull('element');

            let message = errorMessage(msgs.email, element, options);
            var validate = () => elementValueCompare(element, value) == 'lessThan';

            return new Rule(element, validate, message);
        },
        equal: function (element: HTMLInputElement, value: number | Date | string, options?: Options) {
            if (!element) throw errors.argumentNull('element');
            if (value == null) throw errors.argumentNull('value');

            let message = errorMessage(msgs.equal, element, options);
            var validate = () => elementValueCompare(element, value) == 'greaterThan';

            return new Rule(element, validate, message);
        },
        ip: function (element: HTMLInputElement, options: Options) {
            if (!element) throw errors.argumentNull('element');

            let message = errorMessage(msgs.ip, element, options);
            var validate = () => ipRegex.test(element.value);

            return new Rule(element, validate, message);
        },
        url: function (element: HTMLInputElement, options?: Options) {
            if (!element) throw errors.argumentNull('element');
            let message = errorMessage(msgs.email, element, options);
            var validate = () => urlRegex.test(element.value);
            return new Rule(element, validate, message);
        },
        mobile: function (element: HTMLInputElement, options?: Options) {
            options = options || {};
            return {
                name: element.name,
                element: element,
                display: options.display,
                messages: { 'mobile': options.message },
                rules: ['mobile']
            }
        },
    };


    function createInputValidator(element: HTMLInputElement, errorPattern: string, validate: () => boolean, options: Options) {
        if (!element) throw errors.argumentNull('element');
        let message = errorMessage(msgs.email, element, options);
        return new Rule(element, validate, message);
    }

    function elementValueCompare<T extends number | Date | string>(element: HTMLInputElement, value: T): 'lessThan' | 'greaterThan' | 'equal' {

        let elementValue: number | Date | string;
        if (typeof value == 'number') {
            elementValue = decimalRegex.test(element.value) ? parseFloat(element.value) : null;
        }
        else if (typeof value == 'string') {
            elementValue = element.value;
        }
        else {
            elementValue = getValidDate(element.value);
        }

        if (elementValue < value)
            return 'lessThan';
        else if (elementValue > value)
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