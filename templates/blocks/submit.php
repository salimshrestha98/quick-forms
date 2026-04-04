<?php
$blockProps = get_block_wrapper_attributes();
?>

<div <?php echo esc_attr( $blockProps ); ?> data-id='<?php echo esc_attr( $id ); ?>'>
	<button type="submit">
		<span><?php echo esc_html( $buttonText ); ?></span>
	</button>
</div>
