mapbuilder.loadScript(baseDir+"/graphics/MapLayer.js");
mapbuilder.loadScript(baseDir+"/tool/GoogleMapTools.js");
function GoogleMapLayer(model,mapPane,layerName,layerNode,queryable,visible){
MapLayer.apply(this,new Array(model,mapPane,layerName,layerNode,queryable,visible));
this.getDiv=function(layerNum){
var outputNode=document.getElementById(this.mapPane.outputNodeId).parentNode;
div=document.getElementById(this.layerName);
if(div==null){
div=document.createElement("div");
div.setAttribute("id",this.layerName);
div.style.position="absolute";
div.style.visibility="visible";
div.style.zIndex=layerNum*this.zIndexFactor;
div.style.top=0;
div.style.left=0;
div.style.width=this.mapPane.model.getWindowWidth();
div.style.height=this.mapPane.model.getWindowHeight();
outputNode.appendChild(div);
}
return div;
}
this.paint=function(objRef,img,layerNum){
div=this.getDiv(layerNum);
div.style.top=0;
div.style.left=0;
gmap=this.mapPane.model.getParam("gmap");
if(!gmap){
gmap=new GMap2(div);
gmap.disableDragging();
this.mapPane.model.setParam("gmap",gmap);
this.mapPane.googleMapTools=new GoogleMapTools();
this.mapPane.googleMapTools.centerAndZoom(this.mapPane.model);
this.mapPane.googleMapTools.useGoogleMapExtent(this.mapPane.model);
config.objects.gmap=gmap;
config.objects.googleMapTools=this.mapPane.googleMapTools;
}else{
this.mapPane.googleMapTools.centerAndZoom(this.mapPane.model);
}
}
}
