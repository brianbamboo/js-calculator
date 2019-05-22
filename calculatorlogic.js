var numbers = ['0','1','2','3','4','5','6','7','8','9','.'];
var operators = ['/','x','-','+','='];
var number = '';
var equation = [];
var resetnext = false;

/* 
Function: updateNumber()
This function is called every time a number button is pressed
to update the number display.
 */
function updateNumber(text) {
	/* Don't add number if last element in equation is number */
	/* This problem will arise when clearing one element at a time */
	if (equation.length == 0 || operators.includes(equation[equation.length - 1])) {
		/* If adding decimal to blank number, add 0
		If adding decimal to nonblank number, don't add 
		if there'a already a decimal */
		if (text == '.') {
			if (number == '') {
				number += '0.';
			} else if (number.indexOf('.') == -1) {
				number += text;
			}
		/* You can't add any non decimal number if number is 0 */
		} else if (number != '0') {
			number += text;
		}
		$('#number').text(number);
	}
}

function clearNum() {
	number = '';
	$('#number').text('');
}

/* Function: clearAll()
This function clears out the equation and number history
and resets the displays.
*/
function clearAll() {
	equation = [];
	$('#equation').text('');
	clearNum();
}

function processOperator(text) {
	/* If number isn't empty, push to equation and clear number */
	if (number != '') {
		equation.push(number);
		clearNum();
	}
	/* Only process operators if there is at lesat one number */
	if (equation.length != 0) {
		/* Check lastElem */
		var lastElem = equation.pop();
		/* If last elem is an operator, update operator */
		if (!operators.includes(lastElem)) {
			equation.push(lastElem);
		}
		equation.push(text);
		updateEquation(equation);
	}
}

/* Function: updateEquation()
This function is called whenever an operator is pressed to
update the equation display under the number display.
*/
function updateEquation(arr) {
	var eqstr = "";
	for (var i = 0; i < arr.length; i++) {
		eqstr += arr[i];
	}
	$('#equation').text(eqstr);
}

function removeElem() {
	if (number != '') {
		clearNum();
	} else if (equation.length > 0) {
		equation.pop();
	}
	updateEquation(equation);
}

function evalEq(arr) {
	if (equation.length == 0) {
		console.log("Nothing to evaluate");
	} else {
		var result = 0;
		var next;
		while (equation.length > 0) {
			next = equation.shift();
			console.log()
			if (next == '+') {
				result += parseInt(equation.shift());
			} else if (next == '-') {
				result -= parseInt(equation.shift());
			} else if (next == '/') {
				result /= parseInt(equation.shift());
			} else if (next == 'x') {
				result *= parseInt(equation.shift());
			} else if (next == '=') {
				break;
			} else {
				result = parseInt(next);
			}
		};
		$('#number').text(result);
		resetnext = true;
	}
}

$(document).ready(function() {
	$('button').on("click", function() {

		var text = jQuery(this).text();

		if (resetnext) {
			var temp = $('#number').text();
			clearAll();
			resetnext = false;

			if (operators.includes(text)) {
				equation.push(temp);
			}
		}

		if (numbers.includes(text)) {
			updateNumber(text);
		}

		if (operators.includes(text)) {
			processOperator(text);
		};

		if (text == '=') {
			evalEq(equation);
		}
	});

	/* AC clears everything */
	$('#clearall').on("click", function() {
		clearAll();
	});

	/* CE clears previous value */
	$('#clearone').on("click", function() {
		removeElem();
	})
});