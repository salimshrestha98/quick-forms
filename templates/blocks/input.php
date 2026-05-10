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
$input_attributes .= $minValue ? sprintf( ' min="%s"', esc_attr( $minValue ) ) : '';
$input_attributes .= $maxValue ? sprintf( ' max="%s"', esc_attr( $maxValue ) ) : '';
$input_attributes .= $maxLength ? sprintf( ' maxlength="%s"', esc_attr( $maxLength ) ) : '';
?>

<div <?php echo $blockProps; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<div class="wrapper">
		<?php
		if ( ( ! $isHiddenField ) ) {
			echo wp_kses_post( "<label for='$id'>$fieldLabel $required_icon</label>" );
		}
		?>
		<div class="nnf-field nnf-input-field">
			<input <?php echo $input_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>/>
		</div>
	</div>
</div>
