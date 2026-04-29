<?php

namespace QuickForms;

defined( 'ABSPATH' ) || exit;

use QuickForms\Database\Submission;
use QuickForms\Helpers\BlockHelper;

/**
 * Submission Handler class.
 *
 * Handles all form submission related tasks.
 */
final class Submission_Handler {
	/**
	 * Form Id.
	 */
	private $form_id;

	/**
	 * Form Settings.
	 */
	private $form_settings;

	/**
	 * Form Data.
	 */
	private $form_data;

	/**
	 * Constructor.
	 */
	public function __construct() {
		add_action( 'wp_ajax_qf_form_submit', array( $this, 'handle' ) );
		add_action( 'wp_ajax_nopriv_qf_form_submit', array( $this, 'handle' ) );
		add_action( 'quick_forms_before_save_form', array( $this, 'handle_honeypot' ) );
		add_action( 'quick_forms_before_save_form', array( $this, 'handle_recaptcha' ) );
		add_action( 'quick_forms_before_save_form', array( $this, 'handle_uploads' ) );
		add_action( 'quick_forms_before_save_form', array( $this, 'send_email' ) );
	}

	/**
	 * Handle form submission.
	 */
	public function handle() {
		$nonce = sanitize_text_field( wp_unslash( $_POST['nonce'] ?? '' ) );

		if ( ! wp_verify_nonce( $nonce, 'qf_form_submit' ) ) {
			die( 'Nonce error.' );
		}

		$this->form_id       = sanitize_text_field( wp_unslash( $_POST['form-id'] ?? '' ) );
		$this->form_settings = BlockHelper::get_form_settings( $this->form_id );
		$form_data           = array_intersect_key( $_POST, $this->form_settings['fields'] ?? array() );
		$this->form_data     = array_map( 'sanitize_text_field', $form_data );

		do_action( 'quick_forms_before_save_form' );

		$this->save();

		wp_send_json_success();
	}

	public function handle_honeypot() {
		if ( $this->form_settings['attrs']['honeypot'] ?? false ) {
			if ( isset( $_POST['qfhpfld'] ) && ! empty( $_POST['qfhpfld'] ) ) {
				wp_send_json_error( 'Some error occured.' );
				exit;
			}
		}
	}

	/**
	 * Handle reCaptcha.
	 */
	public function handle_recaptcha() {
		$recaptcha_field = array_find(
			$this->form_settings['fields'],
			function ( $field ) {
				return 'quick-forms/recaptcha' === $field['blockName'];
			}
		);

		if ( ! empty( $recaptcha_field ) ) {
			$recaptcha_valid = $this->validate_recaptcha();

			if ( ! $recaptcha_valid ) {
				wp_send_json_error( __( 'Invalid captcha.', 'quick-forms' ) );
				exit;
			}
		}
	}

	/**
	 * Handle file uploads.
	 */
	public function handle_uploads() {
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
			if ( ! empty( $_FILES[ $field_key ] ) && isset( $_FILES[ $field_key ]['name'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Missing
				require_once ABSPATH . 'wp-admin/includes/file.php';

				$file = $_FILES[ $field_key ]; // phpcs:ignore WordPress.Security.NonceVerification.Missing, WordPress.Security.ValidatedSanitizedInput.InputNotSanitized
				if ( UPLOAD_ERR_OK !== $file['error'] ) {
					wp_send_json_error( 'File upload failed.' );
				}

				$max_size = 2 * 1024 * 1024;

				if ( $file['size'] > $max_size ) {
					wp_send_json_error( 'File exceeds maximum size of 2MB.' );
				}

				$allowed_mimes = array(
					'jpg|jpeg|jpe' => 'image/jpeg',
					'png'          => 'image/png',
					'pdf'          => 'application/pdf',
				);

				$filetype = wp_check_filetype_and_ext( $file['tmp_name'], $file['name'], $allowed_mimes );

				if ( ! $filetype['ext'] || ! $filetype['type'] ) {
					wp_send_json_error( 'Invalid file type.' );
				}

				$file['name'] = sanitize_file_name( $file['name'] );

				$upload_overrides = array(
					'test_form' => false,
					'mimes'     => $allowed_mimes,
				);

				$uploaded = wp_handle_upload( $file, $upload_overrides );

				if ( isset( $uploaded['error'] ) ) {
					wp_send_json_error( $uploaded['error'] );
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

	/**
	 * Validate reCaptcha if enabled.
	 */
	private function validate_recaptcha() {
		$options = get_option( 'quick_forms_settings' );
		$secret  = $options['recaptcha_secret_key'] ?? '';

		$response = sanitize_text_field( wp_unslash( $_POST['g-recaptcha-response'] ?? '' ) ); // phpcs:ignore WordPress.Security.NonceVerification.Missing

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

		return empty( $body['success'] ) ? false : true;
	}

	/**
	 * Save form into database.
	 */
	private function save() {
		$submission_db = new Submission();
		$submission_db->save( $this->form_id, $this->form_data );
	}

	/**
	 * Send email after success if set up in settings.
	 *
	 * @return void
	 */
	public function send_email() {
		if ( $this->form_settings['attrs']['enableMail'] ?? false ) {
			add_filter(
				'wp_mail_content_type',
				function () {
					return 'text/html';
				}
			);

			$to      = $this->form_settings['attrs']['mailTo'] ?? '';
			$subject = $this->form_settings['attrs']['mailSubject'] ?? '';
			$body    = $this->form_settings['attrs']['mailBody'] ?? '';

			wp_mail( $to, $subject, $body );

			remove_filter( 'wp_mail_content_type', 'set_html_mail_content_type' );
		}
	}
}
