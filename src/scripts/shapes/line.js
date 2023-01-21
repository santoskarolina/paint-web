export class LineShape{

    constructor(start, end) {
       this.start = start;
       this.end = end;
    }

    draw(ctx){
        ctx.beginPath(); 
        ctx.moveTo(this.start.X, this.start.Y); 
        ctx.lineTo(this.end.X, this.end.Y);
        ctx.closePath();
        ctx.stroke()
    }
}
