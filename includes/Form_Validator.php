<?php

namespace QuickForms;

defined( 'ABSPATH' ) || exit;

use QuickForms\Helpers\BlockHelper;

/**
 * Form_Validator
 *
 * Validates submitted form_data against field definitions in form_settings.
 */
final class Form_Validator {

	public function __construct() {
		add_action( 'qf_before_save_form', array( $this, 'validate' ), 10, 2 );
	}

	/**
	 * @param array $form_data      Sanitized POST data keyed by field ID.
	 * @param array $form_settings  Parsed form settings from BlockHelper::get_form_settings().
	 */
	public function validate( array $form_data, array $form_settings ): void {
		$fields = $form_settings['fields'] ?? array();
		$errors = array();

		foreach ( $fields as $field_id => $field ) {
			$block_name = $field['blockName'] ?? '';
			$attrs      = $field['attrs'] ?? array();
			$value      = $form_data[ $field_id ] ?? '';

			// Skip non-input blocks (submit, recaptcha, etc.)
			if ( ! $this->is_input_block( $block_name ) ) {
				continue;
			}

			// Required check applies to all input blocks.
			if ( ! empty( $attrs['required'] ) && $this->is_empty( $value, $block_name ) ) {
				$errors[ $field_id ] = sprintf(
					/* translators: %s: field label */
					__( '%s is required.', 'quick-forms' ),
					esc_html( $attrs['fieldLabel'] ?? $field_id )
				);
				// Skip type-specific rules when field is empty — no point validating format of nothing.
				continue;
			}

			// Skip further checks if value is empty and field is not required.
			if ( $this->is_empty( $value, $block_name ) ) {
				continue;
			}

			$error = $this->validate_field( $block_name, $attrs, $value );

			if ( null !== $error ) {
				$errors[ $field_id ] = $error;
			}
		}

		if ( ! empty( $errors ) ) {
			wp_send_json_error( array( 'errors' => $errors ), 422 );
			exit;
		}
	}

	/**
	 * Dispatch to the right type-specific validator.
	 * Returns an error string, or null if valid.
	 */
	private function validate_field( string $block_name, array $attrs, string $value ): ?string {
		switch ( $block_name ) {
			case 'quick-forms/input':
				return $this->validate_input( $attrs, $value );

			case 'quick-forms/select':
			case 'quick-forms/radio':
				return $this->validate_option( $attrs, $value );

			case 'quick-forms/checkbox':
				return $this->validate_checkbox( $attrs, $value );

			default:
				return null;
		}
	}

	/**
	 * Validate quick-forms/input based on its inputType attribute.
	 */
	private function validate_input( array $attrs, string $value ): ?string {
		$label      = esc_html( $attrs['fieldLabel'] ?? '' );
		$input_type = $attrs['inputType'] ?? 'text';

		switch ( $input_type ) {
			case 'email':
				if ( ! is_email( $value ) ) {
					return sprintf(
						/* translators: %s: field label */
						__( '%s must be a valid email address.', 'quick-forms' ),
						$label
					);
				}
				break;

			case 'url':
				if ( ! wp_http_validate_url( $value ) ) {
					return sprintf(
						/* translators: %s: field label */
						__( '%s must be a valid URL.', 'quick-forms' ),
						$label
					);
				}
				break;

			case 'tel':
				if ( ! preg_match( '/^[0-9\s\+\-\(\)]+$/', $value ) ) {
					return sprintf(
						/* translators: %s: field label */
						__( '%s must be a valid phone number.', 'quick-forms' ),
						$label
					);
				}
				break;

			case 'number':
				if ( ! is_numeric( $value ) ) {
					return sprintf(
						/* translators: %s: field label */
						__( '%s must be a number.', 'quick-forms' ),
						$label
					);
				}

				$min = $attrs['minValue'] ?? '';
				$max = $attrs['maxValue'] ?? '';

				if ( '' !== $min && is_numeric( $min ) && (float) $value < (float) $min ) {
					return sprintf(
						/* translators: 1: field label, 2: minimum value */
						__( '%1$s must be at least %2$s.', 'quick-forms' ),
						$label,
						$min
					);
				}

				if ( '' !== $max && is_numeric( $max ) && (float) $value > (float) $max ) {
					return sprintf(
						/* translators: 1: field label, 2: maximum value */
						__( '%1$s must be no greater than %2$s.', 'quick-forms' ),
						$label,
						$max
					);
				}
				break;

			case 'date':
				$date = \DateTime::createFromFormat( 'Y-m-d', $value );
				if ( ! $date || $date->format( 'Y-m-d' ) !== $value ) {
					return sprintf(
						/* translators: %s: field label */
						__( '%s must be a valid date (YYYY-MM-DD).', 'quick-forms' ),
						$label
					);
				}
				break;
		}

		return null;
	}

	/**
	 * Validate quick-forms/select and quick-forms/radio.
	 * The submitted value must be one of the options configured in the block.
	 */
	private function validate_option( array $attrs, string $value ): ?string {
		$label           = esc_html( $attrs['fieldLabel'] ?? '' );
		$raw_options     = $attrs['options'] ?? '';
		$allowed_options = BlockHelper::parse_radio_options( $raw_options );

		if ( empty( $allowed_options ) ) {
			return null;
		}

		if ( ! array_key_exists( $value, $allowed_options ) ) {
			return sprintf(
				/* translators: %s: field label */
				__( '%s contains an invalid selection.', 'quick-forms' ),
				$label
			);
		}

		return null;
	}

	/**
	 * Validate quick-forms/checkbox.
	 * A required checkbox must have value 'on' (standard browser submit value).
	 */
	private function validate_checkbox( array $attrs, string $value ): ?string {
		if ( ! empty( $attrs['required'] ) && 'on' !== $value ) {
			return sprintf(
				/* translators: %s: field label */
				__( '%s must be checked.', 'quick-forms' ),
				esc_html( $attrs['fieldLabel'] ?? '' )
			);
		}

		return null;
	}

	/**
	 * Blocks that carry user-submitted values and need validation.
	 * Excludes structural blocks: submit, recaptcha, form wrapper.
	 */
	private function is_input_block( string $block_name ): bool {
		return in_array(
			$block_name,
			array(
				'quick-forms/input',
				'quick-forms/textarea',
				'quick-forms/select',
				'quick-forms/radio',
				'quick-forms/checkbox',
				'quick-forms/country',
				'quick-forms/file-upload',
			),
			true
		);
	}

	/**
	 * Whether a submitted value should be treated as empty.
	 *
	 * File-upload fields are not in form_data — they live in $_FILES and are
	 * handled by handle_uploads(). Required file checks belong there, not here.
	 */
	private function is_empty( string $value, string $block_name ): bool {
		if ( 'quick-forms/file-upload' === $block_name ) {
			return false;
		}

		return '' === trim( $value );
	}
}
