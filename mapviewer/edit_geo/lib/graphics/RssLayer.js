mapbuilder.loadScript(baseDir+"/graphics/MapLayer.js");
mapbuilder.loadScript(baseDir+"/graphics/StyledLayerDescriptor.js");
mapbuilder.loadScript(baseDir+"/graphics/VectorGraphics.js");
mapbuilder.loadScript(baseDir+"/widget/TipWidget.js");
mapbuilder.loadScript(baseDir+"/model/Proj.js");
function RssLayer(model,mapPane,layerName,layerNode,queryable,visible){
MapLayer.apply(this,new Array(model,mapPane,layerName,layerNode,queryable,visible));
this.parse=function(){
var namespace="xmlns:wmc='http://www.opengis.net/context' xmlns:sld='http://www.opengis.net/sld' xmlns:xlink='http://www.w3.org/1999/xlink'";
var doc=this.layerNode.ownerDocument;
Sarissa.setXpathNamespaces(doc,namespace);
this.id=this.layerNode.attributes.getNamedItem("id").nodeValue;
this.layerName=this.id;
var styleNode=this.layerNode.selectSingleNode("//wmc:StyleList");
var hiliteStyleNode=styleNode.selectSingleNode("//wmc:Style[wmc:Name='Highlite']");
var normalStyleNode=styleNode.selectSingleNode("//wmc:Style[wmc:Name='Normal']");
this.normalSld=new StyleLayerDescriptor(normalStyleNode);
this.hiliteSld=new StyleLayerDescriptor(hiliteStyleNode);
this.title=this.layerNode.selectSingleNode("//wmc:Title").firstChild.nodeValue;
var node=this.layerNode.selectSingleNode("//wmc:Abstract");
var children=node.childNodes;
this.myabstract="";
for(var j=0;j<children.length;j++){ 
this.myabstract+=Sarissa.serialize(children[j]);
}
node=this.layerNode.selectSingleNode("//wmc:Where");
var type=node.firstChild;
if(type!=undefined){
this.gmlType=type.nodeName;
if(this.gmlType=="gml:Point"){
var pos=type.firstChild;
this.coords=pos.firstChild.nodeValue;
}else if(this.gmlType=="gml:LineString"){
var posList=type.firstChild;
var children=posList.childNodes; 
var count=children.length;
this.coords=""; 
for(var j=0;j<count;j++){
this.coords+=children[j].nodeValue;
}
}else if(this.gmlType=="gml:Polygon"){
this.coords=null;
var ext=type.firstChild;
var linearRing=ext.firstChild;
if(linearRing.firstChild){
this.posList=linearRing.firstChild;
this.coords=this.posList.firstChild.nodeValue;
}
}else if(this.gmlType=="gml:Box"||this.gmlType=="gml:Envelope"){
var posList=type.firstChild;
var children=posList.childNodes; 
var count=children.length;
this.coords=""; 
var c=new Array(); 
c=children[0].nodeValue.split(" "); 
this.coords+=c[0]+" "+c[1]+",\n"
+c[2]+" "+c[1]+",\n"
+c[2]+" "+c[3]+",\n"
+c[0]+" "+c[3]+",\n" 
+c[0]+" "+c[1];
}else{
alert("Unsupported GML Geometry:"+this.gmlType)
}
}else{
this.coords=null;
var pidNode=this.layerNode.attributes.getNamedItem("id");
if(pidNode!=null){
var pid=pidNode.nodeValue;
var url="http://www.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=afbacfb4d14cd681c04a06d69b24d847&photo_id="+pid;
var sUri=getProxyPlusUrl(url);
var xmlHttp=new XMLHttpRequest();
xmlHttp.open("GET",sUri,false);
xmlHttp.send(null);
var latitude=0;
var longitude=0;
var tags=xmlHttp.responseXML.selectNodes("//tag");
if(tags.length==0){alert(Sarissa.serialize(xmlHttp.responseXML));
}
this.myabstract+="<br/>"
for(var i=0;i<tags.length;++i){
var raw=tags[i].attributes.getNamedItem("raw").nodeValue;
if(raw.indexOf("geo:lat=")>=0){
latitude=raw.substr(8);
this.myabstract+="lat:"+latitude+"<br/>";
}else if(raw.indexOf("geo:long=")>=0){
longitude=raw.substr(9);
this.myabstract+="long:"+longitude+"<br/>";
}
}
this.gmlType="gml:Point";
this.coords=longitude+","+latitude;
}
}
}
this.isWmsLayer=function(){
return false;
}
this.paintPoint=function(sld,hiliteOnly){
if(hiliteOnly){
sld.hilitePoint(this.gr,this.shape);
}else{
if(this.coords!=null){
var containerProj=new Proj(this.model.getSRS());
var re=RegExp('[, \n\t]+','g');
var point=this.coords.split(re);
point=containerProj.Forward(point);
var pointLine=this.model.extent.getPL(point);
this.shape=sld.paintPoint(this.gr,pointLine);
if(this.shape!=null){
this.shape.id=this.id+"_vector";
this.gr.paint(); 
this.install(this.shape);
}
}
} 
}
this.paintPolygon=function(sld,hiliteOnly){
if(hiliteOnly){
sld.hilitePolygon(this.gr,this.shape);
}else{
if(this.coords!=null){
var containerProj=new Proj(this.model.getSRS());
var re=RegExp('[, \n\t]+','g');
var pointPairs=this.coords.split(re);
var newPointArr=new Array(pointPairs.length/2);
var point=new Array(2);
var screenCoords;
var jj=0;
for(var i=0;i<pointPairs.length;i++){
point[0]=pointPairs[i];
point[1]=pointPairs[i+1];
screenCoords=containerProj.Forward(point);
screenCoords=this.model.extent.getPL(screenCoords);
newPointArr[jj]=screenCoords; 
jj++; 
i++;
} 
this.shape=sld.paintPolygon(this.gr,newPointArr);
this.shape.id=this.id+"_vector";
this.gr.paint();
this.install(this.shape);
}
}
}
this.paintLine=function(sld,hiliteOnly){
if(hiliteOnly){
sld.hiliteLine(this.gr,this.shape);
}else{
var containerProj=new Proj(this.model.getSRS());
var re=RegExp('[, \n\t]+','g');
var pointPairs=this.coords.split(re);
var newPointArr=new Array(pointPairs.length/2);
var point=new Array(2);
var screenCoords;
var jj=0;
for(var i=0;i<pointPairs.length;i++){ 
point[0]=pointPairs[i];
point[1]=pointPairs[i+1];
screenCoords=containerProj.Forward(point);
screenCoords=this.model.extent.getPL(screenCoords);
newPointArr[jj]=screenCoords; 
jj++ 
i++;
} 
this.shape=sld.paintLine(this.gr,newPointArr);
this.shape.id=this.id+"_vector";
this.gr.paint();
this.install(this.shape);
} 
}
this.getDiv=function(layerNum){
var outputNode=document.getElementById(this.mapPane.outputNodeId).parentNode;
var div=document.getElementById("vector_elements");
if(div==null){
div=document.createElement("div");
div.setAttribute("id","vector_elements");
div.style.position="absolute";
div.style.visibility="visible";
div.style.zIndex=600;
outputNode.appendChild(div);
}
div.style.top=0;
div.style.left=0;
return div;
}
this.paint=function(){
this.paint(null,null);
}
this.paint=function(objRef,img){
this.deleteShape();
this.paintShape(this.normalSld,false);
}
this.deleteShape=function(){
var id=this.id+"_vector";
var node=document.getElementById(id);
if(node!=null){
node.parentNode.removeChild(node);
node=document.getElementById(id);
if(node!=null){
alert("failed to remove:"+id);
}
}
}
this.unpaint=function(){
this.deleteShape();
}
this.paintShape=function(sld,hiliteOnly){
if(this.gmlType=="gml:Point"){
this.paintPoint(sld,hiliteOnly);
}else if(this.gmlType=="gml:LineString"){
this.paintLine(sld,hiliteOnly);
}else if(this.gmlType=="gml:Polygon"|| 
this.gmlType=="gml:Envelope"||
this.gmlType=="gml:Box"){
this.paintPolygon(sld,hiliteOnly);
} 
}
this.install=function(shape){
shape.onmouseover=this.mouseOverHandler; 
shape.onmouseout=this.mouseOutHandler;
shape.onclick=this.mouseClickHandler;
}
this.mouseOverHandler=function(ev){
var containerNode=document.getElementById("mainMapContainer")
if(containerNode){
containerNode.oldEventHandler=containerNode.onmouseup;
containerNode.onmouseup=null; 
containerNode.onmousedown=null; 
}
this.style.cursor="help";
return true;
}
this.mouseOutHandler=function(ev){ 
this.style.cursor="default";
var containerNode=document.getElementById("mainMapContainer")
if(containerNode){
containerNode.onmouseup=containerNode.oldEventHandler;
containerNode.onmousedown=containerNode.oldEventHandler;
}
return true;
}
this.mouseClickHandler=function(ev){ 
ev.cancelBubble=true;
if(ev.stopPropagation)ev.stopPropagation();
config.objects.geoRSS.setParam('clickFeature',this.id);
return true;
}
this.clickIt=function(objRef,featureId){
if(featureId.indexOf(objRef.id)>=0){ 
var posx=0;
var posy=0;
var cn=window.cursorTrackNode;
if(cn){ 
var evPL=cn.evpl;
if(evPL!=null){
posx=evPL[0];
posy=evPL[1];
var popupStr=objRef.myabstract;
if(popupStr==undefined){
popupStr="Feature under construction.  Stay tuned!";
}
}
}
if(posx>0&&posx<objRef.width&&posy>0&&posy<objRef.height){
toolTipObjs[objRef.tooltip].paint(new Array(posx,posy,featureId,objRef.title,popupStr));
}
}
}
this.highlight=function(objRef,featureId){
if(featureId.indexOf(objRef.id)>=0){
objRef.paintShape(objRef.hiliteSld,true);
var posx=0;
var posy=0;
var cn=window.cursorTrackNode;
if(cn){ 
var evPL=cn.evpl;
if(evPL!=null){
posx=evPL[0];
posy=evPL[1];
var popupStr=objRef.myabstract;
if(popupStr==undefined){
popupStr="Feature under construction.  Stay tuned!";
}
}
}
if(posx>0&&posx<objRef.width&&posy>0&&posy<objRef.height){
toolTipObjs[objRef.tooltip].paint(new Array(posx,posy,featureId,objRef.title,popupStr));
}
}
}
this.dehighlight=function(objRef,featureId){
if(featureId.indexOf(objRef.id)>=0){
objRef.paintShape(objRef.normalSld,true);
toolTipObjs[objRef.tooltip].clear();
}
}
this.parse();
this.width=layerNode.attributes.getNamedItem("width").nodeValue;
this.height=layerNode.attributes.getNamedItem("height").nodeValue;
var div=this.getDiv();
this.gr=new VectorGraphics(this.id,div,this.width,this.height);
config.objects.geoRSS.addListener("highlightFeature",this.highlight,this);
config.objects.geoRSS.addListener("dehighlightFeature",this.dehighlight,this);
config.objects.geoRSS.addListener("clickFeature",this.clickIt,this);
this.tooltip=config.objects.geoRSS.tipWidgetId;
}
