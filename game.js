var readline = require('readline');

var reader = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

class Game {
	constructor() {
		this.towers = [[3, 2, 1], [], []];
	}

	isValidMove(startTowerIdx, endTowerIdx) {
		if(this.towers[startTowerIdx][0] < this.towers[endTowerIdx][0] && this.towers[startTowerIdx].length > 0){
			return true;
		}
		return false;
	}

	promptMove(reader, callback) {
		this.print();
		reader.question("Which tower do you want to move from? ", start => {
			const startTowerIdx = parseInt(start);
			reader.question("Which tower do you want to put that disk? ", end => {
				const endTowerIdx = parseInt(end);
				callback(startTowerIdx, endTowerIdx);
			})
		})
	}

	move(startTowerIdx, endTowerIdx) {
		if(this.isValidMove(startTowerIdx, endTowerIdx)){
			this.towers[endTowerIdx].unshift(this.towers[startTowerIdx][0]);
			this.towers[startTowerIdx].shift();
			return true;
		}
		return false;
	}

	print() {
		let printed = ""
		let maxlength = Math.max(this.towers[0].length, this.towers[1].length, this.towers[2].length);
		for(let i = 0; i <= maxlength - 1; i++){
			let first = ((this.towers[0][i] === undefined) ? "[ ]" : `[${this.towers[0][i]}]`);
			let second = ((this.towers[1][i] === undefined) ? "[ ]" : `[${this.towers[1][i]}]`);
			let third = ((this.towers[2][i] === undefined) ? "[ ]" : `[${this.towers[2][i]}]`);
			printed += `   ${first}   ${second}   ${third}\n`

		}
		console.log(printed);
	}

	isWon() {
		if((this.towers[0].length === 0 && this.towers[1].length === 0) || (this.towers[0].length === 0 && this.towers[2].length === 0)){
			return true;
		}
		return false;
	}

	run (reader, completionCallback) {
		let game = this;
		game.promptMove(reader, (start, end) => {
			if(!(game.move(start, end))){
				console.log("Wrong Move!")
			}
			if (!(game.isWon())) {
				game.run(reader, completionCallback);
			}
			else {
				game.print();
				console.log("You Won!")
				completionCallback();
			}
		});
	} 
}

module.exports = Game;
