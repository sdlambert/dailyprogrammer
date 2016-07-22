// https://redd.it/4q35ip
// Input Description

// You will be given two lines of text as input. On the first line, you will receive a number followed by two letters, the first representing the unit that the number is currently in, the second representing the unit it needs to be converted to.

// Examples of valid units are:

//     d for degrees of a circle
//     r for radians

// Output Description

// You must output the given input value, in the unit specified. It must be followed by the unit letter. You may round to a whole number, or to a few decimal places.

// Bonus

// Also support these units:

//     c for Celsius
//     f for Fahrenheit
//     k for Kelvin


function convert(input) {

	var breakIdx = input.search(/[A-z]/),
			unitIn = input[breakIdx],
			unitOut = input[breakIdx + 1],
			degreesIn = Number(input.slice(0, breakIdx)),
			degreesOut,
			angular = /[rd]/,
			temperature = /[cfk]/;

	if (angular.test(unitIn) && angular.test(unitOut)){
		// angles
		if (unitIn === 'r')
			degreesOut = (degreesIn * 180 / Math.PI).toFixed(2);
		else
			degreesOut = (degreesIn * Math.PI / 180).toFixed(2);
	}
	else if (temperature.test(unitIn) && temperature.test(unitOut)) {
		// temperature, kelvin all the things
		if(unitIn === 'c')
			degreesOut = degreesIn + 273.15;
		else if (unitIn === 'f')
			degreesOut = 5 * (degreesIn + 459.67) / 9;
		else
			degreesOut = degreesIn;

		// convert to specified type (if needed)
		if (unitOut === 'c')
			degreesOut = (degreesOut - 273.15).toFixed(2);
		else if (unitOut === 'f')
			degreesOut = ((degreesOut * 9 / 5) - 459.67).toFixed(2);
	}
	else return "No candidate for conversion!";

	// remove trailing zeroes
	if (degreesOut.endsWith('.00'))
		degreesOut = degreesOut.slice(0,-3);

	return degreesOut;
}

// console.log(convert("3.1416rd"));
// console.log(convert("90dr"));
// console.log(convert("212fc"));
// console.log(convert("70cf"));
// console.log(convert("100cr"));
// console.log(convert("315.15kc"));