<?php
defined( 'ABSPATH' ) || exit;

$options_list = NNForms\Helpers\BlockHelper::parse_radio_options( $options );
?>

<div <?php echo $blockProps; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<div class="wrapper">
		<?php echo wp_kses_post( "<label for='$id'>$fieldLabel $required_icon</label>" ); ?>
		<div class="nnf-field nnf-radio-field">
			<?php if ( ! empty( $options_list ) ) : ?>
				<?php foreach ( $options_list as $key => $label ) : ?>
					<div class="nnf-radio-item">
						<input
							type="radio"
							name=<?php echo esc_attr( $id ); ?>
							value="<?php echo esc_attr( $key ); ?>"
							<?php checked( $key, $defaultValue ); ?>
							<?php echo $required ? 'required' : ''; ?>
						/>
						<?php echo esc_html( $label ); ?>
					</div>
				<?php endforeach; ?>
			<?php endif; ?>
		</div>
	</div>
</div>
