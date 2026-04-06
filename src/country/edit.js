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
} from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import countryList from '../../country_list.json';

export default function Edit( {
	attributes,
	setAttributes,
	context,
	clientId,
} ) {
	const { id, fieldLabel, defaultValue, required } = attributes;

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

	const blockProps = useBlockProps( {
		style: {
			margin: fieldMargin
				? `${ fieldMargin.top } ${ fieldMargin.right } ${ fieldMargin.bottom } ${ fieldMargin.left }`
				: '',
		},
	} );

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
					className="qf-field qf-country-field"
					style={ { maxWidth: fieldWidth } }
				>
					<select value={ defaultValue } onChange={ () => false }>
						<option value="">Select Country</option>
						{ Object.entries( countryList ).map(
							( [ iso2, details ] ) => (
								<option key={ iso2 } value={ iso2 }>
									{ details.name } (+{ details.telCode })
								</option>
							)
						) }
					</select>
				</div>
			</div>
		</>
	);
}
