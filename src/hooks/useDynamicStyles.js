import { useEffect } from '@wordpress/element';

export default function useDynamicStyles( { css, clientId } ) {
	useEffect( () => {
		console.log( 1 );
		if ( ! css ) {
			return;
		}
		console.log( 2 );
		const styleId = `qf-style-${ clientId }`;
		let styleTag = document.getElementById( styleId );
		console.log( 3 );
		if ( ! styleTag ) {
			styleTag = document.createElement( 'style' );
			styleTag.id = styleId;
			document.head.appendChild( styleTag );
		}
		console.log( 4 );
		styleTag.innerHTML = css;
		console.log( 5, styleTag );
		return () => {
			styleTag.remove();
		};
	}, [ css, clientId ] );
}
