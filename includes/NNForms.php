<?php

namespace NNForms;

defined( 'ABSPATH' ) || exit;

use NNForms\Admin\Admin;

/**
 * NNForms class
 */
class NNForms {
	public function __construct() {
		$this->init();

		add_action( 'init', array( $this, 'register_blocks' ) );
		add_filter( 'block_categories_all', array( $this, 'add_block_category' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_resources' ) );
		add_action( 'wp_footer', array( $this, 'add_css' ) );
	}

	/**
	 * Initialize main classes.
	 */
	private function init() {
		new Admin();
		new Form_Validator();
		new Submission_Handler();
	}

	/**
	 * Register gutenberg blocks.
	 */
	public function register_blocks() {
		wp_register_block_types_from_metadata_collection( NNFORMS_BUILD_PATH . 'blocks', NNFORMS_BUILD_PATH . 'blocks-manifest.php' );
	}

	/**
	 * Register own block category for 99form blocks.
	 */
	public function add_block_category( $categories ) {
		$my_category = array(
			'slug'  => 'nnforms',
			'title' => '99Forms',
		);

		array_unshift( $categories, $my_category );

		return $categories;
	}

	/**
	 * Enqueue styles, scripts and localizations.
	 */
	public function enqueue_resources() {
		if ( is_singular() && has_block( 'nnforms/recaptcha' ) ) {
			wp_enqueue_script(
				'google-recaptcha',
				'https://www.google.com/recaptcha/api.js',
				array(),
				NNFORMS_VERSION,
				true
			);
		}

		wp_localize_script(
			'nnforms-form-view-script',
			'l10n',
			array(
				'ajax_url'   => admin_url( 'admin-ajax.php' ),
				'ajax_nonce' => wp_create_nonce( 'nnforms_form_submit' ),
			)
		);

		// Dynamic styles for forms.
		wp_register_style( 'nnforms-styles', '', array(), NNFORMS_VERSION, true );
	}

	/**
	 * Enqueue form styles in frontend in footer.
	 */
	public function add_css() {
		global $nnforms_styles;

		$css = wp_strip_all_tags( $nnforms_styles );
		$css = str_replace( '<', '', $css );

		wp_add_inline_style( 'nnforms-styles', $css );
		wp_print_styles( 'nnforms-styles' );
	}
}
