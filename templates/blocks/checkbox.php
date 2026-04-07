<?php

$blockProps = get_block_wrapper_attributes(
	array(
		'class'   => 'qf-block qf-checkbox-block',
		'data-id' => esc_attr( $id ),
	)
);

?>

<div <?php echo $blockProps; ?>>
	<div class="wrapper">
		<div class="qf-field qf-checkbox-field">
			<input type="checkbox" name=
			<?php
			echo esc_attr( $id );
			?>
			<?php echo $required ? 'required' : ''; ?>
			/>
			<span><?php echo esc_html( $placeholder ); ?></span>
		</div>
	</div>
</div>
