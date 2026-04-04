import { useBlockProps } from '@wordpress/block-editor';

export default function save() {
	return (
		<p { ...useBlockProps.save() }>
			{ 'Quick Forms – hello from the saved content!' }
		</p>
	);
}
