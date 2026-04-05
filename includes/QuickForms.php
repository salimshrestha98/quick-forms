<?php

namespace QuickForms;

defined( 'ABSPATH' ) || exit;

use QuickForms\Admin\Admin;
use QuickForms\Submission_Handler;

class QuickForms {
	public function __construct() {
		$this->init();

		add_action( 'init', array( $this, 'register_blocks' ) );
		add_filter( 'block_categories_all', array( $this, 'add_block_category' ) );
		add_action( 'wp_footer', array( $this, 'add_css' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_resources' ) );
	}

	private function init() {
		new Admin();
		new Submission_Handler();
	}

	public function register_blocks() {
		wp_register_block_types_from_metadata_collection( QF_BUILD_PATH, QF_BUILD_PATH . '/blocks-manifest.php' );
	}

	public function add_block_category( $categories ) {
		$my_category = array(
			'slug'  => 'quick-forms',
			'title' => 'Quick Forms',
		);

		array_unshift( $categories, $my_category );

		return $categories;
	}

	public function add_css() {
		global $qf_styles;

		echo "<style id='quick-forms-styles'>$qf_styles</style>";
	}

	public function enqueue_resources() {
		wp_localize_script(
			'quick-forms-form-view-script',
			'l10n',
			array(
				'ajax_url'   => admin_url( 'admin-ajax.php' ),
				'ajax_nonce' => wp_create_nonce( 'qf_form_submit' ),
			)
		);
	}
}

return new QuickForms();
