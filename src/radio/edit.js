import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	TextControl,
	TextareaControl,
	SelectControl,
} from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import BlockInspectorTabs from '../components/BlockInspectorTabs';
import { useBlockId } from '../hooks/useBlockId';

export default function Edit( {
	attributes,
	setAttributes,
	context,
	clientId,
} ) {
	const { id, fieldLabel, options, optionsLayout, defaultValue, required } =
		attributes;

	const { 'quick-form/fieldWidth': fieldWidth } = context;

	useBlockId( id, clientId, setAttributes );

	useEffect( () => {
		if ( ! options ) {
			setAttributes( {
				options: `option-1 | Option 1
option-2 | Option 2`, // Do not change this.
			} );
		}
	}, [] );

	const radioStyles = {
		display: optionsLayout,
	};

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

							<TextareaControl
								label={ __( 'Radio Options', 'quick-forms' ) }
								help={ __(
									'Enter the options for radio field in the pipe format: option-key | Option Label',
									'quick-forms'
								) }
								value={ options }
								onChange={ ( value ) =>
									setAttributes( {
										options: value,
									} )
								}
							/>

							<SelectControl
								label={ __( 'Options Layout', 'quick-forms' ) }
								value={ optionsLayout }
								options={ [
									{
										label: __(
											'Horizontal',
											'quick-forms'
										),
										value: 'inline',
									},
									{
										label: __( 'Vertical', 'quick-forms' ),
										value: 'block',
									},
								] }
								onChange={ ( value ) =>
									setAttributes( {
										optionsLayout: value,
									} )
								}
								__next40pxDefaultSize
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
				{ ...useBlockProps( { className: `qf-block qf-radio-block` } ) }
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
					<div
						className="qf-field qf-radio-field"
						style={ { maxWidth: fieldWidth } }
					>
						{ optionsList.map( ( option, index ) => (
							<div
								key={ index }
								className="qf-radio-item"
								style={ radioStyles }
							>
								<input
									type="radio"
									name={ fieldLabel }
									value={ option.value }
									defaultChecked={
										option.value === defaultValue
									}
								/>
								{ option.label }
							</div>
						) ) }
					</div>
				</div>
			</div>
		</>
	);
}
