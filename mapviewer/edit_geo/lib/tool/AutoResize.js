mapbuilder.loadScript(baseDir+"/tool/ToolBase.js");
function AutoResize(toolNode,model){
ToolBase.apply(this,new Array(toolNode,model));
var referenceNodeId=toolNode.selectSingleNode("mb:referenceNodeId");
if(referenceNodeId){
this.referenceNodeId=referenceNodeId.firstChild.nodeValue;
var referenceNode=document.getElementById(this.referenceNodeId);
}else{
var referenceNode=document.getElementById('autoResize');
}
if(referenceNode==null){
alert("AutoResize tool cannot find the reference node '"+this.referenceNodeId+"' in the DOM.\nPlease specify a valid referenceNodeId in the config file\nor use an id 'autoResize' for one of your documents nodes.");
}
this.fireResize=function(){
config.objects[window.resizeToolId].model.setParam("autoResize");
}
window.onresize=this.fireResize;
window.resizeToolId=this.id; 
this.enlargeBboxIfNecessary=function(){
var bbox=this.model.getBoundingBox();
var worldWidth=bbox[2]-bbox[0];
var worldHeight=bbox[3]-bbox[1];
var xRes=worldWidth/this.model.getWindowWidth();
var yRes=worldHeight/this.model.getWindowHeight();
if(xRes!=yRes){
if(xRes>yRes){
var newWorldHeight=worldHeight*(xRes/yRes);
bbox[3]=bbox[3]+0.5*(newWorldHeight-worldHeight);
bbox[1]=bbox[1]-0.5*(newWorldHeight-worldHeight);
}else if(yRes>xRes){
var newWorldWidth=worldWidth*(yRes/xRes);
bbox[0]=bbox[0]-0.5*(newWorldWidth-worldWidth);
bbox[2]=bbox[2]+0.5*(newWorldWidth-worldWidth);
}
this.model.setBoundingBox(bbox);
}
} 
this.resizeHandler=function(objRef){
objRef.enlargeBboxIfNecessary();
var paddingTop=parseInt(getStyle(referenceNode,"padding-top"));
var paddingBottom=parseInt(getStyle(referenceNode,"padding-bottom"));
var paddingLeft=parseInt(getStyle(referenceNode,"padding-left"));
var paddingRight=parseInt(getStyle(referenceNode,"padding-right"));
newWidth=referenceNode.offsetWidth-(paddingLeft+paddingRight);
newHeight=referenceNode.offsetHeight-(paddingTop+paddingBottom);
objRef.model.setWindowSize(new Array(newWidth,newHeight));
}
this.model.addFirstListener("autoResize",this.resizeHandler,this);
this.model.addFirstListener("loadModel",this.resizeHandler,this);
function getStyle(oElm,strCssRule){
var strValue="";
if(document.defaultView&&document.defaultView.getComputedStyle){
strValue=document.defaultView.getComputedStyle(oElm,"").getPropertyValue(strCssRule);
}
else if(oElm.currentStyle){
strCssRule=strCssRule.replace(/\-(\w)/g,function(strMatch,p1){
return p1.toUpperCase();
});
strValue=oElm.currentStyle[strCssRule];
}
return strValue;
}
}
