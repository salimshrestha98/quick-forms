<?php

namespace QuickForms;

defined( 'ABSPATH' ) || exit;

use QuickForms\Database\Submission;
use QuickForms\Helpers\BlockHelper;

final class Submission_Handler {
	private $form_id;

	private $form_settings;

	private $form_data;

	public function __construct() {
		add_action( 'wp_ajax_qf_form_submit', array( $this, 'handle' ) );
	}

	public function handle() {
		if ( ! wp_verify_nonce( $_POST['nonce'], 'qf_form_submit' ) ) {
			die( 'Nonce error.' );
		}

		$this->form_id       = sanitize_text_field( $_POST['id'] ?? '' );
		$this->form_settings = BlockHelper::get_form_settings( $this->form_id );
		$this->form_data     = array_intersect_key( $_POST, $this->form_settings['fields'] ?? array() );

		if ( $this->form_settings['attrs']['honeypot'] ?? false ) {
			// Check if honeypot field is filled.
			if ( isset( $_POST['qfhpfld'] ) && ! empty( $_POST['qfhpfld'] ) ) {
				wp_send_json_success(); // Fail silently.
			}
		}

		if ( $this->form_settings['attrs']['recaptcha'] ?? false ) {
			// reCaptcha validation.
			$options = get_option( 'qf_settings' );
			$secret  = $options['recaptcha_secret_key'] ?? '';

			$response = $_POST['g-recaptcha-response'] ?? '';

			$verify = wp_remote_post(
				'https://www.google.com/recaptcha/api/siteverify',
				array(
					'body' => array(
						'secret'   => $secret,
						'response' => $response,
					),
				)
			);

			$body = json_decode( wp_remote_retrieve_body( $verify ), true );

			if ( empty( $body['success'] ) ) {
				return new \WP_Error( 'captcha_failed', 'Captcha verification failed.' );
			}
		}

		$this->handle_uploads();
		$this->save();

		wp_send_json_success();
	}

	private function handle_uploads() {
		$form_settings      = $this->form_settings;
		$file_upload_fields = array();

		if ( isset( $form_settings['fields'] ) ) {
			foreach ( $form_settings['fields'] as $field_key => $field ) {
				if ( 'quick-forms/file-upload' === $field['blockName'] ) {
					$file_upload_fields[ $field_key ] = $field;
				}
			}
		}

		foreach ( $file_upload_fields as $field_key => $field ) {
			if ( ! empty( $_FILES[ $field_key ] ) && isset( $_FILES[ $field_key ]['name'] ) ) {
				require_once ABSPATH . 'wp-admin/includes/file.php';

				$file = $_FILES[ $field_key ];
				if ( $file['error'] !== UPLOAD_ERR_OK ) {
					return new \WP_Error( 'upload_error', 'File upload failed.' );
				}

				$max_size = 2 * 1024 * 1024; // 2MB

				if ( $file['size'] > $max_size ) {
					return new \WP_Error( 'file_size_error', 'File exceeds maximum size of 2MB.' );
				}

				$allowed_mimes = array(
					'jpg|jpeg|jpe' => 'image/jpeg',
					'png'          => 'image/png',
					'pdf'          => 'application/pdf',
				);

				$filetype = wp_check_filetype_and_ext( $file['tmp_name'], $file['name'], $allowed_mimes );

				if ( ! $filetype['ext'] || ! $filetype['type'] ) {
					return new \WP_Error( 'file_type_error', 'Invalid file type.' );
				}

				$file['name'] = sanitize_file_name( $file['name'] );

				$upload_overrides = array(
					'test_form' => false,
					'mimes'     => $allowed_mimes,
				);

				$uploaded = wp_handle_upload( $file, $upload_overrides );

				if ( isset( $uploaded['error'] ) ) {
					return new \WP_Error( 'upload_error', $uploaded['error'] );
				}

				$file_url  = $uploaded['url'];
				$file_path = $uploaded['file'];

				$this->form_data[ $field_key ] = array(
					'path' => $file_path,
					'url'  => $file_url,
					'name' => $file['name'],
				);
			}
		}
	}

	private function save() {
		$submission_db = new Submission();
		$submission_db->save( $this->form_id, $this->form_data );
	}
}
