export function generateStyles( attributes, clientId ) {
	const {
		margin,
		padding,
		fieldMargin,
		fieldWidth,
		showLabel,
		labelPosition,
		labelWidth,
	} = attributes;

	let css = '';

	css += `
        #block-${ clientId } {
			margin: ${ margin.top } ${ margin.right } ${ margin.bottom } ${ margin.left };
		}
		#block-${ clientId } > .wrapper {
			padding: ${ padding.top } ${ padding.right } ${ padding.bottom } ${
				padding.left
			};
		
		}
        #block-${ clientId } .nnf-block {
			margin: ${ fieldMargin.top } ${ fieldMargin.right } ${ fieldMargin.bottom } ${
				fieldMargin.left
			};
			}
		#block-${ clientId } .nnf-block .wrapper {
			display: flex;
			flex-direction: ${ labelPosition === 'inline' ? 'row' : 'column' };
		}
		#block-${ clientId } .nnf-block .wrapper > label {
			display: ${ showLabel ? 'unset' : 'none' };
			width: ${ labelWidth }
		}
		#block-${ clientId } input[type="text"],
		#block-${ clientId } input[type="email"],
		#block-${ clientId } input[type="password"],
		#block-${ clientId } input[type="number"],
		#block-${ clientId } input[type="range"],
		#block-${ clientId } input[type="tel"],
		#block-${ clientId } input[type="url"],
		#block-${ clientId } .nnf-hidden-field-placeholder,
		#block-${ clientId } textarea {
			width: ${ fieldWidth };
			max-width: ${ fieldWidth };
		}
    `;

	return css;
}
