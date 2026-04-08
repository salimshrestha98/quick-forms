<?php

namespace QuickForms\Blocks;

defined( 'ABSPATH' ) || exit;

use QuickForms\Helpers\BlockHelper;

/**
 * Submit block class.
 */
final class Submit extends Block {
	/**
	 * Generate attribute dependent styles for form block.
	 *
	 * @return void
	 */
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
