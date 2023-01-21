export class Eraser{
    constructor(end, size) {
        this.end = end;
        this.size = size;
    }

    draw(ctx){
        ctx.lineWidth = this.size; 
        ctx.strokeStyle = "#fff";
        ctx.lineTo(this.end.X, this.end.Y);
        ctx.stroke(); 
    }
}