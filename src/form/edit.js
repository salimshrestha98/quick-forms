import { __ } from '@wordpress/i18n';
import {
	InnerBlocks,
	useBlockProps,
	InspectorControls,
} from '@wordpress/block-editor';
import { generateStyles } from '../hooks/styleGenerator';
import {
	PanelBody,
	ToggleControl,
	RadioControl,
	TabPanel,
	Dashicon,
	TextControl,
	__experimentalUnitControl as UnitControl,
	BoxControl,
} from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import './editor.scss';

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
		hideFormAfterSubmit,
		redirectionUrl,
		honeypot,
		messages,
	} = attributes;
	const { allowedBlocks } = [ 'create-block/text' ];

	const TEMPLATE = [
		[ 'quick-forms/input', { inputType: 'text', fieldLabel: 'Your Name' } ],
		[
			'quick-forms/input',
			{ inputType: 'email', fieldLabel: 'Your Email' },
		],
		[ 'quick-forms/textarea', { fieldLabel: 'Your Message' } ],
		[ 'quick-forms/submit', { lock: { move: false, remove: true } } ],
	];

	useEffect( () => {
		if ( ! id ) {
			setAttributes( { id: clientId.slice( 0, 8 ) } );
		}
	}, [] );

	const css = generateStyles( attributes, clientId );
	const blockProps = useBlockProps( {
		className: `qf-block qf-form-block`,
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
						{
							name: 'advanced',
							title: <Dashicon icon="admin-tools" />,
							className: 'tab-advanced',
						},
					] }
				>
					{ ( tab ) => {
						if ( tab.name === 'settings' ) {
							return (
								<>
									<PanelBody
										title="General Settings"
										initialOpen={ false }
									>
										<TextControl
											__next40pxDefaultSize
											label="Form Name"
											value={ formName }
											onChange={ ( value ) =>
												setAttributes( {
													formName: value,
												} )
											}
										/>
									</PanelBody>
									<PanelBody
										title="Field Settings"
										initialOpen={ false }
									>
										<ToggleControl
											label="Show Label"
											checked={ showLabel }
											onChange={ ( val ) => {
												setAttributes( {
													showLabel: val,
												} );
											} }
										/>

										{ showLabel && (
											<RadioControl
												label="Label Position"
												selected={ labelPosition }
												options={ [
													{
														label: 'Inline',
														value: 'inline',
													},
													{
														label: 'Above',
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

										{ showLabel &&
											'inline' === labelPosition && (
												<UnitControl
													__next40pxDefaultSize
													label="Label Width"
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
											label="Field Width"
											onChange={ ( value ) =>
												setAttributes( {
													fieldWidth: value,
												} )
											}
											value={ fieldWidth }
										/>
										<BoxControl
											__next40pxDefaultSize
											label="Field Margin"
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
											__nextHasNoMarginBottom
											label="Margin"
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
											label="Padding"
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
							);
						}

						if ( tab.name === 'advanced' ) {
							return (
								<>
									<PanelBody
										title="Form Settings"
										initialOpen={ false }
									>
										<ToggleControl
											help="Hide the form after the form is submitted successfully."
											label="Hide Form after Submission"
											checked={ hideFormAfterSubmit }
											onChange={ () => {
												setAttributes( {
													hideFormAfterSubmit:
														! hideFormAfterSubmit,
												} );
											} }
										/>
										<TextControl
											__next40pxDefaultSize
											help="Redirect the user to certain page after the form is submitted successfully."
											label="Redirection URL"
											value={ redirectionUrl }
											placeholder="https://example.com/"
											onChange={ ( value ) =>
												setAttributes( {
													redirectionUrl: value,
												} )
											}
										/>
									</PanelBody>
									<PanelBody
										title="Spam Settings"
										initialOpen={ false }
									>
										<ToggleControl
											label="Enable Honeypot"
											checked={ honeypot }
											help="Enable Honeypot for this form."
											onChange={ () => {
												setAttributes( {
													honeypot: ! honeypot,
												} );
											} }
										/>
									</PanelBody>
									<PanelBody
										title="Messages"
										initialOpen={ false }
									>
										<TextControl
											__next40pxDefaultSize
											help="Message to show when form submits successfully."
											label="Success Message"
											value={ messages.success }
											onChange={ ( value ) =>
												setAttributes( {
													messages: {
														...messages,
														success: value,
													},
												} )
											}
										/>
										<TextControl
											__next40pxDefaultSize
											label="Error Message"
											help="Message to show when form submission fails."
											value={ messages.error }
											onChange={ ( value ) =>
												setAttributes( {
													messages: {
														...messages,
														error: value,
													},
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
			<div { ...blockProps }>
				<style>{ css }</style>
				<div className="wrapper">
					<form className="quick-form">
						<InnerBlocks
							template={ TEMPLATE }
							allowedBlocks={ allowedBlocks }
						/>
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
