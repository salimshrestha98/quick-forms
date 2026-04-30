import { __ } from '@wordpress/i18n';
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
		// eslint-disable-next-line no-alert
		const proceed = window.confirm(
			__( 'Are you sure you want to delete this email?', 'quick-forms' )
		);

		if ( ! proceed ) {
			return;
		}

		const updated = emails.filter( ( _, i ) => i !== index );
		setAttributes( { emails: updated } );
	}

	function saveEmail() {
		const updatedEmails = [ ...emails ];

		if ( Object.values( emailData ).includes( '' ) ) {
			// eslint-disable-next-line no-alert
			window.alert(
				__(
					'One or more of the email fields are empty. Please fill all the fields.',
					'quick-forms'
				)
			);
			return;
		}

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
				{ __( 'Add Email', 'quick-forms' ) }
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
									{ __( 'Edit', 'quick-forms' ) }
								</Button>

								<Button
									isDestructive
									variant="secondary"
									onClick={ () => handleDeleteEmail( index ) }
								>
									{ __( 'Delete', 'quick-forms' ) }
								</Button>
							</div>
						</div>
					) ) }
				</div>
			) }

			{ open && (
				<div className="qf-fasm__email-wrapper">
					<TextControl
						label={ __( 'Label', 'quick-forms' ) }
						required
						value={ emailData.label }
						onChange={ ( value ) =>
							setEmailData( { ...emailData, label: value } )
						}
					/>

					<TextControl
						type="email"
						label={ __( 'To', 'quick-forms' ) }
						required
						value={ emailData.mailTo }
						onChange={ ( value ) =>
							setEmailData( { ...emailData, mailTo: value } )
						}
					/>

					<TextControl
						label={ __( 'Subject', 'quick-forms' ) }
						required
						value={ emailData.mailSubject }
						onChange={ ( value ) =>
							setEmailData( { ...emailData, mailSubject: value } )
						}
					/>

					<BaseControl
						id="mailBody"
						label={ __( 'Body', 'quick-forms' ) }
					>
						<RichText
							tagName="div"
							value={ emailData.mailBody }
							onChange={ ( value ) =>
								setEmailData( {
									...emailData,
									mailBody: value,
								} )
							}
							placeholder={ __(
								'Write your email…',
								'quick-forms'
							) }
						/>
					</BaseControl>

					<Button variant="primary" onClick={ saveEmail }>
						{ editIndex !== null
							? __( 'Update', 'quick-forms' )
							: __( 'Save', 'quick-forms' ) }
					</Button>
				</div>
			) }
		</div>
	);
}
