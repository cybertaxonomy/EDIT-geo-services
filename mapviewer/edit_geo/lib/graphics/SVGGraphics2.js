mapbuilder.loadScript(baseDir+"/util/Util.js");
function SVGGraphics2(id,div,width,height){
var svg=document.getElementById(id+'svg');
if(svg==null){
svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
svg.setAttribute('id',id+"svg");
svg.setAttribute('width',width);
svg.setAttribute('height',height);
if(div!=null)
div.appendChild(svg);
}
this.svg=svg;
return this;
}
SVGGraphics2.prototype.getGroupTag=function(parentNode,id){
tag=document.getElementById(id);
if(!tag){
tag=document.createElementNS('http://www.w3.org/2000/svg','g');
tag.setAttribute('id',id);
if(!parentNode)parentNode=this.svg;
parentNode.appendChild(tag);
}
return tag;
}
SVGGraphics2.prototype.setStrokeColor=function(x){
}
SVGGraphics2.prototype.setStrokeWidth=function(x){
}
SVGGraphics2.prototype.setFillColor=function(x){
}
SVGGraphics2.prototype.setShapeStrokeColor=function(shape,x){
shape.setAttribute("stroke",x);
}
SVGGraphics2.prototype.setShapeStrokeWidth=function(shape,x){
shape.setAttribute("stroke-width",x);
}
SVGGraphics2.prototype.setShapeFillColor=function(shape,x){
shape.setAttribute("fillColor",x);
}
SVGGraphics2.prototype.setShapeFill=function(shape,x){
shape.setAttribute("fill",x);
}
SVGGraphics2.prototype.drawPolyline=function(Xpoints,Ypoints,node){
var length=Xpoints.length;
var pts=Xpoints[0]+","+Ypoints[0];
for(var i=1;i<length;i++){
pts+=","+Xpoints[i]+","+Ypoints[i];
}
var element=document.createElementNS('http://www.w3.org/2000/svg',"polyline");
element.setAttribute("points",pts);
node.appendChild(element);
return element;
}
SVGGraphics2.prototype.drawPolygon=function(Xpoints,Ypoints,node){
var element=this.drawPolyline(Xpoints,Ypoints,node);
return element;
}
SVGGraphics2.prototype.fillPolygon=function(Xpoints,Ypoints){
this.drawPolygon(Xpoints,Ypoints);
this.fill();
}
SVGGraphics2.prototype.drawCircle=function(X,Y,radius){
}
SVGGraphics2.prototype.fillCircle=function(X,Y,radius,node){
var element=document.createElementNS('http://www.w3.org/2000/svg',"circle");
element.setAttribute("cx",X)
element.setAttribute("cy",Y)
element.setAttribute("r",radius)
node.appendChild(element);
return element;
}
SVGGraphics2.prototype.drawImage=function(src,X,Y,width,height,dx,dy){
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
SVGGraphics2.prototype.swapImage=function(element,src){
element.setAttributeNS('http://www.w3.org/1999/xlink','href',src)
}
SVGGraphics2.prototype.paint=function(){
}
