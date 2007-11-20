function SldRenderer(style){
this.style=style;
}
SldRenderer.prototype.paint=function(gr,coords,node,gmlType){
switch(gmlType){
case "gml:Point":
shape=this.paintPoint(gr,coords[0],node);
break;
case "gml:LineString":
shape=this.paintLine(gr,coords,node);
break;
case "gml:Polygon":
case "gml:LinearRing":
case "gml:Box":
case "gml:Envelope":
shape=this.paintPolygon(gr,coords,node);
break;
}
}
SldRenderer.prototype.paintPoint=function(gr,coords,node){
radius=2
shape=gr.fillCircle(coords[0],coords[1],radius,node);
return shape;
}
SldRenderer.prototype.paintLine=function(gr,coords,node){
var xPoints=new Array(coords.length);
var yPoints=new Array(coords.length);
for(var i=0;i<coords.length;i++){
point=coords[i]
xPoints[i]=parseInt(point[0])
yPoints[i]=parseInt(point[1])
}
this.getStyleAttributes("sld:LineSymbolizer");
var shape=gr.drawPolyline(xPoints,yPoints,node);
return shape;
}
SldRenderer.prototype.paintPolygon=function(gr,coords,node){
var xPoints=new Array(coords.length+1);
var yPoints=new Array(coords.length+1);
for(var i=0;i<coords.length;i++){
point=coords[i]
xPoints[i]=parseInt(point[0])
yPoints[i]=parseInt(point[1])
}
xPoints[i]=xPoints[0];
yPoints[i]=yPoints[0];
this.getStyleAttributes("sld:PolygonSymbolizer");
if(this.strokeColor!=null){
gr.setStrokeColor(this.strokeColor);
}
if(this.strokeWidth!=null){
gr.setStrokeWidth(this.strokeWidth);
}
if(this.fillColor!=null){
gr.setFillColor(this.fillColor);
}
var shape=gr.drawPolygon(xPoints,yPoints,node);
return shape;
}
SldRenderer.prototype.setStyle=function(gr,element,gmlType){
this.getStyleAttributes("tbd");
gr.setShapeStrokeColor(element,this.strokeColor);
gr.setShapeStrokeWidth(element,this.strokeWidth);
gr.setShapeFillColor(element,this.fillColor);
gr.setShapeFill(element,this.fill);
}
SldRenderer.prototype.getStyleAttributes=function(path){
this.strokeColor="#ff0000";
this.strokeWidth="1";
this.fillColor="#00ff00";
this.fill="none";
if(this.style){
var node=this.style.selectSingleNode(path+"/sld:Stroke/sld:CssParameter[@name='stroke']");
if(node!=undefined){
this.strokeColor=node.firstChild.nodeValue;
}else{
this.strokeColor=null;
}
node=this.style.selectSingleNode(path+"/sld:Stroke/sld:CssParameter[@name='stroke-width']");
if(node!=undefined){
this.strokeWidth=node.firstChild.nodeValue;
}else{
this.strokeWidth=null;
}
node=this.style.selectSingleNode(path+"/sld:Fill/sld:CssParameter[@name='fill']");
if(node!=undefined){
this.fillColor=node.firstChild.nodeValue;
}else{
this.fillColor=null;
}
}
}
