import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	TextControl,
	TabPanel,
	Dashicon,
	__experimentalNumberControl as NumberControl,
} from '@wordpress/components';
import { useEffect } from '@wordpress/element';

export default function Edit( { attributes, setAttributes, clientId } ) {
	const { id, fieldLabel, rowsCount, placeholder, defaultValue, required } =
		attributes;

	useEffect( () => {
		if ( ! id ) {
			setAttributes( { id: clientId.slice( 0, 8 ) } );
		}
	}, [] );

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
											__next40pxDefaultSize
											label="Field Label"
											value={ fieldLabel }
											onChange={ ( value ) =>
												setAttributes( {
													fieldLabel: value,
												} )
											}
										/>

										<NumberControl
											__next40pxDefaultSize
											isShiftStepEnabled={ true }
											shiftStep={ 1 }
											min={ 1 }
											label="Number of Rows"
											value={ rowsCount }
											onChange={ ( value ) =>
												setAttributes( {
													rowsCount: value,
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

										<TextControl
											__next40pxDefaultSize
											label="Default Vaue"
											value={ defaultValue }
											onChange={ ( value ) =>
												setAttributes( {
													defaultValue: value,
												} )
											}
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

			<div
				{ ...useBlockProps( {
					className: 'qf-block qf-textarea-block',
				} ) }
			>
				<div className="wrapper">
					<RichText
						tagName="label"
						value={ fieldLabel }
						onChange={ ( value ) =>
							setAttributes( { fieldLabel: value } )
						}
						placeholder={ __( 'Field Label' ) }
					/>

					<div className="qf-field qf-textarea-field">
						<textarea
							placeholder={ placeholder }
							value={ defaultValue }
							rows={ rowsCount }
							onChange={ () => false }
						></textarea>
					</div>
				</div>
			</div>
		</>
	);
}
