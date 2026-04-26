<?php
defined( 'ABSPATH' ) || exit;
?>
<div <?php echo $blockProps; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<div class="wrapper">
		<div class="qf-field qf-checkbox-field">
			<input type="checkbox" name=
			<?php
			echo esc_attr( $id );
			?>
			<?php echo $required ? 'required' : ''; ?>
			<?php echo $checkedByDefault ? 'checked' : ''; ?>
			/>
			<span><?php echo esc_html( $placeholder ); ?></span>
		</div>
	</div>
</div>
