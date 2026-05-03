<?php
namespace QuickForms\Admin;

defined( 'ABSPATH' ) || exit;

/**
 * Admin class.
 */
final class Admin {
	/**
	 * Constructor.
	 */
	public function __construct() {
		add_action( 'save_post', array( $this, 'save_form' ), 10, 3 );
		add_action( 'admin_menu', array( $this, 'register_menus' ) );
		add_action( 'admin_init', array( $this, 'register_setting' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
	}

	/**
	 * Register main menu and submenus.
	 */
	public function register_menus() {
		// Main menu
		add_menu_page(
			__( 'Quick Forms', 'quick-forms' ),
			__( 'Quick Forms', 'quick-forms' ),
			'manage_options',
			'quick-forms',
			array( $this, 'render_dashboard_page' ),
			'dashicons-feedback',
			25
		);

		// Submenu: Forms
		add_submenu_page(
			'quick-forms',
			__( 'Form Submissions', 'quick-forms' ),
			__( 'Submissions', 'quick-forms' ),
			'manage_options',
			'quick-forms-submissions',
			array( $this, 'render_forms_page' )
		);

		// Submenu: Settings
		add_submenu_page(
			'quick-forms',
			__( 'Quick Forms Settings', 'quick-forms' ),
			__( 'Settings', 'quick-forms' ),
			'manage_options',
			'quick-forms-settings',
			array( $this, 'render_settings_page' )
		);

		remove_submenu_page( 'quick-forms', 'quick-forms' );
	}

	/**
	 * Forms page callback
	 */
	public function render_forms_page() {
		$table = new \QuickForms\Admin\Submissions_Table();

		$table->process_bulk_action();
		$table->prepare_items();
		?>

		<div class="wrap">
			<h1><?php esc_html_e( 'Form Submissions', 'quick-forms' ); ?></h1>

			<form method="get">
				<input type="hidden" name="page" value="quick-forms-submissions" />

				<?php $table->display(); ?>
			</form>
		</div>

		<?php
	}

	public function render_settings_page() {
		$options = get_option( 'quick_forms_settings' );
		?>
		<div class="qf-admin qf-settings">
			<h1 class="qf-settings__title">
				<?php esc_html_e( 'Quick Forms Settings', 'quick-forms' ); ?>
			</h1>

			<form class="qf-settings__form" method="post" action="options.php">
				<?php settings_fields( 'quick_forms_settings_group' ); ?>

				<div class="qf-settings__layout">

					<!-- Sidebar -->
					<div class="qf-settings__nav" role="tablist">
						<button type="button" class="qf-settings__tab is-active" data-tab="recaptcha">
							<?php esc_html_e( 'reCAPTCHA', 'quick-forms' ); ?>
						</button>
					</div>

					<!-- Panels -->
					<div class="qf-settings__panels">

						<div class="qf-settings__panel is-active" data-panel="recaptcha">
							<div class="qf-field">
								<label class="qf-field__label">
									<?php esc_html_e( 'reCAPTCHA Site Key', 'quick-forms' ); ?>
								</label>
								<div class="qf-field__control">
									<input type="text"
										name="quick_forms_settings[recaptcha_site_key]"
										value="<?php echo esc_attr( $options['recaptcha_site_key'] ?? '' ); ?>">
								</div>
							</div>

							<div class="qf-field">
								<label class="qf-field__label">
									<?php esc_html_e( 'reCAPTCHA Secret Key', 'quick-forms' ); ?>
								</label>
								<div class="qf-field__control">
									<input type="text"
										name="quick_forms_settings[recaptcha_secret_key]"
										value="<?php echo esc_attr( $options['recaptcha_secret_key'] ?? '' ); ?>">
								</div>
							</div>
						</div>
					</div>

				</div>

				<?php submit_button(); ?>
			</form>
		</div>
		<?php
	}

	/**
	 * Register quick forms setting group.
	 *
	 * @return void
	 */
	public function register_setting() {
		register_setting(
			'quick_forms_settings_group',
			'quick_forms_settings',
			array(
				'type'              => 'array',
				'sanitize_callback' => array( $this, 'sanitize_settings' ),
				'default'           => array(),
			)
		);
	}

	public function sanitize_settings( array $settings ): array {
		return array_map( 'sanitize_text_field', $settings );
	}

	/**
	 * Parse post data and extract and save form settings.
	 *
	 * @param [int] $post_id
	 * @param [mixed] $post
	 * @return void
	 */
	public function save_form( $post_id, $post ) {
		if ( wp_is_post_autosave( $post_id ) || wp_is_post_revision( $post_id ) ) {
			return;
		}

		if ( ! in_array( $post->post_type, array( 'page', 'post' ), true ) ) {
			return;
		}

		if ( ! current_user_can( 'edit_post', $post_id ) ) {
			return;
		}

		$content = $post->post_content;

		$blocks = parse_blocks( $content );

		$forms = $this->get_qf_block_attributes( $blocks );

		foreach ( $forms as $form_id => $form_data ) {
			$form_data['post_id'] = $post_id;

			update_option( 'qf_form_' . $form_id, $form_data );
		}
	}

	/**
	 * Extract form and field attributes recursively.
	 *
	 * @param array $blocks
	 * @param array $results
	 * @param [int] $form_id
	 * @return array
	 */
	private function get_qf_block_attributes( $blocks, &$results = array(), $form_id = null ) {
		foreach ( $blocks as $block ) {
			if ( str_starts_with( $block['blockName'] ?? '', 'quick-forms/' ) ) {
				$block_id = $block['attrs']['id'] ?? null;

				if ( 'quick-forms/form' === $block['blockName'] ) {
					$form_id = $block_id;

					$results[ $form_id ] = array_intersect_key(
						$block,
						array_flip( array( 'blockName', 'attrs' ) )
					);

					$results[ $form_id ]['fields'] = array();

				} elseif ( $form_id ) {
					$results[ $form_id ]['fields'][ $block_id ] = array_intersect_key(
						$block,
						array_flip( array( 'blockName', 'attrs' ) )
					);
				}
			}

			if ( ! empty( $block['innerBlocks'] ) ) {
				$this->get_qf_block_attributes( $block['innerBlocks'], $results, $form_id );
			}
		}

		return $results;
	}

	public function enqueue_scripts() {
		wp_enqueue_script(
			'quick_forms_admin',
			QF_BUILD_URL . 'admin/admin.js',
			array(),
			QF_VERSION,
			array(
				'in_footer' => true,
			)
		);

		wp_enqueue_style(
			'quick_forms_admin',
			QF_BUILD_URL . 'admin/admin.css',
			array(),
			QF_VERSION,
		);
	}
}
