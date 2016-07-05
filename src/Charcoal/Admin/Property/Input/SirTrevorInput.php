<?php

namespace Charcoal\Admin\Property\Input;

use Charcoal\Admin\Property\AbstractPropertyInput;
use Mmes\Support\Traits\ParsableValueTrait;

/**
 * Select Options Input Property
 *
 * > The HTML _select_ (`<select>`) element represents a control that presents a menu of options.
 * — {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select}
 */
class SirTrevorInput extends AbstractPropertyInput
{
    use ParsableValueTrait;

    protected $searchable;
    protected $options;
    protected $sirTrevorOptions;

    // FUNCTIONS
    // ==========================================================================

    public function options()
    {
        $opts = $this->sirTrevorOptions;

        $optionName = array_keys($opts);

        foreach( $optionName as $optName ) {
            $this->options[$optName] = $opts[$optName];
        }

        if ($this->options) {
            return json_encode($this->options);
        } else {
            return [];
        }
    }

    // GETTERS
    // ==========================================================================

    /**
     * @return mixed
     */
    public function sirTrevorOptions()
    {
        return $this->sirTrevorOptions;
    }

    // SETTERS
    // ==========================================================================

    /**
     * @param $sirTrevorOptions
     * @return $this
     */
    public function setSirTrevorOptions($sirTrevorOptions)
    {
        $this->sirTrevorOptions = $sirTrevorOptions;
        return $this;
    }

}
