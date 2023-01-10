import { changeToTypeText, canvas , mousePosition, ctx, colorDraw} from './index.js'

const textContainer = document.getElementById('draw-text')
const textDrawbutton = document.getElementById('text-draw-button')


let textPositions;

textDrawbutton.addEventListener('click', drawText)
export function drawText(){
    changeToTypeText(true);
}

export function setPositionOfTextArea(e){
    textPositions = mousePosition
    textContainer.style.top = mousePosition.y-canvas.clientHeight + 'px'
    textContainer.style.display = 'flex'
    textContainer.style.left = canvas.clientWidth-mousePosition.x + 'px'
}


textContainer.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        drawTextOnCanvas()
    }
});

export function drawTextOnCanvas(){
    ctx.font = "30px Lato";
    ctx.fillStyle = colorDraw;
    ctx.textAlign = "center";
    ctx.fillText(textContainer.value, textPositions.x, textPositions.y);
}