/**
 * TinyMCE implementation for WYSIWYG inputs
 * charcoal/admin/property/input/tinymce
 *
 * Require:
 * - jQuery
 * - tinyMCE
 *
 * @param  {Object}  opts Options for input property
 */
Charcoal.Admin.Property_Input_SirTrevor = function (opts) {
    this.input_type             = 'charcoal/admin/property/input/sir-trevor';
    // Property_Input_DualSelect properties
    this.input_id               = null;
    this.sirTrevor_options      = {};
    this.sirTrevor_blockOptions = {};
    this._sirTrevor             = null;

    this.set_properties(opts).init();
};
Charcoal.Admin.Property_Input_SirTrevor.prototype             = Object.create(Charcoal.Admin.Property.prototype);
Charcoal.Admin.Property_Input_SirTrevor.prototype.constructor = Charcoal.Admin.Property_Input_SirTrevor;
Charcoal.Admin.Property_Input_SirTrevor.prototype.parent      = Charcoal.Admin.Property.prototype;

/**
 * Init plugin
 * @return {thisArg} Chainable.
 */
Charcoal.Admin.Property_Input_SirTrevor.prototype.init = function () {
    this.create_sirTrevor();
};

Charcoal.Admin.Property_Input_SirTrevor.prototype.set_properties = function (opts, array) {
    array                  = array || [];
    this.input_id          = opts.id || this.input_id;
    this.sirTrevor_options = opts.sirTrevor_options || opts.data.sirTrevor_options || this.sirTrevor_options;

    var default_options = {
        el         : $('#' + this.input_id)
    };

    var blockOptions                        = this.sirTrevor_options['block_options'];
    this.sirTrevor_options['block_options'] = [];

    this.sirTrevor_options      = $.extend({}, default_options, this.sirTrevor_options);
    this.sirTrevor_blockOptions = blockOptions;
    return this;
};

Charcoal.Admin.Property_Input_SirTrevor.prototype.create_sirTrevor = function () {
    var sirTrevorInstance = new SirTrevor.Editor(this.sirTrevor_options);

    if (this.sirTrevor_blockOptions)
        sirTrevorInstance.setBlockOptions(this.sirTrevor_blockOptions);
    this.set_sirTrevor(sirTrevorInstance);
};

/**
 * Sets the sir-trevor into the current object
 * Might be usefull.
 * @param {sir-trevor Editor} sirTrevor
 * @return {thisArg} Chainable
 */
Charcoal.Admin.Property_Input_SirTrevor.prototype.set_sirTrevor = function (sirTrevor) {
    this._sirTrevor = sirTrevor;
    return this;
};

/**
 * Returns the sir-trevor object
 * @return {sir-trevor Editor} sir-trevor The sir-trevor object.
 */
Charcoal.Admin.Property_Input_SirTrevor.prototype.sirTrevor = function () {
    return this._sirTrevor;
};

/**
 * Destroy what needs to be destroyed
 * @return {sir-trevor Editor} sir-trevor The sir-trevor object.
 */
Charcoal.Admin.Property_Input_SirTrevor.prototype.destroy = function () {
    var sirTrevor = this.sirTrevor();

    if (sirTrevor) {
        sirTrevor.remove();
    }
};

