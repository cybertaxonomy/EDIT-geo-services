mapbuilder.loadScript(baseDir+"/tool/ToolBase.js");
function Timer(toolNode,model){
ToolBase.apply(this,new Array(toolNode,model));
var seconds=toolNode.selectSingleNode("mb:every");
if(seconds){
this.delay=1000*seconds.firstChild.nodeValue;
}else{
this.delay=1000*30;} 
var eventName=toolNode.selectSingleNode("mb:eventName");
if(eventName){
this.eventName=eventName.firstChild.nodeValue;
}else{
this.eventName="reloadModel";} 
var eventValue=toolNode.selectSingleNode("mb:eventValue");
if(eventValue){
this.eventValue=eventValue.firstChild.nodeValue;
}else{
this.eventValue=null;} 
this.play=function(){
clearInterval(this.interval);
var workString="config.objects."+this.targetModel.id+".setParam('"+this.eventName+"'";
if(this.eventValue)workString+=","+this.eventValue;
workString+=")";
this.interval=setInterval(workString,this.delay);
}
this.stop=function(){
clearInterval(this.interval);
}
this.autoStart=true;
var autoStart=toolNode.selectSingleNode("mb:autoStart");
if(autoStart&&autoStart.firstChild.nodeValue=="false")this.autoStart=false;
this.startOnLoad=function(objRef){
if(objRef.autoStart)objRef.play();
}
this.model.addListener("init",this.startOnLoad,this);
}
