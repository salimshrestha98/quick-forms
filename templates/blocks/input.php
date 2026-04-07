<?php
$blockProps    = get_block_wrapper_attributes(
	array(
		'class'   => 'qf-block qf-input-block',
		'data-id' => esc_attr( $id ),
	)
);
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
$required_icon     = QuickForms\Helpers\BlockHelper::required( $required );
?>

<div <?php echo $blockProps; ?>>
	<div class="wrapper">
		<?php
		if ( ( ! $isHiddenField ) ) {
			echo wp_kses_post( "<label for='$id'>$fieldLabel $required_icon</label>" );
		}
		?>
		<div class="qf-field qf-input-field">
			<input<?php echo $input_attributes; ?>/>
		</div>
	</div>
</div>
