function ModelBase(modelNode,parentModel){

Listener.apply(this);
this.async=true;this.contentType="text/xml";
this.modelNode=modelNode;
var idAttr=modelNode.attributes.getNamedItem("id");
if(idAttr){
this.id=idAttr.nodeValue;
}else{
this.id="MbModel_"+mbIds.getId();
}
var titleNode=modelNode.selectSingleNode("mb:title");
if(titleNode){
this.title=titleNode.firstChild.nodeValue;
}else{
this.title=this.id;
}

if(modelNode.selectSingleNode("mb:debug"))this.debug="true";
if(window.cgiArgs[this.id]){ 
this.url=window.cgiArgs[this.id];
}else if(window[this.id]){ 
this.url=window[this.id];
}else if(modelNode.url){ 
this.url=modelNode.url;
}else{
var defaultModel=modelNode.selectSingleNode("mb:defaultModelUrl");

if(defaultModel)this.url=defaultModel.firstChild.nodeValue;
}

var method=modelNode.selectSingleNode("mb:method");
if(method){
this.method=method.firstChild.nodeValue;
}else{
this.method="get";
}
var namespace=modelNode.selectSingleNode("mb:namespace");
if(namespace){
this.namespace=namespace.firstChild.nodeValue;
}
var templateAttr=modelNode.attributes.getNamedItem("template");
if(templateAttr){
this.template=(templateAttr.nodeValue=="true")?true:false;
this.modelNode.removeAttribute("template");
}
var nodeSelectXpath=modelNode.selectSingleNode("mb:nodeSelectXpath");
if(nodeSelectXpath){
this.nodeSelectXpath=nodeSelectXpath.firstChild.nodeValue;
}
this.getXpathValue=function(objRef,xpath){
if(!objRef.doc)return null; 
node=objRef.doc.selectSingleNode(xpath);
if(node&&node.firstChild){
return node.firstChild.nodeValue;
}else{
return null;
}
}
this.setXpathValue=function(objRef,xpath,value,refresh){
if(refresh==null)refresh=true;
var node=objRef.doc.selectSingleNode(xpath);
if(node){
if(node.firstChild){
node.firstChild.nodeValue=value;
}else{
dom=Sarissa.getDomDocument();
v=dom.createTextNode(value);
node.appendChild(v);
}
if(refresh)objRef.setParam("refresh");
return true;
}else{
return false;
}
}
this.loadModelDoc=function(objRef){
if(objRef.url){
objRef.callListeners("newModel");
objRef.setParam("modelStatus","loading");
if(objRef.contentType=="image"){
objRef.doc=new Image();
objRef.doc.src=objRef.url;
}else{
var xmlHttp=new XMLHttpRequest();
var sUri=objRef.url;
if(sUri.indexOf("http://")==0){
if(objRef.method=="get"){
sUri=getProxyPlusUrl(sUri);
}else{
sUri=config.proxyUrl;
}
}
xmlHttp.open(objRef.method,sUri,objRef.async);
if(objRef.method=="post"){
xmlHttp.setRequestHeader("content-type",objRef.contentType);
xmlHttp.setRequestHeader("serverUrl",objRef.url);
}
xmlHttp.onreadystatechange=function(){
objRef.setParam("modelStatus",httpStatusMsg[xmlHttp.readyState]);
if(xmlHttp.readyState==4){
if(xmlHttp.status>=400){var errorMsg="error loading document: "+sUri+" - "+xmlHttp.statusText+"-"+xmlHttp.responseText;
alert(errorMsg);
objRef.setParam("modelStatus",errorMsg);
return;
}else{
if((xmlHttp.responseXML!=null)&&(xmlHttp.responseXML.root!=null)&&(xmlHttp.responseXML.root.children.length>0)){
objRef.doc=xmlHttp.responseXML;
if(objRef.doc.parseError==0){
objRef.finishLoading(); 
}else{
alert("Parsing Error:"+objRef.doc.parseError+" "+Sarissa.getParseErrorText(objRef.doc));
}
return;
} 
if(xmlHttp.responseText!=null){
objRef.doc=Sarissa.getDomDocument();
objRef.doc.async=false;
objRef.doc=(new DOMParser()).parseFromString(xmlHttp.responseText.replace(/>\s+</g,"><"),"text/xml")
if(objRef.doc==null){
alert("Document parseError:"+Sarissa.getParseErrorText(objRef.doc))
}else{
if(objRef.doc.parseError==0){
objRef.finishLoading(); 
}else{
alert("Parsing Error:"+objRef.doc.parseError+" "+Sarissa.getParseErrorText(objRef.doc));
}
}
return;
}
}
}
}
xmlHttp.send(objRef.postData);
if(!objRef.async){
if(xmlHttp.status>=400){var errorMsg="error loading document: "+sUri+" - "+xmlHttp.statusText+"-"+xmlHttp.responseText;
alert(errorMsg);
this.objRef.setParam("modelStatus",errorMsg);
return;
}else{
if(null==xmlHttp.responseXML)alert("null XML response:"+xmlHttp.responseText);
objRef.doc=xmlHttp.responseXML;
objRef.finishLoading();
}
}
}
}
}
this.addListener("reloadModel",this.loadModelDoc,this);
this.setModel=function(objRef,newModel){
objRef.callListeners("newModel");
objRef.doc=newModel;
if((newModel==null)&&objRef.url){
objRef.url=null;
}
objRef.finishLoading();
}
this.finishLoading=function(){
if(this.doc){
this.doc.setProperty("SelectionLanguage","XPath");
if(this.namespace)Sarissa.setXpathNamespaces(this.doc,this.namespace);
if(this.debug)alert("Loading Model:"+this.id+" "+Sarissa.serialize(this.doc));
this.callListeners("loadModel");
}
}
this.newRequest=function(objRef,httpPayload){
var model=objRef;
if(objRef.template){
var parentNode=objRef.modelNode.parentNode;
if(_SARISSA_IS_IE){
var newConfigNode=parentNode.appendChild(modelNode.cloneNode(true));
}
else{
var newConfigNode=parentNode.appendChild(objRef.modelNode.ownerDocument.importNode(objRef.modelNode,true));
}
newConfigNode.removeAttribute("id");newConfigNode.setAttribute("createByTemplate","true");
model=objRef.createObject(newConfigNode);
model.callListeners("init");
if(!objRef.templates)objRef.templates=new Array();
objRef.templates.push(model);
}
model.url=httpPayload.url;
if(!model.url)model.doc=null;
model.method=httpPayload.method;
model.postData=httpPayload.postData;
model.loadModelDoc(model);
}
this.deleteTemplates=function(){
if(this.templates){
while(model=this.templates.pop()){
model.setParam("newModel");
var parentNode=this.modelNode.parentNode;
parentNode.removeChild(model.modelNode);
}
}
}


this.saveModel=function(objRef){
if(config.serializeUrl){
//alert("serialitzem ");
//config.serializeUrl --> /mapbuild/writeXML (el treu de mapbuilderConfig.xml)
//console.dirxml(objRef.doc); //�s el SLD que hem creat!! (despr�es d'aplicar XSL, etc)
var response=postGetLoad(config.serializeUrl,objRef.doc,"text/xml","/temp","sld.sld");
//console.warn(response);
//postGetLoad
response.setProperty("SelectionLanguage","XPath");
Sarissa.setXpathNamespaces(response,"xmlns:xlink='http://www.w333.org/1999/xlink'");

var onlineResource=response.selectSingleNode("//OnlineResource");
//console.dirxml(onlineResource);
var fileUrl=onlineResource.attributes.getNamedItem("xlink:href").nodeValue;
//console.log(fileUrl);
//    /mapbuild/temp/pere_test43995.sld

var temp = new Array();
temp = fileUrl.split('/');
//console.log(temp['3']); //nom de l'arxiu creat
var nou_sld=temp['3'];
var sld_url='http://edit.csic.es/edit_geo/temp/'+nou_sld;
//console.log(sld_url);
config.objects.mainMap.setSLD(sld_url);
this.callListeners("refresh");
//setSLDModel=function(sldmodel)
//config.objects.mainMap.doc(setParam("refreshWmsLayers");
//console.info("feet");
objRef.setParam("modelSaved",fileUrl);
}else{
alert("serializeUrl must be specified in config to save a model");
}
}
this.createObject=function(configNode){
var objectType=configNode.nodeName;
var newObject=new window[objectType](configNode,this);
if(newObject){
config.objects[newObject.id]=newObject;
return newObject;
}else{ 
alert("error creating object:"+objectType);
}
}
this.loadObjects=function(objectXpath){
var configObjects=this.modelNode.selectNodes(objectXpath);
for(var i=0;i<configObjects.length;i++){
this.createObject(configObjects[i]);
}
}
this.parseConfig=function(objRef){
objRef.loadObjects("mb:widgets/*");
objRef.loadObjects("mb:tools/*");
objRef.loadObjects("mb:models/*");
}
this.refresh=function(objRef){
objRef.setParam("refresh");
}
this.addListener("loadModel",this.refresh,this);
this.init=function(objRef){
objRef.callListeners("init");
}
this.clearModel=function(objRef){
objRef.doc=null;
}
if(parentModel){
this.parentModel=parentModel;
this.parentModel.addListener("init",this.init,this);
this.parentModel.addListener("loadModel",this.loadModelDoc,this);
this.parentModel.addListener("newModel",this.clearModel,this);
this.parseConfig(this);
}
}
var httpStatusMsg=['uninitialized','loading','loaded','interactive','completed'];
