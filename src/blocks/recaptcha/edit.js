import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { useBlockId } from '../hooks/useBlockId';

export default function Edit( { attributes, setAttributes, clientId } ) {
	const { id } = attributes;

	useBlockId( id, clientId, setAttributes );

	return (
		<>
			<div
				{ ...useBlockProps( {
					className: 'nnf-block nnf-recaptcha-block',
				} ) }
			>
				<div className="wrapper">
					<div className="nnf-field nnf-recaptcha-field">
						<span className="nnf-recaptcha-placeholder">
							{ __(
								'reCaptcha is not visible in the edior. Preview the page to view it.',
								'99forms'
							) }
						</span>
					</div>
				</div>
			</div>
		</>
	);
}
