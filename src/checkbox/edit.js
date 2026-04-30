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

export default function Edit( { attributes, setAttributes, clientId } ) {
	const { id, fieldLabel, placeholder, required, checkedByDefault } =
		attributes;

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
										title={ __(
											'General Settings',
											'quick-forms'
										) }
									>
										<TextControl
											__next40pxDefaultSize
											label={ __(
												'Field Label',
												'quick-forms'
											) }
											value={ fieldLabel }
											onChange={ ( value ) =>
												setAttributes( {
													fieldLabel: value,
												} )
											}
										/>

										<TextControl
											__next40pxDefaultSize
											label={ __(
												'Placeholder Text',
												'quick-forms'
											) }
											value={ placeholder }
											onChange={ ( value ) =>
												setAttributes( {
													placeholder: value,
												} )
											}
										/>

										<ToggleControl
											label={ __(
												'Checked by Default',
												'quick-forms'
											) }
											checked={ checkedByDefault }
											onChange={ () => {
												setAttributes( {
													checkedByDefault:
														! checkedByDefault,
												} );
											} }
										/>

										<ToggleControl
											label={ __(
												'Required',
												'quick-forms'
											) }
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

			<div
				{ ...useBlockProps( {
					className: `qf-block qf-checkbox-block`,
				} ) }
			>
				<div className="wrapper">
					<div className="qf-field qf-checkbox-field">
						<input type="checkbox" onChange={ () => false } />
						<span>{ placeholder }</span>
					</div>
				</div>
			</div>
		</>
	);
}
