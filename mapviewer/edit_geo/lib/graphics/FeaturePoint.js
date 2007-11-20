mapbuilder.loadScript(baseDir+"/graphics/VectorGraphics.js");
function FeaturePoint(objRef,geometry,itemId,title,popupStr,tipObjectName,normalImage,highlightImage,shadowImage,imageOffset,shadowOffset){
var imageOffsetArray=imageOffset.split(" ");
var shadowOffsetArray=shadowOffset.split(" ");
var normalImageDiv=document.createElement("div");
if(popupStr!=undefined){
normalImageDiv.setAttribute("id",itemId+"_normal");
}else{
normalImageDiv.setAttribute("id",itemId+"_lastPos"); 
} 
normalImageDiv.style.position="absolute";
normalImageDiv.style.visibility="visible";
normalImageDiv.style.zIndex=300;
normalImageDiv.tipObjectName=tipObjectName;
normalImageDiv.title=title;
var X=geometry[0];
var Y=geometry[1];
var gr=new VectorGraphics(itemId+"_normal",normalImageDiv);
gr.setColor("red");
var circle=gr.fillCircle(X,Y,3);
circle.itemId=itemId;
gr.paint(); 
this.install(circle,itemId,popupStr); 
objRef.node.appendChild(normalImageDiv);
this.normalImageDiv=normalImageDiv;
return this;
}
FeaturePoint.prototype.clear=function(objRef){
var img=this.normalImageDiv.firstChild;
img.onmouseover=null;
img.onmouseout=null;
objRef.node.removeChild(this.normalImageDiv);
if(this.highlightImageDiv!=undefined){
img=this.highlightImageDiv.firstChild;
img.onmouseover=null;
img.onmouseout=null;
objRef.node.removeChild(this.highlightImageDiv);
}
}
FeaturePoint.prototype.mouseOverHandler=function(ev){ 
this.strokecolor="yellow";
this.fillcolor="yellow";
normalImageDiv=document.getElementById(this.itemId+"_normal");
var objRef=window.cursorTrackObject;
var evPL=window.cursorTrackNode.evpl;
var X=evPL[0];
var Y=evPL[1];
var popupStr=this.popupStr;
if(popupStr==undefined){
popupStr="Feature under construction.  Stay tuned!";
}
toolTipObjs[normalImageDiv.tipObjectName].paint(new Array(""+X,""+Y,200,this.title,popupStr));
return false; 
}
FeaturePoint.prototype.mouseOutHandler=function(ev){
this.strokecolor="red";
this.fillcolor="red";
var normalImageDiv=document.getElementById(this.itemId+"_normal");
normalImageDiv.style.visibility="visible";
toolTipObjs[normalImageDiv.tipObjectName].clear();
}
FeaturePoint.prototype.install=function(feature,itemId,popupStr){
feature.itemId=itemId;
feature.popupStr=popupStr;
feature.onmouseover=this.mouseOverHandler; 
feature.onmouseout=this.mouseOutHandler;
}
