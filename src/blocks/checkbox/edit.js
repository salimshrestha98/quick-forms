import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { PanelBody, ToggleControl, TextControl } from '@wordpress/components';
import BlockInspectorTabs from '../components/BlockInspectorTabs';
import { useBlockId } from '../hooks/useBlockId';

export default function Edit( { attributes, setAttributes, clientId } ) {
	const { id, fieldLabel, placeholder, required, checkedByDefault } =
		attributes;

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

			<div
				{ ...useBlockProps( {
					className: `nnf-block nnf-checkbox-block`,
				} ) }
			>
				<div className="wrapper">
					<div className="nnf-field nnf-checkbox-field">
						<input type="checkbox" onChange={ () => false } />
						<span>{ placeholder }</span>
					</div>
				</div>
			</div>
		</>
	);
}
