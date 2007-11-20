mapbuilder.loadScript(baseDir+"/widget/WidgetBaseXSL.js");
function TabbedContent(widgetNode,model){
WidgetBaseXSL.apply(this,new Array(widgetNode,model));
this.selectedTab=null;
this.tabList=new Array();
this.textNodeXpath="/mb:WidgetText/mb:widgets/mb:TabbedContent";
this.initTabs=function(objRef){
var tabs=objRef.widgetNode.selectNodes("mb:tab");
for(var i=0;i<tabs.length;++i){
var tab=tabs[i];
var tabWidgetId=tab.firstChild.nodeValue;
var tabWidget=config.objects[tabWidgetId];
if(!tabWidget){
alert("tab widget not found:"+tabWidgetId);
return;
}
objRef.tabList.push(tabWidget);
var tabLabel=tab.getAttribute("label"); 
if(!tabLabel)tabLabel=tabWidgetId;
var textNode=config.widgetText.selectSingleNode(objRef.textNodeXpath+"/mb:"+tabWidgetId);
if(textNode)tabLabel=textNode.firstChild.nodeValue;
tab.setAttribute("label",tabLabel);
tabWidget.model.addListener("refresh",objRef.paint,objRef);
tabWidget.model.addListener("refresh",objRef.selectTab,tabWidget);
}
}
this.model.addListener("init",this.initTabs,this);
this.addWidget=function(tabWidget,tabLabel){
this.tabList.push(tabWidget);
if(!tabLabel)tabLabel=tabWidget.id;
var textNode=config.widgetText.selectSingleNode(this.textNodeXpath+"/mb:"+tabWidget.id);
if(textNode)tabLabel=textNode.firstChild.nodeValue;
var tabNode=this.model.doc.createElementNS(mbNS,"tab");
tabNode.appendChild(this.model.doc.createTextNode(tabWidget.id));
tabNode.setAttribute("label",tabLabel);
this.widgetNode.appendChild(tabNode);
this.paint(this);
this.selectTab(tabWidget);
}
this.selectTab=function(tabWidget){
if(!tabWidget.model.doc){
alert("no data to show yet");
return;
}
var tabBar=config.objects[tabWidget.tabBarId]
if(tabBar.selectedTab!=null)tabBar.selectedTab.className='';
var newAnchor=document.getElementById(tabBar.id+"_"+tabWidget.id);
if(newAnchor){
newAnchor.className='current';
tabBar.selectedTab=newAnchor;
tabWidget.paint(tabWidget,tabWidget.id);
}
if(tabWidget.tabAction)eval(tabWidget.tabAction);
}
this.prePaint=function(objRef){
objRef.resultDoc=objRef.widgetNode;
for(var i=0;i<objRef.tabList.length;++i){
var tabWidget=objRef.tabList[i];
tabWidget.tabBarId=this.id;
var tabNode=objRef.resultDoc.selectSingleNode("mb:tab[text()='"+tabWidget.id+"']");
if(!tabWidget.model.doc){
tabNode.setAttribute("disabled","true");
}else{
tabNode.removeAttribute("disabled");
}
var tabAction=tabWidget.widgetNode.selectSingleNode("mb:tabAction");
if(tabAction)tabWidget.tabAction=tabAction.firstChild.nodeValue;
}
}
}
