mapbuilder.loadScript(baseDir+"/widget/WidgetBase.js");
mapbuilder.loadScript(baseDir+"/widget/MapContainerBase.js");
function MapPaneOL(widgetNode,model){
WidgetBase.apply(this,new Array(widgetNode,model));
MapContainerBase.apply(this,new Array(widgetNode,model));
var loadingSrc=widgetNode.selectSingleNode("mb:loadingSrc");
if(loadingSrc){
this.loadingSrc=config.skinDir+loadingSrc.firstChild.nodeValue;
}else{
this.loadingSrc=config.skinDir+"/images/Loading.gif";
}
this.model.addListener("refresh",this.paint,this);
this.model.addListener("hidden",this.hidden,this);
this.model.addListener("deleteLayer",this.deleteLayer,this);
this.model.addListener("moveLayerUp",this.moveLayerUp,this);
this.model.addListener("moveLayerDown",this.moveLayerDown,this);
}
MapPaneOL.prototype.paint=function(objRef,refresh){
if(!objRef.oLMap){
if(objRef.model.doc.selectSingleNode("//wmc:OWSContext"))
objRef.context="OWS";
else if(objRef.model.doc.selectSingleNode("//wmc:ViewContext"))
objRef.context="View";
else
alert("No context defines in config");
if(objRef.context=="OWS"){srs=objRef.model.doc.selectSingleNode("//ows:BoundingBox/@crs");srs=(srs)?srs.nodeValue:"";}
else{srs=objRef.model.doc.selectSingleNode("//wmc:BoundingBox").getAttribute("SRS");}
maxExtent=null;
maxResolution=null;
if(srs!="EPSG:4326"&&srs!="epsg:4326"){
maxExtent=objRef.widgetNode.selectSingleNode("mb:maxExtent");
maxExtent=(maxExtent)?maxExtent.firstChild.nodeValue.split(" "):null;
maxResolution=objRef.widgetNode.selectSingleNode("mb:maxResolution");
maxResolution=(maxResolution)?maxResolution.firstChild.nodeValue:null;
if(!maxExtent&&!maxResolution){
if(objRef.context=="OWS"){
bbox1=objRef.model.doc.selectSingleNode("//ows:BoundingBox/ows:LowerCorner");
bbox1=(bbox1)?bbox1.firstChild.nodeValue:"";
bbox2=objRef.model.doc.selectSingleNode("//ows:BoundingBox/ows:UpperCorner");
bbox2=(bbox2)?bbox2.firstChild.nodeValue:"";
bbox=(bbox1&&bbox2)?bbox1+" "+bbox2:null;
}
else{
var boundingBox=objRef.model.doc.selectSingleNode("/wmc:ViewContext/wmc:General/wmc:BoundingBox");
Bbox=new Array();
Bbox[0]=parseFloat(boundingBox.getAttribute("minx"));
Bbox[1]=parseFloat(boundingBox.getAttribute("miny"));
Bbox[2]=parseFloat(boundingBox.getAttribute("maxx"));
Bbox[3]=parseFloat(boundingBox.getAttribute("maxy"));
bbox=Bbox.join(" ");
}
maxExtent=bbox.split(" ");
if(objRef.context=="OWS"){
width=objRef.model.doc.selectSingleNode("//ows:Window/@width");width=(width)?width.nodeValue:"400";maxResolution=(maxExtent[2]-maxExtent[0])/width;
}
else{
width=objRef.model.doc.selectSingleNode("//wmc:Window/@width");width=(width)?width.nodeValue:"400";
}
}
maxExtent=(maxExtent)?new OpenLayers.Bounds(maxExtent[0],maxExtent[1],maxExtent[2],maxExtent[3]):null;
}
objRef.oLMap=new OpenLayers.Map(objRef.node,{controls:[]});
objRef.oLMap.Z_INDEX_BASE.Control=10000;
var toolbar=new OpenLayers.Control.EditingToolbar();
var navigation=new OpenLayers.Control.MouseDefaults();
var selection=new OpenLayers.Control.EditingAttributes();
toolbar.addTools([navigation,selection]);
objRef.oLMap.addControl(toolbar);
objRef.oLMap.addControl(selection);
objRef.oLMap.addControl(new OpenLayers.Control.PanZoom());
toolbar.setTool(navigation);
var layers=objRef.model.getAllLayers();
objRef.oLlayers=new Array();
for(var i=layers.length-1;i>=0;i--){
var service=layers[i].selectSingleNode("wmc:Server/@service");service=(service)?service.nodeValue:"";
var title=layers[i].selectSingleNode("wmc:Title");title=(title)?title.firstChild.nodeValue:"";
var name2=layers[i].selectSingleNode("wmc:Name");name2=(name2)?name2.firstChild.nodeValue:"";
if(objRef.context=="OWS"){
var href=layers[i].selectSingleNode("wmc:Server/wmc:OnlineResource/@xlink:href");href=(href)?href.firstChild.nodeValue:""; 
}
else
{var href=layers[i].selectSingleNode("wmc:Server/wmc:OnlineResource").getAttribute("xlink:href");
}
var format=layers[i].selectSingleNode("wmc:FormatList/wmc:Format");format=(format)?format.firstChild.nodeValue:"image/gif";
var vis=layers[i].selectSingleNode("@hidden");vis=(vis)?(vis.nodeValue!="1"):true;
var options=new Array();
options.visibility=vis;
options.isBaseLayer=(i==layers.length-1)?true:false;
options.buffer=1;
if(srs!="EPSG:4326"&&srs!="epsg:4326"){
options.maxExtent=maxExtent;
options.maxResolution=maxResolution;
options.projection=srs;
}
switch(service){
case "wms":
case "OGC:WMS":
objRef.oLlayers[name2]=new OpenLayers.Layer.WMS(
title,
href,
{
layers:name2,
transparent:"true",
format:format
},
options
);
objRef.oLMap.addLayers([objRef.oLlayers[name2]]);
break;
case "gml":
case "OGC:GML":
style=objRef.extractStyle(objRef,layers[i]);
if(style){
options.style=style;
}else{
options.style=new OpenLayers.Style.WebSafe(2*i+1);
}
objRef.oLlayers[name2]=new OpenLayers.Layer.GML(title,href,options);
objRef.oLMap.addLayer(objRef.oLlayers[name2]);
break;
default:
alert("MapPaneOL: No support for layer type="+service);
}
}
bbox=objRef.model.getBoundingBox();
objRef.oLMap.zoomToExtent(new OpenLayers.Bounds(bbox[0],bbox[1],bbox[2],bbox[3]));
}
}
MapPaneOL.prototype.extractStyle=function(objRef,node){
var style1=new OpenLayers.Style({
map:objRef.oLMap
});
var value;
var styleSet=false;
value=node.selectSingleNode(".//sld:Fill/sld:CssParameter[@name='fill']");
if(value){
style1.fillColor=value.firstChild.nodeValue;
styleSet=true;
}
value=node.selectSingleNode(".//sld:Fill/sld:CssParameter[@name='fill-opacity']");
if(value){
style1.fillOpacity=value.firstChild.nodeValue;
styleSet=true;
}
value=node.selectSingleNode(".//sld:Stroke/sld:CssParameter[@name='stroke']");
if(value){
style1.strokeColor=value.firstChild.nodeValue;
styleSet=true;
}
value=node.selectSingleNode(".//sld:Stroke/sld:CssParameter[@name='stroke-opacity']");
if(value){
style1.strokeOpacity=value.firstChild.nodeValue;
styleSet=true;
}
if(!styleSet)style1=null;
return style1;
}
MapPaneOL.prototype.hidden=function(objRef,layerName){
vis=objRef.model.getHidden(layerName)!="1";
if(objRef.oLlayers[layerName])objRef.oLlayers[layerName].setVisibility(vis);
}
MapPaneOL.prototype.getLayer=function(layerName){
return this.MapLayerMgr(layerName);
}
MapPaneOL.prototype.getLayerDivId=function(layerName){
return this.model.id+"_"+this.id+"_"+layerName;}
MapPaneOL.prototype.deleteLayer=function(objRef,layerName){
var imgDivId=objRef.getLayerDivId(layerName); 
if(imgDivId!=null){
var imgDiv=document.getElementById(imgDivId);
if(imgDiv!=null){
var outputNode=document.getElementById(objRef.outputNodeId);
outputNode.removeChild(imgDiv);
}
}
}
MapPaneOL.prototype.moveLayerUp=function(objRef,layerName){
var outputNode=document.getElementById(objRef.outputNodeId);
var imgDivId=objRef.getLayerDivId(layerName); 
var movedNode=document.getElementById(imgDivId);
var sibNode=movedNode.nextSibling;
if(!sibNode){
alert("can't move node past beginning of list:"+layerName);
return;
}
outputNode.insertBefore(sibNode,movedNode);
}
MapPaneOL.prototype.moveLayerDown=function(objRef,layerName){
var outputNode=document.getElementById(objRef.outputNodeId);
var imgDivId=objRef.getLayerDivId(layerName); 
var movedNode=document.getElementById(imgDivId);
var sibNode=movedNode.previousSibling;
if(!sibNode){
alert("can't move node past end of list:"+layerName);
return;
}
outputNode.insertBefore(movedNode,sibNode);
}
MapPaneOL.prototype.clearWidget2=function(objRef){
objRef.MapLayerMgr.deleteAllLayers();
}
