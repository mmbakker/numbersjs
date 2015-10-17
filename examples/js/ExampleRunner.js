(function(window, $){

"use strict";

/**
 * Runtime for examples.
 */
function ExampleRunner(config)
{
    this.examples = [];

    this.config = config || {};

}

/**
 * Adds an example to the queue.
 *
 * @param {Example} example An example to run.
 */
ExampleRunner.prototype.addToQueue = function(example)
{
    if (!(example instanceof Example)) {
        throw new Error('Invalid argument: example needs to be an instance of Example.');
    }

    this.examples.push(example);
};

/**
 * Run the entire queue of examples.
 *
 * @return {number} The number of examples ran.
 */
ExampleRunner.prototype.run = function()
{
    var currentExample,
        i = 0,
        n = this.examples.length;

    for (; i < n; i++) {
        currentExample = this.examples[i];

        this.runExample(currentExample, i);
    }

    return i;
};

/**
 * Runs the given example.
 *
 * @param {Example} example An example to run.
 * @param {number}  id      The id associated with the example.
 */
ExampleRunner.prototype.runExample = function(example, id)
{
    if (!(example instanceof Example)) {
        throw new Error('Invalid argument: example needs to be an instance of Example.');
    }

    // Before the example.
    this.beforeExample(id, example);

    // Run the example.
    example.run(this, id);

    // After the session.
    this.afterExample(id, example);
};

/**
 * Prepare the example.
 *
 * @param  {[type]} id      [description]
 * @param  {[type]} example [description]
 * @return {[type]}         [description]
 */
ExampleRunner.prototype.beforeExample = function(id, example)
{
    if (!('beforeExample' in this.config) || typeof this.config.beforeExample !== 'function') {
        return;
    }

    this.config.beforeExample.call(window, id);
};

/**
 * After an example.
 *
 * @param  {number} id The id associated with an example.
 */
ExampleRunner.prototype.afterExample = function(id)
{
    if (!('afterExample' in this.config) || typeof this.config.afterExample !== 'function') {
        return;
    }

    this.config.afterExample.call(window, id);
};

Namespace('mmbakker.ExampleRunner', {
    ExampleRunner: ExampleRunner
});


/**
 * [Example description]
 */
function Example(example)
{
    this.example = null;
    this.registry = {};

    this.setExample(example);
}

Example.prototype.setExample = function(example)
{
    if (typeof example !== 'function') {
        throw new Error('Invalid argument: example should be a function.');
    }

    this.example = example;
};

Example.prototype.set = function(key, value)
{
    this.registry[key] = value;
};

Example.prototype.get = function(key)
{
    if (key in this.registry) {
        return this.registry[key];
    }
};

Example.prototype.run = function(exampleRunner, id)
{
    this.example.call(window, exampleRunner, id, this);
};

Namespace('mmbakker.ExampleRunner', {
    Example: Example
});


function Result()
{
    this.before = null;
    this.after = null;
}

Result.prototype.setBefore = function(before)
{
    this.before = before;
};

Result.prototype.getBefore = function()
{
    return this.before;
};

Result.prototype.setAfter = function(after)
{
    this.after = after;
};

Result.prototype.getAfter = function()
{
    return this.after;
};

Namespace('mmbakker.ExampleRunner', {
    Result: Result
});


/*
function insertExample(id, numbers, config)
{
    var newNode,
        formatter       = new MB.NumberFormatter(config),
        i               = 0,
        n               = numbers.length,
        domNodeTemplate = document.getElementById('rowTemplate-' + id),
        domTarget       = document.getElementById('target-' + id);

    showConfig(id, config);

    domNodeTemplate.parentNode.removeChild(domNodeTemplate);
    domNodeTemplate.id = '';

    for (; i < n; i++) {
        newNode = domNodeTemplate.cloneNode(true);

        newNode.getElementsByTagName('td')[0].innerHTML = numbers[i];
        newNode.getElementsByTagName('td')[1].firstChild.innerHTML = formatter.format(numbers[i]);

        domTarget.appendChild(newNode);
    }
}

function showConfig(id, config)
{
    var key,
        output    = '{'
        domTarget = document.getElementById('config-' + id);

    for (key in config) {
        output += "\n" + '    ' + key + ': ' + getConfigValue(config[key]) + ',';
    }

    output  = output.substr(0, output.length - 1);
    output += "\n" + '}';

    domTarget.innerHTML = output;
}

function getConfigValue(value)
{
    return typeof value === 'string' ? "'" + value + "'" : value;
}
*/

}(window));
