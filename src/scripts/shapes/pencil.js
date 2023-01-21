export class PencilShape{
    constructor(end, color) {
        this.end = end;
        this.color = color;
    }

    draw(ctx){
        ctx.strokeStyle = this.color;
        ctx.lineTo(this.end.X, this.end.Y);
        ctx.stroke();
    }
}