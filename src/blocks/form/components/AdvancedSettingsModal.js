import { __ } from '@wordpress/i18n';
import { Modal, Button } from '@wordpress/components';
import { useState } from '@wordpress/element';
import EmailSettings from './EmailSettings';
import AntiSpamSettings from './AntiSpamSettings';
import MessageSettings from './MessageSettings';
import SubmissionSettings from './SubmissionSettings';

const SETTINGS = {
	'anti-spam': {
		label: __( 'Anti-Spam', 'quick-forms' ),
		Component: AntiSpamSettings,
	},
	messages: {
		label: __( 'Messages', 'quick-forms' ),
		Component: MessageSettings,
	},
	email: { label: __( 'Email', 'quick-forms' ), Component: EmailSettings },
	submission: {
		label: __( 'Submission', 'quick-forms' ),
		Component: SubmissionSettings,
	},
};

export default function AdvancedSettingsModal( {
	attributes,
	setAttributes,
	setActiveTab,
} ) {
	const [ activeSetting, setActiveSetting ] = useState( 'anti-spam' );

	const { Component } = SETTINGS[ activeSetting ];

	return (
		<Modal
			title={ __( 'Form Advanced Settings', 'quick-forms' ) }
			onRequestClose={ () => setActiveTab( 'settings' ) }
			className="qf-form-advanced-settings-modal"
		>
			<div className="qf-fasm">
				{ /* Sidebar */ }
				<div className="qf-fasm__sidebar">
					{ Object.entries( SETTINGS ).map( ( [ key, setting ] ) => (
						<Button
							key={ key }
							className={ `qf-fasm__tab ${
								activeSetting === key ? 'is-active' : ''
							}` }
							onClick={ () => setActiveSetting( key ) }
						>
							{ setting.label }
						</Button>
					) ) }
				</div>

				{ /* Main content */ }
				<div className="qf-fasm__main">
					<Component
						attributes={ attributes }
						setAttributes={ setAttributes }
					/>
				</div>
			</div>
		</Modal>
	);
}
