import { useBlockProps } from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';

export default function Edit( {
	attributes,
	setAttributes,
	context,
	clientId,
} ) {
	const { id } = attributes;

	const { 'quick-form/fieldMargin': fieldMargin } = context;

	useEffect( () => {
		if ( ! id ) {
			setAttributes( { id: clientId.slice( 0, 8 ) } );
		}
	}, [] );

	const blockProps = useBlockProps( {
		style: {
			margin: fieldMargin
				? `${ fieldMargin.top } ${ fieldMargin.right } ${ fieldMargin.bottom } ${ fieldMargin.left }`
				: '',
		},
	} );

	return (
		<>
			<div { ...blockProps }>
				<div className="qf-field qf-recaptcha-field">
					<span className="qf-recaptcha-placeholder">
						reCaptcha is not visible in the edior. Preview the page
						to view it.
					</span>
				</div>
			</div>
		</>
	);
}
