mapbuilder.loadScript(baseDir+"/util/Util.js");
function SVGGraphics(id,div,width,height){
var svg=document.getElementById('svg_element');
if(svg==null){
svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
svg.setAttribute('id',"svg_element");
svg.setAttribute('width',width);
svg.setAttribute('height',height);
if(div!=null)
div.appendChild(svg);
}
this.svg=svg;
return this;
}
SVGGraphics.prototype.setStrokeColor=function(x){
this.strokeStyle=x;
}
SVGGraphics.prototype.setStrokeWidth=function(x){
this.strokeWeight=x;
}
SVGGraphics.prototype.setFillColor=function(x){
this.fillStyle=x;
}
SVGGraphics.prototype.setShapeStrokeColor=function(shape,x){
shape.setAttribute("stroke",x);
}
SVGGraphics.prototype.setShapeStrokeWidth=function(shape,x){
shape.setAttribute("stroke-width",x);
}
SVGGraphics.prototype.setShapeFillColor=function(shape,x){
shape.fill=x;
}
SVGGraphics.prototype.drawPolyline=function(Xpoints,Ypoints){
var length=Xpoints.length;
var pts=Xpoints[0]+","+Ypoints[0];
for(var i=1;i<length;i++){
pts+=","+Xpoints[i]+","+Ypoints[i];
}
var element=document.createElementNS('http://www.w3.org/2000/svg',"polyline");
element.setAttribute("points",pts);
if(this.strokeStyle)
element.setAttribute("stroke",this.strokeStyle);
element.setAttribute("fill",'none'); 
this.svg.appendChild(element);
return element;
}
SVGGraphics.prototype.drawPolygon=function(Xpoints,Ypoints){
var element=this.drawPolyline(Xpoints,Ypoints);
return element;
}
SVGGraphics.prototype.fillPolygon=function(Xpoints,Ypoints){
this.drawPolygon(Xpoints,Ypoints);
this.fill();
}
SVGGraphics.prototype.drawCircle=function(X,Y,radius){
}
SVGGraphics.prototype.fillCircle=function(X,Y,radius){
var element=document.createElementNS('http://www.w3.org/2000/svg',"circle");
element.setAttribute("cx",X)
element.setAttribute("cy",Y)
element.setAttribute("r",radius)
if(this.strokeStyle)
element.setAttribute("stroke",this.strokeStyle);
if(this.fillStyle)
element.setAttribute("fill",this.fillStyle)
this.svg.appendChild(element);
return element;
}
SVGGraphics.prototype.drawImage=function(src,X,Y,width,height,dx,dy){
var element=document.createElementNS('http://www.w3.org/2000/svg',"image");
element.setAttributeNS('http://www.w3.org/1999/xlink','href',src)
var posX=X-dx;
var posY=Y-dy;
element.setAttribute("x",posX);
element.setAttribute("y",posY);
if(width!=0)
element.setAttribute("width",width);
if(height!=0)
element.setAttribute("height",height);
this.svg.appendChild(element);
return element;
} 
SVGGraphics.prototype.swapImage=function(element,src){
element.setAttributeNS('http://www.w3.org/1999/xlink','href',src)
}
SVGGraphics.prototype.paint=function(){
}
