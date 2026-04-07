import domReady from '@wordpress/dom-ready';

( function ( window, document ) {
	const l10n = window.l10n ?? {};
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
			formData.append( 'nonce', l10n?.ajax_nonce );

			fetch( l10n?.ajax_url, {
				method: 'POST',
				body: formData,
				credentials: 'same-origin',
			} )
				.then( ( response ) => response.json() )
				.then( ( data ) => {
					if ( data.success ) {
						form.reset();
						QF.handleSuccess( form );
					} else {
						QF.handleError( form, data );
					}
				} )
				.catch( () => {} )
				.finally( () => {
					if ( submitBtn ) {
						submitBtn.disabled = false;
					}
				} );
		},

		handleSuccess( form ) {
			if ( form.dataset?.hideFormAfterSubmit === 'true' ) {
				form.style.display = 'none';
			}

			form.parentElement
				.querySelector( '.qf-message-success' )
				.classList.remove( 'hidden' );

			if (
				form.dataset?.redirectionUrl?.length &&
				URL.canParse( form.dataset?.redirectionUrl )
			) {
				window.location = form.dataset.redirectionUrl;
			}
		},

		handleError( form, response ) {
			form.parentElement
				.querySelector( '.qf-message-error' )
				.classList.remove( 'hidden' );
		},
	};

	domReady( QF.init );
} )( window, document );
