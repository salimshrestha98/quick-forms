import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	TextControl,
	TextareaControl,
} from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import { useBlockId } from '../hooks/useBlockId';
import BlockInspectorTabs from '../components/BlockInspectorTabs';

export default function Edit( { attributes, setAttributes, clientId } ) {
	const { id, fieldLabel, options, defaultValue, required } = attributes;

	useBlockId( id, clientId, setAttributes );

	useEffect( () => {
		if ( ! options ) {
			setAttributes( {
				options: `option-1 | Option 1
option-2 | Option 2`, // Do not change this.
			} );
		}
	}, [] );

	function getOptions() {
		if ( ! options ) {
			return [];
		}

		return options
			.split( '\n' )
			.map( ( line ) => line.trim() )
			.filter( Boolean )
			.map( ( line ) => {
				const [ value, label ] = line
					.split( '|' )
					.map( ( s ) => s.trim() );

				if ( ! value || ! label ) {
					return null;
				}

				return { value, label };
			} )
			.filter( Boolean );
	}

	const optionsList = getOptions();

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

							<TextareaControl
								label={ __( 'Select Options', '99forms' ) }
								help={ __(
									'Enter the options for select field in the pipe format: option-key | Option Label',
									'99forms'
								) }
								value={ options }
								onChange={ ( value ) =>
									setAttributes( {
										options: value,
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
					className: 'nnf-block nnf-select-block',
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
					<div className="nnf-field nnf-select-field">
						<select
							defaultValue={ defaultValue }
							onChange={ () => false }
						>
							{ optionsList.map( ( option, index ) => (
								<option
									key={ index }
									className="nnf-select-item"
									value={ option.value }
								>
									{ option.label }
								</option>
							) ) }
						</select>
					</div>
				</div>
			</div>
		</>
	);
}
