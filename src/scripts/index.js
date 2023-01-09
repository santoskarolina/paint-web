

const canvas = document.getElementById("draw__canvas")
const colorInput = document.getElementById("color_input")
const colorInputValue = document.getElementById("color_input_value")
const sidebar = document.getElementById("sidebar")
const eraserWidthInput = document.getElementById("eraser_width")
const backgroundColorInput = document.getElementById("background_color_input")
const mousePositionText = document.querySelector('.mouse__position')


var ctx = canvas.getContext('2d');

resize();
ctx.fillStyle = "#fff";
ctx.fillRect(0, 0, canvas.width, canvas.height);

let isDrawinging = true;
let isDrawingingACircle = false;
let isDragingObject = false;
let isErasing = false;
let colorDraw = '#000';

let lineWidth = 3;
let eraserSize = 10;
let mousePosition = { x: 0, y: 0 };

var startX;
var startY;
var isDown=false;


window.addEventListener('resize', resize);
canvas.addEventListener('mousedown', (e) => {
    handleMouseDown(e)
    setPosition(e)
});
canvas.addEventListener('mouseenter', setPosition);
canvas.addEventListener('mousemove', (e)=> {
    mousePositionText.textContent = `${e.clientX}, ${ e.clientY}`
    changeCursorType('crosshair')
    selectAction(e)
});



sidebar.addEventListener('mousemove', (e)=> {
    changeCursorType('default')
});

// floatingMenu.addEventListener('mousemove', (e)=> {
//     changeCursorType('default')
// });

colorInput.addEventListener('change', (e) => {
    colorDraw = colorInput.value;
    colorInputValue.textContent = colorInput.value
});

eraserWidthInput.addEventListener('change', (e) => {
    eraserSize = eraserWidthInput.value;
});

backgroundColorInput.addEventListener('change', changeCanvasBackgrounColor)

function changeCanvasBackgrounColor() {
    document.getElementById('backgroundColorValue').textContent = backgroundColorInput.value
    ctx.fillStyle = backgroundColorInput.value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function selectAction(e) {
    if (isErasing) {
        deleteDraw(e)
    } else if (isDrawinging) {
        draw(e)
    }
}

function setPosition(e) {
    const rect = canvas.getBoundingClientRect();
    mousePosition.x = e.clientX - rect.left;
    mousePosition.y = e.clientY - rect.top;
}

function resize() {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    changeCanvasBackgrounColor()
}

function draw(e) {
    if (e.buttons !== 1) {
        return
    };

    ctx.beginPath(); // start

    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.strokeStyle = colorDraw;

    ctx.moveTo(mousePosition.x, mousePosition.y); // start
    setPosition(e);
    ctx.lineTo(mousePosition.x, mousePosition.y); // end

    ctx.stroke(); // draw
}

function drawCircle(){
    ctx.beginPath();
    ctx.arc(400, 75, 50, 0, 2 * Math.PI);
    ctx.stroke();
}

function drawRectangle(){
		
}

function addStyleToSelectedOptionInMenu(elementId) {
    const thereIsAnExistingClass = document.querySelector(".floating__menu-box-select")
    if(thereIsAnExistingClass){
        thereIsAnExistingClass.classList.remove('floating__menu-box-select')
    }
    
    document.querySelector(`#${elementId}`).classList.add('floating__menu-box-select')
}

function changeCurrentMenuOption(optionToDraw) {
    isDrawinging = optionToDraw;
    isErasing = !optionToDraw;
    const idOfTheOptionSelectedInTheMenu = optionToDraw ? "pencil" : "eraser"

    addStyleToSelectedOptionInMenu(idOfTheOptionSelectedInTheMenu)
}

function deleteDraw(event) {
    if (event.buttons !== 1) return

    setPosition(event)
    ctx.clearRect(mousePosition.x, mousePosition.y, eraserSize, eraserSize);
}

function changeLineWidth(width) {
    lineWidth = width;
    changeCurrentMenuOption(true)
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    changeCanvasBackgrounColor()
}

function saveDraw() {
    var canvasDataURL = canvas.toDataURL();
    var a = document.createElement('a');
    a.href = canvasDataURL;
    a.download = 'drawing';
    a.click();
}

function changeCursorType(cursor) {
    document.body.style.cursor = cursor
}

function selectDrawCircle(){
    isDrawinging = false;
    isDrawingingACircle = true;
    isErasing = false
}

function handleMouseDown(e){
    e.preventDefault();
    e.stopPropagation();
    startX=parseInt(e.clientX-mousePosition.x);
    startY=parseInt(e.clientY-mousePosition.y);
    isDown=true;
}