mapbuilder.loadScript(baseDir+"/widget/MapContainerBase.js");
function GmlRendererVG(widgetNode,model){
WidgetBase.apply(this,new Array(widgetNode,model));
MapContainerBase.apply(this,new Array(widgetNode,model));
var tipWidget=widgetNode.selectSingleNode("mb:tipWidget");
if(tipWidget){
this.model.tipWidgetId=tipWidget.firstChild.nodeValue;
}
this.prePaint=function(objRef){
}
this.loadEntries=function(objRef){
if((objRef.model.doc!=null)&&(objRef.targetModel.doc!=null)){
objRef.containerModel.model=objRef.model;
objRef.containerModel.setParam('addLayer',objRef.model.wfsFeature); 
}
}
this.loadAndPaintEntries=function(objRef){
if((objRef.model.doc!=null)&&(objRef.targetModel.doc!=null)){
objRef.loadEntries(objRef);
objRef.targetModel.callListeners("refreshOtherLayers");
}
}
this.model.addListener("init",this.gmlRendererVGInit,this);
}
GmlRendererVG.prototype.paint=function(objRef){
}
GmlRendererVG.prototype.gmlRendererVGInit=function(objRef){
objRef.targetModel.addListener("loadModel",objRef.loadEntries,objRef);
objRef.targetModel.addListener("bbox",objRef.loadEntries,objRef);
objRef.model.addListener("loadModel",objRef.loadAndPaintEntries,objRef);
}
