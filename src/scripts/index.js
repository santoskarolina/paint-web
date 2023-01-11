export const canvas = document.getElementById("draw__canvas")

const colorInput = document.getElementById("color_input")
const colorInputValue = document.getElementById("color_input_value")
const eraserWidthInput = document.getElementById("eraser_width")
const mousePositionText = document.querySelector('.mouse__position')
const toolbar = document.getElementById('toolbar')

const lineWidthBox = document.querySelectorAll(".sidebar__box-lineWidth")
const saveImageButton = document.getElementById('save-draw')
const toolBtns = document.querySelectorAll(".tool")
const fillShapes = document.getElementById('fill_shapes')


let prevMouseX, prevMouseY, snapshot;
var selectedTool = "pencil"
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

    ctx.putImageData(snapshot, 0, 0); // 
    
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



export function drawCircle (e) {
    ctx.beginPath(); 
    let radius = Math.sqrt(Math.pow((prevMouseX - e.offsetX), 2) + Math.pow((prevMouseY - e.offsetY), 2));
    ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI); 
    fillShapes.checked ? ctx.fill() : ctx.stroke();
}

export function drawRect  (e)  {
    if(!fillShapes.checked) {
        return ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
    }
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