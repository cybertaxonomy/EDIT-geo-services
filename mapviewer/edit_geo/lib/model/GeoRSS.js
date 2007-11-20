mapbuilder.loadScript(baseDir+"/graphics/RssLayer.js");
function GeoRSS(modelNode,parent){
ModelBase.apply(this,new Array(modelNode,parent));
this.initItems=function(objRef){
var items=objRef.doc.selectNodes("rdf:RDF/rss:item");
if(items.length==0){
items=objRef.doc.selectNodes("atom:feed/atom:entry");
}
for(var i=0;i<items.length;++i){
var item=items[i];
item.setAttribute("divid","RSS_Item_"+mbIds.getId());
}
}
this.getFeatureNodes=function(){
return this.doc.selectNodes(this.nodeSelectXpath);
}
this.getFeatureName=function(featureNode){
var labelNode=featureNode.selectSingleNode("rss:title");
if(labelNode==null)
labelNode=featureNode.selectSingleNode("atom:title");
return labelNode?labelNode.firstChild.nodeValue:"No RSS title";
}
this.getFeatureId=function(featureNode){
var id=featureNode.getAttribute("divid")
if(id)
return id;
return "no_id";
}
this.getFeaturePoint=function(featureNode){
if(featureNode.selectSingleNode("geo:long")){
var pointX=featureNode.selectSingleNode("geo:long").firstChild.nodeValue;
var pointY=featureNode.selectSingleNode("geo:lat").firstChild.nodeValue;
return new Array(pointX,pointY);
}else{
var pos=featureNode.selectSingleNode("georss:where/gml:Point/gml:pos")
if(pos!=null){
var coordstr=pos.firstChild.nodeValue
var coords=coordstr.split(" ")
var pointX=coords[0]
var pointY=coords[1]
return new Array(pointX,pointY);
}else{
return new Array(0,0);}
}
}
this.getFeatureGeometry=function(featureNode){
if(featureNode.selectSingleNode("geo:long")){
var pointX=featureNode.selectSingleNode("geo:long").firstChild.nodeValue;
var pointY=featureNode.selectSingleNode("geo:lat").firstChild.nodeValue;
return "POINT "+pointX+","+pointY;
} 
var pos=featureNode.selectSingleNode("georss:where/gml:Point/gml:pos")
if(pos!=null){
var coordstr=pos.firstChild.nodeValue
return "POINT "+coordstr;
} 
var posList=featureNode.selectSingleNode("georss:where/gml:LineString/gml:posList")
if(posList!=null){var children=posList.childNodes; 
var count=children.length;
var text=""; 
for(var i=0;i<count;i++){
text+=children[i].nodeValue;
}
return "LINESTRING "+text;
}
var posList=featureNode.selectSingleNode("georss:where/gml:Polygon/gml:exterior/gml:LinearRing")
if(posList!=null){
var coordstr=posList.firstChild.nodeValue
return "POLYGON "+coordstr;
} 
alert("Invalid GML Geometry")
return null
}
this.getFeatureGml=function(featureNode){
var where=featureNode.selectSingleNode("georss:where")
if(where!=null){
var gml=where.firstChild; 
return gml;
}else{
return null;
}
}
this.getFeatureIcon=function(featureNode){
if(featureNode==null)
return null;
var icon=featureNode.selectSingleNode("atom:icon");
if(icon!=undefined){
return icon.firstChild.nodeValue;
}else{
return null;
}
}
}
