mapbuilder.loadScript(baseDir+"/widget/EditButtonBase.js");
mapbuilder.loadScript(baseDir+"/model/Proj.js");
function Measurement(widgetNode,model){
EditButtonBase.apply(this,new Array(widgetNode,model));
this.cursor="crosshair"; 
var totalDistance=0;
var distance=0;
var state=false;
var restart=false;
this.doAction=function(objRef,targetNode){
if(objRef.enabled){
if(objRef.restart){
objRef.model.setParam("clearMeasurementLine");
objRef.restart=false;
}
var point=objRef.mouseHandler.model.extent.getXY(targetNode.evpl);
var old=objRef.targetModel.getXpathValue(objRef.targetModel,objRef.featureXpath);
if(!old)old="";
sucess=objRef.targetModel.setXpathValue(objRef.targetModel,objRef.featureXpath,old+" "+point[0]+","+point[1]);
if(!sucess){
alert("Measurement: invalid featureXpath in config: "+objRef.featureXpath);
}
var lineCoords=objRef.targetModel.getXpathValue(objRef.targetModel,objRef.featureXpath);
var coordArray=lineCoords.split(" ");
if(coordArray.length>=3){
var point_P=coordArray[coordArray.length-2];
var point_Q=coordArray[coordArray.length-1];
var P=point_P.split(",");
var Q=point_Q.split(",");
objRef.srs=srs.toUpperCase();
objRef.proj=new Proj(objRef.srs);
if(objRef.proj.Forward){
P=objRef.proj.Forward(P);
Q=objRef.proj.Forward(Q);
}
if(!P||!Q){
alert("Measurement: Projection not supported!");
}
else{
if(objRef.proj.units=="meters"){
Xp=parseFloat(P[0]);
Yp=parseFloat(P[1]);
Xq=parseFloat(Q[0]);
Yq=parseFloat(Q[1]);
distance=Math.sqrt(((Xp-Xq)*(Xp-Xq))+((Yp-Yq)*(Yp-Yq)))
if(distance==0){
objRef.restart=true;
objRef.model.setParam("clearMouseLine");objRef.targetModel.setParam("mouseRenderer",false);
return;
}
totalDistance=Math.round(totalDistance+distance);
}
else if(objRef.proj.units=="degrees"){
Lonp=parseFloat(P[0]);
Latp=parseFloat(P[1]);
Lonq=parseFloat(Q[0]);
Latq=parseFloat(Q[1]);
radDistance=Math.acos(Math.sin(Latp)*Math.sin(Latq)+Math.cos(Latp)*Math.cos(Latq)*Math.cos(Lonp-Lonq));
distance=radDistance*6378137;
if(distance==0){
objRef.restart=true;
objRef.model.setParam("clearMouseLine");objRef.targetModel.setParam("mouseRenderer",false);
return;
}
totalDistance=Math.round(totalDistance+distance);
}
else alert("Measurement does not know how to calculate the distance");
}
} 
objRef.targetModel.setParam("showDistance",totalDistance);}
}
this.clearMeasurementLine=function(objRef){
if(totalDistance!=0){
totalDistance=0;
sucess=objRef.targetModel.setXpathValue(objRef.targetModel,objRef.featureXpath,"");
if(!sucess){
alert("Measurement: invalid featureXpath in config: "+objRef.featureXpath);
}
objRef.targetModel.setParam("refresh");
}
}
this.model.addListener("clearMeasurementLine",this.clearMeasurementLine,this);
}
