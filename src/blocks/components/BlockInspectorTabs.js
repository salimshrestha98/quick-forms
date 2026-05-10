import { InspectorControls } from '@wordpress/block-editor';
import { TabPanel, Dashicon } from '@wordpress/components';
import { useState } from '@wordpress/element';
import AdvancedSettingsModal from '../form/components/AdvancedSettingsModal';
import { __ } from '@wordpress/i18n';

export default function BlockInspectorTabs( {
	settingsTab,
	stylesTab,
	hasAdvanced = false,
	attributes,
	setAttributes,
} ) {
	const [ activeTab, setActiveTab ] = useState( 'settings' );

	const TABS = [
		{
			name: 'settings',
			title: __( 'Settings', '99forms' ),
			icon: <Dashicon icon="admin-generic" />,
			className: 'tab-settings',
			disabled: settingsTab ? false : true,
		},
		{
			name: 'styles',
			title: __( 'Styles', '99forms' ),
			icon: <Dashicon icon="admin-customizer" />,
			className: 'tab-styles',
			disabled: stylesTab ? false : true,
		},
		{
			name: 'advanced',
			title: __( 'Advanced', '99forms' ),
			icon: <Dashicon icon="admin-tools" />,
			className: 'tab-advanced',
			disabled: hasAdvanced ? false : true,
		},
	].filter( Boolean );

	return (
		<InspectorControls>
			<TabPanel
				className="nnf-tab-panel"
				activeClass="active-tab"
				key={ activeTab }
				tabs={ TABS }
				onSelect={ ( tabName ) => setActiveTab( tabName ) }
				initialTabName={ activeTab }
			>
				{ ( tab ) => {
					if ( tab.name === 'settings' ) {
						return settingsTab;
					}
					if ( tab.name === 'styles' ) {
						return stylesTab;
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
	);
}
