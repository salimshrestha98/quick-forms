import { useState } from '@wordpress/element';
import { BaseControl, Button } from '@wordpress/components';

export default function DisabledInputControl( { label = '', value = '' } ) {
	const [ copied, setCopied ] = useState( false );

	const handleCopy = async () => {
		if ( ! value ) {
			return;
		}

		try {
			await window.navigator.clipboard.writeText( `{{${ value }}}` );
			setCopied( true );

			setTimeout( () => {
				setCopied( false );
			}, 1200 );
		} catch ( err ) {
			console.log( err );
		}
	};

	return (
		<BaseControl id={ value } label={ label } className="qf-copy-id-field">
			<div className="qf-copy-id-wrapper">
				<div className="qf-copy-id-value">{ `{{${ value }}}` }</div>

				<Button
					icon="admin-page"
					label="Copy ID"
					onClick={ handleCopy }
					className="qf-copy-id-button"
					isSmall
				/>

				{ copied && <span className="qf-copy-feedback">Copied</span> }
			</div>
		</BaseControl>
	);
}
