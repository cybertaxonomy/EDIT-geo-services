mapbuilder.loadScript(baseDir+"/widget/ButtonBase.js");
function SetAoi(widgetNode,model){
ButtonBase.apply(this,new Array(widgetNode,model));
this.cursor="crosshair";
this.doAction=function(objRef,targetNode){
console.info("pppp");
alert("setaoi by pere");
}
if(this.mouseHandler){
this.mouseHandler.model.addListener('mouseup',this.doAction,this);
console.info("pppp222");
}
}
