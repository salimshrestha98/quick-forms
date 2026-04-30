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
} from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import countryList from '../../country_list.json';

export default function Edit( { attributes, setAttributes, clientId } ) {
	const { id, fieldLabel, defaultValue, required } = attributes;

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
									<PanelBody
										title={ __(
											'General Settings',
											'quick-forms'
										) }
									>
										<TextControl
											__next40pxDefaultSize
											label={ __(
												'Field Label',
												'quick-forms'
											) }
											value={ fieldLabel }
											onChange={ ( value ) =>
												setAttributes( {
													fieldLabel: value,
												} )
											}
										/>

										<TextControl
											__next40pxDefaultSize
											label={ __(
												'Default Vaue',
												'quick-forms'
											) }
											value={ defaultValue }
											onChange={ ( value ) =>
												setAttributes( {
													defaultValue: value,
												} )
											}
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

			<div
				{ ...useBlockProps( {
					className: `qf-block qf-country-block`,
				} ) }
			>
				<div className="wrapper">
					<RichText
						tagName="label"
						value={ fieldLabel }
						onChange={ ( value ) =>
							setAttributes( { fieldLabel: value } )
						}
						placeholder={ __( 'Field Label', 'quick-forms' ) }
					/>
					<div className="qf-field qf-country-field">
						<select value={ defaultValue } onChange={ () => false }>
							<option value="">
								{ __( 'Select Country', 'quick-forms' ) }
							</option>
							{ Object.entries( countryList ).map(
								( [ iso2, details ] ) => (
									<option key={ iso2 } value={ iso2 }>
										{ details.name } (+{ details.telCode })
									</option>
								)
							) }
						</select>
					</div>
				</div>
			</div>
		</>
	);
}
