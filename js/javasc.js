/*zmienne*/
var canvas = document.querySelector('#draw');
var ctx = canvas.getContext('2d');
var brushItem = document.querySelector('.brush');
var brushSize = "20";
var erase = document.querySelector('.erase');
var download = document.querySelector('.download');
var clear = document.querySelector('.clear');
var color = "black";
var info = document.querySelector('.info');
var buttons = document.querySelectorAll('.btn');
var brushIsClicked = false;
var eraseIsClicked = false;
var isDrawing = false;
var lastX = 0;
var lastY = 0;

/*funkcja odpowiadajaca za znikniecie napisu z naglowka "info" po nacisnieciu dowolnego przycisku*/
buttons.forEach(button => button.addEventListener('click', function(e){
	e.target.removeEventListener(e.type, arguments.callee); //funkcja wykonywana tylko raz
	info.textContent = '';	
}));

/*funckja sprawdzajaca czy zostal nacisniety przycisk brush*/
function brushHandler(){
	brushIsClicked = true;
	
	if(brushIsClicked === true){
		document.querySelector(".color").value = '#000000';
		color = '#000000';
		function update(e){
		color = this.value;
		}
		document.querySelector(".color").onchange = update;
	}
}

/*funckja sprawdzajaca czy zostal nacisniety przycisk erase*/
function eraseHandler(){
	eraseIsClicked = true;
	
	if(eraseIsClicked === true){
		canvas.style.cursor = "url('eraser.png'), auto";
		document.querySelector(".color").value = '#ffffff';
		color = '#ffffff';
	}
}

/*zmienia rozmiar pedzla i wczytuje jego wartosc do paragrafu textInput*/
function brush(e){
	brushSize = this.value;
	document.querySelector('.textInput').textContent = this.value;
}

/*rysowanie*/
function draw(e){
	ctx.strokeStyle = color;
	ctx.lineWidth = brushSize;
	
	if(!isDrawing) return;
		ctx.beginPath();
		//zaczyna sie
		ctx.moveTo(lastX, lastY);
		//konczy sie
		ctx.lineTo(e.offsetX, e.offsetY);
		ctx.stroke();
		[lastX, lastY] = [e.offsetX, e.offsetY];// =lastX = e.offsetX; lastY = e.offsetY;
		
		ctx.lineJoin = 'round';
		ctx.lineCap = 'round';
}

/*odpowiada za pobieranie narysowanych obrazow*/
function downloads(){
	var dt = canvas.toDataURL();
	this.href = dt;
}

/*eventListenery*/
brushItem.addEventListener('click', brushHandler);
erase.addEventListener('click', eraseHandler);
document.querySelector(".brushSize").onchange = brush;
brushItem.addEventListener('click', function(){
canvas.style.cursor = "url('painted.png'), auto";
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', (e) => {
isDrawing = true;
[lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);
});
clear.onclick = function(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}
download.addEventListener('click', downloads);
