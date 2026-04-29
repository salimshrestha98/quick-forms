import { Modal, Button } from '@wordpress/components';
import { useState } from '@wordpress/element';
import EmailSettings from './EmailSettings';
import AntiSpamSettings from './AntiSpamSettings';
import MessageSettings from './MessageSettings';
import SubmissionSettings from './SubmissionSettings';

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
	const [ activeSetting, setActiveSetting ] = useState( 'anti-spam' );

	const renderContent = () => {
		switch ( activeSetting ) {
			case 'anti-spam':
				return (
					<AntiSpamSettings
						attributes={ attributes }
						setAttributes={ setAttributes }
					/>
				);

			case 'messages':
				return (
					<MessageSettings
						attributes={ attributes }
						setAttributes={ setAttributes }
					/>
				);

			case 'email':
				return (
					<EmailSettings
						attributes={ attributes }
						setAttributes={ setAttributes }
					/>
				);

			case 'submission':
				return (
					<SubmissionSettings
						attributes={ attributes }
						setAttributes={ setAttributes }
					/>
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
