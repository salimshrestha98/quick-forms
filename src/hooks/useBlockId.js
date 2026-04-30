import { useEffect } from '@wordpress/element';

export function useBlockId( id, clientId, setAttributes ) {
	useEffect( () => {
		if ( ! id ) {
			setAttributes( { id: clientId.slice( 0, 8 ) } );
		}
	}, [] );
}
