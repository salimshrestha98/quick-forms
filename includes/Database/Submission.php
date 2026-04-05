<?php

namespace QuickForms\Database;

defined( 'ABSPATH' ) || exit;

final class Submission {
	private $table;

	public function __construct() {
		global $wpdb;

		$this->table = $wpdb->prefix . 'qf_submissions';
	}

	public function save( $id, $data ) {
		global $wpdb;

		return $wpdb->insert(
			$this->table,
			array(
				'form_id'      => $id,
				'data'         => maybe_serialize( $data ),
				'submitted_at' => current_time( 'mysql' ),
				'ip_address'   => $_SERVER['REMOTE_ADDR'],
				'user_agent'   => $_SERVER['HTTP_USER_AGENT'],
			),
			array(
				'%s',
				'%s',
				'%s',
				'%s',
				'%s',
			)
		);
	}
}
