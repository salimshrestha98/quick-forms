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
	SelectControl,
	__experimentalUnitControl as UnitControl,
} from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import { useDebounce } from '@wordpress/compose';
import './editor.scss';

export default function Edit( {
	attributes,
	setAttributes,
	context,
	clientId,
} ) {
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

	const {
		'quick-form/showLabel': showLabel,
		'quick-form/labelPosition': labelPosition,
		'quick-form/labelWidth': labelWidth,
		'quick-form/fieldWidth': fieldWidth,
		'quick-form/fieldMargin': fieldMargin,
	} = context;

	useEffect( () => {
		if ( ! id ) {
			setAttributes( { id: clientId.slice( 0, 8 ) } );
		}
	}, [] );

	const labelStyles = {
		width: showLabel && 'inline' === labelPosition ? labelWidth : 'auto',
		display:
			showLabel && 'above' === labelPosition ? 'block' : 'inline-block',
	};
	const inputStyles = {
		display:
			showLabel && 'above' === labelPosition ? 'block' : 'inline-block',
		width: fieldWidth,
	};

	const blockProps = useBlockProps( {
		style: {
			margin: fieldMargin
				? `${ fieldMargin.top } ${ fieldMargin.right } ${ fieldMargin.bottom } ${ fieldMargin.left }`
				: '',
		},
	} );

	function isHidden() {
		return 'hidden' === inputType;
	}

	function needMinMax() {
		const fieldTypesWithMinMax = [ 'number', 'range' ];

		return fieldTypesWithMinMax.includes( inputType );
	}

	function getInputTypeHelp() {
		const helpMap = {
			text: 'Single-line text input, used for names, titles, etc.',
			email: 'Email input; validates email addresses automatically.',
			number: 'Number input; allows only numeric values.',
			url: 'URL input; expects a valid web address.',
			tel: 'Telephone input; for phone numbers, may trigger numeric keypad on mobile.',
			password: 'Password input; hides characters for secure entry.',
			hidden: 'Hidden field; not visible to users, used to store data silently.',
			search: 'Search input; styled for search queries, may trigger search-related behavior.',
			color: 'Color picker; allows selection of a color value.',
			range: 'Slider input for numeric ranges; allows selection between min and max.',
			date: 'Date picker; selects a date (year, month, day).',
			time: 'Time picker; selects a time (hours, minutes, seconds optional).',
			'datetime-local':
				'Select date and time in local format (no timezone).',
			month: 'Select a month and year.',
			week: 'Select a week and year (ISO-8601 format).',
		};

		if ( ! ( inputType in helpMap ) ) {
			return '';
		}

		return helpMap[ inputType ];
	}

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
									<PanelBody title="General Settings">
										<SelectControl
											label="Input Type"
											value={ inputType }
											options={ [
												{
													label: 'Text',
													value: 'text',
												},
												{
													label: 'Email',
													value: 'email',
												},
												{
													label: 'Number',
													value: 'number',
												},
												{
													label: 'URL',
													value: 'url',
												},
												{
													label: 'Phone Number',
													value: 'tel',
												},
												{
													label: 'Password',
													value: 'password',
												},
												{
													label: 'Hidden',
													value: 'hidden',
												},
												{
													label: 'Search',
													value: 'search',
												},
												{
													label: 'Color',
													value: 'color',
												},
												{
													label: 'Range',
													value: 'range',
												},
												{
													label: 'Date',
													value: 'date',
												},
												{
													label: 'Time',
													value: 'time',
												},
												{
													label: 'DateTime Local',
													value: 'datetime-local',
												},
												{
													label: 'Month',
													value: 'month',
												},
												{
													label: 'Week',
													value: 'week',
												},
											] }
											help={ getInputTypeHelp() }
											onChange={ ( value ) =>
												setAttributes( {
													inputType: value,
												} )
											}
											__next40pxDefaultSize
										/>
										<TextControl
											__next40pxDefaultSize
											label="Field Label"
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
												label="Placeholder Text"
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
											label="Default Vaue"
											value={ defaultValue }
											onChange={ ( value ) =>
												setAttributes( {
													defaultValue: value,
												} )
											}
										/>

										{ ! isHidden() && (
											<ToggleControl
												label="Required"
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
													label="Minimum"
													value={ minimum }
													onChange={ ( value ) =>
														setAttributes( {
															minimum: value,
														} )
													}
												/>
												<TextControl
													__next40pxDefaultSize
													label="Maximum"
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
							);
						}
					} }
				</TabPanel>
			</InspectorControls>

			<div { ...blockProps }>
				{ showLabel && 'hidden' !== inputType && (
					<RichText
						tagName="label"
						value={ fieldLabel }
						onChange={ ( value ) =>
							setAttributes( { fieldLabel: value } )
						}
						placeholder={ __( 'Field Label' ) }
						style={ labelStyles }
					/>
				) }

				<div className="qf-field qf-input-field">
					{ 'hidden' === inputType && (
						<p className="qf-hidden-field-placeholder">
							This is a hidden field and will not be visible to
							users.
						</p>
					) }

					<input
						type={ inputType }
						placeholder={ placeholder }
						value={ defaultValue }
						style={ inputStyles }
						onChange={ () => false }
					/>
				</div>
			</div>
		</>
	);
}
