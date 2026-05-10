import { __ } from '@wordpress/i18n';
import { TextControl, ToggleControl } from '@wordpress/components';

export default function SubmissionSettings( { attributes, setAttributes } ) {
	const { hideFormAfterSubmit, redirectionUrl } = attributes;
	return (
		<div>
			<ToggleControl
				help={ __(
					'Hide the form after the form is submitted successfully.',
					'99forms'
				) }
				label={ __( 'Hide Form after Submission', '99forms' ) }
				checked={ hideFormAfterSubmit }
				onChange={ () => {
					setAttributes( {
						hideFormAfterSubmit: ! hideFormAfterSubmit,
					} );
				} }
			/>
			<TextControl
				__next40pxDefaultSize
				help={ __(
					'Redirect the user to certain page after the form is submitted successfully.',
					'99forms'
				) }
				label={ __( 'Redirection URL', '99forms' ) }
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
