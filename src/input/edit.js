import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	TextControl,
	SelectControl,
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
		minimum,
		maximum,
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
							title={ __( 'General Settings', 'quick-forms' ) }
						>
							<DisabledInputControl
								label={ __( 'Field ID', 'quick-forms' ) }
								value={ id }
							/>

							<SelectControl
								label={ __( 'Input Type', 'quick-forms' ) }
								value={ inputType }
								options={ [
									{
										label: __( 'Text', 'quick-forms' ),
										value: 'text',
									},
									{
										label: __( 'Email', 'quick-forms' ),
										value: 'email',
									},
									{
										label: __( 'Number', 'quick-forms' ),
										value: 'number',
									},
									{
										label: __( 'URL', 'quick-forms' ),
										value: 'url',
									},
									{
										label: __(
											'Phone Number',
											'quick-forms'
										),
										value: 'tel',
									},
									{
										label: __( 'Password', 'quick-forms' ),
										value: 'password',
									},
									{
										label: __( 'Hidden', 'quick-forms' ),
										value: 'hidden',
									},
									{
										label: __( 'Search', 'quick-forms' ),
										value: 'search',
									},
									{
										label: __( 'Color', 'quick-forms' ),
										value: 'color',
									},
									{
										label: __( 'Range', 'quick-forms' ),
										value: 'range',
									},
									{
										label: __( 'Date', 'quick-forms' ),
										value: 'date',
									},
									{
										label: __( 'Time', 'quick-forms' ),
										value: 'time',
									},
									{
										label: __(
											'DateTime Local',
											'quick-forms'
										),
										value: 'datetime-local',
									},
									{
										label: __( 'Month', 'quick-forms' ),
										value: 'month',
									},
									{
										label: __( 'Week', 'quick-forms' ),
										value: 'week',
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
								label={ __( 'Field Label', 'quick-forms' ) }
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
										'quick-forms'
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
								label={ __( 'Default Value', 'quick-forms' ) }
								value={ defaultValue }
								onChange={ ( value ) =>
									setAttributes( {
										defaultValue: value,
									} )
								}
							/>

							{ ! isHidden() && (
								<ToggleControl
									label={ __( 'Required', 'quick-forms' ) }
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
									<TextControl
										__next40pxDefaultSize
										label={ __( 'Minimum', 'quick-forms' ) }
										value={ minimum }
										onChange={ ( value ) =>
											setAttributes( {
												minimum: value,
											} )
										}
									/>
									<TextControl
										__next40pxDefaultSize
										label={ __( 'Maximum', 'quick-forms' ) }
										value={ maximum }
										onChange={ ( value ) =>
											setAttributes( {
												maximum: value,
											} )
										}
									/>
								</>
							) }
						</PanelBody>
					</>
				}
			/>

			<div
				{ ...useBlockProps( {
					className: `qf-block qf-input-block qf-input-${ inputType }`,
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

					<div className="qf-field qf-input-field">
						{ 'hidden' === inputType && (
							<p className="qf-hidden-field-placeholder">
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
