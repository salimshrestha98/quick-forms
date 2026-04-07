<?php
$blockProps = get_block_wrapper_attributes(
	array(
		'class'   => 'qf-block qf-recaptcha-block',
		'data-id' => esc_attr( $id ),
	)
);
$options    = get_option( 'qf_settings' );
$site_key   = $options['recaptcha_site_key'] ?? '';
?>

<div <?php echo esc_attr( $blockProps ); ?>>
	<div class="wrapper">
		<div class="qf-field qf-recaptcha-field">
			<div class="g-recaptcha" data-sitekey="<?php echo esc_attr( $site_key ); ?>"></div>
			<script src="https://www.google.com/recaptcha/api.js" async defer></script>
		</div>
	</div>
</div>
