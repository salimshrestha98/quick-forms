import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';

export default function Edit( { attributes, setAttributes, clientId } ) {
	const { id } = attributes;

	useEffect( () => {
		if ( ! id ) {
			setAttributes( { id: clientId.slice( 0, 8 ) } );
		}
	}, [] );

	return (
		<>
			<div
				{ ...useBlockProps( {
					className: 'qf-block qf-recaptcha-block',
				} ) }
			>
				<div className="wrapper">
					<div className="qf-field qf-recaptcha-field">
						<span className="qf-recaptcha-placeholder">
							{ __(
								'reCaptcha is not visible in the edior. Preview the page to view it.',
								'quick-forms'
							) }
						</span>
					</div>
				</div>
			</div>
		</>
	);
}
