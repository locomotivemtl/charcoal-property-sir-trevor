<?php

namespace Charcoal\Admin\Property\Input;

use \Charcoal\Admin\Property\AbstractPropertyInput;
use \Charcoal\Support\Property\ParsableValueTrait;

/**
 * Sir Trevor Input Property
 *
 * @link https://github.com/madebymany/sir-trevor-js
 */
class SirTrevorInput extends AbstractPropertyInput
{
    use ParsableValueTrait;

    protected $searchable;
    protected $options;
    protected $sirTrevorOptions;

    /**
     * Retrieve the property control classes.
     *
     * @return string
     */
    public function inputClass()
    {
        return $this->inputClass.' js-st-instance col-xs-12';
    }

    // FUNCTIONS
    // ==========================================================================

    public function options()
    {
        $opts = $this->sirTrevorOptions();

        $optionName = array_keys($opts);

        foreach ($optionName as $optName) {
            $this->options[$optName] = $opts[$optName];
        }

        if ($this->options) {
            return json_encode($this->options);
        } else {
            return '{}';
        }
    }

    // GETTERS
    // ==========================================================================

    /**
     * @return mixed
     */
    public function sirTrevorOptions()
    {
        if (!is_array($this->sirTrevorOptions)) {
            $this->sirTrevorOptions = [];
        }

        return $this->sirTrevorOptions;
    }

    // SETTERS
    // ==========================================================================

    /**
     * @param $sirTrevorOptions
     * @return $this
     */
    public function setSirTrevorOptions($options)
    {
        $this->sirTrevorOptions = $options;

        return $this;
    }
}
