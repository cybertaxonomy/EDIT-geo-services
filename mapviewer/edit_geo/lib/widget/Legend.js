mapbuilder.loadScript(baseDir+"/widget/WidgetBaseXSL.js");
function Legend(widgetNode,model){
WidgetBaseXSL.apply(this,new Array(widgetNode,model));
this.model.addListener("deleteLayer",this.refresh,this);
this.model.addListener("moveLayerUp",this.refresh,this);
this.model.addListener("moveLayerDown",this.refresh,this);
if(this.autoRefresh)this.model.addListener("addLayer",this.refresh,this);
this.prePaint=function(objRef){
if(objRef.model.featureName){
objRef.stylesheet.setParameter("featureName",objRef.model.featureName);
objRef.stylesheet.setParameter("hidden",objRef.model.getHidden(objRef.model.featureName).toString());
}
var visibleLayer=objRef.model.doc.selectSingleNode(objRef.model.nodeSelectXpath+"[@hidden='0' and @opaque='1']/wmc:Name");
if(visibleLayer)objRef.visibleLayer=visibleLayer.firstChild.nodeValue;
}
}
Legend.prototype.refresh=function(objRef,layerName){
objRef.paint(objRef,objRef.id);
}
Legend.prototype.selectLayer=function(objRef,layer){
objRef.model.setParam('selectedLayer',layer);
}
Legend.prototype.swapOpaqueLayer=function(layer){
this.model.setHidden(this.visibleLayer,true);
this.model.setHidden(layer,false);
this.visibleLayer=layer;
}
