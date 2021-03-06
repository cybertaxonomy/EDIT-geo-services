mapbuilder.loadScript(baseDir+"/widget/WidgetBaseXSL.js");
function LayerControl(widgetNode,model){
WidgetBaseXSL.apply(this,new Array(widgetNode,model));
this.prePaint=function(objRef){
if(objRef.model.featureName){
objRef.stylesheet.setParameter("featureName",objRef.model.featureName);
objRef.stylesheet.setParameter("hidden",objRef.model.getHidden(objRef.model.featureName).toString());
}
}
this.highlightLayer=function(layerName){
var layerId=this.model.id+"_"+"mainMapWidget"+"_"+layerName;
var previewImage=document.getElementById("previewImage");
var layer=document.getElementById(layerId);
if(previewImage)previewImage.src=layer.firstChild.src;
}
this.refresh=function(objRef,layerName){
objRef.paint(objRef,objRef.id);
}
this.showLayerMetadata=function(layerName){
var metadataWidget=config.objects.layerMetadata;
if(metadataWidget){
metadataWidget.stylesheet.setParameter("featureName",layerName);
metadataWidget.node=document.getElementById(metadataWidget.htmlTagId);
metadataWidget.paint(metadataWidget);
}
}
this.model.addListener("deleteLayer",this.refresh,this);
this.model.addListener("moveLayerUp",this.refresh,this);
this.model.addListener("moveLayerDown",this.refresh,this);
if(this.autoRefresh)this.model.addListener("addLayer",this.refresh,this);
}
