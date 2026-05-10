import { __ } from '@wordpress/i18n';

export const INPUT_TYPE_HELP = {
	text: __(
		'Single-line text input, used for names, titles, etc.',
		'99forms'
	),
	email: __(
		'Email input; validates email addresses automatically.',
		'99forms'
	),
	number: __( 'Number input; allows only numeric values.', '99forms' ),
	url: __( 'URL input; expects a valid web address.', '99forms' ),
	tel: __(
		'Telephone input; for phone numbers, may trigger numeric keypad on mobile.',
		'99forms'
	),
	password: __(
		'Password input; hides characters for secure entry.',
		'99forms'
	),
	hidden: __(
		'Hidden field; not visible to users, used to store data silently.',
		'99forms'
	),
	color: __( 'Color picker; allows selection of a color value.', '99forms' ),
	range: __(
		'Slider input for numeric ranges; allows selection between min and max.',
		'99forms'
	),
	date: __( 'Date picker; selects a date (year, month, day).', '99forms' ),
	time: __(
		'Time picker; selects a time (hours, minutes, seconds optional).',
		'99forms'
	),
};
