<?php
namespace QuickForms\Helpers;

defined( 'ABSPATH' ) || exit;

/**
 * Email Helper class.
 */
class EmailHelper {
	/**
	 * Check if a given string is a valid email.
	 *
	 * @param string $text
	 * @return boolean
	 */
	public static function is_valid_email( string $text ): bool {
		return (bool) filter_var( $text, FILTER_VALIDATE_EMAIL );
	}

	/**
	 * Parse smart tags in a text if present.
	 *
	 * @param string $text String to parse
	 * @param array $values Values to replace with
	 * @return string
	 */
	public static function maybe_parse_smart_tags( string $text, array $values = array() ): string {
		if ( empty( $text ) || empty( $values ) ) {
			return $text;
		}

		$values = wp_parse_args( self::get_system_smart_tags(), $values );

		return preg_replace_callback(
			'/\{\{([a-zA-Z0-9_\-]+)\}\}/',
			function ( $matches ) use ( $values ) {
				$key = $matches[1];

				if ( isset( $values[ $key ] ) ) {
					return is_scalar( $values[ $key ] )
						? (string) $values[ $key ]
						: '';
				}

				return $matches[0];
			},
			$text
		);
	}

	/**
	 * System related smart tag values
	 *
	 * @return array
	 */
	private static function get_system_smart_tags(): array {
		return array(
			'site_name'   => get_bloginfo( 'name' ),
			'site_url'    => home_url(),
			'admin_email' => get_bloginfo( 'admin_email' ),
		);
	}
}
