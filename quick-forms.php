<?php
/**
 * Plugin Name:       Quick Forms
 * Plugin URI:        https://labs.salim.com.np/quick-forms
 * Description:       A native Gutenberg block-based form builder. Build forms directly inside the block editor — no shortcodes, no iframes.
 * Version:           1.0.0
 * Requires at least: 6.8
 * Requires PHP:      7.4
 * Author:            salimlabs
 * Author URI:        https://profiles.wordpress.org/salimlabs
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       quick-forms
 *
 * @package QuickForms
 */

defined( 'ABSPATH' ) || exit;

require_once 'vendor/autoload.php';

// Define plugin constants.
defined( 'QF_VERSION' ) || define( 'QF_VERSION', '1.0.0' );
defined( 'QF_FILE' ) || define( 'QF_FILE', __FILE__ );
defined( 'QF_BASENAME' ) || define( 'QF_BASENAME', plugin_basename( QF_FILE ) );
defined( 'QF_PATH' ) || define( 'QF_PATH', plugin_dir_path( QF_FILE ) );
defined( 'QF_INCLUDES_PATH' ) || define( 'QF_INCLUDES_PATH', QF_PATH . 'includes/' );
defined( 'QF_BUILD_PATH' ) || define( 'QF_BUILD_PATH', QF_PATH . 'build/' );
defined( 'QF_TEMPLATES_PATH' ) || define( 'QF_TEMPLATES_PATH', QF_PATH . 'templates/' );
defined( 'QF_URL' ) || define( 'QF_URL', plugin_dir_url( QF_FILE ) );
defined( 'QF_ASSETS_URL' ) || define( 'QF_ASSETS_URL', QF_URL . 'assets/' );
defined( 'QF_BUILD_URL' ) || define( 'QF_BUILD_URL', QF_URL . 'build/' );

// Register activation tasks.
register_activation_hook( __FILE__, array( QuickForms\Activator::class, 'activate' ) );

if ( ! isset( $GLOBALS['quick-forms-instance'] ) ) {
	$GLOBALS['quick-forms-instance'] = new QuickForms\QuickForms();
}
