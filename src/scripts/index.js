import { CircleShape } from "./shapes/circle"
import { EllipseShape } from "./shapes/ellipse"
import { Eraser } from "./shapes/eraser"
import { LineShape } from "./shapes/line"
import { PencilShape } from "./shapes/pencil"
import { RectangleShape } from "./shapes/rectangle"
import { TringleShape } from "./shapes/triangle"

export const canvas = document.getElementById("draw__canvas")

const colorInput = document.getElementById("color_input")
const colorInputValue = document.getElementById("color_input_value")
const eraserWidthInput = document.getElementById("eraser_width")
const mousePositionText = document.querySelector('.mouse__position')
// const toolbar = document.getElementById('toolbar')

const lineWidthElement = document.getElementById("lineWidth")
const saveImageButton = document.getElementById('save-draw')
const toolBtns = document.querySelectorAll(".tool")
const fillShapes = document.getElementById('fill_shapes')

export var ctx = canvas.getContext('2d');
let prevMouseX, prevMouseY, snapshot;
var selectedTool = "pencil"
let isDrawing = false;
export let colorDraw = '#000';
let lineWidth = 3;
let eraserSize = 10;
export let mousePosition = { x: 0, y: 0 };

window.addEventListener("load", () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    canvasBackgroundColor()
});

window.addEventListener('resize', resize);

lineWidthElement.addEventListener('change', (e) => {
    lineWidth = lineWidthElement.value;
});

function canvasBackgroundColor(){
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function selectAction(e) {
    if(!isDrawing) return;
    ctx.putImageData(snapshot, 0, 0); // 

    const tools = {
        circle: () => drawCircle(e),
        pencil: () => freeDraw(e),
        eraser: () => eraser(e),
        rectangle: () => drawRectangle(e),
        triangle: () => drawTriangle(e),
        select_area :() => selectAreaOnCanvas(e),
        line: () => drawLine(e),
        ellipse: () => drawEllipse(e),
    }
    return tools[selectedTool]()
}

function drawLine(e){
    let line  = new LineShape({X: prevMouseX, Y: prevMouseY},  { X: e.offsetX, Y: e.offsetY });
    line.draw(ctx);
}

function freeDraw(e){
    let pencil = new PencilShape({ X: e.offsetX, Y: e.offsetY }, colorInput);
    pencil.draw(ctx);
}

function drawEllipse(e){
    let ellipse = new EllipseShape({x: prevMouseX, y: prevMouseY},  { x: e.offsetX, y: e.offsetY },
        colorDraw,fillShapes.checked);
    ellipse.draw(ctx);
}

function drawCircle (e) {
    let circle = new CircleShape({X: prevMouseX, Y: prevMouseY},  { X: e.offsetX, Y: e.offsetY }, colorDraw, fillShapes.checked);
    circle.draw(ctx);
}

function drawRectangle  (e)  {
    let rectangle = new RectangleShape({X: prevMouseX, Y: prevMouseY},  { X: e.offsetX, Y: e.offsetY }, fillShapes.checked);
    rectangle.draw(ctx);
}

function drawTriangle (e)  {
    let triangle = new TringleShape({X: prevMouseX, Y: prevMouseY},  { X: e.offsetX, Y: e.offsetY }, fillShapes.checked);
    triangle.draw(ctx);
}

function selectAreaOnCanvas(e){
    ctx.setLineDash([3]);
    ctx.lineWidth = 2;
    ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
}

function setPosition(e) {
    const rect = canvas.getBoundingClientRect();
    mousePosition.x = e.clientX - rect.left;
    mousePosition.y = e.clientY - rect.top;
}

function resize() {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    document.querySelector('.canvas_size').textContent = `${canvas.width} x ${canvas.height}`
}

function eraser(e) {
    let eraser = new Eraser({X: e.offsetX, Y: e.offsetY}, eraserSize);
    eraser.draw(ctx);
}

function changeCursorType(cursor) {
    document.body.style.cursor = cursor
}

const startDraw = (e) => {
    isDrawing = true;
    prevMouseX = e.offsetX; 
    prevMouseY = e.offsetY; 
    ctx.beginPath();
    ctx.setLineDash([0]);
    ctx.lineWidth = lineWidth; 
    ctx.strokeStyle = colorDraw;
    ctx.fillStyle = colorDraw;
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
}

colorInput.addEventListener('change', (e) => {
    colorDraw = colorInput.value;
    colorInputValue.textContent = colorInput.value
});

eraserWidthInput.addEventListener('change', (e) => {
    eraserSize = eraserWidthInput.value;
});

toolBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector('.options .toolActive').classList.remove('toolActive')
        selectedTool = btn.id;
        btn.classList.add('toolActive')
    });
});

function handleClickOnCanvas(e){
    console.log(snapshot)
}

// canvas.addEventListener('mouseenter', setPosition);
canvas.addEventListener('mousedown', startDraw);
canvas.addEventListener('mousemove', handleMouseMove);
canvas.addEventListener("mouseup", () => isDrawing = false);
canvas.addEventListener("dblclick", handleClickOnCanvas);

function handleMouseMove(e){
    mousePositionText.textContent = `${e.clientX}, ${ e.clientY}`
    document.querySelector('.canvas_size').textContent = `${canvas.width} x ${canvas.height}`
    changeCursorType('crosshair')
    selectAction(e)
}

saveImageButton.addEventListener("click", () => {
    const link = document.createElement("a"); 
    link.download = `${Date.now()}.jpg`; 
    link.href = canvas.toDataURL();
    link.click();
});