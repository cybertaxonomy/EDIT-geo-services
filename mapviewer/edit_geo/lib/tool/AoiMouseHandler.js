mapbuilder.loadScript(baseDir+"/tool/ToolBase.js");
function AoiMouseHandler(toolNode,model){
ToolBase.apply(this,new Array(toolNode,model));
this.mouseUpHandler=function(objRef,targetNode){
if(objRef.enabled){
if(objRef.started)objRef.started=false;
}
}
this.mouseDownHandler=function(objRef,targetNode){
if(objRef.enabled){
//using this tool we create a BBox, whose values will be used to perform a query (check $('#query_AOI').click event on EDIT mapViewer)
//var aoiBox=config.objects.mainMap.getParam("aoi");
objRef.started=true;
objRef.anchorPoint=targetNode.evpl;
objRef.dragBox(targetNode.evpl);
//open #user_dates <div> on EDIT mapViewer, showing the link to click on to get data from BBox (AOI)
$('#user_dates').next().slideDown("slow");
$("#aoi_info").addClass("sld_info");
}
}
this.mouseMoveHandler=function(objRef,targetNode){
if(objRef.enabled){
if(objRef.started)objRef.dragBox(targetNode.evpl);
}
}
this.mouseOutHandler=function(objRef,targetNode){
if(objRef.enabled){
if(objRef.started)objRef.started=false;
}
}
this.mouseOverHandler=function(objRef,targetNode){
if(objRef.enabled){
}
}
this.dragBox=function(evpl){ 
var ul=new Array();
var lr=new Array();
if(this.anchorPoint[0]>evpl[0]){
ul[0]=evpl[0];
lr[0]=this.anchorPoint[0];
}else{
ul[0]=this.anchorPoint[0];
lr[0]=evpl[0];
}
if(this.anchorPoint[1]>evpl[1]){
ul[1]=evpl[1];
lr[1]=this.anchorPoint[1];
}else{
ul[1]=this.anchorPoint[1];
lr[1]=evpl[1];
}
ul=this.model.extent.getXY(ul);
lr=this.model.extent.getXY(lr);
this.model.setParam("aoi",new Array(ul,lr));
}
this.model.addListener('mousedown',this.mouseDownHandler,this);
this.model.addListener('mousemove',this.mouseMoveHandler,this);
this.model.addListener('mouseup',this.mouseUpHandler,this);
}
