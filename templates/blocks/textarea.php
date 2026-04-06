<?php
$blockProps = get_block_wrapper_attributes();

$textarea_attributes  = '';
$textarea_attributes .= sprintf( ' id="%s"', esc_attr( $id ) );
$textarea_attributes .= sprintf( ' name="%s"', esc_attr( $id ) );
$textarea_attributes .= sprintf( ' rows="%d"', esc_attr( $rowsCount ) );
$textarea_attributes .= $placeholder ? sprintf( ' placeholder="%s"', esc_attr( $placeholder ) ) : '';
?>

<div <?php echo $blockProps; ?> data-id='<?php echo esc_attr( $id ); ?>'>
	<?php
	if ( $showLabel ) {
		$required_icon = $required ? "<span class='qf-required' title='Required Field'>*</span>" : '';

		echo wp_kses_post( "<label for='$id'>$fieldLabel $required_icon</label>" );
	}
	?>
	<div class="qf-field qf-textarea-field">
		<textarea<?php echo $textarea_attributes; ?>><?php echo $defaultValue; ?></textarea>
	</div>
</div>
