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
			margin: ${ margin.top } ${ margin.right } ${ margin.left } ${ margin.bottom };
		}
		#block-${ clientId } > .wrapper {
			padding: ${ padding.top } ${ padding.right } ${ padding.left } ${
				padding.bottom
			};
		
		}
        #block-${ clientId } .qf-block {
			margin: ${ fieldMargin.top } ${ fieldMargin.right } ${ fieldMargin.left } ${
				fieldMargin.bottom
			};
			}
		#block-${ clientId } .qf-block .wrapper {
			display: flex;
			flex-direction: ${ labelPosition === 'inline' ? 'row' : 'column' };
		}
		#block-${ clientId } .qf-block .wrapper > label {
			display: ${ showLabel ? 'unset' : 'none' };
			width: ${ labelWidth }
		}
		#block-${ clientId } input[type="text"],
		#block-${ clientId } input[type="email"],
		#block-${ clientId } input[type="password"],
		#block-${ clientId } input[type="number"],
		#block-${ clientId } input[type="range"],
		#block-${ clientId } textarea {
			width: ${ fieldWidth };
			max-width: ${ fieldWidth };
		}
    `;

	return css;
}
