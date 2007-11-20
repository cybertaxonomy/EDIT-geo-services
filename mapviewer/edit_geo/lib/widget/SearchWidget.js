mapbuilder.loadScript(baseDir+"/widget/WidgetBase.js");
function SearchWidget(widgetNode,model){
WidgetBaseXSL.apply(this,new Array(widgetNode,model));
this.host=widgetNode.selectSingleNode("mb:host").firstChild.nodeValue; 
this.submitQuery=function(query){
this.urlInputForm.defaultUrl.value=query;
var httpPayload=new Object();
httpPayload.url=this.host+"?query="+query; 
httpPayload.method=this.targetModel.method;
var newUrl=this.urlInputForm.defaultUrl.value;
if(newUrl.indexOf("?")>0){
this.stylesheet.setParameter("defaultUrl",this.urlInputForm.defaultUrl.value);
}
this.targetModel.newRequest(this.targetModel,httpPayload);
}
this.submitForm=function(){
if(this.aoiFormId==undefined){
var forms=document.getElementsByTagName("form");
var num=forms.length;
for(var i=num-1;i>=0;i--){
var aoiFormId=new String(forms[i].getAttribute("id"));
if(aoiFormId.indexOf("AoiForm_")>=0){
this.aoiFormId=aoiFormId;
}
}
}
if(this.aoiFormId==undefined){
alert("Could not find aoiForm for geoSearch");
}
var bbox="";
var aoiForm=document.getElementById(this.aoiFormId);
if((aoiForm!=null)&&(aoiForm.westCoord.value!="")){
var west=parseFloat(aoiForm.westCoord.value);
var north=parseFloat(aoiForm.northCoord.value);
var east=parseFloat(aoiForm.eastCoord.value);
var south=parseFloat(aoiForm.southCoord.value);
bbox="&ULLon="+west.toPrecision(3)+"&ULLat="+north.toPrecision(3)+
"&LRLon="+east.toPrecision(3)+"&LRLat="+south.toPrecision(3);
}
var httpPayload=new Object();
var query=this.urlInputForm.defaultUrl.value;
httpPayload.url=this.host+"?query="+escape(query)+bbox; 
httpPayload.method=this.targetModel.method;
this.stylesheet.setParameter("defaultUrl",query);
this.targetModel.newRequest(this.targetModel,httpPayload);
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
return false;}
}
this.prePaint=function(objRef){
objRef.stylesheet.setParameter("modelTitle",objRef.targetModel.title);
}
this.postPaint=function(objRef){
objRef.urlInputForm=document.getElementById(objRef.formName);
objRef.urlInputForm.parentWidget=objRef;
objRef.urlInputForm.onkeypress=objRef.handleKeyPress;
}
this.formName="urlInputForm_"+mbIds.getId();
this.stylesheet.setParameter("formName",this.formName);
}
