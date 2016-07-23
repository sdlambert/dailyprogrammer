function makeRecktangles (str, width, height) {
	var grid = [],
	    strArr = str.split(""),
	    revStrArr = str.split("").reverse(),
	    widthFwd,
	    widthBack,
	    heightFwd,
	    heightBack,
	    commas,
	    spaces,
	    i, j;

	// build string arrays

	widthFwd = repeatArray(strArr, width);
	widthBack = repeatArray(revStrArr, width);
	heightFwd = repeatArray(strArr, height);
	heightBack = repeatArray(revStrArr, height);

	// draw horizontal lines

	for (i = 0; i < height + 1; i++) {
		if (i % 2 === 0)  // fwd
			grid[i * (str.length - 1)] = widthFwd.join("");
		else
			grid[i * (str.length - 1)] = widthBack.join("");
	}

	// draw vertical lines

	for (i = 0; i < width + 1; i++) {
		if (i % 2 === 0 && width % 2 !== 0 || i % 2 !== 0 && width % 2 === 0) {
			for (j = 0; j < heightFwd.length; j++) {
				if (grid[j] === undefined)
					grid[j] = [];
				grid[j][i * (str.length - 1)] = heightFwd[j];
				}
			}
	  else {
	  	for (j = 0; j < heightBack.length; j++) {
	  		if (grid[j] === undefined)
	  			grid[j] = [];
				grid[j][i * (str.length - 1)] = heightBack[j];
	  		}
			}
		}

	// fix remaining horizontal lines

	for (i = 0; i < heightFwd.length; i++) {
		if (typeof grid[i] === "object") {
			commas = ",".repeat(str.length - 1);
			spaces = " ".repeat(str.length - 2);
			grid[i] = grid[i].toString().split(commas).join(spaces);
		}
	}

	return grid.join("\n");
}

function repeatArray (strArr, iterations) {
	var i, repeatArr = [];

	for (i = 0; i < iterations; i++) {
		if (i === 0)
			repeatArr = repeatArr.concat(strArr);
		else
			repeatArr = repeatArr.concat(strArr.reverse().slice(1));
	}

	return repeatArr;
}

console.log(makeRecktangles("REKT", 1, 1));
console.log(makeRecktangles("REKT", 2, 2));
console.log(makeRecktangles("REKT", 3, 2));
console.log(makeRecktangles("REKT", 4, 2));
console.log(makeRecktangles("CALIFORNIA", 2, 2));