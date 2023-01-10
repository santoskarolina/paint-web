import { drawCircle, drawRect, drawTriangle } from "./drawShapes"

export const canvas = document.getElementById("draw__canvas")

export const colorInput = document.getElementById("color_input")
export const colorInputValue = document.getElementById("color_input_value")
export const eraserWidthInput = document.getElementById("eraser_width")
export const mousePositionText = document.querySelector('.mouse__position')
export const toolbar = document.getElementById('toolbar')

const lineWidthBox = document.querySelectorAll(".sidebar__box-lineWidth")
const saveImageButton = document.getElementById('save-draw')
const toolBtns = document.querySelectorAll(".tool")


export let prevMouseX, prevMouseY, snapshot;
export var selectedTool = "pencil"
export var ctx = canvas.getContext('2d');

window.addEventListener("load", () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
});

let isDrawing = false;
export let colorDraw = '#000';

let lineWidth = 3;
let eraserSize = 10;
export let mousePosition = { x: 0, y: 0 };

window.addEventListener('resize', resize);


lineWidthBox.forEach(element => {
    element.addEventListener('click', (e) => {
        lineWidth = element.id;
    });
})

function selectAction(e) {
    if(!isDrawing) return;

    if(selectedTool === "circle"){
        drawCircle(e);
    }else if(selectedTool == "pencil" || selectedTool === "eraser"){
        ctx.strokeStyle = selectedTool === "eraser" ? "#fff" : colorInput;
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke(); 
    }else if(selectedTool === "rectangle"){
        drawRect(e);
    } else {
        drawTriangle(e);
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
}

function addStyleToSelectedOptionInMenu(elementId) {
    const thereIsAnExistingClass = document.querySelector(".floating__menu-box-select")
    if(thereIsAnExistingClass){
        thereIsAnExistingClass.classList.remove('floating__menu-box-select')
    }
    
    document.querySelector(`#${elementId}`).classList.add('floating__menu-box-select')
}


function deleteDraw(event) {
    if (event.buttons !== 1) return

    setPosition(event)
    ctx.clearRect(mousePosition.x, mousePosition.y, eraserSize, eraserSize);
}

function changeCursorType(cursor) {
    document.body.style.cursor = cursor
}

const startDraw = (e) => {
    isDrawing = true;
    prevMouseX = e.offsetX; 
    prevMouseY = e.offsetY; 
    ctx.beginPath();
    ctx.lineWidth = lineWidth; 
    ctx.strokeStyle = colorInput;
    ctx.fillStyle = colorInput;
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
        selectedTool = btn.id;
    });
});


canvas.addEventListener('mousedown', startDraw);

// canvas.addEventListener('mouseenter', setPosition);

canvas.addEventListener('mousemove', (e)=> {
    mousePositionText.textContent = `${e.clientX}, ${ e.clientY}`
    changeCursorType('crosshair')
    selectAction(e)
});

canvas.addEventListener("mouseup", () => isDrawing = false);


saveImageButton.addEventListener("click", () => {
    const link = document.createElement("a"); 
    link.download = `${Date.now()}.jpg`; 
    link.href = canvas.toDataURL();
    link.click();
});