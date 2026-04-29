import { BaseControl, Button, TextControl } from '@wordpress/components';
import { RichText } from '@wordpress/block-editor';
import { useState } from '@wordpress/element';

export default function EmailSettings( { attributes, setAttributes } ) {
	const { emails = [] } = attributes;

	const emptyEmail = {
		id: null,
		label: '',
		mailTo: '',
		mailSubject: '',
		mailBody: '',
	};

	const [ open, setOpen ] = useState( false );
	const [ emailData, setEmailData ] = useState( emptyEmail );
	const [ editIndex, setEditIndex ] = useState( null );

	function handleAddNewEmail() {
		setEmailData( { ...emptyEmail, id: Date.now() } );
		setEditIndex( null );
		setOpen( true );
	}

	function handleEditEmail( index ) {
		setEmailData( emails[ index ] );
		setEditIndex( index );
		setOpen( true );
	}

	function handleDeleteEmail( index ) {
		const updated = emails.filter( ( _, i ) => i !== index );
		setAttributes( { emails: updated } );
	}

	function saveEmail() {
		const updatedEmails = [ ...emails ];

		if ( editIndex !== null ) {
			updatedEmails[ editIndex ] = emailData;
		} else {
			updatedEmails.push( emailData );
		}

		setAttributes( { emails: updatedEmails } );

		setOpen( false );
		setEmailData( emptyEmail );
		setEditIndex( null );
	}

	return (
		<div>
			<Button variant="secondary" onClick={ handleAddNewEmail }>
				Add Email
			</Button>

			{ emails.length > 0 && (
				<div className="qf-email-list">
					{ emails.map( ( email, index ) => (
						<div
							key={ email.id || index }
							className="qf-email-item"
						>
							<div className="qf-email-info">
								<div className="qf-email-label">
									{ email.label }
								</div>
							</div>

							<div className="qf-email-actions">
								<Button
									variant="secondary"
									onClick={ () => handleEditEmail( index ) }
								>
									Edit
								</Button>

								<Button
									isDestructive
									variant="secondary"
									onClick={ () => handleDeleteEmail( index ) }
								>
									Delete
								</Button>
							</div>
						</div>
					) ) }
				</div>
			) }

			{ open && (
				<div className="qf-fasm__email-wrapper">
					<TextControl
						label="Label"
						required
						value={ emailData.label }
						onChange={ ( value ) =>
							setEmailData( { ...emailData, label: value } )
						}
					/>

					<TextControl
						type="email"
						label="To"
						required
						value={ emailData.mailTo }
						onChange={ ( value ) =>
							setEmailData( { ...emailData, mailTo: value } )
						}
					/>

					<TextControl
						label="Subject"
						required
						value={ emailData.mailSubject }
						onChange={ ( value ) =>
							setEmailData( { ...emailData, mailSubject: value } )
						}
					/>

					<BaseControl id="mailBody" label="Body">
						<RichText
							tagName="div"
							value={ emailData.mailBody }
							onChange={ ( value ) =>
								setEmailData( {
									...emailData,
									mailBody: value,
								} )
							}
							placeholder="Write your email..."
						/>
					</BaseControl>

					<Button variant="primary" onClick={ saveEmail }>
						{ editIndex !== null ? 'Update' : 'Save' }
					</Button>
				</div>
			) }
		</div>
	);
}
