export class TringleShape{

    constructor(start, end, isFill) {
        this.start = start;
        this.end = end;
        this.isFill = isFill;
     }

     draw(ctx){
        ctx.beginPath(); 
        ctx.moveTo(this.start.X, this.start.Y); 
        ctx.lineTo(this.end.X, this.end.Y);
        ctx.lineTo(this.start.X * 2 - this.end.X, this.end.Y);
        ctx.closePath();
        this.isFill ? ctx.fill() : ctx.stroke();
    }
}