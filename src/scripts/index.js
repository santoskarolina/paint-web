const drawCanvas = document.getElementById("draw__canvas")
const circleShape = document.getElementById("circle-shap")
const colorInput = document.getElementById("color_input")
const lineWidthInput = document.getElementById("lineWidth")
const colorInputValue = document.getElementById("color_input_value")
const sidebar = document.getElementById("sidebar")
const eraser = document.getElementById("eraser")
const eraserWidthInput = document.getElementById("eraser_width")
const backgroundColorInput = document.getElementById("background_color_input")

var ctx = drawCanvas.getContext('2d');
var mouseTolerance = 5;

resize();
ctx.fillStyle = "#fff";
ctx.fillRect(0, 0, drawCanvas.width, drawCanvas.height);

let isDraw = false;
let isDrawingACircle = false;
let eraserOn = false;
let colorDraw = '#c0392b';

let lineWidth = 3;
let eraserSize = 10;
let mousePosition = { x: 0, y: 0 };

window.addEventListener('resize', resize);
drawCanvas.addEventListener('mousedown', setPosition);
drawCanvas.addEventListener('mouseenter', setPosition);
drawCanvas.addEventListener('mousemove', selectAction);


eraser.addEventListener('click', enableDeleteDraw);

colorInput.addEventListener('change', (e) => {
    colorDraw = colorInput.value;
    colorInputValue.textContent = colorInput.value
});

eraserWidthInput.addEventListener('change', (e) => {
    eraserSize = eraserWidthInput.value;
});

backgroundColorInput.addEventListener('change', changeCanvasBackgrounColor);

function changeCanvasBackgrounColor(){
    ctx.fillStyle = backgroundColorInput.value;
    ctx.fillRect(0, 0, drawCanvas.width, drawCanvas.height);
}

function selectAction(e) {
    if (eraserOn) {
        deleteDraw(e)
    } else if (isDraw) {
        draw(e)
    }
}

function setPosition(e) {
    const rect = drawCanvas.getBoundingClientRect();
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


function enablePencil(elementId) {
    enableMouse(true)
    changeCursorType("crosshair")
    document.querySelector(`#${elementId}`).classList.add('floating__menu-box-select')
}

function drawCircle(e) {
}

function enableDeleteDraw(event) {
    enableMouse(false)
    eraserOn = true;
    isDraw = false;
}

function deleteDraw(event) {
    if (event.buttons !== 1) return

    changeCursorType('none')
    setPosition(event)
    ctx.clearRect(mousePosition.x, mousePosition.y, eraserSize, eraserSize);
}

function enableMouse(enable) {
    isDraw = enable
    isDrawingACircle = !enable;
}

function changeLineWidth(width) {
    lineWidth = width;
    enablePencil('pencil')
}

function clearCanvas() {
    ctx.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
}

function saveDraw() {
    var canvasDataURL = drawCanvas.toDataURL();
    var a = document.createElement('a');
    a.href = canvasDataURL;
    a.download = 'drawing';
    a.click();
}

function changeCursorType(cursor){
    document.body.style.cursor = cursor
}