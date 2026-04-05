<?php

namespace QuickForms;

defined( 'ABSPATH' ) || exit;

use QuickForms\Database\Submission;

final class Submission_Handler {
	public function __construct() {
		add_action( 'wp_ajax_qf_form_submit', array( $this, 'handle' ) );
	}

	public function handle() {
		if ( ! wp_verify_nonce( $_POST['nonce'], 'qf_form_submit' ) ) {
			die( 'Nonce error.' );
		}

		if ( empty( $_POST['data'] ) ) {
			wp_send_json_error( 'No form data received' );
		}

		$form_data = json_decode( wp_unslash( $_POST['data'] ), true );

		if ( json_last_error() !== JSON_ERROR_NONE ) {
			wp_send_json_error( 'Invalid JSON data' );
			exit;
		}

		$this->save( $form_data );

		wp_send_json_success();
	}

	private function save( $form_data ) {
		$id = $form_data['id'];
		unset( $form_data['id'] );

		$submission_db = new Submission();
		$submission_db->save( $id, $form_data );
	}
}
