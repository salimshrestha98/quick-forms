import { __ } from '@wordpress/i18n';
import { Modal, Button } from '@wordpress/components';
import { useState } from '@wordpress/element';
import EmailSettings from './EmailSettings';
import AntiSpamSettings from './AntiSpamSettings';
import MessageSettings from './MessageSettings';
import SubmissionSettings from './SubmissionSettings';

const SETTINGS = {
	'anti-spam': {
		label: __( 'Anti-Spam', '99forms' ),
		Component: AntiSpamSettings,
	},
	messages: {
		label: __( 'Messages', '99forms' ),
		Component: MessageSettings,
	},
	email: { label: __( 'Email', '99forms' ), Component: EmailSettings },
	submission: {
		label: __( 'Submission', '99forms' ),
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
			title={ __( 'Form Advanced Settings', '99forms' ) }
			onRequestClose={ () => setActiveTab( 'settings' ) }
			className="nnf-form-advanced-settings-modal"
		>
			<div className="nnf-fasm">
				{ /* Sidebar */ }
				<div className="nnf-fasm__sidebar">
					{ Object.entries( SETTINGS ).map( ( [ key, setting ] ) => (
						<Button
							key={ key }
							className={ `nnf-fasm__tab ${
								activeSetting === key ? 'is-active' : ''
							}` }
							onClick={ () => setActiveSetting( key ) }
						>
							{ setting.label }
						</Button>
					) ) }
				</div>

				{ /* Main content */ }
				<div className="nnf-fasm__main">
					<Component
						attributes={ attributes }
						setAttributes={ setAttributes }
					/>
				</div>
			</div>
		</Modal>
	);
}
