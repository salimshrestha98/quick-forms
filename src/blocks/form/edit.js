import { __ } from '@wordpress/i18n';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { generateStyles } from '../hooks/styleGenerator';
import {
	PanelBody,
	ToggleControl,
	RadioControl,
	TextControl,
	__experimentalUnitControl as UnitControl,
	BoxControl,
} from '@wordpress/components';
import './editor.scss';
import BlockInspectorTabs from '../components/BlockInspectorTabs';
import { useBlockId } from '../hooks/useBlockId';

export default function Edit( { attributes, setAttributes, clientId } ) {
	const {
		id,
		formName,
		fieldMargin,
		margin,
		padding,
		fieldWidth,
		showLabel,
		labelPosition,
		labelWidth,
		messages,
	} = attributes;

	const TEMPLATE = [
		[ 'nnforms/input', { inputType: 'text', fieldLabel: 'Your Name' } ],
		[ 'nnforms/input', { inputType: 'email', fieldLabel: 'Your Email' } ],
		[ 'nnforms/textarea', { fieldLabel: 'Your Message' } ],
		[ 'nnforms/submit', { lock: { move: false, remove: true } } ],
	];

	useBlockId( id, clientId, setAttributes );

	const css = generateStyles( attributes, clientId );
	const blockProps = useBlockProps( {
		className: `nnf-block nnf-form-block`,
	} );

	return (
		<>
			<BlockInspectorTabs
				settingsTab={
					<>
						<PanelBody
							title={ __( 'General Settings', '99forms' ) }
							initialOpen={ false }
						>
							<TextControl
								__next40pxDefaultSize
								label={ __( 'Form Name', '99forms' ) }
								placeholder={ __( 'Form Name', '99forms' ) }
								value={ formName }
								onChange={ ( value ) =>
									setAttributes( {
										formName: value,
									} )
								}
							/>
						</PanelBody>
						<PanelBody
							title={ __( 'Field Settings', '99forms' ) }
							initialOpen={ false }
						>
							<ToggleControl
								label={ __( 'Show Label', '99forms' ) }
								checked={ showLabel }
								onChange={ ( val ) => {
									setAttributes( {
										showLabel: val,
									} );
								} }
							/>

							{ showLabel && (
								<RadioControl
									label={ __( 'Label Position', '99forms' ) }
									selected={ labelPosition }
									options={ [
										{
											label: __( 'Inline', '99forms' ),
											value: 'inline',
										},
										{
											label: __( 'Above', '99forms' ),
											value: 'above',
										},
									] }
									onChange={ ( value ) =>
										setAttributes( {
											labelPosition: value,
										} )
									}
								/>
							) }

							{ showLabel && 'inline' === labelPosition && (
								<UnitControl
									__next40pxDefaultSize
									label={ __( 'Label Width', '99forms' ) }
									onChange={ ( value ) =>
										setAttributes( {
											labelWidth: value,
										} )
									}
									value={ labelWidth }
								/>
							) }
							<UnitControl
								__next40pxDefaultSize
								label={ __( 'Field Width', '99forms' ) }
								onChange={ ( value ) =>
									setAttributes( {
										fieldWidth: value,
									} )
								}
								value={ fieldWidth }
							/>
							<BoxControl
								__next40pxDefaultSize
								label={ __( 'Field Margin', '99forms' ) }
								resetValues={ {
									top: '20px',
									right: '0px',
									bottom: '0px',
									left: '0px',
								} }
								values={ fieldMargin }
								onChange={ ( val ) =>
									setAttributes( {
										fieldMargin: val,
									} )
								}
							/>
						</PanelBody>
					</>
				}
				stylesTab={
					<>
						<PanelBody
							title={ __( 'Spacing Settings', '99forms' ) }
							initialOpen={ false }
						>
							<BoxControl
								__next40pxDefaultSize
								__nextHasNoMarginBottom
								label={ __( 'Margin', '99forms' ) }
								values={ margin }
								onChange={ ( val ) =>
									setAttributes( { margin: val } )
								}
								resetValues={ {
									top: '20px',
									right: '0px',
									bottom: '0px',
									left: '0px',
								} }
							/>
							<BoxControl
								__next40pxDefaultSize
								__nextHasNoMarginBottom
								label={ __( 'Padding', '99forms' ) }
								values={ padding }
								onChange={ ( val ) =>
									setAttributes( {
										padding: val,
									} )
								}
								resetValues={ {
									top: '20px',
									right: '20px',
									bottom: '20px',
									left: '20px',
								} }
							/>
						</PanelBody>
					</>
				}
				hasAdvanced={ true }
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>
			<div { ...blockProps }>
				<style>{ css }</style>
				<div className="wrapper">
					<div className="nnform">
						<InnerBlocks template={ TEMPLATE } />
					</div>
					<div className="nnf-form-message nnf-message-success">
						{ messages.success }
					</div>
					<div className="nnf-form-message nnf-message-error">
						{ messages.error }
					</div>
				</div>
			</div>
		</>
	);
}
