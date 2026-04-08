<?php

namespace QuickForms\Blocks;

defined( 'ABSPATH' ) || exit;

use QuickForms\Helpers\BlockHelper;

/**
 * Form Block class.
 */
final class Form extends Block {
	/**
	 * Generate attribute dependent styles for form block.
	 *
	 * @return void
	 */
	public function generate_stylesheet() {
		$attributes = $this->get_attributes();
		extract( $attributes );

		$styles = array(
			''                            => array(
				'margin' => sprintf(
					'%s %s %s %s',
					$margin['top'],
					$margin['right'],
					$margin['bottom'],
					$margin['left']
				),
			),
			' > .wrapper'                 => array(
				'padding' => sprintf(
					'%s %s %s %s',
					$padding['top'],
					$padding['right'],
					$padding['bottom'],
					$padding['left']
				),
			),
			' .qf-block'                  => array(
				'margin' => sprintf(
					'%s %s %s %s',
					$fieldMargin['top'],
					$fieldMargin['right'],
					$fieldMargin['bottom'],
					$fieldMargin['left']
				),
			),
			' .qf-block .wrapper'         => array(
				'display'        => 'flex',
				'flex-direction' => 'inline' === $labelPosition ? 'row' : 'column',
			),
			' .qf-block .wrapper > label' => array(
				'display' => $showLabel ? 'unset' : 'none',
				'width'   => $labelWidth,
			),
			' input[type="text"]'         => array(
				'width'     => $fieldWidth,
				'max-width' => $fieldWidth,
			),
			' input[type="email"]'        => array(
				'width'     => $fieldWidth,
				'max-width' => $fieldWidth,
			),
			' input[type="password"]'     => array(
				'width'     => $fieldWidth,
				'max-width' => $fieldWidth,
			),
			' input[type="number"]'       => array(
				'width'     => $fieldWidth,
				'max-width' => $fieldWidth,
			),
			' input[type="range"]'        => array(
				'width'     => $fieldWidth,
				'max-width' => $fieldWidth,
			),
			' textarea'                   => array(
				'width'     => $fieldWidth,
				'max-width' => $fieldWidth,
			),
		);

		BlockHelper::generate_css( $styles, "[data-id='$id']" );
	}
}
