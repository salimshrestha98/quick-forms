<?php
defined( 'ABSPATH' ) || exit;

$country_file = NNFORMS_PATH . 'country_list.json';
$country_list = array();

if ( file_exists( $country_file ) ) {
	$json_content = file_get_contents( $country_file );
	$country_list = json_decode( $json_content, true ); // decode as associative array
}

// optional: sort countries alphabetically by name
if ( ! empty( $country_list ) ) {
	uasort(
		$country_list,
		function ( $a, $b ) {
			return strcasecmp( $a['name'], $b['name'] );
		}
	);
}
?>

<div <?php echo $blockProps; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
<div class="wrapper">
	<?php echo wp_kses_post( "<label for='$id'>$fieldLabel $required_icon</label>" ); ?>

	<div class="nnf-field nnf-country-field">
		<?php if ( ! empty( $country_list ) ) : ?>
			<select
				name="<?php echo esc_attr( $id ); ?>"
				id="<?php echo esc_attr( $id ); ?>"
				<?php echo $required ? 'required' : ''; ?>
			>
				<option value="">Select Country</option>
				<?php foreach ( $country_list as $country_code => $country ) : ?>
					<option
						value="<?php echo esc_attr( $country_code ); ?>"
						<?php selected( $country_code, $defaultValue ); ?>
					>
						<?php echo esc_html( $country['name'] . ' (+' . $country['telCode'] . ')' ); ?>
					</option>
				<?php endforeach; ?>
			</select>
		<?php endif; ?>
	</div>
</div>
</div>
