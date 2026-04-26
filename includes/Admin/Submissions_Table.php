<?php

namespace QuickForms\Admin;

use WP_List_Table;
use QuickForms\Helpers\BlockHelper;

if ( ! class_exists( 'WP_List_Table' ) ) {
	require_once ABSPATH . 'wp-admin/includes/class-wp-list-table.php';
}

class Submissions_Table extends WP_List_Table {
	/**
	 * Database table name.
	 *
	 * @var string
	 */
	private $table;

	/**
	 * Stores list of ids of forms with submissions.
	 *
	 * @var array
	 */
	private $form_ids;

	/**
	 * Form Settings.
	 *
	 * @var array
	 */
	private $form;

	/**
	 * Constructor.
	 */
	public function __construct() {
		parent::__construct(
			array(
				'singular' => 'submission',
				'plural'   => 'submissions',
				'ajax'     => false,
			)
		);

		global $wpdb;
		$this->table = $wpdb->prefix . 'qf_submissions';
		$this->get_available_forms();

		$this->form = BlockHelper::get_form_settings( $this->get_form_filter() );
	}

	/**
	 * Fetch ids of forms with submissions and store as in form_ids.
	 *
	 * @return void
	 */
	private function get_available_forms() {
		global $wpdb;

		$result = $wpdb->get_col( "SELECT form_id FROM {$this->table}" ); // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared, WordPress.DB.DirectDatabaseQuery.NoCaching

		$this->form_ids = array_unique( $result );
	}

	/**
	 * Returns the currenty selected form id.
	 * Returns first form from available forms if none selected.
	 *
	 * @return string $form_id
	 */
	private function get_form_filter() {
		$form_id = sanitize_text_field( wp_unslash( $_GET['form_filter'] ?? '' ) ); // phpcs:ignore WordPress.Security.NonceVerification.Recommended

		return ! empty( $form_id ) ? $form_id : $this->form_ids[0] ?? '';
	}

	/**
	 * Returns columns list for the list table.
	 *
	 * @return array
	 */
	public function get_columns() {
		$columns = array(
			'cb' => '<input type="checkbox" />',
			'id' => __( 'ID', 'quick-forms' ),
		);

		if ( isset( $this->form['fields'] ) ) {
			foreach ( $this->form['fields'] as $field ) {
				$ignoreBlocks = array( 'quick-forms/recaptcha', 'quick-forms/submit' );

				if ( in_array( $field['blockName'], $ignoreBlocks, true ) ) {
					continue;
				}
				$field_name  = $field['attrs']['id'] ?? '';
				$field_label = $field['attrs']['fieldLabel'] ?? '';

					$columns[ $field_name ] = $field_label;
			}
		}

		// Add Date column to last only.
		$columns['submitted_at'] = __( 'Date', 'quick-forms' );

		return $columns;
	}

	/**
	 * Returns the list of columns that are sortable.
	 *
	 * @return array
	 */
	protected function get_sortable_columns() {
		return array(
			'id'           => array( 'id', true ),
			'submitted_at' => array( 'submitted_at', true ),
		);
	}

	protected function column_cb( $item ) {
		return sprintf(
			'<input type="checkbox" name="submission[]" value="%d" />',
			$item['id']
		);
	}

	protected function column_default( $item, $column_name ) {
		$value      = $item[ $column_name ] ?? '';
		$field      = $this->form['fields'][ $column_name ] ?? array();
		$field_name = $field['blockName'] ?? '';

		if ( 'quick-forms/country' === $field_name ) {
			$country = BlockHelper::get_country( $value );

			return esc_html( $country['name'] ?? $value );
		} elseif ( 'quick-forms/file-upload' === $field_name && is_array( $value ) ) {
			return sprintf(
				'<a href=%s target="_blank">%s</a>',
				esc_url( $value['url'] ),
				esc_html( $value['name'] )
			);
		} elseif ( 'quick-forms/radio' === $field_name || 'quick-forms/select' === $field_name ) {
			$options = BlockHelper::parse_radio_options( $field['attrs']['options'] ?? '' );
			return esc_html( $options[ $value ] ?? $value );
		} elseif ( 'quick-forms/textarea' === $field_name && strlen( $value ) > 60 ) {
			return esc_html( substr( $value, 0, 60 ) ) . '...';
		}

		if ( is_iterable( $value ) ) {
			return __( '[Non string value]', 'quick-forms' );
		}

		return esc_html( $value );
	}

	/**
	 * Returns list of available bulk actions.
	 *
	 * @return array
	 */
	protected function get_bulk_actions() {
		return array(
			'delete' => __( 'Delete', 'quick-forms' ),
		);
	}

