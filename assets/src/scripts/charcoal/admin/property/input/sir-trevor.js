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
    this.dualinput_options = {};
    this._dualselect = null;
    this.sortArray = {};

    this.set_properties(opts).init();
};
Charcoal.Admin.Property_Input_DualSelect.prototype = Object.create(Charcoal.Admin.Property.prototype);
Charcoal.Admin.Property_Input_DualSelect.prototype.constructor = Charcoal.Admin.Property_Input_SirTrevor;
Charcoal.Admin.Property_Input_DualSelect.prototype.parent = Charcoal.Admin.Property.prototype;

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
    this.dualinput_options = opts.dualinput_options || opts.data.dualinput_options || this.dualinput_options;

    var id = '#' + this.input_id;

    var default_options = {
        keepRenderingSort: false,
        left: id + '_from',
        right: id + '_to',
        rightAll: id + 'right_All',
        rightSelected: id + 'right_Selected',
        leftSelected: id + 'left_Selected',
        leftAll: id + 'left_All'
    };

    if (opts.data.dualinput_options.searchable) {
        this.dualinput_options.search = {
            left: id + '_searchLeft',
            right: id + '_searchRight'
        };
    }

    if (this.dualinput_options.sort && this.dualinput_options.sort !== false) {
        this.sortArray = this.dualinput_options.sort;
        var arr = [];
        for (var ident in this.sortArray) {
            arr.push(this.sortArray[ident].value);
        }
        this.sortArray = arr;
        console.log(this.sortArray);
        this.dualinput_options.sort = this.default_sort();
    }

    this.dualinput_options = $.extend({}, default_options, this.dualinput_options);
    return this;
};

Charcoal.Admin.Property_Input_SirTrevor.prototype.create_sirTrevor = function ()
{
    new SirTrevor.Editor({ el: $('.js-st-instance') });

};

/**
 * Sets the dualselect into the current object
 * Might be usefull.
 * @param {TinyMCE Editor} dualselect The tinymce object.
 * @return {thisArg} Chainable
 */
Charcoal.Admin.Property_Input_SirTrevor.prototype.set_dualselect = function (dualselect)
{
    this._dualselect = dualselect;
    return this;
};

/**
 * Returns the dualselect object
 * @return {TinyMCE Editor} dualselect The tinymce object.
 */
Charcoal.Admin.Property_Input_SirTrevor.prototype.dualselect = function ()
{
    return this._dualselect;
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

