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

require_once 'vendor/autoload.php';
require_once 'includes/QuickForms.php';

// Plugin Version
if ( ! defined( 'QF_VERSION' ) ) {
	define( 'QF_VERSION', '1.0.0' );
}

// Plugin File
if ( ! defined( 'QF_FILE' ) ) {
	define( 'QF_FILE', __FILE__ );
}

// Plugin Basename
if ( ! defined( 'QF_BASENAME' ) ) {
	define( 'QF_BASENAME', plugin_basename( QF_FILE ) );
}

// Plugin Directory Path
if ( ! defined( 'QF_PATH' ) ) {
	define( 'QF_PATH', plugin_dir_path( QF_FILE ) );
}

// Plugin Directory URL
if ( ! defined( 'QF_URL' ) ) {
	define( 'QF_URL', plugin_dir_url( QF_FILE ) );
}

// Assets URL
if ( ! defined( 'QF_ASSETS_URL' ) ) {
	define( 'QF_ASSETS_URL', QF_URL . 'assets/' );
}

// Includes Path
if ( ! defined( 'QF_INCLUDES_PATH' ) ) {
	define( 'QF_INCLUDES_PATH', QF_PATH . 'includes/' );
}

// Build Path (for block/editor assets)
if ( ! defined( 'QF_BUILD_PATH' ) ) {
	define( 'QF_BUILD_PATH', QF_PATH . 'build/' );
}

// Templates Path
if ( ! defined( 'QF_TEMPLATES_PATH' ) ) {
	define( 'QF_TEMPLATES_PATH', QF_PATH . 'templates/' );
}

// Build URL
if ( ! defined( 'QF_BUILD_URL' ) ) {
	define( 'QF_BUILD_URL', QF_URL . 'build/' );
}

register_activation_hook( __FILE__, array( QuickForms\Activator::class, 'activate' ) );
