<?php

namespace QuickForms\Blocks;

defined( 'ABSPATH' ) || exit;

use QuickForms\Helpers\BlockHelper;

final class Checkbox extends Block {
	public function __construct( $attributes, $content, $block ) {
		$this->attributes = $attributes;
		$this->content    = $content;
		$this->block      = $block;
	}

	public function generate_stylesheet() {
		$attributes = $this->get_attributes();
		extract( $attributes );

		$styles = array(
			'' => array(
				'display' => $showLabel && 'inline' === $labelPosition ? 'flex' : 'block',
				'margin'  => sprintf(
					'%s %s %s %s',
					$fieldMargin['top'],
					$fieldMargin['right'],
					$fieldMargin['bottom'],
					$fieldMargin['left']
				),
			),
		);

		BlockHelper::generate_css( $styles, "[data-id='$id']" );
	}
}
