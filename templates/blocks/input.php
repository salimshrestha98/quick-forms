<?php
defined( 'ABSPATH' ) || exit;

$inputType     = ! empty( $inputType ) ? $inputType : 'text';
$isHiddenField = 'hidden' === $inputType;

$input_attributes  = '';
$input_attributes .= sprintf( ' type="%s"', esc_attr( $inputType ) );
$input_attributes .= sprintf( ' id="%s"', esc_attr( $id ) );
$input_attributes .= sprintf( ' name="%s"', esc_attr( $id ) );
$input_attributes .= $placeholder ? sprintf( ' placeholder="%s"', esc_attr( $placeholder ) ) : '';
$input_attributes .= $defaultValue ? sprintf( ' value="%s"', esc_attr( $defaultValue ) ) : '';
$input_attributes .= $minimum ? sprintf( ' min="%s"', esc_attr( $minimum ) ) : '';
$input_attributes .= $maximum ? sprintf( ' max="%s"', esc_attr( $maximum ) ) : '';
?>

<div <?php echo $blockProps; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<div class="wrapper">
		<?php
		if ( ( ! $isHiddenField ) ) {
			echo wp_kses_post( "<label for='$id'>$fieldLabel $required_icon</label>" );
		}
		?>
		<div class="qf-field qf-input-field">
			<input <?php echo $input_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>/>
		</div>
	</div>
</div>
