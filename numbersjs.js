/**
 * numbersjs
 *
 * A tiny number formatting library for easy formatting of numbers.
 *
 * @author Michiel Bakker
 * @license MIT
 */
(function(){

    "use strict";

    var version = '0.0.1',
        defaultSettings = {
            decimalSeparator : '.', // E.g. 123.45
            thousandSeparator: ',', // E.g. 12,000 for twelve thousand
            roundToDecimals: 2,     // Round to this many decimals; FALSE to disable
            forceDecimals: false    // Add trailing zeroes if less than the number
        };

    function NumberFormatter(settings)
    {
        this.config = defaultSettings || settings;
    }

    NumberFormatter.version = version;

    NumberFormatter.prototype.format = function(value)
    {
        var roundingFactor, characteristic, decimals, formattingHelper,
            formattedValue = parseFloat(value);

        if (isNaN(formattedValue) || !isFinite(formattedValue)) {
            throw new Error('Could not interpret given value as float.');
        }

        // Round.
        if (!isNaN(this.config.roundToDecimals) || isFinite(this.config.roundToDecimals)) {
            roundingFactor = Math.pow(10, this.config.roundToDecimals);

            formattedValue = formattedValue * roundingFactor;
            formattedValue = Math.round(formattedValue);
            formattedValue = formattedValue / roundingFactor;
        }

        formattingHelper = formattedValue.toString().split('.');
        characteristic   = formattingHelper[0];
        decimals         = formattingHelper[1] || '0';

        // Format thousand separator.
        if (this.config.thousandSeparator) {
            formattingHelper = '';

            if (characteristic.length > 3) {
                while (characteristic.length > 3) {
                    formattingHelper = characteristic.substr(-3) + this.config.thousandSeparator + formattingHelper;
                    characteristic   = characteristic.substr(0, characteristic.length - 3);
                }

                if (characteristic.length) {
                    characteristic = characteristic + this.config.thousandSeparator + formattingHelper;
                } else {
                    characteristic = formattingHelper;
                }
            }
        }

        // Add trailing zeroes if required.
        if (this.config.forceDecimals) {
            while (decimals.length < this.config.roundToDecimals) {
                decimals += '0';
            }
        }

        // Add decimal separator.
        formattedValue = characteristic + this.config.decimalSeparator + decimals;

        return formattedValue;
    };

    window.MB = window.MB || {};
    window.MB.NumberFormatter = NumberFormatter;

}());
