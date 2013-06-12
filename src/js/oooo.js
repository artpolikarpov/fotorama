var $oooo = $(div(ooooClass, div(ooooClass))),
		ooooInterval,
		$ooooFrame = 0;

function ooooStart ($el) {
	ooooStop(true);

	$oooo.appendTo($el);

	ooooInterval = setInterval(function () {
		$oooo.attr('class', ooooClass + ' ' + ooooClass + '--' + $ooooFrame);
		$ooooFrame++;
		if ($ooooFrame > 4) $ooooFrame = 0;
	}, 200);
}

function ooooStop (leave) {
	leave || $oooo.detach();
	clearInterval(ooooInterval);
}