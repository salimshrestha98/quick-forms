<?php
defined( 'ABSPATH' ) || exit;

$options = get_option( 'nnforms_settings' );

$form_attributes  = '';
$form_attributes .= $redirectionUrl ? sprintf( ' data-redirection-url="%s"', esc_attr( $redirectionUrl ) ) : '';
$form_attributes .= $hideFormAfterSubmit ? ' data-hide-form-after-submit="true"' : '';
?>

<div <?php echo $blockProps; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<div class="wrapper">
		<form class="nnform" <?php echo $form_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
			<input type="hidden" name="form-id" value="<?php echo esc_attr( $id ); ?>" />

		<?php
		if ( $honeypot ) {
			echo '<input type="text" id="nnfhpfld" name="nnfhpfld" placeholder="Please enter your name here" value=""/>';
		}

		echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		?>
		</form>

		<div class="nnf-form-message nnf-message-success hidden">
			<?php echo wp_kses_post( $messages['success'] ); ?>
		</div>
		<div class="nnf-form-message nnf-message-error hidden">
			<?php echo wp_kses_post( $messages['error'] ); ?>
		</div>
	</div>
</div>
