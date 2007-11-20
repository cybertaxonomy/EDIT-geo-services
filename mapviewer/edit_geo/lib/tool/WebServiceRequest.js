mapbuilder.loadScript(baseDir+"/tool/ToolBase.js");
function WebServiceRequest(toolNode,model){
ToolBase.apply(this,new Array(toolNode,model));
var requestName=toolNode.selectSingleNode("mb:requestName");
if(requestName){
this.requestName=requestName.firstChild.nodeValue;
}
var requestFilter=toolNode.selectSingleNode("mb:requestFilter");
if(requestFilter){
this.requestFilter=requestFilter.firstChild.nodeValue;
}
var styleUrl=baseDir+"/tool/xsl/"+this.requestName.replace(/:/,"_")+".xsl";
this.requestStylesheet=new XslProcessor(styleUrl);
for(var j=0;j<toolNode.childNodes.length;j++){
if(toolNode.childNodes[j].firstChild&&toolNode.childNodes[j].firstChild.nodeValue){
this.requestStylesheet.setParameter(toolNode.childNodes[j].nodeName,toolNode.childNodes[j].firstChild.nodeValue);
}
}
this.model.addListener("init",this.init,this);
this.model.addListener(this.requestName.replace(/:/,"_"),this.doRequest,this);
}
WebServiceRequest.prototype.createHttpPayload=function(feature){
if(this.debug)alert("source:"+Sarissa.serialize(feature));
var httpPayload=new Object();
httpPayload.method=this.targetModel.method;
this.requestStylesheet.setParameter("httpMethod",httpPayload.method);
this.requestStylesheet.setParameter("version",this.model.getVersion(feature));
if(this.requestFilter){
var filter=config.objects[this.requestFilter];
this.requestStylesheet.setParameter("filter",escape(Sarissa.serialize(filter.doc).replace(/[\n\f\r\t]/g,'')));
if(this.debug)alert(Sarissa.serialize(filter.doc));
}
httpPayload.postData=this.requestStylesheet.transformNodeToObject(feature);
if(this.debug){
alert("request data:"+Sarissa.serialize(httpPayload.postData));
if(config.serializeUrl)var response=postLoad(config.serializeUrl,httpPayload.postData);
}
httpPayload.url=this.model.getServerUrl(this.requestName,httpPayload.method,feature);
if(httpPayload.method.toLowerCase()=="get"){
httpPayload.postData.setProperty("SelectionLanguage","XPath");
Sarissa.setXpathNamespaces(httpPayload.postData,"xmlns:mb='http://mapbuilder.sourceforge.net/mapbuilder'");
var queryString=httpPayload.postData.selectSingleNode("//mb:QueryString");
if(httpPayload.url.indexOf("?")<0){
httpPayload.url+="?";
}else{
httpPayload.url+="&";
}
httpPayload.url+=queryString.firstChild.nodeValue;
httpPayload.postData=null;
}
if(this.debug)alert("URL:"+httpPayload.url);
return httpPayload;
}
WebServiceRequest.prototype.doRequest=function(objRef,featureName){
objRef.targetModel.featureName=featureName;
var feature=objRef.model.getFeatureNode(featureName);
if(!feature){
alert("WebServiceRequest: error finding feature node:"+featureName);
return;
}
if(objRef.model.setRequestParameters)objRef.model.setRequestParameters(featureName,objRef.requestStylesheet);
var httpPayload=objRef.createHttpPayload(feature);
objRef.targetModel.newRequest(objRef.targetModel,httpPayload);
}
WebServiceRequest.prototype.setAoiParameters=function(objRef){
if(objRef.containerModel){
var featureSRS=null;
var containerSRS="EPSG:4326";
var bbox=objRef.containerModel.getBoundingBox();
var containerSRS=objRef.containerModel.getSRS();
objRef.requestStylesheet.setParameter("bBoxMinX",bbox[0]);
objRef.requestStylesheet.setParameter("bBoxMinY",bbox[1]);
objRef.requestStylesheet.setParameter("bBoxMaxX",bbox[2]);
objRef.requestStylesheet.setParameter("bBoxMaxY",bbox[3]);
objRef.requestStylesheet.setParameter("srs",containerSRS);
objRef.requestStylesheet.setParameter("width",objRef.containerModel.getWindowWidth());
objRef.requestStylesheet.setParameter("height",objRef.containerModel.getWindowHeight());
}
}
WebServiceRequest.prototype.init=function(objRef){
if(objRef.targetModel.containerModel){
objRef.containerModel=objRef.targetModel.containerModel;
}else if(objRef.model.containerModel){
objRef.containerModel=objRef.model.containerModel;
}
if(objRef.containerModel){
objRef.containerModel.addListener("aoi",objRef.setAoiParameters,objRef);
objRef.containerModel.addListener("bbox",objRef.setAoiParameters,objRef);
objRef.containerModel.addListener("mouseup",objRef.setClickPosition,objRef);
objRef.containerModel.addListener("selectedLayer",objRef.selectFeature,objRef);
}
}
WebServiceRequest.prototype.setClickPosition=function(objRef,targetNode){
objRef.requestStylesheet.setParameter("xCoord",targetNode.evpl[0]);
objRef.requestStylesheet.setParameter("yCoord",targetNode.evpl[1]);
}
WebServiceRequest.prototype.selectFeature=function(objRef,featureName){
objRef.requestStylesheet.setParameter("queryLayer",featureName);
}
