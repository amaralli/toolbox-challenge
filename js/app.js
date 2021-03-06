$(onReady);

function onReady() {
	var numPairs = 0;
	var numIncorrect = 0;
	var storedImage = null;
	var interval = null;

	function tile(image) {
		this.image = image;
	};
	
	$("#newGameButton").click(function () {
		organizeTiles();
	});

	organizeTiles();

	$('.gameboard img').click(function() {
		var clickedImage = $(this);
		var tile = clickedImage.data("assocTile");
		var originalImage = $(document.getElementById("activeTile"));
        if(originalImage.length) {
            if(clickedImage !== originalImage) {
                flipImage(clickedImage, tile);
                setTimeout(function () {
                    if (clickedImage.attr('src') != originalImage.attr('src')) {
                        console.log("second tile");
                        console.log("no match");
                        var originalTile = originalImage.data('assocTile');
                        flipImage(clickedImage, tile);
                        flipImage(originalImage, originalTile);
                        numIncorrect++;
                        console.log(incorrectGuesses);
                        var incorrectGuessNum = document.getElementById("incorrectGuesses");
                        incorrectGuessNum.innerHTML = numIncorrect;
                    } else {
                        numPairs++;
                        var correctPairs = document.getElementById("matchesCorrect");
                        correctPairs.innerHTML = numPairs;
                        var pairsLeft = document.getElementById("matchesLeft");
                        var numLeft = 8s - numPairs;
                        pairsLeft.innerHTML = numLeft;
                        if(numLeft == 0) {
                        	window.alert("winner!");
                        	organizeTiles();
                        }
                        console.log("match");
                        console.log(numPairs);
                    }
                    originalImage.attr("id", "");
                }, 1000);
            }
        } else {
            flipImage(clickedImage, tile);
            console.log("first tile");
            clickedImage.attr("id", "activeTile");
        }
	});

	function organizeTiles() {
		var gameboard = $('.gameboard');

		var tileArray = [];
		for(var i = 1; i < 33; i++) {
			var value= "img/tile" + i +".jpg";
			tileArray[tileArray.length] = value;
		}

		tileArray = _.shuffle(tileArray);

		var completeArray = [];
		for(var i = 0; i < 8; i++) {
			var newTile = $(document.createElement('img'));
			var newTileObject = new tile(tileArray[i]);
			newTile.data("assocTile", newTileObject);
			newTile.attr('src', "img/kindajean.png");
			var copyTile = newTile.clone();
			copyTile.data("assocTile", newTileObject);
			completeArray[completeArray.length] = newTile;
			completeArray[completeArray.length] = copyTile;
		}

		completeArray = _.shuffle(completeArray);
		for(var i = 0; i < completeArray.length; i++){
			gameboard.append(completeArray[i]);
			console.log(completeArray[i]);	
		}
	}

	function flipImage(clickedImage, tile) {
		if(clickedImage.attr('src') == "img/kindajean.png") {
			console.log(tile.image);
			clickedImage.attr('src', tile.image);
		} else {
			clickedImage.attr('src', 'img/kindajean.png');
		}
	}

	var startTime = _.now();
	var timer = window.setInterval(onTimer, 1000);

	function onTimer() {
		var elapsedSeconds = Math.floor((_.now() - startTime) / 1000);
		var showTimer = document.getElementById('timer');
		showTimer.innerHTML= elapsedSeconds;
	}

}