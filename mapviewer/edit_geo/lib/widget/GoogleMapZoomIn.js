mapbuilder.loadScript(baseDir+"/widget/ButtonBase.js");
mapbuilder.loadScript(baseDir+"/tool/GoogleMapTools.js");
function GoogleMapZoomIn(widgetNode,model){
ButtonBase.apply(this,new Array(widgetNode,model));
this.doAction=function(objRef,targetNode){
if(objRef.enabled){
var bbox=objRef.targetModel.getParam("aoi");
if(bbox!=null){
var extent=objRef.targetModel.extent;
var ul=bbox[0];
var lr=bbox[1];
if((ul[0]==lr[0])&&(ul[1]==lr[1])){
objRef.googleMapTools.zoomTo(objRef.targetModel,ul,1);
}else{
objRef.googleMapTools.setGmapExtent(objRef.targetModel,new Array(lr[0],ul[1],ul[0],lr[1]));
}
}
}
}
this.setMouseListener=function(objRef){
if(objRef.mouseHandler){
objRef.mouseHandler.model.addListener('mouseup',objRef.doAction,objRef);
}
if(!objRef.googleMapTools){
objRef.googleMapTools=new GoogleMapTools();
}
}
this.model.addListener("loadModel",this.setMouseListener,this);
}
