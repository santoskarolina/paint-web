const drawCanvas = document.getElementById("draw__canvas")
const circleShape = document.getElementById("circle-shap")
const colorInput = document.getElementById("color_input")
const lineWidthInput = document.getElementById("lineWidth")

var ctx = drawCanvas.getContext('2d');
resize();


let isDrawingOnMouse = true;
let isDrawingACircle = false;
let colorDraw = '#c0392b';
let lineWidth = 5;


var mousePosition = { x: 0, y: 0 };

window.addEventListener('resize', resize);
document.addEventListener('mousedown', setPosition);
document.addEventListener('mouseenter', setPosition);
document.addEventListener('mousemove', drawing);

circleShape.addEventListener('click', enableMouseMove);

colorInput.addEventListener('change', (e) => {
    colorDraw = colorInput.value;
});

lineWidthInput.addEventListener('change', (e) => {
    lineWidth = lineWidthInput.value;
});

function setPosition(e) {
    mousePosition.x = e.clientX;
    mousePosition.y = e.clientY;
}

function resize() {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
}

function drawing(e) {
    if (isDrawingOnMouse) {
        draw(e)
    } else {
        drawCircle(e)
    }
}

function draw(e) {
    if (e.buttons !== 1) return;

    if (isDrawingOnMouse) {
        ctx.beginPath(); // start

        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round';
        ctx.strokeStyle = colorDraw;

        ctx.moveTo(mousePosition.x, mousePosition.y); // start
        setPosition(e);
        ctx.lineTo(mousePosition.x, mousePosition.y); // end

        ctx.stroke(); // draw
    }
}

function enableMouseMove() {
    isDrawingACircle = true;
    isDrawingOnMouse = false
}

function drawCircle(e) {
}