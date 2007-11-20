mapbuilder.loadScript(baseDir+"/widget/WidgetBase.js");
mapbuilder.loadScript(baseDir+"/widget/MapContainerBase.js");
mapbuilder.loadScript(baseDir+"/graphics/MapLayerMgr.js");
function MapPane2(widgetNode,model){
WidgetBase.apply(this,new Array(widgetNode,model));
MapContainerBase.apply(this,new Array(widgetNode,model));
if(!this.stylesheet){
var styleNode=widgetNode.selectSingleNode("mb:stylesheet");
if(styleNode){
this.stylesheet=new XslProcessor(styleNode.firstChild.nodeValue,model.namespace);
}else{
this.stylesheet=new XslProcessor(baseDir+"/widget/"+widgetNode.nodeName+".xsl",model.namespace);
}
}
var loadingSrc=widgetNode.selectSingleNode("mb:loadingSrc");
if(loadingSrc){
this.loadingSrc=config.skinDir+loadingSrc.firstChild.nodeValue;
}else{
this.loadingSrc=config.skinDir+"/images/Loading.gif";
}
for(var j=0;j<widgetNode.childNodes.length;j++){
if(widgetNode.childNodes[j].firstChild
&&widgetNode.childNodes[j].firstChild.nodeValue)
{
this.stylesheet.setParameter(
widgetNode.childNodes[j].nodeName,
widgetNode.childNodes[j].firstChild.nodeValue);
}
}
this.stylesheet.setParameter("modelId",this.model.id);
this.stylesheet.setParameter("modelTitle",this.model.title);
this.stylesheet.setParameter("widgetId",this.id);
this.stylesheet.setParameter("skinDir",config.skinDir);
this.stylesheet.setParameter("lang",config.lang);
this.MapLayerMgr=new MapLayerMgr(this,model); 
this.model.addListener("refresh",this.paint,this);
this.model.addListener("deleteLayer",this.deleteLayer,this);
this.model.addListener("moveLayerUp",this.moveLayerUp,this);
this.model.addListener("moveLayerDown",this.moveLayerDown,this);
}
MapPane2.prototype.paint=function(objRef,refresh){
if(objRef.model.doc&&objRef.node&&(objRef.autoRefresh||refresh)){
objRef.stylesheet.setParameter("width",objRef.model.getWindowWidth());
objRef.stylesheet.setParameter("height",objRef.model.getWindowHeight());
objRef.stylesheet.setParameter("bbox",objRef.model.getBoundingBox().join(","));
objRef.stylesheet.setParameter("srs",objRef.model.getSRS());
if(objRef.debug)alert("painting:"+Sarissa.serialize(objRef.model.doc));
if(objRef.debug)alert("stylesheet:"+Sarissa.serialize(objRef.stylesheet.xslDom));
var tempDom=objRef.stylesheet.transformNodeToObject(objRef.model.doc);
if(tempDom.parseError!=0){
alert("parse error:"+Sarissa.getParseErrorText(tempDom));
}
var tempNodeList=tempDom.selectNodes("//img");
if(objRef.debug){
alert("painting:"+objRef.id+":"+s);
if(config.serializeUrl)postLoad(config.serializeUrl,s);
}
objRef.MapLayerMgr.deleteAllLayers();
var outputNode=document.getElementById(objRef.outputNodeId);
if(!outputNode){
outputNode=document.createElement("div");
outputNode.setAttribute("id",objRef.outputNodeId);
outputNode.style.position="absolute"; 
objRef.node.appendChild(outputNode);
outputNode.style.left='0px';
outputNode.style.top='0px';
} 
var layers=objRef.model.getAllLayers();
objRef.firstImageLoaded=false;
objRef.layerCount=layers.length;
for(var i=0;i<layers.length;i++){
var layer=objRef.MapLayerMgr.addLayer(objRef.MapLayerMgr,layers[i])
if(tempNodeList[i])newSrc=tempNodeList[i].getAttribute("src");
if(layer.setSrc)layer.setSrc(newSrc)
}
var message="loading "+objRef.layerCount+" map layer"+((objRef.layerCount>1)?"s":"");
objRef.model.setParam("modelStatus",message);
objRef.MapLayerMgr.paintWmsLayers(objRef.MapLayerMgr);
}
}
MapPane2.prototype.getLayer=function(layerName){
return this.MapLayerMgr(layerName);
}
MapPane2.prototype.getLayerDivId=function(layerName){
return this.model.id+"_"+this.id+"_"+layerName;}
MapPane2.prototype.deleteLayer=function(objRef,layerName){
var imgDivId=objRef.getLayerDivId(layerName); 
if(imgDivId!=null){
var imgDiv=document.getElementById(imgDivId);
if(imgDiv!=null){
var outputNode=document.getElementById(objRef.outputNodeId);
outputNode.removeChild(imgDiv);
}
}
}
MapPane2.prototype.moveLayerUp=function(objRef,layerName){
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
MapPane2.prototype.moveLayerDown=function(objRef,layerName){
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
MapPane2.prototype.clearWidget2=function(objRef){
objRef.MapLayerMgr.deleteAllLayers();
}
