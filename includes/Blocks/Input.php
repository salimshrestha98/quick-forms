<?php

namespace QuickForms\Blocks;

defined( 'ABSPATH' ) || exit;

use QuickForms\Helpers\BlockHelper;

final class Input extends Block {
	public function __construct( $attributes, $content, $block ) {
		$this->attributes = $attributes;
		$this->content    = $content;
		$this->block      = $block;
	}

	public function generate_stylesheet() {
		$attributes = $this->get_attributes();
		extract( $attributes );

		$styles = array(
			''       => array(
				'display' => $showLabel && 'inline' === $labelPosition ? 'flex' : 'block',
				'margin'  => sprintf(
					'%s %s %s %s',
					$fieldMargin['top'],
					$fieldMargin['right'],
					$fieldMargin['bottom'],
					$fieldMargin['left']
				),
			),
			' label' => array(
				'width'   => $showLabel && 'inline' === $labelPosition ? $labelWidth : 'auto',
				'display' => $showLabel && 'above' === $labelPosition ? 'block' : 'inline-block',
			),
			' input' => array(
				'display' => $showLabel && 'above' === $labelPosition ? 'block' : 'inline-block',
				'width'   => $fieldWidth,
			),
		);

		BlockHelper::generate_css( $styles, "[data-id='$id']" );
	}
}
