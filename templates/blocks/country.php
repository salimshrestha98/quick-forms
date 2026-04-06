<?php

$blockProps   = get_block_wrapper_attributes();
$country_file = QF_PATH . 'country_list.json';
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

<div <?php echo $blockProps; ?> data-id="<?php echo esc_attr( $id ); ?>">
	<?php
	if ( $showLabel ) :
		$required_icon = $required ? "<span class='qf-required' title='Required Field'>*</span>" : '';
		?>
		<label for="<?php echo esc_attr( $fieldName ); ?>">
			<?php echo esc_html( $fieldLabel ); ?> <?php echo wp_kses_post( $required_icon ); ?>
		</label>
	<?php endif; ?>

	<div class="qf-field qf-country-field">
		<?php if ( ! empty( $country_list ) ) : ?>
			<select
				name="<?php echo esc_attr( $fieldName ); ?>"
				id="<?php echo esc_attr( $fieldName ); ?>"
				<?php echo $required ? 'required' : ''; ?>
			>
				<option value="">Select Country</option>
				<?php foreach ( $country_list as $iso2 => $details ) : ?>
					<option
						value="<?php echo esc_attr( $iso2 ); ?>"
						<?php selected( $iso2, $defaultValue ); ?>
					>
						<?php echo esc_html( $details['name'] . ' (+' . $details['telCode'] . ')' ); ?>
					</option>
				<?php endforeach; ?>
			</select>
		<?php endif; ?>
	</div>
</div>