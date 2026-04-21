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
			<h1>Form Submissions</h1>

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
		<div class="wrap">
			<h1>Quick Forms Settings</h1>

			<form method="post" action="options.php">
				<?php settings_fields( 'quick_forms_settings_group' ); ?>

				<table class="form-table">
					<tr>
						<th><?php echo esc_html__( 'reCAPTCHA Site Key', 'quick-forms' ); ?></th>
						<td>
							<input type="text" name="quick_forms_settings[recaptcha_site_key]" 
								value="<?php echo esc_attr( $options['recaptcha_site_key'] ?? '' ); ?>" />
						</td>
					</tr>

					<tr>
						<th><?php echo esc_html__( 'reCAPTCHA Secret Key', 'quick-forms' ); ?> </th>
						<td>
							<input type="text" name="quick_forms_settings[recaptcha_secret_key]" 
								value="<?php echo esc_attr( $options['recaptcha_secret_key'] ?? '' ); ?>" />
						</td>
					</tr>
				</table>

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
				'type'              => 'string',
				'sanitize_callback' => 'sanitize_text_field',
				'default'           => '',
			)
		);
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
}
