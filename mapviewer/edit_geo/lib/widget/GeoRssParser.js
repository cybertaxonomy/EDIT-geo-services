function GeoRssParser(widgetNode,model){
WidgetBase.apply(this,new Array(widgetNode,model));
MapContainerBase.apply(this,new Array(widgetNode,model));
var stylesheet=widgetNode.selectSingleNode("mb:stylesheet");
if(stylesheet){
var xslt=stylesheet.firstChild.nodeValue;
this.stylesheet=new XSLTProcessor();
var xslDoc=Sarissa.getDomDocument(); 
xslDoc.async=false;
xslDoc.load(xslt);
this.stylesheet.importStylesheet(xslDoc);
}else{
alert("Parsing stylesheet not found");
}
var tipWidget=widgetNode.selectSingleNode("mb:tipWidget");
if(tipWidget){
this.model.tipWidgetId=tipWidget.firstChild.nodeValue;
}
this.model.addListener("refresh",this.paint,this); 
this.model.addListener("init",this.geoRssParserInit,this); 
}
GeoRssParser.prototype.geoRssParserInit=function(objRef){
objRef.targetModel.addListener("loadModel",objRef.loadEntries,objRef);
objRef.targetModel.addListener("bbox",objRef.loadEntries,objRef);
objRef.model.addListener("loadModel",objRef.loadAndPaintEntries,objRef);
}
GeoRssParser.prototype.transformEntry=function(objRef,entry){
if(objRef.stylesheet!=undefined){
var resultNode=objRef.stylesheet.transformToDocument(entry);
Sarissa.setXpathNamespaces(resultNode,"xmlns:wmc='http://www.opengis.net/context'");
return resultNode;
}
}
GeoRssParser.prototype.loadAndPaintEntries=function(objRef){
objRef.loadEntries(objRef);
objRef.targetModel.callListeners("refreshOtherLayers");
}
GeoRssParser.prototype.loadEntries=function(objRef){
if((objRef.model.doc!=null)&&(objRef.targetModel.doc!=null)){
var features=objRef.model.getFeatureNodes();
var len=features.length;
var width=objRef.containerModel.getWindowWidth();
var height=objRef.containerModel.getWindowHeight();
var listNodeArray=objRef.targetModel.doc.selectNodes("/wmc:OWSContext/wmc:ResourceList/wmc:RssLayer");
if(listNodeArray.length>0){
for(var i=0;i<listNodeArray.length;i++){
var layer=listNodeArray[i];
var layerId=layer.getAttribute("id");
if(layerId!=null){
objRef.targetModel.setParam('deleteLayer',layerId);
}else{
alert("error deleting:"+Sarissa.serialize(layer));
}
} 
}
if(len==0){
return;
}
for(var index=0;index<len;index++){
var feature=features[index];
var id=feature.getAttribute("id");
feature.setAttribute("width",width);
feature.setAttribute("height",height);
var layer=objRef.transformEntry(objRef,feature); 
objRef.targetModel.setParam('addLayer',layer.childNodes[0]);
} 
}
}
GeoRssParser.prototype.paint=function(objRef){
}
