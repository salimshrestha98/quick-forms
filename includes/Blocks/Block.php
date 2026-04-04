<?php

namespace QuickForms\Blocks;

use stdClass;

defined( ABSPATH ) && exit;

abstract class Block {
	public $block;
	public $attributes = array();
	public $content    = '';
	public $defaults   = array();

	private function get_template_path() {
		$block_name = str_replace( 'quick-forms/', '', $this->block->name );

		return QF_TEMPLATES_PATH . 'blocks/' . $block_name . '.php';
	}

	public function get_attributes() {
		$context = array_combine(
			array_map( fn( $key ) => str_replace( 'quick-form/', '', $key ), array_keys( $this->block->context ) ),
			$this->block->context
		);

		return array_merge( wp_parse_args( $this->attributes, $this->defaults ), $context );
	}

	private function set_defaults() {}

	public function generate_stylesheet() {}

	public function render() {
		$attributes = $this->get_attributes();
		$content    = $this->content;

		extract( $attributes );

		include $this->get_template_path();

		$this->generate_stylesheet();
	}
}
