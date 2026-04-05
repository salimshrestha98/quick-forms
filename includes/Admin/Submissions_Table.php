<?php

namespace QuickForms\Admin;

use WP_List_Table;
use QuickForms\Helpers\BlockHelper;

if ( ! class_exists( 'WP_List_Table' ) ) {
	require_once ABSPATH . 'wp-admin/includes/class-wp-list-table.php';
}

class Submissions_Table extends WP_List_Table {

	private $table;

	private $parsed_items;

	private $form_ids;

	private $columns = array(
		'cb'           => '<input type="checkbox" />',
		'id'           => 'ID',
		'form_name'    => 'Form',
		'submitted_at' => 'Date',
	);

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
	}

	private function get_available_forms() {
		global $wpdb;

		$result = $wpdb->get_col( "SELECT form_id FROM {$this->table}" );

		$this->form_ids = array_unique( $result );
	}

	/* ---------------- Columns ---------------- */

	public function get_columns() {
		return $this->columns;
	}

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
		return $item[ $column_name ] ?? '';
	}

	/* ---------------- Bulk Actions ---------------- */

	protected function get_bulk_actions() {
		return array(
			'delete' => 'Delete',
		);
	}

	public function process_bulk_action() {
		global $wpdb;

		if ( $this->current_action() === 'delete' ) {
			$ids = $_REQUEST['submission'] ?? array();

			if ( ! empty( $ids ) ) {
				$ids = array_map( 'intval', $ids );
				$wpdb->query(
					"DELETE FROM {$this->table} WHERE id IN (" . implode( ',', $ids ) . ')'
				);
			}
		}
	}

	/* ---------------- Filters ---------------- */

	protected function extra_tablenav( $which ) {
		if ( $which !== 'top' ) {
			return;
		}

		$form_filter = $_GET['form_filter'] ?? '';
		?>

		<div class="alignleft actions">
			<select name="form_filter">
				<option value=''> -- Choose a form --</option>
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
					<?php
	}

				/* ---------------- Data ---------------- */

	public function prepare_items() {
		global $wpdb;

		$per_page     = 10;
		$current_page = $this->get_pagenum();

		$search      = $_REQUEST['s'] ?? '';
		$form_filter = $_REQUEST['form_filter'] ?? '';

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

		$order_by = $_GET['orderby'] ?? 'id';
		$order    = $_GET['order'] ?? 'DESC';

		$offset = ( $current_page - 1 ) * $per_page;

		$total_items = $wpdb->get_var(
			"SELECT COUNT(*) FROM {$this->table} $where"
		);

		$items = $wpdb->get_results(
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
	}

	private function parse_items() {
		if ( ! $this->items || empty( $this->items ) ) {
			return;
		}

		$items         = $this->items;
		$form_id       = $items[0]['form_id'];
		$new_columns   = array();
		$form_settings = BlockHelper::get_form_settings( $form_id );
		$form_name     = $form_settings['attrs']['formName'] ?? 'Contact Form';

		foreach ( $items as $key => $form ) {
			$data        = unserialize( $form['data'] );
			$new_columns = array_merge( $new_columns, array_fill_keys( array_keys( $data ), '' ) );

			$data['form_name']   = $form_name;
			$this->items[ $key ] = array_merge( $form, $data );
		}

		if ( isset( $form_settings['fields'] ) ) {
			foreach ( $form_settings['fields'] as $field ) {
				$field_name  = $field['attrs']['fieldName'] ?? '';
				$field_label = $field['attrs']['fieldLabel'] ?? '';

				if ( in_array( $field_name, array_keys( $new_columns ), true ) ) {
					$new_columns[ $field_name ] = $field_label;
				}
			}
		}

		$this->columns = array_merge( $this->columns, $new_columns );
	}
}
