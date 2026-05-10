<?php
defined( 'ABSPATH' ) || exit;

$options  = get_option( 'nnforms_settings' );
$site_key = $options['recaptcha_site_key'] ?? '';
?>

<div <?php echo $blockProps; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<div class="wrapper">
		<div class="nnf-field nnf-recaptcha-field">
			<div class="g-recaptcha" data-sitekey="<?php echo esc_attr( $site_key ); ?>"></div>
		</div>
	</div>
</div>
