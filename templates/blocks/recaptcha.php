<?php
$blockProps = get_block_wrapper_attributes();
$options    = get_option( 'qf_settings' );
$site_key   = $options['recaptcha_site_key'] ?? '';
?>

<div <?php echo esc_attr( $blockProps ); ?> data-id='<?php echo esc_attr( $id ); ?>'>
<div class="qf-field qf-recaptcha-field">
	<div class="g-recaptcha" data-sitekey="<?php echo esc_attr( $site_key ); ?>"></div>
	<script src="https://www.google.com/recaptcha/api.js" async defer></script>
</div>
</div>
