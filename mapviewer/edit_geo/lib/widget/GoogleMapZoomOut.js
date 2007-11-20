mapbuilder.loadScript(baseDir+"/widget/ButtonBase.js");
mapbuilder.loadScript(baseDir+"/tool/GoogleMapTools.js");
function GoogleMapZoomOut(widgetNode,model){
ButtonBase.apply(this,new Array(widgetNode,model));
this.doAction=function(objRef,targetNode){
if(objRef.enabled){
bbox=objRef.targetModel.getParam("aoi");
if(bbox!=null){
extent=objRef.targetModel.extent;
ul=bbox[0];
lr=bbox[1];
mid=new Array((ul[0]+lr[0])/2,(ul[1]+ul[1])/2);
objRef.googleMapTools.zoomTo(objRef.targetModel,mid,-1);
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
