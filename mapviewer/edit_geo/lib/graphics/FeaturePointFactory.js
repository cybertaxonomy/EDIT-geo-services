mapbuilder.loadScript(baseDir+"/graphics/FeaturePoint.js");
function FeaturePointFactory(widgetNode,model,tipObjectName){
if(widgetNode.selectSingleNode("mb:normalImage"))
this.normalImage=widgetNode.selectSingleNode("mb:normalImage").firstChild.nodeValue; 
if(widgetNode.selectSingleNode("mb:highlightImage"))
this.highlightImage=widgetNode.selectSingleNode("mb:highlightImage").firstChild.nodeValue;
if(widgetNode.selectSingleNode("mb:imageOffset")) 
this.imgOffset=widgetNode.selectSingleNode("mb:imageOffset").firstChild.nodeValue;
if(widgetNode.selectSingleNode("mb:shadowImage"))
this.shadowImage=widgetNode.selectSingleNode("mb:shadowImage").firstChild.nodeValue;
if(widgetNode.selectSingleNode("mb:shadowOffset"))
this.shadowOffset=widgetNode.selectSingleNode("mb:shadowOffset").firstChild.nodeValue;
this.points=new Array();
this.tipObjectName=tipObjectName;
}
FeaturePointFactory.prototype.clearFeatures=function(objRef){
for(id in this.points){
var pt=this.points[id];
pt.clear(objRef);
}
this.points=new Array();
}
FeaturePointFactory.prototype.createFeature=function(objRef,geometry,itemId,title,popupStr,icon){
if(icon==null){
icon=this.normalImage;
}
var pt=new FeaturePoint(objRef,geometry,itemId,title,popupStr,this.tipObjectName, 
icon,this.highlightImage,this.shadowImage,this.imgOffset,this.shadowOffset);
this.points[itemId]=pt;
}
