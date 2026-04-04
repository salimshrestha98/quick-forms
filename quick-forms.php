<?php
/**
 * Plugin Name:       Quick Forms
 * Description:       Example block scaffolded with Create Block tool.
 * Version:           0.1.0
 * Requires at least: 6.8
 * Requires PHP:      7.4
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       quick-forms
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function create_block_quick_forms_block_init() {
	wp_register_block_types_from_metadata_collection( __DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php' );
}
add_action( 'init', 'create_block_quick_forms_block_init' );

add_filter( 'block_categories_all', 'add_block_category' );

function add_block_category( $categories ) {
	$my_category = array(
		'slug'  => 'quick-forms',
		'title' => 'Quick Forms',
	);

	array_unshift( $categories, $my_category );

	return $categories;
}

