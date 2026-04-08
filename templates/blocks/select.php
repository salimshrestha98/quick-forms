<?php
$options_list = QuickForms\Helpers\BlockHelper::parse_radio_options( $options );
?>

<div <?php echo $blockProps; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<div class="wrapper">
		<label for="<?php echo esc_attr( $id ); ?>">
			<?php echo wp_kses_post( "<label for='$id'>$fieldLabel $required_icon</label>" ); ?>
		</label>

		<div class="qf-field qf-select-field">
			<?php if ( ! empty( $options_list ) ) : ?>
				<select
					name="<?php echo esc_attr( $id ); ?>"
					id="<?php echo esc_attr( $id ); ?>"
					<?php echo $required ? 'required' : ''; ?>
				>
					<?php foreach ( $options_list as $key => $label ) : ?>
						<option
							value="<?php echo esc_attr( $key ); ?>"
							<?php selected( $key, $defaultValue ); ?>
						>
							<?php echo esc_html( trim( $label ) ); ?>
						</option>
					<?php endforeach; ?>
				</select>
			<?php endif; ?>
		</div>
	</div>
</div>
