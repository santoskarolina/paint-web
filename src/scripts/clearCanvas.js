import { ctx, canvas } from './index'

const deleteDraw = document.getElementById('delete-draw')

deleteDraw.addEventListener('click', clearCanvas);

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}