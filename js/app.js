$(onReady);

function onReady() {
	var tile = {
		image: 'img/tile1.jpg'
	};

	var gameboard = $('.gameboard');

	//for(int i = 0; i < 3; i++) {
		var newTile = $(document.createElement('img'));
		newTile.data('assocTile', tile);
		newTile.attr('src', tile.image);
		gameboard.append(newTile);
	//}

	$('.gameboard img').click(function() {
		var clickedImage = $(this);
		var tile = clickedImage.data('assocTile');
		clickedImage.attr('src', 'img/tile-back.png');
	});

}