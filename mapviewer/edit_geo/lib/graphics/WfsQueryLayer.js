mapbuilder.loadScript(baseDir+"/graphics/MapLayer.js");
mapbuilder.loadScript(baseDir+"/graphics/StyledLayerDescriptor.js");
mapbuilder.loadScript(baseDir+"/graphics/VectorGraphics.js");
mapbuilder.loadScript(baseDir+"/widget/TipWidget.js");
mapbuilder.loadScript(baseDir+"/model/Proj.js");
function WfsQueryLayer(model,mapPane,layerName,layerNode,queryable,visible){
MapLayer.apply(this,new Array(model,mapPane,layerName,layerNode,queryable,visible));
this.id="WfsQueryLayer";
this.model=model;
this.uuid=layerNode.getAttribute("id");
this.featureCount=0;
this.parse=function(){
var namespace="xmlns:wmc='http://www.opengis.net/context' xmlns:ows='http://www.opengis.net/ows' xmlns:sld='http://www.opengis.net/sld' xmlns:xlink='http://www.w3.org/1999/xlink'";
var doc=this.layerNode.ownerDocument;
Sarissa.setXpathNamespaces(doc,namespace);
var styleNode=this.layerNode.selectSingleNode("wmc:StyleList");
if(styleNode==null)alert("cannot find style node")
var hiliteStyleNode=styleNode.selectSingleNode("wmc:Style[wmc:Name='Highlite']");
var normalStyleNode=styleNode.selectSingleNode("wmc:Style[wmc:Name='Normal']");
this.normalSld=new StyleLayerDescriptor(normalStyleNode);
this.hiliteSld=new StyleLayerDescriptor(hiliteStyleNode);
this.title=this.layerNode.selectSingleNode("wmc:Title").firstChild.nodeValue;
}
this.paintPoint=function(sld,hiliteOnly){
if(hiliteOnly){
sld.hilitePoint(this.gr,this.shape);
}else{
if(this.coords!=null){
var containerProj=new Proj(this.model.containerModel.getSRS());
var re=RegExp('[, \n\t]+','g');
var point=this.coords.split(re);
point=containerProj.Forward(point);
var pointLine=this.model.containerModel.extent.getPL(point);
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
var containerProj=new Proj(this.model.containerModel.getSRS());
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
screenCoords=this.model.containerModel.extent.getPL(screenCoords);
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
var containerProj=new Proj(this.model.containerModel.getSRS());
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
screenCoords=this.model.extent.containerModel.getPL(screenCoords);
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
this.deletePreviousFeatures();
var nodeList=this.model.getFeatureNodes();
for(var i=0;i<nodeList.length;i++){
featureNode=nodeList[i]
type=this.model.getFeatureGeometry(featureNode)
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
}
this.id="wfs_"+this.uuid+"_"+i 
this.paintShape(this.normalSld,false);
}
this.featureCount=nodeList.length;
}
this.deleteShape=function(){
var id=this.id+"_vector";
var node=document.getElementById(id);
while(node!=null){
var parentNode=node.parentNode;
parentNode.removeChild(node);
node=document.getElementById(id);
}
}
this.deletePreviousFeatures=function(){
for(var i=0;i<this.featureCount;i++){
this.id="wfs_"+this.uuid+"_"+i 
this.deleteShape()
}
}
this.unpaint=function(){
var nodeList=this.model.getFeatureNodes(); 
for(var i=0;i<nodeList.length;i++){
this.id="wfs_"+this.uuid+"_"+i 
this.deleteShape();
}
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
shape.onmouseup=this.mouseClickHandler;
shape.model=this.model.id; 
}
this.mouseOverHandler=function(ev){
var idAttr=this.getAttribute("id").split("_")
var id=idAttr[2]
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
var idAttr=this.getAttribute("id").split("_")
var id=idAttr[2]
var containerNode=document.getElementById("mainMapContainer")
if(containerNode){
containerNode.onmouseup=containerNode.oldEventHandler;
containerNode.onmousedown=containerNode.oldEventHandler;
}
this.style.cursor="default";
return true;
}
this.mouseClickHandler=function(ev){ 
var idAttr=this.getAttribute("id").split("_")
var id=idAttr[2]
config.objects[this.model].setParam('clickFeature',id);
return true;
}
this.clickIt=function(objRef,featureId){
var nodeList=objRef.model.getFeatureNodes();
var node=nodeList[featureId];
toolTipObjs[objRef.tooltip].paintXSL(node);
}
this.highlight=function(objRef,featureId){
objRef.paintShape(objRef.hiliteSld,true);
var nodeList=objRef.model.getFeatureNodes();
var node=nodeList[featureId];
toolTipObjs[objRef.tooltip].paintXSL(node);
}
this.dehighlight=function(objRef,featureId){
objRef.paintShape(objRef.normalSld,true);
toolTipObjs[objRef.tooltip].clear();
}
this.parse();
this.width=null;this.height=null; 
var div=this.getDiv();
this.gr=new VectorGraphics(this.id,div,this.width,this.height);
config.objects[this.model.id].addListener("highlightFeature",this.highlight,this);
config.objects[this.model.id].addListener("dehighlightFeature",this.dehighlight,this);
config.objects[this.model.id].addListener("clickFeature",this.clickIt,this);
this.tooltip=config.objects[this.model.id].tipWidgetId;
}
