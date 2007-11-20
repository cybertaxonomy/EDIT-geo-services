mapbuilder.loadScript(baseDir+"/widget/ButtonBase.js");
function GetMarkerInfo(widgetNode,model){
ButtonBase.apply(this,new Array(widgetNode,model));
this.doAction=function(objRef,targetNode){
}
if(this.mouseHandler){
this.mouseHandler.model.addListener('mouseup',this.doAction,this);
}
}
