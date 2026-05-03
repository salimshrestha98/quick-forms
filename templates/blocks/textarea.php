<?php
defined( 'ABSPATH' ) || exit;

$textarea_attributes  = '';
$textarea_attributes .= sprintf( ' id="%s"', esc_attr( $id ) );
$textarea_attributes .= sprintf( ' name="%s"', esc_attr( $id ) );
$textarea_attributes .= sprintf( ' rows="%d"', esc_attr( $rowsCount ) );
$textarea_attributes .= $placeholder ? sprintf( ' placeholder="%s"', esc_attr( $placeholder ) ) : '';
$textarea_attributes .= $maxLength ? sprintf( ' maxlength="%d"', esc_attr( $maxLength ) ) : '';
$textarea_attributes .= $required ? 'required' : '';
?>

<div <?php echo $blockProps; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<div class="wrapper">
		<?php echo wp_kses_post( "<label for='$id'>$fieldLabel $required_icon</label>" ); ?>
		<div class="qf-field qf-textarea-field">
			<textarea<?php echo $textarea_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>><?php echo esc_html( $defaultValue ); ?></textarea>
		</div>
	</div>
</div>
