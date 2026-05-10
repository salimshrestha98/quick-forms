<?php
// This file is generated. Do not modify it manually.
return array(
	'checkbox' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'nnforms/checkbox',
		'version' => '0.1.0',
		'title' => 'Checkbox',
		'category' => 'nnforms',
		'icon' => 'yes',
		'description' => 'Checkbox Field',
		'parent' => array(
			'nnforms/form'
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
			'fieldLabel' => array(
				'type' => 'string',
				'default' => 'Checkbox'
			),
			'placeholder' => array(
				'type' => 'string',
				'default' => 'I agree to all terms and conditions.'
			),
			'defaultValue' => array(
				'type' => 'string',
				'default' => ''
			),
			'required' => array(
				'type' => 'boolean',
				'default' => false
			),
			'checkedByDefault' => array(
				'type' => 'boolean',
				'default' => false
			)
		),
		'inputdomain' => 'nnforms',
		'editorScript' => 'file:./index.js',
		'render' => 'file:./render.php'
	),
	'country' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'nnforms/country',
		'version' => '0.1.0',
		'title' => 'Country',
		'category' => 'nnforms',
		'icon' => 'admin-site-alt2',
		'description' => 'Country Field',
		'parent' => array(
			'nnforms/form'
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
			'fieldLabel' => array(
				'type' => 'string',
				'default' => 'Country'
			),
			'options' => array(
				'type' => 'string',
				'default' => ''
			),
			'optionsLayout' => array(
				'type' => 'string',
				'default' => 'inline'
			),
			'defaultValue' => array(
				'type' => 'string',
				'default' => ''
			),
			'required' => array(
				'type' => 'boolean',
				'default' => false
			)
		),
		'inputdomain' => 'nnforms',
		'editorScript' => 'file:./index.js',
		'render' => 'file:./render.php'
	),
	'file-upload' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'nnforms/file-upload',
		'version' => '0.1.0',
		'title' => 'File Upload',
		'category' => 'nnforms',
		'icon' => 'cloud-upload',
		'description' => 'File Upload Field',
		'parent' => array(
			'nnforms/form'
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
			'fieldLabel' => array(
				'type' => 'string',
				'default' => 'File Upload'
			),
			'placeholder' => array(
				'type' => 'string',
				'default' => ''
			),
			'required' => array(
				'type' => 'boolean',
				'default' => false
			),
			'accept' => array(
				'type' => 'string',
				'default' => ''
			),
			'multiple' => array(
				'type' => 'boolean',
				'default' => false
			)
		),
		'inputdomain' => 'nnforms',
		'editorScript' => 'file:./index.js',
		'render' => 'file:./render.php'
	),
	'form' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'nnforms/form',
		'version' => '0.1.0',
		'title' => 'Form',
		'category' => 'nnforms',
		'icon' => 'feedback',
		'description' => '99Forms wrapper block',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false,
			'multiple' => false
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
			'redirectionUrl' => array(
				'type' => 'string',
				'default' => ''
			),
			'hideFormAfterSubmit' => array(
				'type' => 'boolean',
				'default' => true
			),
			'honeypot' => array(
				'type' => 'boolean',
				'default' => true
			),
			'messages' => array(
				'type' => 'object',
				'default' => array(
					'success' => 'The form has been submitted successfully!',
					'error' => 'The form submission has failed. Please check the errors.'
				)
			),
			'emails' => array(
				'type' => 'array',
				'default' => array(
					
				)
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
		'textdomain' => 'nnforms',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js',
		'render' => 'file:./render.php'
	),
	'input' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'nnforms/input',
		'version' => '0.1.0',
		'title' => 'Input',
		'category' => 'nnforms',
		'icon' => 'editor-textcolor',
		'description' => 'Input Field',
		'parent' => array(
			'nnforms/form'
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
			'minValue' => array(
				'type' => 'number',
				'default' => 0
			),
			'maxValue' => array(
				'type' => 'number',
				'default' => 100
			),
			'maxLength' => array(
				'type' => 'number',
				'default' => 100
			)
		),
		'inputdomain' => 'nnforms',
		'editorScript' => 'file:./index.js',
		'render' => 'file:./render.php'
	),
	'radio' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'nnforms/radio',
		'version' => '0.1.0',
		'title' => 'Radio',
		'category' => 'nnforms',
		'icon' => 'editor-ul',
		'description' => 'Radio Field',
		'parent' => array(
			'nnforms/form'
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
			'fieldLabel' => array(
				'type' => 'string',
				'default' => 'Radio'
			),
			'options' => array(
				'type' => 'string',
				'default' => ''
			),
			'optionsLayout' => array(
				'type' => 'string',
				'default' => 'inline'
			),
			'defaultValue' => array(
				'type' => 'string',
				'default' => ''
			),
			'required' => array(
				'type' => 'boolean',
				'default' => false
			)
		),
		'inputdomain' => 'nnforms',
		'editorScript' => 'file:./index.js',
		'render' => 'file:./render.php'
	),
	'recaptcha' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'nnforms/recaptcha',
		'version' => '0.1.0',
		'title' => 'Recaptcha',
		'category' => 'nnforms',
		'icon' => 'lock',
		'description' => 'Recaptcha Field',
		'parent' => array(
			'nnforms/form'
		),
		'example' => array(
			
		),
		'supports' => array(
			'html' => false
		),
		'attributes' => array(
			'id' => array(
				'type' => 'string'
			)
		),
		'inputdomain' => 'nnforms',
		'editorScript' => 'file:./index.js',
		'render' => 'file:./render.php'
	),
	'select' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'nnforms/select',
		'version' => '0.1.0',
		'title' => 'Select',
		'category' => 'nnforms',
		'icon' => 'arrow-down-alt2',
		'description' => 'Select Field',
		'parent' => array(
			'nnforms/form'
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
			'fieldLabel' => array(
				'type' => 'string',
				'default' => 'Select'
			),
			'options' => array(
				'type' => 'string',
				'default' => ''
			),
			'optionsLayout' => array(
				'type' => 'string',
				'default' => 'inline'
			),
			'defaultValue' => array(
				'type' => 'string',
				'default' => ''
			),
			'required' => array(
				'type' => 'boolean',
				'default' => false
			)
		),
		'inputdomain' => 'nnforms',
		'editorScript' => 'file:./index.js',
		'render' => 'file:./render.php'
	),
	'submit' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'nnforms/submit',
		'version' => '0.1.0',
		'title' => 'Submit',
		'category' => 'nnforms',
		'icon' => 'arrow-right-alt',
		'description' => 'Submit Button',
		'parent' => array(
			'nnforms/form'
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
				'default' => 'custom'
			),
			'buttonWidth' => array(
				'type' => 'string',
				'default' => '100px'
			),
			'textColor' => array(
				'type' => 'string',
				'default' => '#000000'
			),
			'bgColor' => array(
				'type' => 'string',
				'default' => '#e7e7e7'
			),
			'padding' => array(
				'type' => 'object',
				'default' => array(
					'top' => '15px',
					'left' => '20px',
					'right' => '20px',
					'bottom' => '15px'
				)
			)
		),
		'textdomain' => 'nnforms',
		'editorScript' => 'file:./index.js',
		'render' => 'file:./render.php'
	),
	'textarea' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'nnforms/textarea',
		'version' => '0.1.0',
		'title' => 'Textarea',
		'category' => 'nnforms',
		'icon' => 'editor-paragraph',
		'description' => 'Textarea Field',
		'parent' => array(
			'nnforms/form'
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
			'fieldLabel' => array(
				'type' => 'string',
				'default' => 'Textarea'
			),
			'rowsCount' => array(
				'type' => 'number',
				'default' => 5
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
			'maxLength' => array(
				'type' => 'number',
				'default' => 500
			)
		),
		'inputdomain' => 'nnforms',
		'editorScript' => 'file:./index.js',
		'render' => 'file:./render.php'
	)
);
