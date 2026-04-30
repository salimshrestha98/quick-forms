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
		[ 'quick-forms/input', { inputType: 'text', fieldLabel: 'Your Name' } ],
		[
			'quick-forms/input',
			{ inputType: 'email', fieldLabel: 'Your Email' },
		],
		[ 'quick-forms/textarea', { fieldLabel: 'Your Message' } ],
		[ 'quick-forms/submit', { lock: { move: false, remove: true } } ],
	];

	useBlockId( id, clientId, setAttributes );

	const css = generateStyles( attributes, clientId );
	const blockProps = useBlockProps( {
		className: `qf-block qf-form-block`,
	} );

	return (
		<>
			<BlockInspectorTabs
				settingsTab={
					<>
						<PanelBody
							title={ __( 'General Settings', 'quick-forms' ) }
							initialOpen={ false }
						>
							<TextControl
								__next40pxDefaultSize
								label={ __( 'Form Name', 'quick-forms' ) }
								placeholder={ __( 'Form Name', 'quick-forms' ) }
								value={ formName }
								onChange={ ( value ) =>
									setAttributes( {
										formName: value,
									} )
								}
							/>
						</PanelBody>
						<PanelBody
							title={ __( 'Field Settings', 'quick-forms' ) }
							initialOpen={ false }
						>
							<ToggleControl
								label={ __( 'Show Label', 'quick-forms' ) }
								checked={ showLabel }
								onChange={ ( val ) => {
									setAttributes( {
										showLabel: val,
									} );
								} }
							/>

							{ showLabel && (
								<RadioControl
									label={ __(
										'Label Position',
										'quick-forms'
									) }
									selected={ labelPosition }
									options={ [
										{
											label: __(
												'Inline',
												'quick-forms'
											),
											value: 'inline',
										},
										{
											label: __( 'Above', 'quick-forms' ),
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
									label={ __( 'Label Width', 'quick-forms' ) }
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
								label={ __( 'Field Width', 'quick-forms' ) }
								onChange={ ( value ) =>
									setAttributes( {
										fieldWidth: value,
									} )
								}
								value={ fieldWidth }
							/>
							<BoxControl
								__next40pxDefaultSize
								label={ __( 'Field Margin', 'quick-forms' ) }
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
							title={ __( 'Spacing Settings', 'quick-forms' ) }
							initialOpen={ false }
						>
							<BoxControl
								__next40pxDefaultSize
								__nextHasNoMarginBottom
								label={ __( 'Margin', 'quick-forms' ) }
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
								label={ __( 'Padding', 'quick-forms' ) }
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
					<form className="quick-form">
						<InnerBlocks template={ TEMPLATE } />
					</form>
					<div className="qf-form-message qf-message-success">
						{ messages.success }
					</div>
					<div className="qf-form-message qf-message-error">
						{ messages.error }
					</div>
				</div>
			</div>
		</>
	);
}
