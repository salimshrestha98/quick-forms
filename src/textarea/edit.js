import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	TextControl,
	__experimentalNumberControl as NumberControl,
} from '@wordpress/components';
import { useBlockId } from '../hooks/useBlockId';
import BlockInspectorTabs from '../components/BlockInspectorTabs';

export default function Edit( { attributes, setAttributes, clientId } ) {
	const { id, fieldLabel, rowsCount, placeholder, defaultValue, required } =
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

							<NumberControl
								__next40pxDefaultSize
								isShiftStepEnabled={ true }
								shiftStep={ 1 }
								min={ 1 }
								label={ __( 'Number of Rows', 'quick-forms' ) }
								value={ rowsCount }
								onChange={ ( value ) =>
									setAttributes( {
										rowsCount: value,
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

							<TextControl
								__next40pxDefaultSize
								label={ __( 'Default Vaue', 'quick-forms' ) }
								value={ defaultValue }
								onChange={ ( value ) =>
									setAttributes( {
										defaultValue: value,
									} )
								}
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
						placeholder={ __( 'Field Label', 'quick-forms' ) }
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
