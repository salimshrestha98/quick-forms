import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	RichText,
} from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	TextControl,
	TabPanel,
	Dashicon,
} from '@wordpress/components';
import { useEffect } from '@wordpress/element';

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

	useEffect( () => {
		if ( ! id ) {
			setAttributes( { id: clientId.slice( 0, 8 ) } );
		}
	}, [] );

	const blockProps = useBlockProps( {
		className: `qf-block qf-file-upload-block`,
	} );

	return (
		<>
			<InspectorControls>
				<TabPanel
					className="qf-tab-panel"
					activeClass="active-tab"
					tabs={ [
						{
							name: 'settings',
							title: <Dashicon icon="admin-generic" />,
							className: 'tab-settings',
						},
						{
							name: 'styles',
							title: <Dashicon icon="admin-customizer" />,
							className: 'tab-styles',
						},
					] }
				>
					{ ( tab ) => {
						if ( tab.name === 'settings' ) {
							return (
								<>
									<PanelBody title="General Settings">
										<TextControl
											label="Field Label"
											value={ fieldLabel }
											onChange={ ( val ) =>
												setAttributes( {
													fieldLabel: val,
												} )
											}
										/>
										<TextControl
											label="Allowed File Types (accept)"
											help="e.g. .jpg,.png,.pdf"
											value={ accept }
											onChange={ ( val ) =>
												setAttributes( { accept: val } )
											}
										/>

										<ToggleControl
											label="Allow Multiple Files"
											checked={ multiple }
											onChange={ ( val ) =>
												setAttributes( {
													multiple: val,
												} )
											}
										/>
										<TextControl
											__next40pxDefaultSize
											label="Placeholder Text"
											value={ placeholder }
											onChange={ ( value ) =>
												setAttributes( {
													placeholder: value,
												} )
											}
										/>

										<ToggleControl
											label="Checked by Default"
											checked={ checkedByDefault }
											onChange={ () => {
												setAttributes( {
													checkedByDefault:
														! checkedByDefault,
												} );
											} }
										/>

										<ToggleControl
											label="Required"
											checked={ required }
											onChange={ () => {
												setAttributes( {
													required: ! required,
												} );
											} }
										/>
									</PanelBody>
								</>
							);
						}
					} }
				</TabPanel>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="wrapper">
					<RichText
						tagName="label"
						value={ fieldLabel }
						onChange={ ( value ) =>
							setAttributes( { fieldLabel: value } )
						}
						placeholder={ __( 'Field Label' ) }
					/>
					<div className="qf-field qf-file-upload-field">
						<input type="file" disabled />
						<p style={ { fontSize: '12px', opacity: 0.6 } }>
							File upload field preview (disabled in editor)
						</p>
						<span className="qf-file-upload-placeholder">
							{ placeholder }
						</span>
					</div>
				</div>
			</div>
		</>
	);
}
