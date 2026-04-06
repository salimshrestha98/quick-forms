<?php
$blockProps    = get_block_wrapper_attributes();
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

<div <?php echo $blockProps; ?> data-id='<?php echo esc_attr( $id ); ?>'>
	<?php
	if ( ( ! $isHiddenField ) && $showLabel ) {
		$required_icon = $required ? "<span class='qf-required' title='Required Field'>*</span>" : '';

		echo wp_kses_post( "<label for='$id'>$fieldLabel $required_icon</label>" );
	}
	?>
	<div class="qf-field qf-input-field">
		<input<?php echo $input_attributes; ?>/>
	</div>
</div>
