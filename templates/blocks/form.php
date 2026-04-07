<?php
$blockProps = get_block_wrapper_attributes();
$options    = get_option( 'qf_settings' );
?>

<div <?php echo $blockProps; ?> data-id='<?php echo esc_attr( $id ); ?>'>
	<form class="quick-form">

	<?php
	if ( $honeypot ) {
		echo '<input type="text" id="qfhpfld" name="qfhpfld" placeholder="Please enter your name here" value=""/>';
	}

	echo $content;
	?>
	</form>
</div>
