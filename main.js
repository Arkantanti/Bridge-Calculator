function decrement1() {
	var score = Number(document.getElementById('licznik1').value);
	if (score > 20) {
		document.getElementById('licznik1').value = score - 1;
	}
}
function decrement2() {
	var score = Number(document.getElementById('licznik2').value);
	if (score > -7) {
		document.getElementById('licznik2').value = score - 1;
	}
}
function increment1() {
	var score = Number(document.getElementById('licznik1').value);
	if (score < 40) {
		document.getElementById('licznik1').value = score + 1;
	}
}
function increment2() {
	var score = Number(document.getElementById('licznik2').value);
	if (score < 6) {
		document.getElementById('licznik2').value = score + 1;
	}
}

var points;
var tricks;
var color;
var level;
var moreplayed;
var double;
var party1;
var party2;

var points_gained;
var points_minimum;
var imp_points;
var age;

var radioValue = 'more';

var setbacks = {
	bez1: [50, 100, 150, 200, 250, 300, 350],
	kontra1: [100, 300, 500, 800, 1100, 1400, 1700],
	rekontra1: [200, 600, 1000, 1600, 2200, 2800, 3400],
	bez2: [100, 200, 300, 400, 600, 600, 700],
	kontra2: [200, 500, 800, 1100, 1400, 1700, 2000],
	rekontra2: [400, 1000, 1600, 2200, 2800, 3400, 4000],
};
var overticks = {
	bez1: [20, 30, 30],
	kontra1: [100, 100, 100],
	rekontra1: [200, 200, 200],
	bez2: [20, 30, 30],
	kontra2: [100, 200, 200],
	rekontra2: [200, 400, 400],
};
var main_points = {
	bez1: [70, 80, 90, 90, 110, 120, 110, 140, 400, 130, 420, 430, 400, 450, 460, 920, 980, 990, 1440, 1510, 1520],
	kontra1: [140, 160, 180, 180, 470, 490, 470, 530, 550, 510, 590, 610, 550, 670, 1090, 1210, 1230, 1630, 1770, 1790],
	rekontra1: [230, 520, 560, 560, 540, 680, 640, 760, 800, 720, 880, 920, 800, 1000, 1040, 1380, 1620, 1660, 1960, 2240, 2280],
	bez2: [70, 80, 90, 90, 110, 120, 110, 140, 600, 130, 620, 630, 600, 650, 660, 1370, 1430, 1440, 2140, 2210, 2200],
	kontra2: [140, 160, 180, 180, 670, 690, 670, 730, 750, 710, 790, 810, 750, 850, 870, 1510, 1660, 1680, 2330, 2470, 2490],
	rekontra2: [230, 520, 760, 760, 840, 880, 840, 960, 1000, 920, 1080, 1120, 1000, 1200, 1240, 1830, 2070, 2110, 2660, 2290, 2980],
};
var min_table = [
	[0, 50, 90, 130, 220, 300, 400, 430, 460, 490, 520, 700, 900, 990, 1250, 1400, 1500],
	[0, 50, 90, 130, 260, 400, 600, 630, 660, 690, 720, 1000, 1350, 1440, 1800, 2100, 2200],
];
var imps = [20, 50, 90, 130, 170, 220, 270, 320, 370, 430, 500, 600, 750, 900, 1100, 1300, 1500, 1750, 2000, 2250, 2500, 3000, 3500, 4000];

