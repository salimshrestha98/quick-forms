import { __ } from '@wordpress/i18n';

export const INPUT_TYPE_HELP = {
	text: __(
		'Single-line text input, used for names, titles, etc.',
		'quick-forms'
	),
	email: __(
		'Email input; validates email addresses automatically.',
		'quick-forms'
	),
	number: __( 'Number input; allows only numeric values.', 'quick-forms' ),
	url: __( 'URL input; expects a valid web address.', 'quick-forms' ),
	tel: __(
		'Telephone input; for phone numbers, may trigger numeric keypad on mobile.',
		'quick-forms'
	),
	password: __(
		'Password input; hides characters for secure entry.',
		'quick-forms'
	),
	hidden: __(
		'Hidden field; not visible to users, used to store data silently.',
		'quick-forms'
	),
	color: __(
		'Color picker; allows selection of a color value.',
		'quick-forms'
	),
	range: __(
		'Slider input for numeric ranges; allows selection between min and max.',
		'quick-forms'
	),
	date: __(
		'Date picker; selects a date (year, month, day).',
		'quick-forms'
	),
	time: __(
		'Time picker; selects a time (hours, minutes, seconds optional).',
		'quick-forms'
	),
};
