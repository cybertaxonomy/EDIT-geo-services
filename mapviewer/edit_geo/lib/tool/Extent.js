var Rearth=6378137.0;var degToMeter=Rearth*2*Math.PI/360;
var mbScaleFactor=3571.428; 
var minScale=1000;
var maxScale=200000;
function Extent(model,initialRes){
this.model=model;
this.id=model.id+"_MbExtent"+mbIds.getId();
this.size=new Array();
this.res=new Array();
this.zoomBy=4;
this.getBbox=function(){
var bbox=this.model.getBoundingBox();
return bbox;
}
this.setBbox=function(bbox){
size=this.getSize();
res=Math.max((bbox[2]-bbox[0])/size[0],(bbox[3]-bbox[1])/size[1]);
scale=this.getFixedScale(res);
center=new Array((bbox[1]-bbox[3])/2,(bbox[0]-bbox[2])/2);half=new Array(size[0]/2,size[1]/2);
bbox=new Array(center[0]-half[0]*scale,center[1]-half[1]*scale,center[0]+half[0]*scale,center[1]+half[1]*scale);
this.model.setBoundingBox(bbox);
}
this.getSize=function(){
size=new Array();
size[0]=this.model.getWindowWidth();
size[1]=this.model.getWindowHeight();
return size;
}
this.setSize=function(size){
this.model.setWindowWidth(size[0]);
this.model.setWindowHeight(size[1]);
}
this.getFixedScale=function(res){
if(this.zoomLevels){
if(!res){
this.setResolution(new Array(this.model.getWindowWidth(),this.model.getWindowHeight()));
res=Math.max(this.res[0],this.res[1]);
}
var zoomLevels=this.zoomLevels.sort(function sort(a,b){return b-a});
var i=0;
while(zoomLevels[i]>=res){
i++;
}
if(i==0){
i=1;
}
this.fixedScale=zoomLevels[i-1];
}
else this.fixedScale=Math.max(this.res[0],this.res[1]);
return this.fixedScale;
}
this.setZoomLevels=function(enabled,zoomLevels){
if(enabled){
this.zoomLevels=zoomLevels;
}
else this.zoomLevels=null;
}
this.checkBbox=function(){
var center=this.getCenter();
var half=new Array(this.size[0]/2,this.size[1]/2);
var res=this.getFixedScale();
this.lr=new Array(center[0]+half[0]*res,center[1]-half[1]*res);
this.ul=new Array(center[0]-half[0]*res,center[1]+half[1]*res);
}
this.getCenter=function(){
return new Array((this.ul[0]+this.lr[0])/2,(this.ul[1]+this.lr[1])/2);
}
this.getXY=function(pl){
latlng=new Array(this.ul[0]+pl[0]*this.res[0],this.ul[1]-pl[1]*this.res[1]);
return latlng;
}
this.getPL=function(xy){
var p=Math.floor((xy[0]-this.ul[0])/this.res[0]);
var l=Math.floor((this.ul[1]-xy[1])/this.res[1]);
return new Array(p,l);
}
this.centerAt=function(center,newres,limitExtent){
var half=new Array(this.size[0]/2,this.size[1]/2);
if(this.zoomLevels){
newres=this.getFixedScale(newres);
}
this.lr=new Array(center[0]+half[0]*newres,center[1]-half[1]*newres);
this.ul=new Array(center[0]-half[0]*newres,center[1]+half[1]*newres);
if(limitExtent){
var xShift=0;
if(this.lr[0]>ContextExtent.lr[0])xShift=ContextExtent.lr[0]-this.lr[0];
if(this.ul[0]<ContextExtent.ul[0])xShift=ContextExtent.ul[0]-this.ul[0];
this.lr[0]+=xShift;
this.ul[0]+=xShift;
var yShift=0;
if(this.lr[1]<ContextExtent.lr[1])yShift=ContextExtent.lr[1]-this.lr[1];
if(this.ul[1]>ContextExtent.ul[1])yShift=ContextExtent.ul[1]-this.ul[1];
this.lr[1]+=yShift;
this.ul[1]+=yShift;
}
this.model.setBoundingBox(new Array(this.ul[0],this.lr[1],this.lr[0],this.ul[1]));
this.setSize(newres);
}
this.zoomToBox=function(ul,lr){var center=new Array((ul[0]+lr[0])/2,(ul[1]+lr[1])/2);
newres=Math.max((lr[0]-ul[0])/this.size[0],(ul[1]-lr[1])/this.size[1]);
this.centerAt(center,newres);
} 
this.setSize=function(res){this.res[0]=this.res[1]=res;
this.size[0]=(this.lr[0]-this.ul[0])/this.res[0];
this.size[1]=(this.ul[1]-this.lr[1])/this.res[1];
this.width=Math.ceil(this.size[0]);
this.height=Math.ceil(this.size[1]);
}
this.setResolution=function(size){this.size[0]=size[0];
this.size[1]=size[1];
this.res[0]=(this.lr[0]-this.ul[0])/this.size[0];
this.res[1]=(this.ul[1]-this.lr[1])/this.size[1];
this.width=Math.ceil(this.size[0]);
this.height=Math.ceil(this.size[1]);
}
this.getScale=function(){
var pixRes=null;
switch(this.model.getSRS()){
case "EPSG:GMAPS":
break;
case "EPSG:4326":case "EPSG:4269": 
pixRes=this.res[0]*degToMeter;
break;
default:pixRes=this.res[0];
break;
}
return mbScaleFactor*pixRes;
}
this.setScale=function(scale){
var newRes=null;
switch(this.model.getSRS()){
case "EPSG:4326":case "EPSG:4269": 
newRes=scale/(mbScaleFactor*degToMeter);
break;
default:newRes=scale/mbScaleFactor;
break;
}
this.centerAt(this.getCenter(),newRes);
}
this.init=function(extent,initialRes){
var bbox=extent.model.getBoundingBox();
extent.ul=new Array(bbox[0],bbox[3]);
extent.lr=new Array(bbox[2],bbox[1]);
extent.setResolution(new Array(extent.model.getWindowWidth(),extent.model.getWindowHeight()));
extent.checkBbox();
}
if(initialRes)this.init(this,initialRes);
this.firstInit=function(extent,initialRes){
extent.init(extent,initialRes);
}
}
