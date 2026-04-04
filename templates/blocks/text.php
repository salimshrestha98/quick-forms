<?php
$blockProps = get_block_wrapper_attributes();
?>

<div <?php echo esc_attr( $blockProps ); ?> data-id='<?php echo esc_attr( $id ); ?>'>
	<?php
	if ( $showLabel ) {
		echo wp_kses_post( "<label>$fieldLabel</label>" );
	}
	?>
	<input type="text" placeholder='<?php echo esc_attr( $placeholder ); ?>' value='<?php echo esc_attr( $defaultValue ); ?>'/>
</div>
