export class CircleShape{
    constructor(start, end, fillColor, isFill) {
        this.start = start;
        this.end = end;
        this.fillColor = fillColor;
        this.isFill = isFill;
        this.radius = Math.sqrt(Math.pow((start.X -end.X), 2) + Math.pow((start.Y - end.Y), 2));
     }

    draw(ctx){
        ctx.beginPath(); 
        ctx.arc(this.start.X, this.start.Y, this.radius, 0, 2 * Math.PI); 
       this.isFill ? ctx.fill() : ctx.stroke();
    }
}