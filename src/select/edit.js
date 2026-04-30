import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	TextControl,
	TabPanel,
	Dashicon,
	TextareaControl,
} from '@wordpress/components';
import { useEffect } from '@wordpress/element';

export default function Edit( { attributes, setAttributes, clientId } ) {
	const { id, fieldLabel, options, defaultValue, required } = attributes;

	useEffect( () => {
		if ( ! id ) {
			setAttributes( { id: clientId.slice( 0, 8 ) } );
		}

		if ( ! options ) {
			setAttributes( {
				options: `option-1 | Option 1
option-2 | Option 2`, // Do not change this.
			} );
		}
	}, [] );

	function getOptions() {
		if ( ! options ) {
			return [];
		}

		return options
			.split( '\n' )
			.map( ( line ) => line.trim() )
			.filter( Boolean )
			.map( ( line ) => {
				const [ value, label ] = line
					.split( '|' )
					.map( ( s ) => s.trim() );

				if ( ! value || ! label ) {
					return null;
				}

				return { value, label };
			} )
			.filter( Boolean );
	}

	const optionsList = getOptions();

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

										<TextareaControl
											label={ __(
												'Select Options',
												'quick-forms'
											) }
											help={ __(
												'Enter the options for select field in the pipe format: option-key | Option Label',
												'quick-forms'
											) }
											value={ options }
											onChange={ ( value ) =>
												setAttributes( {
													options: value,
												} )
											}
										/>

										<TextControl
											__next40pxDefaultSize
											label={ __(
												'Default Vaue',
												'quick-forms'
											) }
											value={ defaultValue }
											onChange={ ( value ) =>
												setAttributes( {
													defaultValue: value,
												} )
											}
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
					className: 'qf-block qf-select-block',
				} ) }
			>
				<div className="wrapper">
					<RichText
						tagName="label"
						value={ fieldLabel }
						onChange={ ( value ) =>
							setAttributes( { fieldLabel: value } )
						}
						placeholder={ __( 'Field Label', 'quick-forms' ) }
					/>
					<div className="qf-field qf-select-field">
						<select
							defaultValue={ defaultValue }
							onChange={ () => false }
						>
							{ optionsList.map( ( option, index ) => (
								<option
									key={ index }
									className="qf-select-item"
									value={ option.value }
								>
									{ option.label }
								</option>
							) ) }
						</select>
					</div>
				</div>
			</div>
		</>
	);
}
