import domReady from '@wordpress/dom-ready';

( function ( window, document ) {
	const l10n = window.l10n ?? {};
	const NNF = {
		init() {
			NNF.bindEvents();
		},

		bindEvents() {
			const forms = document.querySelectorAll( 'form.nnform' );

			forms.forEach( ( form ) => {
				if ( form ) {
					form.addEventListener( 'submit', NNF.handleSubmit );
				}
			} );
		},

		handleSubmit( event ) {
			event.preventDefault();
			const form = event.currentTarget;

			// Disable submit button while processing
			const submitBtn = form.querySelector( 'button[type="submit"]' );
			if ( submitBtn ) {
				submitBtn.disabled = true;
			}

			// Hide previous success/error messages.
			form.parentElement
				.querySelectorAll( '.nnf-message-success, .nnf-message-error' )
				.forEach( ( el ) => el.classList.add( 'hidden' ) );

			// Collect form data
			const formData = new FormData( form );

			formData.append( 'action', 'nnforms_form_submit' );
			formData.append( 'nonce', l10n?.ajax_nonce );

			fetch( l10n?.ajax_url, {
				method: 'POST',
				body: formData,
				credentials: 'same-origin',
			} )
				.then( ( response ) => response.json() )
				.then( ( res ) => {
					if ( res.success ) {
						form.reset();
						NNF.handleSuccess( form );
					} else {
						NNF.handleError( form, res?.data?.errors );
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
				.querySelector( '.nnf-message-success' )
				.classList.remove( 'hidden' );

			if (
				form.dataset?.redirectionUrl?.length &&
				URL.canParse( form.dataset?.redirectionUrl )
			) {
				window.location = form.dataset.redirectionUrl;
			}
		},

		/**
		 * Handle if form submission fails in backend.
		 * @param {HTMLFormElement} form   The submitted form element.
		 * @param {Object}          errors Key-value map of field IDs to error messages.
		 */
		handleError( form, errors ) {
			const errorWrapper =
				form.parentElement.querySelector( '.nnf-message-error' );

			errorWrapper.querySelector( '.error-list' )?.remove();

			const errorList = document.createElement( 'ul' );
			errorList.classList.add( 'error-list' );

			Object.values( errors ).forEach( ( error ) => {
				const li = document.createElement( 'li' );
				li.textContent = error;
				errorList.append( li );
			} );

			errorWrapper.append( errorList );
			errorWrapper.classList.remove( 'hidden' );
		},
	};

	domReady( NNF.init );
} )( window, document );
