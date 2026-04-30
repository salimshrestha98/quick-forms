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
									<PanelBody
										title={ __(
											'General Settings',
											'quick-forms'
										) }
									>
										<TextControl
											label={ __(
												'Field Label',
												'quick-forms'
											) }
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
												'quick-forms'
											) }
											help={ __(
												'e.g. .jpg,.png,.pdf',
												'quick-forms'
											) }
											value={ accept }
											onChange={ ( val ) =>
												setAttributes( { accept: val } )
											}
										/>

										<ToggleControl
											label={ __(
												'Allow Multiple Files',
												'quick-forms'
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
											label={ __(
												'Placeholder Text',
												'quick-forms'
											) }
											value={ placeholder }
											onChange={ ( value ) =>
												setAttributes( {
													placeholder: value,
												} )
											}
										/>

										<ToggleControl
											label={ __(
												'Checked by Default',
												'quick-forms'
											) }
											checked={ checkedByDefault }
											onChange={ () => {
												setAttributes( {
													checkedByDefault:
														! checkedByDefault,
												} );
											} }
										/>

										<ToggleControl
											label={ __(
												'Required',
												'quick-forms'
											) }
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
						placeholder={ __( 'Field Label', 'quick-forms' ) }
					/>
					<div className="qf-field qf-file-upload-field">
						<input type="file" disabled />
						<p style={ { fontSize: '12px', opacity: 0.6 } }>
							{ __(
								'File upload field preview (disabled in editor)',
								'quick-forms'
							) }
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
