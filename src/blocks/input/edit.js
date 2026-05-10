import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	TextControl,
	SelectControl,
	__experimentalNumberControl as NumberControl,
} from '@wordpress/components';
import DisabledInputControl from '../components/DisabledInputControl';
import { INPUT_TYPE_HELP } from './constants';
import { useBlockId } from '../hooks/useBlockId';
import BlockInspectorTabs from '../components/BlockInspectorTabs';

export default function Edit( { attributes, setAttributes, clientId } ) {
	const {
		id,
		inputType,
		fieldLabel,
		placeholder,
		defaultValue,
		required,
		minValue,
		maxValue,
		maxLength,
	} = attributes;

	useBlockId( id, clientId, setAttributes );

	function isHidden() {
		return 'hidden' === inputType;
	}

	function needMinMax() {
		const fieldTypesWithMinMax = [ 'number', 'range' ];

		return fieldTypesWithMinMax.includes( inputType );
	}

	return (
		<>
			<BlockInspectorTabs
				settingsTab={
					<>
						<PanelBody
							title={ __( 'General Settings', '99forms' ) }
						>
							<DisabledInputControl
								label={ __( 'Field ID', '99forms' ) }
								value={ id }
							/>

							<SelectControl
								label={ __( 'Input Type', '99forms' ) }
								value={ inputType }
								options={ [
									{
										label: __( 'Text', '99forms' ),
										value: 'text',
									},
									{
										label: __( 'Email', '99forms' ),
										value: 'email',
									},
									{
										label: __( 'Number', '99forms' ),
										value: 'number',
									},
									{
										label: __( 'URL', '99forms' ),
										value: 'url',
									},
									{
										label: __( 'Password', '99forms' ),
										value: 'password',
									},
									{
										label: __( 'Hidden', '99forms' ),
										value: 'hidden',
									},
									{
										label: __( 'Phone Number', '99forms' ),
										value: 'tel',
									},
									{
										label: __( 'Color', '99forms' ),
										value: 'color',
									},
									{
										label: __( 'Range', '99forms' ),
										value: 'range',
									},
									{
										label: __( 'Date', '99forms' ),
										value: 'date',
									},
									{
										label: __( 'Time', '99forms' ),
										value: 'time',
									},
								] }
								help={ INPUT_TYPE_HELP[ inputType ] || '' }
								onChange={ ( value ) =>
									setAttributes( {
										inputType: value,
									} )
								}
								__next40pxDefaultSize
							/>
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

							{ ! isHidden() && (
								<TextControl
									__next40pxDefaultSize
									label={ __(
										'Placeholder Text',
										'99forms'
									) }
									value={ placeholder }
									onChange={ ( value ) =>
										setAttributes( {
											placeholder: value,
										} )
									}
								/>
							) }

							<TextControl
								__next40pxDefaultSize
								label={ __( 'Default Value', '99forms' ) }
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
							{ ! isHidden() && (
								<ToggleControl
									label={ __( 'Required', '99forms' ) }
									checked={ required }
									onChange={ () => {
										setAttributes( {
											required: ! required,
										} );
									} }
								/>
							) }

							{ needMinMax() && (
								<>
									<NumberControl
										__next40pxDefaultSize
										label={ __(
											'Minimum Value',
											'99forms'
										) }
										value={ minValue }
										onChange={ ( value ) =>
											setAttributes( {
												minValue: value,
											} )
										}
									/>
									<NumberControl
										__next40pxDefaultSize
										label={ __(
											'Maximum Value',
											'99forms'
										) }
										value={ maxValue }
										onChange={ ( value ) =>
											setAttributes( {
												maxValue: value,
											} )
										}
									/>
								</>
							) }
							{ [
								'text',
								'email',
								'url',
								'password',
								'tel',
							].includes( inputType ) && (
								<NumberControl
									__next40pxDefaultSize
									label={ __(
										'Maximum Characters',
										'99forms'
									) }
									value={ maxLength }
									onChange={ ( value ) =>
										setAttributes( {
											maxLength: value,
										} )
									}
								/>
							) }
						</PanelBody>
					</>
				}
			/>

			<div
				{ ...useBlockProps( {
					className: `nnf-block nnf-input-block nnf-input-${ inputType }`,
				} ) }
			>
				<div className="wrapper">
					{ 'hidden' !== inputType && (
						<RichText
							tagName="label"
							value={ fieldLabel }
							onChange={ ( value ) =>
								setAttributes( { fieldLabel: value } )
							}
							placeholder={ __( 'Field Label' ) }
						/>
					) }

					<div className="nnf-field nnf-input-field">
						{ 'hidden' === inputType && (
							<p className="nnf-hidden-field-placeholder">
								This is a hidden field and will not be visible
								to users.
							</p>
						) }

						<input
							type={ inputType }
							placeholder={ placeholder }
							value={ defaultValue }
							onChange={ () => false }
						/>
					</div>
				</div>
			</div>
		</>
	);
}
