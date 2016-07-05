<?php

namespace Charcoal\Admin\Property;

class SirTrevorCollection implements
    \Countable,
    \IteratorAggregate,
    \JsonSerializable
{
    protected $propertyMetadata;
    protected $contentBlocks;

    protected $block_templates = [
        'text' => 'charcoal/sir-trevor/text',
        'image' => 'charcoal/sir-trevor/image',
        'video' => 'charcoal/sir-trevor/video',
        'quote' => 'charcoal/sir-trevor/quote'
    ];

    public function __construct($contentBlocks, $property_metadata)
    {
        $this->propertyMetadata = $property_metadata;
        $this->contentBlocks = $contentBlocks;
    }

    public function getIterator()
    {
        return new \ArrayIterator($this->contentBlocks);
    }

    public function count()
    {
        return count($this->contentBlocks);
    }

    function jsonSerialize()
    {
        return $this->contentBlocks;
    }


    public function blocks()
    {
        foreach ($this->contentBlocks as $block) {
            $type = $block['type'];
            $data = $block['data'];
            if (isset($this->propertyMetadata['block_templates'][$type])) {
                $GLOBALS['widget_template'] = $this->propertyMetadata['block_templates'][$type];
            } else {
                $GLOBALS['widget_template'] = $this->block_templates[$type];
            }

            yield $data;
        }
    }

}
