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
							title={ __( 'General Settings', 'quick-forms' ) }
						>
							<TextControl
								__next40pxDefaultSize
								label={ __( 'Field Label', 'quick-forms' ) }
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
										checkedByDefault: ! checkedByDefault,
									} );
								} }
							/>

							<ToggleControl
								label={ __( 'Required', 'quick-forms' ) }
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
					className: `qf-block qf-checkbox-block`,
				} ) }
			>
				<div className="wrapper">
					<div className="qf-field qf-checkbox-field">
						<input type="checkbox" onChange={ () => false } />
						<span>{ placeholder }</span>
					</div>
				</div>
			</div>
		</>
	);
}
