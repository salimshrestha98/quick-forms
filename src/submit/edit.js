import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	TabPanel,
	Dashicon,
	SelectControl,
	BoxControl,
	ColorPicker,
	__experimentalUnitControl as UnitControl,
} from '@wordpress/components';
import { useEffect } from '@wordpress/element';

export default function Edit( { attributes, setAttributes, clientId } ) {
	const {
		id,
		buttonText,
		buttonWidthType,
		buttonWidth,
		textColor,
		bgColor,
		padding,
	} = attributes;

	useEffect( () => {
		if ( ! id ) {
			setAttributes( { id: clientId.slice( 0, 8 ) } );
		}
	}, [] );

	const buttonStyles = {
		padding: `${ padding.top } ${ padding.right } ${ padding.bottom } ${ padding.left }`,
	};

	if ( 'custom' === buttonWidthType ) {
		buttonStyles.width = buttonWidth;
	}

	if ( textColor ) {
		buttonStyles.color = textColor;
	}

	if ( bgColor ) {
		buttonStyles.background = bgColor;
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
									<PanelBody title="Field Settings">
										<TextControl
											__next40pxDefaultSize
											label="Button Text"
											value={ buttonText }
											onChange={ ( value ) =>
												setAttributes( {
													buttonText: value,
												} )
											}
										/>

										<SelectControl
											label="Button Width"
											value={ buttonWidthType }
											options={ [
												{
													label: 'Auto',
													value: 'auto',
												},
												{
													label: 'Custom',
													value: 'custom',
												},
											] }
											onChange={ ( value ) =>
												setAttributes( {
													buttonWidthType: value,
												} )
											}
											__next40pxDefaultSize
										/>

										{ 'custom' === buttonWidthType && (
											<UnitControl
												__next40pxDefaultSize
												onChange={ ( value ) =>
													setAttributes( {
														buttonWidth: value,
													} )
												}
												value={ buttonWidth }
											/>
										) }
									</PanelBody>
								</>
							);
						}

						if ( tab.name === 'styles' ) {
							return (
								<>
									<PanelBody
										title="Color Settings"
										initialOpen={ false }
									>
										<ColorPicker
											color={ textColor }
											onChange={ ( value ) =>
												setAttributes( {
													textColor: value,
												} )
											}
										/>
										<ColorPicker
											color={ bgColor }
											onChange={ ( value ) =>
												setAttributes( {
													bgColor: value,
												} )
											}
										/>
									</PanelBody>
									<PanelBody
										title="Spacing Settings"
										initialOpen={ false }
									>
										<BoxControl
											__next40pxDefaultSize
											label="Padding"
											values={ padding }
											onChange={ ( val ) =>
												setAttributes( {
													padding: val,
												} )
											}
										/>
									</PanelBody>
								</>
							);
						}
					} }
				</TabPanel>
			</InspectorControls>

			<div
				{ ...useBlockProps( {
					className: 'qf-block qf-submit-button',
				} ) }
			>
				<div className="wrapper">
					<div className="qf-field qf-submit-field">
						<button style={ buttonStyles } onClick={ () => null }>
							<RichText
								tagName="span"
								value={ buttonText }
								onChange={ ( value ) =>
									setAttributes( { buttonText: value } )
								}
								placeholder={ __( 'Enter Button Text Here' ) }
							/>
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
