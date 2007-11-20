mapbuilder.loadScript(baseDir+"/model/Proj.js");
mapbuilder.loadScript(baseDir+"/widget/WidgetBase.js");
var toolTipObject;
var toolTipObjs=new Array();
function TipWidget(widgetNode,model){
this.tipIdName=widgetNode.attributes.getNamedItem("id").nodeValue;
var leftOffset=widgetNode.selectSingleNode("mb:leftOffset");
if(leftOffset!=undefined){
this.leftOffset=parseInt(leftOffset.firstChild.nodeValue);
}
var topOffset=widgetNode.selectSingleNode("mb:topOffset");
if(topOffset!=undefined){
this.topOffset=parseInt(topOffset.firstChild.nodeValue);
}
var overLibCmd=widgetNode.selectSingleNode("mb:command");
if(overLibCmd!=undefined){
this.overLibCmd=overLibCmd.firstChild.nodeValue;
}
var stylesheet=widgetNode.selectSingleNode("mb:stylesheet");
if(stylesheet!=undefined){
var xslt=stylesheet.firstChild.nodeValue;
this.stylesheet=new XSLTProcessor();
var xslDoc=Sarissa.getDomDocument(); 
xslDoc.async=false;
xslDoc.load(xslt);
this.stylesheet.importStylesheet(xslDoc);
} 
this.createDiv=function(){
var divName="overDiv"; 
var tipDiv=document.getElementById(divName);
if(tipDiv==undefined){
var userDiv=document.getElementById(this.tipIdName);
if(userDiv!=undefined){ 
tipDiv=document.createElement("div");
tipDiv.setAttribute("id",divName);
tipDiv.setAttribute("style","");
tipDiv.style.zIndex="10000";
tipDiv.style.visibility="hidden";
var parentNode=userDiv.parentNode;
parentNode.removeChild(userDiv);
parentNode.appendChild(tipDiv);
this.tipDiv=tipDiv;
}else{
alert("Could not find div:"+this.tipIdName);
}
}else{
alert("div:"+divName+" already exists");
}
}
this.paint=function(arr){
var leftOffset=parseInt(this.leftOffset);
var topOffset=parseInt(this.topOffset);
var x=parseInt(arr[0]);
if(x>leftOffset)
x+=leftOffset;
var y=parseInt(arr[1]);
if(y>topOffset)
y+=topOffset;
var id=arr[2]; 
var title=arr[3];
var contents=this.dehtmlize(arr[4]);
var text="<b>"+title+"</b><hr/><br/>"+contents;
overlib(text,CAPTION,"Caption",STICKY,WIDTH,'225',HEIGHT,'200',REFC,'UR',REFP,'LL',RELX,x,RELY,y)
}
this.dehtmlize=function(str){
str=str.replace(/&amp;/g,"&");
str=str.replace(/&lt;/g,"<");
str=str.replace(/&gt;/g,">");
str=str.replace(/&quot;/g,"'");
return str;
}
this.paintXSL=function(node){
if(this.stylesheet){
var posx=0;
var posy=0;
var cn=window.cursorTrackNode;
if(cn){ 
var evPL=cn.evpl;
if(evPL!=null){
posx=evPL[0];
posy=evPL[1];
}
}
var oDoc=document.implementation.createDocument("","",null);
oDoc.appendChild(node.cloneNode(true));
var oResult=this.stylesheet.transformToDocument(oDoc);
var text=Sarissa.serialize(oResult.firstChild)
overlib(text,CAPTION,"Caption",STICKY,WIDTH,'225',HEIGHT,'200',REFC,'UR',REFP,'LL',RELX,posx,RELY,posy)
}else{
alert("no stylesheet defined")
}
}
this.clear=function(){
nd();
}
toolTipObjs[this.tipIdName]=this;
}
