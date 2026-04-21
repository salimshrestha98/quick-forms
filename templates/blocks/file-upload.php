<?php
defined( 'ABSPATH' ) || exit;
?>
<div <?php echo $blockProps; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<div class="wrapper">
		<?php echo wp_kses_post( "<label for='$id'>$fieldLabel $required_icon</label>" ); ?>

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
</div>
