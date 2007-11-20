function VMLGraphics2(id,div,width,heigth){
this.div=div;
this.width=width;
this.height=height;
return this;
}
VMLGraphics2.prototype.getGroupTag=function(parentNode,id){
tag=document.getElementById(id);
if(!tag){
tag=document.createElement("div");
tag.setAttribute('id',id);
if(!parentNode)parentNode=this.div;
parentNode.appendChild(tag);
}
return tag;
}
VMLGraphics2.prototype.setStrokeColor=function(x){
this.strokeStyle=x; 
}
VMLGraphics2.prototype.setStrokeWidth=function(x){
this.strokeWeight=x; 
}
VMLGraphics2.prototype.setFillColor=function(x){
this.fillStyle=x;
this.strokeStyle=x; 
}
VMLGraphics2.prototype.setShapeStrokeColor=function(shape,x){
shape.setAttribute("strokecolor",x);
}
VMLGraphics2.prototype.setShapeStrokeWidth=function(shape,x){
shape.setAttribute("strokeweight",x);
}
VMLGraphics2.prototype.setShapeFillColor=function(shape,x){
shape.setAttribute("fillcolor",x);
}
VMLGraphics2.prototype.setShapeFill=function(shape,x){
if(x=="none"){
shape.setAttribute("filled",false);
}else{
shape.setAttribute("filled",true);
}
}
VMLGraphics2.prototype.drawPolyline=function(Xpoints,Ypoints,node){
var length=Xpoints.length;
var points=Xpoints[0]+","+Ypoints[0];
for(var i=1;i<length;i++){
points+=","+Xpoints[i]+","+Ypoints[i];
}
var element=document.createElement("vml:polyline");
element.style.position="absolute";
element.style.width=""+this.width;
element.style.height=""+this.height;
element.filled="false";
element.strokecolor="#FF0000";
element.strokeweight="1";
element.points=points;
node.appendChild(element);
return element;
}
VMLGraphics2.prototype.drawPolygon=function(Xpoints,Ypoints,node){
return this.drawPolyline(Xpoints,Ypoints,node);
}
VMLGraphics2.prototype.fillPolygon=function(Xpoints,Ypoints){
var element=this.drawPolygon(Xpoints,Ypoints);
element.filled="true";
return element;
}
VMLGraphics2.prototype.drawCircle=function(X,Y,radius){
alert("VMLGraphics2.drawCircle");
var diameter=radius*2;
var element=document.createElement("vml:oval");
var xOffset=X-radius;
var yOffset=Y-radius;
element.style.position="relative";
element.style.left=xOffset;
element.style.top=yOffset;
element.style.width='6';element.style.height='6'; 
element.strokecolor=this.strokeStyle;
element.strokeweigth="1pt";
this.div.appendChild(element);
return element;
}
VMLGraphics2.prototype.fillCircle=function(X,Y,radius){
var diameter=radius*2;
var element=document.createElement("vml:oval");
var xOffset=X-radius;
var yOffset=Y-radius;
element.style.position="relative";
element.style.left=xOffset;
element.style.top=yOffset;
element.style.width=diameter;
element.style.height=diameter;
element.fillcolor="#00FF00";
element.strokecolor="#00FF00"; 
this.div.appendChild(element);
return element;
}
VMLGraphics2.prototype.drawImage=function(src,X,Y,width,height,dx,dy){
var posX=X-dx;
var posY=Y-dy;
var element=document.createElement("vml:rect");
element.style.position="absolute";
element.style.left=posX;
element.style.top=posY;
if(width!=null)
element.style.width=width;
if(height!=null)
element.style.height=height;
element.filled="false";
element.stroked="false";
var imagedata=document.createElement("vml:imagedata");
imagedata.src=src;
element.appendChild(imagedata);
this.div.appendChild(element);
return element;
} 
VMLGraphics2.prototype.swapImage=function(element,src){
var imagedata=element.firstChild
imagedata.src=src
}
VMLGraphics2.prototype.paint=function(){
}
