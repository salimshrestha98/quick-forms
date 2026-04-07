<?php
$blockProps = get_block_wrapper_attributes(
	array(
		'class'   => 'qf-block qf-submit-block',
		'data-id' => esc_attr( $id ),
	)
);
?>

<div <?php echo $blockProps; ?>>
	<div class="wrapper">
		<div class="qf-field qf-submit-field">
			<button type="submit">
				<span><?php echo esc_html( $buttonText ); ?></span>
			</button>
		</div>
	</div>
</div>
