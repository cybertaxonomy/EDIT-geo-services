mapbuilder.loadScript(baseDir+"/widget/WidgetBase.js");
function ModelUrlInput(widgetNode,model){
WidgetBaseXSL.apply(this,new Array(widgetNode,model));
var defaultUrl=widgetNode.selectSingleNode("mb:defaultUrl");
if(defaultUrl){
this.defaultUrl=defaultUrl.firstChild.nodeValue;
}
this.submitForm=function(){
var httpPayload=new Object();
httpPayload.url=this.urlInputForm.defaultUrl.value;
httpPayload.method=this.targetModel.method;
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
if(!objRef.defaultUrl)objRef.defaultUrl=objRef.targetModel.url;
objRef.stylesheet.setParameter("defaultUrl",objRef.defaultUrl);
}
this.postPaint=function(objRef){
objRef.urlInputForm=document.getElementById(objRef.formName);
objRef.urlInputForm.parentWidget=objRef;
objRef.urlInputForm.onkeypress=objRef.handleKeyPress;
}
this.formName="urlInputForm_"+mbIds.getId();
this.stylesheet.setParameter("formName",this.formName);
}
