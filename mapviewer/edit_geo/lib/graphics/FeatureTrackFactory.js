mapbuilder.loadScript(baseDir+"/graphics/FeatureLineFactory.js");
mapbuilder.loadScript(baseDir+"/graphics/FeaturePointFactory.js");
function FeatureTrackFactory(widgetNode,model,tipObjectName){
this.lineFactory=new FeatureLineFactory(widgetNode,model,tipObjectName);
this.pointFactory=new FeaturePointFactory(widgetNode,model,tipObjectName);
}
FeatureTrackFactory.prototype.clearFeatures=function(objRef){
this.lineFactory.clearFeatures(objRef);
this.pointFactory.clearFeatures(objRef);
}
FeatureTrackFactory.prototype.createFeature=function(objRef,geometry,itemId,title,popupStr,icon){
this.lineFactory.createFeature(objRef,geometry,itemId,title,popupStr,icon);
var lastPoint=geometry[geometry.length-1]
this.pointFactory.createFeature(objRef,lastPoint,itemId,null,null,icon); 
}
