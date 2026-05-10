import { __ } from '@wordpress/i18n';
import { ToggleControl } from '@wordpress/components';

export default function AntiSpamSettings( { attributes, setAttributes } ) {
	const { honeypot } = attributes;
	return (
		<div>
			<ToggleControl
				label={ __( 'Enable Honeypot', '99forms' ) }
				checked={ honeypot }
				help={ __( 'Enable Honeypot for this form.', '99forms' ) }
				onChange={ () => {
					setAttributes( {
						honeypot: ! honeypot,
					} );
				} }
			/>
		</div>
	);
}
