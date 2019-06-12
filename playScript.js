const Game = require('./game.js');

const readline = require('readline');
const reader = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

let game = new Game();
game.run(reader, completionCallback)

function completionCallback() {
	reader.question("Would you like to play again?", ans => {
		if(ans === 'yes'){
			game = new Game();
			game.run(reader, completionCallback);
		}
		else {
			reader.close();
		}
	})
}