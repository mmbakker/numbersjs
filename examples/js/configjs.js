(function(window){

"use strict";

/**
 * Tiny config key/value store.
 *
 * @param {object} config The comlplete config key/value store with default values.
 */
function Config(config)
{
    this.storage = config;
}

/**
 * Set a single key.
 *
 * @param {string} key                   The key to update.
 * @param {string|number|function} value The value to write.
 */
Config.prototype.set = function(key, value)
{
    if (!(key in this.storage)) {
        throw new Error('Config key "' + key + '" not found.');
    }

    this.storage[key] = value;
};

/**
 * Gets a single value.
 *
 * @param  {string} key The key of which value to retrieve.
 *
 * @return {any}     [description]
 */
Config.prototype.get = function(key)
{
    if (key in this.storage) {
        return this.storage[key];
    }
};

/**
 * Apply a (partial) config to the existing one.
 *
 * @param  {object} config The config to use for uodating.
 */
Config.prototype.apply = function(config)
{
    var key;

    for (key in this.storage) {
        if (key in config) {
            this.storage[key] = config[key];
        }
    }
};

Namespace('mmbakker', {
    Config: Config
});

}(window));
