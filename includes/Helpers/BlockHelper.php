<?php
namespace QuickForms\Helpers;

defined( ABSPATH ) && exit;

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
}
