import { __ } from '@wordpress/i18n';
import {
	InnerBlocks,
	useBlockProps,
	InspectorControls,
} from '@wordpress/block-editor';
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
	} = attributes;
	const { allowedBlocks } = [ 'create-block/text' ];

	const TEMPLATE = [
		[ 'core/paragraph', { placeholder: 'Contact Form' } ],
		[ 'quick-forms/text', {} ],
		[ 'quick-forms/submit', {} ],
	];

	useEffect( () => {
		if ( ! id ) {
			setAttributes( { id: clientId.slice( 0, 8 ) } );
		}
	}, [] );

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
				<form
					style={ {
						margin: `${ margin.top } ${ margin.right } ${ margin.bottom } ${ margin.left } `,
						padding: `${ padding.top } ${ padding.right } ${ padding.bottom } ${ padding.left } `,
					} }
					className="quick-form"
				>
					<InnerBlocks
						template={ TEMPLATE }
						allowedBlocks={ allowedBlocks }
					/>
				</form>
			</div>
		</>
	);
}
