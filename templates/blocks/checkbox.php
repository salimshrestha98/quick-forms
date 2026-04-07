<?php

$blockProps = get_block_wrapper_attributes();

?>

<div <?php echo $blockProps; ?> data-id='<?php echo esc_attr( $id ); ?>'>
	<div class="qf-field qf-checkbox-field">
		<input type="checkbox" name=
		<?php
		echo esc_attr( $id );
		?>
		<?php echo $required ? 'required' : ''; ?>
		/>
		<span><?php echo esc_html( $placeholder ); ?></span>
	</div>
</div>
