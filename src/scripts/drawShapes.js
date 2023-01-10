import { prevMouseY, ctx, prevMouseX} from './index.js'


export function drawCircle (e) {
    ctx.beginPath(); 
    let radius = Math.sqrt(Math.pow((prevMouseX - e.offsetX), 2) + Math.pow((prevMouseY - e.offsetY), 2));
    ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI); 
    ctx.fill();
}

export function drawRect  (e)  {
    ctx.fillRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
}

export function drawTriangle (e)  {
    ctx.beginPath(); 
    ctx.moveTo(prevMouseX, prevMouseY); 
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY);
    ctx.closePath();
    ctx.fill()
}