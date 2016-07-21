// Input Description

// You will be given a sample rate in Hz (bytes per second), followed by a duration for each note (milliseconds), and then finally a string of notes represented as the letters A through G (and _ for rest).

// Output Description

// You should output a string of bytes (unsigned 8 bit integers) either as a binary stream, or to a binary file. These bytes should represent the waveforms[1] for the frequencies[2] of the notes.

// Challenge Input

// 8000
// 300
// ABCDEFG_GFEDCBA

// Challenge Output

// Since the output will be a string of 36000 bytes, it is provided below as a download. Note that it does not have to output exactly these bytes, but it must be the same notes when played.

// You can listen to the data either by playing it straight with aplay, which should pick up on the format automatically, or by piping to aplay and specifying the format, or by importing into audacity and playing from there.

var fs = require('fs');

function encodeWaveForm (rate, duration, notes) {

	var numNotes = notes.length,
	    bytesPerNote = rate * duration/1000,
	    waveLength,
	    waveForm = new Uint8Array(bytesPerNote * numNotes),
	    buffer,
	    frequencyArr = getFrequencies(notes),
	    i, j, sin;

  for (i = 0; i < numNotes; i++) {
  	waveLength = rate / frequencyArr[i];
  	for (j = i * bytesPerNote; j < (i + 1) * bytesPerNote - 1; j++) {
  		sin = Math.sin(2 * Math.PI * j / waveLength);
  		waveForm[j] = 128 + (sin * 127);
  		}
  }

  buffer = new Buffer(waveForm);

  fs.writeFile("./data/sinewave.dat", buffer, function (err) {
  	if (err)
  		return console.log(err);
  });
}

function getFrequencies (notes) {
	var noteArr = notes.split(""),
			freqs = {A: 440,    B: 493.88, C: 523.25, D: 587.33,
				       E: 659.25, F: 698.46, G: 783.99};

	return noteArr.map(function (val) {
		return (val !== '_') ? freqs[val] : 0;
	});
}

encodeWaveForm(8000, 300, "ABCDEFG_GFEDCBA");

// Output is slightly scratchy on the A but not any other frequencies