export const canvas = document.getElementById("draw__canvas")

export const colorInput = document.getElementById("color_input")
export const colorInputValue = document.getElementById("color_input_value")
export const eraserWidthInput = document.getElementById("eraser_width")
export const mousePositionText = document.querySelector('.mouse__position')
export const toolbar = document.getElementById('toolbar')

const lineWidthThree = document.getElementById("lineWidthTen")
const lineWidthFive = document.getElementById("lineWidthFive")
const lineWidthTen = document.getElementById("lineWidthTen")

export var currentToolbarOption = '';

export var ctx = canvas.getContext('2d');
resize();

let isDrawinging = true;
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

export function addEventToLine(){
    setTimeout(() => {
        lineWidthThree.addEventListener('click', (e) => {
            changeLineWidth(3);
        });
        
        lineWidthFive.addEventListener('click', (e) => {
            changeLineWidth(5);
        })
        
        lineWidthTen.addEventListener('click', (e) => {
            changeLineWidth(10);
        });
    }, 500)
}

// function changeCanvasBackgrounColor() {
//     document.getElementById('backgroundColorValue').textContent = backgroundColorInput.value
//     ctx.fillStyle = backgroundColorInput.value;
//     ctx.fillRect(0, 0, canvas.width, canvas.height);
// }

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

export function changeCurrentMenuOption(optionToDraw) {
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
    startX = parseInt(e.clientX-mousePosition.x);
    startY = parseInt(e.clientY-mousePosition.y);
    isDown = true;
}

