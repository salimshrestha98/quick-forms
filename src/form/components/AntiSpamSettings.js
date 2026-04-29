import { ToggleControl } from '@wordpress/components';

export default function AntiSpamSettings( { attributes, setAttributes } ) {
	const { honeypot } = attributes;
	return (
		<div>
			<ToggleControl
				label="Enable Honeypot"
				checked={ honeypot }
				help="Enable Honeypot for this form."
				onChange={ () => {
					setAttributes( {
						honeypot: ! honeypot,
					} );
				} }
			/>
		</div>
	);
}
