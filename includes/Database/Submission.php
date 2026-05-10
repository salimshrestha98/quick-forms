<?php

namespace NNForms\Database;

defined( 'ABSPATH' ) || exit;

/**
 * Submission Database class.
 */
final class Submission {
	/**
	 * Table name.
	 *
	 * @var string
	 */
	private $table;

	/**
	 * Constructor.
	 */
	public function __construct() {
		global $wpdb;

		$this->table = $wpdb->prefix . 'nnforms_submissions';
	}

	/**
	 * Save submission data to database table.
	 *
	 * @param string $form_id
	 * @param array $data
	 * @return mixed
	 */
	public function save( string $form_id, array $data ): mixed {
		global $wpdb;

		return $wpdb->insert(
			$this->table,
			array(
				'form_id'      => $form_id,
				'data'         => maybe_serialize( $data ),
				'submitted_at' => current_time( 'mysql' ),
			),
			array(
				'%s',
				'%s',
				'%s',
			)
		);
	}
}
