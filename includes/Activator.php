<?php

namespace QuickForms;

defined( 'ABSPATH' ) || exit;

final class Activator {

	public static function activate() {
		self::create_submissions_table();
	}

	public static function create_submissions_table() {
		global $wpdb;

		$table_name      = $wpdb->prefix . 'qf_submissions';
		$charset_collate = $wpdb->get_charset_collate();

		$sql = "CREATE TABLE IF NOT EXISTS $table_name (
			id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
			form_id VARCHAR(128) NOT NULL,
			data LONGTEXT NOT NULL,
			submitted_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
			ip_address VARCHAR(45) DEFAULT NULL,
			user_agent TEXT DEFAULT NULL,
			PRIMARY KEY  (id),
			KEY form_id (form_id),
			KEY submitted_at (submitted_at)
			) $charset_collate;";

		// Make sure dbDelta function is loaded
		require_once ABSPATH . 'wp-admin/includes/upgrade.php';
		dbDelta( $sql );
	}
}

return new Activator();
