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
	TextareaControl,
} from '@wordpress/components';
import { useEffect } from '@wordpress/element';

export default function Edit( {
	attributes,
	setAttributes,
	context,
	clientId,
} ) {
	const { id, fieldLabel, options, defaultValue, required } = attributes;

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

		if ( ! options ) {
			setAttributes( {
				options: `option-1 | Option 1
option-2 | Option 2`, // Do not change this.
			} );
		}
	}, [] );

	const labelStyles = {
		width: showLabel && 'inline' === labelPosition ? labelWidth : 'auto',
		display:
			showLabel && 'above' === labelPosition ? 'block' : 'inline-block',
	};

	const blockProps = useBlockProps( {
		style: {
			margin: fieldMargin
				? `${ fieldMargin.top } ${ fieldMargin.right } ${ fieldMargin.bottom } ${ fieldMargin.left }`
				: '',
		},
	} );

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

										<TextareaControl
											label="Radio Options"
											help={ `Enter the options for radio field in the pipe format:
											option-key | Option Label` }
											value={ options }
											onChange={ ( value ) =>
												setAttributes( {
													options: value,
												} )
											}
										/>

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

										<ToggleControl
											label="Required"
											checked={ required }
											onChange={ () => {
												setAttributes( {
													required: ! required,
												} );
											} }
										/>
									</PanelBody>
								</>
							);
						}
					} }
				</TabPanel>
			</InspectorControls>

			<div { ...blockProps }>
				{ showLabel && (
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
				<div
					className="qf-field qf-select-field"
					style={ { maxWidth: fieldWidth } }
				>
					<select defaultValue={ defaultValue }>
						{ optionsList.map( ( option, index ) => (
							<option
								key={ index }
								className="qf-select-item"
								value={ option.value }
							>
								{ option.label }
							</option>
						) ) }
					</select>
				</div>
			</div>
		</>
	);
}
