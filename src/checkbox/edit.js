import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	TextControl,
	TabPanel,
	Dashicon,
} from '@wordpress/components';
import { useEffect } from '@wordpress/element';

export default function Edit( {
	attributes,
	setAttributes,
	context,
	clientId,
} ) {
	const { id, placeholder, required, checkedByDefault } = attributes;

	const {
		'quick-form/fieldWidth': fieldWidth,
		'quick-form/fieldMargin': fieldMargin,
	} = context;

	useEffect( () => {
		if ( ! id ) {
			setAttributes( { id: clientId.slice( 0, 8 ) } );
		}
	}, [] );

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
											label="Placeholder Text"
											value={ placeholder }
											onChange={ ( value ) =>
												setAttributes( {
													placeholder: value,
												} )
											}
										/>

										<ToggleControl
											label="Checked by Default"
											checked={ checkedByDefault }
											onChange={ () => {
												setAttributes( {
													checkedByDefault:
														! checkedByDefault,
												} );
											} }
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
				<div
					className="qf-field qf-checkbox-field"
					style={ { maxWidth: fieldWidth } }
				>
					<input type="checkbox" onChange={ () => false } />
					<span>{ placeholder }</span>
				</div>
			</div>
		</>
	);
}
