mapbuilder.loadScript(baseDir+"/widget/WidgetBaseXSL.js");
mapbuilder.loadScript(baseDir+"/util/dojo/src/uuid/TimeBasedGenerator.js");
function WebServiceForm(widgetNode,model){
WidgetBaseXSL.apply(this,new Array(widgetNode,model));
this.formElements=new Object();
var requestStylesheet=widgetNode.selectSingleNode("mb:requestStylesheet");
if(requestStylesheet){
this.requestStylesheet=new XslProcessor(requestStylesheet.firstChild.nodeValue,model.namespace); 
}
var webServiceUrl=widgetNode.selectSingleNode("mb:webServiceUrl");
if(webServiceUrl){
this.webServiceUrl=webServiceUrl.firstChild.nodeValue; 
}
this.submitForm=function(){
this.webServiceForm=document.getElementById(this.formName);
if(this.webServiceForm==null){ 
this.webServiceForm=document.getElementById("webServiceForm_form");
}
if(this.webServiceForm==null){
return;
}
var httpPayload=new Object();
httpPayload.method=this.targetModel.method;
httpPayload.url=this.webServiceUrl;
if(httpPayload.method.toLowerCase()=="get"){
httpPayload.url=this.webServiceForm.action+"?";
for(var i=0;i<this.webServiceForm.elements.length;++i){
var element=this.webServiceForm.elements[i];
webServiceUrl+=element.name+"="+element.value+"&";
this.formElements[element.name]=element.value;
} 
if(this.debug)alert(httpPayload.url);
this.targetModel.newRequest(this.targetModel,httpPayload);
}else{ 
for(var i=0;i<this.webServiceForm.elements.length;++i){
var element=this.webServiceForm.elements[i];
this.formElements[element.name]=element.value;
} 
this.requestStylesheet.setParameter("resourceName",this.formElements["feature"])
this.requestStylesheet.setParameter("fromDateField",this.formElements["fromDateField"])
this.requestStylesheet.setParameter("toDateField",this.formElements["toDateField"])
var layer=this.requestStylesheet.transformNodeToObject(this.model.doc); 
if(this.debug)
alert("Transformed: "+Sarissa.serialize(layer));
this.namespace="xmlns:wmc='http://www.opengis.net/context' xmlns:ows='http://www.opengis.net/ows' xmlns:ogc='http://www.opengis.net/ogc' xmlns:xsl='http://www.w3.org/1999/XSL/Transform' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:gml='http://www.opengis.net/gml' xmlns:wfs='http://www.opengis.net/wfs'";
Sarissa.setXpathNamespaces(layer,this.namespace);
var getFeature=layer.selectSingleNode("//wfs:GetFeature")
httpPayload.postData=Sarissa.serialize(getFeature);
if(this.debug) 
alert("httpPayload.postData:"+httpPayload.postData);
this.targetModel.wfsFeature=layer.childNodes[0];
if(this.debug)
alert("wfsFeature = "+Sarissa.serialize(this.targetModel.wfsFeature));
this.targetModel.newRequest(this.targetModel,httpPayload);
}
}
this.handleKeyPress=function(event){
var keycode;
var target;
if(event){
keycode=event.which;
target=event.currentTarget;
}else{
keycode=window.event.keyCode;
target=window.event.srcElement.form;
}
if(keycode==13){target.parentWidget.submitForm();
return false;
}
}
this.postPaint=function(objRef){
objRef.webServiceForm=document.getElementById(objRef.formName);
if(this.webServiceForm==null){ 
this.webServiceForm=document.getElementById("webServiceForm_form");
}
objRef.webServiceForm.parentWidget=objRef;
objRef.webServiceForm.onkeypress=objRef.handleKeyPress;
}
this.formName="WebServiceForm_"+mbIds.getId();
this.stylesheet.setParameter("formName",this.formName);
this.prePaint=function(objRef){
for(var elementName in objRef.formElements){
objRef.stylesheet.setParameter(elementName,objRef.formElements[elementName]);
}
}
this.setAoiParameters=function(objRef,bbox){
if(objRef.targetModel.containerModel){
var featureSRS=null;
var containerSRS=objRef.model.getSRS();
objRef.requestStylesheet.setParameter("bBoxMinX",bbox[0][0]);
objRef.requestStylesheet.setParameter("bBoxMinY",bbox[1][1]);
objRef.requestStylesheet.setParameter("bBoxMaxX",bbox[1][0]);
objRef.requestStylesheet.setParameter("bBoxMaxY",bbox[0][1]);
objRef.requestStylesheet.setParameter("srs",containerSRS);
objRef.requestStylesheet.setParameter("width",objRef.targetModel.containerModel.getWindowWidth());
objRef.requestStylesheet.setParameter("height",objRef.targetModel.containerModel.getWindowHeight());
}
}
this.init=function(objRef){
if(objRef.targetModel.containerModel){
objRef.targetModel.containerModel.addListener("aoi",objRef.setAoiParameters,objRef);
}
}
this.model.addListener("init",this.init,this);
}
