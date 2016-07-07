/**
 * Sir Trevor Input Property
 *
 * charcoal/admin/property/input/sir-trevor
 *
 * Require:
 * - Sir Trevor
 *
 * @param  {Object}  opts Options for input property
 */
Charcoal.Admin.Property_Input_SirTrevor = function (opts) {
    this.input_type = 'charcoal/admin/property/input/sir-trevor';

    this.input_id       = null;
    this.$input_id      = null;
    this.editor         = null;
    this.editor_options = {};
    this.block_options  = [];

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
    this.create_editor();
};

Charcoal.Admin.Property_Input_SirTrevor.prototype.set_properties = function (opts) {
    this.input_id  = opts.id || this.input_id;
    this.$input_id = $('#' + this.input_id);

    this.editor_options = opts.data || this.editor_options || {};
    this.block_options  = this.editor_options.block_options || [];

    this.editor_options.el = this.$input_id[0];
    this.editor_options.language = this.$input_id.closest('[data-lang]').data('lang');
    this.editor_options.supressKeyListeners = true;

    SirTrevor.setDefaults({
        iconUrl     : Charcoal.Admin.base_url() + 'assets/admin/images/sir-trevor-icons.svg',
        uploadUrl   : Charcoal.Admin.admin_url() + 'property/sir-trevor/upload',
        baseImageUrl: Charcoal.Admin.base_url(),
        topControls: true,
        // formatBar   : {
        //     commands: [
        //         {
        //             name   : "Bold",
        //             title  : "bold",
        //             cmd    : "bold",
        //             keyCode: 66,
        //             text   : "B"
        //         },
        //         {
        //             name   : "Italic",
        //             title  : "italic",
        //             cmd    : "italic",
        //             keyCode: 73,
        //             text   : "i"
        //         },
        //         {
        //             name    : "Link",
        //             title   : "link",
        //             iconName: "link",
        //             cmd     : "linkPrompt",
        //             text    : "link"
        //         },
        //         {
        //             name    : "Unlink",
        //             title   : "unlink",
        //             iconName: "link",
        //             cmd     : "unlink",
        //             text    : "link"
        //         },
        //         {
        //             name : "justifyLeft",
        //             title: "justifyleft",
        //             cmd  : "justifyLeft",
        //             text : ""
        //         },
        //         {
        //             name : "justifyCenter",
        //             title: "justifycenter",
        //             cmd  : "justifyCenter",
        //             text : ""
        //         },
        //         {
        //             name : "justifyRight",
        //             title: "justifyright",
        //             cmd  : "justifyRight",
        //             text : ""
        //         }
        //     ]
        // }
    });

    SirTrevor.setBlockOptions('Text', {
        supressKeyListeners: true,
    });

    return this;
};

Charcoal.Admin.Property_Input_SirTrevor.prototype.create_editor = function () {
    this.editor = new SirTrevor.Editor(this.editor_options);

    $.each(this.block_options, function (block, options) {
        this.editor.setBlockOptions(block, options);
    });
};

/**
 * Destroy what needs to be destroyed
 * @return {sir-trevor Editor} sir-trevor The sir-trevor object.
 */
Charcoal.Admin.Property_Input_SirTrevor.prototype.destroy = function () {
    if (this.editor) {
        this.editor.destroy();
    }
};
