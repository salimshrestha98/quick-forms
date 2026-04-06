<?php

$blockProps   = get_block_wrapper_attributes();
$options_list = QuickForms\Helpers\BlockHelper::parse_radio_options( $options );

?>

<div <?php echo $blockProps; ?> data-id='<?php echo esc_attr( $id ); ?>'>
	<?php
	if ( $showLabel ) {
		$required_icon = $required ? "<span class='qf-required' title='Required Field'>*</span>" : '';

		echo wp_kses_post( "<label for='$id'>$fieldLabel $required_icon</label>" );
	}
	?>
	<div class="qf-field qf-radio-field">
		<?php if ( ! empty( $options_list ) ) : ?>
			<?php foreach ( $options_list as $index => $option ) : ?>
				<div class="qf-radio-item">
					<input
						type="radio"
						name=<?php echo esc_attr( $id ); ?>
						value="<?php echo esc_attr( $option['value'] ); ?>"
						<?php checked( $option['value'], $defaultValue ); ?>
						<?php echo $required ? 'required' : ''; ?>
					/>
					<?php echo trim( $option['label'] ); ?>
				</div>
			<?php endforeach; ?>
		<?php endif; ?>
	</div>
</div>
