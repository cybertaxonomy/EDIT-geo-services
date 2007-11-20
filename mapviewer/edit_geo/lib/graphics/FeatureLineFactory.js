mapbuilder.loadScript(baseDir+"/graphics/FeatureLine.js");
function FeatureLineFactory(widgetNode,model,tipObjectName){
this.lines=new Array();
this.tipObjectName=tipObjectName;
}
FeatureLineFactory.prototype.clearFeatures=function(objRef){
for(id in this.lines){
var line=this.lines[id];
line.clear(objRef);
}
this.lines=new Array();
}
FeatureLineFactory.prototype.createFeature=function(objRef,geometry,itemId,title,popupStr,icon){
if(icon==null){
icon=this.normalImage;
}
var line=new FeatureLine(objRef,geometry,itemId,title,popupStr,this.tipObjectName,this.defaultPopupPosition);
this.lines[itemId]=line;
}
