function WidgetBase(widgetNode,model){
this.model=model;
this.widgetNode=widgetNode;
var templatedWidget=false;
if(model.modelNode.attributes.getNamedItem("createByTemplate")&&model.modelNode.attributes.getNamedItem("createByTemplate").nodeValue=='true'){
widgetNode.setAttribute("id","MbWidget_"+mbIds.getId());
templatedWidget=true;
}
if(widgetNode.attributes.getNamedItem("id")){
this.id=widgetNode.attributes.getNamedItem("id").nodeValue;
}else{
alert("id required for object:"+widgetNode.nodeName);
}
var outputNode=widgetNode.selectSingleNode("mb:outputNodeId");
if(templatedWidget){
this.outputNodeId=this.id;
}else if(outputNode){
this.outputNodeId=outputNode.firstChild.nodeValue;
}else{
this.outputNodeId="MbWidget_"+mbIds.getId();
}
if(!this.htmlTagId){
var htmlTagNode=widgetNode.selectSingleNode("mb:htmlTagId");
if(htmlTagNode){
this.htmlTagId=htmlTagNode.firstChild.nodeValue;
}else{
this.htmlTagId=this.id;
}
}
this.node=document.getElementById(this.htmlTagId);
if(this.buttonBarGroup){
this.groupnode=document.getElementById(this.buttonBarGroup);
}
if(!this.groupnode){
this.groupnode=this.node;
} 
if(!this.node){
}
this.autoRefresh=true;
var autoRefresh=widgetNode.selectSingleNode("mb:autoRefresh");
if(autoRefresh&&autoRefresh.firstChild.nodeValue=="false")this.autoRefresh=false;
if(widgetNode.selectSingleNode("mb:debug"))this.debug=true;
this.initTargetModel=function(objRef){
var targetModel=objRef.widgetNode.selectSingleNode("mb:targetModel");
if(targetModel){
objRef.targetModel=window.config.objects[targetModel.firstChild.nodeValue];
if(!objRef.targetModel){
alert("error finding targetModel:"+targetModel.firstChild.nodeValue+" for:"+objRef.id);
}
}else{
objRef.targetModel=objRef.model;
}
}
this.model.addListener("init",this.initTargetModel,this);
this.prePaint=function(objRef){
}
this.postPaint=function(objRef){
}
this.clearWidget=function(objRef){
var outputNode=document.getElementById(objRef.outputNodeId);
if(outputNode)objRef.node.removeChild(outputNode);
}
this.model.addListener("newModel",this.clearWidget,this);
}
