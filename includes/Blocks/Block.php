<?php

namespace NNForms\Blocks;

defined( 'ABSPATH' ) || exit;

use NNForms\Helpers\BlockHelper;

/**
 * Base Block Class.
 */
class Block {
	/**
	 * Block
	 *
	 * @var \WP_Block
	 */
	public $block;

	/**
	 * Block attributes
	 *
	 * @var array
	 */
	public $attributes = array();

	/**
	 * Block content
	 *
	 * @var string
	 */
	public $content = '';

	/**
	 * Constructor.
	 *
	 * @param \WP_Block $block
	 * @param string $content
	 */
	public function __construct( \WP_Block $block, string $content ) {
		$this->block      = $block;
		$this->content    = $content;
		$this->attributes = $this->block->attributes;
	}

	/**
	 * Returns template path of current block.
	 *
	 * @return string
	 */
	public function get_template_path(): string {
		$block_name = str_replace( 'nnforms/', '', $this->block->name );

		return NNFORMS_TEMPLATES_PATH . 'blocks/' . $block_name . '.php';
	}

	/**
	 * Return parsed block attributes.
	 *
	 * @return array
	 */
	public function get_attributes(): array {
		$defaults = BlockHelper::get_block_default_attributes( $this->block->name );
		$context  = array_combine(
			array_map( fn( $key ) => str_replace( 'nnform/', '', $key ), array_keys( $this->block->context ) ),
			$this->block->context
		);

		return array_merge( wp_parse_args( $this->attributes, $defaults ), $context );
	}

	protected function generate_stylesheet() {}

	/**
	 * Render block template.
	 *
	 * @return void
	 */
	public function render(): void {
		$attributes = $this->get_attributes();
		$content    = $this->content;

		extract( $attributes );

		$block_name    = str_replace( 'nnforms/', '', $this->block->name );
		$blockProps    = get_block_wrapper_attributes(
			array(
				'class'   => "nnf-block nnf-{$block_name}-block",
				'data-id' => esc_attr( $id ),
			)
		);
		$required_icon = BlockHelper::required( $required ?? false );

		$this->generate_stylesheet();
		include $this->get_template_path();
	}
}
