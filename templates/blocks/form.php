<?php
$blockProps = get_block_wrapper_attributes(
	array(
		'class'   => 'qf-block qf-form-block',
		'data-id' => esc_attr( $id ),
	)
);
$options    = get_option( 'qf_settings' );

$form_attributes  = '';
$form_attributes .= $redirectionUrl ? sprintf( ' data-redirection-url="%s"', $redirectionUrl ) : '';
$form_attributes .= $hideFormAfterSubmit ? ' data-hide-form-after-submit="true"' : '';
?>

<div <?php echo $blockProps; ?>>
	<form class="quick-form" <?php echo $form_attributes; ?>>

	<?php
	if ( $honeypot ) {
		echo '<input type="text" id="qfhpfld" name="qfhpfld" placeholder="Please enter your name here" value=""/>';
	}

	echo $content;
	?>
	</form>

	<div class="qf-form-message qf-message-success hidden">
		<?php echo $messages['success']; ?>
	</div>
	<div class="qf-form-message qf-message-error hidden">
		<?php echo $messages['error']; ?>
	</div>
</div>