function getValues() {
	party1 = false;
	party2 = false;
	points = Number(document.getElementById('licznik1').value);
	tricks = Number(document.getElementById('licznik2').value);
	if (document.getElementById('partia1').checked) {
		party1 = true;
	}
	if (document.getElementById('partia2').checked) {
		party2 = true;
	}
	var selector1 = document.querySelector('input[name="poziomkontrakt"]:checked');
	var selector2 = document.querySelector('input[name="kolorkontrakt"]:checked');
	var selector3 = document.querySelector('input[name="ktogral"]:checked');
	var selector4 = document.querySelector('input[name="kontra"]:checked');
	if (!(!selector1 || !selector2 || !selector3 || !selector4)) {
		level = selector1.value;
		color = selector2.value;
		moreplayed = selector3.value;
		double = selector4.value;
		console.log(points);
		console.log(tricks);
		console.log(level);
		console.log(color);
		console.log(moreplayed);
		console.log(double);
		console.log(party1);
		console.log(party2);
		if (points > 40 || points < 20) {
			alertWindow('Niepoprawna liczba punktów.');
		} else if (tricks < -7 || tricks > 6) {
			alertWindow('Niepoprawna liczba w polu "Wpadki i Nadróbki"');
		} else if (tricks + level > 7) {
			alertWindow('Niepoprawne wartości w polach: "Wpadki i Nadróbki" i "Poziom Kontraktu"');
		} else {
			compute1();
		}
	} else {
		alertWindow('Nie wszystkie pola zostały określone.');
	}
}
function compute1() {
	if (points > 36) {
		points = 36;
	}
	if (tricks < 0) {
		if (party1) {
			points_gained = -setbacks[double + 2][-tricks - 1];
		} else {
			points_gained = -setbacks[double + 1][-tricks - 1];
		}
	} else {
		if (color == 'C' || color == 'D') {
			age = 0;
		} else if (color == 'NT') {
			age = 2;
		} else {
			age = 1;
		}

		if (party1) {
			points_gained = main_points[double + 2][level * 3 - 3 + age];
		} else {
			points_gained = main_points[double + 1][level * 3 - 3 + age];
		}
		if (party1) {
			points_gained += tricks * overticks[double + 2][age];
		} else {
			points_gained += tricks * overticks[double + 1][age];
		}
	}

	if (party2) {
		points_minimum = min_table[1][points - 20];
	} else {
		points_minimum = min_table[0][points - 20];
	}
	console.log(points_gained);
	console.log(points_minimum);
	impCount();
}
function impCount() {
	if (moreplayed == 'more') {
		var diff = points_gained - points_minimum;
	} else {
		var diff = -points_gained - points_minimum;
	}
	for (var i = 0; i < 24; i++) {
		var absdiff = Math.abs(diff);
		if (absdiff >= imps[i]) {
			imp_points = i + 1;
		}
	}
	if (diff < 0) {
		imp_points = -imp_points;
	}
	console.log(imp_points);
	windowPopUp();
	document.getElementById('textpart').innerHTML =
		'<h1>Liczba IMPów zdobytych przez parę z większością punktów:</h1><br /><h1>' + imp_points + '</h1>' + '<div class="refresh" onclick="window.location.reload()">RESTART</div>';
}
function windowPopUp() {
	document.getElementById('maincon').classList.add('subconprim');
	document.getElementById('mainwindow').classList.add('windowprim');
}
function windowClose() {
	document.getElementById('maincon').classList.remove('subconprim');
	document.getElementById('mainwindow').classList.remove('windowprim');
}
function alertWindow(alert) {
	windowPopUp();
	document.getElementById('textpart').innerHTML = '<h1>' + alert + ' Spróbój ponownie!</h1><div class="refresh" onclick="window.location.reload()">RESTART</div>';
}
function checkboxBlock() {
	var radioValue2 = document.querySelector('input[name="ktogral"]:checked').value;

	if (radioValue2 != radioValue) {
		document.getElementById('ktogral1').disabled = true;
		document.getElementById('ktogral2').disabled = true;
		radioValue = radioValue2;
		if (radioValue == 'less') {
			document.getElementById('radioButton1').classList.remove('animationClass2');
			document.getElementById('radioButton1').classList.add('animationClass1');
			setTimeout(() => {
				document.getElementById('radioButton2').classList.remove('animationClass4');
				document.getElementById('radioButton2').classList.add('animationClass3');
				setTimeout(() => {
					document.getElementById('ktogral1').disabled = false;
					document.getElementById('ktogral2').disabled = false;
				}, 300);
			}, 600);
		} else {
			document.getElementById('radioButton2').classList.remove('animationClass3');
			document.getElementById('radioButton2').classList.add('animationClass4');
			setTimeout(() => {
				document.getElementById('radioButton1').classList.remove('animationClass1');
				document.getElementById('radioButton1').classList.add('animationClass2');
				setTimeout(() => {
					document.getElementById('ktogral1').disabled = false;
					document.getElementById('ktogral2').disabled = false;
				}, 600);
			}, 300);
		}
	}
}
