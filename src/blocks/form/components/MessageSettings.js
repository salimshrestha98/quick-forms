import { __ } from '@wordpress/i18n';
import { TextControl } from '@wordpress/components';

export default function MessageSettings( { attributes, setAttributes } ) {
	const { messages } = attributes;
	return (
		<div>
			<TextControl
				__next40pxDefaultSize
				help={ __(
					'Message to show when form submits successfully.',
					'99forms'
				) }
				label={ __( 'Success Message', '99forms' ) }
				value={ messages.success }
				onChange={ ( value ) =>
					setAttributes( {
						messages: {
							...messages,
							success: value,
						},
					} )
				}
			/>
			<TextControl
				__next40pxDefaultSize
				label={ __( 'Error Message', '99forms' ) }
				help={ __(
					'Message to show when form submission fails.',
					'99forms'
				) }
				value={ messages.error }
				onChange={ ( value ) =>
					setAttributes( {
						messages: {
							...messages,
							error: value,
						},
					} )
				}
			/>
		</div>
	);
}
