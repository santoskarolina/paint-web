export class EllipseShape{

    constructor(start, end, fillColor, isFill){
        this.start = start;
        this.end = end;
        this.fillColor = fillColor;
        this.isFill = isFill;
        this.angle = 0;
        this.radiusX = Math.abs(end.x-start.x);
        this.radiusY = Math.abs(end.y-start.y);
    }

    draw(ctx){
        ctx.beginPath();
        ctx.ellipse(this.start.x, this.start.y, this.radiusX, this.radiusY, this.angle, 0, Math.PI * 2);
        ctx.stroke();
        if (this.isFill){
            ctx.fillStyle = this.fillColor;
            ctx.fill();
        }
    }
}