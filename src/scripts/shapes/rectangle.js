export class RectangleShape{

    constructor(start, end, isFill) {
        this.start = start;
        this.end = end;
        this.isFill = isFill;
    }

     draw(ctx){
        if(this.isFill){
            ctx.fillRect(this.end.X, this.end.Y, this.start.X - this.end.X, this.start.Y - this.end.Y);
        }else{
            ctx.strokeRect(this.end.X, this.end.Y, this.start.X - this.end.X, this.start.Y - this.end.Y);
        }
    }
}