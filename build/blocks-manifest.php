<?php
// This file is generated. Do not modify it manually.
return array(
	'form' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'quick-forms/form',
		'version' => '0.1.0',
		'title' => 'Form',
		'category' => 'quick-forms',
		'icon' => 'feedback',
		'description' => 'Quick Form wrapper block',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false
		),
		'attributes' => array(
			'id' => array(
				'type' => 'string'
			),
			'formName' => array(
				'type' => 'string',
				'default' => 'Contact Form'
			),
			'showLabel' => array(
				'type' => 'boolean',
				'default' => true
			),
			'labelPosition' => array(
				'type' => 'string',
				'default' => 'above'
			),
			'fieldWidth' => array(
				'type' => 'string',
				'default' => '500px'
			),
			'fieldMargin' => array(
				'type' => 'object',
				'default' => array(
					'top' => '20px',
					'left' => '0px',
					'right' => '0px',
					'bottom' => '0px'
				)
			),
			'labelWidth' => array(
				'type' => 'string',
				'default' => '150px'
			),
			'margin' => array(
				'type' => 'object',
				'default' => array(
					'top' => '20px',
					'left' => '0px',
					'right' => '0px',
					'bottom' => '0px'
				)
			),
			'padding' => array(
				'type' => 'object',
				'default' => array(
					'top' => '20px',
					'left' => '20px',
					'right' => '20px',
					'bottom' => '20px'
				)
			)
		),
		'providesContext' => array(
			'quick-form/showLabel' => 'showLabel',
			'quick-form/labelPosition' => 'labelPosition',
			'quick-form/labelWidth' => 'labelWidth',
			'quick-form/fieldWidth' => 'fieldWidth',
			'quick-form/fieldMargin' => 'fieldMargin'
		),
		'textdomain' => 'quick-forms',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js',
		'render' => 'file:./render.php'
	),
	'input' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'quick-forms/input',
		'version' => '0.1.0',
		'title' => 'Input',
		'category' => 'quick-forms',
		'icon' => 'editor-textcolor',
		'description' => 'Input Field',
		'parent' => array(
			'quick-forms/form'
		),
		'example' => array(
			
		),
		'supports' => array(
			'html' => false
		),
		'attributes' => array(
			'id' => array(
				'type' => 'string'
			),
			'inputType' => array(
				'type' => 'string',
				'default' => 'text'
			),
			'fieldName' => array(
				'type' => 'string'
			),
			'fieldLabel' => array(
				'type' => 'string',
				'default' => 'Field Label'
			),
			'placeholder' => array(
				'type' => 'string',
				'default' => ''
			),
			'defaultValue' => array(
				'type' => 'string',
				'default' => ''
			),
			'required' => array(
				'type' => 'boolean',
				'default' => false
			),
			'minimum' => array(
				'type' => 'string',
				'default' => ''
			),
			'maximum' => array(
				'type' => 'string',
				'default' => ''
			),
			'margin' => array(
				'type' => 'object',
				'default' => array(
					'top' => '20px',
					'left' => '0px',
					'right' => '0px',
					'bottom' => '0px'
				)
			)
		),
		'usesContext' => array(
			'quick-form/showLabel',
			'quick-form/labelPosition',
			'quick-form/labelWidth',
			'quick-form/fieldWidth',
			'quick-form/fieldMargin'
		),
		'inputdomain' => 'quick-forms',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php'
	),
	'submit' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'quick-forms/submit',
		'version' => '0.1.0',
		'title' => 'Submit',
		'category' => 'quick-forms',
		'icon' => 'arrow-right-alt',
		'description' => 'Submit Button',
		'parent' => array(
			'quick-forms/form'
		),
		'example' => array(
			
		),
		'supports' => array(
			'html' => false
		),
		'attributes' => array(
			'id' => array(
				'type' => 'string'
			),
			'buttonText' => array(
				'type' => 'string',
				'default' => 'Submit'
			),
			'buttonWidthType' => array(
				'type' => 'string',
				'default' => 'auto'
			),
			'buttonWidth' => array(
				'type' => 'string',
				'default' => '100px'
			),
			'margin' => array(
				'type' => 'object',
				'default' => array(
					'top' => '20px',
					'left' => '0px',
					'right' => '0px',
					'bottom' => '0px'
				)
			),
			'padding' => array(
				'type' => 'object',
				'default' => array(
					'top' => '10px',
					'left' => '10px',
					'right' => '10px',
					'bottom' => '10px'
				)
			)
		),
		'textdomain' => 'quick-forms',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php'
	)
);
