<?php
defined( 'ABSPATH' ) || exit;

$options  = get_option( 'quick_forms_settings' );
$site_key = $options['recaptcha_site_key'] ?? '';
?>

<div <?php echo $blockProps; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<div class="wrapper">
		<div class="qf-field qf-recaptcha-field">
			<div class="g-recaptcha" data-sitekey="<?php echo esc_attr( $site_key ); ?>"></div>
		</div>
	</div>
</div>
