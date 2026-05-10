import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { PanelBody, ToggleControl, TextControl } from '@wordpress/components';
import countryList from '../../../country_list.json';
import { useBlockId } from '../hooks/useBlockId';
import BlockInspectorTabs from '../components/BlockInspectorTabs';

export default function Edit( { attributes, setAttributes, clientId } ) {
	const { id, fieldLabel, defaultValue, required } = attributes;

	useBlockId( id, clientId, setAttributes );

	return (
		<>
			<BlockInspectorTabs
				settingsTab={
					<>
						<PanelBody
							title={ __( 'General Settings', '99forms' ) }
						>
							<TextControl
								__next40pxDefaultSize
								label={ __( 'Field Label', '99forms' ) }
								value={ fieldLabel }
								onChange={ ( value ) =>
									setAttributes( {
										fieldLabel: value,
									} )
								}
							/>

							<TextControl
								__next40pxDefaultSize
								label={ __( 'Default Vaue', '99forms' ) }
								value={ defaultValue }
								onChange={ ( value ) =>
									setAttributes( {
										defaultValue: value,
									} )
								}
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

			<div
				{ ...useBlockProps( {
					className: `nnf-block nnf-country-block`,
				} ) }
			>
				<div className="wrapper">
					<RichText
						tagName="label"
						value={ fieldLabel }
						onChange={ ( value ) =>
							setAttributes( { fieldLabel: value } )
						}
						placeholder={ __( 'Field Label', '99forms' ) }
					/>
					<div className="nnf-field nnf-country-field">
						<select value={ defaultValue } onChange={ () => false }>
							<option value="">
								{ __( 'Select Country', '99forms' ) }
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
