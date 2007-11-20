mapbuilder.loadScript(baseDir+"/graphics/MapLayer.js");
WmsLayer=function(model,mapPane,layerName,layerNode,queryable,visible){
MapLayer.apply(this,new Array(model,mapPane,layerName,layerNode,queryable,visible));
this.d=new Date();
this.img=new Image();
this.img.objRef=mapPane;
this.mapPane=mapPane;
this.setSrc=function(src){
this.src=src;
}
this.paint=function(objRef,img,layerNum){
this.loadImgDiv(objRef,this.layerNode,this.src,this.img,layerNum);
return img;
}
this.isWmsLayer=function(){
return true;
}
this.getLayerDivId=function(){
var divId=this.model.id+"_"+this.mapPane.id+"_"+this.layerName;return divId;
if(this.model.timestampList&&this.model.timestampList.getAttribute("layerName")==layerName){ 
var timestampIndex=this.model.getParam("timestamp");
var timestamp=this.model.timestampList.childNodes[timestampIndex];
layerId+="_"+timestamp.firstChild.nodeValue;
}
}
this.loadImgDiv=function(objRef,layerNode,newSrc,newImg,layerNum){
var outputNode=document.getElementById(objRef.mapPane.outputNodeId);
var layerHidden=(layerNode.getAttribute("hidden")==1)?true:false; 
var imageFormat="image/gif";
var imageFormatNode=layerNode.selectSingleNode("wmc:FormatList/wmc:Format[@current='1']"); 
if(imageFormatNode)imageFormat=imageFormatNode.firstChild.nodeValue; 
var imgDivId=this.getLayerDivId(); 
var imgDiv=document.getElementById(imgDivId);
if(!imgDiv){
imgDiv=document.createElement("div");
imgDiv.setAttribute("id",imgDivId);
imgDiv.style.position="absolute"; 
imgDiv.style.visibility=(layerHidden)?"hidden":"visible";
imgDiv.style.top='0px'; 
imgDiv.style.left='0px';
imgDiv.imgId=this.d.getTime(); 
imgDiv.style.zIndex=this.zIndexFactor+layerNum;
var domImg=document.createElement("img");
domImg.id="real"+imgDiv.imgId;
domImg.setAttribute("src",config.skinDir+"/images/Loading.gif");
domImg.layerHidden=layerHidden;
imgDiv.appendChild(domImg);
outputNode.appendChild(imgDiv);
}
newImg.id=imgDiv.imgId;
newImg.hidden=layerHidden;
if(_SARISSA_IS_IE&&imageFormat=="image/png")newImg.fixPng=true;
newImg.onload=MapImgLoadHandler;
newImg.setAttribute("src",newSrc);
}
}
function MapImgLoadHandler(){
var oldImg=document.getElementById("real"+this.id);
if(!this.objRef.firstImageLoaded){
this.objRef.firstImageLoaded=true;
var outputNode=document.getElementById(this.objRef.outputNodeId);
var siblingImageDivs=outputNode.childNodes;
for(var i=0;i<siblingImageDivs.length;++i){
var sibImg=siblingImageDivs[i].firstChild;
sibImg.parentNode.style.visibility="hidden";
sibImg.style.visibility="hidden";if(_SARISSA_IS_IE)sibImg.src=config.skinDir+"/images/Spacer.gif";
}
if(_SARISSA_IS_IE)siblingImageDivs[0].firstChild.parentNode.parentNode.style.visibility="hidden";
outputNode.style.left='0px';
outputNode.style.top='0px';
}
--this.objRef.layerCount;
if(this.objRef.layerCount>0){
var message="loading "+this.objRef.layerCount+" map layers"
this.objRef.model.setParam("modelStatus",message);
}else{
this.objRef.model.setParam("modelStatus");
this.objRef.model.callListeners("refreshOtherLayers");
}
if(_SARISSA_IS_IE)oldImg.parentNode.parentNode.style.visibility="visible";
if(this.fixPng){
var vis=oldImg.layerHidden?"hidden":"visible";
oldImg.outerHTML=fixPNG(this,"real"+this.id);
if(!this.hidden){
fixImg=document.getElementById("real"+this.id);fixImg.style.visibility="visible"
}
}else{
oldImg.setAttribute("src",this.src);
oldImg.width=this.objRef.model.getWindowWidth();
oldImg.height=this.objRef.model.getWindowHeight();
if(!this.hidden){
oldImg.parentNode.style.visibility="visible";
oldImg.style.visibility="visible";}
}
}
