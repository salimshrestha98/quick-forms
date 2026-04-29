import { useEffect } from '@wordpress/element';

export default function useDynamicStyles( { css, clientId } ) {
	useEffect( () => {
		if ( ! css ) {
			return;
		}
		const styleId = `qf-style-${ clientId }`;
		let styleTag = document.getElementById( styleId );
		if ( ! styleTag ) {
			styleTag = document.createElement( 'style' );
			styleTag.id = styleId;
			document.head.appendChild( styleTag );
		}
		styleTag.innerHTML = css;
		return () => {
			styleTag.remove();
		};
	}, [ css, clientId ] );
}
