<?php

namespace QuickForms\Blocks;

defined( 'ABSPATH' ) || exit;

use QuickForms\Helpers\BlockHelper;

final class Submit extends Block {

	public function __construct( $attributes, $content, $block ) {
		$this->attributes = $attributes;
		$this->content    = $content;
		$this->block      = $block;
	}

	public function generate_stylesheet() {
		$attributes = $this->get_attributes();
		extract( $attributes );

		$styles = array(
			' button' => array(
				'padding'    => sprintf(
					'%s %s %s %s',
					$padding['top'],
					$padding['right'],
					$padding['bottom'],
					$padding['left']
				),
				'width'      => 'custom' === $buttonWidthType ? $buttonWidth : 'auto',
				'color'      => $textColor,
				'background' => $bgColor,
			),
		);

		BlockHelper::generate_css( $styles, "[data-id='$id']" );
	}
}
