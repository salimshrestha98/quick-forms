<?php
namespace QuickForms\Helpers;

defined( 'ABSPATH' ) || exit;

class BlockHelper {
	public static function generate_css( $styles_map, $wrapper_id = '' ) {
		global $qf_styles;

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

		$qf_styles .= $css;
	}

	public static function get_block_default_attributes( $block_name ) {
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

	public static function get_form_settings( $form_id ) {
		if ( ! $form_id ) {
			return array();
		}

		$form = get_option( 'qf_form_' . $form_id );

		$form = self::parse_block( $form );

		if ( isset( $form['fields'] ) ) {
			foreach ( $form['fields'] as $field_id => $field ) {
				$form['fields'][ $field_id ] = self::parse_block( $field );
			}
		}

		return $form;
	}

	public static function parse_block( $block ) {
		$block_name = $block['blockName'];
		$defaults   = self::get_block_default_attributes( $block_name );

		$block['attrs'] = wp_parse_args( $block['attrs'], $defaults );

		if ( isset( $block['attrs']['fieldName'] ) && empty( $block['attrs']['fieldName'] ) ) {
			$block['attrs']['fieldName'] = 'field-' . $block['attrs']['id'];
		}

		return $block;
	}
}
