<?php
$blockProps = get_block_wrapper_attributes(
	array(
		'class'   => 'qf-block qf-textarea-block',
		'data-id' => esc_attr( $id ),
	)
);

$textarea_attributes  = '';
$textarea_attributes .= sprintf( ' id="%s"', esc_attr( $id ) );
$textarea_attributes .= sprintf( ' name="%s"', esc_attr( $id ) );
$textarea_attributes .= sprintf( ' rows="%d"', esc_attr( $rowsCount ) );
$textarea_attributes .= $placeholder ? sprintf( ' placeholder="%s"', esc_attr( $placeholder ) ) : '';
$textarea_attributes .= $required ? 'required' : '';
$required_icon        = QuickForms\Helpers\BlockHelper::required( $required );
?>

<div <?php echo $blockProps; ?>>
	<div class="wrapper">
		<?php echo wp_kses_post( "<label for='$id'>$fieldLabel $required_icon</label>" ); ?>
		<div class="qf-field qf-textarea-field">
			<textarea<?php echo $textarea_attributes; ?>><?php echo $defaultValue; ?></textarea>
		</div>
	</div>
</div>
