<?php
/**
 * Plugin Name:       99Forms
 * Plugin URI:        https://bodhiwp.com/99forms/
 * Description:       A native Gutenberg block-based form builder. Build forms directly inside the block editor — no shortcodes, no iframes.
 * Version:           1.0.0
 * Requires at least: 6.8
 * Requires PHP:      7.4
 * Author:            bodhiwp
 * Author URI:        https://bodhiwp.com
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       99forms
 *
 * @package NNForms
 */

defined( 'ABSPATH' ) || exit;

require_once 'vendor/autoload.php';

// Define plugin constants.
defined( 'NNFORMS_VERSION' ) || define( 'NNFORMS_VERSION', '1.0.0' );
defined( 'NNFORMS_FILE' ) || define( 'NNFORMS_FILE', __FILE__ );
defined( 'NNFORMS_BASENAME' ) || define( 'NNFORMS_BASENAME', plugin_basename( NNFORMS_FILE ) );
defined( 'NNFORMS_PATH' ) || define( 'NNFORMS_PATH', plugin_dir_path( NNFORMS_FILE ) );
defined( 'NNFORMS_INCLUDES_PATH' ) || define( 'NNFORMS_INCLUDES_PATH', NNFORMS_PATH . 'includes/' );
defined( 'NNFORMS_BUILD_PATH' ) || define( 'NNFORMS_BUILD_PATH', NNFORMS_PATH . 'build/' );
defined( 'NNFORMS_TEMPLATES_PATH' ) || define( 'NNFORMS_TEMPLATES_PATH', NNFORMS_PATH . 'templates/' );
defined( 'NNFORMS_URL' ) || define( 'NNFORMS_URL', plugin_dir_url( NNFORMS_FILE ) );
defined( 'NNFORMS_ASSETS_URL' ) || define( 'NNFORMS_ASSETS_URL', NNFORMS_URL . 'assets/' );
defined( 'NNFORMS_BUILD_URL' ) || define( 'NNFORMS_BUILD_URL', NNFORMS_URL . 'build/' );

// Register activation tasks.
register_activation_hook( __FILE__, array( NNForms\Activator::class, 'activate' ) );

if ( ! isset( $GLOBALS['nnforms-instance'] ) ) {
	$GLOBALS['nnforms-instance'] = new NNForms\NNForms();
}
