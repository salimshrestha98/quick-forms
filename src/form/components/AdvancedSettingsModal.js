import {
	Modal,
	Button,
	BaseControl,
	TextControl,
	ToggleControl,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import { RichText } from '@wordpress/block-editor';

const SETTINGS = {
	'anti-spam': 'Anti-Spam',
	messages: 'Messages',
	email: 'Email',
	submission: 'Submission',
};

export default function AdvancedSettingsModal( {
	attributes,
	setAttributes,
	setActiveTab,
} ) {
	const {
		hideFormAfterSubmit,
		redirectionUrl,
		honeypot,
		messages,
		mailTo,
		mailSubject,
		mailBody,
	} = attributes;
	const [ activeSetting, setActiveSetting ] = useState( 'anti-spam' );

	const renderContent = () => {
		switch ( activeSetting ) {
			case 'anti-spam':
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

			case 'messages':
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

			case 'email':
				return (
					<div>
						<TextControl
							__next40pxDefaultSize
							type="email"
							label="To"
							placeholder="johndoe@example.com"
							value={ mailTo }
							onChange={ ( value ) =>
								setAttributes( {
									mailTo: value,
								} )
							}
						/>
						<TextControl
							__next40pxDefaultSize
							label="Subject"
							value={ mailSubject }
							onChange={ ( value ) =>
								setAttributes( {
									mailSubject: value,
								} )
							}
						/>
						<BaseControl id="mailBody" label="Body">
							<RichText
								tagName="div"
								value={ mailBody }
								onChange={ ( value ) =>
									setAttributes( { mailBody: value } )
								}
								placeholder="Write your email..."
								allowedFormats={ [
									'core/bold',
									'core/italic',
									'core/link',
								] }
							/>
						</BaseControl>
					</div>
				);

			case 'submission':
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

			default:
				return null;
		}
	};

	return (
		<Modal
			title="Form Advanced Settings"
			onRequestClose={ () => setActiveTab( 'settings' ) }
			className="qf-form-advanced-settings-modal"
		>
			<div className="qf-fasm">
				{ /* Sidebar */ }
				<div className="qf-fasm__sidebar">
					{ Object.entries( SETTINGS ).map( ( [ key, label ] ) => (
						<Button
							key={ key }
							className={ `qf-fasm__tab ${
								activeSetting === key ? 'is-active' : ''
							}` }
							onClick={ () => setActiveSetting( key ) }
						>
							{ label }
						</Button>
					) ) }
				</div>

				{ /* Main content */ }
				<div className="qf-fasm__main">{ renderContent() }</div>
			</div>
		</Modal>
	);
}
