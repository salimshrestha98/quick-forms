<?php

$blockProps = get_block_wrapper_attributes();

?>

<div <?php echo $blockProps; ?> data-id="<?php echo esc_attr( $id ); ?>">
	<?php
	if ( $showLabel ) :
		$required_icon = $required ? "<span class='qf-required'>*</span>" : '';
		?>
		<label for="<?php echo esc_attr( $id ); ?>">
			<?php echo esc_html( $fieldLabel ); ?> <?php echo wp_kses_post( $required_icon ); ?>
		</label>
	<?php endif; ?>

	<div class="qf-field qf-file-upload-field">
		<input
			type="file"
			name="<?php echo esc_attr( $id ); ?><?php echo $multiple ? '[]' : ''; ?>"
			id="<?php echo esc_attr( $id ); ?>"
			<?php echo ! empty( $accept ) ? 'accept="' . esc_attr( $accept ) . '"' : ''; ?>
			<?php echo $multiple ? 'multiple' : ''; ?>
			<?php echo $required ? 'required' : ''; ?>
		/>
		<span class="qf-file-upload-placeholder"><?php echo esc_html( $placeholder ); ?></span>
	</div>
</div>