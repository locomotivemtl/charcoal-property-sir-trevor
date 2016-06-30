<?php

namespace Charcoal\Admin\Property\Input;

use \Charcoal\Admin\Property\AbstractSelectableInput;
use Charcoal\Translation\TranslationString;
use Mmes\Support\Traits\ParsableValueTrait;

/**
 * Select Options Input Property
 *
 * > The HTML _select_ (`<select>`) element represents a control that presents a menu of options.
 * — {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select}
 */
class SirTrevorInput extends AbstractSelectableInput
{
    use ParsableValueTrait;

    protected $searchable;
    protected $options;
    protected $dualSelectOptions;

    // FUNCTIONS
    // ==========================================================================

    /**
     * Retrieve the unselected options.
     *
     * @return Generator|array
     */
    public function unselectedChoices()
    {
        $choices = parent::choices();

        /* [^1] */
        foreach ($choices as $choice) {
            if (!$choice['selected']) {
                yield $choice;
            }
        }
    }

    /**
     * Retrieve the selectable options.
     *
     * @return Generator|array
     */
    public function selectedChoices()
    {
        $val = $this->p()->val();

        if ($val !== null) {

            $val = $this->p()->parseVal($val);

            if (!$this->p()->multiple()) {
                $val = [$val];
            }

            $choices = iterator_to_array(parent::choices());

            /* [^1] */
            foreach ($val as $v) {
                if (isset($choices[$v])) {
                    yield $choices[$v];
                }
            }
        }
    }

    public function options()
    {
        $opts = $this->dualSelectOptions;

        $optionName = array_keys($opts);

        foreach( $optionName as $optName ) {
            // if($optName === 'sort' && $opts[$optName] === false) {
            //     $this->options[$optName] = $this->defaultSort();
            //     continue;
            // }
            $this->options[$optName] = $opts[$optName];
        }

        // error_log(var_export($this->options, true));

        if ($this->options) {
            return json_encode($this->options);
        } else {
            return [];
        }
    }

    public function defaultSort()
    {
        return iterator_to_array(parent::choices());
    }

    // GETTERS
    // ==========================================================================

    /**
     * @return mixed
     */
    public function searchable()
    {
        $this->searchable = $this->dualSelectOptions['searchable'];

        $placeholder = new TranslationString([
            "en" => "Search...",
            "fr" => "Recherche..."
        ]);

        $defaultOptions = [
            "left"  => [
                "placeholder" => $placeholder
            ],
            "right" => [
                "placeholder" => $placeholder
            ]
        ];

        if (is_bool($this->searchable) && $this->searchable) {

            $this->searchable = $defaultOptions;

        } else if (is_array($this->searchable)) {

            if (isset($this->searchable['left']['placeholder'])) {
                $this->searchable['left']['placeholder'] = $this->parseTranslatable($this->searchable['left']['placeholder']);
            } elseif (isset($this->searchable['placeholder'])) {
                $this->searchable['left']['placeholder'] = $this->parseTranslatable($this->searchable['placeholder']);
            } else {
                $this->searchable['left']['placeholder'] = $placeholder;
            }

            if (isset($this->searchable['right']['placeholder'])) {
                $this->searchable['right']['placeholder'] = $this->parseTranslatable($this->searchable['right']['placeholder']);
            } elseif (isset($this->searchable['placeholder'])) {
                $this->searchable['right']['placeholder'] = $this->parseTranslatable($this->searchable['placeholder']);
            } else {
                $this->searchable['right']['placeholder'] = $placeholder;
            }

        } else {
            $this->searchable = false;
        }

        return $this->searchable;
    }

    /**
     * @return mixed
     */
    public function dualSelectOptions()
    {
        return $this->dualSelectOptions;
    }

    // SETTERS
    // ==========================================================================


    /**
     * @param mixed $dualSelectOptions
     * @return DualSelectInput
     */
    public function setDualSelectOptions($dualSelectOptions)
    {
        $this->dualSelectOptions = $dualSelectOptions;
        return $this;
    }

}