	/**
	 * Bulk action handler.
	 *
	 * @return void
	 */
	public function process_bulk_action() {
		global $wpdb;

		$action = $this->current_action();

		if ( ! $action ) {
			return;
		}

		check_admin_referer( 'bulk-submissions' );

		if ( ! current_user_can( 'delete_posts' ) ) {
			wp_die( esc_html__( 'You do not have permission to do this.', 'quick-forms' ) );
		}

		if ( $this->current_action() === 'delete' ) {
			$ids = isset( $_REQUEST['submission'] ) && is_array( $_REQUEST['submission'] ) ? array_map( 'absint', $_REQUEST['submission'] ) : array();

			if ( ! empty( $ids ) ) {
				$ids = array_map( 'intval', $ids );
				$wpdb->query( "DELETE FROM {$this->table} WHERE id IN (" . implode( ',', $ids ) . ')' ); // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared, WordPress.DB.PreparedSQL.NotPrepared
			}
		}
	}

	/**
	 * Return templates for extra controls.
	 *
	 * For Form filter control.
	 *
	 * @param string $which
	 * @return void
	 */
	protected function extra_tablenav( $which ) {
		if ( 'top' !== $which ) {
			return;
		}

		$form_filter   = $this->get_form_filter();
		$form_post_id  = $this->form['post_id'] ?? 0;
		$form_post_url = admin_url( "post.php?post={$form_post_id}&action=edit" );
		?>

		<div class="alignleft actions">
			<select name="form_filter">
		<?php
		foreach ( $this->form_ids as $form_id ) {
			$form_settings = BlockHelper::get_form_settings( $form_id );
			$form_name     = $form_settings['attrs']['formName'] ?? 'Contact Form';

			printf(
				"<option value='%s' %s>%s</option>",
				esc_attr( $form_id ),
				selected( $form_filter, esc_attr( $form_id ) ),
				esc_html( $form_name )
			);
		}
		?>
			</select>
		<?php submit_button( 'Filter', '', 'filter_action', false ); ?>

	</div>
	<div class="alignleft actions" style="margin-left: 10px">
		<a class="button button-primary" href="<?php echo esc_url( $form_post_url ); ?>" target="_blank" style="display:flex;align-items:center;gap:5px;">
			<span class="dashicons dashicons-edit"></span>
			Edit Form
		</a>
	</div>
		<?php
	}

	/**
	 * Fetch items from table according to filters.
	 *
	 * @return void
	 */
	public function prepare_items() {
		global $wpdb;

		// phpcs:disable WordPress.Security.NonceVerification.Recommended, WordPress.DB.PreparedSQL.InterpolatedNotPrepared

		$per_page     = 10;
		$current_page = $this->get_pagenum();

		$search      = isset( $_REQUEST['s'] ) ? sanitize_text_field( wp_unslash( $_REQUEST['s'] ) ) : '';
		$form_filter = $this->get_form_filter();

		$where = 'WHERE 1=1';

		if ( $search ) {
			$where .= $wpdb->prepare(
				' AND (name LIKE %s OR email LIKE %s)',
				"%$search%",
				"%$search%"
			);
		} elseif ( ! $form_filter ) {
			$where = 'WHERE false';
		}

		if ( $form_filter ) {
			$where .= $wpdb->prepare(
				' AND form_id = %s',
				$form_filter
			);
		}

		$order_by = ( isset( $_GET['orderby'] ) && in_array( $_GET['orderby'], array( 'id', 'submitted_at' ), true ) ) ? sanitize_text_field( wp_unslash( $_GET['orderby'] ) ) : 'id';
		$order    = ( isset( $_GET['order'] ) && in_array( $_GET['order'], array( 'asc', 'desc' ), true ) ) ? strtoupper( sanitize_text_field( wp_unslash( $_GET['order'] ) ) ) : 'DESC';

		$offset = ( $current_page - 1 ) * $per_page;

		$total_items = $wpdb->get_var( // phpcs:ignore PluginCheck.Security.DirectDB.UnescapedDBParameter
			"SELECT COUNT(*) FROM {$this->table} $where"
		);

		$items = $wpdb->get_results( // phpcs:ignore PluginCheck.Security.DirectDB.UnescapedDBParameter
			"SELECT * FROM {$this->table}
			 $where
			 ORDER BY $order_by $order
			 LIMIT $per_page OFFSET $offset",
			ARRAY_A
		);

		$this->items = $items;

		$this->parse_items();

		$this->set_pagination_args(
			array(
				'total_items' => $total_items,
				'per_page'    => $per_page,
			)
		);

		$this->_column_headers = array(
			$this->get_columns(),
			array(),
			$this->get_sortable_columns(),
		);

		// phpcs:enable WordPress.Security.NonceVerification.Recommended, WordPress.DB.PreparedSQL.InterpolatedNotPrepared
	}

	/**
	 * Unserialize the submission data stored in serialized format.
	 *
	 * @return void
	 */
	private function parse_items() {
		if ( ! $this->items || empty( $this->items ) ) {
			return;
		}

		foreach ( $this->items as $key => $form ) {
			$data                = maybe_unserialize( $form['data'] );
			$this->items[ $key ] = array_replace( $form, $data ); // array_merge() is not used because it reindexes array keys
		}
	}
}
