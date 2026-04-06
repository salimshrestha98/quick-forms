<?php

$blockProps   = get_block_wrapper_attributes();
$options_list = QuickForms\Helpers\BlockHelper::parse_radio_options( $options );

?>

<div <?php echo $blockProps; ?> data-id='<?php echo esc_attr( $id ); ?>'>
	<?php
	if ( $showLabel ) :
		$required_icon = $required ? "<span class='qf-required' title='Required Field'>*</span>" : '';
		?>
		<label for="<?php echo esc_attr( $id ); ?>">
			<?php echo esc_html( $fieldLabel ); ?> <?php echo wp_kses_post( $required_icon ); ?>
		</label>
	<?php endif; ?>

	<div class="qf-field qf-select-field">
		<?php if ( ! empty( $options_list ) ) : ?>
			<select
				name="<?php echo esc_attr( $id ); ?>"
				id="<?php echo esc_attr( $id ); ?>"
				<?php echo $required ? 'required' : ''; ?>
			>
				<?php foreach ( $options_list as $key => $label ) : ?>
					<option
						value="<?php echo esc_attr( $key ); ?>"
						<?php selected( $key, $defaultValue ); ?>
					>
						<?php echo esc_html( trim( $label ) ); ?>
					</option>
				<?php endforeach; ?>
			</select>
		<?php endif; ?>
	</div>
</div>