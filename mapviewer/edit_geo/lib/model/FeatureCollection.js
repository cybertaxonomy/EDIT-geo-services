mapbuilder.loadScript(baseDir+"/graphics/WfsQueryLayer.js");
function FeatureCollection(modelNode,parent){
ModelBase.apply(this,new Array(modelNode,parent));
var featureTagName=modelNode.selectSingleNode("mb:featureTagName");
if(featureTagName){
this.featureTagName=featureTagName.firstChild.nodeValue;
}else{
this.featureTagName="topp:CITY_NAME";
}
var coordsTagName=modelNode.selectSingleNode("mb:coordsTagName");
if(coordsTagName){
this.coordsTagName=coordsTagName.firstChild.nodeValue;
}else{
this.coordsTagName="//gml:coordinates";
}
var nodeSelectXpath=modelNode.selectSingleNode("mb:nodeSelectXpath");
if(nodeSelectXpath){
this.nodeSelectXpath=nodeSelectXpath.firstChild.nodeValue;
}
var coordSelectXpath=modelNode.selectSingleNode("mb:coordSelectXpath");
if(coordSelectXpath){
this.coordSelectXpath=coordSelectXpath.firstChild.nodeValue;
}else{
this.coordSelectXpath="topp:the_geom/gml:MultiPoint/gml:pointMember/gml:Point/gml:coordinates";
}
this.convertCoords=function(objRef){
if(objRef.doc&&objRef.containerModel&&objRef.containerModel.doc){
var coordNodes=objRef.doc.selectNodes(objRef.coordsTagName);
if(coordNodes.length>0&&objRef.containerModel){
var srsNode=coordNodes[0].selectSingleNode("ancestor-or-self::*/@srsName");
if(srsNode&&(srsNode.nodeValue.toUpperCase()!=objRef.containerModel.getSRS().toUpperCase())){
var sourceProj=new Proj(srsNode.nodeValue);
objRef.setParam("modelStatus","converting coordinates");
var containerProj=new Proj(objRef.containerModel.getSRS());
for(var i=0;i<coordNodes.length;++i){
var coords=coordNodes[i].firstChild.nodeValue;
var coordsArray=coords.split(' ');
var newCoords='';
for(var j=0;j<coordsArray.length;++j){
var xy=coordsArray[j].split(',');
if(xy.length==2){
var llTemp=sourceProj.Inverse(xy);
xy=containerProj.Forward(llTemp);
newCoords+=xy.join(',')+' ';
}
}
coordNodes[i].firstChild.nodeValue=newCoords;
}
}
}
}
}
this.loadWfsRequests=function(objRef){
if(objRef.containerModel.doc!=null){
var featureTypes=objRef.containerModel.doc.selectNodes("/wmc:OWSContext/wmc:ResourceList/wmc:FeatureType");
if(featureTypes.length>0){
for(var i=0;i<featureTypes.length;i++){
var httpPayload=new Object(); 
var wfsFeature=featureTypes[i]
var server=wfsFeature.selectSingleNode("wmc:Server")
var onlineResource=server.selectSingleNode("wmc:OnlineResource")
httpPayload.method=onlineResource.getAttribute("method")
httpPayload.url=onlineResource.getAttribute("xlink:href")
var query=wfsFeature.selectSingleNode("wfs:GetFeature")
httpPayload.postData=Sarissa.serialize(query)
objRef.wfsFeature=wfsFeature
objRef.newRequest(objRef,httpPayload);
}
}
}
}
this.addFirstListener("loadModel",this.convertCoords,this);
if(this.containerModel)this.containerModel.addListener("loadModel",this.loadWfsRequests,this);
this.setHidden=function(featureName,hidden){
this.hidden=hidden;
this.callListeners("hidden",featureName);
}
this.getHidden=function(layerName){
return this.hidden;
}
this.hidden=false;
this.getFeatureNodes=function(){
var featureMember=this.doc.selectSingleNode(this.nodeSelectXpath);
if(featureMember!=null)
return featureMember.childNodes
else
return null;
}
this.getFeatureName=function(featureNode){
var labelNode=featureNode.selectSingleNode(this.featureTagName);return labelNode?labelNode.firstChild.nodeValue:"No RSS title";
}
this.getFeatureId=function(featureNode){
return featureNode.getAttribute("fid")?featureNode.getAttribute("fid"):"no_id";
}
this.getFeaturePoint=function(featureNode){
var coords=featureNode.selectSingleNode(this.coordSelectXpath);
var coords=featureNode.selectSingleNode(coordSelectXpath);
if(coords){
var point=coords.firstChild.nodeValue.split(',');
return point
}else{
return new Array(0,0);}
}
this.getFeatureGeometry=function(featureNode){
var geometryTag=featureNode.selectSingleNode(this.coordsTagName);
if(geometryTag!=null)
return geometryTag.firstChild;
else{
alert("invalid geom for:"+Sarissa.serialize(featureNode))
}
}
}
