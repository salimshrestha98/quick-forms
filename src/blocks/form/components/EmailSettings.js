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
			__( 'Are you sure you want to delete this email?', '99forms' )
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
					'99forms'
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
				{ __( 'Add Email', '99forms' ) }
			</Button>

			{ emails.length > 0 && (
				<div className="nnf-email-list">
					{ emails.map( ( email, index ) => (
						<div
							key={ email.id || index }
							className="nnf-email-item"
						>
							<div className="nnf-email-info">
								<div className="nnf-email-label">
									{ email.label }
								</div>
							</div>

							<div className="nnf-email-actions">
								<Button
									variant="secondary"
									onClick={ () => handleEditEmail( index ) }
								>
									{ __( 'Edit', '99forms' ) }
								</Button>

								<Button
									isDestructive
									variant="secondary"
									onClick={ () => handleDeleteEmail( index ) }
								>
									{ __( 'Delete', '99forms' ) }
								</Button>
							</div>
						</div>
					) ) }
				</div>
			) }

			{ open && (
				<div className="nnf-fasm__email-wrapper">
					<TextControl
						label={ __( 'Label', '99forms' ) }
						required
						value={ emailData.label }
						onChange={ ( value ) =>
							setEmailData( { ...emailData, label: value } )
						}
					/>

					<TextControl
						type="email"
						label={ __( 'To', '99forms' ) }
						required
						value={ emailData.mailTo }
						onChange={ ( value ) =>
							setEmailData( { ...emailData, mailTo: value } )
						}
					/>

					<TextControl
						label={ __( 'Subject', '99forms' ) }
						required
						value={ emailData.mailSubject }
						onChange={ ( value ) =>
							setEmailData( { ...emailData, mailSubject: value } )
						}
					/>

					<BaseControl
						id="mailBody"
						label={ __( 'Body', '99forms' ) }
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
							placeholder={ __( 'Write your email…', '99forms' ) }
						/>
					</BaseControl>

					<Button variant="primary" onClick={ saveEmail }>
						{ editIndex !== null
							? __( 'Update', '99forms' )
							: __( 'Save', '99forms' ) }
					</Button>
				</div>
			) }
		</div>
	);
}
