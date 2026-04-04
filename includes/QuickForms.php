<?php

namespace QuickForms;

defined( ABSPATH ) && exit;

use QuickForms\Admin\Admin;

class QuickForms {
	public function __construct() {
		add_action( 'init', array( $this, 'register_blocks' ) );
		add_filter( 'block_categories_all', array( $this, 'add_block_category' ) );
		add_action( 'wp_footer', array( $this, 'enqueue_frontend_scripts' ) );
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

	public function enqueue_frontend_scripts() {
		global $qf_styles;

		echo "<style id='quick-forms-styles'>$qf_styles</style>";
	}
}

return new QuickForms();
