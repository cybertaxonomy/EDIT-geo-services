mapbuilder.loadScript(baseDir+"/graphics/MapLayer.js");
mapbuilder.loadScript(baseDir+"/graphics/SldRenderer.js");
mapbuilder.loadScript(baseDir+"/graphics/VectorGraphics.js");
mapbuilder.loadScript(baseDir+"/widget/TipWidget.js");
mapbuilder.loadScript(baseDir+"/model/Proj.js");
function GmlLayer(model,mapPane,layerName,layerNode,queryable,visible){
MapLayer.apply(this,new Array(model,mapPane,layerName,layerNode,queryable,visible));
this.parse=function(){
namespace="xmlns:wmc='http://www.opengis.net/context' xmlns:sld='http://www.opengis.net/sld' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:gml='http://www.opengis.net/gml'";
Sarissa.setXpathNamespaces(this.layerNode,namespace);
this.id=this.model.id+"_"+this.mapPane.id+"_"+this.layerName;
var styleNode=this.layerNode.selectSingleNode("//wmc:StyleList");
if(styleNode){
var hiliteStyleNode=styleNode.selectSingleNode("//wmc:Style[wmc:Name='Highlite']");
var normalStyleNode=styleNode.selectSingleNode("//wmc:Style[wmc:Name='Normal']");
this.normalSld=new SldRenderer(normalStyleNode);
this.hiliteSld=new SldRenderer(hiliteStyleNode);
}else{
this.normalSld=new SldRenderer(null);
this.hiliteSld=new SldRenderer(null);
}
this.containerProj=new Proj(this.model.getSRS());
width=this.model.getWindowWidth();
height=this.model.getWindowHeight();
div=this.getDiv(this.id);
this.div=div;this.gr=new VectorGraphics(this.id,div,width,height);
featureNodes=this.layerNode.selectNodes(".//gml:featureMember");
this.features=new Array();
for(k=0;k<featureNodes.length;k++){
this.features[k]=new Array();
this.features[k].node=featureNodes[k];
this.features[k].id=this.id+k;
this.features[k].geoCoords=this.getGeoCoords(featureNodes[k],k+1);
this.features[k].shapes=new Array();this.features[k].sld=this.normalSld;
this.features[k].group=this.gr.getGroupTag(null,this.features[k].id+"_g");
this.normalSld.setStyle(this.gr,this.features[k].group);
}
if(featureNodes.length>0){
this.gmlType=featureNodes[0].selectSingleNode(".//gml:Point|.//gml:LineString|.//gml:Polygon|.//gml:LinearRing|.//gml:Box|.//gml:Envelope");
if(this.gmlType){
this.gmlType=this.gmlType.nodeName;
}else{
alert("Unsupported GML Geometry for layer:"+this.id);
}
}
}
this.getGeoCoords=function(node){
coordsNodes=node.selectNodes(".//gml:pos|.//gml:posList|.//gml:coordinates");
points=new Array();
for(h=0;h<coordsNodes.length;h++){
points[h]=new Array();
dim=2;
if(coordsNodes[h]){
d=coordsNodes[h].selectSingleNode("@srsDimension");
if(d)dim=parseInt(d.firstChild.nodeValue);
coords=coordsNodes[h].firstChild.nodeValue;
}
if(coords){
var re=RegExp('[, \n\t]+','g');
point=coords.split(re);
while(point[0]=="")point.shift();
while(point[point.length-1]=="")point.pop();
for(i=0,j=0;i<point.length;j++,i=i+dim){
points[h][j]=new Array(point[i],point[i+1]);
}
}
}
return points;
}
this.isWmsLayer=function(){
return false;
}
this.getDiv=function(fid,layerNum){
var outputNode=document.getElementById(this.mapPane.outputNodeId).parentNode;
var div=document.getElementById(fid);
if(div==null){
div=document.createElement("div");
div.setAttribute("id",fid);
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
this.paintFeatures();
}
this.unpaint=function(){
}
this.paintFeatures=function(){
for(k=0;k<this.features.length;k++){
id1=this.features[k].id+"_g";
node=document.getElementById(id1);
for(i=0;node.childNodes.length>0;){
node.removeChild(node.childNodes[0]);
}
for(h=0;h<this.features[k].geoCoords.length;h++){
screenCoords=new Array();
for(c=0;c<this.features[k].geoCoords[h].length;c++){
reproj=this.containerProj.Forward(this.features[k].geoCoords[h][c]);
screenCoords[c]=this.model.extent.getPL(reproj);
}
this.features[k].shapes[h]=this.features[k].sld.paint(this.gr,screenCoords,this.features[k].group,this.gmlType);
}
}
}
this.parse();
this.paint();
}
