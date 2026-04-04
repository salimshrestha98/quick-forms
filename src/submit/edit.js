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
	__experimentalUnitControl as UnitControl,
} from '@wordpress/components';
import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const { buttonText, buttonWidthType, buttonWidth, margin, padding } =
		attributes;

	const buttonStyles = {
		margin: `${ margin.top } ${ margin.right } ${ margin.bottom } ${ margin.left }`,
		padding: `${ padding.top } ${ padding.right } ${ padding.bottom } ${ padding.left }`,
	};

	if ( 'custom' === buttonWidthType ) {
		buttonStyles.width = buttonWidth;
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
											label="Button Width Type"
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
										title="Spacing Settings"
										initialOpen={ false }
									>
										<BoxControl
											__next40pxDefaultSize
											label="Margin"
											values={ margin }
											onChange={ ( val ) =>
												setAttributes( { margin: val } )
											}
										/>
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

			<div { ...useBlockProps() }>
				<button type="submit" style={ buttonStyles }>
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
		</>
	);
}
