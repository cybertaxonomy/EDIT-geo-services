mapbuilder.loadScript(baseDir+"/widget/WidgetBaseXSL.js");
function LegendGraphic(widgetNode,model){
WidgetBaseXSL.apply(this,new Array(widgetNode,model));
this.model.addListener("hidden",this.refresh,this);
}
LegendGraphic.prototype.refresh=function(objRef,layerName){
objRef.paint(objRef,objRef.id);
}
