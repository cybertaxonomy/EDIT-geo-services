function OwsContext(modelNode,parent){
ModelBase.apply(this,new Array(modelNode,parent));
this.namespace="xmlns:wmc='http://www.opengis.net/context' xmlns:ows='http://www.opengis.net/ows' xmlns:ogc='http://www.opengis.net/ogc' xmlns:xsl='http://www.w3.org/1999/XSL/Transform' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:gml='http://www.opengis.net/gml' xmlns:wfs='http://www.opengis.net/wfs' xmlns:sld='http://www.opengis.net/sld'";
this.setHidden=function(layerName,hidden){
var hiddenValue="0";
if(hidden)hiddenValue="1";
var layer=this.getFeatureNode(layerName);
layer.setAttribute("hidden",hiddenValue);
this.callListeners("hidden",layerName);
}
this.getHidden=function(layerName){
var hidden=1;
var layer=this.getFeatureNode(layerName)
return layer.getAttribute("hidden");
}
this.getBoundingBox=function(){
var lowerLeft=this.doc.selectSingleNode("/wmc:OWSContext/wmc:General/ows:BoundingBox/ows:LowerCorner");
var upperRight=this.doc.selectSingleNode("/wmc:OWSContext/wmc:General/ows:BoundingBox/ows:UpperCorner");
var strBbox=new String(lowerLeft.firstChild.nodeValue+" "+upperRight.firstChild.nodeValue).split(" ");
var bbox=new Array();
for(i=0;i<strBbox.length;++i){
bbox[i]=parseFloat(strBbox[i]);
}
return bbox;
}
this.setBoundingBox=function(boundingBox){
var lowerLeft=this.doc.selectSingleNode("/wmc:OWSContext/wmc:General/ows:BoundingBox/ows:LowerCorner");
lowerLeft.firstChild.nodeValue=boundingBox[0]+" "+boundingBox[1];
var upperRight=this.doc.selectSingleNode("/wmc:OWSContext/wmc:General/ows:BoundingBox/ows:UpperCorner");
upperRight.firstChild.nodeValue=boundingBox[2]+" "+boundingBox[3];
this.callListeners("bbox",boundingBox); 
}
this.getBaseLayerService=function(){
x=this.doc.selectSingleNode("/wmc:OWSContext/wmc:ResourceList/wmc:Layer[last()]/wmc:Server");
s=x.getAttribute("service");
return s;
}
this.initBbox=function(objRef){
if(window.cgiArgs["bbox"]){var boundingBox=window.cgiArgs["bbox"].split(',');
objRef.setBoundingBox(boundingBox);
}
}
this.addListener("loadModel",this.initBbox,this); 
this.initAoi=function(objRef){
if(window.cgiArgs["aoi"]){var aoi=window.cgiArgs["aoi"].split(',');
objRef.setParam("aoi",new Array(new Array(aoi[0],aoi[3]),new Array(aoi[2],aoi[1])));
}
}
this.addListener("loadModel",this.initAoi,this);
this.setSRS=function(srs){
var bbox=this.doc.selectSingleNode("/wmc:OWSContext/wmc:General/ows:BoundingBox");
bbox.setAttribute("crs",srs);
this.callListeners("srs");
}
this.getSRS=function(){
if(this.doc){
var bbox=this.doc.selectSingleNode("/wmc:OWSContext/wmc:General/ows:BoundingBox");
srs=bbox.getAttribute("crs");
return srs;
} 
}
this.getWindowWidth=function(){
if(this.doc){
var win=this.doc.selectSingleNode("/wmc:OWSContext/wmc:General/wmc:Window");
width=win.getAttribute("width");
return width;
}
}
this.setWindowWidth=function(width){
var win=this.doc.selectSingleNode("/wmc:OWSContext/wmc:General/wmc:Window");
win.setAttribute("width",width);
this.callListeners("resize");
}
this.getWindowHeight=function(){
if(this.doc){
var win=this.doc.selectSingleNode("/wmc:OWSContext/wmc:General/wmc:Window");
height=win.getAttribute("height");
return height;
}
}
this.setWindowHeight=function(height){
var win=this.doc.selectSingleNode("/wmc:OWSContext/wmc:General/wmc:Window");
win.setAttribute("height",height);
this.callListeners("resize");
}
this.getServerUrl=function(requestName,method,feature){
return feature.selectSingleNode("wmc:Server/wmc:OnlineResource").getAttribute("xlink:href");
}
this.getVersion=function(feature){ 
return feature.selectSingleNode("wmc:Server").getAttribute("version");
}
this.getMethod=function(feature){
return feature.selectSingleNode("wmc:Server/wmc:OnlineResource").getAttribute("wmc:method");
}
this.getFeatureNode=function(featureName){
if(this.doc){
var feature=this.doc.selectSingleNode("//wmc:ResourceList/*[wmc:Name='"+featureName+"']");
if(feature==null){
alert("feature not found");
} 
return feature;
}
}
this.loadFeatures=function(objRef){
var nodeSelectXpath=objRef.nodeSelectXpath+"/wmc:FeatureType[wmc:Server/@service='OGC:WFS']/wmc:Name";
var featureList=objRef.doc.selectNodes(nodeSelectXpath);
for(var i=0;i<featureList.length;i++){
var featureName=featureList[i].firstChild.nodeValue;
objRef.setParam('wfs_GetFeature',featureName);
}
}
this.addListener("loadModel",this.loadFeatures,this);
this.setRequestParameters=function(featureName,requestStylesheet){
var feature=this.getFeatureNode(featureName);
if(feature.selectSingleNode("ogc:Filter")){
requestStylesheet.setParameter("filter",escape(Sarissa.serialize(feature.selectSingleNode("ogc:Filter"))));
}
}
this.getQueryableLayers=function(){
var listNodeArray=this.doc.selectNodes("/wmc:OWSContext/wmc:ResourceList/wmc:Layer[attribute::queryable='1']/wmc:Name");
return listNodeArray;
}
this.getAllLayers=function(){
listNodeArray=this.doc.selectNodes("//wmc:Layer|//wmc:FeatureType");
return listNodeArray;
}
this.getLayer=function(layerName){
var layer=this.doc.selectSingleNode("/wmc:OWSContext/wmc:ResourceList/wmc:Layer[wmc:Name='"+layerName+"']");
if(layer==null){
layer=this.doc.selectSingleNode("/wmc:OWSContext/wmc:ResourceList/wmc:RssLayer[@id='"+layerName+"']");
}
return layer;
}
this.addLayer=function(objRef,layerNode){ 
if(objRef.doc!=null){
var parentNode=objRef.doc.selectSingleNode("/wmc:OWSContext/wmc:ResourceList");
var id=layerNode.getAttribute("id");
var str="/wmc:OWSContext/wmc:ResourceList/"+layerNode.nodeName+"[@id='"+id+"']";
var node=objRef.doc.selectSingleNode(str);
if(node!=null){
parentNode.removeChild(node)
}
parentNode.appendChild(layerNode.cloneNode(true));
objRef.modified=true;
}else{
alert("null OWSContext doc");
}
}
this.addFirstListener("addLayer",this.addLayer,this);
this.deleteLayer=function(objRef,layerName){
var deletedNode=objRef.getLayer(layerName);
if(!deletedNode){
alert("node note found; unable to delete node:"+layerName);
return;
}
deletedNode.parentNode.removeChild(deletedNode);
objRef.modified=true;
}
this.addFirstListener("deleteLayer",this.deleteLayer,this);
this.moveLayerUp=function(objRef,layerName){
var movedNode=objRef.getLayer(layerName);
var sibNode=movedNode.selectSingleNode("following-sibling::*");
if(!sibNode){
alert("can't move node past beginning of list:"+layerName);
return;
}
movedNode.parentNode.insertBefore(sibNode,movedNode);
objRef.modified=true;
}
this.addFirstListener("moveLayerUp",this.moveLayerUp,this);
this.moveLayerDown=function(objRef,layerName){
var movedNode=objRef.getLayer(layerName);
var listNodeArray=movedNode.selectNodes("preceding-sibling::*");var sibNode=listNodeArray[listNodeArray.length-1];
if(!sibNode){
alert("can't move node past beginning of list:"+layerName);
return;
}
movedNode.parentNode.insertBefore(movedNode,sibNode);
objRef.modified=true;
}
this.addFirstListener("moveLayerDown",this.moveLayerDown,this);
this.setExtension=function(extensionNode){
var extension=this.doc.selectSingleNode("/wmc:OWSContext/wmc:General/wmc:Extension");
if(!extension){
var general=this.doc.selectSingleNode("/wmc:OWSContext/wmc:General");
var newChild=createElementWithNS(this.doc,"Extension",'http://www.opengis.net/context');
extension=general.appendChild(newChild);
}
return extension.appendChild(extensionNode);
}
this.getExtension=function(){
return this.doc.selectSingleNode("/wmc:OWSContext/wmc:General/wmc:Extension");
}
this.initTimeExtent=function(objRef){
var timeNodes=objRef.doc.selectNodes("//wmc:Dimension[@name='time']");
for(var i=0;i<timeNodes.length;++i){
var extentNode=timeNodes[i];
objRef.timestampList=createElementWithNS(objRef.doc,"TimestampList",mbNsUrl);
var layerName=extentNode.parentNode.parentNode.selectSingleNode("wmc:Name").firstChild.nodeValue;
objRef.timestampList.setAttribute("layerName",layerName);
var times=extentNode.firstChild.nodeValue.split(",");for(var j=0;j<times.length;++j){
var params=times[j].split("/");if(params.length==3){
var start=setISODate(params[0]);
var stop=setISODate(params[1]);
var period=params[2];
var parts=period.match(/^P((\d*)Y)?((\d*)M)?((\d*)D)?T?((\d*)H)?((\d*)M)?((.*)S)?/);
for(var i=1;i<parts.length;++i){
if(!parts[i])parts[i]=0;
}
do{
var timestamp=createElementWithNS(objRef.doc,"Timestamp",mbNsUrl);
timestamp.appendChild(objRef.doc.createTextNode(getISODate(start)));
objRef.timestampList.appendChild(timestamp);
start.setFullYear(start.getFullYear()+parseInt(parts[2],10));
start.setMonth(start.getMonth()+parseInt(parts[4],10));
start.setDate(start.getDate()+parseInt(parts[6],10));
start.setHours(start.getHours()+parseInt(parts[8],10));
start.setMinutes(start.getMinutes()+parseInt(parts[10],10));
start.setSeconds(start.getSeconds()+parseFloat(parts[12]));
}while(start.getTime()<=stop.getTime());
}else{
var timestamp=createElementWithNS(objRef.doc,"Timestamp",mbNsUrl);
timestamp.appendChild(objRef.doc.createTextNode(times[j]));
objRef.timestampList.appendChild(timestamp);
}
}
objRef.setExtension(objRef.timestampList); 
}
}
this.addFirstListener("loadModel",this.initTimeExtent,this);
this.getCurrentTimestamp=function(layerName){
var index=this.getParam("timestamp");
return this.timestampList.childNodes[index].firstChild.nodeValue;
}
}
