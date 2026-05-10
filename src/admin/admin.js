import './admin.scss';

document.addEventListener( 'DOMContentLoaded', () => {
	const tabs = document.querySelectorAll( '.nnf-settings__tab' );
	const panels = document.querySelectorAll( '.nnf-settings__panel' );

	function activateTab( name ) {
		tabs.forEach( ( tab ) => {
			tab.classList.toggle( 'is-active', tab.dataset.tab === name );
		} );

		panels.forEach( ( panel ) => {
			panel.classList.toggle( 'is-active', panel.dataset.panel === name );
		} );
	}

	tabs.forEach( ( tab ) => {
		tab.addEventListener( 'click', () => {
			activateTab( tab.dataset.tab );
		} );
	} );
} );
