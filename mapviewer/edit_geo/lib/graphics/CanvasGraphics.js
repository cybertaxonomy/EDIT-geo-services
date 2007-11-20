function CanvasGraphics(id,div){
this.div=div;
var canvas=document.createElement("canvas");
canvas.setAttribute("width","800px")
canvas.setAttribute("height","400px");
canvas.setAttribute("style","position: absolute; top: 0pt; left: 0pt; width: 800px; height: 400px");
div.appendChild(canvas);
var context=canvas.getContext('2d');
this.context=context;
return this;
}
CanvasGraphics.prototype.setStroke=function(x){
this.context.strokeStyle=x;
}
CanvasGraphics.prototype.setColor=function(value){
this.context.fillStyle=value
this.context.strokeStyle=value
} 
CanvasGraphics.prototype.drawPolyline=function(Xpoints,Ypoints){
var length=Xpoints.length;
this.context.beginPath();
this.context.moveTo(Xpoints[0],Ypoints[0]);
for(var i=1;i<length;i++){
this.context.lineTo(Xpoints[i],Ypoints[i]);
}
this.context.stroke();
}
CanvasGraphics.prototype.drawPolygon=function(Xpoints,Ypoints){
this.drawPolyLine(Xpoints,Ypoints);
this.context.closePath();
}
CanvasGraphics.prototype.fillPolygon=function(Xpoints,Ypoints){
this.drawPolygon(Xpoints,Ypoints);
this.context.fill();
}
CanvasGraphics.prototype.drawCircle=function(X,Y,radius){
this.context.beginPath();
this.context.arc(X,Y,radius,0,Math.PI*2.0,true); 
}
CanvasGraphics.prototype.fillCircle=function(X,Y,radius){
this.drawCircle(X,Y,radius);
this.context.fill();
}
CanvasGraphics.prototype.drawImage=function(src,X,Y,width,height){
} 
CanvasGraphics.prototype.paint=function(){
}
