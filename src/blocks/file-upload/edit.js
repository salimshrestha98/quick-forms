import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { PanelBody, ToggleControl, TextControl } from '@wordpress/components';
import BlockInspectorTabs from '../components/BlockInspectorTabs';
import { useBlockId } from '../hooks/useBlockId';

export default function Edit( { attributes, setAttributes, clientId } ) {
	const {
		id,
		fieldLabel,
		placeholder,
		required,
		checkedByDefault,
		accept,
		multiple,
	} = attributes;

	useBlockId( id, clientId, setAttributes );

	const blockProps = useBlockProps( {
		className: `nnf-block nnf-file-upload-block`,
	} );

	return (
		<>
			<BlockInspectorTabs
				settingsTab={
					<>
						<PanelBody
							title={ __( 'General Settings', '99forms' ) }
						>
							<TextControl
								label={ __( 'Field Label', '99forms' ) }
								value={ fieldLabel }
								onChange={ ( val ) =>
									setAttributes( {
										fieldLabel: val,
									} )
								}
							/>
							<TextControl
								label={ __(
									'Allowed File Types (accept)',
									'99forms'
								) }
								help={ __( 'e.g. .jpg,.png,.pdf', '99forms' ) }
								value={ accept }
								onChange={ ( val ) =>
									setAttributes( { accept: val } )
								}
							/>

							<ToggleControl
								label={ __(
									'Allow Multiple Files',
									'99forms'
								) }
								checked={ multiple }
								onChange={ ( val ) =>
									setAttributes( {
										multiple: val,
									} )
								}
							/>
							<TextControl
								__next40pxDefaultSize
								label={ __( 'Placeholder Text', '99forms' ) }
								value={ placeholder }
								onChange={ ( value ) =>
									setAttributes( {
										placeholder: value,
									} )
								}
							/>

							<ToggleControl
								label={ __( 'Checked by Default', '99forms' ) }
								checked={ checkedByDefault }
								onChange={ () => {
									setAttributes( {
										checkedByDefault: ! checkedByDefault,
									} );
								} }
							/>
						</PanelBody>
						<PanelBody
							title={ __( 'Validation', '99forms' ) }
							initialOpen={ false }
						>
							<ToggleControl
								label={ __( 'Required', '99forms' ) }
								checked={ required }
								onChange={ () => {
									setAttributes( {
										required: ! required,
									} );
								} }
							/>
						</PanelBody>
					</>
				}
			/>

			<div { ...blockProps }>
				<div className="wrapper">
					<RichText
						tagName="label"
						value={ fieldLabel }
						onChange={ ( value ) =>
							setAttributes( { fieldLabel: value } )
						}
						placeholder={ __( 'Field Label', '99forms' ) }
					/>
					<div className="nnf-field nnf-file-upload-field">
						<input type="file" disabled />
						<p style={ { fontSize: '12px', opacity: 0.6 } }>
							{ __(
								'File upload field preview (disabled in editor)',
								'99forms'
							) }
						</p>
						<span className="nnf-file-upload-placeholder">
							{ placeholder }
						</span>
					</div>
				</div>
			</div>
		</>
	);
}
