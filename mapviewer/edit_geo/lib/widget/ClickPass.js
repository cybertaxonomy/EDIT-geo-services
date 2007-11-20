mapbuilder.loadScript(baseDir+"/widget/ButtonBase.js");
function ClickPass(widgetNode,model){
ButtonBase.apply(this,new Array(widgetNode,model));
var clickPassId=widgetNode.selectSingleNode("mb:ClickPassId");
if(clickPassId!=null){
this.clickPassId=clickPassId.firstChild.nodeValue;
}else{
alert("unspecified clickPassId");
}
var icon=widgetNode.selectSingleNode("mb:icon");
if(icon!=null){
this.icon=icon.firstChild.nodeValue;
var iconDiv=document.createElement("div");
iconDiv.setAttribute("id","clickPass"+this.clickPassId);
iconDiv.style.position="relative";
iconDiv.style.visibility="hidden";
iconDiv.style.height="20px";
iconDiv.style.width="20px";
iconDiv.style.top="120px";
iconDiv.style.left="120px";
iconDiv.style.zIndex=300;
iconDiv.title="clickPass"+this.clickPassId;
var newImage=document.createElement("img");
newImage.src=this.icon;
this.iconDiv=iconDiv;
iconDiv.appendChild(newImage);
var mainMapPane=document.getElementById("mainMapPane");
mainMapPane.appendChild(iconDiv);
}else{
alert("unspecified icon");
}
var topOffset=widgetNode.selectSingleNode("mb:topOffset");
if(topOffset!=null){
this.topOffset=parseInt(topOffset.firstChild.nodeValue);
}else{
alert("unspecified topOffset");
}
var leftOffset=widgetNode.selectSingleNode("mb:leftOffset");
if(leftOffset!=null){
this.leftOffset=parseInt(leftOffset.firstChild.nodeValue);
}else{
alert("unspecified topOffset");
} 
this.doAction=function(objRef,targetNode){
if(objRef.enabled){
point=objRef.mouseHandler.model.extent.getXY(targetNode.evpl);
var x=point[0];
var y=point[1];
objRef.iconDiv.style.top=targetNode.evpl[1]+objRef.topOffset+"px";
objRef.iconDiv.style.left=targetNode.evpl[0]+objRef.leftOffset+"px";
objRef.iconDiv.style.visibility="visible";
clickIt(x,y)
if(document.all){window.setTimeout("hideClickPass("+objRef.clickPassId+" )",5000);
}else{ 
setTimeout("hideClickPass("+objRef.clickPassId+" )",5000);
}
}
}
this.hideClickPass=function(){
var div=document.getElementById("clickPass"+this.clickPassId);
if(div!=null){
div.style.visibility="hidden";
}else{
alert("div clickPass"+this.clickPassId+" not found");
}
}
this.setMouseListener=function(objRef){
if(objRef.mouseHandler){
objRef.mouseHandler.model.addListener('mouseup',objRef.doAction,objRef);
}
}
this.model.addListener("loadModel",this.setMouseListener,this);
}
function hideClickPass(id){
var div=document.getElementById("clickPass"+id);
if(div!=null){
div.style.visibility="hidden";
}else{
alert("div clickPass"+id+" not found");
}
}
