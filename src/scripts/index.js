export const canvas = document.getElementById("draw__canvas")

const colorInput = document.getElementById("color_input")
const colorInputValue = document.getElementById("color_input_value")
const eraserWidthInput = document.getElementById("eraser_width")
const mousePositionText = document.querySelector('.mouse__position')
const toolbar = document.getElementById('toolbar')

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
});

window.addEventListener('resize', resize);

lineWidthElement.addEventListener('change', (e) => {
    lineWidth = lineWidthElement.value;
});

function selectAction(e) {
    if(!isDrawing) return;

    ctx.putImageData(snapshot, 0, 0); // 

    const tools = {
        circle: () => drawCircle(e),
        pencil: () => freeDraw(e),
        eraser: () => deleteDraw(e),
        rectangle: () => drawRect(e),
        triangle: () => drawTriangle(e),
        select_area :() => selectAreaOnCanvas(e),
        line: () => drawLine(e)
    }
    return tools[selectedTool]()
}

function drawLine(e){
    ctx.beginPath(); 
    ctx.moveTo(prevMouseX, prevMouseY); 
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.closePath();
    ctx.stroke()
}

function selectAreaOnCanvas(e){
    ctx.setLineDash([3]);
    ctx.lineWidth = 2;
    ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
}

function freeDraw(e){
    ctx.strokeStyle = colorInput;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
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
    ctx.putImageData(snapshot, 0, 0); // 
}

export function drawCircle (e) {
    ctx.beginPath(); 
    let radius = Math.sqrt(Math.pow((prevMouseX - e.offsetX), 2) + Math.pow((prevMouseY - e.offsetY), 2));
    ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI); 
    fillShapes.checked ? ctx.fill() : ctx.stroke();
}

export function drawRect  (e)  {
    if(!fillShapes.checked) {
        return drawNotFilledRect(e)
    }
    drawFilledRect(e)
}

 function drawNotFilledRect(e){
    ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
 }

 function drawFilledRect(e){
    ctx.fillRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
 }

export function drawTriangle (e)  {
    ctx.beginPath(); 
    ctx.moveTo(prevMouseX, prevMouseY); 
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY);
    ctx.closePath();
    fillShapes.checked ? ctx.fill() : ctx.stroke();
}

function deleteDraw(e) {
    ctx.lineWidth = eraserSize; 
    ctx.strokeStyle = "#fff";
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke(); 
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

toolbar.addEventListener('mousemove', (e)=> {
    changeCursorType('default')
});

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