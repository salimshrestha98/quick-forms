<?php
namespace QuickForms\Helpers;

defined( 'ABSPATH' ) || exit;

/**
 * Block Helper class.
 */
class BlockHelper {
	/**
	 * Generate CSS from the styles map and store in global style variable.
	 *
	 * @param array $styles_map
	 * @param string $wrapper_id
	 * @return void
	 */
	public static function generate_css( array $styles_map, string $wrapper_id = '' ): void {
		global $quick_forms_styles;

		$css = '';

		foreach ( $styles_map as $element => $styles ) {
			$temp = '';
			foreach ( $styles as $style_key => $style_value ) {
				$temp .= sprintf(
					'%s:%s;',
					$style_key,
					$style_value
				);
			}

			$css .= sprintf( '%s{%s}', $wrapper_id . $element, $temp );
		}

		$quick_forms_styles .= $css;
	}

	/**
	 * Return the default attributes fetching from the block.json file.
	 *
	 * @param string $block_name
	 * @return array
	 */
	public static function get_block_default_attributes( string $block_name ): array {
		$block_name = str_replace( 'quick-forms/', '', $block_name );
		$block_path = QF_BUILD_PATH . $block_name;

		// Normalize path
		$block_json_path = trailingslashit( $block_path ) . 'block.json';

		if ( ! file_exists( $block_json_path ) ) {
			return array();
		}

		$block_json = json_decode( file_get_contents( $block_json_path ), true );

		if ( empty( $block_json['attributes'] ) ) {
			return array();
		}

		$defaults = array();

		foreach ( $block_json['attributes'] as $attr_key => $attr_config ) {
			// If default is defined → use it
			if ( array_key_exists( 'default', $attr_config ) ) {
				$defaults[ $attr_key ] = $attr_config['default'];
			} else {
				// Otherwise set sensible fallback
				$defaults[ $attr_key ] = null;
			}
		}

		return $defaults;
	}

	/**
	 * Return form settings for specific form id.
	 *
	 * @param string $form_id
	 * @return array
	 */
	public static function get_form_settings( string $form_id ): array {
		if ( ! $form_id ) {
			return array();
		}

		$form = get_option( 'qf_form_' . $form_id );

		if ( ! $form ) {
			return array();
		}

		$settings = self::parse_block( $form );

		if ( isset( $settings['fields'] ) ) {
			foreach ( $settings['fields'] as $field_id => $field ) {
				$settings['fields'][ $field_id ] = self::parse_block( $field );
			}
		}

		return $settings;
	}

	/**
	 * Parse blocks by adding default values for missing attributes.
	 *
	 * @param array $block
	 * @return array
	 */
	public static function parse_block( array $block ): array {
		$block_name = $block['blockName'];
		$defaults   = self::get_block_default_attributes( $block_name );

		$block['attrs'] = wp_parse_args( $block['attrs'], $defaults );

		return $block;
	}

	/**
	 * Parse options for radio block from pipe format.
	 *
	 * @param string $options Options in pipe separated string format
	 * @return array
	 */
	public static function parse_radio_options( string $options ): array {
		if ( empty( $options ) ) {
			return array();
		}

		$lines = explode( "\n", $options );

		$result = array();

		foreach ( $lines as $line ) {
			$line = trim( $line );

			if ( empty( $line ) ) {
				continue;
			}

			$parts = array_map( 'trim', explode( '|', $line ) );

			if ( count( $parts ) !== 2 ) {
				continue;
			}

			list( $value, $label ) = $parts;

			if ( empty( $value ) || empty( $label ) ) {
				continue;
			}

			$result[ $value ] = $label;
		}

		return $result;
	}

	/**
	 * Return country details for a country from country_list.json
	 *
	 * @param array $country_code
	 * @return array
	 */
	public static function get_country( string $country_code ): array {
		$country_file = QF_PATH . 'country_list.json';
		$country_list = array();

		if ( file_exists( $country_file ) ) {
			$json_content = file_get_contents( $country_file );
			$country_list = json_decode( $json_content, true );

			return $country_list[ $country_code ] ?? array();
		}

		return array();
	}

	/**
	 * Return the html for required icon.
	 *
	 * @param boolean $required
	 * @return string
	 */
	public static function required( bool $required ): string {
		return $required ? "<span class='qf-required' title='Required Field'>*</span>" : '';
	}
}
