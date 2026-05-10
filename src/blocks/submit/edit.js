import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	SelectControl,
	BoxControl,
	ColorPicker,
	__experimentalUnitControl as UnitControl,
} from '@wordpress/components';
import { useBlockId } from '../hooks/useBlockId';
import BlockInspectorTabs from '../components/BlockInspectorTabs';

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

	useBlockId( id, clientId, setAttributes );

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
			<BlockInspectorTabs
				settingsTab={
					<>
						<PanelBody title={ __( 'Field Settings', '99forms' ) }>
							<TextControl
								__next40pxDefaultSize
								label={ __( 'Button Text', '99forms' ) }
								value={ buttonText }
								onChange={ ( value ) =>
									setAttributes( {
										buttonText: value,
									} )
								}
							/>

							<SelectControl
								label={ __( 'Button Width', '99forms' ) }
								value={ buttonWidthType }
								options={ [
									{
										label: __( 'Auto', '99forms' ),
										value: 'auto',
									},
									{
										label: __( 'Custom', '99forms' ),
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
				}
				stylesTab={
					<>
						<PanelBody
							title={ __( 'Color Settings', '99forms' ) }
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
							title={ __( 'Spacing Settings', '99forms' ) }
							initialOpen={ false }
						>
							<BoxControl
								__next40pxDefaultSize
								label={ __( 'Padding', '99forms' ) }
								values={ padding }
								onChange={ ( val ) =>
									setAttributes( {
										padding: val,
									} )
								}
							/>
						</PanelBody>
					</>
				}
			/>

			<div
				{ ...useBlockProps( {
					className: 'nnf-block nnf-submit-button',
				} ) }
			>
				<div className="wrapper">
					<div className="nnf-field nnf-submit-field">
						<button style={ buttonStyles } onClick={ () => null }>
							<RichText
								tagName="span"
								value={ buttonText }
								onChange={ ( value ) =>
									setAttributes( { buttonText: value } )
								}
								placeholder={ __(
									'Enter Button Text Here',
									'99forms'
								) }
							/>
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
