mapbuilder.loadScript(baseDir+"/widget/ButtonBase.js");
mapbuilder.loadScript(baseDir+"/tool/GoogleMapTools.js");
function GoogleMapDragPan(widgetNode,model){
ButtonBase.apply(this,new Array(widgetNode,model));
this.cursor="move"; 
this.doAction=function(objRef,targetNode){
if(!objRef.enabled)return;
var bbox=objRef.targetModel.getParam("aoi");
mid=new Array((bbox[0][0]+bbox[1][0])/2,(bbox[0][1]+bbox[1][1])/2);
objRef.googleMapTools.zoomTo(objRef.targetModel,mid,0);
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
