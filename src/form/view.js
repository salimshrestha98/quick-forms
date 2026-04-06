import domReady from '@wordpress/dom-ready';

( function ( window, document ) {
	const QF = {
		init() {
			QF.bindEvents();
		},

		bindEvents() {
			const forms = document.querySelectorAll( 'form.quick-form' );

			forms.forEach( ( form ) => {
				if ( form ) {
					form.addEventListener( 'submit', QF.handleSubmit );
				}
			} );
		},

		handleSubmit( event ) {
			event.preventDefault();
			const form = event.currentTarget;
			const block = form.parentElement;

			// Disable submit button while processing
			const submitBtn = form.querySelector( 'button[type="submit"]' );
			if ( submitBtn ) {
				submitBtn.disabled = true;
			}

			// Collect form data
			const formData = new FormData( form );
			const blockId = block.dataset.id;

			formData.append( 'id', blockId );
			formData.append( 'action', 'qf_form_submit' );
			formData.append( 'nonce', l10n.ajax_nonce );

			fetch( l10n.ajax_url, {
				method: 'POST',
				body: formData,
				credentials: 'same-origin',
			} )
				.then( ( response ) => response.json() )
				.then( ( data ) => {
					if ( data.success ) {
						form.reset();
					}
				} )
				.catch( () => {} )
				.finally( () => {
					if ( submitBtn ) {
						submitBtn.disabled = false;
					}
				} );
		},
	};

	domReady( QF.init );
} )( window, document );
