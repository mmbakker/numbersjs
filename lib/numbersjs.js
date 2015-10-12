/**
 * numbersjs
 *
 * A tiny number formatting library for easy formatting of numbers.
 *
 * @see    https://github.com/jaffog/numbersjs
 * @author Michiel Bakker (https)
 *
 * @license MIT
 *
 * ------------------------------------------------------------------------------
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Michiel Bakker (jaffog@gmail.com)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
(function(){

    "use strict";

    var version = '0.1.0',
        defaultSettings = {
            decimalSeparator : '.',  // E.g. 123.45
            thousandSeparator: ',',  // E.g. 12,000 for twelve thousand
            roundTo          : 2,    // Round to this many decimals; negative for rounding to whole numbers; FALSE to disable
            forceDecimals    : false // Add trailing zeroes if less than the number
        };

    function NumberFormatter(settings)
    {
        this.config = settings || defaultSettings;
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
        if (!isNaN(this.config.roundTo) && isFinite(this.config.roundTo) && this.config.roundTo !== false) {
            roundingFactor = Math.pow(10, this.config.roundTo);

            formattedValue = formattedValue * roundingFactor;
            formattedValue = Math.round(formattedValue);
            formattedValue = formattedValue / roundingFactor;
        }

        formattingHelper = formattedValue.toString().split('.');
        characteristic   = formattingHelper[0];
        decimals         = formattingHelper[1] || '';

        // Format thousand separator.
        if (this.config.thousandSeparator) {
            formattingHelper = '';

            if (characteristic.length > 3) {
                while (characteristic.length > 3) {
                    formattingHelper = characteristic.substr(-3) + (formattingHelper.length ? this.config.thousandSeparator + formattingHelper : '');
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
        if (this.config.forceDecimals && !isNaN(this.config.roundTo) && isFinite(this.config.roundTo) && this.config.roundTo !== false) {
            while (decimals.length < this.config.roundTo) {
                decimals += '0';
            }
        }

        // Add decimal separator.
        formattedValue = characteristic;

        if (decimals.length) {
            formattedValue += this.config.decimalSeparator + decimals;
        }

        return formattedValue;
    };

    // Add to the MB namespace.
    window.MB = window.MB || {};
    window.MB.NumberFormatter = NumberFormatter;

}());
