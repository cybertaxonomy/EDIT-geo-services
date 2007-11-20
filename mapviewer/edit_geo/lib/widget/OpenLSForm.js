mapbuilder.loadScript(baseDir+"/widget/WidgetBaseXSL.js");
function OpenLSForm(widgetNode,model){
WidgetBaseXSL.apply(this,new Array(widgetNode,model));
this.defaultModelUrl=widgetNode.selectSingleNode("mb:defaultModelUrl").firstChild.nodeValue;
this.geocodeServerUrl=widgetNode.selectSingleNode("mb:geocodeServerUrl").firstChild.nodeValue;
this.xsl=new XslProcessor(baseDir+"/tool/xsl/ols_GeocodeRequest.xsl"); 
this.submitForm=function(objRef){
objRef.geoForm=document.getElementById(this.formName);
pc=objRef.geoForm.pcValue.value;
street=objRef.geoForm.streetValue.value;
number=objRef.geoForm.numberValue.value;
city=objRef.geoForm.cityValue.value;
municipality=objRef.geoForm.municipalityValue.value;
country=objRef.geoForm.countryValue.value;
if(pc)objRef.xsl.setParameter("postalCode",pc);
if(street)objRef.xsl.setParameter("street",street);
if(number)objRef.xsl.setParameter("number",number);
if(city)objRef.xsl.setParameter("municipalitySubdivision",city);
if(municipality)objRef.xsl.setParameter("municipality",municipality);
if(country)objRef.xsl.setParameter("countryCode",country);
if(!country){
alert('You need to specify a country code');
return;
}
if(!municipality&&!city&&!number&&!street&&!pc){
alert("Please enter at least one value, before proceeding");
return;
}
objRef.requestModel=objRef.xsl.transformNodeToObject(this.model.doc);
objRef.httpPayload=new Object();
objRef.httpPayload.url=objRef.geocodeServerUrl;
objRef.httpPayload.method="post";
objRef.httpPayload.postData=objRef.requestModel;
objRef.targetModel.newRequest(objRef.targetModel,objRef.httpPayload); 
}
var formNameNode=widgetNode.selectSingleNode("mb:formName");
if(formNameNode){
this.formName=formNameNode.firstChild.nodeValue;
}else{
this.formName="OpenLSForm_"+mbIds.getId();
}
this.stylesheet.setParameter("formName",this.formName);
}
