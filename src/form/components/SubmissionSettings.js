import { TextControl, ToggleControl } from '@wordpress/components';

export default function SubmissionSettings( { attributes, setAttributes } ) {
	const { hideFormAfterSubmit, redirectionUrl } = attributes;
	return (
		<div>
			<ToggleControl
				help="Hide the form after the form is submitted successfully."
				label="Hide Form after Submission"
				checked={ hideFormAfterSubmit }
				onChange={ () => {
					setAttributes( {
						hideFormAfterSubmit: ! hideFormAfterSubmit,
					} );
				} }
			/>
			<TextControl
				__next40pxDefaultSize
				help="Redirect the user to certain page after the form is submitted successfully."
				label="Redirection URL"
				value={ redirectionUrl }
				placeholder="https://example.com/"
				onChange={ ( value ) =>
					setAttributes( {
						redirectionUrl: value,
					} )
				}
			/>
		</div>
	);
}
