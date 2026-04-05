<?php
$blockProps = get_block_wrapper_attributes();
?>

<div <?php echo esc_attr( $blockProps ); ?> data-id='<?php echo esc_attr( $id ); ?>'>
	<form class="quick-form">
		<?php echo $content;  // phpcs:ignore ?>
	</form>
</div>
