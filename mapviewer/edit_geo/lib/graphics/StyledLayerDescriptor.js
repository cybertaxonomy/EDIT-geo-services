function StyleLayerDescriptor(style){
this.style=style;
}
StyleLayerDescriptor.prototype.hiliteShape=function(gr,shape,symbolizer){
this.getStyleAttributes(symbolizer);
if(symbolizer=="sld:PointSymbolizer"){
var externalGraphic=this.style.selectSingleNode("sld:PointSymbolizer/sld:Graphic/sld:ExternalGraphic");
if(externalGraphic!=null){
var href=this.style.selectSingleNode("sld:PointSymbolizer/sld:Graphic/sld:ExternalGraphic/sld:OnlineResource");
gr.swapImage(shape,href.attributes.getNamedItem("xlink:href").nodeValue)
return;
}
}
if(this.strokeColor!=null){ 
gr.setShapeStrokeColor(shape,this.strokeColor);
}else{
}
if(this.strokeWidth!=null){
gr.setShapeStrokeWidth(shape,this.strokeWidth);
}
if(this.fillColor!=undefined){
gr.setShapeFillColor(shape,this.fillColor);
}else{
}
}
StyleLayerDescriptor.prototype.hilitePoint=function(gr,shape){
this.hiliteShape(gr,shape,"sld:PointSymbolizer");
}
StyleLayerDescriptor.prototype.paintPoint=function(gr,coords){
var shape=null;
var X=coords[0];
var Y=coords[1];
var size=0;
var dx=0;
var dy=0;
var height=0;
var width=0;
this.getStyleAttributes("sld:PointSymbolizer");
var sizeNode=this.style.selectSingleNode("sld:PointSymbolizer/sld:Graphic/sld:Size");
if(sizeNode!=null){
size=sizeNode.firstChild.nodeValue;
width=size;
height=size;
}else{
widthNode=this.style.selectSingleNode("sld:PointSymbolizer/sld:Graphic/sld:Width");
if(widthNode!=null)
width=widthNode.firstChild.nodeValue;
heightNode=this.style.selectSingleNode("sld:PointSymbolizer/sld:Graphic/sld:Height");
if(heightNode!=null)
height=heightNode.firstChild.nodeValue;
}
var displacementNode=this.style.selectSingleNode("sld:PointSymbolizer/sld:Graphic/sld:Displacement");
if(displacementNode!=null){
dx=parseInt(this.style.selectSingleNode("sld:PointSymbolizer/sld:Graphic/sld:Displacement/sld:DisplacementX").firstChild.nodeValue);
dy=parseInt(this.style.selectSingleNode("sld:PointSymbolizer/sld:Graphic/sld:Displacement/sld:DisplacementY").firstChild.nodeValue);
}
var externalGraphic=this.style.selectSingleNode("sld:PointSymbolizer/sld:Graphic/sld:ExternalGraphic");
if(externalGraphic!=null){
var href=this.style.selectSingleNode("sld:PointSymbolizer/sld:Graphic/sld:ExternalGraphic/sld:OnlineResource");
shape=gr.drawImage(href.attributes.getNamedItem("xlink:href").nodeValue,X,Y,width,height,dx,dy)
}else{ 
var pointTypeNode=this.style.selectSingleNode("sld:PointSymbolizer/sld:Graphic/sld:Mark/sld:WellKnownName")
if(pointTypeNode!=null){
pointType=pointTypeNode.firstChild.nodeValue;
this.getStyleAttributes("sld:PointSymbolizer/sld:Graphic/sld:Mark");
if(this.strokeColor!=null) 
gr.setStrokeColor(this.strokeColor);
if(this.strokeWidth!=null)
gr.setStrokeWidth(this.strokeWidth);
if(this.fillColor!=null)
gr.setFillColor(this.fillColor);
if(pointType=="circle"){ 
shape=gr.fillCircle(X,Y,size); 
}else if(pointType=="square"){
}else if(pointType=="triangle"){
}else if(pointType=="cross"){
}else if(pointType=="star"){
}
}
}
return shape;
}
StyleLayerDescriptor.prototype.hiliteLine=function(gr,shape){
this.hiliteShape(gr,shape,"sld:LineSymbolizer")
}
StyleLayerDescriptor.prototype.paintLine=function(gr,coords){
var xPoints=new Array(coords.length);
var yPoints=new Array(coords.length);
for(var i=0;i<coords.length;i++){
point=coords[i]
xPoints[i]=parseInt(point[0])
yPoints[i]=parseInt(point[1])
}
this.getStyleAttributes("sld:LineSymbolizer");
if(this.strokeColor!=null){
gr.setStrokeColor(this.strokeColor);
}
if(this.strokeWidth!=null){
gr.setStrokeWidth(this.strokeWidth);
}
var shape=gr.drawPolyline(xPoints,yPoints);
return shape;
}
StyleLayerDescriptor.prototype.hilitePolygon=function(gr,shape){
this.hiliteShape(gr,shape,"sld:PolygonSymbolizer");
}
StyleLayerDescriptor.prototype.paintPolygon=function(gr,coords){
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
var shape=gr.drawPolygon(xPoints,yPoints);
return shape;
}
StyleLayerDescriptor.prototype.getStyleAttributes=function(path){
this.strokeColor="#ff0000";
this.strokeWidth="1";
this.fillColor="#00ff00";
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
