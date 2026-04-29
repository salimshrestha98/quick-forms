import { TextControl } from '@wordpress/components';

export default function MessageSettings( { attributes, setAttributes } ) {
	const { messages } = attributes;
	return (
		<div>
			<TextControl
				__next40pxDefaultSize
				help="Message to show when form submits successfully."
				label="Success Message"
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
				label="Error Message"
				help="Message to show when form submission fails."
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
