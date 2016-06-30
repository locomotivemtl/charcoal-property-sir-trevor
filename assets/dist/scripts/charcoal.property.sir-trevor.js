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
Charcoal.Admin.Property_Input_SirTrevor = function (opts)
{
    this.input_type = 'charcoal/admin/property/input/sir-trevor';
    // Property_Input_DualSelect properties
    this.input_id = null;
    this.sirTrevor_options = {};
    this._sirTrevor = null;
    this.sortArray = {};

    this.set_properties(opts).init();
};
Charcoal.Admin.Property_Input_SirTrevor.prototype = Object.create(Charcoal.Admin.Property.prototype);
Charcoal.Admin.Property_Input_SirTrevor.prototype.constructor = Charcoal.Admin.Property_Input_SirTrevor;
Charcoal.Admin.Property_Input_SirTrevor.prototype.parent = Charcoal.Admin.Property.prototype;

/**
 * Init plugin
 * @return {thisArg} Chainable.
 */
Charcoal.Admin.Property_Input_SirTrevor.prototype.init = function ()
{

    this.create_sirTrevor();
};

Charcoal.Admin.Property_Input_SirTrevor.prototype.set_properties = function (opts, array) {
    array                  = array || [];
    this.input_id          = opts.id || this.input_id;
    this.sirTrevor_options = opts.sirTrevor_options || opts.data.sirTrevor_options || this.sirTrevor_options;

    return this;
};

Charcoal.Admin.Property_Input_SirTrevor.prototype.create_sirTrevor = function ()
{
    var sirTrevorInstance = new SirTrevor.Editor({ el: $('.js-st-instance') });
    this.set_sirTrevor(sirTrevorInstance);
};

/**
 * Sets the dualselect into the current object
 * Might be usefull.
 * @param {sir-trevor Editor} sirTrevor
 * @return {thisArg} Chainable
 */
Charcoal.Admin.Property_Input_SirTrevor.prototype.set_sirTrevor = function (sirTrevor)
{
    this._sirTrevor = sirTrevor;
    return this;
};

/**
 * Returns the dualselect object
 * @return {TinyMCE Editor} dualselect The tinymce object.
 */
Charcoal.Admin.Property_Input_SirTrevor.prototype.sirTrevor = function ()
{
    return this._sirTrevor;
};

/**
 * Destroy what needs to be destroyed
 * @return {TinyMCE Editor} dualselect The tinymce object.
 */
Charcoal.Admin.Property_Input_SirTrevor.prototype.destroy = function ()
{
    var dualselect = this.dualselect();

    if (dualselect) {
        dualselect.remove();
    }
};

