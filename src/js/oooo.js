var $oooo = $(div('', div(ooooClass))),
		ooooInterval,
		ooooStep = function () {
			$oooo.attr('class', ooooClass + ' ' + ooooClass + '--' + ooooI);
			ooooI++;
			if (ooooI > 4) ooooI = 0;
		},
		ooooI;

function ooooStart ($el) {
	ooooStop(true);
	$oooo.appendTo($el);
	ooooI = 0;
	ooooStep();
	ooooInterval = setInterval(ooooStep, 200);
}

function ooooStop (leave) {
	leave || $oooo.detach();
	clearInterval(ooooInterval);
}
