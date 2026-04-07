<?php

$blockProps   = get_block_wrapper_attributes(
	array(
		'class'   => 'qf-block qf-country-block',
		'data-id' => esc_attr( $id ),
	)
);
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

$required_icon = QuickForms\Helpers\BlockHelper::required( $required );

?>

<div <?php echo $blockProps; ?> data-id="<?php echo esc_attr( $id ); ?>">
<div class="wrapper">
	<?php echo wp_kses_post( "<label for='$id'>$fieldLabel $required_icon</label>" ); ?>

	<div class="qf-field qf-country-field">
		<?php if ( ! empty( $country_list ) ) : ?>
			<select
				name="<?php echo esc_attr( $id ); ?>"
				id="<?php echo esc_attr( $id ); ?>"
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
</div>