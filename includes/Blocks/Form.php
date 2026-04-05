<?php

namespace QuickForms\Blocks;

defined( 'ABSPATH' ) || exit;

use QuickForms\Helpers\BlockHelper;

final class Form extends Block {
	public function __construct( $attributes, $content, $block ) {
		$this->block      = $block;
		$this->attributes = $attributes;
		$this->content    = $content;

		$this->set_defaults();
	}

	private function set_defaults() {
		$this->defaults = array(
			'showLabel' => true,
		);
	}

	public function generate_stylesheet() {
		$attributes = $this->get_attributes();
		extract( $attributes );

		$styles = array(
			' form' => array(
				'margin'  => sprintf(
					'%s %s %s %s',
					$margin['top'],
					$margin['right'],
					$margin['bottom'],
					$margin['left']
				),
				'padding' => sprintf(
					'%s %s %s %s',
					$padding['top'],
					$padding['right'],
					$padding['bottom'],
					$padding['left']
				),
			),
		);

		BlockHelper::generate_css( $styles, "[data-id='$id']" );
	}
}
