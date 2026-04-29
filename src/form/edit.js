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
import { useEffect, useState } from '@wordpress/element';
import './editor.scss';
import AdvancedSettingsModal from './components/AdvancedSettingsModal';

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

	const [ activeTab, setActiveTab ] = useState( 'settings' );

	return (
		<>
			<InspectorControls>
				<TabPanel
					className="qf-tab-panel"
					activeClass="active-tab"
					key={ activeTab }
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
					onSelect={ ( tabName ) => setActiveTab( tabName ) }
					initialTabName={ activeTab }
				>
					{ ( tab ) => {
						if ( tab.name === 'settings' ) {
							return (
								<>
									<PanelBody
										title={ __(
											'General Settings',
											'quick-forms'
										) }
										initialOpen={ false }
									>
										<TextControl
											__next40pxDefaultSize
											label={ __(
												'Form Name',
												'quick-forms'
											) }
											placeholder={ __(
												'Form Name',
												'quick-forms'
											) }
											value={ formName }
											onChange={ ( value ) =>
												setAttributes( {
													formName: value,
												} )
											}
										/>
									</PanelBody>
									<PanelBody
										title={ __(
											'Field Settings',
											'quick-forms'
										) }
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
								<AdvancedSettingsModal
									attributes={ attributes }
									setAttributes={ setAttributes }
									setActiveTab={ setActiveTab }
								/>
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
