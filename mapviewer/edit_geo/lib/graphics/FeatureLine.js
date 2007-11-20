mapbuilder.loadScript(baseDir+"/graphics/Vectorgraphics.js");
function FeatureLine(objRef,geometry,itemId,title,popupStr,tipObjectName,Position){
var lineNormalDiv=document.createElement("div");
lineNormalDiv.setAttribute("id",itemId+"_normal");
lineNormalDiv.style.position="absolute";
lineNormalDiv.style.visibility="visible";
lineNormalDiv.style.zIndex=300;
lineNormalDiv.tipObjectName=tipObjectName;
lineNormalDiv.position=Position;
this.lineNormalDiv=lineNormalDiv;
objRef.node.appendChild(lineNormalDiv);
var xPoints=new Array(geometry.length);
var yPoints=new Array(geometry.length);
for(var i=0;i<geometry.length;i++){
point=geometry[i]
xPoints[i]=parseInt(point[0])
yPoints[i]=parseInt(point[1])
}
var gr=new VectorGraphics(itemId+"_normal",lineNormalDiv);
gr.setColor('red');
var line=gr.drawPolyline(xPoints,yPoints);
gr.paint();
this.install(line,itemId,popupStr);
return this;
}
FeatureLine.prototype.clear=function(objRef){
objRef.node.removeChild(this.lineNormalDiv);
}
FeatureLine.prototype.mouseOverHandler=function(ev){ 
this.strokecolor="yellow";
var lineNormalDiv=document.getElementById(this.itemId+"_normal");
var objRef=window.cursorTrackObject;
var evPL=window.cursorTrackNode.evpl;
var X=evPL[0];
var Y=evPL[1];
var popupStr=this.popupStr;
if(popupStr==undefined){
popupStr="Feature under construction.  Stay tuned!";
}
toolTipObjs[lineNormalDiv.tipObjectName].paint(new Array(""+X,""+Y,200,this.title,popupStr));
return true; 
}
FeatureLine.prototype.mouseOutHandler=function(ev){
this.strokecolor="red";
var lineNormalDiv=document.getElementById(this.itemId+"_normal");
toolTipObjs[lineNormalDiv.tipObjectName].clear();
}
FeatureLine.prototype.install=function(feature,itemId,popupStr){
feature.itemId=itemId;
feature.popupStr=popupStr;
feature.onmouseover=this.mouseOverHandler; 
feature.onmouseout=this.mouseOutHandler;
}
