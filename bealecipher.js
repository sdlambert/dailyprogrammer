var fs = require("fs");

function decipher() {
	var numberArr = fs.readFileSync('./bealeciphernums.txt', 'utf-8').split(", "),
	    declarationArr = fs.readFileSync('./bealecipher.txt', 'utf-8').split(" ").filter(function (elem) {
					return (elem !== '.'); // remove random period
				});

	return numberArr.map(function (elem) {
		return declarationArr[elem - 1][0].toLowerCase();
	}).join("");
}

console.log(decipher());