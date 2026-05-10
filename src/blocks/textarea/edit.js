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
	const {
		id,
		fieldLabel,
		rowsCount,
		placeholder,
		defaultValue,
		required,
		maxLength,
	} = attributes;

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

							<NumberControl
								__next40pxDefaultSize
								isShiftStepEnabled={ true }
								shiftStep={ 1 }
								min={ 1 }
								label={ __( 'Number of Rows', '99forms' ) }
								value={ rowsCount }
								onChange={ ( value ) =>
									setAttributes( {
										rowsCount: value,
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
							<NumberControl
								__next40pxDefaultSize
								label={ __( 'Maximum Characters', '99forms' ) }
								value={ maxLength }
								onChange={ ( value ) =>
									setAttributes( {
										maxLength: value,
									} )
								}
							/>
						</PanelBody>
					</>
				}
			/>

			<div
				{ ...useBlockProps( {
					className: 'nnf-block nnf-textarea-block',
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

					<div className="nnf-field nnf-textarea-field">
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
