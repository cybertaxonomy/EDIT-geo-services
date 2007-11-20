mapbuilder.loadScript(baseDir+"/graphics/WmsLayer.js");
function MapLayerMgr(mapPane,model){
this.layers=new Array();
this.mapPane=mapPane;
this.model=model;
this.id="MapLayerMgr";
this.namespace="xmlns:mb='http://mapbuilder.sourceforge.net/mapbuilder' xmlns:wmc='http://www.opengis.net/context' xmlns:xsl='http://www.w3.org/1999/XSL/Transform'";
this.model.addListener("addLayer",this.addLayer,this);
this.model.addListener("deleteLayer",this.deleteLayer,this);
this.model.addListener("hidden",this.hiddenListener,this);
this.model.addListener("refreshWmsLayers",this.refreshWmsLayers,this);
this.model.addListener("refreshOtherLayers",this.paintOtherLayers,this);
this.model.addListener("timestamp",this.timestampListener,this);
}
MapLayerMgr.prototype.refreshWmsLayers=function(objRef){
objRef.d=new Date();
objRef.stylesheet.setParameter("uniqueId",objRef.d.getTime());
objRef.paintWmsLayers(objRef);
}
MapLayerMgr.prototype.timestampListener=function(objRef,timestampIndex){
var layerName=objRef.model.timestampList.getAttribute("layerName");
var timestamp=objRef.model.timestampList.childNodes[timestampIndex];
var vis=(timestamp.getAttribute("current")=="1")?"visible":"hidden";
var layerId=objRef.model.id+"_"+objRef.id+"_"+layerName+"_"+timestamp.firstChild.nodeValue;
var layer=document.getElementById(layerId);
if(layer){
layer.style.visibility=vis;
}else{
alert("error finding layerId:"+layerId);
}
}
MapLayerMgr.prototype.hiddenListener=function(objRef,layerName){
var vis="visible";
if(objRef.model.getHidden(layerName)=="1"){
vis="hidden";
}
var layerId=objRef.model.id+"_"+objRef.mapPane.id+"_"+layerName;
var layer=document.getElementById(layerId);
if(layer){
layer.style.visibility=vis;
imgId="real"+layer.imgId;
img=document.getElementById(imgId);if(img)img.style.visibility=vis;
}else{
layer=objRef.model.getFeatureNode(layerName);
var id=layer.selectSingleNode("@id").nodeValue+"_vector";
layer=document.getElementById(id);
if(layer){
layer.setAttribute("visibility",vis);layer.style.visibility=vis;}
}
}
MapLayerMgr.prototype.setLayersFromContext=function(objRef){
var contextLayers=objRef.model.getAllLayers();
for(var i=0;i<contextLayers.length;i++){
var layer=contextLayers[i];
objRef.addLayer(objRef,layer); 
}
}
MapLayerMgr.prototype.addLayer=function(objRef,layerNode){
var layer=null;
service=layerNode.selectSingleNode("wmc:Server/@service");
if(service)service=service.nodeValue;
var nodeName=layerNode.nodeName;
if(service=="GoogleMap"){
layer=new GoogleMapLayer(objRef.model,objRef.mapPane,"GoogleMapLayer",layerNode,false,true);
objRef.layers.push(layer);
}else if((service=="wms")||(service=="OGC:WMS")){
layer=objRef.addWmsLayer(objRef.model,objRef.mapPane,layerNode);
}else if(nodeName.indexOf("RssLayer")>=0){
var layerName=layerNode.getAttribute("id");
layer=new RssLayer(objRef.model,objRef.mapPane,layerName,layerNode,false,true);
objRef.layers.push(layer);
}else if(nodeName.indexOf("FeatureType")>=0){
var layerName=layerNode.selectSingleNode("wmc:Name").firstChild.nodeValue;
if(objRef.getLayer(layerName)==null){
layer=new WfsQueryLayer(objRef.model.model,objRef.mapPane,layerName,layerNode,false,true);
objRef.layers.push(layer);
}
}else{
alert("Failed adding Layer:"+nodeName+" service:"+service);
}
return layer
}
MapLayerMgr.prototype.addWmsLayer=function(model,mapPane,layerNode){
var layerNameNode=layerNode.selectSingleNode("wmc:Name");
if(layerNameNode){
layerName=layerNameNode.firstChild.nodeValue;
}else{
layerName="UNKNOWN";
}
var queryable=layerNode.getAttribute("queryable");
var visible=layerNode.getAttribute("hidden");
var layer=new WmsLayer(model,mapPane,layerName,layerNode,queryable,visible);
mapPane.MapLayerMgr.layers.push(layer);
return layer;
}
MapLayerMgr.prototype.paintWmsLayers=function(objRef){
for(var i=0;i<objRef.layers.length;i++){
var layer=objRef.layers[i];
if(layer.isWmsLayer())
layer.paint(objRef,null,i);
}
}
MapLayerMgr.prototype.paintOtherLayers=function(objRef){
var count=0;
for(var i=0;i<objRef.layers.length;i++){
var layer=objRef.layers[i];
if(!layer.isWmsLayer()){
layer.paint(objRef,null,i);
count++;
}
}
}
MapLayerMgr.prototype.getAllLayers=function(){
return layers;
}
MapLayerMgr.prototype.getLayer=function(layerName){
for(var i=0;i<this.layers.length;i++){
if(this.layers[i].layerName==layerName){
return this.layers[i];
}
}
return null;
}
MapLayerMgr.prototype.deleteAllLayers=function(){
if(this.layers){
for(var i=0;i<this.layers.length;i++){
var layer=this.layers[i]; 
layer.unpaint();
}
}
this.layers=null;
this.layers=new Array();
}
MapLayerMgr.prototype.deleteLayer=function(objRef,layerName){
for(var i=0;i<objRef.layers.length;i++){
var layer=objRef.layers[i]; 
if(layer.layerName==layerName){
layer.unpaint();
layers=objRef.layers.splice(i,1);
}
}
}
