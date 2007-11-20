mapbuilder.loadScript(baseDir+"/model/Proj.js");
mapbuilder.loadScript(baseDir+"/widget/WidgetBase.js");
mapbuilder.loadScript(baseDir+"/widget/MapContainerBase.js");
mapbuilder.loadScript(baseDir+"/widget/TipObject.js");
mapbuilder.loadScript(baseDir+"/graphics/FeatureFactory.js");
function GeoRssRenderer(widgetNode,model){
WidgetBase.apply(this,new Array(widgetNode,model));
MapContainerBase.apply(this,new Array(widgetNode,model));
this.model.addListener("refresh",this.paint,this); 
var tipWidget=widgetNode.selectSingleNode("mb:tipWidget");
if(tipWidget){
this.tipWidgetId=tipWidget.firstChild.nodeValue;
}
var styleNode=widgetNode.selectSingleNode("mb:popupStylesheet");
if(styleNode){
var xslt=styleNode.firstChild.nodeValue;
this.popupStyleSheet=new XslProcessor(xslt,model.namespace);
} 
this.featureFactory=new FeatureFactory(widgetNode,model,this.tipWidgetId);
this.highlight=function(objRef,featureId){
var normalImageDiv=document.getElementById(featureId+"_normal");
if(normalImageDiv!=undefined){
normalImageDiv.style.visibility="hidden";
var highlightImageDiv=document.getElementById(featureId+"_highlight");
highlightImageDiv.style.visibility="visible";
}
}
this.model.addListener("highlightFeature",this.highlight,this);
this.dehighlight=function(objRef,featureId){
var normalImageDiv=document.getElementById(featureId+"_normal");
if(normalImageDiv!=undefined){
normalImageDiv.style.visibility="visible";
var highlightImageDiv=document.getElementById(featureId+"_highlight");
highlightImageDiv.style.visibility="hidden";
}
}
this.model.addListener("dehighlightFeature",this.dehighlight,this);
this.transformEntry=function(objRef,entry){
if(objRef.popupStyleSheet!=undefined){
var resultNode=objRef.popupStyleSheet.transformNodeToObject(entry);
var result=Sarissa.serialize(resultNode.documentElement);
return result;
}
}
}
GeoRssRenderer.prototype.paint=function(objRef){
objRef.featureFactory.clearFeatures(objRef);
if(objRef.model.doc&&objRef.containerModel.doc&&objRef.node){
var containerProj=new Proj(objRef.containerModel.getSRS());
var features=objRef.model.getFeatureNodes();
var len=features.length;
for(var index=0;index<len;index++){
var feature=features[index];
var title=objRef.model.getFeatureName(feature);
var itemId=objRef.model.getFeatureId(feature);var icon=objRef.model.getFeatureIcon(feature); 
var geom=objRef.model.getFeatureGeometry(feature);
if(geom!=undefined){
var popupStr=objRef.transformEntry(objRef,feature);
if(geom.match('POINT')){
var pointStr=geom.substring(6,geom.length);
var point=pointStr.split(" ");
point=containerProj.Forward(point);
point=objRef.containerModel.extent.getPL(point);
objRef.featureFactory.createFeature(objRef,'POINT',point,itemId,title,popupStr,icon);
}else if(geom.match('LINESTRING')){
var linestr=geom.substring(11,geom.length);
var re=RegExp('[, \n\t]+','g');
var pointPairs=linestr.split(re);
var newPointArr=new Array(pointPairs.length/2);
var point=new Array(2);
var screenCoords;
var jj=0;
for(var i=0;i<pointPairs.length;i++){
point[0]=pointPairs[i];
point[1]=pointPairs[i+1];
screenCoords=containerProj.Forward(point);
screenCoords=objRef.containerModel.extent.getPL(screenCoords);
newPointArr[jj]=screenCoords; 
jj++ 
i++;
}
objRef.featureFactory.createFeature(objRef,'LINESTRING',newPointArr,itemId,title,popupStr,icon);
}else if(geom.match('POLYGON')){
}else if(geom.match('CURVE')){
}else{
}
}else{
var point=objRef.model.getFeaturePoint(feature);
if((point!=null)&&(point[0]!=0)&&(point[1]!=0)){
point=containerProj.Forward(point);
point=objRef.containerModel.extent.getPL(point);
var popupStr=objRef.transformEntry(objRef,feature);
objRef.featureFactory.createFeature(objRef,'POINT',point,itemId,title,popupStr,icon);
}
}
}
}
}
