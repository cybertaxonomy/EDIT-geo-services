var mbTimerStart=new Date();
var config;
if(typeof baseDir=="undefined"){
var baseDir;
}
var mbServerConfig="mapbuilderConfig.jsp";
var mbNsUrl="http://mapbuilder.sourceforge.net/mapbuilder";
var MB_UNLOADED=0;
var MB_LOAD_CORE=1;
var MB_LOAD_CONFIG=2;
var MB_LOADED=3;
function Mapbuilder(){
this.loadState=MB_UNLOADED;
this.loadingScripts=new Array();
this.scriptsTimer=null;
this.checkScriptsLoaded=function(){
if(typeof MapBuilder_Release=="boolean"){
this.setLoadState(MB_LOAD_CONFIG);
return;
}
if(document.readyState!=null){
while(this.loadingScripts.length>0&&(this.loadingScripts[0].readyState=="loaded"||this.loadingScripts[0].readyState=="uninitialized"||this.loadingScripts[0].readyState=="complete"||this.loadingScripts[0].readyState==null)){
this.loadingScripts.shift();
}
if(this.loadingScripts.length==0){
this.setLoadState(this.loadState+1);
}
}else{
if(this.loadState==MB_LOAD_CORE&&config!=null){
this.setLoadState(MB_LOAD_CONFIG);
}
}
};
this.setLoadState=function(_1){
this.loadState=_1;
switch(_1){
case MB_LOAD_CORE:
this.loadScript(baseDir+"/util/sarissa/Sarissa.js");
this.loadScript(baseDir+"/util/sarissa/sarissa_ieemu_xpath.js");
this.loadScript(baseDir+"/util/Util.js");
this.loadScript(baseDir+"/util/Listener.js");
this.loadScript(baseDir+"/model/ModelBase.js");
this.loadScript(baseDir+"/model/Config.js");
break;
case MB_LOAD_CONFIG:
if(document.readyState){
config=new Config(mbConfigUrl);
config.loadConfigScripts();
if(typeof MapBuilder_Release=="boolean"){
this.setLoadState(MB_LOADED);
return;
}
}else{
this.setLoadState(MB_LOADED);
}
break;
case MB_LOADED:
clearInterval(this.scriptsTimer);
break;
}
};
this.loadScript=function(_2){
if(typeof MapBuilder_Release=="boolean"){
return;
}
if(!document.getElementById(_2)){
var _3=document.createElement("script");
_3.readyState=="complete";
this.loadingScripts.push(_3);
}
};
this.loadScriptsFromXpath=function(_4,_5){
for(var i=0;i<_4.length;i++){
if(_4[i].selectSingleNode("mb:scriptFile")==null){
scriptFile=baseDir+"/"+_5+_4[i].nodeName+".js";
this.loadScript(scriptFile);
}
}
};
var _7=document.getElementsByTagName("head")[0];
var _8=_7.childNodes;
for(var i=0;i<_8.length;++i){
var _a=_8.item(i).src;
if(_a){
var _b=_a.indexOf("/Mapbuilder.js");
if(_b>=0){
baseDir=_a.substring(0,_b);
}else{
_b=_a.indexOf("/MapbuilderCompressed.js");
if(_b>=0){
baseDir=_a.substring(0,_b);
}
}
}
}
this.setLoadState(MB_LOAD_CORE);
this.scriptsTimer=setInterval("mapbuilder.checkScriptsLoaded()",100);
}
function checkIESecurity(){
var _c=["Msxml2.DOMDocument.5.0","Msxml2.DOMDocument.4.0","Msxml2.DOMDocument.3.0","MSXML2.DOMDocument","MSXML.DOMDocument","Microsoft.XMLDOM"];
var _d=false;
for(var i=0;i<_c.length&&!_d;i++){
try{
var _f=new ActiveXObject(_c[i]);
_d=true;
}
catch(e){
}
}
if(!_d){
window.open("/mapbuilder/docs/help/IESetup.html");
}
}
if(navigator.userAgent.toLowerCase().indexOf("msie")>-1){
checkIESecurity();
}
var mapbuilder=new Mapbuilder();
function mapbuilderInit(){
if(mapbuilder&&mapbuilder.loadState==MB_LOADED){
clearInterval(mbTimerId);
config.parseConfig(config);
config.callListeners("init");
var _10=new Date();
if(window.mbInit){
window.mbInit();
}
config.callListeners("loadModel");
}
}
var mbTimerId;
function mbDoLoad(_11){
mbTimerId=setInterval("mapbuilderInit()",100);
if(_11){
window.mbInit=_11;
}
}

var MapBuilder_Release=true;

mapbuilder.loadScript(baseDir+"/widget/WidgetBaseXSL.js");
function ButtonBase(_1,_2){
this.stylesheet=new XslProcessor(baseDir+"/widget/Button.xsl",_2.namespace);
var _3=_1.selectSingleNode("mb:buttonBar");
if(_3){
this.htmlTagId=_3.firstChild.nodeValue;
this.buttonBarGroup=this.htmlTagId;
}
var _4=_1.selectSingleNode("mb:htmlTagId");
if(_4){
this.htmlTagId=_4.firstChild.nodeValue;
}
if((!_3)&&(!_4)){
alert("buttonBar property required for object:"+_1.nodeName);
}
WidgetBaseXSL.apply(this,new Array(_1,_2));
this.buttonType=_1.selectSingleNode("mb:class").firstChild.nodeValue;
if(this.buttonType=="RadioButton"){
this.enabled=false;
}
var disabledImage=_1.selectSingleNode("mb:disabledSrc");
if(disabledImage){
this.disabledImage=document.createElement("IMG");
this.disabledImage.src=config.skinDir+disabledImage.firstChild.nodeValue;
}
var _6=_1.selectSingleNode("mb:enabledSrc");
if(_6){
this.enabledImage=document.createElement("IMG");
this.enabledImage.src=config.skinDir+_6.firstChild.nodeValue;
}
var _7=this.widgetNode.selectSingleNode("mb:cursor");
if(_7!=null){
var _8=_7.firstChild.nodeValue;
this.cursor=_8;
}else{
this.cursor="default";
}
this.prePaint=function(_9){
_9.resultDoc=_9.widgetNode;
};
this.doAction=function(){
};
this.select=function(){
var a=document.getElementById("mainMapContainer");
if(a!=null){
a.style.cursor=this.cursor;
}
if(this.buttonType=="RadioButton"){
if(this.groupnode.selectedRadioButton){
with(this.groupnode.selectedRadioButton){
if(disabledImage){
image.src=disabledImage.src;
}
enabled=false;
if(mouseHandler){
mouseHandler.enabled=false;
}
link.className="mbButton";
doSelect(false,this);
}
}
this.groupnode.selectedRadioButton=this;
if(this.enabledImage){
this.image.src=this.enabledImage.src;
}
this.link.className="mbButtonSelected";
}
this.enabled=true;
if(this.mouseHandler){
this.mouseHandler.enabled=true;
}
this.doSelect(true,this);
};
this.doSelect=function(_b,_c){
};
var _d=_1.selectSingleNode("mb:selected");
if(_d&&_d.firstChild.nodeValue){
this.selected=true;
}
this.initMouseHandler=function(_e){
var _f=_e.widgetNode.selectSingleNode("mb:mouseHandler");
if(_f){
_e.mouseHandler=window.config.objects[_f.firstChild.nodeValue];
if(!_e.mouseHandler){
alert("error finding mouseHandler:"+_f.firstChild.nodeValue+" for button:"+_e.id);
}
}else{
_e.mouseHandler=null;
}
};
this.buttonInit=function(_10){
_10.image=document.getElementById(_10.id+"_image");
_10.link=document.getElementById(_10.outputNodeId);
if(_10.selected){
_10.select();
}
};
this.model.addListener("refresh",this.buttonInit,this);
this.model.addListener("init",this.initMouseHandler,this);
}

mapbuilder.loadScript(baseDir+"/widget/EditButtonBase.js");
function EditLine(_1,_2){
EditButtonBase.apply(this,new Array(_1,_2));
this.doAction=function(_3,_4){
if(_3.enabled){
point=_3.mouseHandler.model.extent.getXY(_4.evpl);
old=_3.targetModel.getXpathValue(_3.targetModel,_3.featureXpath);
if(!old){
old="";
}
sucess=_3.targetModel.setXpathValue(_3.targetModel,_3.featureXpath,old+" "+point[0]+","+point[1]);
if(!sucess){
alert("EditLine: invalid featureXpath in config: "+_3.featureXpath);
}
}
};
}

mapbuilder.loadScript(baseDir+"/widget/WidgetBaseXSL.js");
function LegendGraphic(_1,_2){
WidgetBaseXSL.apply(this,new Array(_1,_2));
this.model.addListener("hidden",this.refresh,this);
}
LegendGraphic.prototype.refresh=function(_3,_4){
_3.paint(_3,_3.id);
};

mapbuilder.loadScript(baseDir+"/widget/EditButtonBase.js");
function EditPolygon(_1,_2){
EditButtonBase.apply(this,new Array(_1,_2));
this.doAction=function(_3,_4){
if(_3.enabled){
var _5=_3.mouseHandler.model.extent.getXY(_4.evpl);
var _6=_3.targetModel.getXpathValue(_3.targetModel,_3.featureXpath);
var _7="";
if(!_6){
_7=_5[0]+","+_5[1];
}else{
var _8=_6.split(" ");
if(_8.length<2){
_7=_6+" "+_5[0]+","+_5[1];
}else{
if(_8.length==2){
_7=_6+" "+_5[0]+","+_5[1]+" "+_8[0];
}else{
if(_8.length>2){
for(var i=0;i<_8.length-1;++i){
_7=_7+_8[i]+" ";
}
_7=_7+_5[0]+","+_5[1]+" "+_8[0];
}
}
}
}
sucess=_3.targetModel.setXpathValue(_3.targetModel,_3.featureXpath,_7);
if(!sucess){
alert("EditPolygon: invalid featureXpath in config: "+_3.featureXpath);
}
}
};
}

mapbuilder.loadScript(baseDir+"/model/Proj.js");
mapbuilder.loadScript(baseDir+"/widget/WidgetBase.js");
var toolTipObject;
var toolTipObjs=new Array();
function TipWidget(_1,_2){
this.tipIdName=_1.attributes.getNamedItem("id").nodeValue;
var _3=_1.selectSingleNode("mb:leftOffset");
if(_3!=undefined){
this.leftOffset=parseInt(_3.firstChild.nodeValue);
}
var _4=_1.selectSingleNode("mb:topOffset");
if(_4!=undefined){
this.topOffset=parseInt(_4.firstChild.nodeValue);
}
var _5=_1.selectSingleNode("mb:command");
if(_5!=undefined){
this.overLibCmd=_5.firstChild.nodeValue;
}
var _6=_1.selectSingleNode("mb:stylesheet");
if(_6!=undefined){
var _7=_6.firstChild.nodeValue;
this.stylesheet=new XSLTProcessor();
var _8=Sarissa.getDomDocument();
_8.async=false;
_8.load(_7);
this.stylesheet.importStylesheet(_8);
}
this.createDiv=function(){
var _9="overDiv";
var _a=document.getElementById(_9);
if(_a==undefined){
var _b=document.getElementById(this.tipIdName);
if(_b!=undefined){
_a=document.createElement("div");
_a.setAttribute("id",_9);
_a.setAttribute("style","");
_a.style.zIndex="10000";
_a.style.visibility="hidden";
var _c=_b.parentNode;
_c.removeChild(_b);
_c.appendChild(_a);
this.tipDiv=_a;
}else{
alert("Could not find div:"+this.tipIdName);
}
}else{
alert("div:"+_9+" already exists");
}
};
this.paint=function(_d){
var _e=parseInt(this.leftOffset);
var _f=parseInt(this.topOffset);
var x=parseInt(_d[0]);
if(x>_e){
x+=_e;
}
var y=parseInt(_d[1]);
if(y>_f){
y+=_f;
}
var id=_d[2];
var _13=_d[3];
var _14=this.dehtmlize(_d[4]);
var _15="<b>"+_13+"</b><hr/><br/>"+_14;
overlib(_15,CAPTION,"Caption",STICKY,WIDTH,"225",HEIGHT,"200",REFC,"UR",REFP,"LL",RELX,x,RELY,y);
};
this.dehtmlize=function(str){
str=str.replace(/&amp;/g,"&");
str=str.replace(/&lt;/g,"<");
str=str.replace(/&gt;/g,">");
str=str.replace(/&quot;/g,"'");
return str;
};
this.paintXSL=function(_17){
if(this.stylesheet){
var _18=0;
var _19=0;
var cn=window.cursorTrackNode;
if(cn){
var _1b=cn.evpl;
if(_1b!=null){
_18=_1b[0];
_19=_1b[1];
}
}
var _1c=document.implementation.createDocument("","",null);
_1c.appendChild(_17.cloneNode(true));
var _1d=this.stylesheet.transformToDocument(_1c);
var _1e=Sarissa.serialize(_1d.firstChild);
overlib(_1e,CAPTION,"Caption",STICKY,WIDTH,"225",HEIGHT,"200",REFC,"UR",REFP,"LL",RELX,_18,RELY,_19);
}else{
alert("no stylesheet defined");
}
};
this.clear=function(){
nd();
};
toolTipObjs[this.tipIdName]=this;
}

mapbuilder.loadScript(baseDir+"/widget/WidgetBaseXSL.js");
function MapScaleText(_1,_2){
WidgetBaseXSL.apply(this,new Array(_1,_2));
this.submitForm=function(){
var _3=this.mapScaleTextForm.mapScale.value;
this.model.extent.setScale(_3.split(",").join(""));
return false;
};
this.handleKeyPress=function(_4){
var _5;
var _6;
if(_4){
_5=_4.which;
_6=_4.currentTarget;
}else{
_5=window.event.keyCode;
_6=window.event.srcElement.form;
}
if(_5==13){
_6.parentWidget.submitForm();
return false;
}
};
this.showScale=function(_7){
if(_7.mapScaleTextForm){
var _8=Math.round(_7.model.extent.getScale());
var _9=new Array();
while(_8>=1000){
var _a=_8/1000;
_8=Math.floor(_a);
var _b=leadingZeros(Math.round((_a-_8)*1000).toString(),3);
_9.unshift(_b);
}
_9.unshift(_8);
_7.mapScaleTextForm.mapScale.value=_9.join(",");
}
};
this.model.addListener("bbox",this.showScale,this);
this.model.addListener("refresh",this.showScale,this);
this.prePaint=function(_c){
var _d=_c.model.extent.getScale();
this.stylesheet.setParameter("mapScale",_d);
};
this.postPaint=function(_e){
_e.mapScaleTextForm=document.getElementById(_e.formName);
_e.mapScaleTextForm.parentWidget=_e;
_e.mapScaleTextForm.onkeypress=_e.handleKeyPress;
_e.showScale(_e);
};
this.formName="MapScaleText_"+mbIds.getId();
this.stylesheet.setParameter("formName",this.formName);
}

mapbuilder.loadScript(baseDir+"/widget/WidgetBase.js");
function SLDEditor(_1,_2){
WidgetBaseXSL.apply(this,new Array(_1,_2));
this.refresh=function(_3,_4){
_3.stylesheet.setParameter("layerName",_4);
_3.paint(_3,_3.id);
};
this.model.addListener("SLDChange",this.refresh,this);
this.setAttr=function(_5,_6,_7,_8){
if(_8){
_6=_6+"[@name='"+_8+"']";
}
_5.model.setXpathValue(_5.model,_6,_7);
};
}

mapbuilder.loadScript(baseDir+"/widget/ButtonBase.js");
function Graticule(_1,_2){
ButtonBase.apply(this,new Array(_1,_2));
this.mapContainerId=_1.selectSingleNode("mb:mapContainerId").firstChild.nodeValue;
this.display=false;
this.color=_1.selectSingleNode("mb:color").firstChild.nodeValue;
this.remove=function(_3){
try{
var i=0;
var _5=_3.map;
for(i=0;i<_3.divs.length;i++){
_5.removeChild(_3.divs[i]);
}
}
catch(e){
}
};
this.getBbox=function(_6){
var _7=new Object();
_7.ll=new Object();
_7.ur=new Object();
ll=_6.proj.Inverse(new Array(_6.bbox[0],_6.bbox[1]));
ur=_6.proj.Inverse(new Array(_6.bbox[2],_6.bbox[3]));
_7.ll.lon=ll[0];
_7.ll.lat=ll[1];
_7.ur.lon=ur[0];
_7.ur.lat=ur[1];
return _7;
};
this.gridIntervalMins=function(_8){
var _8=_8/10;
_8*=6000;
_8=Math.ceil(_8)/100;
if(_8<=0.06){
_8=0.06;
}else{
if(_8<=0.12){
_8=0.12;
}else{
if(_8<=0.3){
_8=0.3;
}else{
if(_8<=0.6){
_8=0.6;
}else{
if(_8<=1.2){
_8=1.2;
}else{
if(_8<=3){
_8=3;
}else{
if(_8<=6){
_8=6;
}else{
if(_8<=12){
_8=12;
}else{
if(_8<=30){
_8=30;
}else{
if(_8<=60){
_8=30;
}else{
if(_8<=(60*2)){
_8=60*2;
}else{
if(_8<=(60*5)){
_8=60*5;
}else{
if(_8<=(60*10)){
_8=60*10;
}else{
if(_8<=(60*20)){
_8=60*20;
}else{
if(_8<=(60*30)){
_8=60*30;
}else{
_8=60*45;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
return _8;
};
this.gridPrecision=function(_9){
if(_9<0.01){
return 3;
}else{
if(_9<0.1){
return 2;
}else{
if(_9<1){
return 1;
}else{
return 0;
}
}
}
};
this.draw=function(_a){
_a.remove(_a);
var _b=_a.getBbox(_a);
var l=_b.ll.lon;
var b=_b.ll.lat;
var r=_b.ur.lon;
var t=_b.ur.lat;
if(b<-90){
b=-90;
}
if(t>90){
t=90;
}
if(l<-180){
l=-180;
}
if(r>180){
r=180;
}
if(l==r){
l=-180;
r=180;
}
if(t==b){
b=-90;
t=90;
}
var _10=_a.gridIntervalMins(t-b);
var _11;
if(r>l){
_11=_a.gridIntervalMins(r-l);
}else{
_11=_a.gridIntervalMins((180-l)+(r+180));
}
l=Math.floor(l*60/_11)*_11/60;
b=Math.floor(b*60/_10)*_10/60;
t=Math.ceil(t*60/_10)*_10/60;
r=Math.ceil(r*60/_11)*_11/60;
if(b<=-90){
b=-90;
}
if(t>=90){
t=90;
}
if(l<-180){
l=-180;
}
if(r>180){
r=180;
}
_10/=60;
_11/=60;
_a.dLat=_10;
_a.dLon=_11;
var _12=_a.gridPrecision(_10);
var _13=_a.gridPrecision(_11);
_a.divs=new Array();
var i=0;
var pbl=_a.fromLatLngToDivPixel(_a,b,l);
var ptr=_a.fromLatLngToDivPixel(_a,t,r);
_a.maxX=ptr.x;
_a.maxY=pbl.y;
_a.minX=pbl.x;
_a.minY=ptr.y;
var x;
var y=_a.fromLatLngToDivPixel(_a,b+_10+_10,l).y+2;
var _19=_a.map;
var lo=l;
if(r<lo){
r+=360;
}
while(lo<=r){
var p=_a.fromLatLngToDivPixel(_a,b,lo);
_a.divs[i]=_a.createVLine(_a,p.x);
_19.insertBefore(_a.divs[i],null);
i++;
var d=document.createElement("DIV");
x=p.x+3;
d.style.position="absolute";
d.style.left=x.toString()+"px";
d.style.top=y.toString()+"px";
d.style.color=_a.color;
d.style.fontFamily="Arial";
d.style.fontSize="x-small";
if(lo==0){
d.innerHTML=(Math.abs(lo)).toFixed(_13);
}else{
if(lo<0){
d.title="West (WGS84)";
d.innerHTML=(Math.abs(lo)).toFixed(_13)+" E";
}else{
d.title="East (WGS84)";
d.innerHTML=(Math.abs(lo)).toFixed(_13)+" W";
}
}
_19.insertBefore(d,null);
_a.divs[i]=d;
i++;
lo+=_11;
if(lo>180){
r-=360;
lo-=360;
}
}
var j=0;
x=_a.fromLatLngToDivPixel(_a,b,l+_11+_11).x+3;
while(b<=t){
var p=_a.fromLatLngToDivPixel(_a,b,l);
if(r<l){
_a.divs[i]=_a.createHLine3(_a,b);
_19.insertBefore(_a.divs[i],null);
i++;
}else{
if(r==l){
_a.divs[i]=_a.createHLine3(_a,b);
_19.insertBefore(_a.divs[i],null);
i++;
}else{
_a.divs[i]=_a.createHLine(_a,p.y);
_19.insertBefore(_a.divs[i],null);
i++;
}
}
var d=document.createElement("DIV");
y=p.y+2;
d.style.position="absolute";
d.style.left=x.toString()+"px";
d.style.top=y.toString()+"px";
d.style.color=_a.color;
d.style.fontFamily="Arial";
d.style.fontSize="x-small";
if(b==0){
d.innerHTML=(Math.abs(b)).toFixed(_13);
}else{
if(b<0){
d.title="South (WGS84)";
d.innerHTML=(Math.abs(b)).toFixed(_12)+" S";
}else{
d.title="North (WGS84)";
d.innerHTML=(Math.abs(b)).toFixed(_12)+" N";
}
}
if(j!=2){
_19.insertBefore(d,null);
_a.divs[i]=d;
i++;
}
j++;
b+=_10;
}
};
this.fromLatLngToDivPixel=function(_1e,lat,lon){
var xy=_1e.proj.Forward(new Array(lon,lat));
var _22=new Object();
_22.x=_1e.targetModel.extent.getPL(xy)[0];
_22.y=_1e.targetModel.extent.getPL(xy)[1];
return _22;
};
this.createVLine=function(_23,x){
var div=document.createElement("DIV");
div.style.position="absolute";
div.style.overflow="hidden";
div.style.backgroundColor=_23.color;
div.style.left=x+"px";
div.style.top=_23.minY+"px";
div.style.width="1px";
div.style.height=(_23.maxY-_23.minY)+"px";
return div;
};
this.createHLine=function(_26,y){
var div=document.createElement("DIV");
div.style.position="absolute";
div.style.overflow="hidden";
div.style.backgroundColor=_26.color;
div.style.left=_26.minX+"px";
div.style.top=y+"px";
div.style.width=(_26.maxX-_26.minX)+"px";
div.style.height="1px";
return div;
};
this.createHLine3=function(_29,lat){
var f=_29.fromLatLngToDivPixel(_29,lat,0);
var t=_29.fromLatLngToDivPixel(_29,lat,180);
var div=document.createElement("DIV");
div.style.position="absolute";
div.style.overflow="hidden";
div.style.backgroundColor=_29.color;
var x1=f.x;
var x2=t.x;
if(x2<x1){
x2=f.x;
x1=t.x;
}
div.style.left=(x1-(x2-x1))+"px";
div.style.top=f.y+"px";
div.style.width=((x2-x1)*2)+"px";
div.style.height="1px";
return div;
};
this.init=function(_30){
_30.width=parseInt(_30.targetModel.getWindowWidth());
_30.height=parseInt(_30.targetModel.getWindowHeight());
_30.bbox=_30.targetModel.getBoundingBox();
_30.proj=new Proj(_30.targetModel.getSRS());
if(_30.bbox[1]<0){
if(_30.bbox[3]<0){
_30.diffLat=_30.bbox[1]-_30.bbox[3];
}else{
_30.diffLat=_30.bbox[3]-_30.bbox[1];
}
}else{
_30.diffLat=_30.bbox[3]+_30.bbox[1];
}
if(_30.bbox[0]<0){
if(_30.bbox[2]<0){
_30.diffLon=_30.bbox[0]-_30.bbox[2];
}else{
_30.diffLon=_30.bbox[2]-_30.bbox[0];
}
}else{
_30.diffLon=_30.bbox[2]+_30.bbox[0];
}
_30.draw(_30);
};
this.doSelect=function(_31,_32){
if(_31&&_32.display==false){
this.targetModel.addListener("bbox",this.init,this);
_32.display=true;
_32.map=document.getElementById(_32.mapContainerId);
_32.init(_32);
}else{
if(_32.display==true){
this.targetModel.removeListener("bbox",this.init,this);
_32.display=false;
_32.remove(_32);
}
}
};
}

mapbuilder.loadScript(baseDir+"/widget/MapContainerBase.js");
function GmlRendererTest(_1,_2){
this.paint=function(_3){
var _4=_3.model.doc.selectNodes("//gml:featureMember");
alert("pretending to paint:"+_4.length+" features"+Sarissa.serialize(_3.model.doc));
};
var _5=new MapContainerBase(this,_1,_2);
}

mapbuilder.loadScript(baseDir+"/model/Proj.js");
mapbuilder.loadScript(baseDir+"/widget/MapContainerBase.js");
function GmlPointRenderer(_1,_2){
WidgetBase.apply(this,new Array(_1,_2));
MapContainerBase.apply(this,new Array(_1,_2));
this.normalImage=_1.selectSingleNode("mb:normalImage").firstChild.nodeValue;
this.highlightImage=_1.selectSingleNode("mb:highlightImage").firstChild.nodeValue;
this.model.addListener("refresh",this.paint,this);
this.highlight=function(_3,_4){
var _5=document.getElementById(_4+"_normal");
_5.style.visibility="hidden";
var _6=document.getElementById(_4+"_highlight");
_6.style.visibility="visible";
};
this.model.addListener("highlightFeature",this.highlight,this);
this.dehighlight=function(_7,_8){
var _9=document.getElementById(_8+"_normal");
_9.style.visibility="visible";
var _a=document.getElementById(_8+"_highlight");
_a.style.visibility="hidden";
};
this.clearFeatures=function(){
var _b=this.model.getFeatureNodes();
for(var i=0;i<_b.length;++i){
var _d=_b[i];
var _e=this.model.getFeatureId(_d);
var _f=document.getElementById(_e+"_normal");
var _10=document.getElementById(_e+"_highlight");
if(_f){
this.node.removeChild(_f);
}
if(_10){
this.node.removeChild(_10);
}
}
};
this.model.addListener("dehighlightFeature",this.dehighlight,this);
}
GmlPointRenderer.prototype.paint=function(_11){
if(_11.model.doc&&_11.node&&_11.containerModel.doc){
var _12=new Proj(_11.containerModel.getSRS());
_11.clearFeatures();
var _13=_11.model.getFeatureNodes();
for(var i=0;i<_13.length;++i){
var _15=_13[i];
var _16=_11.model.getFeatureName(_15);
var _17=_11.model.getFeatureId(_15);
var _18=_11.model.getFeaturePoint(_15);
_18=_12.Forward(_18);
_18=_11.containerModel.extent.getPL(_18);
var _19=document.getElementById(_17+"_normal");
var _1a=document.getElementById(_17+"_highlight");
if(!_19){
_19=document.createElement("DIV");
_19.setAttribute("id",_17+"_normal");
_19.style.position="absolute";
_19.style.visibility="visible";
_19.style.zIndex=300;
var _1b=document.createElement("IMG");
_1b.src=config.skinDir+_11.normalImage;
_1b.title=_16;
_19.appendChild(_1b);
_11.node.appendChild(_19);
_1a=document.createElement("DIV");
_1a.setAttribute("id",_17+"_highlight");
_1a.style.position="absolute";
_1a.style.visibility="hidden";
_1a.style.zIndex=301;
var _1b=document.createElement("IMG");
_1b.src=config.skinDir+_11.highlightImage;
_1b.title=_16;
_1a.appendChild(_1b);
_11.node.appendChild(_1a);
}
_19.style.left=_18[0];
_19.style.top=_18[1];
_1a.style.left=_18[0];
_1a.style.top=_18[1];
}
}
};

mapbuilder.loadScript(baseDir+"/widget/EditButtonBase.js");
function EditPoint(_1,_2){
EditButtonBase.apply(this,new Array(_1,_2));
this.doAction=function(_3,_4){
if(_3.enabled){
point=_3.mouseHandler.model.extent.getXY(_4.evpl);
sucess=_3.targetModel.setXpathValue(_3.targetModel,_3.featureXpath,point[0]+","+point[1]);
if(!sucess){
alert("EditPoint: invalid featureXpath in config: "+_3.featureXpath);
}
}
};
}

mapbuilder.loadScript(baseDir+"/widget/WidgetBase.js");
function AoiBoxDHTML(_1,_2){
WidgetBase.apply(this,new Array(_1,_2));
this.lineWidth=_1.selectSingleNode("mb:lineWidth").firstChild.nodeValue;
this.lineColor=_1.selectSingleNode("mb:lineColor").firstChild.nodeValue;
this.crossSize=parseInt(_1.selectSingleNode("mb:crossSize").firstChild.nodeValue);
this.paint=function(_3){
var _4=_3.model.getParam("aoi");
if(_4){
var ul=_3.model.extent.getPL(_4[0]);
var lr=_3.model.extent.getPL(_4[1]);
if((Math.abs(ul[0]-lr[0])<_3.crossSize)&&(Math.abs(ul[1]-lr[1])<_3.crossSize)){
_3.drawCross(new Array((ul[0]+lr[0])/2,(ul[1]+lr[1])/2));
}else{
_3.drawBox(ul,lr);
}
}
};
_2.addListener("aoi",this.paint,this);
MapContainerBase.apply(this,new Array(_1,_2));
this.setVis=function(_7){
var _8="hidden";
if(_7){
_8="visible";
}
this.Top.style.visibility=_8;
this.Left.style.visibility=_8;
this.Right.style.visibility=_8;
this.Bottom.style.visibility=_8;
};
this.clear=function(_9){
_9.setVis(false);
};
this.containerModel.addListener("bbox",this.clear,this);
this.drawBox=function(ul,lr){
this.Top.style.left=ul[0]+"px";
this.Top.style.top=ul[1]+"px";
this.Top.style.width=lr[0]-ul[0]+"px";
this.Top.style.height=this.lineWidth+"px";
this.Left.style.left=ul[0]+"px";
this.Left.style.top=ul[1]+"px";
this.Left.style.width=this.lineWidth+"px";
this.Left.style.height=lr[1]-ul[1]+"px";
this.Right.style.left=lr[0]-this.lineWidth+"px";
this.Right.style.top=ul[1]+"px";
this.Right.style.width=this.lineWidth+"px";
this.Right.style.height=lr[1]-ul[1]+"px";
this.Bottom.style.left=ul[0]+"px";
this.Bottom.style.top=lr[1]-this.lineWidth+"px";
this.Bottom.style.width=lr[0]-ul[0]+"px";
this.Bottom.style.height=this.lineWidth+"px";
this.setVis(true);
};
this.drawCross=function(_c){
this.Top.style.left=Math.floor(_c[0]-this.crossSize/2)+"px";
this.Top.style.top=Math.floor(_c[1]-this.lineWidth/2)+"px";
this.Top.style.width=this.crossSize+"px";
this.Top.style.height=this.lineWidth+"px";
this.Top.style.visibility="visible";
this.Left.style.left=Math.floor(_c[0]-this.lineWidth/2)+"px";
this.Left.style.top=Math.floor(_c[1]-this.crossSize/2)+"px";
this.Left.style.width=this.lineWidth+"px";
this.Left.style.height=this.crossSize+"px";
this.Left.style.visibility="visible";
this.Right.style.visibility="hidden";
this.Bottom.style.visibility="hidden";
};
this.getImageDiv=function(){
var _d=document.createElement("div");
_d.innerHTML="<img src='"+config.skinDir+"/images/Spacer.gif' width='1px' height='1px'/>";
_d.style.position="absolute";
_d.style.backgroundColor=this.lineColor;
_d.style.visibility="hidden";
_d.style.zIndex=900;
this.node.appendChild(_d);
return _d;
};
this.loadAoiBox=function(_e){
_e.Top=_e.getImageDiv();
_e.Bottom=_e.getImageDiv();
_e.Left=_e.getImageDiv();
_e.Right=_e.getImageDiv();
_e.paint(_e);
};
this.loadAoiBox(this);
}

mapbuilder.loadScript(baseDir+"/widget/WidgetBaseXSL.js");
function Legend(_1,_2){
WidgetBaseXSL.apply(this,new Array(_1,_2));
this.model.addListener("deleteLayer",this.refresh,this);
this.model.addListener("moveLayerUp",this.refresh,this);
this.model.addListener("moveLayerDown",this.refresh,this);
if(this.autoRefresh){
this.model.addListener("addLayer",this.refresh,this);
}
this.prePaint=function(_3){
if(_3.model.featureName){
_3.stylesheet.setParameter("featureName",_3.model.featureName);
_3.stylesheet.setParameter("hidden",_3.model.getHidden(_3.model.featureName).toString());
}
var _4=_3.model.doc.selectSingleNode(_3.model.nodeSelectXpath+"[@hidden='0' and @opaque='1']/wmc:Name");
if(_4){
_3.visibleLayer=_4.firstChild.nodeValue;
}
};
}
Legend.prototype.refresh=function(_5,_6){
_5.paint(_5,_5.id);
};
Legend.prototype.selectLayer=function(_7,_8){
_7.model.setParam("selectedLayer",_8);
};
Legend.prototype.swapOpaqueLayer=function(_9){
this.model.setHidden(this.visibleLayer,true);
this.model.setHidden(_9,false);
this.visibleLayer=_9;
};

mapbuilder.loadScript(baseDir+"/widget/ButtonBase.js");
function GetMarkerInfo(_1,_2){
ButtonBase.apply(this,new Array(_1,_2));
this.doAction=function(_3,_4){
};
if(this.mouseHandler){
this.mouseHandler.model.addListener("mouseup",this.doAction,this);
}
}

mapbuilder.loadScript(baseDir+"/model/Proj.js");
mapbuilder.loadScript(baseDir+"/widget/MapContainerBase.js");
function GmlRendererWKT(_1,_2){
var _3=new MapContainerBase(this,_1,_2);
this.paintMethod="xsl2js";
this.coordXsl=new XslProcessor(baseDir+"/widget/GmlCooordinates2Coord.xsl");
this.prePaint=function(_4){
_4.stylesheet.setParameter("objRef","objRef");
_4.model.setParam("modelStatus","preparing coordinates");
_4.stylesheet.setParameter("targetElement",_4.containerModel.getWindowWidth());
_4.resultDoc=_4.coordXsl.transformNodeToObject(_4.resultDoc);
};
this.hiddenListener=function(_5,_6){
var _7="visible";
if(_5.model.getHidden(_6)){
_7="hidden";
}
var _8=document.getElementById(_5.outputNodeId);
for(var i=0;i<_8.childNodes.length;++i){
_8.childNodes[i].style.visibility=_7;
}
};
this.model.addListener("hidden",this.hiddenListener,this);
}

function WidgetBase(_1,_2){
this.model=_2;
this.widgetNode=_1;
var _3=false;
if(_2.modelNode.attributes.getNamedItem("createByTemplate")&&_2.modelNode.attributes.getNamedItem("createByTemplate").nodeValue=="true"){
_1.setAttribute("id","MbWidget_"+mbIds.getId());
_3=true;
}
if(_1.attributes.getNamedItem("id")){
this.id=_1.attributes.getNamedItem("id").nodeValue;
}else{
alert("id required for object:"+_1.nodeName);
}
var _4=_1.selectSingleNode("mb:outputNodeId");
if(_3){
this.outputNodeId=this.id;
}else{
if(_4){
this.outputNodeId=_4.firstChild.nodeValue;
}else{
this.outputNodeId="MbWidget_"+mbIds.getId();
}
}
if(!this.htmlTagId){
var _5=_1.selectSingleNode("mb:htmlTagId");
if(_5){
this.htmlTagId=_5.firstChild.nodeValue;
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
var _6=_1.selectSingleNode("mb:autoRefresh");
if(_6&&_6.firstChild.nodeValue=="false"){
this.autoRefresh=false;
}
if(_1.selectSingleNode("mb:debug")){
this.debug=true;
}
this.initTargetModel=function(_7){
var _8=_7.widgetNode.selectSingleNode("mb:targetModel");
if(_8){
_7.targetModel=window.config.objects[_8.firstChild.nodeValue];
if(!_7.targetModel){
alert("error finding targetModel:"+_8.firstChild.nodeValue+" for:"+_7.id);
}
}else{
_7.targetModel=_7.model;
}
};
this.model.addListener("init",this.initTargetModel,this);
this.prePaint=function(_9){
};
this.postPaint=function(_a){
};
this.clearWidget=function(_b){
var _c=document.getElementById(_b.outputNodeId);
if(_c){
_b.node.removeChild(_c);
}
};
this.model.addListener("newModel",this.clearWidget,this);
}

mapbuilder.loadScript(baseDir+"/widget/WidgetBaseXSL.js");
mapbuilder.loadScript(baseDir+"/model/Proj.js");
function CursorTrack(_1,_2){
WidgetBaseXSL.apply(this,new Array(_1,_2));
this.showPx=false;
this.showXY=false;
this.showLatLong=true;
this.showDMS=false;
this.showMGRS=false;
this.precision=2;
var _3=_1.selectSingleNode("mb:showXY");
if(_3){
this.showXY=(_3.firstChild.nodeValue=="false")?false:true;
}
var _4=_1.selectSingleNode("mb:showPx");
if(_4){
this.showPx=(_4.firstChild.nodeValue=="false")?false:true;
}
var _5=_1.selectSingleNode("mb:showLatLong");
if(_5){
this.showLatLong=(_5.firstChild.nodeValue=="false")?false:true;
}
var _6=_1.selectSingleNode("mb:showDMS");
if(_6){
this.showDMS=(_6.firstChild.nodeValue=="false")?false:true;
}
var _7=_1.selectSingleNode("mb:showMGRS");
if(_7){
this.showMGRS=(_7.firstChild.nodeValue=="false")?false:true;
mapbuilder.loadScript(baseDir+"/util/MGRS.js");
}
var _8=_1.selectSingleNode("mb:precision");
if(_8){
this.precision=_8.firstChild.nodeValue;
}
this.mouseOverHandler=function(_9,_a){
_9.coordForm=document.getElementById(_9.formName);
window.cursorTrackObject=_9;
window.cursorTrackNode=_a;
_9.mouseOver=true;
_9.mouseTrackTimer=setInterval(ReportCoords,100,_9);
};
this.mouseOutHandler=function(_b,_c){
if(_b.mouseTrackTimer){
clearInterval(_b.mouseTrackTimer);
}
_b.mouseOver=false;
if(_b.showLatLong){
if(_b.coordForm.longitude){
_b.coordForm.longitude.value="";
}
if(_b.coordForm.latitude){
_b.coordForm.latitude.value="";
}
}
if(_b.showDMS){
if(_b.coordForm.longdeg){
_b.coordForm.longdeg.value="";
}
if(_b.coordForm.longmin){
_b.coordForm.longmin.value="";
}
if(_b.coordForm.longsec){
_b.coordForm.longsec.value="";
}
if(_b.coordForm.latdeg){
_b.coordForm.latdeg.value="";
}
if(_b.coordForm.latmin){
_b.coordForm.latmin.value="";
}
if(_b.coordForm.latsec){
_b.coordForm.latsec.value="";
}
}
if(_b.showXY){
if(_b.coordForm.x){
_b.coordForm.x.value="";
}
if(_b.coordForm.y){
_b.coordForm.y.value="";
}
}
if(_b.showPx){
if(_b.coordForm.px){
_b.coordForm.px.value="";
}
if(_b.coordForm.py){
_b.coordForm.py.value="";
}
}
if(_b.showMGRS){
if(_b.coordForm.mgrs){
_b.coordForm.mgrs.value="";
}
}
};
this.init=function(_d){
var _e=_1.selectSingleNode("mb:mouseHandler");
if(_e){
_d.mouseHandler=window.config.objects[_e.firstChild.nodeValue];
_d.mouseHandler.addListener("mouseover",_d.mouseOverHandler,_d);
_d.mouseHandler.addListener("mouseout",_d.mouseOutHandler,_d);
}else{
alert("CursorTrack requires a mouseHandler property");
}
if(_d.showLatLong||_d.showDMS||_d.showMGRS){
_d.proj=new Proj(_d.model.getSRS());
}
if(this.showMGRS){
this.MGRS=new MGRS();
}
};
this.model.addListener("loadModel",this.init,this);
this.formName="CursorTrackForm_"+mbIds.getId();
this.stylesheet.setParameter("formName",this.formName);
}
function convertDMS(_f,_10){
_f=Math.floor(_f*100);
_f=_f/100;
abscoordinate=Math.abs(_f);
coordinatedegrees=Math.floor(abscoordinate);
coordinateminutes=(abscoordinate-coordinatedegrees)/(1/60);
tempcoordinateminutes=coordinateminutes;
coordinateminutes=Math.floor(coordinateminutes);
coordinateseconds=(tempcoordinateminutes-coordinateminutes)/(1/60);
coordinateseconds=Math.floor(coordinateseconds);
if(_10=="LAT"){
if(_f>=0){
coordinatehemi="N";
}else{
coordinatehemi="S";
}
}else{
if(_10=="LON"){
if(_f>=0){
coordinatehemi="E";
}else{
coordinatehemi="W";
}
}
}
if(coordinatedegrees<10){
coordinatedegrees="0"+coordinatedegrees;
}
if(coordinateminutes<10){
coordinateminutes="0"+coordinateminutes;
}
if(coordinateseconds<10){
coordinateseconds="0"+coordinateseconds;
}
_f=coordinatedegrees+" "+coordinateminutes+" "+coordinateseconds+" "+coordinatehemi;
return _f;
}
function ReportCoords(){
var _11=window.cursorTrackObject;
if(_11.mouseOver){
var _12=window.cursorTrackNode.evpl;
if(_11.showPx){
if(_11.coordForm.px){
_11.coordForm.px.value=_12[0];
}
if(_11.coordForm.py){
_11.coordForm.py.value=_12[1];
}
}
var _13=_11.model.extent.getXY(_12);
if(_11.showXY){
if(_11.coordForm.x){
_11.coordForm.x.value=_13[0].toFixed(_11.precision);
}
if(_11.coordForm.y){
_11.coordForm.y.value=_13[1].toFixed(_11.precision);
}
}
if(_11.showLatLong||_11.showDMS||_11.showMGRS){
var _14=_11.proj.Inverse(_13);
if(_11.showLatLong){
if(_11.coordForm.longitude){
_11.coordForm.longitude.value=_14[0].toFixed(_11.precision);
}
if(_11.coordForm.latitude){
_11.coordForm.latitude.value=_14[1].toFixed(_11.precision);
}
}
if(_11.showDMS){
var _15=convertDMS(_14[0],"LON").split(" ");
if(_11.coordForm.longdeg){
_11.coordForm.longdeg.value=_15[0];
}
if(_11.coordForm.longmin){
_11.coordForm.longmin.value=_15[1];
}
if(_11.coordForm.longsec){
_11.coordForm.longsec.value=_15[2];
}
if(_11.coordForm.longH){
_11.coordForm.longH.value=_15[3];
}
var _16=convertDMS(_14[1],"LAT").split(" ");
if(_11.coordForm.latdeg){
_11.coordForm.latdeg.value=_16[0];
}
if(_11.coordForm.latmin){
_11.coordForm.latmin.value=_16[1];
}
if(_11.coordForm.latsec){
_11.coordForm.latsec.value=_16[2];
}
if(_11.coordForm.latH){
_11.coordForm.latH.value=_16[3];
}
}
if(_11.showMGRS){
if(!_11.MGRS){
_11.MGRS=new MGRS();
}
_11.coordForm.mgrs.value=_11.MGRS.convert(_14[1],_14[0]);
}
}
}
}

mapbuilder.loadScript(baseDir+"/widget/WidgetBaseXSL.js");
function ShowDistance(_1,_2){
WidgetBaseXSL.apply(this,new Array(_1,_2));
this.showDistance=function(_3){
_3.distForm=document.getElementById(_3.formName);
var _4=_3.model.values.showDistance;
if(_4>1000){
if(_4>1000000){
outputDistance=Math.round(_4/1000)+"  km";
}else{
outputDistance=Math.round(_4/100)/10+"  km";
}
}else{
outputDistance=Math.round(_4)+"  m";
}
_3.distForm.distance.value=outputDistance;
};
this.model.addListener("showDistance",this.showDistance,this);
this.formName="ShowDistance_"+mbIds.getId();
this.stylesheet.setParameter("formName",this.formName);
}

mapbuilder.loadScript(baseDir+"/tool/ButtonBase.js");
function WfsGetFeature(_1,_2){
ButtonBase.apply(this,new Array(_1,_2));
this.tolerance=_1.selectSingleNode("mb:tolerance").firstChild.nodeValue;
this.typeName=_1.selectSingleNode("mb:typeName").firstChild.nodeValue;
this.webServiceUrl=_1.selectSingleNode("mb:webServiceUrl").firstChild.nodeValue;
this.httpPayload=new Object();
this.httpPayload.method="get";
this.httpPayload.postData=null;
this.trm=_1.selectSingleNode("mb:transactionResponseModel").firstChild.nodeValue;
this.cursor="pointer";
this.doAction=function(_3,_4){
if(_3.enabled){
extent=_3.targetModel.extent;
point=extent.getXY(_4.evpl);
xPixel=extent.res[0]*_3.tolerance;
yPixel=extent.res[1]*_3.tolerance;
bbox=(point[0]-xPixel)+","+(point[1]-yPixel)+","+(point[0]+xPixel)+","+(point[1]+yPixel);
if(_3.webServiceUrl.indexOf("?")>-1){
_3.httpPayload.url=_3.webServiceUrl+"&request=GetFeature&typeName="+_3.typeName+"&bbox="+bbox;
}else{
_3.httpPayload.url=_3.webServiceUrl+"?request=GetFeature&typeName="+_3.typeName+"&bbox="+bbox;
}
if(!_3.transactionResponseModel){
_3.transactionResponseModel=window.config.objects[_3.trm];
}
_3.transactionResponseModel.newRequest(_3.transactionResponseModel,_3.httpPayload);
}
};
this.setMouseListener=function(_5){
if(_5.mouseHandler){
_5.mouseHandler.model.addListener("mouseup",_5.doAction,_5);
}
_5.context=_5.widgetNode.selectSingleNode("mb:context");
if(_5.context){
_5.context=window.config.objects[_5.context.firstChild.nodeValue];
}
};
config.addListener("loadModel",this.setMouseListener,this);
}

mapbuilder.loadScript(baseDir+"/widget/ButtonBase.js");
function SetAoi(_1,_2){
ButtonBase.apply(this,new Array(_1,_2));
this.cursor="crosshair";
this.doAction=function(_3,_4){
};
if(this.mouseHandler){
this.mouseHandler.model.addListener("mouseup",this.doAction,this);
}
}

mapbuilder.loadScript(baseDir+"/widget/WidgetBase.js");
function xxFilterAttributes(_1,_2){
var _3=new WidgetBase(this,_1,_2);
}

mapbuilder.loadScript(baseDir+"/widget/WidgetBaseXSL.js");
function SaveModel(_1,_2){
WidgetBaseXSL.apply(this,new Array(_1,_2));
this.saveLink=function(_3,_4){
var _5=document.getElementById(_3.model.id+"."+_3.id+".modelUrl");
_5.href=_4;
};
this.model.addListener("modelSaved",this.saveLink,this);
}

mapbuilder.loadScript(baseDir+"/widget/WidgetBase.js");
function Loading(_1,_2){
WidgetBase.apply(this,new Array(_1,_2));
this.paint=function(_3){
while(_3.node.childNodes.length>0){
_3.node.removeChild(_3.node.childNodes[0]);
}
};
this.model.addListener("refresh",this.paint,this);
}

mapbuilder.loadScript(baseDir+"/widget/ButtonBase.js");
function Button(_1,_2){
ButtonBase.apply(this,new Array(_1,_2));
}

mapbuilder.loadScript(baseDir+"/widget/WidgetBase.js");
mapbuilder.loadScript(baseDir+"/widget/MapContainerBase.js");
function MapPane(_1,_2){
WidgetBase.apply(this,new Array(_1,_2));
MapContainerBase.apply(this,new Array(_1,_2));
var _3=_1.selectSingleNode("mb:noPreload");
if(_3){
this.doNotPreload=_1.selectSingleNode("mb:noPreload").firstChild.nodeValue;
}else{
this.doNotPreload=false;
}
if(!this.stylesheet){
var _4=_1.selectSingleNode("mb:stylesheet");
if(_4){
this.stylesheet=new XslProcessor(_4.firstChild.nodeValue,_2.namespace);
}else{
this.stylesheet=new XslProcessor(baseDir+"/widget/"+_1.nodeName+".xsl",_2.namespace);
}
}
var _5=_1.selectSingleNode("mb:loadingSrc");
if(_5){
this.loadingSrc=config.skinDir+_5.firstChild.nodeValue;
}else{
this.loadingSrc=config.skinDir+"/images/Loading.gif";
}
for(var j=0;j<_1.childNodes.length;j++){
if(_1.childNodes[j].firstChild&&_1.childNodes[j].firstChild.nodeValue){
this.stylesheet.setParameter(_1.childNodes[j].nodeName,_1.childNodes[j].firstChild.nodeValue);
}
}
this.stylesheet.setParameter("modelId",this.model.id);
this.stylesheet.setParameter("modelTitle",this.model.title);
this.stylesheet.setParameter("widgetId",this.id);
this.stylesheet.setParameter("skinDir",config.skinDir);
this.stylesheet.setParameter("lang",config.lang);
this.hiddenListener=function(_7,_8){
var _9="visible";
if(_7.model.getHidden(_8)=="1"){
_9="hidden";
}
var _a=_7.model.id+"_"+_7.id+"_"+_8;
var _b=document.getElementById(_a);
if(_b){
_b.style.visibility=_9;
imgId="real"+_b.imgId;
domImg=document.getElementById(imgId);
if(domImg){
if(domImg.isLoading){
domImg.style.visibility=_9;
}else{
if(_9=="visible"){
MapImgLoad(_7,_b);
}else{
domImg.style.visibility=_9;
}
}
}
}
};
this.model.addListener("hidden",this.hiddenListener,this);
this.refreshWmsLayers=function(_c){
_c.d=new Date();
_c.stylesheet.setParameter("uniqueId",_c.d.getTime());
_c.paint(_c);
};
this.model.addListener("refreshWmsLayers",this.refreshWmsLayers,this);
this.model.addListener("refresh",this.paint,this);
this.model.addListener("addLayer",this.addLayer,this);
this.model.addListener("deleteLayer",this.deleteLayer,this);
this.model.addListener("moveLayerUp",this.moveLayerUp,this);
this.model.addListener("moveLayerDown",this.moveLayerDown,this);
this.model.addListener("timestamp",this.timestampListener,this);
}
MapPane.prototype.paint=function(_d){
if(_d.model.doc&&_d.node){
_d.stylesheet.setParameter("width",_d.model.getWindowWidth());
_d.stylesheet.setParameter("height",_d.model.getWindowHeight());
_d.stylesheet.setParameter("bbox",_d.model.getBoundingBox().join(","));
_d.stylesheet.setParameter("srs",_d.model.getSRS());
if(_d.debug){
alert("painting:"+Sarissa.serialize(_d.model.doc));
}
if(_d.debug){
alert("stylesheet:"+Sarissa.serialize(_d.stylesheet.xslDom));
}
var _e=_d.stylesheet.transformNodeToObject(_d.model.doc);
var _f=_e.selectNodes("//img");
if(_d.debug){
alert("painting:"+_d.id+":"+s);
if(config.serializeUrl){
postLoad(config.serializeUrl,s);
}
}
var _10=document.getElementById(_d.outputNodeId);
if(!_10){
_10=document.createElement("div");
_10.setAttribute("id",_d.outputNodeId);
_10.style.position="absolute";
_d.node.appendChild(_10);
_10.style.left="0px";
_10.style.top="0px";
}
var _11=_d.model.getAllLayers();
if(!_d.imageStack){
_d.imageStack=new Array(_11.length);
}
_d.firstImageLoaded=false;
_d.layerCount=_11.length;
_d.loadingLayerCount=0;
for(var i=0;i<_11.length;i++){
if(!_d.imageStack[i]){
_d.imageStack[i]=new Image();
_d.imageStack[i].objRef=_d;
}
var _13=_f[i].getAttribute("src");
_d.loadImgDiv(_11[i],_13,_d.imageStack[i]);
}
}
};
MapPane.prototype.getLayerDivId=function(_14){
return this.model.id+"_"+this.id+"_"+_14;
if(this.model.timestampList&&this.model.timestampList.getAttribute("layerName")==_14){
var _15=this.model.getParam("timestamp");
var _16=this.model.timestampList.childNodes[_15];
layerId+="_"+_16.firstChild.nodeValue;
}
};
MapPane.prototype.timestampListener=function(_17,_18){
var _19=_17.model.timestampList.getAttribute("layerName");
var _1a=_17.model.timestampList.childNodes[_18];
var vis=(_1a.getAttribute("current")=="1")?"visible":"hidden";
var _1c=_17.model.id+"_"+_17.id+"_"+_19+"_"+_1a.firstChild.nodeValue;
var _1d=document.getElementById(_1c);
if(_1d){
_1d.style.visibility=vis;
}else{
alert("error finding layerId:"+_1c);
}
};
MapPane.prototype.addLayer=function(_1e,_1f){
_1e.stylesheet.setParameter("width",_1e.model.getWindowWidth());
_1e.stylesheet.setParameter("height",_1e.model.getWindowHeight());
_1e.stylesheet.setParameter("bbox",_1e.model.getBoundingBox().join(","));
_1e.stylesheet.setParameter("srs",_1e.model.getSRS());
var s=_1e.stylesheet.transformNodeToString(_1f);
var _21=document.createElement("div");
_21.innerHTML=s;
var _22=_21.firstChild.firstChild.getAttribute("src");
_1e.imageStack.push(new Image());
_1e.imageStack[_1e.imageStack.length-1].objRef=_1e;
_1e.firstImageLoaded=true;
++_1e.layerCount;
_1e.loadImgDiv(_1f,_22,_1e.imageStack[_1e.imageStack.length-1]);
};
MapPane.prototype.modifyLayer=function(_23,_24){
_23.stylesheet.setParameter("width",_23.model.getWindowWidth());
_23.stylesheet.setParameter("height",_23.model.getWindowHeight());
_23.stylesheet.setParameter("bbox",_23.model.getBoundingBox().join(","));
_23.stylesheet.setParameter("srs",_23.model.getSRS());
var s=_23.stylesheet.transformNodeToString(_24);
var _26=document.createElement("div");
_26.innerHTML=s;
var _27=_26.firstChild.firstChild.getAttribute("src");
_23.imageStack.push(new Image());
_23.imageStack[_23.imageStack.length-1].objRef=_23;
_23.firstImageLoaded=true;
++_23.layerCount;
_23.loadImgDiv(_24,_27,_23.imageStack[_23.imageStack.length-1]);
};
MapPane.prototype.deleteLayer=function(_28,_29){
var _2a=_28.getLayerDivId(_29);
var _2b=document.getElementById(_2a);
var _2c=document.getElementById(_28.outputNodeId);
_2c.removeChild(_2b);
};
MapPane.prototype.moveLayerUp=function(_2d,_2e){
var _2f=document.getElementById(_2d.outputNodeId);
var _30=_2d.getLayerDivId(_2e);
var _31=document.getElementById(_30);
var _32=_31.nextSibling;
if(!_32){
alert("can't move node past beginning of list:"+_2e);
return;
}
_2f.insertBefore(_32,_31);
};
MapPane.prototype.moveLayerDown=function(_33,_34){
var _35=document.getElementById(_33.outputNodeId);
var _36=_33.getLayerDivId(_34);
var _37=document.getElementById(_36);
var _38=_37.previousSibling;
if(!_38){
alert("can't move node past end of list:"+_34);
return;
}
_35.insertBefore(_37,_38);
};
MapPane.prototype.loadImgDiv=function(_39,_3a,_3b){
var _3c=document.getElementById(this.outputNodeId);
var _3d=_39.selectSingleNode("wmc:Name").firstChild.nodeValue;
var _3e=(_39.getAttribute("hidden")==1)?true:false;
var _3f="image/gif";
var _40=_39.selectSingleNode("wmc:FormatList/wmc:Format[@current='1']");
if(_40){
_3f=_40.firstChild.nodeValue;
}
var _41=this.getLayerDivId(_3d);
var _42=document.getElementById(_41);
if(!_42){
_42=document.createElement("div");
_42.setAttribute("id",_41);
_42.style.position="absolute";
_42.style.visibility=(_3e)?"hidden":"visible";
_42.style.top="0px";
_42.style.left="0px";
_42.imgId=Math.random().toString();
var _43=document.createElement("img");
_43.id="real"+_42.imgId;
_43.src=config.skinDir+"/images/Spacer.gif";
_43.layerHidden=_3e;
_42.appendChild(_43);
_3c.appendChild(_42);
}else{
var _43=_42.firstChild;
}
_3b.id=_42.imgId;
_3b.hidden=_3e;
_3b.fixPng=false;
if(_SARISSA_IS_IE&&_3f=="image/png"){
_3b.fixPng=true;
}
if(this.doNotPreload&&_3e){
_3b.srcToLoad=_3a;
_43.isLoading=false;
}else{
++this.loadingLayerCount;
var _44="loading "+this.loadingLayerCount+" map layer"+((this.loadingLayerCount>1)?"s":"");
this.model.setParam("modelStatus",_44);
_3b.onload=MapImgLoadHandler;
_3b.src=_3a;
_43.isLoading=true;
}
};
function MapImgLoadHandler(){
var _45=document.getElementById("real"+this.id);
if(!this.objRef.firstImageLoaded){
this.objRef.firstImageLoaded=true;
var _46=document.getElementById(this.objRef.outputNodeId);
var _47=_46.childNodes;
for(var i=0;i<_47.length;++i){
var _49=_47[i].firstChild;
_49.parentNode.style.visibility="hidden";
_49.style.visibility="hidden";
if(_SARISSA_IS_IE){
_49.src=config.skinDir+"/images/Spacer.gif";
}
}
if(_SARISSA_IS_IE){
_47[0].firstChild.parentNode.parentNode.style.visibility="hidden";
}
_46.style.left="0px";
_46.style.top="0px";
}
--this.objRef.loadingLayerCount;
if(this.objRef.loadingLayerCount>0){
var _4a="loading "+this.objRef.loadingLayerCount+" map layer"+((this.objRef.loadingLayerCount>1)?"s":"");
this.objRef.model.setParam("modelStatus",_4a);
}else{
this.objRef.model.setParam("modelStatus");
}
if(_SARISSA_IS_IE){
_45.parentNode.parentNode.style.visibility="visible";
}
if(this.fixPng){
var vis=_45.layerHidden?"hidden":"visible";
_45.outerHTML=fixPNG(this,"real"+this.id);
if(!this.hidden){
fixImg=document.getElementById("real"+this.id);
fixImg.style.visibility="visible";
}
}else{
_45.src=this.src;
_45.width=this.objRef.model.getWindowWidth();
_45.height=this.objRef.model.getWindowHeight();
if(!this.hidden){
_45.parentNode.style.visibility="visible";
_45.style.visibility="visible";
}
}
}
function MapImgLoad(_4c,_4d){
var _4e=_4d.imgId;
for(var i=0;i<_4c.imageStack.length;i++){
if(_4c.imageStack[i].id==_4e){
++_4c.loadingLayerCount;
var _50="loading "+_4c.loadingLayerCount+" map layer"+((_4c.loadingLayerCount>1)?"s":"");
_4c.model.setParam("modelStatus",_50);
var _51=_4c.imageStack[i];
_51.onload=MapImgLoadHandler;
_51.src=_51.srcToLoad;
_51.hidden=false;
var _52=document.getElementById("real"+_4e);
_52.isLoading=true;
_52.layerHidden=false;
return;
}
}
alert("ERROR: image not found");
}

mapbuilder.loadScript(baseDir+"/widget/WidgetBaseXSL.js");
mapbuilder.loadScript(baseDir+"/model/Proj.js");
function AoiForm(_1,_2){
WidgetBaseXSL.apply(this,new Array(_1,_2));
this.displayAoiCoords=function(_3,_4){
_3.aoiForm=document.getElementById(_3.formName);
var _5=_3.model.getParam("aoi");
if(_5&&_3.aoiForm){
_3.aoiForm.westCoord.value=_5[0][0];
_3.aoiForm.northCoord.value=_5[0][1];
_3.aoiForm.eastCoord.value=_5[1][0];
_3.aoiForm.southCoord.value=_5[1][1];
}
};
this.model.addListener("aoi",this.displayAoiCoords,this);
this.setAoi=function(){
var _6=this.model.getParam("aoi");
if(_6){
var ul=_6[0];
var lr=_6[1];
switch(this.name){
case "westCoord":
ul[0]=this.value;
break;
case "northCoord":
ul[1]=this.value;
break;
case "eastCoord":
lr[0]=this.value;
break;
case "southCoord":
lr[1]=this.value;
break;
}
this.model.setParam("aoi",new Array(ul,lr));
}
};
this.postPaint=function(_9){
_9.aoiForm=document.getElementById(_9.formName);
_9.aoiForm.westCoord.onblur=_9.setAoi;
_9.aoiForm.northCoord.onblur=_9.setAoi;
_9.aoiForm.eastCoord.onblur=_9.setAoi;
_9.aoiForm.southCoord.onblur=_9.setAoi;
_9.aoiForm.westCoord.model=_9.model;
_9.aoiForm.northCoord.model=_9.model;
_9.aoiForm.eastCoord.model=_9.model;
_9.aoiForm.southCoord.model=_9.model;
};
var _a=_1.selectSingleNode("mb:formName");
if(_a){
this.formName=_a.firstChild.nodeValue;
}else{
this.formName="AoiForm_"+mbIds.getId();
}
this.stylesheet.setParameter("formName",this.formName);
}

mapbuilder.loadScript(baseDir+"/widget/WidgetBase.js");
mapbuilder.loadScript(baseDir+"/widget/MapContainerBase.js");
mapbuilder.loadScript(baseDir+"/graphics/MapLayerMgr.js");
function MapPane2(_1,_2){
WidgetBase.apply(this,new Array(_1,_2));
MapContainerBase.apply(this,new Array(_1,_2));
if(!this.stylesheet){
var _3=_1.selectSingleNode("mb:stylesheet");
if(_3){
this.stylesheet=new XslProcessor(_3.firstChild.nodeValue,_2.namespace);
}else{
this.stylesheet=new XslProcessor(baseDir+"/widget/"+_1.nodeName+".xsl",_2.namespace);
}
}
var _4=_1.selectSingleNode("mb:loadingSrc");
if(_4){
this.loadingSrc=config.skinDir+_4.firstChild.nodeValue;
}else{
this.loadingSrc=config.skinDir+"/images/Loading.gif";
}
for(var j=0;j<_1.childNodes.length;j++){
if(_1.childNodes[j].firstChild&&_1.childNodes[j].firstChild.nodeValue){
this.stylesheet.setParameter(_1.childNodes[j].nodeName,_1.childNodes[j].firstChild.nodeValue);
}
}
this.stylesheet.setParameter("modelId",this.model.id);
this.stylesheet.setParameter("modelTitle",this.model.title);
this.stylesheet.setParameter("widgetId",this.id);
this.stylesheet.setParameter("skinDir",config.skinDir);
this.stylesheet.setParameter("lang",config.lang);
this.MapLayerMgr=new MapLayerMgr(this,_2);
this.model.addListener("refresh",this.paint,this);
this.model.addListener("deleteLayer",this.deleteLayer,this);
this.model.addListener("moveLayerUp",this.moveLayerUp,this);
this.model.addListener("moveLayerDown",this.moveLayerDown,this);
}
MapPane2.prototype.paint=function(_6,_7){
if(_6.model.doc&&_6.node&&(_6.autoRefresh||_7)){
_6.stylesheet.setParameter("width",_6.model.getWindowWidth());
_6.stylesheet.setParameter("height",_6.model.getWindowHeight());
_6.stylesheet.setParameter("bbox",_6.model.getBoundingBox().join(","));
_6.stylesheet.setParameter("srs",_6.model.getSRS());
if(_6.debug){
alert("painting:"+Sarissa.serialize(_6.model.doc));
}
if(_6.debug){
alert("stylesheet:"+Sarissa.serialize(_6.stylesheet.xslDom));
}
var _8=_6.stylesheet.transformNodeToObject(_6.model.doc);
if(_8.parseError!=0){
alert("parse error:"+Sarissa.getParseErrorText(_8));
}
var _9=_8.selectNodes("//img");
if(_6.debug){
alert("painting:"+_6.id+":"+s);
if(config.serializeUrl){
postLoad(config.serializeUrl,s);
}
}
_6.MapLayerMgr.deleteAllLayers();
var _a=document.getElementById(_6.outputNodeId);
if(!_a){
_a=document.createElement("div");
_a.setAttribute("id",_6.outputNodeId);
_a.style.position="absolute";
_6.node.appendChild(_a);
_a.style.left="0px";
_a.style.top="0px";
}
var _b=_6.model.getAllLayers();
_6.firstImageLoaded=false;
_6.layerCount=_b.length;
for(var i=0;i<_b.length;i++){
var _d=_6.MapLayerMgr.addLayer(_6.MapLayerMgr,_b[i]);
if(_9[i]){
newSrc=_9[i].getAttribute("src");
}
if(_d.setSrc){
_d.setSrc(newSrc);
}
}
var _e="loading "+_6.layerCount+" map layer"+((_6.layerCount>1)?"s":"");
_6.model.setParam("modelStatus",_e);
_6.MapLayerMgr.paintWmsLayers(_6.MapLayerMgr);
}
};
MapPane2.prototype.getLayer=function(_f){
return this.MapLayerMgr(_f);
};
MapPane2.prototype.getLayerDivId=function(_10){
return this.model.id+"_"+this.id+"_"+_10;
};
MapPane2.prototype.deleteLayer=function(_11,_12){
var _13=_11.getLayerDivId(_12);
if(_13!=null){
var _14=document.getElementById(_13);
if(_14!=null){
var _15=document.getElementById(_11.outputNodeId);
_15.removeChild(_14);
}
}
};
MapPane2.prototype.moveLayerUp=function(_16,_17){
var _18=document.getElementById(_16.outputNodeId);
var _19=_16.getLayerDivId(_17);
var _1a=document.getElementById(_19);
var _1b=_1a.nextSibling;
if(!_1b){
alert("can't move node past beginning of list:"+_17);
return;
}
_18.insertBefore(_1b,_1a);
};
MapPane2.prototype.moveLayerDown=function(_1c,_1d){
var _1e=document.getElementById(_1c.outputNodeId);
var _1f=_1c.getLayerDivId(_1d);
var _20=document.getElementById(_1f);
var _21=_20.previousSibling;
if(!_21){
alert("can't move node past end of list:"+_1d);
return;
}
_1e.insertBefore(_20,_21);
};
MapPane2.prototype.clearWidget2=function(_22){
_22.MapLayerMgr.deleteAllLayers();
};

mapbuilder.loadScript(baseDir+"/widget/WidgetBaseXSL.js");
function Timestamp(_1,_2){
WidgetBaseXSL.apply(this,new Array(_1,_2));
this.updateTimestamp=function(_3,_4){
var _5=document.getElementById("timestampValue");
_5.value=_3.model.timestampList.childNodes[_4].firstChild.nodeValue;
};
this.model.addListener("timestamp",this.updateTimestamp,this);
}

mapbuilder.loadScript(baseDir+"/widget/MapContainerBase.js");
mapbuilder.loadScript(baseDir+"/util/wz_jsgraphics/wz_jsgraphics.js");
function AoiBoxWZ(_1,_2){
WidgetBase.apply(this,new Array(_1,_2));
this.lineWidth=_1.selectSingleNode("mb:lineWidth").firstChild.nodeValue;
this.lineColor=_1.selectSingleNode("mb:lineColor").firstChild.nodeValue;
this.crossSize=_1.selectSingleNode("mb:crossSize").firstChild.nodeValue;
this.paint=function(_3){
var _4=document.getElementById(_3.outputNodeId);
if(!_4){
_4=document.createElement("DIV");
_4.setAttribute("id",_3.outputNodeId);
_4.style.position="relative";
_3.node.appendChild(_4);
}
_4.style.left=0;
_4.style.top=0;
if(!_3.jg){
_3.jg=new jsGraphics(_3.outputNodeId);
_3.jg.setColor(_3.lineColor);
_3.jg.setStroke(parseInt(_3.lineWidth));
}
var _5=_3.model.getParam("aoi");
if(_5){
var ul=_3.model.extent.getPL(_5[0]);
var lr=_3.model.extent.getPL(_5[1]);
var _8=lr[0]-ul[0];
var _9=lr[1]-ul[1];
_3.jg.clear();
if((_8<_3.crossSize)&&(_9<_3.crossSize)){
var x=(lr[0]+ul[0])/2;
var y=(lr[1]+ul[1])/2;
var c=_3.crossSize/2;
_3.jg.drawLine(x+c,y,x-c,y);
_3.jg.drawLine(x,y+c,x,y-c);
}else{
_3.jg.drawRect(ul[0],ul[1],_8,_9);
}
_3.jg.paint();
}
};
this.model.addListener("aoi",this.paint,this);
MapContainerBase.apply(this,new Array(_1,_2));
this.clearAoiBox=function(_d){
if(_d.jg){
_d.jg.clear();
}
};
this.model.addListener("bbox",this.clearAoiBox,this);
this.refresh=function(_e){
_e.clearAoiBox(_e);
_e.jg=null;
};
this.model.addListener("newModel",this.refresh,this);
}

mapbuilder.loadScript(baseDir+"/widget/WidgetBase.js");
mapbuilder.loadScript(baseDir+"/widget/MapContainerBase.js");
function MapPaneOL(_1,_2){
WidgetBase.apply(this,new Array(_1,_2));
MapContainerBase.apply(this,new Array(_1,_2));
var _3=_1.selectSingleNode("mb:loadingSrc");
if(_3){
this.loadingSrc=config.skinDir+_3.firstChild.nodeValue;
}else{
this.loadingSrc=config.skinDir+"/images/Loading.gif";
}
this.model.addListener("refresh",this.paint,this);
this.model.addListener("hidden",this.hidden,this);
this.model.addListener("deleteLayer",this.deleteLayer,this);
this.model.addListener("moveLayerUp",this.moveLayerUp,this);
this.model.addListener("moveLayerDown",this.moveLayerDown,this);
}
MapPaneOL.prototype.paint=function(_4,_5){
if(!_4.oLMap){
if(_4.model.doc.selectSingleNode("//wmc:OWSContext")){
_4.context="OWS";
}else{
if(_4.model.doc.selectSingleNode("//wmc:ViewContext")){
_4.context="View";
}else{
alert("No context defines in config");
}
}
if(_4.context=="OWS"){
srs=_4.model.doc.selectSingleNode("//ows:BoundingBox/@crs");
srs=(srs)?srs.nodeValue:"";
}else{
srs=_4.model.doc.selectSingleNode("//wmc:BoundingBox").getAttribute("SRS");
}
maxExtent=null;
maxResolution=null;
if(srs!="EPSG:4326"&&srs!="epsg:4326"){
maxExtent=_4.widgetNode.selectSingleNode("mb:maxExtent");
maxExtent=(maxExtent)?maxExtent.firstChild.nodeValue.split(" "):null;
maxResolution=_4.widgetNode.selectSingleNode("mb:maxResolution");
maxResolution=(maxResolution)?maxResolution.firstChild.nodeValue:null;
if(!maxExtent&&!maxResolution){
if(_4.context=="OWS"){
bbox1=_4.model.doc.selectSingleNode("//ows:BoundingBox/ows:LowerCorner");
bbox1=(bbox1)?bbox1.firstChild.nodeValue:"";
bbox2=_4.model.doc.selectSingleNode("//ows:BoundingBox/ows:UpperCorner");
bbox2=(bbox2)?bbox2.firstChild.nodeValue:"";
bbox=(bbox1&&bbox2)?bbox1+" "+bbox2:null;
}else{
var _6=_4.model.doc.selectSingleNode("/wmc:ViewContext/wmc:General/wmc:BoundingBox");
Bbox=new Array();
Bbox[0]=parseFloat(_6.getAttribute("minx"));
Bbox[1]=parseFloat(_6.getAttribute("miny"));
Bbox[2]=parseFloat(_6.getAttribute("maxx"));
Bbox[3]=parseFloat(_6.getAttribute("maxy"));
bbox=Bbox.join(" ");
}
maxExtent=bbox.split(" ");
if(_4.context=="OWS"){
width=_4.model.doc.selectSingleNode("//ows:Window/@width");
width=(width)?width.nodeValue:"400";
maxResolution=(maxExtent[2]-maxExtent[0])/width;
}else{
width=_4.model.doc.selectSingleNode("//wmc:Window/@width");
width=(width)?width.nodeValue:"400";
}
}
maxExtent=(maxExtent)?new OpenLayers.Bounds(maxExtent[0],maxExtent[1],maxExtent[2],maxExtent[3]):null;
}
_4.oLMap=new OpenLayers.Map(_4.node,{controls:[]});
_4.oLMap.Z_INDEX_BASE.Control=10000;
var _7=new OpenLayers.Control.EditingToolbar();
var _8=new OpenLayers.Control.MouseDefaults();
var _9=new OpenLayers.Control.EditingAttributes();
_7.addTools([_8,_9]);
_4.oLMap.addControl(_7);
_4.oLMap.addControl(_9);
_4.oLMap.addControl(new OpenLayers.Control.PanZoom());
_7.setTool(_8);
var _a=_4.model.getAllLayers();
_4.oLlayers=new Array();
for(var i=_a.length-1;i>=0;i--){
var _c=_a[i].selectSingleNode("wmc:Server/@service");
_c=(_c)?_c.nodeValue:"";
var _d=_a[i].selectSingleNode("wmc:Title");
_d=(_d)?_d.firstChild.nodeValue:"";
var _e=_a[i].selectSingleNode("wmc:Name");
_e=(_e)?_e.firstChild.nodeValue:"";
if(_4.context=="OWS"){
var _f=_a[i].selectSingleNode("wmc:Server/wmc:OnlineResource/@xlink:href");
_f=(_f)?_f.firstChild.nodeValue:"";
}else{
var _f=_a[i].selectSingleNode("wmc:Server/wmc:OnlineResource").getAttribute("xlink:href");
}
var _10=_a[i].selectSingleNode("wmc:FormatList/wmc:Format");
_10=(_10)?_10.firstChild.nodeValue:"image/gif";
var vis=_a[i].selectSingleNode("@hidden");
vis=(vis)?(vis.nodeValue!="1"):true;
var _12=new Array();
_12.visibility=vis;
_12.isBaseLayer=(i==_a.length-1)?true:false;
_12.buffer=1;
if(srs!="EPSG:4326"&&srs!="epsg:4326"){
_12.maxExtent=maxExtent;
_12.maxResolution=maxResolution;
_12.projection=srs;
}
switch(_c){
case "wms":
case "OGC:WMS":
_4.oLlayers[_e]=new OpenLayers.Layer.WMS(_d,_f,{layers:_e,transparent:"true",format:_10},_12);
_4.oLMap.addLayers([_4.oLlayers[_e]]);
break;
case "gml":
case "OGC:GML":
style=_4.extractStyle(_4,_a[i]);
if(style){
_12.style=style;
}else{
_12.style=new OpenLayers.Style.WebSafe(2*i+1);
}
_4.oLlayers[_e]=new OpenLayers.Layer.GML(_d,_f,_12);
_4.oLMap.addLayer(_4.oLlayers[_e]);
break;
default:
alert("MapPaneOL: No support for layer type="+_c);
}
}
bbox=_4.model.getBoundingBox();
_4.oLMap.zoomToExtent(new OpenLayers.Bounds(bbox[0],bbox[1],bbox[2],bbox[3]));
}
};
MapPaneOL.prototype.extractStyle=function(_13,_14){
var _15=new OpenLayers.Style({map:_13.oLMap});
var _16;
var _17=false;
_16=_14.selectSingleNode(".//sld:Fill/sld:CssParameter[@name='fill']");
if(_16){
_15.fillColor=_16.firstChild.nodeValue;
_17=true;
}
_16=_14.selectSingleNode(".//sld:Fill/sld:CssParameter[@name='fill-opacity']");
if(_16){
_15.fillOpacity=_16.firstChild.nodeValue;
_17=true;
}
_16=_14.selectSingleNode(".//sld:Stroke/sld:CssParameter[@name='stroke']");
if(_16){
_15.strokeColor=_16.firstChild.nodeValue;
_17=true;
}
_16=_14.selectSingleNode(".//sld:Stroke/sld:CssParameter[@name='stroke-opacity']");
if(_16){
_15.strokeOpacity=_16.firstChild.nodeValue;
_17=true;
}
if(!_17){
_15=null;
}
return _15;
};
MapPaneOL.prototype.hidden=function(_18,_19){
vis=_18.model.getHidden(_19)!="1";
if(_18.oLlayers[_19]){
_18.oLlayers[_19].setVisibility(vis);
}
};
MapPaneOL.prototype.getLayer=function(_1a){
return this.MapLayerMgr(_1a);
};
MapPaneOL.prototype.getLayerDivId=function(_1b){
return this.model.id+"_"+this.id+"_"+_1b;
};
MapPaneOL.prototype.deleteLayer=function(_1c,_1d){
var _1e=_1c.getLayerDivId(_1d);
if(_1e!=null){
var _1f=document.getElementById(_1e);
if(_1f!=null){
var _20=document.getElementById(_1c.outputNodeId);
_20.removeChild(_1f);
}
}
};
MapPaneOL.prototype.moveLayerUp=function(_21,_22){
var _23=document.getElementById(_21.outputNodeId);
var _24=_21.getLayerDivId(_22);
var _25=document.getElementById(_24);
var _26=_25.nextSibling;
if(!_26){
alert("can't move node past beginning of list:"+_22);
return;
}
_23.insertBefore(_26,_25);
};
MapPaneOL.prototype.moveLayerDown=function(_27,_28){
var _29=document.getElementById(_27.outputNodeId);
var _2a=_27.getLayerDivId(_28);
var _2b=document.getElementById(_2a);
var _2c=_2b.previousSibling;
if(!_2c){
alert("can't move node past end of list:"+_28);
return;
}
_29.insertBefore(_2b,_2c);
};
MapPaneOL.prototype.clearWidget2=function(_2d){
_2d.MapLayerMgr.deleteAllLayers();
};

mapbuilder.loadScript(baseDir+"/widget/ButtonBase.js");
function DragPan(_1,_2){
ButtonBase.apply(this,new Array(_1,_2));
this.cursor="move";
this.doAction=function(_3,_4){
if(_3.enabled){
var _5=_3.targetModel.getParam("aoi");
if(_3.targetModel.getParam("aoi")!=null){
var _6=_3.targetModel.extent;
var ul=_5[0];
var lr=_5[1];
if((ul[0]==lr[0])&&(ul[1]==lr[1])){
_6.centerAt(ul,_6.res[0]/_3.zoomBy);
}else{
_6.zoomToBox(ul,lr);
}
}
}
};
this.setMouseListener=function(_9){
if(_9.mouseHandler){
_9.mouseHandler.model.addListener("mouseup",_9.doAction,_9);
}
};
this.model.addListener("refresh",this.setMouseListener,this);
}

mapbuilder.loadScript(baseDir+"/widget/WidgetBase.js");
function FeatureList(_1,_2){
WidgetBaseXSL.apply(this,new Array(_1,_2));
this.setAttr=function(_3,_4,_5){
_3.model.setXpathValue(_3.model,_4,_5);
};
}

function GeoRssParser(_1,_2){
WidgetBase.apply(this,new Array(_1,_2));
MapContainerBase.apply(this,new Array(_1,_2));
var _3=_1.selectSingleNode("mb:stylesheet");
if(_3){
var _4=_3.firstChild.nodeValue;
this.stylesheet=new XSLTProcessor();
var _5=Sarissa.getDomDocument();
_5.async=false;
_5.load(_4);
this.stylesheet.importStylesheet(_5);
}else{
alert("Parsing stylesheet not found");
}
var _6=_1.selectSingleNode("mb:tipWidget");
if(_6){
this.model.tipWidgetId=_6.firstChild.nodeValue;
}
this.model.addListener("refresh",this.paint,this);
this.model.addListener("init",this.geoRssParserInit,this);
}
GeoRssParser.prototype.geoRssParserInit=function(_7){
_7.targetModel.addListener("loadModel",_7.loadEntries,_7);
_7.targetModel.addListener("bbox",_7.loadEntries,_7);
_7.model.addListener("loadModel",_7.loadAndPaintEntries,_7);
};
GeoRssParser.prototype.transformEntry=function(_8,_9){
if(_8.stylesheet!=undefined){
var _a=_8.stylesheet.transformToDocument(_9);
Sarissa.setXpathNamespaces(_a,"xmlns:wmc='http://www.opengis.net/context'");
return _a;
}
};
GeoRssParser.prototype.loadAndPaintEntries=function(_b){
_b.loadEntries(_b);
_b.targetModel.callListeners("refreshOtherLayers");
};
GeoRssParser.prototype.loadEntries=function(_c){
if((_c.model.doc!=null)&&(_c.targetModel.doc!=null)){
var _d=_c.model.getFeatureNodes();
var _e=_d.length;
var _f=_c.containerModel.getWindowWidth();
var _10=_c.containerModel.getWindowHeight();
var _11=_c.targetModel.doc.selectNodes("/wmc:OWSContext/wmc:ResourceList/wmc:RssLayer");
if(_11.length>0){
for(var i=0;i<_11.length;i++){
var _13=_11[i];
var _14=_13.getAttribute("id");
if(_14!=null){
_c.targetModel.setParam("deleteLayer",_14);
}else{
alert("error deleting:"+Sarissa.serialize(_13));
}
}
}
if(_e==0){
return;
}
for(var _15=0;_15<_e;_15++){
var _16=_d[_15];
var id=_16.getAttribute("id");
_16.setAttribute("width",_f);
_16.setAttribute("height",_10);
var _13=_c.transformEntry(_c,_16);
_c.targetModel.setParam("addLayer",_13.childNodes[0]);
}
}
};
GeoRssParser.prototype.paint=function(_18){
};

mapbuilder.loadScript(baseDir+"/widget/WidgetBaseXSL.js");
function OpenLSForm(_1,_2){
WidgetBaseXSL.apply(this,new Array(_1,_2));
this.defaultModelUrl=_1.selectSingleNode("mb:defaultModelUrl").firstChild.nodeValue;
this.geocodeServerUrl=_1.selectSingleNode("mb:geocodeServerUrl").firstChild.nodeValue;
this.xsl=new XslProcessor(baseDir+"/tool/xsl/ols_GeocodeRequest.xsl");
this.submitForm=function(_3){
_3.geoForm=document.getElementById(this.formName);
pc=_3.geoForm.pcValue.value;
street=_3.geoForm.streetValue.value;
number=_3.geoForm.numberValue.value;
city=_3.geoForm.cityValue.value;
municipality=_3.geoForm.municipalityValue.value;
country=_3.geoForm.countryValue.value;
if(pc){
_3.xsl.setParameter("postalCode",pc);
}
if(street){
_3.xsl.setParameter("street",street);
}
if(number){
_3.xsl.setParameter("number",number);
}
if(city){
_3.xsl.setParameter("municipalitySubdivision",city);
}
if(municipality){
_3.xsl.setParameter("municipality",municipality);
}
if(country){
_3.xsl.setParameter("countryCode",country);
}
if(!country){
alert("You need to specify a country code");
return;
}
if(!municipality&&!city&&!number&&!street&&!pc){
alert("Please enter at least one value, before proceeding");
return;
}
_3.requestModel=_3.xsl.transformNodeToObject(this.model.doc);
_3.httpPayload=new Object();
_3.httpPayload.url=_3.geocodeServerUrl;
_3.httpPayload.method="post";
_3.httpPayload.postData=_3.requestModel;
_3.targetModel.newRequest(_3.targetModel,_3.httpPayload);
};
var _4=_1.selectSingleNode("mb:formName");
if(_4){
this.formName=_4.firstChild.nodeValue;
}else{
this.formName="OpenLSForm_"+mbIds.getId();
}
this.stylesheet.setParameter("formName",this.formName);
}

mapbuilder.loadScript(baseDir+"/widget/ButtonBase.js");
function ZoomOut(_1,_2){
ButtonBase.apply(this,new Array(_1,_2));
this.zoomFactor=4;
var _3=_1.selectSingleNode("mb:zoomFactor");
if(_3){
this.zoomFactor=_3.firstChild.nodeValue;
}
this.doAction=function(_4,_5){
if(!_4.enabled){
return;
}
var _6=_4.targetModel.getParam("aoi");
var _7=_4.targetModel.extent;
var _8=_7.res[0]*_4.zoomFactor;
_7.centerAt(_6[0],_8);
};
this.setMouseListener=function(_9){
if(_9.mouseHandler){
_9.mouseHandler.model.addListener("mouseup",_9.doAction,_9);
}
};
this.model.addListener("loadModel",this.setMouseListener,this);
}

mapbuilder.loadScript(baseDir+"/widget/WidgetBase.js");
function Loading2(_1,_2){
WidgetBase.apply(this,new Array(_1,_2));
var _3=_1.selectSingleNode("mb:imageSrc");
if(_3){
this.imageSrc=config.skinDir+_3.firstChild.nodeValue;
}else{
this.imageSrc=config.skinDir+"/images/Loading.gif";
}
var _4=_1.selectSingleNode("mb:textMessage");
if(_4){
this.textMessage=_4.firstChild.nodeValue;
}else{
this.textMessage="Document loading, please wait...";
}
this.updateMessage=this.textMessage;
var _5=_1.selectSingleNode("mb:mapContainerId");
if(_5){
this.containerNodeId=_5.firstChild.nodeValue;
this.node=document.getElementById(this.containerNodeId);
}
this.model.addListener("newModel",this.paint,this);
this.model.addListener("loadModel",this.clear,this);
this.model.addListener("bbox",this.paint,this);
this.model.addListener("refresh",this.paint,this);
this.model.addListener("modelStatus",this.update,this);
}
Loading2.prototype.paint=function(_6){
_6.node=document.getElementById(_6.htmlTagId);
if(_6.node){
if(_6.model.template){
return;
}
if(!_6.model.url){
return;
}
var _7=document.getElementById(_6.outputNodeId+"_loading");
if(!_7){
_7=document.createElement("div");
_7.setAttribute("id",_6.outputNodeId+"_loading");
_6.node.appendChild(_7);
}
_7.className="loadingIndicator";
_7.style.zIndex=1000;
if(_6.mapContainerNode){
_7.style.position="absolute";
_7.style.left="0px";
_7.style.top="0px";
}
if(_6.imageSrc){
var _8=document.getElementById(_6.outputNodeId+"_imageNode");
if(!_8){
_8=document.createElement("img");
_8.setAttribute("id",_6.outputNodeId+"_imageNode");
_7.appendChild(_8);
_8.style.zIndex=1000;
}
_8.src=_6.imageSrc;
}
if(_6.updateMessage){
var _9=document.getElementById(_6.outputNodeId+"_messageNode");
if(!_9){
_9=document.createElement("p");
_9.setAttribute("id",_6.outputNodeId+"_messageNode");
_7.appendChild(_9);
}
_9.innerHTML=_6.updateMessage;
}
}
};
Loading2.prototype.clear=function(_a){
_a.updateMessage=null;
var _b=document.getElementById(_a.outputNodeId+"_loading");
if(_b){
_a.node.removeChild(_b);
}
_a.node=null;
};
Loading2.prototype.update=function(_c,_d){
if(_d){
_c.updateMessage=_d;
_c.paint(_c);
}else{
_c.clear(_c);
}
};

mapbuilder.loadScript(baseDir+"/widget/ButtonBase.js");
function Reset(_1,_2){
ButtonBase.apply(this,new Array(_1,_2));
this.cursor="default";
this.initExtent=function(_3){
_3.originalExtent=new Extent(_3.targetModel);
_3.originalExtent.init(_3.originalExtent);
_3.originalExtent.setResolution(new Array(_3.targetModel.getWindowWidth(),_3.targetModel.getWindowHeight()));
};
this.initReset=function(_4){
_4.targetModel.addListener("loadModel",_4.initExtent,_4);
};
this.model.addListener("init",this.initReset,this);
this.doSelect=function(_5,_6){
if(_5){
var _7=_6.originalExtent;
_6.targetModel.extent.centerAt(_7.getCenter(),_7.res[0]);
}
};
}

mapbuilder.loadScript(baseDir+"/widget/WidgetBaseXSL.js");
function SelectTimeFrame(_1,_2){
WidgetBaseXSL.apply(this,new Array(_1,_2));
this.setFirstFrame=function(_3){
this.model.setParam("stopLoop");
this.model.setParam("firstFrame",_3);
};
this.setLastFrame=function(_4){
var _5=this.model.timestampList;
if(_4>_5.firstFrame){
_5.lastFrame=_4;
}else{
alert("last frame must be after the first frame");
}
this.model.setParam("stopLoop");
};
}

mapbuilder.loadScript(baseDir+"/widget/MapContainerBase.js");
function GmlRenderer(_1,_2){
var _3=new MapContainerBase(this,_1,_2);
this.coordXsl=new XslProcessor(baseDir+"/widget/GmlCooordinates2Coord.xsl");
this.prePaint=function(_4){
_4.stylesheet.setParameter("width",_4.containerModel.getWindowWidth());
_4.stylesheet.setParameter("height",_4.containerModel.getWindowHeight());
bBox=_4.containerModel.getBoundingBox();
_4.stylesheet.setParameter("bBoxMinX",bBox[0]);
_4.stylesheet.setParameter("bBoxMinY",bBox[1]);
_4.stylesheet.setParameter("bBoxMaxX",bBox[2]);
_4.stylesheet.setParameter("bBoxMaxY",bBox[3]);
_4.stylesheet.setParameter("color","#FF0000");
_4.resultDoc=_4.coordXsl.transformNodeToObject(_4.resultDoc);
};
}

mapbuilder.loadScript(baseDir+"/model/Proj.js");
mapbuilder.loadScript(baseDir+"/widget/MapContainerBase.js");
mapbuilder.loadScript(baseDir+"/util/wz_jsgraphics/wz_jsgraphics.js");
function GmlRendererWZ(_1,_2){
WidgetBase.apply(this,new Array(_1,_2));
var _3=_1.selectSingleNode("mb:stylesheet");
if(_3){
this.stylesheet=new XslProcessor(_3.firstChild.nodeValue,_2.namespace);
}else{
this.stylesheet=new XslProcessor(baseDir+"/widget/"+_1.nodeName+".xsl",_2.namespace);
}
this.paint=function(_4){
if(_4.model.doc&&_4.node&&_4.containerModel&&_4.containerModel.doc){
_4.stylesheet.setParameter("modelUrl",_4.model.url);
_4.resultDoc=_4.model.doc;
_4.prePaint(_4);
if(_4.debug){
alert("prepaint:"+Sarissa.serialize(_4.resultDoc));
}
if(_4.debug){
alert("stylesheet:"+Sarissa.serialize(_4.stylesheet.xslDom));
}
var _5=document.getElementById(_4.outputNodeId);
var _6=document.createElement("DIV");
_6.style.position="absolute";
_6.style.top=0;
_6.style.left=0;
_6.style.zindex=300;
_6.setAttribute("id",_4.outputNodeId);
if(_5){
_4.node.replaceChild(_6,_5);
}else{
_4.node.appendChild(_6);
}
_4.stylesheet.setParameter("objRef","objRef");
jsNode=_4.stylesheet.transformNodeToObject(_4.resultDoc);
js=jsNode.selectSingleNode("js").firstChild.nodeValue;
if(_4.debug){
alert("javascript eval:"+js);
}
_4.model.setParam("modelStatus","rendering");
eval(js);
_4.postPaint(_4);
}
};
this.model.addListener("refresh",this.paint,this);
MapContainerBase.apply(this,new Array(_1,_2));
for(var j=0;j<_1.childNodes.length;j++){
if(_1.childNodes[j].firstChild&&_1.childNodes[j].firstChild.nodeValue){
this.stylesheet.setParameter(_1.childNodes[j].nodeName,_1.childNodes[j].firstChild.nodeValue);
}
}
if(config.widgetText){
var _8="/mb:WidgetText/mb:widgets/mb:"+_1.nodeName;
var _9=config.widgetText.selectNodes(_8+"/*");
for(var j=0;j<_9.length;j++){
this.stylesheet.setParameter(_9[j].nodeName,_9[j].firstChild.nodeValue);
}
}
this.stylesheet.setParameter("modelId",this.model.id);
this.stylesheet.setParameter("modelTitle",this.model.title);
this.stylesheet.setParameter("widgetId",this.id);
this.stylesheet.setParameter("skinDir",config.skinDir);
this.stylesheet.setParameter("lang",config.lang);
this.coordXsl=new XslProcessor(baseDir+"/widget/GmlCooordinates2Coord.xsl");
this.prePaint=function(_a){
_a.model.setParam("modelStatus","preparing coordinates");
_a.stylesheet.setParameter("width",_a.containerModel.getWindowWidth());
_a.stylesheet.setParameter("height",_a.containerModel.getWindowHeight());
bBox=_a.containerModel.getBoundingBox();
_a.stylesheet.setParameter("bBoxMinX",bBox[0]);
_a.stylesheet.setParameter("bBoxMinY",bBox[1]);
_a.stylesheet.setParameter("bBoxMaxX",bBox[2]);
_a.stylesheet.setParameter("bBoxMaxY",bBox[3]);
_a.stylesheet.setParameter("color","#FF0000");
_a.resultDoc=_a.coordXsl.transformNodeToObject(_a.resultDoc);
if(!document.getElementById(_a.outputNodeId)){
}
};
this.hiddenListener=function(_b,_c){
var _d="visible";
if(_b.model.getHidden(_c)){
_d="hidden";
}
var _e=document.getElementById(_b.outputNodeId);
for(var i=0;i<_e.childNodes.length;++i){
_e.childNodes[i].style.visibility=_d;
}
};
this.model.addListener("hidden",this.hiddenListener,this);
}

mapbuilder.loadScript(baseDir+"/widget/WidgetBaseXSL.js");
function ModelStatus(_1,_2){
WidgetBaseXSL.apply(this,new Array(_1,_2));
this.prePaint=function(_3){
_3.stylesheet.setParameter("statusMessage",_3.targetModel.getParam("modelStatus"));
};
this.model.addListener("modelStatus",this.paint,this);
}

mapbuilder.loadScript(baseDir+"/widget/ButtonBase.js");
function Back(_1,_2){
ButtonBase.apply(this,new Array(_1,_2));
this.doSelect=function(_3,_4){
if(_3){
this.targetModel.setParam("historyBack");
var _5=_4.targetModel.previousExtent;
if(_5){
this.targetModel.setParam("historyStop");
_4.targetModel.extent.zoomToBox(_5[0],_5[1]);
this.targetModel.setParam("historyStart");
}
}
};
}

mapbuilder.loadScript(baseDir+"/widget/MapContainerBase.js");
function GmlRendererVG(_1,_2){
WidgetBase.apply(this,new Array(_1,_2));
MapContainerBase.apply(this,new Array(_1,_2));
var _3=_1.selectSingleNode("mb:tipWidget");
if(_3){
this.model.tipWidgetId=_3.firstChild.nodeValue;
}
this.prePaint=function(_4){
};
this.loadEntries=function(_5){
if((_5.model.doc!=null)&&(_5.targetModel.doc!=null)){
_5.containerModel.model=_5.model;
_5.containerModel.setParam("addLayer",_5.model.wfsFeature);
}
};
this.loadAndPaintEntries=function(_6){
if((_6.model.doc!=null)&&(_6.targetModel.doc!=null)){
_6.loadEntries(_6);
_6.targetModel.callListeners("refreshOtherLayers");
}
};
this.model.addListener("init",this.gmlRendererVGInit,this);
}
GmlRendererVG.prototype.paint=function(_7){
};
GmlRendererVG.prototype.gmlRendererVGInit=function(_8){
_8.targetModel.addListener("loadModel",_8.loadEntries,_8);
_8.targetModel.addListener("bbox",_8.loadEntries,_8);
_8.model.addListener("loadModel",_8.loadAndPaintEntries,_8);
};

mapbuilder.loadScript(baseDir+"/widget/WidgetBaseXSL.js");
function OpenLSResponse(_1,_2){
WidgetBaseXSL.apply(this,new Array(_1,_2));
}

mapbuilder.loadScript(baseDir+"/widget/WidgetBase.js");
function WidgetBaseXSL(_1,_2){
WidgetBase.apply(this,new Array(_1,_2));
if(!this.stylesheet){
var _3=_1.selectSingleNode("mb:stylesheet");
if(_3){
this.stylesheet=new XslProcessor(_3.firstChild.nodeValue,_2.namespace);
}else{
this.stylesheet=new XslProcessor(baseDir+"/widget/"+_1.nodeName+".xsl",_2.namespace);
}
}
if(config.widgetText){
var _4="/mb:WidgetText/mb:widgets/mb:"+_1.nodeName;
var _5=config.widgetText.selectNodes(_4+"/*");
for(var j=0;j<_5.length;j++){
this.stylesheet.setParameter(_5[j].nodeName,_5[j].firstChild.nodeValue);
}
}
for(var j=0;j<_1.childNodes.length;j++){
if(_1.childNodes[j].firstChild&&_1.childNodes[j].firstChild.nodeValue){
this.stylesheet.setParameter(_1.childNodes[j].nodeName,_1.childNodes[j].firstChild.nodeValue);
}
}
this.stylesheet.setParameter("modelId",this.model.id);
this.stylesheet.setParameter("modelTitle",this.model.title);
this.stylesheet.setParameter("widgetId",this.id);
this.stylesheet.setParameter("skinDir",config.skinDir);
this.stylesheet.setParameter("lang",config.lang);
this.paint=function(_7,_8){
if(_8&&(_8!=_7.id)){
return;
}
if(_7.model.doc&&_7.node){
_7.stylesheet.setParameter("modelUrl",_7.model.url);
_7.stylesheet.setParameter("targetModelId",_7.targetModel.id);
_7.resultDoc=_7.model.doc;
_7.prePaint(_7);
if(_7.debug){
alert("prepaint:"+Sarissa.serialize(_7.resultDoc));
}
if(_7.debug){
alert("stylesheet:"+Sarissa.serialize(_7.stylesheet.xslDom));
}
var _9=document.getElementById(_7.outputNodeId);
var _a=document.createElement("DIV");
var s=_7.stylesheet.transformNodeToString(_7.resultDoc);
if(config.serializeUrl&&_7.debug){
postLoad(config.serializeUrl,s);
}
if(_7.debug){
alert("painting:"+_7.id+":"+s);
}
_a.innerHTML=s;
if(_a.firstChild!=null){
_a.firstChild.setAttribute("id",_7.outputNodeId);
if(_9){
_7.node.replaceChild(_a.firstChild,_9);
}else{
_7.node.appendChild(_a.firstChild);
}
}
_7.postPaint(_7);
}
};
this.model.addListener("refresh",this.paint,this);
this.clearWidget=function(_c){
var _d=document.getElementById(_c.outputNodeId);
if(_d){
_c.node.removeChild(_d);
}
};
this.model.addListener("newModel",this.clearWidget,this);
}

mapbuilder.loadScript(baseDir+"/widget/ButtonBase.js");
function ClickPass(_1,_2){
ButtonBase.apply(this,new Array(_1,_2));
var _3=_1.selectSingleNode("mb:ClickPassId");
if(_3!=null){
this.clickPassId=_3.firstChild.nodeValue;
}else{
alert("unspecified clickPassId");
}
var _4=_1.selectSingleNode("mb:icon");
if(_4!=null){
this.icon=_4.firstChild.nodeValue;
var _5=document.createElement("div");
_5.setAttribute("id","clickPass"+this.clickPassId);
_5.style.position="relative";
_5.style.visibility="hidden";
_5.style.height="20px";
_5.style.width="20px";
_5.style.top="120px";
_5.style.left="120px";
_5.style.zIndex=300;
_5.title="clickPass"+this.clickPassId;
var _6=document.createElement("img");
_6.src=this.icon;
this.iconDiv=_5;
_5.appendChild(_6);
var _7=document.getElementById("mainMapPane");
_7.appendChild(_5);
}else{
alert("unspecified icon");
}
var _8=_1.selectSingleNode("mb:topOffset");
if(_8!=null){
this.topOffset=parseInt(_8.firstChild.nodeValue);
}else{
alert("unspecified topOffset");
}
var _9=_1.selectSingleNode("mb:leftOffset");
if(_9!=null){
this.leftOffset=parseInt(_9.firstChild.nodeValue);
}else{
alert("unspecified topOffset");
}
this.doAction=function(_a,_b){
if(_a.enabled){
point=_a.mouseHandler.model.extent.getXY(_b.evpl);
var x=point[0];
var y=point[1];
_a.iconDiv.style.top=_b.evpl[1]+_a.topOffset+"px";
_a.iconDiv.style.left=_b.evpl[0]+_a.leftOffset+"px";
_a.iconDiv.style.visibility="visible";
clickIt(x,y);
if(document.all){
window.setTimeout("hideClickPass("+_a.clickPassId+" )",5000);
}else{
setTimeout("hideClickPass("+_a.clickPassId+" )",5000);
}
}
};
this.hideClickPass=function(){
var _e=document.getElementById("clickPass"+this.clickPassId);
if(_e!=null){
_e.style.visibility="hidden";
}else{
alert("div clickPass"+this.clickPassId+" not found");
}
};
this.setMouseListener=function(_f){
if(_f.mouseHandler){
_f.mouseHandler.model.addListener("mouseup",_f.doAction,_f);
}
};
this.model.addListener("loadModel",this.setMouseListener,this);
}
function hideClickPass(id){
var div=document.getElementById("clickPass"+id);
if(div!=null){
div.style.visibility="hidden";
}else{
alert("div clickPass"+id+" not found");
}
}

mapbuilder.loadScript(baseDir+"/widget/WidgetBaseXSL.js");
function Widget(_1,_2){
WidgetBaseXSL.apply(this,new Array(_1,_2));
}

mapbuilder.loadScript(baseDir+"/widget/WidgetBaseXSL.js");
function TransactionResponse(_1,_2){
WidgetBaseXSL.apply(this,new Array(_1,_2));
}

mapbuilder.loadScript(baseDir+"/widget/WidgetBase.js");
function MapScaleBar(_1,_2){
WidgetBase.apply(this,new Array(_1,_2));
this.scaleDenominator=1;
this.displaySystem="metric";
var _3=_1.selectSingleNode("mb:displaySystem");
if(_3){
this.displaySystem=_3.firstChild.nodeValue;
}
this.minWidth=100;
var _4=_1.selectSingleNode("mb:minWidth");
if(_4){
this.minWidth=_4.firstChild.nodeValue;
}
this.maxWidth=200;
var _5=_1.selectSingleNode("mb:maxWidth");
if(_5){
this.maxWidth=_5.firstChild.nodeValue;
}
this.divisions=2;
var _6=_1.selectSingleNode("mb:divisions");
if(_6){
this.divisions=_6.firstChild.nodeValue;
}
this.subdivisions=2;
var _7=_1.selectSingleNode("mb:subdivisions");
if(_7){
this.subdivisions=_7.firstChild.nodeValue;
}
this.showMinorMeasures=false;
var _8=_1.selectSingleNode("mb:showMinorMeasures");
if(_8&&_8.firstChild.nodeValue=="true"){
this.showMinorMeasures=true;
}
this.abbreviateLabel=false;
var _9=_1.selectSingleNode("mb:abbreviateLabel");
if(_9&&_9.firstChild.nodeValue=="true"){
this.abbreviateLabel=true;
}
this.singleLine=false;
var _a=_1.selectSingleNode("mb:singleLine");
if(_a&&_a.firstChild.nodeValue=="true"){
this.singleLine=true;
}
this.align="center";
var _b=_1.selectSingleNode("mb:align");
if(_b){
this.align=_b.firstChild.nodeValue;
}
this.resolution=72;
this.container=document.createElement("div");
this.container.className="sbWrapper";
this.container.style.position="relative";
this.container.setAttribute("id",this.outputNodeId);
this.labelContainer=document.createElement("div");
this.labelContainer.className="sbUnitsContainer";
this.labelContainer.style.position="absolute";
this.graphicsContainer=document.createElement("div");
this.graphicsContainer.style.position="absolute";
this.graphicsContainer.className="sbGraphicsContainer";
this.numbersContainer=document.createElement("div");
this.numbersContainer.style.position="absolute";
this.numbersContainer.className="sbNumbersContainer";
var _c=document.createElement("div");
_c.className="sbMarkerMajor";
this.graphicsContainer.appendChild(_c);
var _d=document.createElement("div");
_d.className="sbMarkerMinor";
this.graphicsContainer.appendChild(_d);
var _e=document.createElement("div");
_e.className="sbBar";
this.graphicsContainer.appendChild(_e);
var _f=document.createElement("div");
_f.className="sbBarAlt";
this.graphicsContainer.appendChild(_f);
this.model.addListener("bbox",this.update,this);
this.model.addListener("refresh",this.update,this);
}
MapScaleBar.prototype.update=function(_10){
var _11=document.getElementById(_10.outputNodeId);
if(!_11){
_10.node.appendChild(_10.container);
}
var _12=_10.model.extent.getScale();
if(_12!=null){
_10.scaleDenominator=_12;
}
function HandsomeNumber(_13,_14,_15){
var _15=(_15==null)?10:_15;
var _16=Number.POSITIVE_INFINITY;
var _17=Number.POSITIVE_INFINITY;
var _18=_13;
var _19=3;
for(var _1a=0;_1a<3;++_1a){
var _1b=Math.pow(2,(-1*_1a));
var _1c=Math.floor(Math.log(_14/_1b)/Math.LN10);
for(var _1d=_1c;_1d>(_1c-_15+1);--_1d){
var _1e=Math.max(_1a-_1d,0);
var _1f=_1b*Math.pow(10,_1d);
if((_1f*Math.floor(_14/_1f))>=_13){
if(_13%_1f==0){
var _20=_13/_1f;
}else{
var _20=Math.floor(_13/_1f)+1;
}
var _21=_20+(2*_1a);
var _22=(_1d<0)?(Math.abs(_1d)+1):_1d;
if((_21<_16)||((_21==_16)&&(_22<_17))){
_16=_21;
_17=_22;
_18=(_1f*_20).toFixed(_1e);
_19=_1e;
}
}
}
}
this.value=_18;
this.score=_16;
this.tieBreaker=_17;
this.numDec=_19;
}
HandsomeNumber.prototype.toString=function(){
return this.value.toString();
};
HandsomeNumber.prototype.valueOf=function(){
return this.value;
};
function styleValue(_23,_24){
var _25=0;
if(document.styleSheets){
for(var _26=document.styleSheets.length-1;_26>=0;--_26){
var _27=document.styleSheets[_26];
if(!_27.disabled){
var _28;
if(typeof (_27.cssRules)=="undefined"){
if(typeof (_27.rules)=="undefined"){
return 0;
}else{
_28=_27.rules;
}
}else{
_28=_27.cssRules;
}
for(var _29=0;_29<_28.length;++_29){
var _2a=_28[_29];
if(_2a.selectorText&&(_2a.selectorText.toLowerCase()==_23.toLowerCase())){
if(_2a.style[_24]!=""){
_25=parseInt(_2a.style[_24]);
}
}
}
}
}
}
return _25?_25:0;
}
function formatNumber(_2b,_2c){
_2c=(_2c)?_2c:0;
var _2d=""+Math.round(_2b);
var _2e=/(-?[0-9]+)([0-9]{3})/;
while(_2e.test(_2d)){
_2d=_2d.replace(_2e,"$1,$2");
}
if(_2c>0){
var _2f=Math.floor(Math.pow(10,_2c)*(_2b-Math.round(_2b)));
if(_2f==0){
return _2d;
}else{
return _2d+"."+_2f;
}
}else{
return _2d;
}
}
_10.container.title="scale 1:"+formatNumber(_10.scaleDenominator);
var _30=new Object();
_30.english={units:["miles","feet","inches"],abbr:["mi","ft","in"],inches:[63360,12,1]};
_30.metric={units:["kilometers","meters","centimeters"],abbr:["km","m","cm"],inches:[39370.07874,39.370079,0.393701]};
var _31=new Array();
for(var _32=0;_32<_30[_10.displaySystem].units.length;++_32){
_31[_32]=new Object();
var _33=_10.resolution*_30[_10.displaySystem].inches[_32]/_10.scaleDenominator;
var _34=(_10.minWidth/_33)/(_10.divisions*_10.subdivisions);
var _35=(_10.maxWidth/_33)/(_10.divisions*_10.subdivisions);
for(var _36=0;_36<(_10.divisions*_10.subdivisions);++_36){
var _37=_34*(_36+1);
var _38=_35*(_36+1);
var _39=new HandsomeNumber(_37,_38);
_31[_32][_36]={value:(_39.value/(_36+1)),score:0,tieBreaker:0,numDec:0,displayed:0};
for(var _3a=0;_3a<(_10.divisions*_10.subdivisions);++_3a){
displayedValuePosition=_39.value*(_3a+1)/(_36+1);
niceNumber2=new HandsomeNumber(displayedValuePosition,displayedValuePosition);
var _3b=((_3a+1)%_10.subdivisions==0);
var _3c=((_3a+1)==(_10.divisions*_10.subdivisions));
if((_10.singleLine&&_3c)||(!_10.singleLine&&(_3b||_10.showMinorMeasures))){
_31[_32][_36].score+=niceNumber2.score;
_31[_32][_36].tieBreaker+=niceNumber2.tieBreaker;
_31[_32][_36].numDec=Math.max(_31[_32][_36].numDec,niceNumber2.numDec);
_31[_32][_36].displayed+=1;
}else{
_31[_32][_36].score+=niceNumber2.score/_10.subdivisions;
_31[_32][_36].tieBreaker+=niceNumber2.tieBreaker/_10.subdivisions;
}
}
var _3d=(_32+1)*_31[_32][_36].tieBreaker/_31[_32][_36].displayed;
_31[_32][_36].score*=_3d;
}
}
var _3e=null;
var _3f=null;
var _40=null;
var _41=null;
var _42=Number.POSITIVE_INFINITY;
var _43=Number.POSITIVE_INFINITY;
var _44=0;
for(var _32=0;_32<_31.length;++_32){
for(_36 in _31[_32]){
if((_31[_32][_36].score<_42)||((_31[_32][_36].score==_42)&&(_31[_32][_36].tieBreaker<_43))){
_42=_31[_32][_36].score;
_43=_31[_32][_36].tieBreaker;
_3e=_31[_32][_36].value;
_44=_31[_32][_36].numDec;
_3f=_30[_10.displaySystem].units[_32];
_40=_30[_10.displaySystem].abbr[_32];
_33=_10.resolution*_30[_10.displaySystem].inches[_32]/_10.scaleDenominator;
_41=_33*_3e;
}
}
}
var _45=(styleValue(".sbMarkerMajor","borderLeftWidth")+styleValue(".sbMarkerMajor","width")+styleValue(".sbMarkerMajor","borderRightWidth"))/2;
var _46=(styleValue(".sbMarkerMinor","borderLeftWidth")+styleValue(".sbMarkerMinor","width")+styleValue(".sbMarkerMinor","borderRightWidth"))/2;
var _47=(styleValue(".sbBar","borderLeftWidth")+styleValue(".sbBar","border-right-width"))/2;
var _48=(styleValue(".sbBarAlt","borderLeftWidth")+styleValue(".sbBarAlt","borderRightWidth"))/2;
if(!document.styleSheets){
_45=0.5;
_46=0.5;
}
while(_10.labelContainer.hasChildNodes()){
_10.labelContainer.removeChild(_10.labelContainer.firstChild);
}
while(_10.graphicsContainer.hasChildNodes()){
_10.graphicsContainer.removeChild(_10.graphicsContainer.firstChild);
}
while(_10.numbersContainer.hasChildNodes()){
_10.numbersContainer.removeChild(_10.numbersContainer.firstChild);
}
var _49,aBarPiece,numbersBox,xOffset;
var _4a={left:0,center:(-1*_10.divisions*_10.subdivisions*_41/2),right:(-1*_10.divisions*_10.subdivisions*_41)};
var _4b=0+_4a[_10.align];
var _4c=0;
for(var _4d=0;_4d<_10.divisions;++_4d){
_4b=_4d*_10.subdivisions*_41;
_4b+=_4a[_10.align];
_4c=(_4d==0)?0:((_4d*_10.subdivisions)*_3e).toFixed(_44);
_49=document.createElement("div");
_49.className="sbMarkerMajor";
_49.style.position="absolute";
_49.style.overflow="hidden";
_49.style.left=Math.round(_4b-_45)+"px";
_49.appendChild(document.createTextNode(" "));
_10.graphicsContainer.appendChild(_49);
if(!_10.singleLine){
numbersBox=document.createElement("div");
numbersBox.className="sbNumbersBox";
numbersBox.style.position="absolute";
numbersBox.style.overflow="hidden";
numbersBox.style.textAlign="center";
if(_10.showMinorMeasures){
numbersBox.style.width=Math.round(_41*2)+"px";
numbersBox.style.left=Math.round(_4b-_41)+"px";
}else{
numbersBox.style.width=Math.round(_10.subdivisions*_41*2)+"px";
numbersBox.style.left=Math.round(_4b-(_10.subdivisions*_41))+"px";
}
numbersBox.appendChild(document.createTextNode(_4c));
_10.numbersContainer.appendChild(numbersBox);
}
for(var _4e=0;_4e<_10.subdivisions;++_4e){
aBarPiece=document.createElement("div");
aBarPiece.style.position="absolute";
aBarPiece.style.overflow="hidden";
aBarPiece.style.width=Math.round(_41)+"px";
if((_4e%2)==0){
aBarPiece.className="sbBar";
aBarPiece.style.left=Math.round(_4b-_47)+"px";
}else{
aBarPiece.className="sbBarAlt";
aBarPiece.style.left=Math.round(_4b-_48)+"px";
}
aBarPiece.appendChild(document.createTextNode(" "));
_10.graphicsContainer.appendChild(aBarPiece);
if(_4e<(_10.subdivisions-1)){
_4b=((_4d*_10.subdivisions)+(_4e+1))*_41;
_4b+=_4a[_10.align];
_4c=(_4d*_10.subdivisions+_4e+1)*_3e;
_49=document.createElement("div");
_49.className="sbMarkerMinor";
_49.style.position="absolute";
_49.style.overflow="hidden";
_49.style.left=Math.round(_4b-_46)+"px";
_49.appendChild(document.createTextNode(" "));
_10.graphicsContainer.appendChild(_49);
if(_10.showMinorMeasures&&!_10.singleLine){
numbersBox=document.createElement("div");
numbersBox.className="sbNumbersBox";
numbersBox.style.position="absolute";
numbersBox.style.overflow="hidden";
numbersBox.style.textAlign="center";
numbersBox.style.width=Math.round(_41*2)+"px";
numbersBox.style.left=Math.round(_4b-_41)+"px";
numbersBox.appendChild(document.createTextNode(_4c));
_10.numbersContainer.appendChild(numbersBox);
}
}
}
}
_4b=(_10.divisions*_10.subdivisions)*_41;
_4b+=_4a[_10.align];
_4c=((_10.divisions*_10.subdivisions)*_3e).toFixed(_44);
_49=document.createElement("div");
_49.className="sbMarkerMajor";
_49.style.position="absolute";
_49.style.overflow="hidden";
_49.style.left=Math.round(_4b-_45)+"px";
_49.appendChild(document.createTextNode(" "));
_10.graphicsContainer.appendChild(_49);
if(!_10.singleLine){
numbersBox=document.createElement("div");
numbersBox.className="sbNumbersBox";
numbersBox.style.position="absolute";
numbersBox.style.overflow="hidden";
numbersBox.style.textAlign="center";
if(_10.showMinorMeasures){
numbersBox.style.width=Math.round(_41*2)+"px";
numbersBox.style.left=Math.round(_4b-_41)+"px";
}else{
numbersBox.style.width=Math.round(_10.subdivisions*_41*2)+"px";
numbersBox.style.left=Math.round(_4b-(_10.subdivisions*_41))+"px";
}
numbersBox.appendChild(document.createTextNode(_4c));
_10.numbersContainer.appendChild(numbersBox);
}
var _4f=document.createElement("div");
_4f.style.position="absolute";
var _50;
if(_10.singleLine){
_50=_4c;
_4f.className="sbLabelBoxSingleLine";
_4f.style.top="-0.6em";
_4f.style.left=(_4b+10)+"px";
}else{
_50="";
_4f.className="sbLabelBox";
_4f.style.textAlign="center";
_4f.style.width=Math.round(_10.divisions*_10.subdivisions*_41)+"px";
_4f.style.left=Math.round(_4a[_10.align])+"px";
_4f.style.overflow="hidden";
}
if(_10.abbreviateLabel){
_50+=" "+_40;
}else{
_50+=" "+_3f;
}
_4f.appendChild(document.createTextNode(_50));
_10.labelContainer.appendChild(_4f);
if(!document.styleSheets){
var _51=document.createElement("style");
_51.type="text/css";
var _52=".sbBar {top: 0px; background: #666666; height: 1px; border: 0;}";
_52+=".sbBarAlt {top: 0px; background: #666666; height: 1px; border: 0;}";
_52+=".sbMarkerMajor {height: 7px; width: 1px; background: #666666; border: 0;}";
_52+=".sbMarkerMinor {height: 5px; width: 1px; background: #666666; border: 0;}";
_52+=".sbLabelBox {top: -16px;}";
_52+=".sbNumbersBox {top: 7px;}";
_51.appendChild(document.createTextNode(_52));
document.getElementsByTagName("head").item(0).appendChild(_51);
}
_10.container.appendChild(_10.graphicsContainer);
_10.container.appendChild(_10.labelContainer);
_10.container.appendChild(_10.numbersContainer);
};

mapbuilder.loadScript(baseDir+"/widget/ButtonBase.js");
function ZoomIn(_1,_2){
ButtonBase.apply(this,new Array(_1,_2));
this.zoomFactor=4;
var _3=_1.selectSingleNode("mb:zoomFactor");
if(_3){
this.zoomFactor=_3.firstChild.nodeValue;
}
this.doAction=function(_4,_5){
if(_4.enabled){
var _6=_4.targetModel.getParam("aoi");
if(_6!=null){
var _7=_4.targetModel.extent;
var ul=_6[0];
var lr=_6[1];
if((ul[0]==lr[0])&&(ul[1]==lr[1])){
_7.centerAt(ul,_7.res[0]/_4.zoomFactor);
}else{
_7.zoomToBox(ul,lr);
}
}
}
};
this.setMouseListener=function(_a){
if(_a.mouseHandler){
_a.mouseHandler.model.addListener("mouseup",_a.doAction,_a);
}
};
this.model.addListener("loadModel",this.setMouseListener,this);
}

mapbuilder.loadScript(baseDir+"/widget/WidgetBaseXSL.js");
function OWSCatSearchForm(_1,_2){
WidgetBaseXSL.apply(this,new Array(_1,_2));
this.postPaint=function(_3){
_3.searchForm=document.getElementById(_3.formName);
_3.searchForm.parentWidget=_3;
_3.searchForm.westCoord.onblur=_3.setAoi;
_3.searchForm.northCoord.onblur=_3.setAoi;
_3.searchForm.eastCoord.onblur=_3.setAoi;
_3.searchForm.southCoord.onblur=_3.setAoi;
_3.searchForm.westCoord.model=_3.model;
_3.searchForm.northCoord.model=_3.model;
_3.searchForm.eastCoord.model=_3.model;
_3.searchForm.southCoord.model=_3.model;
_3.searchForm.onkeypress=_3.handleKeyPress;
_3.searchForm.onsubmit=_3.submitForm;
};
this.displayAoiCoords=function(_4){
_4.searchForm=document.getElementById(_4.formName);
var _5=_4.model.getParam("aoi");
_4.searchForm.westCoord.value=_5[0][0];
_4.searchForm.northCoord.value=_5[0][1];
_4.searchForm.eastCoord.value=_5[1][0];
_4.searchForm.southCoord.value=_5[1][1];
};
this.model.addListener("aoi",this.displayAoiCoords,this);
this.setAoi=function(){
var _6=this.model.getParam("aoi");
if(_6){
var ul=_6[0];
var lr=_6[1];
switch(this.name){
case "westCoord":
ul[0]=this.value;
break;
case "northCoord":
ul[1]=this.value;
break;
case "eastCoord":
lr[0]=this.value;
break;
case "southCoord":
lr[1]=this.value;
break;
}
this.model.setParam("aoi",new Array(ul,lr));
}
};
this.setLocation=function(_9){
var _a=new Array();
_a=_9.split(",");
var ul=new Array(parseFloat(_a[0]),parseFloat(_a[2]));
var lr=new Array(parseFloat(_a[1]),parseFloat(_a[3]));
this.model.setParam("aoi",new Array(ul,lr));
};
this.submitForm=function(){
thisWidget=this.parentWidget;
thisWidget.webServiceForm=document.getElementById(thisWidget.formName);
thisWidget.targetModel.setParam("wfs_GetFeature","service_resources");
return false;
};
this.handleKeyPress=function(_d){
var _e;
var _f;
if(_d){
_e=_d.which;
_f=_d.currentTarget;
}else{
_e=window.event.keyCode;
_f=window.event.srcElement.form;
}
if(_e==13){
_f.parentWidget.submitForm();
return false;
}
};
var _10=null;
this.openRucWindow=function(_11){
if(_10==null||_10.closed){
var _12;
var _13;
switch(_11){
case "placename":
baseURL="/rucs/placeName.html?language="+config.lang+"&formName="+this.formName;
_13="width=290,height=480,scrollbars=0,toolbar=0,location=0,directories=0,status=0,menubar=0,resizable=0";
break;
case "postalCode":
baseURL="/rucs/postalCode.html?language="+config.lang+"&formName="+this.formName;
_13="width=280,height=180,scrollbars=0,toolbar=0,location=0,directories=0,status=0,menubar=0,resizable=0";
break;
default:
alert("unkown RUC type");
break;
}
_10=open(baseURL,"RUCWindow",_13);
}
_10.focus();
return false;
};
function RUC_closeRUCWindow(){
if(_10!=null&&!_10.closed){
_10.close();
}
}
this.formName="WebServiceForm_"+mbIds.getId();
this.stylesheet.setParameter("formName",this.formName);
}
SetAoiCoords=function(_14){
config.objects.mainMap.setParam("aoi",_14);
};

mapbuilder.loadScript(baseDir+"/widget/ButtonBase.js");
mapbuilder.loadScript(baseDir+"/tool/GoogleMapTools.js");
function GoogleMapDragPan(_1,_2){
ButtonBase.apply(this,new Array(_1,_2));
this.cursor="move";
this.doAction=function(_3,_4){
if(!_3.enabled){
return;
}
var _5=_3.targetModel.getParam("aoi");
mid=new Array((_5[0][0]+_5[1][0])/2,(_5[0][1]+_5[1][1])/2);
_3.googleMapTools.zoomTo(_3.targetModel,mid,0);
};
this.setMouseListener=function(_6){
if(_6.mouseHandler){
_6.mouseHandler.model.addListener("mouseup",_6.doAction,_6);
}
if(!_6.googleMapTools){
_6.googleMapTools=new GoogleMapTools();
}
};
this.model.addListener("loadModel",this.setMouseListener,this);
}

mapbuilder.loadScript(baseDir+"/widget/ButtonBase.js");
function GetFeatureInfo(_1,_2){
ButtonBase.apply(this,new Array(_1,_2));
this.xsl=new XslProcessor(baseDir+"/tool/GetFeatureInfo.xsl");
this.infoFormat="application/vnd.ogc.gml";
this.featureCount=1;
var _3=_1.selectSingleNode("mb:featureCount");
if(_3){
this.featureCount=_3.firstChild.nodeValue;
}
this.doAction=function(_4,_5){
if(_4.enabled){
_4.targetModel.deleteTemplates();
var _6=_4.context.getParam("selectedLayer");
if(_6==null){
var _7=_4.context.getQueryableLayers();
if(_7.length==0){
alert("There are no queryable layers available, please add a queryable layer to the context.");
return;
}else{
for(var i=0;i<_7.length;++i){
var _9=_7[i];
var _a=_9.firstChild.data;
var _b=_4.context.getHidden(_a);
if(_b==0){
_4.xsl.setParameter("queryLayer",_a);
_4.xsl.setParameter("xCoord",_5.evpl[0]);
_4.xsl.setParameter("yCoord",_5.evpl[1]);
_4.xsl.setParameter("infoFormat",_4.infoFormat);
_4.xsl.setParameter("featureCount",_4.featureCount);
urlNode=_4.xsl.transformNodeToObject(_4.context.doc);
url=urlNode.documentElement.firstChild.nodeValue;
httpPayload=new Object();
httpPayload.url=url;
httpPayload.method="get";
httpPayload.postData=null;
_4.targetModel.newRequest(_4.targetModel,httpPayload);
}
}
}
}else{
_4.xsl.setParameter("queryLayer",_6);
_4.xsl.setParameter("xCoord",_5.evpl[0]);
_4.xsl.setParameter("yCoord",_5.evpl[1]);
_4.xsl.setParameter("infoFormat",_4.infoFormat);
_4.xsl.setParameter("featureCount","1");
var _c=_4.xsl.transformNodeToObject(_4.context.doc);
var _d=_c.documentElement.firstChild.nodeValue;
if(_4.infoFormat=="text/html"){
window.open(_d,"queryWin","height=200,width=300,scrollbars=yes");
}else{
var _e=new Object();
_e.url=_d;
_e.method="get";
_e.postData=null;
_4.targetModel.newRequest(_4.targetModel,_e);
}
}
}
};
this.setMouseListener=function(_f){
if(_f.mouseHandler){
_f.mouseHandler.model.addListener("mouseup",_f.doAction,_f);
}
_f.context=_f.widgetNode.selectSingleNode("mb:context");
if(_f.context){
_f.context=window.config.objects[_f.context.firstChild.nodeValue];
}
};
config.addListener("loadModel",this.setMouseListener,this);
}

mapbuilder.loadScript(baseDir+"/widget/ButtonBase.js");
mapbuilder.loadScript(baseDir+"/tool/GoogleMapTools.js");
function GoogleMapZoomIn(_1,_2){
ButtonBase.apply(this,new Array(_1,_2));
this.doAction=function(_3,_4){
if(_3.enabled){
var _5=_3.targetModel.getParam("aoi");
if(_5!=null){
var _6=_3.targetModel.extent;
var ul=_5[0];
var lr=_5[1];
if((ul[0]==lr[0])&&(ul[1]==lr[1])){
_3.googleMapTools.zoomTo(_3.targetModel,ul,1);
}else{
_3.googleMapTools.setGmapExtent(_3.targetModel,new Array(lr[0],ul[1],ul[0],lr[1]));
}
}
}
};
this.setMouseListener=function(_9){
if(_9.mouseHandler){
_9.mouseHandler.model.addListener("mouseup",_9.doAction,_9);
}
if(!_9.googleMapTools){
_9.googleMapTools=new GoogleMapTools();
}
};
this.model.addListener("loadModel",this.setMouseListener,this);
}

mapbuilder.loadScript(baseDir+"/widget/ButtonBase.js");
function DeleteFeature(_1,_2){
ButtonBase.apply(this,new Array(_1,_2));
this.cursor="default";
this.trm=_1.selectSingleNode("mb:transactionResponseModel").firstChild.nodeValue;
this.tm=_1.selectSingleNode("mb:targetModel").firstChild.nodeValue;
this.tc=_1.selectSingleNode("mb:targetContext").firstChild.nodeValue;
this.httpPayload=new Object();
this.httpPayload.url=_1.selectSingleNode("mb:webServiceUrl").firstChild.nodeValue;
this.httpPayload.method="post";
this.deleteXsl=new XslProcessor(baseDir+"/tool/xsl/wfs_Delete.xsl");
this.doSelect=function(_3,_4){
if(_3){
if(!_4.transactionResponseModel){
_4.transactionResponseModel=window.config.objects[_4.trm];
_4.transactionResponseModel.addListener("loadModel",_4.handleResponse,_4);
}
if(!_4.targetModel){
_4.targetModel=window.config.objects[_4.tm];
}
if(!_4.targetContext){
_4.targetContext=window.config.objects[_4.tc];
}
fid=_4.targetModel.getXpathValue(_4.targetModel,"//@fid");
if(_4.targetModel.doc&&fid){
s=_4.deleteXsl.transformNodeToObject(_4.targetModel.doc);
_4.httpPayload.postData=s;
_4.transactionResponseModel.newRequest(_4.transactionResponseModel,_4.httpPayload);
}else{
alert("No feature available to delete");
}
}
};
this.handleResponse=function(_5){
sucess=_5.transactionResponseModel.doc.selectSingleNode("//wfs:TransactionResult/wfs:Status/wfs:SUCCESS");
if(sucess){
httpPayload=new Object();
httpPayload.url=null;
_5.targetModel.newRequest(_5.targetModel,httpPayload);
_5.targetContext.callListeners("refreshWmsLayers");
}
};
}

mapbuilder.loadScript(baseDir+"/widget/WidgetBaseXSL.js");
mapbuilder.loadScript(baseDir+"/widget/MapContainerBase.js");
function TimeSeries(_1,_2){
WidgetBaseXSL.apply(this,new Array(_1,_2));
MapContainerBase.apply(this,new Array(_1,_2));
this.hiddenListener=function(_3,_4){
var _5="visible";
if(_3.model.getHidden(_4)=="1"){
_5="hidden";
}
var _6=_3.model.id+"_"+_3.id+"_"+_4;
if(_3.model.timestampList&&_3.model.timestampList.getAttribute("layerName")==_4){
var _7=_3.model.getParam("timestamp");
var _8=_3.model.timestampList.childNodes[_7];
_6+="_"+_8.firstChild.nodeValue;
}
var _9=document.getElementById(_6);
if(_9){
_9.style.visibility=_5;
}else{
alert("error finding layerId:"+_6);
}
};
this.model.addListener("hidden",this.hiddenListener,this);
this.timestampListener=function(_a,_b){
var _c=_a.model.timestampList.getAttribute("layerName");
var _d=_a.model.timestampList.childNodes[_b];
var _e=(_d.getAttribute("current")=="1")?"visible":"hidden";
var _f=_a.model.id+"_"+_a.id+"_"+_c+"_"+_d.firstChild.nodeValue;
var _10=document.getElementById(_f);
if(_10){
_10.style.visibility=_e;
}else{
alert("error finding layerId:"+_f);
}
};
this.model.addListener("timestamp",this.timestampListener,this);
this.bboxListener=function(_11,_12){
_11.paint(_11,_11.id);
};
this.model.addListener("bbox",this.bboxListener,this);
this.prePaint=function(_13){
var _14="";
var _15=_13.model.timestampList;
if(_15){
for(var i=_13.model.getParam("firstFrame");i<=_13.model.getParam("lastFrame");++i){
_14+=_15.childNodes[i].firstChild.nodeValue+",";
}
_13.stylesheet.setParameter("timeList",_14.substring(0,_14.length-1));
}
};
}

mapbuilder.loadScript(baseDir+"/widget/WidgetBaseXSL.js");
function WmsCapabilitiesImport(_1,_2){
WidgetBaseXSL.apply(this,new Array(_1,_2));
this.onKeyPress=function(e){
var _4;
var _5;
if(e.which){
_5=e.which;
_4=e.currentTarget.value;
}else{
_5=window.event.keyCode;
_4=window.event.srcElement.value;
}
if(_5==13){
capabilities=Sarissa.getDomDocument();
capabilities.async=false;
capabilities.load(_4);
alert("capabilities="+capabilities.xml);
xsl=Sarissa.getDomDocument();
xsl.async=false;
xsl.load(baseDir+"/widget/wms/WMSCapabilities2Context.xsl");
alert("xsl="+xsl.xml);
context=Sarissa.getDomDocument();
capabilities.transformNodeToObject(xsl,context);
alert("context="+context.xml);
this.model.loadModelNode(context);
}
};
}

mapbuilder.loadScript(baseDir+"/widget/ButtonBase.js");
function InsertFeature(_1,_2){
this.cursor="default";
ButtonBase.apply(this,new Array(_1,_2));
this.trm=_1.selectSingleNode("mb:transactionResponseModel").firstChild.nodeValue;
this.tm=_1.selectSingleNode("mb:targetModel").firstChild.nodeValue;
this.tc=_1.selectSingleNode("mb:targetContext").firstChild.nodeValue;
this.httpPayload=new Object();
this.httpPayload.url=_1.selectSingleNode("mb:webServiceUrl").firstChild.nodeValue;
this.httpPayload.method="post";
this.insertXsl=new XslProcessor(baseDir+"/tool/xsl/wfs_Insert.xsl");
this.updateXsl=new XslProcessor(baseDir+"/tool/xsl/wfs_Update.xsl");
this.doSelect=function(_3,_4){
if(_3){
if(!_4.transactionResponseModel){
_4.transactionResponseModel=window.config.objects[_4.trm];
_4.transactionResponseModel.addListener("loadModel",_4.handleResponse,_4);
}
if(!_4.targetModel){
_4.targetModel=window.config.objects[_4.tm];
}
if(!_4.targetContext){
_4.targetContext=window.config.objects[_4.tc];
}
fid=_4.targetModel.getXpathValue(_4.targetModel,"//@fid");
if(_4.targetModel.doc){
if(fid){
s=_4.updateXsl.transformNodeToObject(_4.targetModel.doc);
}else{
s=_4.insertXsl.transformNodeToObject(_4.targetModel.doc);
}
_4.httpPayload.postData=s;
_4.transactionResponseModel.newRequest(_4.transactionResponseModel,_4.httpPayload);
}else{
alert("No feature available to insert");
}
}
};
this.handleResponse=function(_5){
sucess=_5.transactionResponseModel.doc.selectSingleNode("//wfs:TransactionResult/wfs:Status/wfs:SUCCESS");
if(sucess){
_5.targetModel.setModel(_5.targetModel,null);
_5.targetContext.callListeners("refreshWmsLayers");
}
};
}

mapbuilder.loadScript(baseDir+"/widget/EditButtonBase.js");
mapbuilder.loadScript(baseDir+"/model/Proj.js");
function Measurement(_1,_2){
EditButtonBase.apply(this,new Array(_1,_2));
this.cursor="crosshair";
var _3=0;
var _4=0;
var _5=false;
var _6=false;
this.doAction=function(_7,_8){
if(_7.enabled){
if(_7.restart){
_7.model.setParam("clearMeasurementLine");
_7.restart=false;
}
var _9=_7.mouseHandler.model.extent.getXY(_8.evpl);
var _a=_7.targetModel.getXpathValue(_7.targetModel,_7.featureXpath);
if(!_a){
_a="";
}
sucess=_7.targetModel.setXpathValue(_7.targetModel,_7.featureXpath,_a+" "+_9[0]+","+_9[1]);
if(!sucess){
alert("Measurement: invalid featureXpath in config: "+_7.featureXpath);
}
var _b=_7.targetModel.getXpathValue(_7.targetModel,_7.featureXpath);
var _c=_b.split(" ");
if(_c.length>=3){
var _d=_c[_c.length-2];
var _e=_c[_c.length-1];
var P=_d.split(",");
var Q=_e.split(",");
_7.srs=srs.toUpperCase();
_7.proj=new Proj(_7.srs);
if(_7.proj.Forward){
P=_7.proj.Forward(P);
Q=_7.proj.Forward(Q);
}
if(!P||!Q){
alert("Measurement: Projection not supported!");
}else{
if(_7.proj.units=="meters"){
Xp=parseFloat(P[0]);
Yp=parseFloat(P[1]);
Xq=parseFloat(Q[0]);
Yq=parseFloat(Q[1]);
_4=Math.sqrt(((Xp-Xq)*(Xp-Xq))+((Yp-Yq)*(Yp-Yq)));
if(_4==0){
_7.restart=true;
_7.model.setParam("clearMouseLine");
_7.targetModel.setParam("mouseRenderer",false);
return;
}
_3=Math.round(_3+_4);
}else{
if(_7.proj.units=="degrees"){
Lonp=parseFloat(P[0]);
Latp=parseFloat(P[1]);
Lonq=parseFloat(Q[0]);
Latq=parseFloat(Q[1]);
radDistance=Math.acos(Math.sin(Latp)*Math.sin(Latq)+Math.cos(Latp)*Math.cos(Latq)*Math.cos(Lonp-Lonq));
_4=radDistance*6378137;
if(_4==0){
_7.restart=true;
_7.model.setParam("clearMouseLine");
_7.targetModel.setParam("mouseRenderer",false);
return;
}
_3=Math.round(_3+_4);
}else{
alert("Measurement does not know how to calculate the distance");
}
}
}
}
_7.targetModel.setParam("showDistance",_3);
}
};
this.clearMeasurementLine=function(_11){
if(_3!=0){
_3=0;
sucess=_11.targetModel.setXpathValue(_11.targetModel,_11.featureXpath,"");
if(!sucess){
alert("Measurement: invalid featureXpath in config: "+_11.featureXpath);
}
_11.targetModel.setParam("refresh");
}
};
this.model.addListener("clearMeasurementLine",this.clearMeasurementLine,this);
}

mapbuilder.loadScript(baseDir+"/widget/ButtonBase.js");
mapbuilder.loadScript(baseDir+"/tool/GoogleMapTools.js");
function GoogleMapZoomOut(_1,_2){
ButtonBase.apply(this,new Array(_1,_2));
this.doAction=function(_3,_4){
if(_3.enabled){
bbox=_3.targetModel.getParam("aoi");
if(bbox!=null){
extent=_3.targetModel.extent;
ul=bbox[0];
lr=bbox[1];
mid=new Array((ul[0]+lr[0])/2,(ul[1]+ul[1])/2);
_3.googleMapTools.zoomTo(_3.targetModel,mid,-1);
}
}
};
this.setMouseListener=function(_5){
if(_5.mouseHandler){
_5.mouseHandler.model.addListener("mouseup",_5.doAction,_5);
}
if(!_5.googleMapTools){
_5.googleMapTools=new GoogleMapTools();
}
};
this.model.addListener("loadModel",this.setMouseListener,this);
}

mapbuilder.loadScript(baseDir+"/widget/WidgetBaseXSL.js");
function ModelSwitcher(_1,_2){
WidgetBase.apply(this,new Array(_1,_2));
this.switchMap=function(_3,_4){
this.bbox=config.objects.mainMap.getBoundingBox();
this.targetModel.addListener("loadModel",this.setExtent,this);
window.cgiArgs["bbox"]=""+this.bbox[0]+","+this.bbox[1]+","+this.bbox[2]+","+this.bbox[3];
config.loadModel(_3,_4);
};
this.setExtent=function(_5){
};
}

mapbuilder.loadScript(baseDir+"/widget/WidgetBase.js");
function FeatureList(_1,_2){
WidgetBaseXSL.apply(this,new Array(_1,_2));
this.setAttr=function(_3,_4,_5,_6){
_3.model.setXpathValue(_3.model,_4,_5,_6);
};
}

mapbuilder.loadScript(baseDir+"/widget/GmlRenderer.js");
function AoiBox2(_1,_2){
var _3=new GmlRenderer(_1,_2);
for(sProperty in _3){
this[sProperty]=_3[sProperty];
}
this.stylesheet=new XslProcessor(baseDir+"/widget/GmlRenderer.xsl");
this.prePaint=function(_4){
_4.stylesheet.setParameter("width",_4.targetModel.getWindowWidth());
_4.stylesheet.setParameter("height",_4.targetModel.getWindowHeight());
bBox=_4.targetModel.getBoundingBox();
_4.stylesheet.setParameter("bBoxMinX",bBox[0]);
_4.stylesheet.setParameter("bBoxMinY",bBox[1]);
_4.stylesheet.setParameter("bBoxMaxX",bBox[2]);
_4.stylesheet.setParameter("bBoxMaxY",bBox[3]);
_4.stylesheet.setParameter("color","#FF0000");
_4.stylesheet.setParameter("crossSize","15");
_4.stylesheet.setParameter("lineWidth","1");
aoiBox=_4.model.getParam("aoi");
gml="<?xml version=\"1.0\" encoding=\"utf-8\" standalone=\"no\"?>";
if(aoiBox){
ul=_4.model.extent.getPL(aoiBox[0]);
lr=_4.model.extent.getPL(aoiBox[1]);
gml=gml+"<Aoi version=\"1.0.0\" xmlns:gml=\"http://www.opengis.net/gml\">";
gml=gml+"<gml:Envelope>";
gml=gml+"<gml:coord>";
gml=gml+"<gml:X>"+aoiBox[0][0]+"</gml:X>";
gml=gml+"<gml:Y>"+aoiBox[0][1]+"</gml:Y>";
gml=gml+"</gml:coord>";
gml=gml+"<gml:coord>";
gml=gml+"<gml:X>"+aoiBox[1][0]+"</gml:X>";
gml=gml+"<gml:Y>"+aoiBox[1][1]+"</gml:Y>";
gml=gml+"</gml:coord>";
gml=gml+"</gml:Envelope>";
gml=gml+"</Aoi>";
}else{
gml=gml+"<null/>";
}
_4.resultDoc=Sarissa.getDomDocument();
_4.resultDoc.loadXML(gml);
};
this.aoiListener=function(_5){
_5.paint(_5);
};
_2.addListener("aoi",this.aoiListener,this);
}

mapbuilder.loadScript(baseDir+"/widget/WidgetBaseXSL.js");
function ServiceRegistryList(_1,_2){
WidgetBaseXSL.apply(this,new Array(_1,_2));
this.submitForm=function(){
alert("submitForm");
var _3=this.webServiceForm.action+"?";
for(var i=0;i<this.webServiceForm.elements.length;++i){
var _5=this.webServiceForm.elements[i];
_3+=_5.name+"="+_5.value+"&";
}
alert(_3);
config.loadModel(this.targetModel.id,_3);
};
this.postPaint=function(_6){
_6.webServiceForm=document.getElementById(_6.formName);
};
this.formName="WebServiceForm_";
this.stylesheet.setParameter("formName",this.formName);
}

mapbuilder.loadScript(baseDir+"/widget/WidgetBase.js");
function ModelUrlInput(_1,_2){
WidgetBaseXSL.apply(this,new Array(_1,_2));
var _3=_1.selectSingleNode("mb:defaultUrl");
if(_3){
this.defaultUrl=_3.firstChild.nodeValue;
}
this.submitForm=function(){
var _4=new Object();
_4.url=this.urlInputForm.defaultUrl.value;
_4.method=this.targetModel.method;
this.targetModel.newRequest(this.targetModel,_4);
};
this.handleKeyPress=function(_5){
var _6;
var _7;
if(_5){
_6=_5.which;
_7=_5.currentTarget;
}else{
_6=window.event.keyCode;
_7=window.event.srcElement.form;
}
if(_6==13){
_7.parentWidget.submitForm();
return false;
}
};
this.prePaint=function(_8){
_8.stylesheet.setParameter("modelTitle",_8.targetModel.title);
if(!_8.defaultUrl){
_8.defaultUrl=_8.targetModel.url;
}
_8.stylesheet.setParameter("defaultUrl",_8.defaultUrl);
};
this.postPaint=function(_9){
_9.urlInputForm=document.getElementById(_9.formName);
_9.urlInputForm.parentWidget=_9;
_9.urlInputForm.onkeypress=_9.handleKeyPress;
};
this.formName="urlInputForm_"+mbIds.getId();
this.stylesheet.setParameter("formName",this.formName);
}

mapbuilder.loadScript(baseDir+"/widget/MapContainerBase.js");
function MapImage(_1,_2){
WidgetBase.apply(this,new Array(_1,_2));
this.paint=function(_3){
if(_3.model.doc&&_3.node){
_3.prePaint(_3);
var _4=document.getElementById(_3.outputNodeId);
var _5=document.createElement("DIV");
_5.style.position="absolute";
_5.style.top=0;
_5.style.left=0;
_5.appendChild(_3.model.doc);
_5.setAttribute("id",_3.outputNodeId);
if(_4){
_3.node.replaceChild(_5,_4);
}else{
_3.node.appendChild(_5);
}
_3.postPaint(_3);
}
};
this.model.addListener("refresh",this.paint,this);
MapContainerBase.apply(this,new Array(_1,_2));
this.prePaint=function(_6){
_6.model.doc.width=_6.containerModel.getWindowWidth();
_6.model.doc.height=_6.containerModel.getWindowHeight();
};
}

mapbuilder.loadScript(baseDir+"/tool/Extent.js");
function MapContainerBase(_1,_2){
var _3=_1.selectSingleNode("mb:mapContainerId");
if(_3){
this.containerNodeId=_3.firstChild.nodeValue;
}else{
alert("MapContainerBase: required property mapContainerId missing in config:"+this.id);
}
var _4=_1.selectSingleNode("mb:zoomLevels");
this.zoomLevels=null;
if(_4){
this.zoomLevels=_4.firstChild.nodeValue.split(",");
}
this.setContainerWidth=function(_5){
_5.node.style.width=_5.containerModel.getWindowWidth()+"px";
_5.node.style.height=_5.containerModel.getWindowHeight()+"px";
if(this.stylesheet){
this.stylesheet.setParameter("width",_5.containerModel.getWindowWidth());
this.stylesheet.setParameter("height",_5.containerModel.getWindowHeight());
}
};
this.setFixedWidth=function(_6){
var _7=_1.selectSingleNode("mb:fixedWidth");
if(_7){
_7=_7.firstChild.nodeValue;
var _8=_6.containerModel.getWindowHeight()/_6.containerModel.getWindowWidth();
var _9=Math.round(_8*_7);
_6.containerModel.setWindowSize(new Array(_7,_9));
}
};
var _a=document.getElementById(this.containerNodeId);
if(_a){
this.containerModel=_a.containerModel;
_2.containerModel=_a.containerModel;
}else{
_a=document.createElement("div");
_a.setAttribute("id",this.containerNodeId);
_a.id=this.containerNodeId;
_a.style.position="relative";
_a.style.overflow="hidden";
_a.style.zIndex="500";
_a.containerModel=this.model;
this.containerModel=this.model;
_2.containerModel=_a.containerModel;
this.containerModel.extent=new Extent(this.containerModel);
if(this.zoomLevels){
this.containerModel.extent.setZoomLevels(true,this.zoomLevels);
}else{
this.containerModel.extent.setZoomLevels(false);
}
this.containerModel.addFirstListener("loadModel",this.containerModel.extent.firstInit,this.containerModel.extent);
this.containerModel.addListener("bbox",this.containerModel.extent.init,this.containerModel.extent);
this.containerModel.addListener("resize",this.containerModel.extent.init,this.containerModel.extent);
this.setTooltip=function(_b,_c){
};
this.containerModel.addListener("tooltip",this.setTooltip,this);
this.eventHandler=function(ev){
if(window.event){
var p=window.event.clientX-getOffsetLeft(this)+document.documentElement.scrollLeft+document.body.scrollLeft;
var l=window.event.clientY-getOffsetTop(this)+document.documentElement.scrollTop+document.body.scrollTop;
this.evpl=new Array(p,l);
this.eventTarget=window.event.srcElement;
this.altKey=window.event.altKey;
this.ctrlKey=window.event.ctrlKey;
this.shiftKey=window.event.shiftKey;
this.eventType=window.event.type;
window.event.returnValue=false;
window.event.cancelBubble=true;
}else{
var p=ev.clientX+window.scrollX-getOffsetLeft(this);
var l=ev.clientY+window.scrollY-getOffsetTop(this);
this.evpl=new Array(p,l);
this.eventTarget=ev.target;
this.eventType=ev.type;
this.altKey=ev.altKey;
this.ctrlKey=ev.ctrlKey;
this.shiftKey=ev.shiftKey;
ev.stopPropagation();
}
this.containerModel.setParam(this.eventType,this);
return false;
};
this.eventHandler=this.eventHandler;
_a.onmousemove=this.eventHandler;
_a.onmouseout=this.eventHandler;
_a.onmouseover=this.eventHandler;
_a.onmousedown=this.eventHandler;
_a.onmouseup=this.eventHandler;
this.node.appendChild(_a);
}
this.node=document.getElementById(this.containerNodeId);
this.setContainerWidth=this.setContainerWidth;
this.containerModel.addFirstListener("loadModel",this.setContainerWidth,this);
this.containerModel.addFirstListener("loadModel",this.setFixedWidth,this);
this.containerModel.addFirstListener("resize",this.setContainerWidth,this);
this.containerModel.addListener("bbox",this.paint,this);
}
function getOffsetLeft(_10){
var _11=0;
if(_10==null){
return _11;
}else{
if(_10.offsetLeft){
_11=_10.offsetLeft+getOffsetLeft(_10.offsetParent);
}else{
_11=getOffsetLeft(_10.offsetParent);
}
return _11;
}
}
function getOffsetTop(_12){
var _13=0;
if(_12==null){
return _13;
}else{
if(_12.offsetTop){
_13=_12.offsetTop+getOffsetTop(_12.offsetParent);
}else{
_13=getOffsetTop(_12.offsetParent);
}
return _13;
}
}

mapbuilder.loadScript(baseDir+"/model/Proj.js");
mapbuilder.loadScript(baseDir+"/widget/WidgetBase.js");
mapbuilder.loadScript(baseDir+"/widget/MapContainerBase.js");
mapbuilder.loadScript(baseDir+"/widget/TipObject.js");
mapbuilder.loadScript(baseDir+"/graphics/FeatureFactory.js");
function GeoRssRenderer(_1,_2){
WidgetBase.apply(this,new Array(_1,_2));
MapContainerBase.apply(this,new Array(_1,_2));
this.model.addListener("refresh",this.paint,this);
var _3=_1.selectSingleNode("mb:tipWidget");
if(_3){
this.tipWidgetId=_3.firstChild.nodeValue;
}
var _4=_1.selectSingleNode("mb:popupStylesheet");
if(_4){
var _5=_4.firstChild.nodeValue;
this.popupStyleSheet=new XslProcessor(_5,_2.namespace);
}
this.featureFactory=new FeatureFactory(_1,_2,this.tipWidgetId);
this.highlight=function(_6,_7){
var _8=document.getElementById(_7+"_normal");
if(_8!=undefined){
_8.style.visibility="hidden";
var _9=document.getElementById(_7+"_highlight");
_9.style.visibility="visible";
}
};
this.model.addListener("highlightFeature",this.highlight,this);
this.dehighlight=function(_a,_b){
var _c=document.getElementById(_b+"_normal");
if(_c!=undefined){
_c.style.visibility="visible";
var _d=document.getElementById(_b+"_highlight");
_d.style.visibility="hidden";
}
};
this.model.addListener("dehighlightFeature",this.dehighlight,this);
this.transformEntry=function(_e,_f){
if(_e.popupStyleSheet!=undefined){
var _10=_e.popupStyleSheet.transformNodeToObject(_f);
var _11=Sarissa.serialize(_10.documentElement);
return _11;
}
};
}
GeoRssRenderer.prototype.paint=function(_12){
_12.featureFactory.clearFeatures(_12);
if(_12.model.doc&&_12.containerModel.doc&&_12.node){
var _13=new Proj(_12.containerModel.getSRS());
var _14=_12.model.getFeatureNodes();
var len=_14.length;
for(var _16=0;_16<len;_16++){
var _17=_14[_16];
var _18=_12.model.getFeatureName(_17);
var _19=_12.model.getFeatureId(_17);
var _1a=_12.model.getFeatureIcon(_17);
var _1b=_12.model.getFeatureGeometry(_17);
if(_1b!=undefined){
var _1c=_12.transformEntry(_12,_17);
if(_1b.match("POINT")){
var _1d=_1b.substring(6,_1b.length);
var _1e=_1d.split(" ");
_1e=_13.Forward(_1e);
_1e=_12.containerModel.extent.getPL(_1e);
_12.featureFactory.createFeature(_12,"POINT",_1e,_19,_18,_1c,_1a);
}else{
if(_1b.match("LINESTRING")){
var _1f=_1b.substring(11,_1b.length);
var re=RegExp("[, \n\t]+","g");
var _21=_1f.split(re);
var _22=new Array(_21.length/2);
var _1e=new Array(2);
var _23;
var jj=0;
for(var i=0;i<_21.length;i++){
_1e[0]=_21[i];
_1e[1]=_21[i+1];
_23=_13.Forward(_1e);
_23=_12.containerModel.extent.getPL(_23);
_22[jj]=_23;
jj++;
i++;
}
_12.featureFactory.createFeature(_12,"LINESTRING",_22,_19,_18,_1c,_1a);
}else{
if(_1b.match("POLYGON")){
}else{
if(_1b.match("CURVE")){
}else{
}
}
}
}
}else{
var _1e=_12.model.getFeaturePoint(_17);
if((_1e!=null)&&(_1e[0]!=0)&&(_1e[1]!=0)){
_1e=_13.Forward(_1e);
_1e=_12.containerModel.extent.getPL(_1e);
var _1c=_12.transformEntry(_12,_17);
_12.featureFactory.createFeature(_12,"POINT",_1e,_19,_18,_1c,_1a);
}
}
}
}
};

mapbuilder.loadScript(baseDir+"/widget/WidgetBase.js");
function SearchWidget(_1,_2){
WidgetBaseXSL.apply(this,new Array(_1,_2));
this.host=_1.selectSingleNode("mb:host").firstChild.nodeValue;
this.submitQuery=function(_3){
this.urlInputForm.defaultUrl.value=_3;
var _4=new Object();
_4.url=this.host+"?query="+_3;
_4.method=this.targetModel.method;
var _5=this.urlInputForm.defaultUrl.value;
if(_5.indexOf("?")>0){
this.stylesheet.setParameter("defaultUrl",this.urlInputForm.defaultUrl.value);
}
this.targetModel.newRequest(this.targetModel,_4);
};
this.submitForm=function(){
if(this.aoiFormId==undefined){
var _6=document.getElementsByTagName("form");
var _7=_6.length;
for(var i=_7-1;i>=0;i--){
var _9=new String(_6[i].getAttribute("id"));
if(_9.indexOf("AoiForm_")>=0){
this.aoiFormId=_9;
}
}
}
if(this.aoiFormId==undefined){
alert("Could not find aoiForm for geoSearch");
}
var _a="";
var _b=document.getElementById(this.aoiFormId);
if((_b!=null)&&(_b.westCoord.value!="")){
var _c=parseFloat(_b.westCoord.value);
var _d=parseFloat(_b.northCoord.value);
var _e=parseFloat(_b.eastCoord.value);
var _f=parseFloat(_b.southCoord.value);
_a="&ULLon="+_c.toPrecision(3)+"&ULLat="+_d.toPrecision(3)+"&LRLon="+_e.toPrecision(3)+"&LRLat="+_f.toPrecision(3);
}
var _10=new Object();
var _11=this.urlInputForm.defaultUrl.value;
_10.url=this.host+"?query="+escape(_11)+_a;
_10.method=this.targetModel.method;
this.stylesheet.setParameter("defaultUrl",_11);
this.targetModel.newRequest(this.targetModel,_10);
};
this.handleKeyPress=function(_12){
var _13;
var _14;
if(_12){
_13=_12.which;
_14=_12.currentTarget;
}else{
_13=window.event.keyCode;
_14=window.event.srcElement.form;
}
if(_13==13){
_14.parentWidget.submitForm();
return false;
}
};
this.prePaint=function(_15){
_15.stylesheet.setParameter("modelTitle",_15.targetModel.title);
};
this.postPaint=function(_16){
_16.urlInputForm=document.getElementById(_16.formName);
_16.urlInputForm.parentWidget=_16;
_16.urlInputForm.onkeypress=_16.handleKeyPress;
};
this.formName="urlInputForm_"+mbIds.getId();
this.stylesheet.setParameter("formName",this.formName);
}

mapbuilder.loadScript(baseDir+"/widget/ButtonBase.js");
function Save(_1,_2){
ButtonBase.apply(this,new Array(_1,_2));
this.doSelect=function(_3,_4){
if(_3){
_4.targetModel.saveModel(_4.targetModel);
}
};
this.savedModelPopup=function(_5,_6){
window.open(_6,this.popupWindowName);
};
this.initReset=function(_7){
_7.targetModel.addListener("modelSaved",_7.savedModelPopup,_7);
};
var _8=_1.selectSingleNode("mb:popupWindowName");
if(_8){
this.popupWindowName=_8.firstChild.nodeValue;
this.model.addListener("init",this.initReset,this);
}
}

mapbuilder.loadScript(baseDir+"/widget/WidgetBaseXSL.js");
function CollectionList(_1,_2){
WidgetBaseXSL.apply(this,new Array(_1,_2));
}

mapbuilder.loadScript(baseDir+"/widget/ButtonBase.js");
function EditButtonBase(_1,_2){
ButtonBase.apply(this,new Array(_1,_2));
this.cursor="crosshair";
this.trm=_1.selectSingleNode("mb:transactionResponseModel");
if(this.trm){
this.trm=this.trm.firstChild.nodeValue;
}
this.defaultModelUrl=_1.selectSingleNode("mb:defaultModelUrl").firstChild.nodeValue;
this.featureXpath=_1.selectSingleNode("mb:featureXpath").firstChild.nodeValue;
this.doSelect=function(_3,_4){
if(_4.trm&&!_4.transactionResponseModel){
_4.transactionResponseModel=window.config.objects[_4.trm];
}
if(_4.enabled&&_3&&_4.targetModel.url!=_4.defaultModelUrl){
_4.loadDefaultModel(_4);
}
if(!_3&&_4.transactionResponseModel){
_4.transactionResponseModel.setModel(_4.transactionResponseModel,null);
}
};
this.loadDefaultModel=function(_5){
_5.targetModel.url=_5.defaultModelUrl;
var _6=new Object();
_6.url=_5.defaultModelUrl;
_6.method="get";
_6.postData=null;
_5.targetModel.newRequest(_5.targetModel,_6);
};
this.setMouseListener=function(_7){
if(_7.mouseHandler){
_7.mouseHandler.model.addListener("mouseup",_7.doAction,_7);
}
};
this.initButton=function(_8){
_8.targetModel.addListener("loadModel",_8.setMouseListener,_8);
};
this.model.addListener("init",this.initButton,this);
}

function WktParser(){
this.parse=function(_1){
geomTypeExp=/(\D+)\(([^)]+)\)/;
pointExp=/(-?[0-9]+\.[0-9]+)\s+(-?[0-9]+\.[0-9]+)/;
ringExp=/\(([^)]+)\)/;
if(match=geomTypeExp.exec(_1)){
switch(match[1]){
case "POINT":
if(pt=pointExp.exec(match[2])){
out="<gml:Point><gml:coordinates decimal=\".\" cs=\",\" ts=\" \"><gml:coord>"+pt[1]+","+pt[2]+"</gml:coord></gml:coordinates></gml:Point>";
}
break;
case "LINESTRING":
out="<gml:Linestring><gml:coordinates decimal=\".\" cs=\",\" ts=\" \">";
while(pt=pointExp.exec(match[2])){
out+="<gml:coord>"+pt[1]+","+pt[2]+"</gml:coord>";
match[2]=match[2].replace(pt[0],"");
}
out+="</gml:coordinates></gml:Linestring>";
break;
}
}
return out;
};
}

mapbuilder.loadScript(baseDir+"/widget/WidgetBaseXSL.js");
function FeatureInfo(_1,_2){
WidgetBaseXSL.apply(this,new Array(_1,_2));
this.setAttr=function(_3,_4,_5){
_3.model.setXpathValue(_3.model,_4,_5);
};
}

mapbuilder.loadScript(baseDir+"/widget/WidgetBase.js");
function WidgetBaseWZ(_1,_2){
WidgetBase.apply(this,new Array(_1,_2));
if(!widget.stylesheet){
var _3=_1.selectSingleNode("mb:stylesheet");
if(_3){
widget.stylesheet=new XslProcessor(_3.firstChild.nodeValue,_2.namespace);
}else{
widget.stylesheet=new XslProcessor(baseDir+"/widget/"+_1.nodeName+".xsl",_2.namespace);
}
}
for(var j=0;j<_1.childNodes.length;j++){
if(_1.childNodes[j].firstChild&&_1.childNodes[j].firstChild.nodeValue){
widget.stylesheet.setParameter(_1.childNodes[j].nodeName,_1.childNodes[j].firstChild.nodeValue);
}
}
if(config.widgetText){
var _5="/mb:WidgetText/mb:widgets/mb:"+_1.nodeName;
var _6=config.widgetText.selectNodes(_5+"/*");
for(var j=0;j<_6.length;j++){
widget.stylesheet.setParameter(_6[j].nodeName,_6[j].firstChild.nodeValue);
}
}
widget.stylesheet.setParameter("modelId",widget.model.id);
widget.stylesheet.setParameter("modelTitle",widget.model.title);
widget.stylesheet.setParameter("widgetId",widget.id);
widget.stylesheet.setParameter("skinDir",config.skinDir);
widget.stylesheet.setParameter("lang",config.lang);
this.paint=function(_7){
if(_7.model.doc&&_7.node){
_7.stylesheet.setParameter("modelUrl",_7.model.url);
_7.stylesheet.setParameter("targetModelId",_7.targetModel.id);
_7.resultDoc=_7.model.doc;
_7.prePaint(_7);
if(_7.debug){
alert("prepaint:"+Sarissa.serialize(_7.resultDoc));
}
if(_7.debug){
alert("stylesheet:"+Sarissa.serialize(_7.stylesheet.xslDom));
}
var _8=document.getElementById(_7.outputNodeId);
var _9=document.createElement("DIV");
var s=_7.stylesheet.transformNodeToString(_7.resultDoc);
if(config.serializeUrl&&_7.debug){
postLoad(config.serializeUrl,s);
}
if(_7.debug){
alert("painting:"+_7.id+":"+s);
}
_9.innerHTML=s;
_9.firstChild.setAttribute("id",_7.outputNodeId);
if(_8){
_7.node.replaceChild(_9.firstChild,_8);
}else{
_7.node.appendChild(_9.firstChild);
}
_7.postPaint(_7);
}
};
this.clearWidget=function(_b){
var _c=document.getElementById(_b.outputNodeId);
if(_c){
_b.node.removeChild(_c);
}
};
widget.model.addListener("refresh",widget.paint,widget);
widget.model.addListener("newModel",widget.clearWidget,widget);
}

mapbuilder.loadScript(baseDir+"/widget/WidgetBaseXSL.js");
function Locations(_1,_2){
WidgetBaseXSL.apply(this,new Array(_1,_2));
this.model.getSRS=function(){
return "EPSG:4326";
};
this.setAoi=function(_3,_4){
var _5=new Array();
_5=_3.split(",");
var ul=new Array(parseFloat(_5[0]),parseFloat(_5[3]));
var lr=new Array(parseFloat(_5[2]),parseFloat(_5[1]));
this.model.setParam("aoi",new Array(ul,lr));
this.targetModel.extent.zoomToBox(ul,lr);
};
}

mapbuilder.loadScript(baseDir+"/model/Proj.js");
mapbuilder.loadScript(baseDir+"/widget/MapContainerBase.js");
function GmlRendererSVG(_1,_2){
var _3=new MapContainerBase(this,_1,_2);
this.paintMethod="xsl2html";
this.coordXsl=new XslProcessor(baseDir+"/widget/GmlCooordinates2Coord.xsl");
this.prePaint=function(_4){
_4.model.setParam("modelStatus","preparing coordinates");
_4.stylesheet.setParameter("width",_4.containerModel.getWindowWidth());
_4.stylesheet.setParameter("height",_4.containerModel.getWindowHeight());
bBox=_4.containerModel.getBoundingBox();
_4.stylesheet.setParameter("bBoxMinX",bBox[0]);
_4.stylesheet.setParameter("bBoxMinY",bBox[1]);
_4.stylesheet.setParameter("bBoxMaxX",bBox[2]);
_4.stylesheet.setParameter("bBoxMaxY",bBox[3]);
_4.stylesheet.setParameter("color","#FF0000");
_4.resultDoc=_4.coordXsl.transformNodeToObject(_4.resultDoc);
};
this.hiddenListener=function(_5,_6){
var _7="visible";
if(_5.model.getHidden(_6)){
_7="hidden";
}
var _8=document.getElementById(_5.outputNodeId);
for(var i=0;i<_8.childNodes.length;++i){
_8.childNodes[i].style.visibility=_7;
}
};
this.model.addListener("hidden",this.hiddenListener,this);
}

mapbuilder.loadScript(baseDir+"/widget/WidgetBaseXSL.js");
function TabbedContent(_1,_2){
WidgetBaseXSL.apply(this,new Array(_1,_2));
this.selectedTab=null;
this.tabList=new Array();
this.textNodeXpath="/mb:WidgetText/mb:widgets/mb:TabbedContent";
this.initTabs=function(_3){
var _4=_3.widgetNode.selectNodes("mb:tab");
for(var i=0;i<_4.length;++i){
var _6=_4[i];
var _7=_6.firstChild.nodeValue;
var _8=config.objects[_7];
if(!_8){
alert("tab widget not found:"+_7);
return;
}
_3.tabList.push(_8);
var _9=_6.getAttribute("label");
if(!_9){
_9=_7;
}
var _a=config.widgetText.selectSingleNode(_3.textNodeXpath+"/mb:"+_7);
if(_a){
_9=_a.firstChild.nodeValue;
}
_6.setAttribute("label",_9);
_8.model.addListener("refresh",_3.paint,_3);
_8.model.addListener("refresh",_3.selectTab,_8);
}
};
this.model.addListener("init",this.initTabs,this);
this.addWidget=function(_b,_c){
this.tabList.push(_b);
if(!_c){
_c=_b.id;
}
var _d=config.widgetText.selectSingleNode(this.textNodeXpath+"/mb:"+_b.id);
if(_d){
_c=_d.firstChild.nodeValue;
}
var _e=this.model.doc.createElementNS(mbNS,"tab");
_e.appendChild(this.model.doc.createTextNode(_b.id));
_e.setAttribute("label",_c);
this.widgetNode.appendChild(_e);
this.paint(this);
this.selectTab(_b);
};
this.selectTab=function(_f){
if(!_f.model.doc){
alert("no data to show yet");
return;
}
var _10=config.objects[_f.tabBarId];
if(_10.selectedTab!=null){
_10.selectedTab.className="";
}
var _11=document.getElementById(_10.id+"_"+_f.id);
if(_11){
_11.className="current";
_10.selectedTab=_11;
_f.paint(_f,_f.id);
}
if(_f.tabAction){
eval(_f.tabAction);
}
};
this.prePaint=function(_12){
_12.resultDoc=_12.widgetNode;
for(var i=0;i<_12.tabList.length;++i){
var _14=_12.tabList[i];
_14.tabBarId=this.id;
var _15=_12.resultDoc.selectSingleNode("mb:tab[text()='"+_14.id+"']");
if(!_14.model.doc){
_15.setAttribute("disabled","true");
}else{
_15.removeAttribute("disabled");
}
var _16=_14.widgetNode.selectSingleNode("mb:tabAction");
if(_16){
_14.tabAction=_16.firstChild.nodeValue;
}
}
};
}

mapbuilder.loadScript(baseDir+"/widget/WidgetBaseXSL.js");
mapbuilder.loadScript(baseDir+"/util/dojo/src/uuid/TimeBasedGenerator.js");
function WebServiceForm(_1,_2){
WidgetBaseXSL.apply(this,new Array(_1,_2));
this.formElements=new Object();
var _3=_1.selectSingleNode("mb:requestStylesheet");
if(_3){
this.requestStylesheet=new XslProcessor(_3.firstChild.nodeValue,_2.namespace);
}
var _4=_1.selectSingleNode("mb:webServiceUrl");
if(_4){
this.webServiceUrl=_4.firstChild.nodeValue;
}
this.submitForm=function(){
this.webServiceForm=document.getElementById(this.formName);
if(this.webServiceForm==null){
this.webServiceForm=document.getElementById("webServiceForm_form");
}
if(this.webServiceForm==null){
return;
}
var _5=new Object();
_5.method=this.targetModel.method;
_5.url=this.webServiceUrl;
if(_5.method.toLowerCase()=="get"){
_5.url=this.webServiceForm.action+"?";
for(var i=0;i<this.webServiceForm.elements.length;++i){
var _7=this.webServiceForm.elements[i];
_4+=_7.name+"="+_7.value+"&";
this.formElements[_7.name]=_7.value;
}
if(this.debug){
alert(_5.url);
}
this.targetModel.newRequest(this.targetModel,_5);
}else{
for(var i=0;i<this.webServiceForm.elements.length;++i){
var _7=this.webServiceForm.elements[i];
this.formElements[_7.name]=_7.value;
}
this.requestStylesheet.setParameter("resourceName",this.formElements["feature"]);
this.requestStylesheet.setParameter("fromDateField",this.formElements["fromDateField"]);
this.requestStylesheet.setParameter("toDateField",this.formElements["toDateField"]);
var _8=this.requestStylesheet.transformNodeToObject(this.model.doc);
if(this.debug){
alert("Transformed: "+Sarissa.serialize(_8));
}
this.namespace="xmlns:wmc='http://www.opengis.net/context' xmlns:ows='http://www.opengis.net/ows' xmlns:ogc='http://www.opengis.net/ogc' xmlns:xsl='http://www.w3.org/1999/XSL/Transform' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:gml='http://www.opengis.net/gml' xmlns:wfs='http://www.opengis.net/wfs'";
Sarissa.setXpathNamespaces(_8,this.namespace);
var _9=_8.selectSingleNode("//wfs:GetFeature");
_5.postData=Sarissa.serialize(_9);
if(this.debug){
alert("httpPayload.postData:"+_5.postData);
}
this.targetModel.wfsFeature=_8.childNodes[0];
if(this.debug){
alert("wfsFeature = "+Sarissa.serialize(this.targetModel.wfsFeature));
}
this.targetModel.newRequest(this.targetModel,_5);
}
};
this.handleKeyPress=function(_a){
var _b;
var _c;
if(_a){
_b=_a.which;
_c=_a.currentTarget;
}else{
_b=window.event.keyCode;
_c=window.event.srcElement.form;
}
if(_b==13){
_c.parentWidget.submitForm();
return false;
}
};
this.postPaint=function(_d){
_d.webServiceForm=document.getElementById(_d.formName);
if(this.webServiceForm==null){
this.webServiceForm=document.getElementById("webServiceForm_form");
}
_d.webServiceForm.parentWidget=_d;
_d.webServiceForm.onkeypress=_d.handleKeyPress;
};
this.formName="WebServiceForm_"+mbIds.getId();
this.stylesheet.setParameter("formName",this.formName);
this.prePaint=function(_e){
for(var _f in _e.formElements){
_e.stylesheet.setParameter(_f,_e.formElements[_f]);
}
};
this.setAoiParameters=function(_10,_11){
if(_10.targetModel.containerModel){
var _12=null;
var _13=_10.model.getSRS();
_10.requestStylesheet.setParameter("bBoxMinX",_11[0][0]);
_10.requestStylesheet.setParameter("bBoxMinY",_11[1][1]);
_10.requestStylesheet.setParameter("bBoxMaxX",_11[1][0]);
_10.requestStylesheet.setParameter("bBoxMaxY",_11[0][1]);
_10.requestStylesheet.setParameter("srs",_13);
_10.requestStylesheet.setParameter("width",_10.targetModel.containerModel.getWindowWidth());
_10.requestStylesheet.setParameter("height",_10.targetModel.containerModel.getWindowHeight());
}
};
this.init=function(_14){
if(_14.targetModel.containerModel){
_14.targetModel.containerModel.addListener("aoi",_14.setAoiParameters,_14);
}
};
this.model.addListener("init",this.init,this);
}

mapbuilder.loadScript(baseDir+"/widget/ButtonBase.js");
function Forward(_1,_2){
ButtonBase.apply(this,new Array(_1,_2));
this.doSelect=function(_3,_4){
if(_3){
this.targetModel.setParam("historyForward");
var _5=_4.targetModel.nextExtent;
if(_5){
this.targetModel.setParam("historyStop");
_4.targetModel.extent.zoomToBox(_5[0],_5[1]);
this.targetModel.setParam("historyStart");
}
}
};
}

mapbuilder.loadScript(baseDir+"/widget/WidgetBaseXSL.js");
function LayerControl(_1,_2){
WidgetBaseXSL.apply(this,new Array(_1,_2));
this.prePaint=function(_3){
if(_3.model.featureName){
_3.stylesheet.setParameter("featureName",_3.model.featureName);
_3.stylesheet.setParameter("hidden",_3.model.getHidden(_3.model.featureName).toString());
}
};
this.highlightLayer=function(_4){
var _5=this.model.id+"_"+"mainMapWidget"+"_"+_4;
var _6=document.getElementById("previewImage");
var _7=document.getElementById(_5);
if(_6){
_6.src=_7.firstChild.src;
}
};
this.refresh=function(_8,_9){
_8.paint(_8,_8.id);
};
this.showLayerMetadata=function(_a){
var _b=config.objects.layerMetadata;
if(_b){
_b.stylesheet.setParameter("featureName",_a);
_b.node=document.getElementById(_b.htmlTagId);
_b.paint(_b);
}
};
this.model.addListener("deleteLayer",this.refresh,this);
this.model.addListener("moveLayerUp",this.refresh,this);
this.model.addListener("moveLayerDown",this.refresh,this);
if(this.autoRefresh){
this.model.addListener("addLayer",this.refresh,this);
}
}

var MB_IS_MOZ=(document.implementation&&document.implementation.createDocument)?true:false;
function XslProcessor(_1,_2){
this.xslUrl=_1;
this.xslDom=Sarissa.getDomDocument();
this.xslDom.async=false;
this.xslDom.validateOnParse=false;
this.xslDom.load(_1);
if(this.xslDom.parseError<0){
alert("error loading XSL stylesheet: "+_1);
}
this.processor=new XSLTProcessor();
this.processor.importStylesheet(this.xslDom);
this.docNSUri=_2;
this.transformNodeToString=function(_3){
try{
var _4=this.transformNodeToObject(_3);
var s=Sarissa.serialize(_4);
return Sarissa.unescape(s);
}
catch(e){
alert("Exception transforming doc with XSL: "+this.xslUrl);
alert("XSL="+Sarissa.serialize(this.xslDom));
alert("XML="+Sarissa.serialize(_3));
}
};
this.transformNodeToObject=function(_6){
var _7=this.processor.transformToDocument(_6);
return _7;
};
this.setParameter=function(_8,_9,_a){
if(!_9){
return;
}
this.processor.setParameter(null,_8,_9);
};
}
function postLoad(_b,_c,_d){
var _e=new XMLHttpRequest();
if(_b.indexOf("http://")==0){
_e.open("POST",config.proxyUrl,false);
_e.setRequestHeader("serverUrl",_b);
}else{
_e.open("POST",_b,false);
}
_e.setRequestHeader("content-type","text/xml");
if(_d){
_e.setRequestHeader("content-type",_d);
}
_e.send(_c);
if(_e.status>=400){
alert("error loading document: "+_b+" - "+_e.statusText+"-"+_e.responseText);
var _f=Sarissa.getDomDocument();
_f.parseError=-1;
return _f;
}else{
if(null==_e.responseXML){
alert("null XML response:"+_e.responseText);
}
return _e.responseXML;
}
}
function postGetLoad(_10,_11,_12,dir,_14){
var _15=new XMLHttpRequest();
if(_10.indexOf("http://")==0){
_15.open("POST",config.proxyUrl,false);
_15.setRequestHeader("serverUrl",_10);
}else{
_10=_10+"?dir="+dir+"&fileName="+_14;
_15.open("POST",_10,false);
}
_15.setRequestHeader("content-type","text/xml");
if(_12){
_15.setRequestHeader("content-type",_12);
}
_15.send(_11);
if(_15.status>=400){
alert("error loading document: "+_10+" - "+_15.statusText+"-"+_15.responseText);
var _16=Sarissa.getDomDocument();
_16.parseError=-1;
return _16;
}else{
if(null==_15.responseXML){
alert("null XML response:"+_15.responseText);
}
alert(_15.responseText);
return _15.responseXML;
}
}
function getProxyPlusUrl(url){
if(url.indexOf("http://")==0){
if(config.proxyUrl){
url=config.proxyUrl+"?url="+escape(url).replace(/\+/g,"%2C").replace(/\"/g,"%22").replace(/\'/g,"%27");
}else{
alert("unable to load external document:"+url+"  Set the proxyUrl property in config.");
url=null;
}
}
return url;
}
function createElementWithNS(doc,_19,_1a){
if(_SARISSA_IS_IE){
var _1b=doc.createElement(_19);
return _1b;
}else{
return doc.createElementNS(_1a,_19);
}
}
function UniqueId(){
this.lastId=0;
this.getId=function(){
this.lastId++;
return this.lastId;
};
}
var mbIds=new UniqueId();
function setISODate(_1c){
var _1d=_1c.match(/(\d{4})-?(\d{2})?-?(\d{2})?T?(\d{2})?:?(\d{2})?:?(\d{2})?\.?(\d{0,3})?(Z)?/);
var res=null;
for(var i=1;i<_1d.length;++i){
if(!_1d[i]){
_1d[i]=(i==3)?1:0;
if(!res){
res=i;
}
}
}
var _20=new Date();
_20.setFullYear(parseInt(_1d[1],10));
_20.setMonth(parseInt(_1d[2],10)-1,parseInt(_1d[3],10));
_20.setDate(parseInt(_1d[3],10));
_20.setHours(parseInt(_1d[4],10));
_20.setMinutes(parseInt(_1d[5],10));
_20.setSeconds(parseFloat(_1d[6],10));
if(!res){
res=6;
}
_20.res=res;
return _20;
}
function getISODate(_21){
var res=_21.res?_21.res:6;
var _23="";
_23+=res>=1?_21.getFullYear():"";
_23+=res>=2?"-"+leadingZeros(_21.getMonth()+1,2):"";
_23+=res>=3?"-"+leadingZeros(_21.getDate(),2):"";
_23+=res>=4?"T"+leadingZeros(_21.getHours(),2):"";
_23+=res>=5?":"+leadingZeros(_21.getMinutes(),2):"";
_23+=res>=6?":"+leadingZeros(_21.getSeconds(),2):"";
return _23;
}
function leadingZeros(num,_25){
var _26=parseInt(num,10);
var _27=Math.pow(10,_25);
if(_26<_27){
_26+=_27;
}
return _26.toString().substr(1);
}
function fixPNG(_28,_29){
if(_SARISSA_IS_IE){
var _2a="id='"+_29+"' ";
var _2b=(_28.className)?"class='"+_28.className+"' ":"";
var _2c=(_28.title)?"title='"+_28.title+"' ":"title='"+_28.alt+"' ";
var _2d="display:inline-block;"+_28.style.cssText;
var _2e="<span "+_2a+_2b+_2c;
_2e+=" style=\""+"width:"+_28.width+"px; height:"+_28.height+"px;"+_2d+";";
var src=_28.src;
src=src.replace(/\(/g,"%28");
src=src.replace(/\)/g,"%29");
src=src.replace(/'/g,"%27");
src=src.replace(/%23/g,"%2523");
_2e+="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader";
_2e+="(src='"+src+"', sizingMethod='scale'); \"></span>";
return _2e;
}
}
function getAbsX(elt){
return (elt.x)?elt.x:getAbsPos(elt,"Left")+2;
}
function getAbsY(elt){
return (elt.y)?elt.y:getAbsPos(elt,"Top")+2;
}
function getAbsPos(elt,_33){
iPos=0;
while(elt!=null){
iPos+=elt["offset"+_33];
elt=elt.offsetParent;
}
return iPos;
}
function getPageX(e){
var _35=0;
if(!e){
var e=window.event;
}
if(e.pageX){
_35=e.pageX;
}else{
if(e.clientX){
_35=e.clientX;
}
}
if(document.body&&document.body.scrollLeft){
_35+=document.body.scrollLeft;
}else{
if(document.documentElement&&document.documentElement.scrollLeft){
_35+=document.documentElement.scrollLeft;
}
}
return _35;
}
function getPageY(e){
var _37=0;
if(!e){
var e=window.event;
}
if(e.pageY){
_37=e.pageY;
}else{
if(e.clientY){
_37=e.clientY;
}
}
if(document.body&&document.body.scrollTop){
_37+=document.body.scrollTop;
}else{
if(document.documentElement&&document.documentElement.scrollTop){
_37+=document.documentElement.scrollTop;
}
}
return _37;
}
function getArgs(){
var _38=new Object();
var _39=location.search.substring(1);
var _3a=_39.split("&");
for(var i=0;i<_3a.length;i++){
var pos=_3a[i].indexOf("=");
if(pos==-1){
continue;
}
var _3d=_3a[i].substring(0,pos);
var _3e=_3a[i].substring(pos+1);
_38[_3d]=unescape(_3e.replace(/\+/g," "));
}
return _38;
}
window.cgiArgs=getArgs();
function getScreenX(_3f,_40){
bbox=_3f.getBoundingBox();
width=_3f.getWindowWidth();
bbox[0]=parseFloat(bbox[0]);
bbox[2]=parseFloat(bbox[2]);
var _41=(width/(bbox[2]-bbox[0]));
x=_41*(_40-bbox[0]);
return x;
}
function getScreenY(_42,_43){
var _44=_42.getBoundingBox();
var _45=_42.getWindowHeight();
_44[1]=parseFloat(_44[1]);
_44[3]=parseFloat(_44[3]);
var _46=(heighteight/(_44[3]-_44[1]));
var y=_45-(_46*(pt.y-_44[1]));
return y;
}
function getGeoCoordX(_48,_49){
var _4a=_48.getBoundingBox();
var _4b=_48.getWindowWidth();
_4a[0]=parseFloat(_4a[0]);
_4a[2]=parseFloat(_4a[2]);
var _4c=((_4a[2]-_4a[0])/_4b);
var x=_4a[0]+_4c*(xCoord);
return x;
}
function getGeoCoordY(_4e){
var _4f=context.getBoundingBox();
var _50=context.getWindowHeight();
_4f[1]=parseFloat(_4f[1]);
_4f[3]=parseFloat(_4f[3]);
var _51=((_4f[3]-_4f[1])/_50);
var y=_4f[1]+_51*(_50-_4e);
return y;
}
function makeElt(_53){
var _54=document.createElement(_53);
document.getElementsByTagName("body").item(0).appendChild(_54);
return _54;
}
var newWindow="";
function openPopup(url,_56,_57){
if(_56==null){
_56=300;
}
if(_57==null){
_57=200;
}
if(!newWindow.closed&&newWindow.location){
newWindow.location.href=url;
}else{
newWindow=window.open(url,"name","height="+_57+",width="+_56);
if(!newWindow.opener){
newwindow.opener=self;
}
}
if(window.focus){
newWindow.focus();
}
return false;
}
function debug(_58){
tarea=makeElt("textarea");
tarea.setAttribute("rows","3");
tarea.setAttribute("cols","40");
tnode=document.createTextNode(_58);
tarea.appendChild(tnode);
}
function returnTarget(evt){
evt=(evt)?evt:((window.event)?window.event:"");
var elt=null;
if(evt.target){
elt=evt.target;
}else{
if(evt.srcElement){
elt=evt.srcElement;
}
}
return elt;
}
function addEvent(_5b,_5c,_5d){
if(document.addEventListener){
_5b.addEventListener(_5c,_5d,false);
}else{
if(document.attachEvent){
_5b.attachEvent("on"+_5c,_5d);
}
}
}
function handleEventWithObject(evt){
var elt=returnTarget(evt);
var obj=elt.ownerObj;
if(obj!=null){
obj.handleEvent(evt);
}
}

var jg_ihtm,jg_ie,jg_fast,jg_dom,jg_moz,jg_n4=(document.layers&&typeof document.classes!="undefined");
function chkDHTM(x,i){
x=document.body||null;
jg_ie=x&&typeof x.insertAdjacentHTML!="undefined";
jg_dom=(x&&!jg_ie&&typeof x.appendChild!="undefined"&&typeof document.createRange!="undefined"&&typeof (i=document.createRange()).setStartBefore!="undefined"&&typeof i.createContextualFragment!="undefined");
jg_ihtm=!jg_ie&&!jg_dom&&x&&typeof x.innerHTML!="undefined";
jg_fast=jg_ie&&document.all&&!window.opera;
jg_moz=jg_dom&&typeof x.style.MozOpacity!="undefined";
}
function pntDoc(){
this.wnd.document.write(jg_fast?this.htmRpc():this.htm);
this.htm="";
}
function pntCnvDom(){
var x=document.createRange();
x.setStartBefore(this.cnv);
x=x.createContextualFragment(jg_fast?this.htmRpc():this.htm);
this.cnv.appendChild(x);
this.htm="";
}
function pntCnvIe(){
this.cnv.insertAdjacentHTML("beforeEnd",jg_fast?this.htmRpc():this.htm);
this.htm="";
}
function pntCnvIhtm(){
this.cnv.innerHTML+=this.htm;
this.htm="";
}
function pntCnv(){
this.htm="";
}
function mkDiv(x,y,w,h){
this.htm+="<div style=\"position:absolute;"+"left:"+x+"px;"+"top:"+y+"px;"+"width:"+w+"px;"+"height:"+h+"px;"+"clip:rect(0,"+w+"px,"+h+"px,0);"+"background-color:"+this.color+(!jg_moz?";overflow:hidden":"")+";\"></div>";
}
function mkDivIe(x,y,w,h){
this.htm+="%%"+this.color+";"+x+";"+y+";"+w+";"+h+";";
}
function mkDivPrt(x,y,w,h){
this.htm+="<div style=\"position:absolute;"+"border-left:"+w+"px solid "+this.color+";"+"left:"+x+"px;"+"top:"+y+"px;"+"width:0px;"+"height:"+h+"px;"+"clip:rect(0,"+w+"px,"+h+"px,0);"+"background-color:"+this.color+(!jg_moz?";overflow:hidden":"")+";\"></div>";
}
function mkLyr(x,y,w,h){
this.htm+="<layer "+"left=\""+x+"\" "+"top=\""+y+"\" "+"width=\""+w+"\" "+"height=\""+h+"\" "+"bgcolor=\""+this.color+"\"></layer>\n";
}
var regex=/%%([^;]+);([^;]+);([^;]+);([^;]+);([^;]+);/g;
function htmRpc(){
return this.htm.replace(regex,"<div style=\"overflow:hidden;position:absolute;background-color:"+"$1;left:$2;top:$3;width:$4;height:$5\"></div>\n");
}
function htmPrtRpc(){
return this.htm.replace(regex,"<div style=\"overflow:hidden;position:absolute;background-color:"+"$1;left:$2;top:$3;width:$4;height:$5;border-left:$4px solid $1\"></div>\n");
}
function mkLin(x1,y1,x2,y2){
if(x1>x2){
var _x2=x2;
var _y2=y2;
x2=x1;
y2=y1;
x1=_x2;
y1=_y2;
}
var dx=x2-x1,dy=Math.abs(y2-y1),x=x1,y=y1,yIncr=(y1>y2)?-1:1;
if(dx>=dy){
var pr=dy<<1,pru=pr-(dx<<1),p=pr-dx,ox=x;
while((dx--)>0){
++x;
if(p>0){
this.mkDiv(ox,y,x-ox,1);
y+=yIncr;
p+=pru;
ox=x;
}else{
p+=pr;
}
}
this.mkDiv(ox,y,x2-ox+1,1);
}else{
var pr=dx<<1,pru=pr-(dy<<1),p=pr-dy,oy=y;
if(y2<=y1){
while((dy--)>0){
if(p>0){
this.mkDiv(x++,y,1,oy-y+1);
y+=yIncr;
p+=pru;
oy=y;
}else{
y+=yIncr;
p+=pr;
}
}
this.mkDiv(x2,y2,1,oy-y2+1);
}else{
while((dy--)>0){
y+=yIncr;
if(p>0){
this.mkDiv(x++,oy,1,y-oy);
p+=pru;
oy=y;
}else{
p+=pr;
}
}
this.mkDiv(x2,oy,1,y2-oy+1);
}
}
}
function mkLin2D(x1,y1,x2,y2){
if(x1>x2){
var _x2=x2;
var _y2=y2;
x2=x1;
y2=y1;
x1=_x2;
y1=_y2;
}
var dx=x2-x1,dy=Math.abs(y2-y1),x=x1,y=y1,yIncr=(y1>y2)?-1:1;
var s=this.stroke;
if(dx>=dy){
if(s-3>0){
var _s=(s*dx*Math.sqrt(1+dy*dy/(dx*dx))-dx-(s>>1)*dy)/dx;
_s=(!(s-4)?Math.ceil(_s):Math.round(_s))+1;
}else{
var _s=s;
}
var ad=Math.ceil(s/2);
var pr=dy<<1,pru=pr-(dx<<1),p=pr-dx,ox=x;
while((dx--)>0){
++x;
if(p>0){
this.mkDiv(ox,y,x-ox+ad,_s);
y+=yIncr;
p+=pru;
ox=x;
}else{
p+=pr;
}
}
this.mkDiv(ox,y,x2-ox+ad+1,_s);
}else{
if(s-3>0){
var _s=(s*dy*Math.sqrt(1+dx*dx/(dy*dy))-(s>>1)*dx-dy)/dy;
_s=(!(s-4)?Math.ceil(_s):Math.round(_s))+1;
}else{
var _s=s;
}
var ad=Math.round(s/2);
var pr=dx<<1,pru=pr-(dy<<1),p=pr-dy,oy=y;
if(y2<=y1){
++ad;
while((dy--)>0){
if(p>0){
this.mkDiv(x++,y,_s,oy-y+ad);
y+=yIncr;
p+=pru;
oy=y;
}else{
y+=yIncr;
p+=pr;
}
}
this.mkDiv(x2,y2,_s,oy-y2+ad);
}else{
while((dy--)>0){
y+=yIncr;
if(p>0){
this.mkDiv(x++,oy,_s,y-oy+ad);
p+=pru;
oy=y;
}else{
p+=pr;
}
}
this.mkDiv(x2,oy,_s,y2-oy+ad+1);
}
}
}
function mkLinDott(x1,y1,x2,y2){
if(x1>x2){
var _x2=x2;
var _y2=y2;
x2=x1;
y2=y1;
x1=_x2;
y1=_y2;
}
var dx=x2-x1,dy=Math.abs(y2-y1),x=x1,y=y1,yIncr=(y1>y2)?-1:1,drw=true;
if(dx>=dy){
var pr=dy<<1,pru=pr-(dx<<1),p=pr-dx;
while((dx--)>0){
if(drw){
this.mkDiv(x,y,1,1);
}
drw=!drw;
if(p>0){
y+=yIncr;
p+=pru;
}else{
p+=pr;
}
++x;
}
if(drw){
this.mkDiv(x,y,1,1);
}
}else{
var pr=dx<<1,pru=pr-(dy<<1),p=pr-dy;
while((dy--)>0){
if(drw){
this.mkDiv(x,y,1,1);
}
drw=!drw;
y+=yIncr;
if(p>0){
++x;
p+=pru;
}else{
p+=pr;
}
}
if(drw){
this.mkDiv(x,y,1,1);
}
}
}
function mkOv(_2f,top,_31,_32){
var a=_31>>1,b=_32>>1,wod=_31&1,hod=(_32&1)+1,cx=_2f+a,cy=top+b,x=0,y=b,ox=0,oy=b,aa=(a*a)<<1,bb=(b*b)<<1,st=(aa>>1)*(1-(b<<1))+bb,tt=(bb>>1)-aa*((b<<1)-1),w,h;
while(y>0){
if(st<0){
st+=bb*((x<<1)+3);
tt+=(bb<<1)*(++x);
}else{
if(tt<0){
st+=bb*((x<<1)+3)-(aa<<1)*(y-1);
tt+=(bb<<1)*(++x)-aa*(((y--)<<1)-3);
w=x-ox;
h=oy-y;
if(w&2&&h&2){
this.mkOvQds(cx,cy,-x+2,ox+wod,-oy,oy-1+hod,1,1);
this.mkOvQds(cx,cy,-x+1,x-1+wod,-y-1,y+hod,1,1);
}else{
this.mkOvQds(cx,cy,-x+1,ox+wod,-oy,oy-h+hod,w,h);
}
ox=x;
oy=y;
}else{
tt-=aa*((y<<1)-3);
st-=(aa<<1)*(--y);
}
}
}
this.mkDiv(cx-a,cy-oy,a-ox+1,(oy<<1)+hod);
this.mkDiv(cx+ox+wod,cy-oy,a-ox+1,(oy<<1)+hod);
}
function mkOv2D(_34,top,_36,_37){
var s=this.stroke;
_36+=s-1;
_37+=s-1;
var a=_36>>1,b=_37>>1,wod=_36&1,hod=(_37&1)+1,cx=_34+a,cy=top+b,x=0,y=b,aa=(a*a)<<1,bb=(b*b)<<1,st=(aa>>1)*(1-(b<<1))+bb,tt=(bb>>1)-aa*((b<<1)-1);
if(s-4<0&&(!(s-2)||_36-51>0&&_37-51>0)){
var ox=0,oy=b,w,h,pxl,pxr,pxt,pxb,pxw;
while(y>0){
if(st<0){
st+=bb*((x<<1)+3);
tt+=(bb<<1)*(++x);
}else{
if(tt<0){
st+=bb*((x<<1)+3)-(aa<<1)*(y-1);
tt+=(bb<<1)*(++x)-aa*(((y--)<<1)-3);
w=x-ox;
h=oy-y;
if(w-1){
pxw=w+1+(s&1);
h=s;
}else{
if(h-1){
pxw=s;
h+=1+(s&1);
}else{
pxw=h=s;
}
}
this.mkOvQds(cx,cy,-x+1,ox-pxw+w+wod,-oy,-h+oy+hod,pxw,h);
ox=x;
oy=y;
}else{
tt-=aa*((y<<1)-3);
st-=(aa<<1)*(--y);
}
}
}
this.mkDiv(cx-a,cy-oy,s,(oy<<1)+hod);
this.mkDiv(cx+a+wod-s+1,cy-oy,s,(oy<<1)+hod);
}else{
var _a=(_36-((s-1)<<1))>>1,_b=(_37-((s-1)<<1))>>1,_x=0,_y=_b,_aa=(_a*_a)<<1,_bb=(_b*_b)<<1,_st=(_aa>>1)*(1-(_b<<1))+_bb,_tt=(_bb>>1)-_aa*((_b<<1)-1),pxl=new Array(),pxt=new Array(),_pxb=new Array();
pxl[0]=0;
pxt[0]=b;
_pxb[0]=_b-1;
while(y>0){
if(st<0){
st+=bb*((x<<1)+3);
tt+=(bb<<1)*(++x);
pxl[pxl.length]=x;
pxt[pxt.length]=y;
}else{
if(tt<0){
st+=bb*((x<<1)+3)-(aa<<1)*(y-1);
tt+=(bb<<1)*(++x)-aa*(((y--)<<1)-3);
pxl[pxl.length]=x;
pxt[pxt.length]=y;
}else{
tt-=aa*((y<<1)-3);
st-=(aa<<1)*(--y);
}
}
if(_y>0){
if(_st<0){
_st+=_bb*((_x<<1)+3);
_tt+=(_bb<<1)*(++_x);
_pxb[_pxb.length]=_y-1;
}else{
if(_tt<0){
_st+=_bb*((_x<<1)+3)-(_aa<<1)*(_y-1);
_tt+=(_bb<<1)*(++_x)-_aa*(((_y--)<<1)-3);
_pxb[_pxb.length]=_y-1;
}else{
_tt-=_aa*((_y<<1)-3);
_st-=(_aa<<1)*(--_y);
_pxb[_pxb.length-1]--;
}
}
}
}
var ox=0,oy=b,_oy=_pxb[0],l=pxl.length,w,h;
for(var i=0;i<l;i++){
if(typeof _pxb[i]!="undefined"){
if(_pxb[i]<_oy||pxt[i]<oy){
x=pxl[i];
this.mkOvQds(cx,cy,-x+1,ox+wod,-oy,_oy+hod,x-ox,oy-_oy);
ox=x;
oy=pxt[i];
_oy=_pxb[i];
}
}else{
x=pxl[i];
this.mkDiv(cx-x+1,cy-oy,1,(oy<<1)+hod);
this.mkDiv(cx+ox+wod,cy-oy,1,(oy<<1)+hod);
ox=x;
oy=pxt[i];
}
}
this.mkDiv(cx-a,cy-oy,1,(oy<<1)+hod);
this.mkDiv(cx+ox+wod,cy-oy,1,(oy<<1)+hod);
}
}
function mkOvDott(_3d,top,_3f,_40){
var a=_3f>>1,b=_40>>1,wod=_3f&1,hod=_40&1,cx=_3d+a,cy=top+b,x=0,y=b,aa2=(a*a)<<1,aa4=aa2<<1,bb=(b*b)<<1,st=(aa2>>1)*(1-(b<<1))+bb,tt=(bb>>1)-aa2*((b<<1)-1),drw=true;
while(y>0){
if(st<0){
st+=bb*((x<<1)+3);
tt+=(bb<<1)*(++x);
}else{
if(tt<0){
st+=bb*((x<<1)+3)-aa4*(y-1);
tt+=(bb<<1)*(++x)-aa2*(((y--)<<1)-3);
}else{
tt-=aa2*((y<<1)-3);
st-=aa4*(--y);
}
}
if(drw){
this.mkOvQds(cx,cy,-x,x+wod,-y,y+hod,1,1);
}
drw=!drw;
}
}
function mkRect(x,y,w,h){
var s=this.stroke;
this.mkDiv(x,y,w,s);
this.mkDiv(x+w,y,s,h);
this.mkDiv(x,y+h,w+s,s);
this.mkDiv(x,y+s,s,h-s);
}
function mkRectDott(x,y,w,h){
this.drawLine(x,y,x+w,y);
this.drawLine(x+w,y,x+w,y+h);
this.drawLine(x,y+h,x+w,y+h);
this.drawLine(x,y,x,y+h);
}
function jsgFont(){
this.PLAIN="font-weight:normal;";
this.BOLD="font-weight:bold;";
this.ITALIC="font-style:italic;";
this.ITALIC_BOLD=this.ITALIC+this.BOLD;
this.BOLD_ITALIC=this.ITALIC_BOLD;
}
var Font=new jsgFont();
function jsgStroke(){
this.DOTTED=-1;
}
var Stroke=new jsgStroke();
function jsGraphics(id,wnd){
this.setColor=new Function("arg","this.color = arg.toLowerCase();");
this.setStroke=function(x){
this.stroke=x;
if(!(x+1)){
this.drawLine=mkLinDott;
this.mkOv=mkOvDott;
this.drawRect=mkRectDott;
}else{
if(x-1>0){
this.drawLine=mkLin2D;
this.mkOv=mkOv2D;
this.drawRect=mkRect;
}else{
this.drawLine=mkLin;
this.mkOv=mkOv;
this.drawRect=mkRect;
}
}
};
this.setPrintable=function(arg){
this.printable=arg;
if(jg_fast){
this.mkDiv=mkDivIe;
this.htmRpc=arg?htmPrtRpc:htmRpc;
}else{
this.mkDiv=jg_n4?mkLyr:arg?mkDivPrt:mkDiv;
}
};
this.setFont=function(fam,sz,sty){
this.ftFam=fam;
this.ftSz=sz;
this.ftSty=sty||Font.PLAIN;
};
this.drawPolyline=this.drawPolyLine=function(x,y,s){
for(var i=0;i<x.length-1;i++){
this.drawLine(x[i],y[i],x[i+1],y[i+1]);
}
};
this.fillRect=function(x,y,w,h){
this.mkDiv(x,y,w,h);
};
this.drawPolygon=function(x,y){
this.drawPolyline(x,y);
this.drawLine(x[x.length-1],y[x.length-1],x[0],y[0]);
};
this.drawEllipse=this.drawOval=function(x,y,w,h){
this.mkOv(x,y,w,h);
};
this.fillEllipse=this.fillOval=function(_60,top,w,h){
var a=(w-=1)>>1,b=(h-=1)>>1,wod=(w&1)+1,hod=(h&1)+1,cx=_60+a,cy=top+b,x=0,y=b,ox=0,oy=b,aa2=(a*a)<<1,aa4=aa2<<1,bb=(b*b)<<1,st=(aa2>>1)*(1-(b<<1))+bb,tt=(bb>>1)-aa2*((b<<1)-1),pxl,dw,dh;
if(w+1){
while(y>0){
if(st<0){
st+=bb*((x<<1)+3);
tt+=(bb<<1)*(++x);
}else{
if(tt<0){
st+=bb*((x<<1)+3)-aa4*(y-1);
pxl=cx-x;
dw=(x<<1)+wod;
tt+=(bb<<1)*(++x)-aa2*(((y--)<<1)-3);
dh=oy-y;
this.mkDiv(pxl,cy-oy,dw,dh);
this.mkDiv(pxl,cy+oy-dh+hod,dw,dh);
ox=x;
oy=y;
}else{
tt-=aa2*((y<<1)-3);
st-=aa4*(--y);
}
}
}
}
this.mkDiv(cx-a,cy-oy,w+1,(oy<<1)+hod);
};
this.fillPolygon=function(_65,_66){
var i;
var y;
var _69,maxy;
var x1,y1;
var x2,y2;
var _6c,ind2;
var _6d;
var n=_65.length;
if(!n){
return;
}
_69=_66[0];
maxy=_66[0];
for(i=1;i<n;i++){
if(_66[i]<_69){
_69=_66[i];
}
if(_66[i]>maxy){
maxy=_66[i];
}
}
for(y=_69;y<=maxy;y++){
var _6f=new Array();
_6d=0;
for(i=0;i<n;i++){
if(!i){
_6c=n-1;
ind2=0;
}else{
_6c=i-1;
ind2=i;
}
y1=_66[_6c];
y2=_66[ind2];
if(y1<y2){
x1=_65[_6c];
x2=_65[ind2];
}else{
if(y1>y2){
y2=_66[_6c];
y1=_66[ind2];
x2=_65[_6c];
x1=_65[ind2];
}else{
continue;
}
}
if((y>=y1)&&(y<y2)){
_6f[_6d++]=Math.round((y-y1)*(x2-x1)/(y2-y1)+x1);
}else{
if((y==maxy)&&(y>y1)&&(y<=y2)){
_6f[_6d++]=Math.round((y-y1)*(x2-x1)/(y2-y1)+x1);
}
}
}
_6f.sort(integer_compare);
for(i=0;i<_6d;i+=2){
w=_6f[i+1]-_6f[i];
this.mkDiv(_6f[i],y,_6f[i+1]-_6f[i]+1,1);
}
}
};
this.drawString=function(txt,x,y){
this.htm+="<div style=\"position:absolute;white-space:nowrap;"+"left:"+x+"px;"+"top:"+y+"px;"+"font-family:"+this.ftFam+";"+"font-size:"+this.ftSz+";"+"color:"+this.color+";"+this.ftSty+"\">"+txt+"</div>";
};
this.drawImage=function(_73,x,y,w,h){
this.htm+="<div style=\"position:absolute;"+"left:"+x+"px;"+"top:"+y+"px;"+"width:"+w+";"+"height:"+h+";\">"+"<img src=\""+_73+"\" width=\""+w+"\" height=\""+h+"\">"+"</div>";
};
this.clear=function(){
this.htm="";
if(this.cnv){
this.cnv.innerHTML=this.defhtm;
}
};
this.mkOvQds=function(cx,cy,xl,xr,yt,yb,w,h){
this.mkDiv(xr+cx,yt+cy,w,h);
this.mkDiv(xr+cx,yb+cy,w,h);
this.mkDiv(xl+cx,yb+cy,w,h);
this.mkDiv(xl+cx,yt+cy,w,h);
};
this.setStroke(1);
this.setFont("verdana,geneva,helvetica,sans-serif",String.fromCharCode(49,50,112,120),Font.PLAIN);
this.color="#000000";
this.htm="";
this.wnd=wnd||window;
if(!(jg_ie||jg_dom||jg_ihtm)){
chkDHTM();
}
if(typeof id!="string"||!id){
this.paint=pntDoc;
}else{
this.cnv=document.all?(this.wnd.document.all[id]||null):document.getElementById?(this.wnd.document.getElementById(id)||null):null;
this.defhtm=(this.cnv&&this.cnv.innerHTML)?this.cnv.innerHTML:"";
this.paint=jg_dom?pntCnvDom:jg_ie?pntCnvIe:jg_ihtm?pntCnvIhtm:pntCnv;
}
this.setPrintable(false);
}
function integer_compare(x,y){
return (x<y)?-1:((x>y)*1);
}

function ScaleBar(_1){
this.scaleDenominator=(_1==null)?1:_1;
this.displaySystem="metric";
this.minWidth=100;
this.maxWidth=200;
this.divisions=2;
this.subdivisions=2;
this.showMinorMeasures=false;
this.abbreviateLabel=false;
this.singleLine=false;
this.resolution=72;
this.align="center";
this.container=document.createElement("div");
this.container.className="sbWrapper";
this.labelContainer=document.createElement("div");
this.labelContainer.className="sbUnitsContainer";
this.labelContainer.style.position="absolute";
this.graphicsContainer=document.createElement("div");
this.graphicsContainer.style.position="absolute";
this.graphicsContainer.className="sbGraphicsContainer";
this.numbersContainer=document.createElement("div");
this.numbersContainer.style.position="absolute";
this.numbersContainer.className="sbNumbersContainer";
var _2=document.createElement("div");
_2.className="sbMarkerMajor";
this.graphicsContainer.appendChild(_2);
var _3=document.createElement("div");
_3.className="sbMarkerMinor";
this.graphicsContainer.appendChild(_3);
var _4=document.createElement("div");
_4.className="sbBar";
this.graphicsContainer.appendChild(_4);
var _5=document.createElement("div");
_5.className="sbBarAlt";
this.graphicsContainer.appendChild(_5);
}
ScaleBar.prototype.update=function(_6){
if(_6!=null){
this.scaleDenominator=_6;
}
function HandsomeNumber(_7,_8,_9){
var _9=(_9==null)?10:_9;
var _a=Number.POSITIVE_INFINITY;
var _b=Number.POSITIVE_INFINITY;
var _c=_7;
var _d=3;
for(var _e=0;_e<3;++_e){
var _f=Math.pow(2,(-1*_e));
var _10=Math.floor(Math.log(_8/_f)/Math.LN10);
for(var _11=_10;_11>(_10-_9+1);--_11){
var _12=Math.max(_e-_11,0);
var _13=_f*Math.pow(10,_11);
if((_13*Math.floor(_8/_13))>=_7){
if(_7%_13==0){
var _14=_7/_13;
}else{
var _14=Math.floor(_7/_13)+1;
}
var _15=_14+(2*_e);
var _16=(_11<0)?(Math.abs(_11)+1):_11;
if((_15<_a)||((_15==_a)&&(_16<_b))){
_a=_15;
_b=_16;
_c=(_13*_14).toFixed(_12);
_d=_12;
}
}
}
}
this.value=_c;
this.score=_a;
this.tieBreaker=_b;
this.numDec=_d;
}
HandsomeNumber.prototype.toString=function(){
return this.value.toString();
};
HandsomeNumber.prototype.valueOf=function(){
return this.value;
};
function styleValue(_17,_18){
var _19=0;
if(document.styleSheets){
for(var _1a=document.styleSheets.length-1;_1a>=0;--_1a){
var _1b=document.styleSheets[_1a];
if(!_1b.disabled){
var _1c;
if(typeof (_1b.cssRules)=="undefined"){
if(typeof (_1b.rules)=="undefined"){
return 0;
}else{
_1c=_1b.rules;
}
}else{
_1c=_1b.cssRules;
}
for(var _1d=0;_1d<_1c.length;++_1d){
var _1e=_1c[_1d];
if(_1e.selectorText&&(_1e.selectorText.toLowerCase()==_17.toLowerCase())){
if(_1e.style[_18]!=""){
_19=parseInt(_1e.style[_18]);
}
}
}
}
}
}
return _19?_19:0;
}
function formatNumber(_1f,_20){
_20=(_20)?_20:0;
var _21=""+Math.round(_1f);
var _22=/(-?[0-9]+)([0-9]{3})/;
while(_22.test(_21)){
_21=_21.replace(_22,"$1,$2");
}
if(_20>0){
var _23=Math.floor(Math.pow(10,_20)*(_1f-Math.round(_1f)));
if(_23==0){
return _21;
}else{
return _21+"."+_23;
}
}else{
return _21;
}
}
this.container.title="scale 1:"+formatNumber(this.scaleDenominator);
var _24=new Object();
_24.english={units:["miles","feet","inches"],abbr:["mi","ft","in"],inches:[63360,12,1]};
_24.metric={units:["kilometers","meters","centimeters"],abbr:["km","m","cm"],inches:[39370.07874,39.370079,0.393701]};
var _25=new Array();
for(var _26=0;_26<_24[this.displaySystem].units.length;++_26){
_25[_26]=new Object();
var _27=this.resolution*_24[this.displaySystem].inches[_26]/this.scaleDenominator;
var _28=(this.minWidth/_27)/(this.divisions*this.subdivisions);
var _29=(this.maxWidth/_27)/(this.divisions*this.subdivisions);
for(var _2a=0;_2a<(this.divisions*this.subdivisions);++_2a){
var _2b=_28*(_2a+1);
var _2c=_29*(_2a+1);
var _2d=new HandsomeNumber(_2b,_2c);
_25[_26][_2a]={value:(_2d.value/(_2a+1)),score:0,tieBreaker:0,numDec:0,displayed:0};
for(var _2e=0;_2e<(this.divisions*this.subdivisions);++_2e){
displayedValuePosition=_2d.value*(_2e+1)/(_2a+1);
niceNumber2=new HandsomeNumber(displayedValuePosition,displayedValuePosition);
var _2f=((_2e+1)%this.subdivisions==0);
var _30=((_2e+1)==(this.divisions*this.subdivisions));
if((this.singleLine&&_30)||(!this.singleLine&&(_2f||this.showMinorMeasures))){
_25[_26][_2a].score+=niceNumber2.score;
_25[_26][_2a].tieBreaker+=niceNumber2.tieBreaker;
_25[_26][_2a].numDec=Math.max(_25[_26][_2a].numDec,niceNumber2.numDec);
_25[_26][_2a].displayed+=1;
}else{
_25[_26][_2a].score+=niceNumber2.score/this.subdivisions;
_25[_26][_2a].tieBreaker+=niceNumber2.tieBreaker/this.subdivisions;
}
}
var _31=(_26+1)*_25[_26][_2a].tieBreaker/_25[_26][_2a].displayed;
_25[_26][_2a].score*=_31;
}
}
var _32=null;
var _33=null;
var _34=null;
var _35=null;
var _36=Number.POSITIVE_INFINITY;
var _37=Number.POSITIVE_INFINITY;
var _38=0;
for(var _26=0;_26<_25.length;++_26){
for(_2a in _25[_26]){
if((_25[_26][_2a].score<_36)||((_25[_26][_2a].score==_36)&&(_25[_26][_2a].tieBreaker<_37))){
_36=_25[_26][_2a].score;
_37=_25[_26][_2a].tieBreaker;
_32=_25[_26][_2a].value;
_38=_25[_26][_2a].numDec;
_33=_24[this.displaySystem].units[_26];
_34=_24[this.displaySystem].abbr[_26];
_27=this.resolution*_24[this.displaySystem].inches[_26]/this.scaleDenominator;
_35=_27*_32;
}
}
}
var _39=(styleValue(".sbMarkerMajor","borderLeftWidth")+styleValue(".sbMarkerMajor","width")+styleValue(".sbMarkerMajor","borderRightWidth"))/2;
var _3a=(styleValue(".sbMarkerMinor","borderLeftWidth")+styleValue(".sbMarkerMinor","width")+styleValue(".sbMarkerMinor","borderRightWidth"))/2;
var _3b=(styleValue(".sbBar","borderLeftWidth")+styleValue(".sbBar","border-right-width"))/2;
var _3c=(styleValue(".sbBarAlt","borderLeftWidth")+styleValue(".sbBarAlt","borderRightWidth"))/2;
if(!document.styleSheets){
_39=0.5;
_3a=0.5;
}
while(this.labelContainer.hasChildNodes()){
this.labelContainer.removeChild(this.labelContainer.firstChild);
}
while(this.graphicsContainer.hasChildNodes()){
this.graphicsContainer.removeChild(this.graphicsContainer.firstChild);
}
while(this.numbersContainer.hasChildNodes()){
this.numbersContainer.removeChild(this.numbersContainer.firstChild);
}
var _3d,aBarPiece,numbersBox,xOffset;
var _3e={left:0,center:(-1*this.divisions*this.subdivisions*_35/2),right:(-1*this.divisions*this.subdivisions*_35)};
var _3f=0+_3e[this.align];
var _40=0;
for(var _41=0;_41<this.divisions;++_41){
_3f=_41*this.subdivisions*_35;
_3f+=_3e[this.align];
_40=(_41==0)?0:((_41*this.subdivisions)*_32).toFixed(_38);
_3d=document.createElement("div");
_3d.className="sbMarkerMajor";
_3d.style.position="absolute";
_3d.style.overflow="hidden";
_3d.style.left=Math.round(_3f-_39)+"px";
_3d.appendChild(document.createTextNode(" "));
this.graphicsContainer.appendChild(_3d);
if(!this.singleLine){
numbersBox=document.createElement("div");
numbersBox.className="sbNumbersBox";
numbersBox.style.position="absolute";
numbersBox.style.overflow="hidden";
numbersBox.style.textAlign="center";
if(this.showMinorMeasures){
numbersBox.style.width=Math.round(_35*2)+"px";
numbersBox.style.left=Math.round(_3f-_35)+"px";
}else{
numbersBox.style.width=Math.round(this.subdivisions*_35*2)+"px";
numbersBox.style.left=Math.round(_3f-(this.subdivisions*_35))+"px";
}
numbersBox.appendChild(document.createTextNode(_40));
this.numbersContainer.appendChild(numbersBox);
}
for(var _42=0;_42<this.subdivisions;++_42){
aBarPiece=document.createElement("div");
aBarPiece.style.position="absolute";
aBarPiece.style.overflow="hidden";
aBarPiece.style.width=Math.round(_35)+"px";
if((_42%2)==0){
aBarPiece.className="sbBar";
aBarPiece.style.left=Math.round(_3f-_3b)+"px";
}else{
aBarPiece.className="sbBarAlt";
aBarPiece.style.left=Math.round(_3f-_3c)+"px";
}
aBarPiece.appendChild(document.createTextNode(" "));
this.graphicsContainer.appendChild(aBarPiece);
if(_42<(this.subdivisions-1)){
_3f=((_41*this.subdivisions)+(_42+1))*_35;
_3f+=_3e[this.align];
_40=(_41*this.subdivisions+_42+1)*_32;
_3d=document.createElement("div");
_3d.className="sbMarkerMinor";
_3d.style.position="absolute";
_3d.style.overflow="hidden";
_3d.style.left=Math.round(_3f-_3a)+"px";
_3d.appendChild(document.createTextNode(" "));
this.graphicsContainer.appendChild(_3d);
if(this.showMinorMeasures&&!this.singleLine){
numbersBox=document.createElement("div");
numbersBox.className="sbNumbersBox";
numbersBox.style.position="absolute";
numbersBox.style.overflow="hidden";
numbersBox.style.textAlign="center";
numbersBox.style.width=Math.round(_35*2)+"px";
numbersBox.style.left=Math.round(_3f-_35)+"px";
numbersBox.appendChild(document.createTextNode(_40));
this.numbersContainer.appendChild(numbersBox);
}
}
}
}
_3f=(this.divisions*this.subdivisions)*_35;
_3f+=_3e[this.align];
_40=((this.divisions*this.subdivisions)*_32).toFixed(_38);
_3d=document.createElement("div");
_3d.className="sbMarkerMajor";
_3d.style.position="absolute";
_3d.style.overflow="hidden";
_3d.style.left=Math.round(_3f-_39)+"px";
_3d.appendChild(document.createTextNode(" "));
this.graphicsContainer.appendChild(_3d);
if(!this.singleLine){
numbersBox=document.createElement("div");
numbersBox.className="sbNumbersBox";
numbersBox.style.position="absolute";
numbersBox.style.overflow="hidden";
numbersBox.style.textAlign="center";
if(this.showMinorMeasures){
numbersBox.style.width=Math.round(_35*2)+"px";
numbersBox.style.left=Math.round(_3f-_35)+"px";
}else{
numbersBox.style.width=Math.round(this.subdivisions*_35*2)+"px";
numbersBox.style.left=Math.round(_3f-(this.subdivisions*_35))+"px";
}
numbersBox.appendChild(document.createTextNode(_40));
this.numbersContainer.appendChild(numbersBox);
}
var _43=document.createElement("div");
_43.style.position="absolute";
var _44;
if(this.singleLine){
_44=_40;
_43.className="sbLabelBoxSingleLine";
_43.style.top="-0.6em";
_43.style.left=(_3f+10)+"px";
}else{
_44="";
_43.className="sbLabelBox";
_43.style.textAlign="center";
_43.style.width=Math.round(this.divisions*this.subdivisions*_35)+"px";
_43.style.left=Math.round(_3e[this.align])+"px";
_43.style.overflow="hidden";
}
if(this.abbreviateLabel){
_44+=" "+_34;
}else{
_44+=" "+_33;
}
_43.appendChild(document.createTextNode(_44));
this.labelContainer.appendChild(_43);
if(!document.styleSheets){
var _45=document.createElement("style");
_45.type="text/css";
var _46=".sbBar {top: 0px; background: #666666; height: 1px; border: 0;}";
_46+=".sbBarAlt {top: 0px; background: #666666; height: 1px; border: 0;}";
_46+=".sbMarkerMajor {height: 7px; width: 1px; background: #666666; border: 0;}";
_46+=".sbMarkerMinor {height: 5px; width: 1px; background: #666666; border: 0;}";
_46+=".sbLabelBox {top: -16px;}";
_46+=".sbNumbersBox {top: 7px;}";
_45.appendChild(document.createTextNode(_46));
document.getElementsByTagName("head").item(0).appendChild(_45);
}
this.container.appendChild(this.graphicsContainer);
this.container.appendChild(this.labelContainer);
this.container.appendChild(this.numbersContainer);
};
ScaleBar.prototype.place=function(_47){
if(_47==null){
document.body.appendChild(this.container);
}else{
var _48=document.getElementById(_47);
if(_48!=null){
_48.appendChild(this.container);
}
}
this.update();
};

function Sarissa(){
}
Sarissa.PARSED_OK="Document contains no parsing errors";
Sarissa.IS_ENABLED_TRANSFORM_NODE=false;
Sarissa.IS_ENABLED_XMLHTTP=false;
Sarissa.IS_ENABLED_SELECT_NODES=false;
var _sarissa_iNsCounter=0;
var _SARISSA_IEPREFIX4XSLPARAM="";
var _SARISSA_HAS_DOM_IMPLEMENTATION=document.implementation&&true;
var _SARISSA_HAS_DOM_CREATE_DOCUMENT=_SARISSA_HAS_DOM_IMPLEMENTATION&&document.implementation.createDocument;
var _SARISSA_HAS_DOM_FEATURE=_SARISSA_HAS_DOM_IMPLEMENTATION&&document.implementation.hasFeature;
var _SARISSA_IS_MOZ=_SARISSA_HAS_DOM_CREATE_DOCUMENT&&_SARISSA_HAS_DOM_FEATURE;
var _SARISSA_IS_SAFARI=(navigator.userAgent&&navigator.vendor&&(navigator.userAgent.toLowerCase().indexOf("applewebkit")!=-1||navigator.vendor.indexOf("Apple")!=-1));
var _SARISSA_IS_IE=document.all&&window.ActiveXObject&&navigator.userAgent.toLowerCase().indexOf("msie")>-1&&navigator.userAgent.toLowerCase().indexOf("opera")==-1;
if(!window.Node||!window.Node.ELEMENT_NODE){
var Node={ELEMENT_NODE:1,ATTRIBUTE_NODE:2,TEXT_NODE:3,CDATA_SECTION_NODE:4,ENTITY_REFERENCE_NODE:5,ENTITY_NODE:6,PROCESSING_INSTRUCTION_NODE:7,COMMENT_NODE:8,DOCUMENT_NODE:9,DOCUMENT_TYPE_NODE:10,DOCUMENT_FRAGMENT_NODE:11,NOTATION_NODE:12};
}
if(_SARISSA_IS_IE){
_SARISSA_IEPREFIX4XSLPARAM="xsl:";
var _SARISSA_DOM_PROGID="";
var _SARISSA_XMLHTTP_PROGID="";
pickRecentProgID=function(_1,_2){
var _3=false;
for(var i=0;i<_1.length&&!_3;i++){
try{
var _5=new ActiveXObject(_1[i]);
o2Store=_1[i];
_3=true;
for(var j=0;j<_2.length;j++){
if(i<=_2[j][1]){
Sarissa["IS_ENABLED_"+_2[j][0]]=true;
}
}
}
catch(objException){
}
}
if(!_3){
throw "Could not retreive a valid progID of Class: "+_1[_1.length-1]+". (original exception: "+e+")";
}
_1=null;
return o2Store;
};
_SARISSA_DOM_PROGID=pickRecentProgID(["Msxml2.DOMDocument.6.0","Msxml2.DOMDocument.3.0"],[["SELECT_NODES",2],["TRANSFORM_NODE",2]]);
_SARISSA_XMLHTTP_PROGID=pickRecentProgID(["Msxml2.XMLHTTP.6.0","MSXML2.XMLHTTP.3.0"],[["XMLHTTP",4]]);
_SARISSA_THREADEDDOM_PROGID=pickRecentProgID(["Msxml2.FreeThreadedDOMDocument.6.0","MSXML2.FreeThreadedDOMDocument.3.0"]);
_SARISSA_XSLTEMPLATE_PROGID=pickRecentProgID(["Msxml2.XSLTemplate.6.0","MSXML2.XSLTemplate.3.0"],[["XSLTPROC",2]]);
pickRecentProgID=null;
Sarissa.getDomDocument=function(_7,_8){
var _9=new ActiveXObject(_SARISSA_DOM_PROGID);
if(_8){
if(_7){
_9.loadXML("<a"+_sarissa_iNsCounter+":"+_8+" xmlns:a"+_sarissa_iNsCounter+"=\""+_7+"\" />");
++_sarissa_iNsCounter;
}else{
_9.loadXML("<"+_8+"/>");
}
}
return _9;
};
Sarissa.getParseErrorText=function(_a){
var _b=Sarissa.PARSED_OK;
if(_a.parseError!=0){
_b="XML Parsing Error: "+_a.parseError.reason+"\nLocation: "+_a.parseError.url+"\nLine Number "+_a.parseError.line+", Column "+_a.parseError.linepos+":\n"+_a.parseError.srcText+"\n";
for(var i=0;i<_a.parseError.linepos;i++){
_b+="-";
}
_b+="^\n";
}
return _b;
};
Sarissa.setXpathNamespaces=function(_d,_e){
_d.setProperty("SelectionLanguage","XPath");
_d.setProperty("SelectionNamespaces",_e);
};
XSLTProcessor=function(){
this.template=new ActiveXObject(_SARISSA_XSLTEMPLATE_PROGID);
this.processor=null;
};
XSLTProcessor.prototype.importStylesheet=function(_f){
var _10=new ActiveXObject(_SARISSA_THREADEDDOM_PROGID);
_10.loadXML(_f.xml);
this.template.stylesheet=_10;
this.processor=this.template.createProcessor();
this.paramsSet=new Array();
};
XSLTProcessor.prototype.transformToDocument=function(_11){
this.processor.input=_11;
var _12=new ActiveXObject(_SARISSA_DOM_PROGID);
this.processor.output=_12;
this.processor.transform();
return _12;
};
XSLTProcessor.prototype.setParameter=function(_13,_14,_15){
if(_13){
this.processor.addParameter(_14,_15,_13);
}else{
this.processor.addParameter(_14,_15);
}
if(!this.paramsSet[""+_13]){
this.paramsSet[""+_13]=new Array();
}
this.paramsSet[""+_13][_14]=_15;
};
XSLTProcessor.prototype.getParameter=function(_16,_17){
_16=_16||"";
if(_16 in this.paramsSet&&_17 in this.paramsSet[_16]){
return this.paramsSet[_16][_17];
}else{
return null;
}
};
}else{
if(_SARISSA_HAS_DOM_CREATE_DOCUMENT){
Sarissa.__handleLoad__=function(_18){
if(!_18.documentElement||_18.documentElement.tagName=="parsererror"){
_18.parseError=-1;
}
Sarissa.__setReadyState__(_18,4);
};
_sarissa_XMLDocument_onload=function(){
Sarissa.__handleLoad__(this);
};
Sarissa.__setReadyState__=function(_19,_1a){
_19.readyState=_1a;
if(_19.onreadystatechange!=null&&typeof _19.onreadystatechange=="function"){
_19.onreadystatechange();
}
};
Sarissa.getDomDocument=function(_1b,_1c){
var _1d=document.implementation.createDocument(_1b?_1b:"",_1c?_1c:"",null);
_1d.addEventListener("load",_sarissa_XMLDocument_onload,false);
return _1d;
};
if(window.XMLDocument){
XMLDocument.prototype.onreadystatechange=null;
XMLDocument.prototype.readyState=0;
XMLDocument.prototype.parseError=0;
var _SARISSA_SYNC_NON_IMPLEMENTED=false;
XMLDocument.prototype._sarissa_load=XMLDocument.prototype.load;
XMLDocument.prototype.load=function(_1e){
var _1f=document.implementation.createDocument("","",null);
Sarissa.copyChildNodes(this,_1f);
this.parseError=0;
Sarissa.__setReadyState__(this,1);
try{
if(this.async==false&&_SARISSA_SYNC_NON_IMPLEMENTED){
var tmp=new XMLHttpRequest();
tmp.open("GET",_1e,false);
tmp.send(null);
Sarissa.__setReadyState__(this,2);
Sarissa.copyChildNodes(tmp.responseXML,this);
Sarissa.__setReadyState__(this,3);
}else{
this._sarissa_load(_1e);
}
}
catch(objException){
this.parseError=-1;
}
finally{
if(this.async==false){
Sarissa.__handleLoad__(this);
}
}
return _1f;
};
}else{
if(document.implementation&&document.implementation.hasFeature&&document.implementation.hasFeature("LS","3.0")){
Document.prototype.async=true;
Document.prototype.onreadystatechange=null;
Document.prototype.parseError=0;
Document.prototype.load=function(_21){
var _22=document.implementation.createLSParser(this.async?document.implementation.MODE_ASYNCHRONOUS:document.implementation.MODE_SYNCHRONOUS,null);
if(this.async){
var _23=this;
_22.addEventListener("load",function(e){
_23.readyState=4;
Sarissa.copyChildNodes(e.newDocument,_23.documentElement,false);
_23.onreadystatechange.call();
},false);
}
try{
var _25=_22.parseURI(_21);
}
catch(e){
this.parseError=-1;
}
if(!this.async){
Sarissa.copyChildNodes(_25,this.documentElement,false);
}
return _25;
};
Sarissa.getDomDocument=function(_26,_27){
return document.implementation.createDocument(_26?_26:"",_27?_27:"",null);
};
}
}
}
}
if(!window.DOMParser){
DOMParser=function(){
};
if(_SARISSA_IS_SAFARI){
DOMParser.prototype.parseFromString=function(_28,_29){
if(_29.toLowerCase()!="application/xml"){
throw "Cannot handle content type: \""+_29+"\"";
}
var _2a=new XMLHttpRequest();
_2a.open("GET","data:text/xml;charset=utf-8,"+encodeURIComponent(str),false);
_2a.send(null);
return _2a.responseXML;
};
}else{
if(Sarissa.getDomDocument&&Sarissa.getDomDocument()&&"loadXML" in Sarissa.getDomDocument()){
DOMParser.prototype.parseFromString=function(_2b,_2c){
var doc=Sarissa.getDomDocument();
doc.validateOnParse=false;
doc.resolveExternals=false;
doc.loadXML(_2b);
return doc;
};
}
}
}
if(window.XMLHttpRequest){
Sarissa.IS_ENABLED_XMLHTTP=true;
}else{
if(_SARISSA_IS_IE){
XMLHttpRequest=function(){
return new ActiveXObject(_SARISSA_XMLHTTP_PROGID);
};
Sarissa.IS_ENABLED_XMLHTTP=true;
}
}
if(!window.document.importNode&&_SARISSA_IS_IE){
try{
window.document.importNode=function(_2e,_2f){
var _30=document.createElement("div");
if(_2f){
_30.innerHTML=Sarissa.serialize(_2e);
}else{
_30.innerHTML=Sarissa.serialize(_2e.cloneNode(false));
}
return _30.firstChild;
};
}
catch(e){
}
}
if(!Sarissa.getParseErrorText){
Sarissa.getParseErrorText=function(_31){
var _32=Sarissa.PARSED_OK;
if(_31&&_31.parseError&&_31.parseError!=0){
if(_31.documentElement.tagName=="parsererror"){
_32=_31.documentElement.firstChild.data;
_32+="\n"+_31.documentElement.firstChild.nextSibling.firstChild.data;
}else{
_32=Sarissa.getText(_31.documentElement);
}
}
return _32;
};
}
Sarissa.getText=function(_33,_34){
var s="";
var _36=_33.childNodes;
for(var i=0;i<_36.length;i++){
var _38=_36[i];
var _39=_38.nodeType;
if(_39==Node.TEXT_NODE||_39==Node.CDATA_SECTION_NODE){
s+=_38.data;
}else{
if(_34==true&&(_39==Node.ELEMENT_NODE||_39==Node.DOCUMENT_NODE||_39==Node.DOCUMENT_FRAGMENT_NODE)){
s+=Sarissa.getText(_38,true);
}
}
}
return s;
};
if(window.XMLSerializer){
Sarissa.serialize=function(_3a){
var s=null;
if(_3a){
s=_3a.innerHTML?_3a.innerHTML:(new XMLSerializer()).serializeToString(_3a);
}
return s;
};
}else{
if(Sarissa.getDomDocument&&(Sarissa.getDomDocument("","foo",null)).xml){
Sarissa.serialize=function(_3c){
var s=null;
if(_3c){
s=_3c.innerHTML?_3c.innerHTML:_3c.xml;
}
return s;
};
XMLSerializer=function(){
};
XMLSerializer.prototype.serializeToString=function(_3e){
return _3e.xml;
};
}
}
Sarissa.stripTags=function(s){
return s.replace(/<[^>]+>/g,"");
};
Sarissa.clearChildNodes=function(_40){
while(_40.firstChild){
_40.removeChild(_40.firstChild);
}
};
Sarissa.copyChildNodes=function(_41,_42,_43){
if((!_41)||(!_42)){
throw "Both source and destination nodes must be provided";
}
if(!_43){
Sarissa.clearChildNodes(_42);
}
var _44=_42.nodeType==Node.DOCUMENT_NODE?_42:_42.ownerDocument;
var _45=_41.childNodes;
if(_44.importNode&&(!_SARISSA_IS_IE)){
for(var i=0;i<_45.length;i++){
_42.appendChild(_44.importNode(_45[i],true));
}
}else{
for(var i=0;i<_45.length;i++){
_42.appendChild(_45[i].cloneNode(true));
}
}
};
Sarissa.moveChildNodes=function(_47,_48,_49){
if((!_47)||(!_48)){
throw "Both source and destination nodes must be provided";
}
if(!_49){
Sarissa.clearChildNodes(_48);
}
var _4a=_47.childNodes;
if(_47.ownerDocument==_48.ownerDocument){
while(_47.firstChild){
_48.appendChild(_47.firstChild);
}
}else{
var _4b=_48.nodeType==Node.DOCUMENT_NODE?_48:_48.ownerDocument;
if(_4b.importNode&&(!_SARISSA_IS_IE)){
for(var i=0;i<_4a.length;i++){
_48.appendChild(_4b.importNode(_4a[i],true));
}
}else{
for(var i=0;i<_4a.length;i++){
_48.appendChild(_4a[i].cloneNode(true));
}
}
Sarissa.clearChildNodes(_47);
}
};
Sarissa.xmlize=function(_4d,_4e,_4f){
_4f=_4f?_4f:"";
var s=_4f+"<"+_4e+">";
var _51=false;
if(!(_4d instanceof Object)||_4d instanceof Number||_4d instanceof String||_4d instanceof Boolean||_4d instanceof Date){
s+=Sarissa.escape(""+_4d);
_51=true;
}else{
s+="\n";
var _52="";
var _53=_4d instanceof Array;
for(var _54 in _4d){
s+=Sarissa.xmlize(_4d[_54],(_53?"array-item key=\""+_54+"\"":_54),_4f+"   ");
}
s+=_4f;
}
return s+=(_4e.indexOf(" ")!=-1?"</array-item>\n":"</"+_4e+">\n");
};
Sarissa.escape=function(_55){
return _55.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;");
};
Sarissa.unescape=function(_56){
return _56.replace(/&apos;/g,"'").replace(/&quot;/g,"\"").replace(/&gt;/g,">").replace(/&lt;/g,"<").replace(/&amp;/g,"&");
};

Sarissa.updateContentFromURI=function(_1,_2,_3){
try{
_2.style.cursor="wait";
var _4=new XMLHttpRequest();
_4.open("GET",_1);
function sarissa_dhtml_loadHandler(){
if(_4.readyState==4){
_2.style.cursor="auto";
Sarissa.updateContentFromNode(_4.responseXML,_2,_3);
}
}
_4.onreadystatechange=sarissa_dhtml_loadHandler;
_4.send(null);
_2.style.cursor="auto";
}
catch(e){
_2.style.cursor="auto";
throw e;
}
};
Sarissa.updateContentFromNode=function(_5,_6,_7){
try{
_6.style.cursor="wait";
Sarissa.clearChildNodes(_6);
var _8=_5.nodeType==Node.DOCUMENT_NODE?_5:_5.ownerDocument;
if(_8.parseError&&_8.parseError!=0){
var _9=document.createElement("pre");
_9.appendChild(document.createTextNode(Sarissa.getParseErrorText(_8)));
_6.appendChild(_9);
}else{
if(_7){
_5=_7.transformToDocument(_5);
}
if(_6.tagName.toLowerCase=="textarea"||_6.tagName.toLowerCase=="input"){
_6.value=Sarissa.serialize(_5);
}else{
if(_5.nodeType==Node.DOCUMENT_NODE||_5.ownerDocument.documentElement==_5){
_6.innerHTML=Sarissa.serialize(_5);
}else{
_6.appendChild(_6.ownerDocument.importNode(_5,true));
}
}
}
}
catch(e){
throw e;
}
finally{
_6.style.cursor="auto";
}
};

if(!Sarissa.IS_ENABLED_TRANSFORM_NODE&&window.XSLTProcessor){
Element.prototype.transformNodeToObject=function(_1,_2){
var _3=document.implementation.createDocument("","",null);
Sarissa.copyChildNodes(this,_3);
_3.transformNodeToObject(_1,_2);
};
Document.prototype.transformNodeToObject=function(_4,_5){
var _6=null;
try{
_6=new XSLTProcessor();
if(_6.reset){
_6.importStylesheet(_4);
var _7=_6.transformToFragment(this,_5);
Sarissa.copyChildNodes(_7,_5);
}else{
_6.transformDocument(this,_4,_5,null);
}
}
catch(e){
if(_4&&_5){
throw "Failed to transform document. (original exception: "+e+")";
}else{
if(!_4){
throw "No Stylesheet Document was provided. (original exception: "+e+")";
}else{
if(!_5){
throw "No Result Document was provided. (original exception: "+e+")";
}else{
if(_6==null){
throw "Could not instantiate an XSLTProcessor object. (original exception: "+e+")";
}else{
throw e;
}
}
}
}
}
};
Element.prototype.transformNode=function(_8){
var _9=document.implementation.createDocument("","",null);
Sarissa.copyChildNodes(this,_9);
return _9.transformNode(_8);
};
Document.prototype.transformNode=function(_a){
var _b=document.implementation.createDocument("","",null);
this.transformNodeToObject(_a,_b);
var _c=null;
try{
var _d=new XMLSerializer();
_c=_d.serializeToString(_b);
}
catch(e){
throw "Failed to serialize result document. (original exception: "+e+")";
}
return _c;
};
Sarissa.IS_ENABLED_TRANSFORM_NODE=true;
}
Sarissa.setXslParameter=function(_e,_f,_10){
try{
var _11=_e.getElementsByTagName(_SARISSA_IEPREFIX4XSLPARAM+"param");
var _12=_11.length;
var _13=false;
var _14;
if(_10){
for(var i=0;i<_12&&!_13;i++){
if(_11[i].getAttribute("name")==_f){
_14=_11[i];
while(_14.firstChild){
_14.removeChild(_14.firstChild);
}
if(!_10||_10==null){
}else{
if(typeof _10=="string"){
_14.setAttribute("select",_10);
_13=true;
}else{
if(_10.nodeName){
_14.removeAttribute("select");
_14.appendChild(_10.cloneNode(true));
_13=true;
}else{
if(_10.item(0)&&_10.item(0).nodeType){
for(var j=0;j<_10.length;j++){
if(_10.item(j).nodeType){
_14.appendChild(_10.item(j).cloneNode(true));
}
}
_13=true;
}else{
throw "Failed to set xsl:param "+_f+" (original exception: "+e+")";
}
}
}
}
}
}
}
return _13;
}
catch(e){
throw e;
return false;
}
};

var _SARISSA_HAS_DOM_IMPLEMENTATION=document.implementation&&true;
var _SARISSA_HAS_DOM_FEATURE=_SARISSA_HAS_DOM_IMPLEMENTATION&&document.implementation.hasFeature;
if(_SARISSA_HAS_DOM_FEATURE&&document.implementation.hasFeature("XPath","3.0")){
function SarissaNodeList(i){
this.length=i;
}
SarissaNodeList.prototype=new Array(0);
SarissaNodeList.prototype.constructor=Array;
SarissaNodeList.prototype.item=function(i){
return (i<0||i>=this.length)?null:this[i];
};
SarissaNodeList.prototype.expr="";
XMLDocument.prototype.setProperty=function(x,y){
};
Sarissa.setXpathNamespaces=function(_5,_6){
_5._sarissa_useCustomResolver=true;
var _7=_6.indexOf(" ")>-1?_6.split(" "):new Array(_6);
_5._sarissa_xpathNamespaces=new Array(_7.length);
for(var i=0;i<_7.length;i++){
var ns=_7[i];
var _a=ns.indexOf(":");
var _b=ns.indexOf("=");
if(_a==5&&_b>_a+2){
var _c=ns.substring(_a+1,_b);
var _d=ns.substring(_b+2,ns.length-1);
_5._sarissa_xpathNamespaces[_c]=_d;
}else{
throw "Bad format on namespace declaration(s) given";
}
}
};
XMLDocument.prototype._sarissa_useCustomResolver=false;
XMLDocument.prototype._sarissa_xpathNamespaces=new Array();
XMLDocument.prototype.selectNodes=function(_e,_f){
var _10=this;
var _11=this._sarissa_useCustomResolver?function(_12){
var s=_10._sarissa_xpathNamespaces[_12];
if(s){
return s;
}else{
throw "No namespace URI found for prefix: '"+_12+"'";
}
}:this.createNSResolver(this.documentElement);
var _14=this.evaluate(_e,(_f?_f:this),_11,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
var _15=new SarissaNodeList(_14.snapshotLength);
_15.expr=_e;
for(var i=0;i<_15.length;i++){
_15[i]=_14.snapshotItem(i);
}
return _15;
};
Element.prototype.selectNodes=function(_17){
var doc=this.ownerDocument;
if(doc.selectNodes){
return doc.selectNodes(_17,this);
}else{
throw "Method selectNodes is only supported by XML Elements";
}
};
XMLDocument.prototype.selectSingleNode=function(_19,_1a){
var ctx=_1a?_1a:null;
_19="("+_19+")[1]";
var _1c=this.selectNodes(_19,ctx);
if(_1c.length>0){
return _1c.item(0);
}else{
return null;
}
};
Element.prototype.selectSingleNode=function(_1d){
var doc=this.ownerDocument;
if(doc.selectSingleNode){
return doc.selectSingleNode(_1d,this);
}else{
throw "Method selectNodes is only supported by XML Elements";
}
};
Sarissa.IS_ENABLED_SELECT_NODES=true;
}

function Listener(){
this.listeners=new Array();
this.values=new Array();
this.addListener=function(_1,_2,_3){
if(window.logger){
logger.logEvent("addListener: "+_1,this.id,_3.id);
}
if(!this.listeners[_1]){
this.listeners[_1]=new Array();
}
this.removeListener(_1,_2,_3);
this.listeners[_1].push(new Array(_2,_3));
if(!_2){
alert("undefined listener for:"+_3);
}
};
this.addFirstListener=function(_4,_5,_6){
if(window.logger){
logger.logEvent("addFirstListener: "+_4,this.id,_6.id);
}
if(!this.listeners[_4]){
this.listeners[_4]=new Array();
}
this.removeListener(_4,_5,_6);
this.listeners[_4].unshift(new Array(_5,_6));
if(!_5){
alert("undefined listener for:"+_6);
}
};
this.removeListener=function(_7,_8,_9){
if(this.listeners[_7]){
for(var i=0;i<this.listeners[_7].length;i++){
if(this.listeners[_7][i][0]==_8&&this.listeners[_7][i][1]==_9){
for(var j=i;j<this.listeners[_7].length-1;j++){
this.listeners[_7][j]=this.listeners[_7][j+1];
}
this.listeners[_7].pop();
return;
}
}
}
};
this.callListeners=function(_c,_d){
if(this.listeners[_c]){
var _e=this.listeners[_c].length;
for(var i=0;i<_e;i++){
if(window.logger){
logger.logEvent(_c,this.id,this.listeners[_c][i][1].id,_d);
}
if(this.listeners[_c][i][0]){
this.listeners[_c][i][0](this.listeners[_c][i][1],_d);
}else{
alert("Listener error: param="+_c+", target="+this.listeners[_c][i][1].id+", callBackFunction="+this.listeners[_c][i][0]);
}
}
}
};
this.setParam=function(_10,_11){
this.values[_10]=_11;
this.callListeners(_10,_11);
};
this.getParam=function(_12){
return this.values[_12];
};
}

function MGRS(){
var _1=6;
var _2=new Array("A","J","S","A","J","S");
var _3=new Array("A","F","A","F","A","F");
var _4=new Array("A","J","S","A","J","S");
var _5=new Array("L","R","L","R","L","R");
var _6=20000000;
var _7=5;
var _8=4;
var _9=3;
var _a=2;
var _b=1;
var _c=_2;
var _d=_3;
var A=65;
var I=73;
var O=79;
var V=86;
var Z=90;
var _13=false;
var _14;
var _15;
var _16;
var _17;
var _18;
var _19;
var _1a;
var _1b;
var _1c;
this.convert=function(_1d,_1e){
_15=parseFloat(_1d);
_16=parseFloat(_1e);
_17=degToRad(_15);
_18=degToRad(_16);
LLtoUTM();
return formatMGRS();
};
function degToRad(deg){
return (deg*(Math.PI/180));
}
function LLtoUTM(){
var Lat=_15;
var _21=_16;
var a=6378137;
var _23=0.00669438;
var k0=0.9996;
var _25;
var _26;
var N,T,C,A,M;
var _28=_17;
var _29=_18;
var _2a;
var _2b;
_2b=Math.floor((_21+180)/6)+1;
if(_21==180){
_2b=60;
}
if(Lat>=56&&Lat<64&&_21>=3&&_21<12){
_2b=32;
}
if(Lat>=72&&Lat<84){
if(_21>=0&&_21<9){
_2b=31;
}else{
if(_21>=9&&_21<21){
_2b=33;
}else{
if(_21>=21&&_21<33){
_2b=35;
}else{
if(_21>=33&&_21<42){
_2b=37;
}
}
}
}
}
_25=(_2b-1)*6-180+3;
_2a=degToRad(_25);
_26=(_23)/(1-_23);
N=a/Math.sqrt(1-_23*Math.sin(_28)*Math.sin(_28));
T=Math.tan(_28)*Math.tan(_28);
C=_26*Math.cos(_28)*Math.cos(_28);
A=Math.cos(_28)*(_29-_2a);
M=a*((1-_23/4-3*_23*_23/64-5*_23*_23*_23/256)*_28-(3*_23/8+3*_23*_23/32+45*_23*_23*_23/1024)*Math.sin(2*_28)+(15*_23*_23/256+45*_23*_23*_23/1024)*Math.sin(4*_28)-(35*_23*_23*_23/3072)*Math.sin(6*_28));
var _2c=(k0*N*(A+(1-T+C)*A*A*A/6+(5-18*T+T*T+72*C-58*_26)*A*A*A*A*A/120)+500000);
var _2d=(k0*(M+N*Math.tan(_28)*(A*A/2+(5-T+9*C+4*C*C)*A*A*A*A/24+(61-58*T+T*T+600*C-330*_26)*A*A*A*A*A*A/720)));
if(Lat<0){
_2d+=10000000;
}
_19=Math.round(_2d);
_1a=Math.round(_2c);
_1b=_2b;
_1c=getLetterDesignator(Lat);
}
function getLetterDesignator(lat){
var _2f="Z";
if((84>=lat)&&(lat>=72)){
_2f="X";
}else{
if((72>lat)&&(lat>=64)){
_2f="W";
}else{
if((64>lat)&&(lat>=56)){
_2f="V";
}else{
if((56>lat)&&(lat>=48)){
_2f="U";
}else{
if((48>lat)&&(lat>=40)){
_2f="T";
}else{
if((40>lat)&&(lat>=32)){
_2f="S";
}else{
if((32>lat)&&(lat>=24)){
_2f="R";
}else{
if((24>lat)&&(lat>=16)){
_2f="Q";
}else{
if((16>lat)&&(lat>=8)){
_2f="P";
}else{
if((8>lat)&&(lat>=0)){
_2f="N";
}else{
if((0>lat)&&(lat>=-8)){
_2f="M";
}else{
if((-8>lat)&&(lat>=-16)){
_2f="L";
}else{
if((-16>lat)&&(lat>=-24)){
_2f="K";
}else{
if((-24>lat)&&(lat>=-32)){
_2f="J";
}else{
if((-32>lat)&&(lat>=-40)){
_2f="H";
}else{
if((-40>lat)&&(lat>=-48)){
_2f="G";
}else{
if((-48>lat)&&(lat>=-56)){
_2f="F";
}else{
if((-56>lat)&&(lat>=-64)){
_2f="E";
}else{
if((-64>lat)&&(lat>=-72)){
_2f="D";
}else{
if((-72>lat)&&(lat>=-80)){
_2f="C";
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
return _2f;
}
function formatMGRS(){
var _30=""+_1a;
var _31=""+_19;
while(_31.length>6){
_31=_31.substr(1,_31.length-1);
}
var str=_1b+""+_1c+get100kID(_1a,_19,_1b)+_30.substr(1,4)+_31.substr(1,4);
return str;
}
function get100kID(_33,_34,_35){
var _36=get100kSetForZone(_35);
var _37=Math.floor(_33/100000);
var _38=Math.floor(_34/100000)%20;
return getLetter100kID(_37,_38,_36);
}
function get100kSetForZone(i){
var _3a=i%_1;
if(_3a==0){
_3a=_1;
}
return _3a;
}
function getLetter100kID(_3b,row,_3d){
var _3e=_3d-1;
var _3f=AsciiToNum(_2[_3e]);
var _40=AsciiToNum(_3[_3e]);
var _41=_3f+_3b-1;
var _42=_40+row;
var _43=false;
if(_41>Z){
_41=_41-Z+A-1;
_43=true;
}
if(_41==I||(_3f<I&&_41>I)||((_41>I||_3f<I)&&_43)){
_41++;
}
if(_41==O||(_3f<O&&_41>O)||((_41>O||_3f<O)&&_43)){
_41++;
if(_41==I){
_41++;
}
}
if(_41>Z){
_41=_41-Z+A-1;
}
if(_42>V){
_42=_42-V+A-1;
_43=true;
}else{
_43=false;
}
if(((_42==I)||((_40<I)&&(_42>I)))||(((_42>I)||(_40<I))&&_43)){
_42++;
}
if(((_42==O)||((_40<O)&&(_42>O)))||(((_42>O)||(_40<O))&&_43)){
_42++;
if(_42==I){
_42++;
}
}
if(_42>V){
_42=_42-V+A-1;
}
var _44=NumToAscii(_41)+""+NumToAscii(_42);
return _44;
}
function AsciiToNum(_45){
switch(_45){
case "A":
return 65;
case "B":
return 66;
case "C":
return 67;
case "D":
return 68;
case "E":
return 69;
case "F":
return 70;
case "G":
return 71;
case "H":
return 72;
case "I":
return 73;
case "J":
return 74;
case "K":
return 75;
case "L":
return 76;
case "M":
return 77;
case "N":
return 78;
case "O":
return 79;
case "P":
return 80;
case "Q":
return 81;
case "R":
return 82;
case "S":
return 83;
case "T":
return 84;
case "U":
return 85;
case "V":
return 86;
case "W":
return 87;
case "X":
return 88;
case "Y":
return 89;
case "Z":
return 90;
}
}
function NumToAscii(num){
switch(num){
case 65:
return "A";
case 66:
return "B";
case 67:
return "C";
case 68:
return "D";
case 69:
return "E";
case 70:
return "F";
case 71:
return "G";
case 72:
return "H";
case 73:
return "I";
case 74:
return "J";
case 75:
return "K";
case 76:
return "L";
case 77:
return "M";
case 78:
return "N";
case 79:
return "O";
case 80:
return "P";
case 81:
return "Q";
case 82:
return "R";
case 83:
return "S";
case 84:
return "T";
case 85:
return "U";
case 86:
return "V";
case 87:
return "W";
case 88:
return "X";
case 89:
return "Y";
case 90:
return "Z";
}
}
}

mapbuilder.loadScript(baseDir+"/model/FeatureCollection.js");
function OwsCatResources(_1,_2){
FeatureCollection.apply(this,new Array(_1,_2));
this.namespace="xmlns:owscat='http://www.ec.gc.ca/owscat' xmlns:gml='http://www.opengis.net/gml' xmlns:wfs='http://www.opengis.net/wfs'";
}
OwsCatResources.prototype.getFeatureNode=function(_3){
return this.doc.selectSingleNode(this.nodeSelectXpath+"[owscat:name='"+_3+"']");
};

function Model(_1,_2){
ModelBase.apply(this,new Array(_1,_2));
}

function FeatureTypeSchema(_1,_2){
ModelBase.apply(this,new Array(_1,_2));
}

mapbuilder.loadScript(baseDir+"/graphics/RssLayer.js");
function GeoRSS(_1,_2){
ModelBase.apply(this,new Array(_1,_2));
this.initItems=function(_3){
var _4=_3.doc.selectNodes("rdf:RDF/rss:item");
if(_4.length==0){
_4=_3.doc.selectNodes("atom:feed/atom:entry");
}
for(var i=0;i<_4.length;++i){
var _6=_4[i];
_6.setAttribute("divid","RSS_Item_"+mbIds.getId());
}
};
this.getFeatureNodes=function(){
return this.doc.selectNodes(this.nodeSelectXpath);
};
this.getFeatureName=function(_7){
var _8=_7.selectSingleNode("rss:title");
if(_8==null){
_8=_7.selectSingleNode("atom:title");
}
return _8?_8.firstChild.nodeValue:"No RSS title";
};
this.getFeatureId=function(_9){
var id=_9.getAttribute("divid");
if(id){
return id;
}
return "no_id";
};
this.getFeaturePoint=function(_b){
if(_b.selectSingleNode("geo:long")){
var _c=_b.selectSingleNode("geo:long").firstChild.nodeValue;
var _d=_b.selectSingleNode("geo:lat").firstChild.nodeValue;
return new Array(_c,_d);
}else{
var _e=_b.selectSingleNode("georss:where/gml:Point/gml:pos");
if(_e!=null){
var _f=_e.firstChild.nodeValue;
var _10=_f.split(" ");
var _c=_10[0];
var _d=_10[1];
return new Array(_c,_d);
}else{
return new Array(0,0);
}
}
};
this.getFeatureGeometry=function(_11){
if(_11.selectSingleNode("geo:long")){
var _12=_11.selectSingleNode("geo:long").firstChild.nodeValue;
var _13=_11.selectSingleNode("geo:lat").firstChild.nodeValue;
return "POINT "+_12+","+_13;
}
var pos=_11.selectSingleNode("georss:where/gml:Point/gml:pos");
if(pos!=null){
var _15=pos.firstChild.nodeValue;
return "POINT "+_15;
}
var _16=_11.selectSingleNode("georss:where/gml:LineString/gml:posList");
if(_16!=null){
var _17=_16.childNodes;
var _18=_17.length;
var _19="";
for(var i=0;i<_18;i++){
_19+=_17[i].nodeValue;
}
return "LINESTRING "+_19;
}
var _16=_11.selectSingleNode("georss:where/gml:Polygon/gml:exterior/gml:LinearRing");
if(_16!=null){
var _15=_16.firstChild.nodeValue;
return "POLYGON "+_15;
}
alert("Invalid GML Geometry");
return null;
};
this.getFeatureGml=function(_1b){
var _1c=_1b.selectSingleNode("georss:where");
if(_1c!=null){
var gml=_1c.firstChild;
return gml;
}else{
return null;
}
};
this.getFeatureIcon=function(_1e){
if(_1e==null){
return null;
}
var _1f=_1e.selectSingleNode("atom:icon");
if(_1f!=undefined){
return _1f.firstChild.nodeValue;
}else{
return null;
}
};
}

function Logger(_1,_2){
ModelBase.apply(this,new Array(_1,_2));
this.namespace="xmlns:mb='http://mapbuilder.sourceforge.net/mapbuilder'";
this.doc=Sarissa.getDomDocument("http://mapbuilder.sourceforge.net/mapbuilder","mb:Logger");
Sarissa.setXpathNamespaces(this.doc,this.namespace);
this.doc.async=false;
this.doc.validateOnParse=false;
this.logEvent=function(_3,_4,_5,_6){
var _7=this.doc.createElement("event");
_7.setAttribute("time",new Date().getTime());
_7.setAttribute("listener",_4);
_7.setAttribute("target",_5);
if(_6){
_7.setAttribute("param",_6);
}
_7.appendChild(this.doc.createTextNode(_3));
this.doc.documentElement.appendChild(_7);
};
this.clearLog=function(){
while(this.doc.documentElement.hasChildNodes()){
this.doc.documentElement.removeChild(this.doc.documentElement.firstChild);
}
this.callListeners("refresh");
};
this.saveLog=function(){
if(config.serializeUrl){
var _8=postLoad(config.serializeUrl,logger.doc);
_8.setProperty("SelectionLanguage","XPath");
Sarissa.setXpathNamespaces(_8,"xmlns:xlink='http://www.w3.org/1999/xlink'");
var _9=_8.selectSingleNode("//OnlineResource");
var _a=_9.attributes.getNamedItem("xlink:href").nodeValue;
alert("event log saved as:"+_a);
}else{
alert("unable to save event log; provide a serializeUrl property in config");
}
};
this.refreshLog=function(_b){
_b.callListeners("refresh");
};
if(_2){
_2.addListener("refresh",this.refreshLog,this);
}
window.onunload=this.saveLog;
window.logger=this;
}

function WmsCapabilities(_1,_2){
ModelBase.apply(this,new Array(_1,_2));
this.namespace="xmlns:wms='http://www.opengis.net/wms' xmlns:xlink='http://www.w3.org/1999/xlink'";
this.getServerUrl=function(_3,_4,_5){
var _6=this.getVersion();
if(_6=="1.0.0"){
_3=_3.substring(3);
var _7="/WMT_MS_Capabilities/Capability/Request/"+_3;
if(_4.toLowerCase()=="post"){
_7+="/DCPType/HTTP/Post";
}else{
_7+="/DCPType/HTTP/Get";
}
return this.doc.selectSingleNode(_7).getAttribute("onlineResource");
}else{
var _7="/WMT_MS_Capabilities/Capability/Request/"+_3;
if(_4.toLowerCase()=="post"){
_7+="/DCPType/HTTP/Post/OnlineResource";
}else{
_7+="/DCPType/HTTP/Get/OnlineResource";
}
return this.doc.selectSingleNode(_7).getAttribute("xlink:href");
}
};
this.getVersion=function(){
var _8="/WMT_MS_Capabilities";
return this.doc.selectSingleNode(_8).getAttribute("version");
};
this.getServerTitle=function(){
var _9="/WMT_MS_Capabilities/Service/Title";
var _a=this.doc.selectSingleNode(_9);
return _a.firstChild.nodeValue;
};
this.getImageFormat=function(){
var _b=this.getVersion();
if(_b=="1.0.0"){
var _c="/WMT_MS_Capabilities/Capability/Request/Map/Format";
var _d=this.doc.selectSingleNode(_c);
if(_SARISSA_IS_IE){
return "image/"+_d.firstChild.baseName.toLowerCase();
}else{
return "image/"+_d.firstChild.localName.toLowerCase();
}
}else{
var _c="/WMT_MS_Capabilities/Capability/Request/GetMap/Format";
var _d=this.doc.selectSingleNode(_c);
return _d.firstChild.nodeValue;
}
};
this.getServiceName=function(){
var _e="/WMT_MS_Capabilities/Service/Name";
var _f=this.doc.selectSingleNode(_e);
return _f.firstChild.nodeValue;
};
this.getFeatureNode=function(_10){
return this.doc.selectSingleNode(this.nodeSelectXpath+"[Name='"+_10+"']");
};
}

mapbuilder.loadScript(baseDir+"/graphics/WfsQueryLayer.js");
function FeatureCollection(_1,_2){
ModelBase.apply(this,new Array(_1,_2));
var _3=_1.selectSingleNode("mb:featureTagName");
if(_3){
this.featureTagName=_3.firstChild.nodeValue;
}else{
this.featureTagName="topp:CITY_NAME";
}
var _4=_1.selectSingleNode("mb:coordsTagName");
if(_4){
this.coordsTagName=_4.firstChild.nodeValue;
}else{
this.coordsTagName="//gml:coordinates";
}
var _5=_1.selectSingleNode("mb:nodeSelectXpath");
if(_5){
this.nodeSelectXpath=_5.firstChild.nodeValue;
}
var _6=_1.selectSingleNode("mb:coordSelectXpath");
if(_6){
this.coordSelectXpath=_6.firstChild.nodeValue;
}else{
this.coordSelectXpath="topp:the_geom/gml:MultiPoint/gml:pointMember/gml:Point/gml:coordinates";
}
this.convertCoords=function(_7){
if(_7.doc&&_7.containerModel&&_7.containerModel.doc){
var _8=_7.doc.selectNodes(_7.coordsTagName);
if(_8.length>0&&_7.containerModel){
var _9=_8[0].selectSingleNode("ancestor-or-self::*/@srsName");
if(_9&&(_9.nodeValue.toUpperCase()!=_7.containerModel.getSRS().toUpperCase())){
var _a=new Proj(_9.nodeValue);
_7.setParam("modelStatus","converting coordinates");
var _b=new Proj(_7.containerModel.getSRS());
for(var i=0;i<_8.length;++i){
var _d=_8[i].firstChild.nodeValue;
var _e=_d.split(" ");
var _f="";
for(var j=0;j<_e.length;++j){
var xy=_e[j].split(",");
if(xy.length==2){
var _12=_a.Inverse(xy);
xy=_b.Forward(_12);
_f+=xy.join(",")+" ";
}
}
_8[i].firstChild.nodeValue=_f;
}
}
}
}
};
this.loadWfsRequests=function(_13){
if(_13.containerModel.doc!=null){
var _14=_13.containerModel.doc.selectNodes("/wmc:OWSContext/wmc:ResourceList/wmc:FeatureType");
if(_14.length>0){
for(var i=0;i<_14.length;i++){
var _16=new Object();
var _17=_14[i];
var _18=_17.selectSingleNode("wmc:Server");
var _19=_18.selectSingleNode("wmc:OnlineResource");
_16.method=_19.getAttribute("method");
_16.url=_19.getAttribute("xlink:href");
var _1a=_17.selectSingleNode("wfs:GetFeature");
_16.postData=Sarissa.serialize(_1a);
_13.wfsFeature=_17;
_13.newRequest(_13,_16);
}
}
}
};
this.addFirstListener("loadModel",this.convertCoords,this);
if(this.containerModel){
this.containerModel.addListener("loadModel",this.loadWfsRequests,this);
}
this.setHidden=function(_1b,_1c){
this.hidden=_1c;
this.callListeners("hidden",_1b);
};
this.getHidden=function(_1d){
return this.hidden;
};
this.hidden=false;
this.getFeatureNodes=function(){
var _1e=this.doc.selectSingleNode(this.nodeSelectXpath);
if(_1e!=null){
return _1e.childNodes;
}else{
return null;
}
};
this.getFeatureName=function(_1f){
var _20=_1f.selectSingleNode(this.featureTagName);
return _20?_20.firstChild.nodeValue:"No RSS title";
};
this.getFeatureId=function(_21){
return _21.getAttribute("fid")?_21.getAttribute("fid"):"no_id";
};
this.getFeaturePoint=function(_22){
var _23=_22.selectSingleNode(this.coordSelectXpath);
var _23=_22.selectSingleNode(_6);
if(_23){
var _24=_23.firstChild.nodeValue.split(",");
return _24;
}else{
return new Array(0,0);
}
};
this.getFeatureGeometry=function(_25){
var _26=_25.selectSingleNode(this.coordsTagName);
if(_26!=null){
return _26.firstChild;
}else{
alert("invalid geom for:"+Sarissa.serialize(_25));
}
};
}

function GetMap(_1,_2){
ModelBase.apply(this,new Array(_1,_2));
this.namespace="xmlns:gml='http://www.opengis.net/gml' xmlns:wfs='http://www.opengis.net/wfs'";
this.prePaint=function(_3){
_3.stylesheet.setParameter("width",_3.containerModel.getWindowWidth());
_3.stylesheet.setParameter("height",_3.containerModel.getWindowHeight());
bBox=_3.containerModel.getBoundingBox();
var _4=bBox[0]+","+bBox[1]+","+bBox[2]+","+bBox[3];
_3.stylesheet.setParameter("bbox",_4);
_3.stylesheet.setParameter("srs",_3.containerModel.getSRS());
_3.stylesheet.setParameter("version",_3.model.getVersion(_3.featureNode));
_3.stylesheet.setParameter("baseUrl",_3.model.getServerUrl("GetMap"));
_3.stylesheet.setParameter("mbId",_3.featureNode.getAttribute("id"));
_3.resultDoc=_3.featureNode;
};
this.loadLayer=function(_5,_6){
_5.featureNode=_6;
_5.paint(_5);
};
this.addListener("GetMap",this.loadLayer,this);
}

function Context(_1,_2){
ModelBase.apply(this,new Array(_1,_2));
this.namespace="xmlns:mb='http://mapbuilder.sourceforge.net/mapbuilder' xmlns:wmc='http://www.opengis.net/context' xmlns:xsl='http://www.w3.org/1999/XSL/Transform'";
this.setHidden=function(_3,_4){
var _5="0";
if(_4){
_5="1";
}
var _6=this.doc.selectSingleNode("/wmc:ViewContext/wmc:LayerList/wmc:Layer[wmc:Name='"+_3+"']");
if(_6){
_6.setAttribute("hidden",_5);
}
this.callListeners("hidden",_3);
};
this.getHidden=function(_7){
var _8=1;
var _9=this.doc.selectSingleNode("/wmc:ViewContext/wmc:LayerList/wmc:Layer[wmc:Name='"+_7+"']");
if(_9){
_8=_9.getAttribute("hidden");
}
return _8;
};
this.getBoundingBox=function(){
var _a=this.doc.selectSingleNode("/wmc:ViewContext/wmc:General/wmc:BoundingBox");
bbox=new Array();
bbox[0]=parseFloat(_a.getAttribute("minx"));
bbox[1]=parseFloat(_a.getAttribute("miny"));
bbox[2]=parseFloat(_a.getAttribute("maxx"));
bbox[3]=parseFloat(_a.getAttribute("maxy"));
return bbox;
};
this.setBoundingBox=function(_b){
var _c=this.doc.selectSingleNode("/wmc:ViewContext/wmc:General/wmc:BoundingBox");
_c.setAttribute("minx",_b[0]);
_c.setAttribute("miny",_b[1]);
_c.setAttribute("maxx",_b[2]);
_c.setAttribute("maxy",_b[3]);
this.callListeners("bbox",_b);
};
this.initBbox=function(_d){
if(window.cgiArgs["bbox"]){
var _e=window.cgiArgs["bbox"].split(",");
var ul=new Array(parseFloat(_e[0]),parseFloat(_e[3]));
var lr=new Array(parseFloat(_e[2]),parseFloat(_e[1]));
_d.extent.zoomToBox(ul,lr);
}
};
this.addListener("loadModel",this.initBbox,this);
this.initAoi=function(_11){
if(window.cgiArgs["aoi"]){
var aoi=window.cgiArgs["aoi"].split(",");
_11.setParam("aoi",new Array(new Array(aoi[0],aoi[3]),new Array(aoi[2],aoi[1])));
}
};
this.addListener("loadModel",this.initAoi,this);
this.setSRS=function(srs){
var _14=this.doc.selectSingleNode("/wmc:ViewContext/wmc:General/wmc:BoundingBox");
_14.setAttribute("SRS",srs);
this.callListeners("srs");
};
this.getSRS=function(){
var _15=this.doc.selectSingleNode("/wmc:ViewContext/wmc:General/wmc:BoundingBox");
srs=_15.getAttribute("SRS");
return srs;
};
this.getWindowWidth=function(){
var win=this.doc.selectSingleNode("/wmc:ViewContext/wmc:General/wmc:Window");
return win.getAttribute("width");
};
this.setWindowWidth=function(_17){
var win=this.doc.selectSingleNode("/wmc:ViewContext/wmc:General/wmc:Window");
win.setAttribute("width",_17);
this.callListeners("resize");
};
this.getWindowHeight=function(){
var win=this.doc.selectSingleNode("/wmc:ViewContext/wmc:General/wmc:Window");
return win.getAttribute("height");
};
this.setWindowHeight=function(_1a){
var win=this.doc.selectSingleNode("/wmc:ViewContext/wmc:General/wmc:Window");
win.setAttribute("height",_1a);
this.callListeners("resize");
};
this.getWindowSize=function(_1c){
var win=this.doc.selectSingleNode("/wmc:ViewContext/wmc:General/wmc:Window");
return new Array(win.getAttribute("width"),win.getAttribute("height"));
};
this.setWindowSize=function(_1e){
var _1f=_1e[0];
var _20=_1e[1];
var win=this.doc.selectSingleNode("/wmc:ViewContext/wmc:General/wmc:Window");
win.setAttribute("width",_1f);
win.setAttribute("height",_20);
this.callListeners("resize");
};
this.getFeatureNode=function(_22){
return this.doc.selectSingleNode(this.nodeSelectXpath+"[wmc:Name='"+_22+"']");
};
this.getServerUrl=function(_23,_24,_25){
return _25.selectSingleNode("wmc:Server/wmc:OnlineResource").getAttribute("xlink:href");
};
this.getVersion=function(_26){
return _26.selectSingleNode("wmc:Server").getAttribute("version");
};
this.getMethod=function(_27){
return _27.selectSingleNode("wmc:Server/wmc:OnlineResource").getAttribute("wmc:method");
};
this.getQueryableLayers=function(){
var _28=this.doc.selectNodes("/wmc:ViewContext/wmc:LayerList/wmc:Layer[attribute::queryable='1']/wmc:Name");
return _28;
};
this.getAllLayers=function(){
var _29=this.doc.selectNodes("/wmc:ViewContext/wmc:LayerList/wmc:Layer");
return _29;
};
this.getLayer=function(_2a){
var _2b=this.doc.selectSingleNode("/wmc:ViewContext/wmc:LayerList/wmc:Layer[wmc:Name='"+_2a+"']");
return _2b;
};
this.addLayer=function(_2c,_2d){
var _2e=_2c.doc.selectSingleNode("/wmc:ViewContext/wmc:LayerList");
_2e.appendChild(_2d.cloneNode(true));
_2c.modified=true;
};
this.addFirstListener("addLayer",this.addLayer,this);
this.addSLD=function(_2f,_30){
var _31=_30.selectSingleNode("//Name").firstChild.nodeValue;
var _32=_2f.doc.selectSingleNode("//wmc:Layer[wmc:Name='"+_31+"']");
_32.appendChild(_30.cloneNode(true));
_2f.modified=true;
};
this.addFirstListener("addSLD",this.addSLD,this);
this.deleteLayer=function(_33,_34){
var _35=_33.getLayer(_34);
if(!_35){
alert("node note found; unable to delete node:"+_34);
return;
}
_35.parentNode.removeChild(_35);
_33.modified=true;
};
this.addFirstListener("deleteLayer",this.deleteLayer,this);
this.moveLayerUp=function(_36,_37){
var _38=_36.getLayer(_37);
var _39=_38.selectSingleNode("following-sibling::*");
if(!_39){
alert("can't move node past beginning of list:"+_37);
return;
}
_38.parentNode.insertBefore(_39,_38);
_36.modified=true;
};
this.addFirstListener("moveLayerUp",this.moveLayerUp,this);
this.moveLayerDown=function(_3a,_3b){
var _3c=_3a.getLayer(_3b);
var _3d=_3c.selectNodes("preceding-sibling::*");
var _3e=_3d[_3d.length-1];
if(!_3e){
alert("can't move node past beginning of list:"+_3b);
return;
}
_3c.parentNode.insertBefore(_3c,_3e);
_3a.modified=true;
};
this.addFirstListener("moveLayerDown",this.moveLayerDown,this);
this.setExtension=function(_3f){
var _40=this.doc.selectSingleNode("/wmc:ViewContext/wmc:General/wmc:Extension");
if(!_40){
var _41=this.doc.selectSingleNode("/wmc:ViewContext/wmc:General");
var _42=createElementWithNS(this.doc,"Extension","http://www.opengis.net/context");
_40=_41.appendChild(_42);
}
return _40.appendChild(_3f);
};
this.getExtension=function(){
return this.doc.selectSingleNode("/wmc:ViewContext/wmc:General/wmc:Extension");
};
this.initTimeExtent=function(_43){
var _44=_43.doc.selectNodes("//wmc:Dimension[@name='time']");
for(var i=0;i<_44.length;++i){
var _46=_44[i];
_43.timestampList=createElementWithNS(_43.doc,"TimestampList",mbNsUrl);
var _47=_46.parentNode.parentNode.selectSingleNode("wmc:Name").firstChild.nodeValue;
_43.timestampList.setAttribute("layerName",_47);
var _48=_46.firstChild.nodeValue.split(",");
for(var j=0;j<_48.length;++j){
var _4a=_48[j].split("/");
if(_4a.length==3){
var _4b=setISODate(_4a[0]);
var _4c=setISODate(_4a[1]);
var _4d=_4a[2];
var _4e=_4d.match(/^P((\d*)Y)?((\d*)M)?((\d*)D)?T?((\d*)H)?((\d*)M)?((.*)S)?/);
for(var i=1;i<_4e.length;++i){
if(!_4e[i]){
_4e[i]=0;
}
}
do{
var _4f=createElementWithNS(_43.doc,"Timestamp",mbNsUrl);
_4f.appendChild(_43.doc.createTextNode(getISODate(_4b)));
_43.timestampList.appendChild(_4f);
_4b.setFullYear(_4b.getFullYear()+parseInt(_4e[2],10));
_4b.setMonth(_4b.getMonth()+parseInt(_4e[4],10));
_4b.setDate(_4b.getDate()+parseInt(_4e[6],10));
_4b.setHours(_4b.getHours()+parseInt(_4e[8],10));
_4b.setMinutes(_4b.getMinutes()+parseInt(_4e[10],10));
_4b.setSeconds(_4b.getSeconds()+parseFloat(_4e[12]));
}while(_4b.getTime()<=_4c.getTime());
}else{
var _4f=createElementWithNS(_43.doc,"Timestamp",mbNsUrl);
_4f.appendChild(_43.doc.createTextNode(_48[j]));
_43.timestampList.appendChild(_4f);
}
}
_43.setExtension(_43.timestampList);
}
};
this.addFirstListener("loadModel",this.initTimeExtent,this);
this.getCurrentTimestamp=function(_50){
var _51=this.getParam("timestamp");
return this.timestampList.childNodes[_51].firstChild.nodeValue;
};
}

function Proj(_1){
this.srs=_1.toUpperCase();
switch(this.srs){
case "EPSG:GMAPS":
this.Forward=identity;
this.Inverse=identity;
this.units="degrees";
this.title="Google Maps";
break;
case "EPSG:4326":
case "EPSG:4269":
case "CRS:84":
case "EPSG:4965":
case new String("http://www.opengis.net/gml/srs/epsg.xml#4326").toUpperCase():
this.Forward=identity;
this.Inverse=identity;
this.units="degrees";
this.title="Lat/Long";
break;
case "EPSG:42101":
this.Init=lccinit;
this.Forward=ll2lcc;
this.Inverse=lcc2ll;
this.Init(new Array(6378137,6356752.314245,49,77,-95,0,0,-8000000));
this.units="meters";
this.title="Lambert Conformal Conic";
break;
case "EPSG:42304":
this.Init=lccinit;
this.Forward=ll2lcc;
this.Inverse=lcc2ll;
this.Init(new Array(6378137,6356752.314,49,77,-95,49,0,0));
this.units="meters";
this.title="Lambert Conformal Conic";
break;
case "EPSG:26986":
this.Init=lccinit;
this.Forward=ll2lcc;
this.Inverse=lcc2ll;
this.Init(new Array(6378137,6356752.314,42.68333333333333,41.71666666666667,-71.5,41,200000,750000));
this.units="meters";
this.title="Massachusetts Mainland (LCC)";
break;
case "EPSG:32761":
case "EPSG:32661":
this.Init=psinit;
this.Forward=ll2ps;
this.Inverse=ps2ll;
this.Init(new Array(6378137,6356752.314245,0,-90,2000000,2000000));
this.units="meters";
this.title="Polar Stereographic";
break;
case "EPSG:27561":
this.Init=lccinit;
this.Forward=ll2lcc;
this.Inverse=lcc2ll;
this.Init(new Array(6378249.2,6356515,49.5,49.5,2.33722916655,49.5,600000,200000));
this.units="meters";
this.title="Lambert Conformal Conic";
break;
case "EPSG:27562":
this.Init=lccinit;
this.Forward=ll2lcc;
this.Inverse=lcc2ll;
this.Init(new Array(6378249.2,6356515,46.8,46.8,2.33722916655,46.8,600000,200000));
this.units="meters";
this.title="Lambert Conformal Conic";
break;
case "EPSG:27572":
case "EPSG:27582":
this.Init=lccinit;
this.Forward=ll2lcc;
this.Inverse=lcc2ll;
this.Init(new Array(6378249.2,6356515,46.8,46.8,2.33722916655,46.8,600000,2200000));
this.units="meters";
this.title="Lambert Conformal Conic";
break;
case "EPSG:27563":
this.Init=lccinit;
this.Forward=ll2lcc;
this.Inverse=lcc2ll;
this.Init(new Array(6378249.2,6356515,44.1,44.1,2.33722916655,44.1,600000,200000));
this.units="meters";
this.title="Lambert Conformal Conic";
break;
case "EPSG:9804":
this.Init=minit;
this.Forward=ll2m;
this.Inverse=m2ll;
this.Init(new Array(wgs84[0],wgs84[1],0,0,0,0));
this.units="meters";
this.title="Mercator";
break;
case "EPSG:27564":
this.Init=lccinit;
this.Forward=ll2lcc;
this.Inverse=lcc2ll;
this.Init(new Array(6378249.2,6356515,42.17,42.17,2.33722916655,42.17,234.358,185861.369));
this.units="meters";
this.title="Lambert Conformal Conic";
break;
case "EPSG:2154":
this.Init=lccinit;
this.Forward=ll2lcc;
this.Inverse=lcc2ll;
this.Init(new Array(6378137,6356752.3141,44,49,3.00000000001,46.5,700000,6600000));
this.units="meters";
this.title="Lambert Conformal Conic";
break;
case "EPSG:4326":
case "EPSG:4269":
case "CRS:84":
case "EPSG:4965":
case new String("http://www.opengis.net/gml/srs/epsg.xml#4326").toUpperCase():
this.Forward=identity;
this.Inverse=identity;
this.units="degrees";
this.title="Lat/Long";
break;
case "EPSG:102758":
this.title="NAD 1983 StatePlane Wyoming West FIPS 4904 US Survey Feet";
this.Init=tminit;
this.Forward=ll2tm;
this.Inverse=tm2ll;
this.Init(new Array(grs80[0],grs80[1],0.9999375,-110.0833333333333,40.5,800000,100000));
this.units="usfeet";
break;
case "EPSG:32158":
this.title="NAD 1983 StatePlane Wyoming West meters";
this.Init=tminit;
this.Forward=ll2tm;
this.Inverse=tm2ll;
this.Init(new Array(grs80[0],grs80[1],0.9999375,-110.0833333333333,40.5,800000,100000));
this.units="meters";
break;
case "EPSG:28992":
this.title="Amersfoort / RD New";
this.Init=stint;
this.Forward=ll2st;
this.Inverse=st2ll;
this.Init(new Array(6377397.155,5.38763888888889,52.15616055555555,155000,463000));
this.units="meters";
break;
case "EPSG:26903":
case "EPSG:26904":
case "EPSG:26905":
case "EPSG:26906":
case "EPSG:26907":
case "EPSG:26908":
case "EPSG:26909":
case "EPSG:26910":
case "EPSG:26911":
case "EPSG:26912":
case "EPSG:26913":
case "EPSG:26914":
case "EPSG:26915":
case "EPSG:26916":
case "EPSG:26917":
case "EPSG:26918":
case "EPSG:26919":
case "EPSG:26920":
case "EPSG:26921":
case "EPSG:26922":
case "EPSG:26923":
this.title="NAD83 / UTM zone "+_1.substr(8,2)+"N";
this.Init=utminit;
this.Forward=ll2tm;
this.Inverse=tm2ll;
this.Init(new Array(grs80[0],grs80[1],0.9996,_1.substr(8,2)));
this.units="meters";
break;
case "EPSG:32601":
case "EPSG:32602":
case "EPSG:32603":
case "EPSG:32604":
case "EPSG:32605":
case "EPSG:32606":
case "EPSG:32607":
case "EPSG:32608":
case "EPSG:32609":
case "EPSG:32610":
case "EPSG:32611":
case "EPSG:32612":
case "EPSG:32613":
case "EPSG:32614":
case "EPSG:32615":
case "EPSG:32616":
case "EPSG:32617":
case "EPSG:32618":
case "EPSG:32619":
case "EPSG:32620":
case "EPSG:32621":
case "EPSG:32622":
case "EPSG:32623":
case "EPSG:32624":
case "EPSG:32625":
case "EPSG:32626":
case "EPSG:32627":
case "EPSG:32628":
case "EPSG:32629":
case "EPSG:32630":
case "EPSG:32631":
case "EPSG:32632":
case "EPSG:32633":
case "EPSG:32634":
case "EPSG:32635":
case "EPSG:32636":
case "EPSG:32637":
case "EPSG:32638":
case "EPSG:32639":
case "EPSG:32640":
case "EPSG:32641":
case "EPSG:32642":
case "EPSG:32643":
case "EPSG:32644":
case "EPSG:32645":
case "EPSG:32646":
case "EPSG:32647":
case "EPSG:32648":
case "EPSG:32649":
case "EPSG:32650":
case "EPSG:32651":
case "EPSG:32652":
case "EPSG:32653":
case "EPSG:32654":
case "EPSG:32655":
case "EPSG:32656":
case "EPSG:32657":
case "EPSG:32658":
case "EPSG:32659":
case "EPSG:32660":
this.title="WGS84 / UTM zone "+_1.substr(8,2)+"N";
this.Init=utminit;
this.Forward=ll2tm;
this.Inverse=tm2ll;
this.Init(new Array(wgs84[0],wgs84[1],0.9996,_1.substr(8,2)));
this.units="meters";
break;
case "EPSG:32701":
case "EPSG:32702":
case "EPSG:32703":
case "EPSG:32704":
case "EPSG:32705":
case "EPSG:32706":
case "EPSG:32707":
case "EPSG:32708":
case "EPSG:32709":
case "EPSG:32710":
case "EPSG:32711":
case "EPSG:32712":
case "EPSG:32713":
case "EPSG:32714":
case "EPSG:32715":
case "EPSG:32716":
case "EPSG:32717":
case "EPSG:32718":
case "EPSG:32719":
case "EPSG:32720":
case "EPSG:32721":
case "EPSG:32722":
case "EPSG:32723":
case "EPSG:32724":
case "EPSG:32725":
case "EPSG:32726":
case "EPSG:32727":
case "EPSG:32728":
case "EPSG:32729":
case "EPSG:32730":
case "EPSG:32731":
case "EPSG:32732":
case "EPSG:32733":
case "EPSG:32734":
case "EPSG:32735":
case "EPSG:32736":
case "EPSG:32737":
case "EPSG:32738":
case "EPSG:32739":
case "EPSG:32740":
case "EPSG:32741":
case "EPSG:32742":
case "EPSG:32743":
case "EPSG:32744":
case "EPSG:32745":
case "EPSG:32746":
case "EPSG:32747":
case "EPSG:32748":
case "EPSG:32749":
case "EPSG:32750":
case "EPSG:32751":
case "EPSG:32752":
case "EPSG:32753":
case "EPSG:32754":
case "EPSG:32755":
case "EPSG:32756":
case "EPSG:32757":
case "EPSG:32758":
case "EPSG:32759":
case "EPSG:32760":
this.title="WGS84 / UTM zone "+_1.substr(8,2)+"S";
this.Init=utminit;
this.Forward=ll2tm;
this.Inverse=tm2ll;
this.Init(new Array(wgs84[0],wgs84[1],0.9996,"-"+_1.substr(8,2)));
this.units="meters";
break;
case "EPSG:26591":
this.title="Monte Mario (Rome) / Italy zone 1";
this.Init=tminit;
this.Forward=ll2tm;
this.Inverse=tm2ll;
this.Init(new Array(6378388,6356911.94612795,0.9996,9,0,1500000,0));
this.units="meters";
break;
case "SCENE":
this.Init=sceneInit;
this.Forward=ll2scene;
this.Inverse=scene2ll;
this.GetXYCoords=identity;
this.GetPLCoords=identity;
break;
case "PIXEL":
this.Forward=ll2pixel;
this.Inverse=pixel2ll;
this.units="pixels";
this.GetXYCoords=identity;
this.GetPLCoords=identity;
break;
default:
alert("unsupported map projection: "+this.srs);
}
this.matchSrs=function(_2){
if(this.srs==_2.toUpperCase()){
return true;
}
return false;
};
}
function gmap_forward(_3){
return config.objects.googleMapTools.getPixelsFromLatLong(_3);
}
function gmap_inverse(_4){
return config.objects.googleMapTools.getLatLongFromPixels(_4);
}
function identity(_5){
return _5;
}
function ll2scene(_6){
alert("ll2scene not defined");
return null;
}
function scene2ll(_7){
var _8=(_7[0]-this.ul[0])/(this.lr[0]-this.ul[0]);
var _9=(_7[1]-this.ul[1])/(this.lr[1]-this.ul[1]);
var _a=bilinterp(_8,_9,this.cul[0],this.cur[0],this.cll[0],this.clr[0]);
var _b=bilinterp(_8,_9,this.cul[1],this.cur[1],this.cll[1],this.clr[1]);
return new Array(_a,_b);
}
function sceneInit(_c){
this.cul=_c[0];
this.cur=_c[1];
this.cll=_c[2];
this.clr=_c[3];
}
function bilinterp(x,y,a,b,c,d){
var top=x*(b-a)+a;
var bot=x*(d-c)+c;
return y*(bot-top)+top;
}
function ll2pixel(_15){
alert("ll2pixel not defined");
return null;
}
function pixel2ll(_16){
alert("pixel2ll not defined");
return null;
}
var PI=Math.PI;
var HALF_PI=PI*0.5;
var TWO_PI=PI*2;
var EPSLN=1e-10;
var R2D=57.2957795131;
var D2R=0.0174532925199;
var R=6370997;
function lccinit(_17){
this.r_major=_17[0];
this.r_minor=_17[1];
var _18=_17[2]*D2R;
var _19=_17[3]*D2R;
this.center_lon=_17[4]*D2R;
this.center_lat=_17[5]*D2R;
this.false_easting=_17[6];
this.false_northing=_17[7];
if(Math.abs(_18+_19)<EPSLN){
alert("Equal Latitiudes for St. Parallels on opposite sides of equator - lccinit");
return;
}
var _1a=this.r_minor/this.r_major;
this.e=Math.sqrt(1-_1a*_1a);
var _1b=Math.sin(_18);
var _1c=Math.cos(_18);
var ms1=msfnz(this.e,_1b,_1c);
var ts1=tsfnz(this.e,_18,_1b);
var _1f=Math.sin(_19);
var _20=Math.cos(_19);
var ms2=msfnz(this.e,_1f,_20);
var ts2=tsfnz(this.e,_19,_1f);
var ts0=tsfnz(this.e,this.center_lat,Math.sin(this.center_lat));
if(Math.abs(_18-_19)>EPSLN){
this.ns=Math.log(ms1/ms2)/Math.log(ts1/ts2);
}else{
this.ns=_1b;
}
this.f0=ms1/(this.ns*Math.pow(ts1,this.ns));
this.rh=this.r_major*this.f0*Math.pow(ts0,this.ns);
}
function ll2lcc(_24){
var lon=_24[0];
var lat=_24[1];
if(lat<=90&&lat>=-90&&lon<=180&&lon>=-180){
lat*=D2R;
lon*=D2R;
}else{
alert("*** Input out of range ***: lon: "+lon+" - lat: "+lat);
return null;
}
var con=Math.abs(Math.abs(lat)-HALF_PI);
var ts;
if(con>EPSLN){
ts=tsfnz(this.e,lat,Math.sin(lat));
rh1=this.r_major*this.f0*Math.pow(ts,this.ns);
}else{
con=lat*this.ns;
if(con<=0){
alert("Point can not be projected - ll2lcc");
return null;
}
rh1=0;
}
var _29=this.ns*adjust_lon(lon-this.center_lon);
var x=rh1*Math.sin(_29)+this.false_easting;
var y=this.rh-rh1*Math.cos(_29)+this.false_northing;
return new Array(x,y);
}
function lcc2ll(_2c){
var rh1,con,ts;
var lat,lon;
x=_2c[0]-this.false_easting;
y=this.rh-_2c[1]+this.false_northing;
if(this.ns>0){
rh1=Math.sqrt(x*x+y*y);
con=1;
}else{
rh1=-Math.sqrt(x*x+y*y);
con=-1;
}
var _2f=0;
if(rh1!=0){
_2f=Math.atan2((con*x),(con*y));
}
if((rh1!=0)||(this.ns>0)){
con=1/this.ns;
ts=Math.pow((rh1/(this.r_major*this.f0)),con);
lat=phi2z(this.e,ts);
if(lat==-9999){
return null;
}
}else{
lat=-HALF_PI;
}
lon=adjust_lon(_2f/this.ns+this.center_lon);
return new Array(R2D*lon,R2D*lat);
}
function psinit(_30){
this.r_major=_30[0];
this.r_minor=_30[1];
this.center_lon=_30[2]*D2R;
this.center_lat=_30[3]*D2R;
this.false_easting=_30[4];
this.false_northing=_30[5];
var _31=this.r_minor/this.r_major;
this.e=1-_31*_31;
this.e=Math.sqrt(this.e);
var con=1+this.e;
var com=1-this.e;
this.e4=Math.sqrt(Math.pow(con,con)*Math.pow(com,com));
this.fac=(this.center_lat<0)?-1:1;
this.ind=0;
if(Math.abs(Math.abs(this.center_lat)-HALF_PI)>EPSLN){
this.ind=1;
var _34=this.fac*this.center_lat;
var _35=Math.sin(_34);
this.mcs=msfnz(this.e,_35,Math.cos(_34));
this.tcs=tsfnz(this.e,_34,_35);
}
}
function ll2ps(_36){
var lon=_36[0];
var lat=_36[1];
var _39=this.fac*adjust_lon(lon-this.center_lon);
var _3a=this.fac*lat;
var _3b=Math.sin(_3a);
var ts=tsfnz(this.e,_3a,_3b);
if(this.ind!=0){
rh=this.r_major*this.mcs*ts/this.tcs;
}else{
rh=2*this.r_major*ts/this.e4;
}
var x=this.fac*rh*Math.sin(_39)+this.false_easting;
var y=-this.fac*rh*Math.cos(_39)+this.false_northing;
return new Array(x,y);
}
function ps2ll(_3f){
x=(_3f[0]-this.false_easting)*this.fac;
y=(_3f[1]-this.false_northing)*this.fac;
var rh=Math.sqrt(x*x+y*y);
if(this.ind!=0){
ts=rh*this.tcs/(this.r_major*this.mcs);
}else{
ts=rh*this.e4/(this.r_major*2);
}
var lat=this.fac*phi2z(this.e,ts);
if(lat==-9999){
return null;
}
var lon=0;
if(rh==0){
lon=this.fac*this.center_lon;
}else{
lon=adjust_lon(this.fac*Math.atan2(x,-y)+this.center_lon);
}
return new Array(R2D*lon,R2D*lat);
}
function semi_minor(a,f){
return a-(a*(1/f));
}
var grs80=new Array(6378137,6356752.31414036);
var wgs84=new Array(6378137,6356752.31424518);
var wgs72=new Array(6378135,6356750.52001609);
var intl=new Array(6378388,6356911.94612795);
var usfeet=1200/3937;
var feet=0.3048;
function e0fn(x){
return (1-0.25*x*(1+x/16*(3+1.25*x)));
}
function e1fn(x){
return (0.375*x*(1+0.25*x*(1+0.46875*x)));
}
function e2fn(x){
return (0.05859375*x*x*(1+0.75*x));
}
function e3fn(x){
return (x*x*x*(35/3072));
}
function mlfn(e0,e1,e2,e3,phi){
return (e0*phi-e1*Math.sin(2*phi)+e2*Math.sin(4*phi)-e3*Math.sin(6*phi));
}
function tminit(_4e){
this.r_maj=_4e[0];
this.r_min=_4e[1];
this.scale_fact=_4e[2];
this.lon_center=_4e[3]*D2R;
this.lat_origin=_4e[4]*D2R;
this.false_easting=_4e[5];
this.false_northing=_4e[6];
var _4f=this.r_min/this.r_maj;
this.es=1-Math.pow(_4f,2);
this.e0=e0fn(this.es);
this.e1=e1fn(this.es);
this.e2=e2fn(this.es);
this.e3=e3fn(this.es);
this.ml0=this.r_maj*mlfn(this.e0,this.e1,this.e2,this.e3,this.lat_origin);
this.esp=this.es/(1-this.es);
this.ind=(this.es<0.00001)?1:0;
}
function utminit(_50){
this.r_maj=_50[0];
this.r_min=_50[1];
this.scale_fact=_50[2];
var _51=_50[3];
this.lat_origin=0;
this.lon_center=((6*Math.abs(_51))-183)*D2R;
this.false_easting=500000;
this.false_northing=(_51<0)?10000000:0;
var _52=this.r_min/this.r_maj;
this.es=1-Math.pow(_52,2);
this.e0=e0fn(this.es);
this.e1=e1fn(this.es);
this.e2=e2fn(this.es);
this.e3=e3fn(this.es);
this.ml0=this.r_maj*mlfn(this.e0,this.e1,this.e2,this.e3,this.lat_origin);
this.esp=this.es/(1-this.es);
this.ind=(this.es<0.00001)?1:0;
}
function ll2tm(_53){
var lon=_53[0]*D2R;
var lat=_53[1]*D2R;
var _56=adjust_lon(lon-this.lon_center);
var con;
var x,y;
var _59=Math.sin(lat);
var _5a=Math.cos(lat);
if(this.ind!=0){
var b=_5a*Math.sin(_56);
if((Math.abs(Math.abs(b)-1))<1e-10){
alert("Error in ll2tm(): Point projects into infinity");
return (93);
}else{
x=0.5*this.r_maj*this.scale_fact*Math.log((1+b)/(1-b));
con=Math.acos(_5a*Math.cos(_56)/Math.sqrt(1-b*b));
if(lat<0){
con=-con;
}
y=this.r_maj*this.scale_fact*(con-this.lat_origin);
}
}else{
var al=_5a*_56;
var als=Math.pow(al,2);
var c=this.esp*Math.pow(_5a,2);
var tq=Math.tan(lat);
var t=Math.pow(tq,2);
con=1-this.es*Math.pow(_59,2);
var n=this.r_maj/Math.sqrt(con);
var ml=this.r_maj*mlfn(this.e0,this.e1,this.e2,this.e3,lat);
x=this.scale_fact*n*al*(1+als/6*(1-t+c+als/20*(5-18*t+Math.pow(t,2)+72*c-58*this.esp)))+this.false_easting;
y=this.scale_fact*(ml-this.ml0+n*tq*(als*(0.5+als/24*(5-t+9*c+4*Math.pow(c,2)+als/30*(61-58*t+Math.pow(t,2)+600*c-330*this.esp)))))+this.false_northing;
switch(this.units){
case "usfeet":
x/=usfeet;
y/=usfeet;
break;
case "feet":
x=x/feet;
y=y/feet;
break;
}
}
return new Array(x,y);
}
function tm2ll(_63){
var x=_63[0];
var y=_63[1];
var con,phi;
var _67;
var i;
var _69=6;
var lat,lon;
if(this.ind!=0){
var f=exp(x/(this.r_maj*this.scale_fact));
var g=0.5*(f-1/f);
var _6d=this.lat_origin+y/(this.r_maj*this.scale_fact);
var h=cos(_6d);
con=sqrt((1-h*h)/(1+g*g));
lat=asinz(con);
if(_6d<0){
lat=-lat;
}
if((g==0)&&(h==0)){
lon=this.lon_center;
}else{
lon=adjust_lon(atan2(g,h)+this.lon_center);
}
}else{
x=x-this.false_easting;
y=y-this.false_northing;
con=(this.ml0+y/this.scale_fact)/this.r_maj;
phi=con;
for(i=0;;i++){
_67=((con+this.e1*Math.sin(2*phi)-this.e2*Math.sin(4*phi)+this.e3*Math.sin(6*phi))/this.e0)-phi;
phi+=_67;
if(Math.abs(_67)<=EPSLN){
break;
}
if(i>=_69){
alert("Error in tm2ll(): Latitude failed to converge");
return (95);
}
}
if(Math.abs(phi)<HALF_PI){
var _6f=Math.sin(phi);
var _70=Math.cos(phi);
var _71=Math.tan(phi);
var c=this.esp*Math.pow(_70,2);
var cs=Math.pow(c,2);
var t=Math.pow(_71,2);
var ts=Math.pow(t,2);
con=1-this.es*Math.pow(_6f,2);
var n=this.r_maj/Math.sqrt(con);
var r=n*(1-this.es)/con;
var d=x/(n*this.scale_fact);
var ds=Math.pow(d,2);
lat=phi-(n*_71*ds/r)*(0.5-ds/24*(5+3*t+10*c-4*cs-9*this.esp-ds/30*(61+90*t+298*c+45*ts-252*this.esp-3*cs)));
lon=adjust_lon(this.lon_center+(d*(1-ds/6*(1+2*t+c-ds/20*(5-2*c+28*t-3*cs+8*this.esp+24*ts)))/_70));
}else{
lat=HALF_PI*sign(y);
lon=this.lon_center;
}
}
return new Array(lon*R2D,lat*R2D);
}
function msfnz(_7a,_7b,_7c){
var con=_7a*_7b;
return _7c/(Math.sqrt(1-con*con));
}
function tsfnz(_7e,phi,_80){
var con=_7e*_80;
var com=0.5*_7e;
con=Math.pow(((1-con)/(1+con)),com);
return (Math.tan(0.5*(HALF_PI-phi))/con);
}
function phi2z(_83,ts){
var _85=0.5*_83;
var con,dphi;
var phi=HALF_PI-2*Math.atan(ts);
for(i=0;i<=15;i++){
con=_83*Math.sin(phi);
dphi=HALF_PI-2*Math.atan(ts*(Math.pow(((1-con)/(1+con)),_85)))-phi;
phi+=dphi;
if(Math.abs(dphi)<=1e-10){
return phi;
}
}
alert("Convergence error - phi2z");
return -9999;
}
function sign(x){
if(x<0){
return (-1);
}else{
return (1);
}
}
function adjust_lon(x){
x=(Math.abs(x)<PI)?x:(x-(sign(x)*TWO_PI));
return (x);
}
function stint(_8a){
this.r_major=_8a[0];
this.lon_center=_8a[1]*D2R;
this.lat_center=_8a[2]*D2R;
this.false_easting=_8a[3];
this.false_northing=_8a[4];
this.sin_p10=Math.sin(this.lat_center);
this.cos_p10=Math.cos(this.lat_center);
}
function ll2st(_8b){
var lon=_8b[0];
var lat=_8b[1];
var ksp;
if(lat<=90&&lat>=-90&&lon<=180&&lon>=-180){
lat*=D2R;
lon*=D2R;
}else{
alert("Error. Input out of range: lon: "+lon+" - lat: "+lat);
return null;
}
var _8f=adjust_lon(lon-this.lon_center);
var _90=Math.sin(lat);
var _91=Math.cos(lat);
var _92=Math.cos(_8f);
var g=this.sin_p10*_90+this.cos_p10*_91*_92;
if(Math.abs(g+1)<=EPSLN){
alert("Error. Point projects into infinity - st2ll()");
return null;
}else{
ksp=2/(1+g);
var x=this.false_easting+this.r_major*ksp*_91*Math.sin(_8f);
var y=this.false_northing+this.r_major*ksp*(this.cos_p10*_90-this.sin_p10*_91*_92);
return new Array(x,y);
}
}
function st2ll(_96){
var x=(_96[0]-this.false_easting);
var y=(_96[1]-this.false_northing);
var rh=Math.sqrt(x*x+y*y);
var z=2*Math.atan(rh/(2*this.r_major));
var _9b=Math.sin(z);
var _9c=Math.cos(z);
var lat;
var lon=this.lon_center;
if(Math.abs(rh)<=EPSLN){
lat=this.lat_center;
}else{
lat=Math.asin(_9c*this.sin_p10+(y*_9b*this.cos_p10)/rh);
var con=Math.abs(this.lat_center)-HALF_PI;
if(Math.abs(con)<=EPSLN){
if(this.lat_center>=0){
lon=adjust_lon(lon_center+atan2(x,-y));
}else{
lon=adjust_lon(lon_center-atan2(-x,y));
}
}else{
con=_9c-this.sin_p10*Math.sin(lat);
if((Math.abs(con)<EPSLN)&&(Math.abs(x)<EPSLN)){
}else{
lon=adjust_lon(this.lon_center+Math.atan2((x*_9b*this.cos_p10),(con*rh)));
}
}
}
return new Array(R2D*lon,R2D*lat);
}
function minit(_a0){
this.r_major=_a0[0];
this.r_minor=_a0[1];
this.lon_center=_a0[2];
this.lat_origin=_a0[3];
this.false_northing=_a0[4];
this.false_easting=_a0[5];
this.temp=this.r_minor/this.r_major;
this.es=1-Math.sqrt(this.temp);
this.e=Math.sqrt(this.es);
this.m1=Math.cos(this.lat_origin)/(Math.sqrt(1-this.es*Math.sin(this.lat_origin)*Math.sin(this.lat_origin)));
}
function ll2m(_a1){
var lon=_a1[0];
var lat=_a1[1];
if(lat<=90&&lat>=-90&&lon<=180&&lon>=-180){
lat*=D2R;
lon*=D2R;
}else{
alert("*** Input out of range ***: lon: "+lon+" - lat: "+lat);
return null;
}
if(Math.abs(Math.abs(lat)-HALF_PI)<=EPSLN){
alert("Transformation cannot be computed at the poles");
return null;
}else{
var _a4=Math.sin(lat);
var ts=tsfnz(this.e,lat,_a4);
var x=this.false_easting+this.r_major*this.m1*adjust_lon(lon-this.lon_center);
var y=this.false_northing-this.r_major*this.m1*Math.log(ts);
}
return new Array(x,y);
}
function m2ll(_a8){
var x=_a8[0];
var y=_a8[1];
x-=this.false_easting;
y-=this.false_northing;
var ts=Math.exp(-y/(this.r_major*this.m1));
var lat=phi2z(this.e,ts);
if(lat==-9999){
alert("lat = -9999");
return null;
}
var lon=adjust_lon(this.lon_center+x/(this.r_major*this.m1));
return new Array(R2D*lon,R2D*lat);
}

function StyledLayerDescriptor(_1,_2){
ModelBase.apply(this,new Array(_1,_2));
this.namespace="xmlns:sld='http://www.opengis.net/sld' xmlns:mb='http://mapbuilder.sourceforge.net/mapbuilder' xmlns:wmc='http://www.opengis.net/context' xmlns:wms='http://www.opengis.net/wms' xmlns:xsl='http://www.w3.org/1999/XSL/Transform' xmlns:ogc='http://www.opengis.net/ogc' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:wfs='http://www.opengis.net/wfs'";
this.getSldNode=function(){
return this.doc.selectSingleNode("/StyledLayerDescriptor");
};
}

function WpsDescribeProcess(_1,_2){
ModelBase.apply(this,new Array(_1,_2));
this.namespace="xmlns:wps='http://www.opengis.net/wps' xmlns:ows='http://www.opengis.net/ows' xmlns:xlink='http://www.w3.org/1999/xlink'";
this.getServerUrl=function(_3,_4,_5){
return this.parentModel.getServerUrl(_3,_4,_5);
};
this.getVersion=function(){
var _6="/wps:ProcessDescription";
return this.doc.selectSingleNode(_6).getAttribute("version");
};
this.getMethod=function(){
return this.method;
};
this.getFeatureNode=function(_7){
return this.doc.selectSingleNode(this.nodeSelectXpath+"[wps:Name='"+_7+"']");
};
}

function Config(_1){
this.doc=Sarissa.getDomDocument();
this.doc.async=false;
this.doc.validateOnParse=false;
this.doc.load(_1);
if(this.doc.parseError<0){
alert("error loading config document: "+_1);
}
this.url=_1;
this.namespace="xmlns:mb='"+mbNsUrl+"'";
this.doc.setProperty("SelectionLanguage","XPath");
Sarissa.setXpathNamespaces(this.doc,this.namespace);
var _2=Sarissa.getDomDocument();
_2.async=false;
_2.validateOnParse=false;
_2.load(baseDir+"/"+mbServerConfig);
if(_2.parseError<0){
}else{
_2.setProperty("SelectionLanguage","XPath");
Sarissa.setXpathNamespaces(_2,this.namespace);
var _3=_2.selectSingleNode("/mb:MapbuilderConfig/mb:proxyUrl");
if(_3){
this.proxyUrl=_3.firstChild.nodeValue;
}
_3=_2.selectSingleNode("/mb:MapbuilderConfig/mb:serializeUrl");
if(_3){
this.serializeUrl=_3.firstChild.nodeValue;
}
}
_2=null;
this.loadConfigScripts=function(){
mapbuilder.loadScriptsFromXpath(this.doc.selectNodes("//mb:models/*"),"model/");
mapbuilder.loadScriptsFromXpath(this.doc.selectNodes("//mb:widgets/*"),"widget/");
mapbuilder.loadScriptsFromXpath(this.doc.selectNodes("//mb:tools/*"),"tool/");
var _4=this.doc.selectNodes("//mb:scriptFile");
for(var i=0;i<_4.length;i++){
scriptFile=_4[i].firstChild.nodeValue;
mapbuilder.loadScript(scriptFile);
}
};
this.lang="en";
if(window.cgiArgs["language"]){
this.lang=window.cgiArgs["language"];
}else{
if(window.language){
this.lang=window.language;
}
}
var _6=this.doc.documentElement;
this.skinDir=_6.selectSingleNode("mb:skinDir").firstChild.nodeValue;
var _7=_6.selectSingleNode("mb:proxyUrl");
if(_7){
this.proxyUrl=_7.firstChild.nodeValue;
}
var _8=_6.selectSingleNode("mb:serializeUrl");
if(_8){
this.serializeUrl=_8.firstChild.nodeValue;
}
var _9=_6.selectSingleNode("mb:widgetTextUrl");
if(_9){
var _a=this.skinDir+"/"+this.lang+"/"+_9.firstChild.nodeValue;
this.widgetText=Sarissa.getDomDocument();
this.widgetText.async=false;
this.widgetText.validateOnParse=false;
this.widgetText.load(_a);
if(this.widgetText.parseError<0){
alert("error loading widgetText document: "+_a);
}
this.widgetText.setProperty("SelectionLanguage","XPath");
Sarissa.setXpathNamespaces(this.widgetText,this.namespace);
}
this.objects=new Object();
ModelBase.apply(this,new Array(_6));
this.loadModel=function(_b,_c){
var _d=this.objects[_b];
if(_d&&_c){
var _e=new Object();
_e.method=_d.method;
_e.url=_c;
_d.newRequest(_d,_e);
}else{
alert("config loadModel error:"+_b+":"+_c);
}
};
this.paintWidget=function(_f){
if(_f){
_f.paint(_f,_f.id);
}else{
alert("config paintWidget error: widget does not exist");
}
};
}
if(document.readyState==null){
mapbuilder.setLoadState(MB_LOAD_CONFIG);
config=new Config(mbConfigUrl);
config[config.id]=config;
config.loadConfigScripts();
}

function OwsContext(_1,_2){
ModelBase.apply(this,new Array(_1,_2));
this.namespace="xmlns:wmc='http://www.opengis.net/context' xmlns:ows='http://www.opengis.net/ows' xmlns:ogc='http://www.opengis.net/ogc' xmlns:xsl='http://www.w3.org/1999/XSL/Transform' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:gml='http://www.opengis.net/gml' xmlns:wfs='http://www.opengis.net/wfs' xmlns:sld='http://www.opengis.net/sld'";
this.setHidden=function(_3,_4){
var _5="0";
if(_4){
_5="1";
}
var _6=this.getFeatureNode(_3);
_6.setAttribute("hidden",_5);
this.callListeners("hidden",_3);
};
this.getHidden=function(_7){
var _8=1;
var _9=this.getFeatureNode(_7);
return _9.getAttribute("hidden");
};
this.getBoundingBox=function(){
var _a=this.doc.selectSingleNode("/wmc:OWSContext/wmc:General/ows:BoundingBox/ows:LowerCorner");
var _b=this.doc.selectSingleNode("/wmc:OWSContext/wmc:General/ows:BoundingBox/ows:UpperCorner");
var _c=new String(_a.firstChild.nodeValue+" "+_b.firstChild.nodeValue).split(" ");
var _d=new Array();
for(i=0;i<_c.length;++i){
_d[i]=parseFloat(_c[i]);
}
return _d;
};
this.setBoundingBox=function(_e){
var _f=this.doc.selectSingleNode("/wmc:OWSContext/wmc:General/ows:BoundingBox/ows:LowerCorner");
_f.firstChild.nodeValue=_e[0]+" "+_e[1];
var _10=this.doc.selectSingleNode("/wmc:OWSContext/wmc:General/ows:BoundingBox/ows:UpperCorner");
_10.firstChild.nodeValue=_e[2]+" "+_e[3];
this.callListeners("bbox",_e);
};
this.getBaseLayerService=function(){
x=this.doc.selectSingleNode("/wmc:OWSContext/wmc:ResourceList/wmc:Layer[last()]/wmc:Server");
s=x.getAttribute("service");
return s;
};
this.initBbox=function(_11){
if(window.cgiArgs["bbox"]){
var _12=window.cgiArgs["bbox"].split(",");
_11.setBoundingBox(_12);
}
};
this.addListener("loadModel",this.initBbox,this);
this.initAoi=function(_13){
if(window.cgiArgs["aoi"]){
var aoi=window.cgiArgs["aoi"].split(",");
_13.setParam("aoi",new Array(new Array(aoi[0],aoi[3]),new Array(aoi[2],aoi[1])));
}
};
this.addListener("loadModel",this.initAoi,this);
this.setSRS=function(srs){
var _16=this.doc.selectSingleNode("/wmc:OWSContext/wmc:General/ows:BoundingBox");
_16.setAttribute("crs",srs);
this.callListeners("srs");
};
this.getSRS=function(){
if(this.doc){
var _17=this.doc.selectSingleNode("/wmc:OWSContext/wmc:General/ows:BoundingBox");
srs=_17.getAttribute("crs");
return srs;
}
};
this.getWindowWidth=function(){
if(this.doc){
var win=this.doc.selectSingleNode("/wmc:OWSContext/wmc:General/wmc:Window");
width=win.getAttribute("width");
return width;
}
};
this.setWindowWidth=function(_19){
var win=this.doc.selectSingleNode("/wmc:OWSContext/wmc:General/wmc:Window");
win.setAttribute("width",_19);
this.callListeners("resize");
};
this.getWindowHeight=function(){
if(this.doc){
var win=this.doc.selectSingleNode("/wmc:OWSContext/wmc:General/wmc:Window");
height=win.getAttribute("height");
return height;
}
};
this.setWindowHeight=function(_1c){
var win=this.doc.selectSingleNode("/wmc:OWSContext/wmc:General/wmc:Window");
win.setAttribute("height",_1c);
this.callListeners("resize");
};
this.getServerUrl=function(_1e,_1f,_20){
return _20.selectSingleNode("wmc:Server/wmc:OnlineResource").getAttribute("xlink:href");
};
this.getVersion=function(_21){
return _21.selectSingleNode("wmc:Server").getAttribute("version");
};
this.getMethod=function(_22){
return _22.selectSingleNode("wmc:Server/wmc:OnlineResource").getAttribute("wmc:method");
};
this.getFeatureNode=function(_23){
if(this.doc){
var _24=this.doc.selectSingleNode("//wmc:ResourceList/*[wmc:Name='"+_23+"']");
if(_24==null){
alert("feature not found");
}
return _24;
}
};
this.loadFeatures=function(_25){
var _26=_25.nodeSelectXpath+"/wmc:FeatureType[wmc:Server/@service='OGC:WFS']/wmc:Name";
var _27=_25.doc.selectNodes(_26);
for(var i=0;i<_27.length;i++){
var _29=_27[i].firstChild.nodeValue;
_25.setParam("wfs_GetFeature",_29);
}
};
this.addListener("loadModel",this.loadFeatures,this);
this.setRequestParameters=function(_2a,_2b){
var _2c=this.getFeatureNode(_2a);
if(_2c.selectSingleNode("ogc:Filter")){
_2b.setParameter("filter",escape(Sarissa.serialize(_2c.selectSingleNode("ogc:Filter"))));
}
};
this.getQueryableLayers=function(){
var _2d=this.doc.selectNodes("/wmc:OWSContext/wmc:ResourceList/wmc:Layer[attribute::queryable='1']/wmc:Name");
return _2d;
};
this.getAllLayers=function(){
listNodeArray=this.doc.selectNodes("//wmc:Layer|//wmc:FeatureType");
return listNodeArray;
};
this.getLayer=function(_2e){
var _2f=this.doc.selectSingleNode("/wmc:OWSContext/wmc:ResourceList/wmc:Layer[wmc:Name='"+_2e+"']");
if(_2f==null){
_2f=this.doc.selectSingleNode("/wmc:OWSContext/wmc:ResourceList/wmc:RssLayer[@id='"+_2e+"']");
}
return _2f;
};
this.addLayer=function(_30,_31){
if(_30.doc!=null){
var _32=_30.doc.selectSingleNode("/wmc:OWSContext/wmc:ResourceList");
var id=_31.getAttribute("id");
var str="/wmc:OWSContext/wmc:ResourceList/"+_31.nodeName+"[@id='"+id+"']";
var _35=_30.doc.selectSingleNode(str);
if(_35!=null){
_32.removeChild(_35);
}
_32.appendChild(_31.cloneNode(true));
_30.modified=true;
}else{
alert("null OWSContext doc");
}
};
this.addFirstListener("addLayer",this.addLayer,this);
this.deleteLayer=function(_36,_37){
var _38=_36.getLayer(_37);
if(!_38){
alert("node note found; unable to delete node:"+_37);
return;
}
_38.parentNode.removeChild(_38);
_36.modified=true;
};
this.addFirstListener("deleteLayer",this.deleteLayer,this);
this.moveLayerUp=function(_39,_3a){
var _3b=_39.getLayer(_3a);
var _3c=_3b.selectSingleNode("following-sibling::*");
if(!_3c){
alert("can't move node past beginning of list:"+_3a);
return;
}
_3b.parentNode.insertBefore(_3c,_3b);
_39.modified=true;
};
this.addFirstListener("moveLayerUp",this.moveLayerUp,this);
this.moveLayerDown=function(_3d,_3e){
var _3f=_3d.getLayer(_3e);
var _40=_3f.selectNodes("preceding-sibling::*");
var _41=_40[_40.length-1];
if(!_41){
alert("can't move node past beginning of list:"+_3e);
return;
}
_3f.parentNode.insertBefore(_3f,_41);
_3d.modified=true;
};
this.addFirstListener("moveLayerDown",this.moveLayerDown,this);
this.setExtension=function(_42){
var _43=this.doc.selectSingleNode("/wmc:OWSContext/wmc:General/wmc:Extension");
if(!_43){
var _44=this.doc.selectSingleNode("/wmc:OWSContext/wmc:General");
var _45=createElementWithNS(this.doc,"Extension","http://www.opengis.net/context");
_43=_44.appendChild(_45);
}
return _43.appendChild(_42);
};
this.getExtension=function(){
return this.doc.selectSingleNode("/wmc:OWSContext/wmc:General/wmc:Extension");
};
this.initTimeExtent=function(_46){
var _47=_46.doc.selectNodes("//wmc:Dimension[@name='time']");
for(var i=0;i<_47.length;++i){
var _49=_47[i];
_46.timestampList=createElementWithNS(_46.doc,"TimestampList",mbNsUrl);
var _4a=_49.parentNode.parentNode.selectSingleNode("wmc:Name").firstChild.nodeValue;
_46.timestampList.setAttribute("layerName",_4a);
var _4b=_49.firstChild.nodeValue.split(",");
for(var j=0;j<_4b.length;++j){
var _4d=_4b[j].split("/");
if(_4d.length==3){
var _4e=setISODate(_4d[0]);
var _4f=setISODate(_4d[1]);
var _50=_4d[2];
var _51=_50.match(/^P((\d*)Y)?((\d*)M)?((\d*)D)?T?((\d*)H)?((\d*)M)?((.*)S)?/);
for(var i=1;i<_51.length;++i){
if(!_51[i]){
_51[i]=0;
}
}
do{
var _52=createElementWithNS(_46.doc,"Timestamp",mbNsUrl);
_52.appendChild(_46.doc.createTextNode(getISODate(_4e)));
_46.timestampList.appendChild(_52);
_4e.setFullYear(_4e.getFullYear()+parseInt(_51[2],10));
_4e.setMonth(_4e.getMonth()+parseInt(_51[4],10));
_4e.setDate(_4e.getDate()+parseInt(_51[6],10));
_4e.setHours(_4e.getHours()+parseInt(_51[8],10));
_4e.setMinutes(_4e.getMinutes()+parseInt(_51[10],10));
_4e.setSeconds(_4e.getSeconds()+parseFloat(_51[12]));
}while(_4e.getTime()<=_4f.getTime());
}else{
var _52=createElementWithNS(_46.doc,"Timestamp",mbNsUrl);
_52.appendChild(_46.doc.createTextNode(_4b[j]));
_46.timestampList.appendChild(_52);
}
}
_46.setExtension(_46.timestampList);
}
};
this.addFirstListener("loadModel",this.initTimeExtent,this);
this.getCurrentTimestamp=function(_53){
var _54=this.getParam("timestamp");
return this.timestampList.childNodes[_54].firstChild.nodeValue;
};
}

function WfsCapabilities(_1,_2){
ModelBase.apply(this,new Array(_1,_2));
this.namespace="xmlns:wfs='http://www.opengis.net/wfs'";
this.getServerUrl=function(_3,_4,_5){
var _6="/wfs:WFS_Capabilities/wfs:Capability/wfs:Request/"+_3;
if(_4.toLowerCase()=="post"){
_6+="/wfs:DCPType/wfs:HTTP/wfs:Post";
}else{
_6+="/wfs:DCPType/wfs:HTTP/wfs:Get";
}
return this.doc.selectSingleNode(_6).getAttribute("onlineResource");
};
this.getVersion=function(){
var _7="/wfs:WFS_Capabilities";
return this.doc.selectSingleNode(_7).getAttribute("version");
};
this.getMethod=function(){
return this.method;
};
this.getFeatureNode=function(_8){
return this.doc.selectSingleNode(this.nodeSelectXpath+"[wfs:Name='"+_8+"']");
};
}

function ModelBase(_1,_2){
Listener.apply(this);
this.async=true;
this.contentType="text/xml";
this.modelNode=_1;
var _3=_1.attributes.getNamedItem("id");
if(_3){
this.id=_3.nodeValue;
}else{
this.id="MbModel_"+mbIds.getId();
}
var _4=_1.selectSingleNode("mb:title");
if(_4){
this.title=_4.firstChild.nodeValue;
}else{
this.title=this.id;
}
if(_1.selectSingleNode("mb:debug")){
this.debug="true";
}
if(window.cgiArgs[this.id]){
this.url=window.cgiArgs[this.id];
}else{
if(window[this.id]){
this.url=window[this.id];
}else{
if(_1.url){
this.url=_1.url;
}else{
var _5=_1.selectSingleNode("mb:defaultModelUrl");
if(_5){
this.url=_5.firstChild.nodeValue;
}
}
}
}
var _6=_1.selectSingleNode("mb:method");
if(_6){
this.method=_6.firstChild.nodeValue;
}else{
this.method="get";
}
var _7=_1.selectSingleNode("mb:namespace");
if(_7){
this.namespace=_7.firstChild.nodeValue;
}
var _8=_1.attributes.getNamedItem("template");
if(_8){
this.template=(_8.nodeValue=="true")?true:false;
this.modelNode.removeAttribute("template");
}
var _9=_1.selectSingleNode("mb:nodeSelectXpath");
if(_9){
this.nodeSelectXpath=_9.firstChild.nodeValue;
}
this.getXpathValue=function(_a,_b){
if(!_a.doc){
return null;
}
node=_a.doc.selectSingleNode(_b);
if(node&&node.firstChild){
return node.firstChild.nodeValue;
}else{
return null;
}
};
this.setXpathValue=function(_c,_d,_e,_f){
if(_f==null){
_f=true;
}
var _10=_c.doc.selectSingleNode(_d);
if(_10){
if(_10.firstChild){
_10.firstChild.nodeValue=_e;
}else{
dom=Sarissa.getDomDocument();
v=dom.createTextNode(_e);
_10.appendChild(v);
}
if(_f){
_c.setParam("refresh");
}
return true;
}else{
return false;
}
};
this.loadModelDoc=function(_11){
if(_11.url){
_11.callListeners("newModel");
_11.setParam("modelStatus","loading");
if(_11.contentType=="image"){
_11.doc=new Image();
_11.doc.src=_11.url;
}else{
var _12=new XMLHttpRequest();
var _13=_11.url;
if(_13.indexOf("http://")==0){
if(_11.method=="get"){
_13=getProxyPlusUrl(_13);
}else{
_13=config.proxyUrl;
}
}
_12.open(_11.method,_13,_11.async);
if(_11.method=="post"){
_12.setRequestHeader("content-type",_11.contentType);
_12.setRequestHeader("serverUrl",_11.url);
}
_12.onreadystatechange=function(){
_11.setParam("modelStatus",httpStatusMsg[_12.readyState]);
if(_12.readyState==4){
if(_12.status>=400){
var _14="error loading document: "+_13+" - "+_12.statusText+"-"+_12.responseText;
alert(_14);
_11.setParam("modelStatus",_14);
return;
}else{
if((_12.responseXML!=null)&&(_12.responseXML.root!=null)&&(_12.responseXML.root.children.length>0)){
_11.doc=_12.responseXML;
if(_11.doc.parseError==0){
_11.finishLoading();
}else{
alert("Parsing Error:"+_11.doc.parseError+" "+Sarissa.getParseErrorText(_11.doc));
}
return;
}
if(_12.responseText!=null){
_11.doc=Sarissa.getDomDocument();
_11.doc.async=false;
_11.doc=(new DOMParser()).parseFromString(_12.responseText.replace(/>\s+</g,"><"),"text/xml");
if(_11.doc==null){
alert("Document parseError:"+Sarissa.getParseErrorText(_11.doc));
}else{
if(_11.doc.parseError==0){
_11.finishLoading();
}else{
alert("Parsing Error:"+_11.doc.parseError+" "+Sarissa.getParseErrorText(_11.doc));
}
}
return;
}
}
}
};
_12.send(_11.postData);
if(!_11.async){
if(_12.status>=400){
var _15="error loading document: "+_13+" - "+_12.statusText+"-"+_12.responseText;
alert(_15);
this.objRef.setParam("modelStatus",_15);
return;
}else{
if(null==_12.responseXML){
alert("null XML response:"+_12.responseText);
}
_11.doc=_12.responseXML;
_11.finishLoading();
}
}
}
}
};
this.addListener("reloadModel",this.loadModelDoc,this);
this.setModel=function(_16,_17){
_16.callListeners("newModel");
_16.doc=_17;
if((_17==null)&&_16.url){
_16.url=null;
}
_16.finishLoading();
};
this.finishLoading=function(){
if(this.doc){
this.doc.setProperty("SelectionLanguage","XPath");
if(this.namespace){
Sarissa.setXpathNamespaces(this.doc,this.namespace);
}
if(this.debug){
alert("Loading Model:"+this.id+" "+Sarissa.serialize(this.doc));
}
this.callListeners("loadModel");
}
};
this.newRequest=function(_18,_19){
var _1a=_18;
if(_18.template){
var _1b=_18.modelNode.parentNode;
if(_SARISSA_IS_IE){
var _1c=_1b.appendChild(_1.cloneNode(true));
}else{
var _1c=_1b.appendChild(_18.modelNode.ownerDocument.importNode(_18.modelNode,true));
}
_1c.removeAttribute("id");
_1c.setAttribute("createByTemplate","true");
_1a=_18.createObject(_1c);
_1a.callListeners("init");
if(!_18.templates){
_18.templates=new Array();
}
_18.templates.push(_1a);
}
_1a.url=_19.url;
if(!_1a.url){
_1a.doc=null;
}
_1a.method=_19.method;
_1a.postData=_19.postData;
_1a.loadModelDoc(_1a);
};
this.deleteTemplates=function(){
if(this.templates){
while(model=this.templates.pop()){
model.setParam("newModel");
var _1d=this.modelNode.parentNode;
_1d.removeChild(model.modelNode);
}
}
};
this.saveModel=function(_1e){
if(config.serializeUrl){
var _1f=postGetLoad(config.serializeUrl,_1e.doc,"text/xml","/temp","sld.xml");
_1f.setProperty("SelectionLanguage","XPath");
Sarissa.setXpathNamespaces(_1f,"xmlns:xlink='http://www.w3.org/1999/xlink'");
var _20=_1f.selectSingleNode("//OnlineResource");
var _21=_20.attributes.getNamedItem("xlink:href").nodeValue;
_1e.setParam("modelSaved",_21);
}else{
alert("serializeUrl must be specified in config to save a model");
}
};
this.createObject=function(_22){
var _23=_22.nodeName;
var _24=new window[_23](_22,this);
if(_24){
config.objects[_24.id]=_24;
return _24;
}else{
alert("error creating object:"+_23);
}
};
this.loadObjects=function(_25){
var _26=this.modelNode.selectNodes(_25);
for(var i=0;i<_26.length;i++){
this.createObject(_26[i]);
}
};
this.parseConfig=function(_28){
_28.loadObjects("mb:widgets/*");
_28.loadObjects("mb:tools/*");
_28.loadObjects("mb:models/*");
};
this.refresh=function(_29){
_29.setParam("refresh");
};
this.addListener("loadModel",this.refresh,this);
this.init=function(_2a){
_2a.callListeners("init");
};
this.clearModel=function(_2b){
_2b.doc=null;
};
if(_2){
this.parentModel=_2;
this.parentModel.addListener("init",this.init,this);
this.parentModel.addListener("loadModel",this.loadModelDoc,this);
this.parentModel.addListener("newModel",this.clearModel,this);
this.parseConfig(this);
}
}
var httpStatusMsg=["uninitialized","loading","loaded","interactive","completed"];

mapbuilder.loadScript(baseDir+"/model/ModelBase.js");
function Transaction(_1,_2){
ModelBase.apply(this,new Array(_1,_2));
this.namespace="xmlns:gml='http://www.opengis.net/gml' xmlns:wfs='http://www.opengis.net/wfs'";
}

function ContextCollection(_1,_2){
ModelBase.apply(this,new Array(_1,_2));
this.insertContext=function(_3,_4){
};
this.deleteContext=function(id){
};
this.reorderContext=function(_6,_7){
};
this.selectContext=function(_8,_9){
for(var i=0;i<this.listeners["select"].length;i++){
this.listeners["select"][i][0](_8,this.listeners["select"][i][1]);
}
};
}

function WpsCapabilities(_1,_2){
ModelBase.apply(this,new Array(_1,_2));
this.namespace="xmlns:wps='http://www.opengis.net/wps' xmlns:ows='http://www.opengis.net/ows' xmlns:xlink='http://www.w3.org/1999/xlink'";
this.getServerUrl=function(_3,_4,_5){
var _6=_3.split(":");
var _7="/wps:Capabilities/ows:OperationsMetadata/ows:Operation[@name='"+_6[1]+"']";
if(_4.toLowerCase()=="post"){
_7+="/ows:DCP/ows:HTTP/ows:Post";
}else{
_7+="/ows:DCP/ows:HTTP/ows:Get";
}
var _8=this.doc.selectSingleNode(_7);
if(_8){
return _8.getAttribute("xlink:href");
}else{
return null;
}
};
this.getVersion=function(){
var _9="/wps:Capabilities";
return this.doc.selectSingleNode(_9).getAttribute("version");
};
this.getMethod=function(){
return this.method;
};
this.getFeatureNode=function(_a){
return this.doc.selectSingleNode(this.nodeSelectXpath+"[wps:Name='"+_a+"']");
};
}

mapbuilder.loadScript(baseDir+"/tool/ToolBase.js");
function History(_1,_2){
ToolBase.apply(this,new Array(_1,_2));
var _3=new Boolean();
this.init=function(_4){
place=-1;
list=new Array();
var _5=_4.targetModel.getBoundingBox();
newExtent=new Array();
newExtent[0]=new Array(_5[0],_5[3]);
newExtent[1]=new Array(_5[2],_5[1]);
list.push(newExtent);
place=place+1;
_4.model.active=place;
_4.model.historyList=list;
};
this.add=function(_6){
if(_6.model.active!=null){
var _7=_6.model.active;
var _8=_6.model.historyList;
newExtent=new Array();
newExtent[0]=_6.model.extent.ul;
newExtent[1]=_6.model.extent.lr;
if(_7==(_8.length-1)){
_8.push(newExtent);
_7=_7+1;
}else{
_7=_7+1;
_8=_8.slice(0,_7);
_8.push(newExtent);
}
_6.model.active=_7;
_6.model.historyList=_8;
}
};
this.back=function(_9){
place=_9.model.active;
if(place<1){
_9.model.previousExtent=null;
alert("You can't go further back");
}else{
place=place-1;
_9.model.active=place;
_9.model.previousExtent=_9.model.historyList[place];
}
};
this.forward=function(_a){
place=_a.model.active;
if(place<(_a.model.historyList.length-1)){
place=place+1;
_a.model.active=place;
_a.model.nextExtent=_a.model.historyList[place];
}else{
_a.model.nextExtent=null;
alert("You can't go further forward");
}
};
this.stop=function(_b){
_b.model.removeListener("bbox",_b.add,_b);
};
this.start=function(_c){
_c.model.addListener("bbox",_c.add,_c);
};
this.initReset=function(_d){
_d.targetModel.addListener("bbox",_d.add,_d);
_d.targetModel.addListener("loadModel",_d.init,_d);
};
this.model.addListener("historyBack",this.back,this);
this.model.addListener("historyForward",this.forward,this);
this.model.addListener("historyStart",this.start,this);
this.model.addListener("historyStop",this.stop,this);
this.model.addListener("init",this.initReset,this);
}

mapbuilder.loadScript(baseDir+"/tool/ToolBase.js");
function Timer(_1,_2){
ToolBase.apply(this,new Array(_1,_2));
var _3=_1.selectSingleNode("mb:every");
if(_3){
this.delay=1000*_3.firstChild.nodeValue;
}else{
this.delay=1000*30;
}
var _4=_1.selectSingleNode("mb:eventName");
if(_4){
this.eventName=_4.firstChild.nodeValue;
}else{
this.eventName="reloadModel";
}
var _5=_1.selectSingleNode("mb:eventValue");
if(_5){
this.eventValue=_5.firstChild.nodeValue;
}else{
this.eventValue=null;
}
this.play=function(){
clearInterval(this.interval);
var _6="config.objects."+this.targetModel.id+".setParam('"+this.eventName+"'";
if(this.eventValue){
_6+=","+this.eventValue;
}
_6+=")";
this.interval=setInterval(_6,this.delay);
};
this.stop=function(){
clearInterval(this.interval);
};
this.autoStart=true;
var _7=_1.selectSingleNode("mb:autoStart");
if(_7&&_7.firstChild.nodeValue=="false"){
this.autoStart=false;
}
this.startOnLoad=function(_8){
if(_8.autoStart){
_8.play();
}
};
this.model.addListener("init",this.startOnLoad,this);
}

function Caps2Context(_1,_2){
ToolBase.apply(this,new Array(_1,_2));
var _3=baseDir+"/tool/xsl/Caps2Context.xsl";
this.stylesheet=new XslProcessor(_3,_2.namespace);
for(var j=0;j<_1.childNodes.length;j++){
if(_1.childNodes[j].firstChild&&_1.childNodes[j].firstChild.nodeValue){
this.stylesheet.setParameter(_1.childNodes[j].nodeName,_1.childNodes[j].firstChild.nodeValue);
}
}
this.mapAllLayers=function(_5){
_5.stylesheet.setParameter("selectedLayer","");
var _6=_5.stylesheet.transformNodeToObject(_5.model.doc);
_5.targetModel.setParam("newModel",null);
_5.targetModel.url="";
_5.targetModel.doc=_6;
_5.targetModel.finishLoading();
};
this.model.addListener("mapAllLayers",this.mapAllLayers,this);
this.mapSingleLayer=function(_7,_8){
_7.stylesheet.setParameter("selectedLayer",_8);
var _9=_7.stylesheet.transformNodeToObject(_7.model.doc);
_7.targetModel.setParam("newModel",null);
_7.targetModel.url="";
_7.targetModel.doc=_9;
_7.targetModel.finishLoading();
};
this.model.addListener("mapLayer",this.mapSingleLayer,this);
}

mapbuilder.loadScript(baseDir+"/tool/ToolBase.js");
function AoiMouseHandler(_1,_2){
ToolBase.apply(this,new Array(_1,_2));
this.mouseUpHandler=function(_3,_4){
if(_3.enabled){
if(_3.started){
_3.started=false;
}
}
};
this.mouseDownHandler=function(_5,_6){
if(_5.enabled){
_5.started=true;
_5.anchorPoint=_6.evpl;
_5.dragBox(_6.evpl);
}
};
this.mouseMoveHandler=function(_7,_8){
if(_7.enabled){
if(_7.started){
_7.dragBox(_8.evpl);
}
}
};
this.mouseOutHandler=function(_9,_a){
if(_9.enabled){
if(_9.started){
_9.started=false;
}
}
};
this.mouseOverHandler=function(_b,_c){
if(_b.enabled){
}
};
this.dragBox=function(_d){
var ul=new Array();
var lr=new Array();
if(this.anchorPoint[0]>_d[0]){
ul[0]=_d[0];
lr[0]=this.anchorPoint[0];
}else{
ul[0]=this.anchorPoint[0];
lr[0]=_d[0];
}
if(this.anchorPoint[1]>_d[1]){
ul[1]=_d[1];
lr[1]=this.anchorPoint[1];
}else{
ul[1]=this.anchorPoint[1];
lr[1]=_d[1];
}
ul=this.model.extent.getXY(ul);
lr=this.model.extent.getXY(lr);
this.model.setParam("aoi",new Array(ul,lr));
};
this.model.addListener("mousedown",this.mouseDownHandler,this);
this.model.addListener("mousemove",this.mouseMoveHandler,this);
this.model.addListener("mouseup",this.mouseUpHandler,this);
}

function ToolBase(_1,_2){
this.model=_2;
this.toolNode=_1;
var id=_1.selectSingleNode("@id");
if(id){
this.id=id.firstChild.nodeValue;
}else{
this.id="MbTool_"+mbIds.getId();
}
this.initTargetModel=function(_4){
var _5=_4.toolNode.selectSingleNode("mb:targetModel");
if(_5){
var _6=_5.firstChild.nodeValue;
_4.targetModel=window.config.objects[_6];
if(!_4.targetModel){
alert("error finding targetModel:"+_6+" for tool:"+_4.id);
}
}else{
_4.targetModel=_4.model;
}
};
this.model.addListener("init",this.initTargetModel,this);
this.initMouseHandler=function(_7){
var _8=_7.toolNode.selectSingleNode("mb:mouseHandler");
if(_8){
_7.mouseHandler=window.config.objects[_8.firstChild.nodeValue];
if(!_7.mouseHandler){
alert("error finding mouseHandler:"+_8.firstChild.nodeValue+" for tool:"+_7.id);
}
}
};
this.model.addListener("init",this.initMouseHandler,this);
this.enabled=true;
var _9=_1.selectSingleNode("mb:enabled");
if(_9){
this.enabled=eval(_9.firstChild.nodeValue);
}
}

mapbuilder.loadScript(baseDir+"/tool/ToolBase.js");
function MouseClickHandler(_1,_2){
ToolBase.apply(this,new Array(_1,_2));
this.clickHandler=function(_3,_4){
_3.model.setParam("clickPoint",_4.evpl);
};
_2.addListener("mouseup",this.clickHandler,this);
}

function GoogleMapTools(){
this.zoomTo=function(_1,_2,_3){
gmap=_1.getParam("gmap");
p=new GLatLng(_2[1],_2[0]);
z=gmap.getZoom();
gmap.setCenter(p,z+_3);
this.useGoogleMapExtent(_1);
};
this.useGoogleMapExtent=function(_4){
gmap=_4.getParam("gmap");
bbox=gmap.getBounds();
swLng=bbox.getSouthWest().lng();
swLat=bbox.getSouthWest().lat();
neLng=bbox.getNorthEast().lng();
neLat=bbox.getNorthEast().lat();
if(swLng>neLng){
swLng-=360;
}
if(swLat>neLat){
swLat-=180;
}
_4.setBoundingBox(new Array(swLng,swLat,neLng,neLat));
};
this.centerAndZoom=function(_5){
this.centerAndZoomToBox(_5,_5.getBoundingBox());
};
this.setGmapExtent=function(_6,_7){
this.centerAndZoomToBox(_6,_7);
this.useGoogleMapExtent(_6);
};
this.centerAndZoomToBox=function(_8,_9){
pxWidth=_8.getWindowWidth();
pxHeight=_8.getWindowHeight();
degWidth=Math.abs(_9[2]-_9[0]);
degHeight=Math.abs(_9[3]-_9[1]);
zoomLevel=this.getZoomLevel(pxWidth,degWidth);
gmap=_8.getParam("gmap");
gmap.setCenter(new GLatLng((_9[3]+_9[1])/2,(_9[2]+_9[0])/2),zoomLevel);
};
this.getZoomLevel=function(_a,_b){
zoomLevel=Math.floor(Math.log(1.46025*_a/_b)/Math.log(2));
return zoomLevel;
};
this.getPixelsFromLatLong=function(_c){
gmap=config.objects.gmap;
var _d=gmap.getBounds().getSouthWest().lng();
var _e=gmap.getBounds().getNorthEast().lat();
var _f=gmap.getCurrentMapType().getProjection().fromLatLngToPixel(new GLatLng(_e,_d),gmap.getZoom());
var _10=new GLatLng(_c[1],_c[0]);
var _11=gmap.getCurrentMapType().getProjection().fromLatLngToPixel(_10,gmap.getZoom());
var x=_11.x-_f.x;
var y=_11.y-_f.y;
return new Array(x,y);
};
this.getLatLongFromPixels=function(_14){
gmap=config.objects.gmap;
var x=_14[0];
var y=_14[1];
neLat=gmap.getBounds().getNorthEast().lat();
neLng=gmap.getBounds().getSouthWest().lng();
var _17=gmap.getCurrentMapType().getProjection().fromPixelToLatLng(new GPoint(0,0),gmap.getZoom());
var _18=new GPoint(x,y);
var _19=gmap.getCurrentMapType().getProjection().fromPixelToLatLng(_18,gmap.getZoom(),false);
var lat=_19.lat()-_17.lat()-neLat;
var lng=_19.lng()-_17.lng()-neLng;
return new Array(lng,lat);
};
}

mapbuilder.loadScript(baseDir+"/tool/ToolBase.js");
function EditContext(_1,_2){
ToolBase.apply(this,new Array(_1,_2));
var _3=baseDir+"/tool/xsl/wmc_AddResource.xsl";
this.stylesheet=new XslProcessor(_3);
for(var j=0;j<_1.childNodes.length;j++){
if(_1.childNodes[j].firstChild&&_1.childNodes[j].firstChild.nodeValue){
this.stylesheet.setParameter(_1.childNodes[j].nodeName,_1.childNodes[j].firstChild.nodeValue);
}
}
this.addNodeToModel=function(_5){
var _6=this.model.getFeatureNode(_5);
this.stylesheet.setParameter("version",this.model.getVersion());
this.stylesheet.setParameter("serverUrl",this.model.getServerUrl("GetMap","get"));
this.stylesheet.setParameter("serverTitle",this.model.getServerTitle());
this.stylesheet.setParameter("serviceName","wms");
this.stylesheet.setParameter("format",this.model.getImageFormat());
var _7=this.stylesheet.transformNodeToObject(_6);
Sarissa.setXpathNamespaces(_7,this.targetModel.namespace);
if(this.debug){
alert(_7.xml);
}
this.targetModel.setParam("addLayer",_7.documentElement);
};
this.addLayerFromCat=function(_8){
var _9=this.model.getFeatureNode(_8);
var _a=this.stylesheet.transformNodeToObject(_9);
Sarissa.setXpathNamespaces(_a,this.targetModel.namespace);
if(this.debug){
alert(_a.xml);
}
this.targetModel.setParam("addLayer",_a.documentElement);
};
this.moveNode=function(_b,_c){
};
this.model.addListener("MoveNode",this.addNodeToModel,this);
this.deleteNode=function(_d,_e){
};
this.model.addListener("DeleteNode",this.addNodeToModel,this);
}

mapbuilder.loadScript(baseDir+"/tool/ToolBase.js");
mapbuilder.loadScript(baseDir+"/model/Proj.js");
function ZoomToAoi(_1,_2){
ToolBase.apply(this,new Array(_1,_2));
this.initProj=function(_3){
if(_3.model.doc&&_3.targetModel.doc){
if(_3.model.getSRS()!=_3.targetModel.getSRS()){
_3.model.proj=new Proj(_3.model.getSRS());
_3.targetModel.proj=new Proj(_3.targetModel.getSRS());
}
}
};
this.setListeners=function(_4){
_4.model.addListener("loadModel",_4.initProj,_4);
_4.targetModel.addListener("loadModel",_4.initProj,_4);
_4.initProj(_4);
};
this.model.addListener("loadModel",this.setListeners,this);
this.showTargetAoi=function(_5){
if(_5.targetModel.doc){
var _6=_5.targetModel.getBoundingBox();
var ul=new Array(_6[0],_6[3]);
var lr=new Array(_6[2],_6[1]);
if(_5.model.getSRS()!=_5.targetModel.getSRS()){
ul=_5.targetModel.proj.Inverse(ul);
lr=_5.targetModel.proj.Inverse(lr);
if(ul[0]>lr[0]){
ul[0]=ul[0]-360;
}
ul=_5.model.proj.Forward(ul);
lr=_5.model.proj.Forward(lr);
}
_5.model.setParam("aoi",new Array(ul,lr));
}
};
this.firstInit=function(_9){
_9.targetModel.addListener("loadModel",_9.showTargetAoi,_9);
_9.targetModel.addListener("bbox",_9.showTargetAoi,_9);
_9.showTargetAoi(_9);
};
this.model.addListener("loadModel",this.firstInit,this);
this.mouseUpHandler=function(_a,_b){
var _c=_a.model.getParam("aoi");
var ul=_c[0];
var lr=_c[1];
if(_a.model.getSRS()!=_a.targetModel.getSRS()){
ul=_a.targetModel.proj.Forward(ul);
lr=_a.targetModel.proj.Forward(lr);
}
if((ul[0]==lr[0])&&(ul[1]==lr[1])){
_a.targetModel.extent.centerAt(ul,_a.targetModel.extent.res[0]);
}else{
_a.targetModel.extent.zoomToBox(ul,lr);
}
};
this.model.addListener("mouseup",this.mouseUpHandler,this);
}

mapbuilder.loadScript(baseDir+"/tool/ToolBase.js");
function AutoResize(_1,_2){
ToolBase.apply(this,new Array(_1,_2));
var _3=_1.selectSingleNode("mb:referenceNodeId");
if(_3){
this.referenceNodeId=_3.firstChild.nodeValue;
var _4=document.getElementById(this.referenceNodeId);
}else{
var _4=document.getElementById("autoResize");
}
if(_4==null){
alert("AutoResize tool cannot find the reference node '"+this.referenceNodeId+"' in the DOM.\nPlease specify a valid referenceNodeId in the config file\nor use an id 'autoResize' for one of your documents nodes.");
}
this.fireResize=function(){
config.objects[window.resizeToolId].model.setParam("autoResize");
};
window.onresize=this.fireResize;
window.resizeToolId=this.id;
this.enlargeBboxIfNecessary=function(){
var _5=this.model.getBoundingBox();
var _6=_5[2]-_5[0];
var _7=_5[3]-_5[1];
var _8=_6/this.model.getWindowWidth();
var _9=_7/this.model.getWindowHeight();
if(_8!=_9){
if(_8>_9){
var _a=_7*(_8/_9);
_5[3]=_5[3]+0.5*(_a-_7);
_5[1]=_5[1]-0.5*(_a-_7);
}else{
if(_9>_8){
var _b=_6*(_9/_8);
_5[0]=_5[0]-0.5*(_b-_6);
_5[2]=_5[2]+0.5*(_b-_6);
}
}
this.model.setBoundingBox(_5);
}
};
this.resizeHandler=function(_c){
_c.enlargeBboxIfNecessary();
var _d=parseInt(getStyle(_4,"padding-top"));
var _e=parseInt(getStyle(_4,"padding-bottom"));
var _f=parseInt(getStyle(_4,"padding-left"));
var _10=parseInt(getStyle(_4,"padding-right"));
newWidth=_4.offsetWidth-(_f+_10);
newHeight=_4.offsetHeight-(_d+_e);
_c.model.setWindowSize(new Array(newWidth,newHeight));
};
this.model.addFirstListener("autoResize",this.resizeHandler,this);
this.model.addFirstListener("loadModel",this.resizeHandler,this);
function getStyle(_11,_12){
var _13="";
if(document.defaultView&&document.defaultView.getComputedStyle){
_13=document.defaultView.getComputedStyle(_11,"").getPropertyValue(_12);
}else{
if(_11.currentStyle){
_12=_12.replace(/\-(\w)/g,function(_14,p1){
return p1.toUpperCase();
});
_13=_11.currentStyle[_12];
}
}
return _13;
}
}

var Rearth=6378137;
var degToMeter=Rearth*2*Math.PI/360;
var mbScaleFactor=3571.428;
var minScale=1000;
var maxScale=200000;
function Extent(_1,_2){
this.model=_1;
this.id=_1.id+"_MbExtent"+mbIds.getId();
this.size=new Array();
this.res=new Array();
this.zoomBy=4;
this.getBbox=function(){
var _3=this.model.getBoundingBox();
return _3;
};
this.setBbox=function(_4){
size=this.getSize();
res=Math.max((_4[2]-_4[0])/size[0],(_4[3]-_4[1])/size[1]);
scale=this.getFixedScale(res);
center=new Array((_4[1]-_4[3])/2,(_4[0]-_4[2])/2);
half=new Array(size[0]/2,size[1]/2);
_4=new Array(center[0]-half[0]*scale,center[1]-half[1]*scale,center[0]+half[0]*scale,center[1]+half[1]*scale);
this.model.setBoundingBox(_4);
};
this.getSize=function(){
size=new Array();
size[0]=this.model.getWindowWidth();
size[1]=this.model.getWindowHeight();
return size;
};
this.setSize=function(_5){
this.model.setWindowWidth(_5[0]);
this.model.setWindowHeight(_5[1]);
};
this.getFixedScale=function(_6){
if(this.zoomLevels){
if(!_6){
this.setResolution(new Array(this.model.getWindowWidth(),this.model.getWindowHeight()));
_6=Math.max(this.res[0],this.res[1]);
}
var _7=this.zoomLevels.sort(function sort(a,b){
return b-a;
});
var i=0;
while(_7[i]>=_6){
i++;
}
if(i==0){
i=1;
}
this.fixedScale=_7[i-1];
}else{
this.fixedScale=Math.max(this.res[0],this.res[1]);
}
return this.fixedScale;
};
this.setZoomLevels=function(_b,_c){
if(_b){
this.zoomLevels=_c;
}else{
this.zoomLevels=null;
}
};
this.checkBbox=function(){
var _d=this.getCenter();
var _e=new Array(this.size[0]/2,this.size[1]/2);
var _f=this.getFixedScale();
this.lr=new Array(_d[0]+_e[0]*_f,_d[1]-_e[1]*_f);
this.ul=new Array(_d[0]-_e[0]*_f,_d[1]+_e[1]*_f);
};
this.getCenter=function(){
return new Array((this.ul[0]+this.lr[0])/2,(this.ul[1]+this.lr[1])/2);
};
this.getXY=function(pl){
latlng=new Array(this.ul[0]+pl[0]*this.res[0],this.ul[1]-pl[1]*this.res[1]);
return latlng;
};
this.getPL=function(xy){
var p=Math.floor((xy[0]-this.ul[0])/this.res[0]);
var l=Math.floor((this.ul[1]-xy[1])/this.res[1]);
return new Array(p,l);
};
this.centerAt=function(_14,_15,_16){
var _17=new Array(this.size[0]/2,this.size[1]/2);
if(this.zoomLevels){
_15=this.getFixedScale(_15);
}
this.lr=new Array(_14[0]+_17[0]*_15,_14[1]-_17[1]*_15);
this.ul=new Array(_14[0]-_17[0]*_15,_14[1]+_17[1]*_15);
if(_16){
var _18=0;
if(this.lr[0]>ContextExtent.lr[0]){
_18=ContextExtent.lr[0]-this.lr[0];
}
if(this.ul[0]<ContextExtent.ul[0]){
_18=ContextExtent.ul[0]-this.ul[0];
}
this.lr[0]+=_18;
this.ul[0]+=_18;
var _19=0;
if(this.lr[1]<ContextExtent.lr[1]){
_19=ContextExtent.lr[1]-this.lr[1];
}
if(this.ul[1]>ContextExtent.ul[1]){
_19=ContextExtent.ul[1]-this.ul[1];
}
this.lr[1]+=_19;
this.ul[1]+=_19;
}
this.model.setBoundingBox(new Array(this.ul[0],this.lr[1],this.lr[0],this.ul[1]));
this.setSize(_15);
};
this.zoomToBox=function(ul,lr){
var _1c=new Array((ul[0]+lr[0])/2,(ul[1]+lr[1])/2);
newres=Math.max((lr[0]-ul[0])/this.size[0],(ul[1]-lr[1])/this.size[1]);
this.centerAt(_1c,newres);
};
this.setSize=function(res){
this.res[0]=this.res[1]=res;
this.size[0]=(this.lr[0]-this.ul[0])/this.res[0];
this.size[1]=(this.ul[1]-this.lr[1])/this.res[1];
this.width=Math.ceil(this.size[0]);
this.height=Math.ceil(this.size[1]);
};
this.setResolution=function(_1e){
this.size[0]=_1e[0];
this.size[1]=_1e[1];
this.res[0]=(this.lr[0]-this.ul[0])/this.size[0];
this.res[1]=(this.ul[1]-this.lr[1])/this.size[1];
this.width=Math.ceil(this.size[0]);
this.height=Math.ceil(this.size[1]);
};
this.getScale=function(){
var _1f=null;
switch(this.model.getSRS()){
case "EPSG:GMAPS":
break;
case "EPSG:4326":
case "EPSG:4269":
_1f=this.res[0]*degToMeter;
break;
default:
_1f=this.res[0];
break;
}
return mbScaleFactor*_1f;
};
this.setScale=function(_20){
var _21=null;
switch(this.model.getSRS()){
case "EPSG:4326":
case "EPSG:4269":
_21=_20/(mbScaleFactor*degToMeter);
break;
default:
_21=_20/mbScaleFactor;
break;
}
this.centerAt(this.getCenter(),_21);
};
this.init=function(_22,_23){
var _24=_22.model.getBoundingBox();
_22.ul=new Array(_24[0],_24[3]);
_22.lr=new Array(_24[2],_24[1]);
_22.setResolution(new Array(_22.model.getWindowWidth(),_22.model.getWindowHeight()));
_22.checkBbox();
};
if(_2){
this.init(this,_2);
}
this.firstInit=function(_25,_26){
_25.init(_25,_26);
};
}

mapbuilder.loadScript(baseDir+"/tool/ToolBase.js");
function EditSLD(_1,_2){
ToolBase.apply(this,new Array(_1,_2));
var _3=baseDir+"/tool/xsl/wmc_AddSld.xsl";
this.stylesheet=new XslProcessor(_3);
this.checkThis=function(){
if(document.getElementById("textStyle").checked==true){
this.addNodeToSLD("TextSymbolizer");
document.getElementById("textStyle").checked=true;
manageDiv("propertyText",1);
alert("checked");
alert(Sarissa.serialize(this.model.doc));
}else{
if(this.model.doc.selectSingleNode("//TextSymbolizer")!=null){
xpath="//FeatureTypeStyle";
node=this.model.doc.selectSingleNode(xpath);
node.removeChild(this.model.doc.selectSingleNode("//TextSymbolizer").parentNode);
this.addNodeToSLD(document.getElementById("choixFeatureType").value+"Symbolizer");
manageDiv("propertyText",0);
alert(Sarissa.serialize(this.model.doc));
}
}
};
this.updateNode=function(_4,_5){
if(_4=="//MinScaleDenominator2"){
node=this.model.doc.selectNodes("//MinScaleDenominator");
node[1].firstChild.nodeValue=_5;
}else{
if(_4=="//MaxScaleDenominator2"){
node2=this.model.doc.selectNodes("//MaxScaleDenominator");
node2[1].firstChild.nodeValue=_5;
}else{
if((this.model.doc.selectSingleNode(_4)!=null)&&(_5)){
this.model.setXpathValue(this.model,_4,_5,false);
}
}
}
};
this.insertSldToWmc=function(_6){
if(_6){
var _7=this.model.getSldNode();
var _8=this.stylesheet.transformNodeToObject(_7);
Sarissa.setXpathNamespaces(_8,this.targetModel.namespace);
if(this.debug){
alert(_8.xml);
}
legendURLNode=this.targetModel.doc.selectSingleNode("//wmc:Layer[wmc:Name='"+_6+"']/wmc:StyleList/wmc:Style/wmc:LegendURL");
layerNode=this.targetModel.doc.selectSingleNode("//wmc:Layer[wmc:Name='"+_6+"']");
styleNode=this.targetModel.doc.selectSingleNode("//wmc:Layer[wmc:Name='"+_6+"']/wmc:StyleList");
if(styleNode){
layerNode.removeChild(styleNode);
}
this.targetModel.setParam("addSLD",_8.documentElement);
if(legendURLNode){
styleNode=this.targetModel.doc.selectSingleNode("//wmc:Layer[wmc:Name='"+_6+"']/wmc:StyleList/wmc:Style");
styleNode.appendChild(legendURLNode);
}
config.objects.mainMap.setParam("refresh");
}else{
alert("Select a layer if you want insert sld in wmc");
}
};
this.insertSldaToWmc=function(_9){
if(_9){
sl=this.targetModel.doc.createElement("StyleList");
st=this.targetModel.doc.createElement("Style");
st.setAttribute("current","1");
sld=this.targetModel.doc.createElement("SLD");
node=this.model.doc.selectSingleNode("//StyledLayerDescriptor").cloneNode("true");
sld.appendChild(node);
st.appendChild(sld);
sl.appendChild(st);
layerNode=this.targetModel.doc.selectSingleNode("//wmc:Layer[wmc:Name='"+_9+"']");
styleNode=this.targetModel.doc.selectSingleNode("//wmc:Layer[wmc:Name='"+_9+"']/wmc:StyleList");
if(styleNode){
layerNode.removeChild(styleNode);
layerNode.appendChild(sl);
config.objects.mainMap.setParam("refresh");
}else{
layerNode.appendChild(sl);
config.objects.mainMap.setParam("refresh");
}
alert("Apres : "+Sarissa.serialize(this.targetModel.doc));
}else{
alert("Select a layer if you want insert sld in wmc");
}
};
this.validSld=function(_a){
if(!_a){
alert("pas de layer selectionnee");
}else{
if(((document.getElementById("textStyle").checked==true)&&(document.getElementById("selectPropertyCanvas")))||(document.getElementById("textStyle").checked==false)){
this.updateNodeCss(document.getElementById("fill").id,"//PolygonSymbolizer/Fill/CssParameter[@name=",document.getElementById("fill").value);
this.updateNodeCss(document.getElementById("fill").id,"//PointSymbolizer/Graphic/Mark/Fill/CssParameter[@name=",document.getElementById("fill").value);
this.updateNodeCss(document.getElementById("stroke").id,"//CssParameter[@name=",document.getElementById("stroke").value);
this.updateNodeCss("fill","//TextSymbolizer/Fill/CssParameter[@name=",document.getElementById("fontColor").value);
this.insertSldToWmc(_a);
config.loadModel("mySLD",this.model.url);
}else{
if(!document.getElementById("selectPropertyCanvas")){
alert("pas de propriete selectionnee");
}
}
}
};
}

function DragPanHandler(_1,_2){
ToolBase.apply(this,new Array(_1,_2));
this.mouseUpHandler=function(_3,_4){
if(_3.enabled){
if(_3.dragging){
_3.dragging=false;
if((_3.deltaP==0)&&(_3.deltaL==0)){
return;
}
var _5=_3.model.getWindowWidth();
var _6=_3.model.getWindowHeight();
var ul=_3.model.extent.getXY(new Array(-_3.deltaP,-_3.deltaL));
var lr=_3.model.extent.getXY(new Array(_5-_3.deltaP,_6-_3.deltaL));
_3.model.setParam("aoi",new Array(ul,lr));
}
}
};
this.mouseDownHandler=function(_9,_a){
if(_9.enabled){
_9.dragging=true;
_9.anchorPoint=_a.evpl;
_9.deltaP=0;
_9.deltaL=0;
var _b=_a.childNodes;
_9.oldPos=new Array(_b.length);
for(var i=0;i<_b.length;i++){
var _d=_b.item(i);
var P=_d.style.left;
var L=_d.style.top;
if(P&&L){
_9.oldPos[i]=new Array(parseInt(P),parseInt(L));
}else{
_9.oldPos[i]=new Array(0,0);
}
}
}
};
this.mouseMoveHandler=function(_10,_11){
if(_10.enabled){
if(_10.dragging){
_10.deltaP=_11.evpl[0]-_10.anchorPoint[0];
_10.deltaL=_11.evpl[1]-_10.anchorPoint[1];
var _12=_11.childNodes;
for(var i=0;i<_12.length;i++){
var img=_12.item(i);
img.style.left=_10.deltaP+_10.oldPos[i][0]+"px";
img.style.top=_10.deltaL+_10.oldPos[i][1]+"px";
}
}
}
};
this.model.addListener("mousedown",this.mouseDownHandler,this);
this.model.addListener("mousemove",this.mouseMoveHandler,this);
this.model.addListener("mouseup",this.mouseUpHandler,this);
}

mapbuilder.loadScript(baseDir+"/tool/ToolBase.js");
function MovieLoop(_1,_2){
ToolBase.apply(this,new Array(_1,_2));
this.frameIncrement=1;
this.model.setParam("firstFrame",0);
this.timestampIndex=0;
window.movieLoop=this;
var _3=_1.selectSingleNode("mb:framesPerSecond");
if(_3){
this.delay=1000/_3.firstChild.nodeValue;
}else{
this.delay=1000/10;
}
this.maxFrames=30;
var _4=_1.selectSingleNode("mb:maxFrames");
if(_4){
this.maxFrames=_4.firstChild.nodeValue;
}
this.setFrame=function(_5){
var _6=this.model.timestampList;
if(this.timestampIndex!=null){
var _7=_6.childNodes[this.timestampIndex];
_7.setAttribute("current","0");
this.model.setParam("timestamp",this.timestampIndex);
}
var _8=this.model.getParam("firstFrame");
var _9=this.model.getParam("lastFrame");
if(_5>_9){
_5=_8;
}
if(_5<_8){
_5=_9;
}
this.timestampIndex=_5;
_7=_6.childNodes[this.timestampIndex];
_7.setAttribute("current","1");
this.model.setParam("timestamp",this.timestampIndex);
};
this.nextFrame=function(_a){
var _b=window.movieLoop;
var _c=_b.frameIncrement;
if(_a){
_c=_a;
}
_b.setFrame(_b.timestampIndex+_c);
};
this.setFrameLimits=function(_d){
var _e=_d.model.timestampList;
var _f=_d.model.getParam("firstFrame");
var _10=_f+_d.maxFrames;
if(_10>_e.childNodes.length){
_10=_e.childNodes.length-1;
}
_d.model.setParam("lastFrame",_10);
_e.childNodes[_f].setAttribute("current","1");
};
this.model.addFirstListener("refresh",this.setFrameLimits,this);
this.model.addListener("firstFrame",this.setFrameLimits,this);
this.reset=function(_11){
_11.pause();
_11.setFrame(_11.model.getParam("firstFrame"));
};
this.model.addListener("loadModel",this.reset,this);
this.model.addListener("bbox",this.reset,this);
this.play=function(){
this.movieTimer=setInterval("window.movieLoop.nextFrame()",this.delay);
};
this.pause=function(){
clearInterval(this.movieTimer);
};
this.stop=function(){
this.pause();
this.reset(this);
};
this.stopListener=function(_12){
_12.stop();
};
this.model.addListener("stopLoop",this.stopListener,this);
}

mapbuilder.loadScript(baseDir+"/tool/ToolBase.js");
function WebServiceRequest(_1,_2){
ToolBase.apply(this,new Array(_1,_2));
var _3=_1.selectSingleNode("mb:requestName");
if(_3){
this.requestName=_3.firstChild.nodeValue;
}
var _4=_1.selectSingleNode("mb:requestFilter");
if(_4){
this.requestFilter=_4.firstChild.nodeValue;
}
var _5=baseDir+"/tool/xsl/"+this.requestName.replace(/:/,"_")+".xsl";
this.requestStylesheet=new XslProcessor(_5);
for(var j=0;j<_1.childNodes.length;j++){
if(_1.childNodes[j].firstChild&&_1.childNodes[j].firstChild.nodeValue){
this.requestStylesheet.setParameter(_1.childNodes[j].nodeName,_1.childNodes[j].firstChild.nodeValue);
}
}
this.model.addListener("init",this.init,this);
this.model.addListener(this.requestName.replace(/:/,"_"),this.doRequest,this);
}
WebServiceRequest.prototype.createHttpPayload=function(_7){
if(this.debug){
alert("source:"+Sarissa.serialize(_7));
}
var _8=new Object();
_8.method=this.targetModel.method;
this.requestStylesheet.setParameter("httpMethod",_8.method);
this.requestStylesheet.setParameter("version",this.model.getVersion(_7));
if(this.requestFilter){
var _9=config.objects[this.requestFilter];
this.requestStylesheet.setParameter("filter",escape(Sarissa.serialize(_9.doc).replace(/[\n\f\r\t]/g,"")));
if(this.debug){
alert(Sarissa.serialize(_9.doc));
}
}
_8.postData=this.requestStylesheet.transformNodeToObject(_7);
if(this.debug){
alert("request data:"+Sarissa.serialize(_8.postData));
if(config.serializeUrl){
var _a=postLoad(config.serializeUrl,_8.postData);
}
}
_8.url=this.model.getServerUrl(this.requestName,_8.method,_7);
if(_8.method.toLowerCase()=="get"){
_8.postData.setProperty("SelectionLanguage","XPath");
Sarissa.setXpathNamespaces(_8.postData,"xmlns:mb='http://mapbuilder.sourceforge.net/mapbuilder'");
var _b=_8.postData.selectSingleNode("//mb:QueryString");
if(_8.url.indexOf("?")<0){
_8.url+="?";
}else{
_8.url+="&";
}
_8.url+=_b.firstChild.nodeValue;
_8.postData=null;
}
if(this.debug){
alert("URL:"+_8.url);
}
return _8;
};
WebServiceRequest.prototype.doRequest=function(_c,_d){
_c.targetModel.featureName=_d;
var _e=_c.model.getFeatureNode(_d);
if(!_e){
alert("WebServiceRequest: error finding feature node:"+_d);
return;
}
if(_c.model.setRequestParameters){
_c.model.setRequestParameters(_d,_c.requestStylesheet);
}
var _f=_c.createHttpPayload(_e);
_c.targetModel.newRequest(_c.targetModel,_f);
};
WebServiceRequest.prototype.setAoiParameters=function(_10){
if(_10.containerModel){
var _11=null;
var _12="EPSG:4326";
var _13=_10.containerModel.getBoundingBox();
var _12=_10.containerModel.getSRS();
_10.requestStylesheet.setParameter("bBoxMinX",_13[0]);
_10.requestStylesheet.setParameter("bBoxMinY",_13[1]);
_10.requestStylesheet.setParameter("bBoxMaxX",_13[2]);
_10.requestStylesheet.setParameter("bBoxMaxY",_13[3]);
_10.requestStylesheet.setParameter("srs",_12);
_10.requestStylesheet.setParameter("width",_10.containerModel.getWindowWidth());
_10.requestStylesheet.setParameter("height",_10.containerModel.getWindowHeight());
}
};
WebServiceRequest.prototype.init=function(_14){
if(_14.targetModel.containerModel){
_14.containerModel=_14.targetModel.containerModel;
}else{
if(_14.model.containerModel){
_14.containerModel=_14.model.containerModel;
}
}
if(_14.containerModel){
_14.containerModel.addListener("aoi",_14.setAoiParameters,_14);
_14.containerModel.addListener("bbox",_14.setAoiParameters,_14);
_14.containerModel.addListener("mouseup",_14.setClickPosition,_14);
_14.containerModel.addListener("selectedLayer",_14.selectFeature,_14);
}
};
WebServiceRequest.prototype.setClickPosition=function(_15,_16){
_15.requestStylesheet.setParameter("xCoord",_16.evpl[0]);
_15.requestStylesheet.setParameter("yCoord",_16.evpl[1]);
};
WebServiceRequest.prototype.selectFeature=function(_17,_18){
_17.requestStylesheet.setParameter("queryLayer",_18);
};

mapbuilder.loadScript(baseDir+"/widget/Popup.js");
mapbuilder.loadScript(baseDir+"/graphics/FeaturePointFactory.js");
mapbuilder.loadScript(baseDir+"/graphics/FeatureLineFactory.js");
mapbuilder.loadScript(baseDir+"/graphics/FeatureTrackFactory.js");
function FeatureFactory(_1,_2,_3){
this.featurePointFactory=new FeaturePointFactory(_1,_2,_3);
this.featureLineFactory=new FeatureLineFactory(_1,_2,_3);
this.featureTrackFactory=new FeatureTrackFactory(_1,_2,_3);
}
FeatureFactory.prototype.clearFeatures=function(_4){
this.featurePointFactory.clearFeatures(_4);
this.featureLineFactory.clearFeatures(_4);
this.featureTrackFactory.clearFeatures(_4);
};
FeatureFactory.prototype.createFeature=function(_5,_6,_7,_8,_9,_a,_b){
if(_6=="POINT"){
this.featurePointFactory.createFeature(_5,_7,_8,_9,_a,_b);
}else{
if(_6=="LINESTRING"){
this.featureLineFactory.createFeature(_5,_7,_8,_9,_a,_b);
}else{
if(_6=="TRACK"){
}else{
if(_6=="CURVE"){
alert("NOT IMPLEMENTED YET");
}else{
if(_6=="POLY"){
alert("NOT IMPLEMENTED YET");
}else{
if(_6=="TEST"){
var _c=document.createElement("div");
_c.setAttribute("id","test");
_c.style.position="relative";
_c.style.height="0px";
_c.style.width="0px";
_c.style.visibility="hidden";
_c.style.zIndex=301;
this.testDiv=_c;
_5.node.appendChild(_c);
testingCanvas(_5);
}else{
alert("feature:"+_6+" is not supported");
}
}
}
}
}
}
};
function testingCanvas(_d){
var _e=document.createElement("CANVAS");
_e.setAttribute("id","canvas_test2");
_e.setAttribute("width","600px");
_e.setAttribute("height","300px");
_e.setAttribute("style","position: absolute; top: 0pt; left: 0pt; width: 600px; height: 300px");
_d.node.appendChild(_e);
var _f=_e.getContext("2d");
if(_e.getContext){
var ctx=_e.getContext("2d");
ctx.fillStyle="green";
ctx.fillRect(5,5,25,25);
ctx.strokeStyle="red";
ctx.strokeRect(20,20,25,25);
ctx.beginPath();
ctx.lineWidth=1;
ctx.moveTo(1,1);
ctx.lineTo(80,80);
ctx.lineTo(100,20);
ctx.closePath();
ctx.stroke();
ctx.strokeStyle="blue";
ctx.fillStyle="black";
ctx.beginPath();
ctx.moveTo(120,50);
ctx.lineTo(150,70);
ctx.lineTo(150,50);
}else{
alert("no canvas context");
}
}

mapbuilder.loadScript(baseDir+"/graphics/MapLayer.js");
WmsLayer=function(_1,_2,_3,_4,_5,_6){
MapLayer.apply(this,new Array(_1,_2,_3,_4,_5,_6));
this.d=new Date();
this.img=new Image();
this.img.objRef=_2;
this.mapPane=_2;
this.setSrc=function(_7){
this.src=_7;
};
this.paint=function(_8,_9,_a){
this.loadImgDiv(_8,this.layerNode,this.src,this.img,_a);
return _9;
};
this.isWmsLayer=function(){
return true;
};
this.getLayerDivId=function(){
var _b=this.model.id+"_"+this.mapPane.id+"_"+this.layerName;
return _b;
if(this.model.timestampList&&this.model.timestampList.getAttribute("layerName")==_3){
var _c=this.model.getParam("timestamp");
var _d=this.model.timestampList.childNodes[_c];
layerId+="_"+_d.firstChild.nodeValue;
}
};
this.loadImgDiv=function(_e,_f,_10,_11,_12){
var _13=document.getElementById(_e.mapPane.outputNodeId);
var _14=(_f.getAttribute("hidden")==1)?true:false;
var _15="image/gif";
var _16=_f.selectSingleNode("wmc:FormatList/wmc:Format[@current='1']");
if(_16){
_15=_16.firstChild.nodeValue;
}
var _17=this.getLayerDivId();
var _18=document.getElementById(_17);
if(!_18){
_18=document.createElement("div");
_18.setAttribute("id",_17);
_18.style.position="absolute";
_18.style.visibility=(_14)?"hidden":"visible";
_18.style.top="0px";
_18.style.left="0px";
_18.imgId=this.d.getTime();
_18.style.zIndex=this.zIndexFactor+_12;
var _19=document.createElement("img");
_19.id="real"+_18.imgId;
_19.setAttribute("src",config.skinDir+"/images/Loading.gif");
_19.layerHidden=_14;
_18.appendChild(_19);
_13.appendChild(_18);
}
_11.id=_18.imgId;
_11.hidden=_14;
if(_SARISSA_IS_IE&&_15=="image/png"){
_11.fixPng=true;
}
_11.onload=MapImgLoadHandler;
_11.setAttribute("src",_10);
};
};
function MapImgLoadHandler(){
var _1a=document.getElementById("real"+this.id);
if(!this.objRef.firstImageLoaded){
this.objRef.firstImageLoaded=true;
var _1b=document.getElementById(this.objRef.outputNodeId);
var _1c=_1b.childNodes;
for(var i=0;i<_1c.length;++i){
var _1e=_1c[i].firstChild;
_1e.parentNode.style.visibility="hidden";
_1e.style.visibility="hidden";
if(_SARISSA_IS_IE){
_1e.src=config.skinDir+"/images/Spacer.gif";
}
}
if(_SARISSA_IS_IE){
_1c[0].firstChild.parentNode.parentNode.style.visibility="hidden";
}
_1b.style.left="0px";
_1b.style.top="0px";
}
--this.objRef.layerCount;
if(this.objRef.layerCount>0){
var _1f="loading "+this.objRef.layerCount+" map layers";
this.objRef.model.setParam("modelStatus",_1f);
}else{
this.objRef.model.setParam("modelStatus");
this.objRef.model.callListeners("refreshOtherLayers");
}
if(_SARISSA_IS_IE){
_1a.parentNode.parentNode.style.visibility="visible";
}
if(this.fixPng){
var vis=_1a.layerHidden?"hidden":"visible";
_1a.outerHTML=fixPNG(this,"real"+this.id);
if(!this.hidden){
fixImg=document.getElementById("real"+this.id);
fixImg.style.visibility="visible";
}
}else{
_1a.setAttribute("src",this.src);
_1a.width=this.objRef.model.getWindowWidth();
_1a.height=this.objRef.model.getWindowHeight();
if(!this.hidden){
_1a.parentNode.style.visibility="visible";
_1a.style.visibility="visible";
}
}
}

mapbuilder.loadScript(baseDir+"/graphics/FeaturePoint.js");
function FeaturePointFactory(_1,_2,_3){
if(_1.selectSingleNode("mb:normalImage")){
this.normalImage=_1.selectSingleNode("mb:normalImage").firstChild.nodeValue;
}
if(_1.selectSingleNode("mb:highlightImage")){
this.highlightImage=_1.selectSingleNode("mb:highlightImage").firstChild.nodeValue;
}
if(_1.selectSingleNode("mb:imageOffset")){
this.imgOffset=_1.selectSingleNode("mb:imageOffset").firstChild.nodeValue;
}
if(_1.selectSingleNode("mb:shadowImage")){
this.shadowImage=_1.selectSingleNode("mb:shadowImage").firstChild.nodeValue;
}
if(_1.selectSingleNode("mb:shadowOffset")){
this.shadowOffset=_1.selectSingleNode("mb:shadowOffset").firstChild.nodeValue;
}
this.points=new Array();
this.tipObjectName=_3;
}
FeaturePointFactory.prototype.clearFeatures=function(_4){
for(id in this.points){
var pt=this.points[id];
pt.clear(_4);
}
this.points=new Array();
};
FeaturePointFactory.prototype.createFeature=function(_6,_7,_8,_9,_a,_b){
if(_b==null){
_b=this.normalImage;
}
var pt=new FeaturePoint(_6,_7,_8,_9,_a,this.tipObjectName,_b,this.highlightImage,this.shadowImage,this.imgOffset,this.shadowOffset);
this.points[_8]=pt;
};

mapbuilder.loadScript(baseDir+"/util/Util.js");
function SVGGraphics2(id,_2,_3,_4){
var _5=document.getElementById(id+"svg");
if(_5==null){
_5=document.createElementNS("http://www.w3.org/2000/svg","svg");
_5.setAttribute("id",id+"svg");
_5.setAttribute("width",_3);
_5.setAttribute("height",_4);
if(_2!=null){
_2.appendChild(_5);
}
}
this.svg=_5;
return this;
}
SVGGraphics2.prototype.getGroupTag=function(_6,id){
tag=document.getElementById(id);
if(!tag){
tag=document.createElementNS("http://www.w3.org/2000/svg","g");
tag.setAttribute("id",id);
if(!_6){
_6=this.svg;
}
_6.appendChild(tag);
}
return tag;
};
SVGGraphics2.prototype.setStrokeColor=function(x){
};
SVGGraphics2.prototype.setStrokeWidth=function(x){
};
SVGGraphics2.prototype.setFillColor=function(x){
};
SVGGraphics2.prototype.setShapeStrokeColor=function(_b,x){
_b.setAttribute("stroke",x);
};
SVGGraphics2.prototype.setShapeStrokeWidth=function(_d,x){
_d.setAttribute("stroke-width",x);
};
SVGGraphics2.prototype.setShapeFillColor=function(_f,x){
_f.setAttribute("fillColor",x);
};
SVGGraphics2.prototype.setShapeFill=function(_11,x){
_11.setAttribute("fill",x);
};
SVGGraphics2.prototype.drawPolyline=function(_13,_14,_15){
var _16=_13.length;
var pts=_13[0]+","+_14[0];
for(var i=1;i<_16;i++){
pts+=","+_13[i]+","+_14[i];
}
var _19=document.createElementNS("http://www.w3.org/2000/svg","polyline");
_19.setAttribute("points",pts);
_15.appendChild(_19);
return _19;
};
SVGGraphics2.prototype.drawPolygon=function(_1a,_1b,_1c){
var _1d=this.drawPolyline(_1a,_1b,_1c);
return _1d;
};
SVGGraphics2.prototype.fillPolygon=function(_1e,_1f){
this.drawPolygon(_1e,_1f);
this.fill();
};
SVGGraphics2.prototype.drawCircle=function(X,Y,_22){
};
SVGGraphics2.prototype.fillCircle=function(X,Y,_25,_26){
var _27=document.createElementNS("http://www.w3.org/2000/svg","circle");
_27.setAttribute("cx",X);
_27.setAttribute("cy",Y);
_27.setAttribute("r",_25);
_26.appendChild(_27);
return _27;
};
SVGGraphics2.prototype.drawImage=function(src,X,Y,_2b,_2c,dx,dy){
var _2f=document.createElementNS("http://www.w3.org/2000/svg","image");
_2f.setAttributeNS("http://www.w3.org/1999/xlink","href",src);
var _30=X-dx;
var _31=Y-dy;
_2f.setAttribute("x",_30);
_2f.setAttribute("y",_31);
if(_2b!=0){
_2f.setAttribute("width",_2b);
}
if(_2c!=0){
_2f.setAttribute("height",_2c);
}
this.svg.appendChild(_2f);
return _2f;
};
SVGGraphics2.prototype.swapImage=function(_32,src){
_32.setAttributeNS("http://www.w3.org/1999/xlink","href",src);
};
SVGGraphics2.prototype.paint=function(){
};

function StyleLayerDescriptor(_1){
this.style=_1;
}
StyleLayerDescriptor.prototype.hiliteShape=function(gr,_3,_4){
this.getStyleAttributes(_4);
if(_4=="sld:PointSymbolizer"){
var _5=this.style.selectSingleNode("sld:PointSymbolizer/sld:Graphic/sld:ExternalGraphic");
if(_5!=null){
var _6=this.style.selectSingleNode("sld:PointSymbolizer/sld:Graphic/sld:ExternalGraphic/sld:OnlineResource");
gr.swapImage(_3,_6.attributes.getNamedItem("xlink:href").nodeValue);
return;
}
}
if(this.strokeColor!=null){
gr.setShapeStrokeColor(_3,this.strokeColor);
}else{
}
if(this.strokeWidth!=null){
gr.setShapeStrokeWidth(_3,this.strokeWidth);
}
if(this.fillColor!=undefined){
gr.setShapeFillColor(_3,this.fillColor);
}else{
}
};
StyleLayerDescriptor.prototype.hilitePoint=function(gr,_8){
this.hiliteShape(gr,_8,"sld:PointSymbolizer");
};
StyleLayerDescriptor.prototype.paintPoint=function(gr,_a){
var _b=null;
var X=_a[0];
var Y=_a[1];
var _e=0;
var dx=0;
var dy=0;
var _11=0;
var _12=0;
this.getStyleAttributes("sld:PointSymbolizer");
var _13=this.style.selectSingleNode("sld:PointSymbolizer/sld:Graphic/sld:Size");
if(_13!=null){
_e=_13.firstChild.nodeValue;
_12=_e;
_11=_e;
}else{
widthNode=this.style.selectSingleNode("sld:PointSymbolizer/sld:Graphic/sld:Width");
if(widthNode!=null){
_12=widthNode.firstChild.nodeValue;
}
heightNode=this.style.selectSingleNode("sld:PointSymbolizer/sld:Graphic/sld:Height");
if(heightNode!=null){
_11=heightNode.firstChild.nodeValue;
}
}
var _14=this.style.selectSingleNode("sld:PointSymbolizer/sld:Graphic/sld:Displacement");
if(_14!=null){
dx=parseInt(this.style.selectSingleNode("sld:PointSymbolizer/sld:Graphic/sld:Displacement/sld:DisplacementX").firstChild.nodeValue);
dy=parseInt(this.style.selectSingleNode("sld:PointSymbolizer/sld:Graphic/sld:Displacement/sld:DisplacementY").firstChild.nodeValue);
}
var _15=this.style.selectSingleNode("sld:PointSymbolizer/sld:Graphic/sld:ExternalGraphic");
if(_15!=null){
var _16=this.style.selectSingleNode("sld:PointSymbolizer/sld:Graphic/sld:ExternalGraphic/sld:OnlineResource");
_b=gr.drawImage(_16.attributes.getNamedItem("xlink:href").nodeValue,X,Y,_12,_11,dx,dy);
}else{
var _17=this.style.selectSingleNode("sld:PointSymbolizer/sld:Graphic/sld:Mark/sld:WellKnownName");
if(_17!=null){
pointType=_17.firstChild.nodeValue;
this.getStyleAttributes("sld:PointSymbolizer/sld:Graphic/sld:Mark");
if(this.strokeColor!=null){
gr.setStrokeColor(this.strokeColor);
}
if(this.strokeWidth!=null){
gr.setStrokeWidth(this.strokeWidth);
}
if(this.fillColor!=null){
gr.setFillColor(this.fillColor);
}
if(pointType=="circle"){
_b=gr.fillCircle(X,Y,_e);
}else{
if(pointType=="square"){
}else{
if(pointType=="triangle"){
}else{
if(pointType=="cross"){
}else{
if(pointType=="star"){
}
}
}
}
}
}
}
return _b;
};
StyleLayerDescriptor.prototype.hiliteLine=function(gr,_19){
this.hiliteShape(gr,_19,"sld:LineSymbolizer");
};
StyleLayerDescriptor.prototype.paintLine=function(gr,_1b){
var _1c=new Array(_1b.length);
var _1d=new Array(_1b.length);
for(var i=0;i<_1b.length;i++){
point=_1b[i];
_1c[i]=parseInt(point[0]);
_1d[i]=parseInt(point[1]);
}
this.getStyleAttributes("sld:LineSymbolizer");
if(this.strokeColor!=null){
gr.setStrokeColor(this.strokeColor);
}
if(this.strokeWidth!=null){
gr.setStrokeWidth(this.strokeWidth);
}
var _1f=gr.drawPolyline(_1c,_1d);
return _1f;
};
StyleLayerDescriptor.prototype.hilitePolygon=function(gr,_21){
this.hiliteShape(gr,_21,"sld:PolygonSymbolizer");
};
StyleLayerDescriptor.prototype.paintPolygon=function(gr,_23){
var _24=new Array(_23.length+1);
var _25=new Array(_23.length+1);
for(var i=0;i<_23.length;i++){
point=_23[i];
_24[i]=parseInt(point[0]);
_25[i]=parseInt(point[1]);
}
_24[i]=_24[0];
_25[i]=_25[0];
this.getStyleAttributes("sld:PolygonSymbolizer");
if(this.strokeColor!=null){
gr.setStrokeColor(this.strokeColor);
}
if(this.strokeWidth!=null){
gr.setStrokeWidth(this.strokeWidth);
}
if(this.fillColor!=null){
gr.setFillColor(this.fillColor);
}
var _27=gr.drawPolygon(_24,_25);
return _27;
};
StyleLayerDescriptor.prototype.getStyleAttributes=function(_28){
this.strokeColor="#ff0000";
this.strokeWidth="1";
this.fillColor="#00ff00";
if(this.style){
var _29=this.style.selectSingleNode(_28+"/sld:Stroke/sld:CssParameter[@name='stroke']");
if(_29!=undefined){
this.strokeColor=_29.firstChild.nodeValue;
}else{
this.strokeColor=null;
}
_29=this.style.selectSingleNode(_28+"/sld:Stroke/sld:CssParameter[@name='stroke-width']");
if(_29!=undefined){
this.strokeWidth=_29.firstChild.nodeValue;
}else{
this.strokeWidth=null;
}
_29=this.style.selectSingleNode(_28+"/sld:Fill/sld:CssParameter[@name='fill']");
if(_29!=undefined){
this.fillColor=_29.firstChild.nodeValue;
}else{
this.fillColor=null;
}
}
};

var mac,win;
var opera,khtml,safari,mozilla,ie,ie50,ie55,ie60;
var canvasEnabled=false;
mapbuilder.loadScript(baseDir+"/util/sarissa/Sarissa.js");
function chkCapabilities(){
var UA=navigator.userAgent;
var AV=navigator.appVersion;
ver=parseFloat(AV);
mac=AV.indexOf("Macintosh")==-1?false:true;
win=AV.indexOf("Windows")==-1?false:true;
opera=UA.indexOf("Opera")==-1?false:true;
khtml=((AV.indexOf("Konqueror")>=0)||(AV.indexOf("Safari")>=0))?true:false;
safari=(AV.indexOf("Safari")>=0)?true:false;
mozilla=moz=((UA.indexOf("Gecko")>=0)&&(!khtml))?true:false;
ie=((document.all)&&(!opera))?true:false;
ie50=ie&&AV.indexOf("MSIE 5.0")>=0;
ie55=ie&&AV.indexOf("MSIE 5.5")>=0;
ie60=ie&&AV.indexOf("MSIE 6.0")>=0;
if(ie){
mapbuilder.loadScript(baseDir+"/graphics/VMLGraphics.js");
}else{
if(document.implementation.hasFeature("org.w3c.dom.svg","1.0")){
mapbuilder.loadScript(baseDir+"/graphics/SVGGraphics.js");
}
}
}
function VectorGraphics(id,_4,_5,_6){
if(ie){
return new VMLGraphics(id,_4,_5,_6);
}
if(safari||mozilla){
return new SVGGraphics(id,_4,_5,_6);
}
var gr=new jsGraphics(id);
return gr;
}
chkCapabilities();

mapbuilder.loadScript(baseDir+"/graphics/MapLayer.js");
mapbuilder.loadScript(baseDir+"/graphics/StyledLayerDescriptor.js");
mapbuilder.loadScript(baseDir+"/graphics/VectorGraphics.js");
mapbuilder.loadScript(baseDir+"/widget/TipWidget.js");
mapbuilder.loadScript(baseDir+"/model/Proj.js");
function RssLayer(_1,_2,_3,_4,_5,_6){
MapLayer.apply(this,new Array(_1,_2,_3,_4,_5,_6));
this.parse=function(){
var _7="xmlns:wmc='http://www.opengis.net/context' xmlns:sld='http://www.opengis.net/sld' xmlns:xlink='http://www.w3.org/1999/xlink'";
var _8=this.layerNode.ownerDocument;
Sarissa.setXpathNamespaces(_8,_7);
this.id=this.layerNode.attributes.getNamedItem("id").nodeValue;
this.layerName=this.id;
var _9=this.layerNode.selectSingleNode("//wmc:StyleList");
var _a=_9.selectSingleNode("//wmc:Style[wmc:Name='Highlite']");
var _b=_9.selectSingleNode("//wmc:Style[wmc:Name='Normal']");
this.normalSld=new StyleLayerDescriptor(_b);
this.hiliteSld=new StyleLayerDescriptor(_a);
this.title=this.layerNode.selectSingleNode("//wmc:Title").firstChild.nodeValue;
var _c=this.layerNode.selectSingleNode("//wmc:Abstract");
var _d=_c.childNodes;
this.myabstract="";
for(var j=0;j<_d.length;j++){
this.myabstract+=Sarissa.serialize(_d[j]);
}
_c=this.layerNode.selectSingleNode("//wmc:Where");
var _f=_c.firstChild;
if(_f!=undefined){
this.gmlType=_f.nodeName;
if(this.gmlType=="gml:Point"){
var pos=_f.firstChild;
this.coords=pos.firstChild.nodeValue;
}else{
if(this.gmlType=="gml:LineString"){
var _11=_f.firstChild;
var _d=_11.childNodes;
var _12=_d.length;
this.coords="";
for(var j=0;j<_12;j++){
this.coords+=_d[j].nodeValue;
}
}else{
if(this.gmlType=="gml:Polygon"){
this.coords=null;
var ext=_f.firstChild;
var _14=ext.firstChild;
if(_14.firstChild){
this.posList=_14.firstChild;
this.coords=this.posList.firstChild.nodeValue;
}
}else{
if(this.gmlType=="gml:Box"||this.gmlType=="gml:Envelope"){
var _11=_f.firstChild;
var _d=_11.childNodes;
var _12=_d.length;
this.coords="";
var c=new Array();
c=_d[0].nodeValue.split(" ");
this.coords+=c[0]+" "+c[1]+",\n"+c[2]+" "+c[1]+",\n"+c[2]+" "+c[3]+",\n"+c[0]+" "+c[3]+",\n"+c[0]+" "+c[1];
}else{
alert("Unsupported GML Geometry:"+this.gmlType);
}
}
}
}
}else{
this.coords=null;
var _16=this.layerNode.attributes.getNamedItem("id");
if(_16!=null){
var pid=_16.nodeValue;
var url="http://www.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=afbacfb4d14cd681c04a06d69b24d847&photo_id="+pid;
var _19=getProxyPlusUrl(url);
var _1a=new XMLHttpRequest();
_1a.open("GET",_19,false);
_1a.send(null);
var _1b=0;
var _1c=0;
var _1d=_1a.responseXML.selectNodes("//tag");
if(_1d.length==0){
alert(Sarissa.serialize(_1a.responseXML));
}
this.myabstract+="<br/>";
for(var i=0;i<_1d.length;++i){
var raw=_1d[i].attributes.getNamedItem("raw").nodeValue;
if(raw.indexOf("geo:lat=")>=0){
_1b=raw.substr(8);
this.myabstract+="lat:"+_1b+"<br/>";
}else{
if(raw.indexOf("geo:long=")>=0){
_1c=raw.substr(9);
this.myabstract+="long:"+_1c+"<br/>";
}
}
}
this.gmlType="gml:Point";
this.coords=_1c+","+_1b;
}
}
};
this.isWmsLayer=function(){
return false;
};
this.paintPoint=function(sld,_21){
if(_21){
sld.hilitePoint(this.gr,this.shape);
}else{
if(this.coords!=null){
var _22=new Proj(this.model.getSRS());
var re=RegExp("[, \n\t]+","g");
var _24=this.coords.split(re);
_24=_22.Forward(_24);
var _25=this.model.extent.getPL(_24);
this.shape=sld.paintPoint(this.gr,_25);
if(this.shape!=null){
this.shape.id=this.id+"_vector";
this.gr.paint();
this.install(this.shape);
}
}
}
};
this.paintPolygon=function(sld,_27){
if(_27){
sld.hilitePolygon(this.gr,this.shape);
}else{
if(this.coords!=null){
var _28=new Proj(this.model.getSRS());
var re=RegExp("[, \n\t]+","g");
var _2a=this.coords.split(re);
var _2b=new Array(_2a.length/2);
var _2c=new Array(2);
var _2d;
var jj=0;
for(var i=0;i<_2a.length;i++){
_2c[0]=_2a[i];
_2c[1]=_2a[i+1];
_2d=_28.Forward(_2c);
_2d=this.model.extent.getPL(_2d);
_2b[jj]=_2d;
jj++;
i++;
}
this.shape=sld.paintPolygon(this.gr,_2b);
this.shape.id=this.id+"_vector";
this.gr.paint();
this.install(this.shape);
}
}
};
this.paintLine=function(sld,_31){
if(_31){
sld.hiliteLine(this.gr,this.shape);
}else{
var _32=new Proj(this.model.getSRS());
var re=RegExp("[, \n\t]+","g");
var _34=this.coords.split(re);
var _35=new Array(_34.length/2);
var _36=new Array(2);
var _37;
var jj=0;
for(var i=0;i<_34.length;i++){
_36[0]=_34[i];
_36[1]=_34[i+1];
_37=_32.Forward(_36);
_37=this.model.extent.getPL(_37);
_35[jj]=_37;
jj++;
i++;
}
this.shape=sld.paintLine(this.gr,_35);
this.shape.id=this.id+"_vector";
this.gr.paint();
this.install(this.shape);
}
};
this.getDiv=function(_3a){
var _3b=document.getElementById(this.mapPane.outputNodeId).parentNode;
var div=document.getElementById("vector_elements");
if(div==null){
div=document.createElement("div");
div.setAttribute("id","vector_elements");
div.style.position="absolute";
div.style.visibility="visible";
div.style.zIndex=600;
_3b.appendChild(div);
}
div.style.top=0;
div.style.left=0;
return div;
};
this.paint=function(){
this.paint(null,null);
};
this.paint=function(_3d,img){
this.deleteShape();
this.paintShape(this.normalSld,false);
};
this.deleteShape=function(){
var id=this.id+"_vector";
var _40=document.getElementById(id);
if(_40!=null){
_40.parentNode.removeChild(_40);
_40=document.getElementById(id);
if(_40!=null){
alert("failed to remove:"+id);
}
}
};
this.unpaint=function(){
this.deleteShape();
};
this.paintShape=function(sld,_42){
if(this.gmlType=="gml:Point"){
this.paintPoint(sld,_42);
}else{
if(this.gmlType=="gml:LineString"){
this.paintLine(sld,_42);
}else{
if(this.gmlType=="gml:Polygon"||this.gmlType=="gml:Envelope"||this.gmlType=="gml:Box"){
this.paintPolygon(sld,_42);
}
}
}
};
this.install=function(_43){
_43.onmouseover=this.mouseOverHandler;
_43.onmouseout=this.mouseOutHandler;
_43.onclick=this.mouseClickHandler;
};
this.mouseOverHandler=function(ev){
var _45=document.getElementById("mainMapContainer");
if(_45){
_45.oldEventHandler=_45.onmouseup;
_45.onmouseup=null;
_45.onmousedown=null;
}
this.style.cursor="help";
return true;
};
this.mouseOutHandler=function(ev){
this.style.cursor="default";
var _47=document.getElementById("mainMapContainer");
if(_47){
_47.onmouseup=_47.oldEventHandler;
_47.onmousedown=_47.oldEventHandler;
}
return true;
};
this.mouseClickHandler=function(ev){
ev.cancelBubble=true;
if(ev.stopPropagation){
ev.stopPropagation();
}
config.objects.geoRSS.setParam("clickFeature",this.id);
return true;
};
this.clickIt=function(_49,_4a){
if(_4a.indexOf(_49.id)>=0){
var _4b=0;
var _4c=0;
var cn=window.cursorTrackNode;
if(cn){
var _4e=cn.evpl;
if(_4e!=null){
_4b=_4e[0];
_4c=_4e[1];
var _4f=_49.myabstract;
if(_4f==undefined){
_4f="Feature under construction.  Stay tuned!";
}
}
}
if(_4b>0&&_4b<_49.width&&_4c>0&&_4c<_49.height){
toolTipObjs[_49.tooltip].paint(new Array(_4b,_4c,_4a,_49.title,_4f));
}
}
};
this.highlight=function(_50,_51){
if(_51.indexOf(_50.id)>=0){
_50.paintShape(_50.hiliteSld,true);
var _52=0;
var _53=0;
var cn=window.cursorTrackNode;
if(cn){
var _55=cn.evpl;
if(_55!=null){
_52=_55[0];
_53=_55[1];
var _56=_50.myabstract;
if(_56==undefined){
_56="Feature under construction.  Stay tuned!";
}
}
}
if(_52>0&&_52<_50.width&&_53>0&&_53<_50.height){
toolTipObjs[_50.tooltip].paint(new Array(_52,_53,_51,_50.title,_56));
}
}
};
this.dehighlight=function(_57,_58){
if(_58.indexOf(_57.id)>=0){
_57.paintShape(_57.normalSld,true);
toolTipObjs[_57.tooltip].clear();
}
};
this.parse();
this.width=_4.attributes.getNamedItem("width").nodeValue;
this.height=_4.attributes.getNamedItem("height").nodeValue;
var div=this.getDiv();
this.gr=new VectorGraphics(this.id,div,this.width,this.height);
config.objects.geoRSS.addListener("highlightFeature",this.highlight,this);
config.objects.geoRSS.addListener("dehighlightFeature",this.dehighlight,this);
config.objects.geoRSS.addListener("clickFeature",this.clickIt,this);
this.tooltip=config.objects.geoRSS.tipWidgetId;
}

mapbuilder.loadScript(baseDir+"/graphics/FeatureLine.js");
function FeatureLineFactory(_1,_2,_3){
this.lines=new Array();
this.tipObjectName=_3;
}
FeatureLineFactory.prototype.clearFeatures=function(_4){
for(id in this.lines){
var _5=this.lines[id];
_5.clear(_4);
}
this.lines=new Array();
};
FeatureLineFactory.prototype.createFeature=function(_6,_7,_8,_9,_a,_b){
if(_b==null){
_b=this.normalImage;
}
var _c=new FeatureLine(_6,_7,_8,_9,_a,this.tipObjectName,this.defaultPopupPosition);
this.lines[_8]=_c;
};

function VMLGraphics(id,_2,_3,_4){
this.div=_2;
this.width=_3;
this.height=height;
return this;
}
VMLGraphics.prototype.setStrokeColor=function(x){
this.strokeStyle=x;
};
VMLGraphics.prototype.setStrokeWidth=function(x){
this.strokeWeight=x;
};
VMLGraphics.prototype.setFillColor=function(x){
this.fillStyle=x;
this.strokeStyle=x;
};
VMLGraphics.prototype.setShapeStrokeColor=function(_8,x){
_8.setAttribute("strokecolor",x);
};
VMLGraphics.prototype.setShapeStrokeWidth=function(_a,x){
_a.setAttribute("strokeweight",x);
};
VMLGraphics.prototype.setShapeFillColor=function(_c,x){
_c.setAttribute("fillcolor",x);
};
VMLGraphics.prototype.drawPolyline=function(_e,_f){
var _10=_e.length;
var _11=_e[0]+","+_f[0];
for(var i=1;i<_10;i++){
_11+=","+_e[i]+","+_f[i];
}
var _13=document.createElement("vml:polyline");
_13.style.position="absolute";
_13.style.width=""+this.width;
_13.style.height=""+this.height;
_13.filled="false";
_13.strokecolor=this.strokeStyle;
_13.strokeweight=this.strokeWeight;
_13.points=_11;
this.div.appendChild(_13);
return _13;
};
VMLGraphics.prototype.drawPolygon=function(_14,_15){
return this.drawPolyline(_14,_15);
};
VMLGraphics.prototype.fillPolygon=function(_16,_17){
var _18=this.drawPolygon(_16,_17);
_18.filled="true";
return _18;
};
VMLGraphics.prototype.drawCircle=function(X,Y,_1b){
var _1c=_1b*2;
var _1d=document.createElement("vml:oval");
var _1e=X-_1b;
var _1f=Y-_1b;
_1d.style.position="relative";
_1d.style.left=_1e;
_1d.style.top=_1f;
_1d.style.width="6";
_1d.style.height="6";
_1d.strokecolor=this.strokeStyle;
_1d.strokeweigth="1pt";
this.div.appendChild(_1d);
return _1d;
};
VMLGraphics.prototype.fillCircle=function(X,Y,_22){
var _23=_22*2;
var _24=document.createElement("vml:oval");
var _25=X-_22;
var _26=Y-_22;
_24.style.position="relative";
_24.style.left=_25;
_24.style.top=_26;
_24.style.width=_23;
_24.style.height=_23;
_24.fillcolor=this.fillStyle;
_24.strokecolor=this.fillStyle;
_24.strokeweigth="1pt";
this.div.appendChild(_24);
return _24;
};
VMLGraphics.prototype.drawImage=function(src,X,Y,_2a,_2b,dx,dy){
var _2e=X-dx;
var _2f=Y-dy;
var _30=document.createElement("vml:rect");
_30.style.position="absolute";
_30.style.left=_2e;
_30.style.top=_2f;
if(_2a!=null){
_30.style.width=_2a;
}
if(_2b!=null){
_30.style.height=_2b;
}
_30.filled="false";
_30.stroked="false";
var _31=document.createElement("vml:imagedata");
_31.src=src;
_30.appendChild(_31);
this.div.appendChild(_30);
return _30;
};
VMLGraphics.prototype.swapImage=function(_32,src){
var _34=_32.firstChild;
_34.src=src;
};
VMLGraphics.prototype.paint=function(){
};

function SldRenderer(_1){
this.style=_1;
}
SldRenderer.prototype.paint=function(gr,_3,_4,_5){
switch(_5){
case "gml:Point":
shape=this.paintPoint(gr,_3[0],_4);
break;
case "gml:LineString":
shape=this.paintLine(gr,_3,_4);
break;
case "gml:Polygon":
case "gml:LinearRing":
case "gml:Box":
case "gml:Envelope":
shape=this.paintPolygon(gr,_3,_4);
break;
}
};
SldRenderer.prototype.paintPoint=function(gr,_7,_8){
radius=2;
shape=gr.fillCircle(_7[0],_7[1],radius,_8);
return shape;
};
SldRenderer.prototype.paintLine=function(gr,_a,_b){
var _c=new Array(_a.length);
var _d=new Array(_a.length);
for(var i=0;i<_a.length;i++){
point=_a[i];
_c[i]=parseInt(point[0]);
_d[i]=parseInt(point[1]);
}
this.getStyleAttributes("sld:LineSymbolizer");
var _f=gr.drawPolyline(_c,_d,_b);
return _f;
};
SldRenderer.prototype.paintPolygon=function(gr,_11,_12){
var _13=new Array(_11.length+1);
var _14=new Array(_11.length+1);
for(var i=0;i<_11.length;i++){
point=_11[i];
_13[i]=parseInt(point[0]);
_14[i]=parseInt(point[1]);
}
_13[i]=_13[0];
_14[i]=_14[0];
this.getStyleAttributes("sld:PolygonSymbolizer");
if(this.strokeColor!=null){
gr.setStrokeColor(this.strokeColor);
}
if(this.strokeWidth!=null){
gr.setStrokeWidth(this.strokeWidth);
}
if(this.fillColor!=null){
gr.setFillColor(this.fillColor);
}
var _16=gr.drawPolygon(_13,_14,_12);
return _16;
};
SldRenderer.prototype.setStyle=function(gr,_18,_19){
this.getStyleAttributes("tbd");
gr.setShapeStrokeColor(_18,this.strokeColor);
gr.setShapeStrokeWidth(_18,this.strokeWidth);
gr.setShapeFillColor(_18,this.fillColor);
gr.setShapeFill(_18,this.fill);
};
SldRenderer.prototype.getStyleAttributes=function(_1a){
this.strokeColor="#ff0000";
this.strokeWidth="1";
this.fillColor="#00ff00";
this.fill="none";
if(this.style){
var _1b=this.style.selectSingleNode(_1a+"/sld:Stroke/sld:CssParameter[@name='stroke']");
if(_1b!=undefined){
this.strokeColor=_1b.firstChild.nodeValue;
}else{
this.strokeColor=null;
}
_1b=this.style.selectSingleNode(_1a+"/sld:Stroke/sld:CssParameter[@name='stroke-width']");
if(_1b!=undefined){
this.strokeWidth=_1b.firstChild.nodeValue;
}else{
this.strokeWidth=null;
}
_1b=this.style.selectSingleNode(_1a+"/sld:Fill/sld:CssParameter[@name='fill']");
if(_1b!=undefined){
this.fillColor=_1b.firstChild.nodeValue;
}else{
this.fillColor=null;
}
}
};

mapbuilder.loadScript(baseDir+"/graphics/Vectorgraphics.js");
function FeatureLine(_1,_2,_3,_4,_5,_6,_7){
var _8=document.createElement("div");
_8.setAttribute("id",_3+"_normal");
_8.style.position="absolute";
_8.style.visibility="visible";
_8.style.zIndex=300;
_8.tipObjectName=_6;
_8.position=_7;
this.lineNormalDiv=_8;
_1.node.appendChild(_8);
var _9=new Array(_2.length);
var _a=new Array(_2.length);
for(var i=0;i<_2.length;i++){
point=_2[i];
_9[i]=parseInt(point[0]);
_a[i]=parseInt(point[1]);
}
var gr=new VectorGraphics(_3+"_normal",_8);
gr.setColor("red");
var _d=gr.drawPolyline(_9,_a);
gr.paint();
this.install(_d,_3,_5);
return this;
}
FeatureLine.prototype.clear=function(_e){
_e.node.removeChild(this.lineNormalDiv);
};
FeatureLine.prototype.mouseOverHandler=function(ev){
this.strokecolor="yellow";
var _10=document.getElementById(this.itemId+"_normal");
var _11=window.cursorTrackObject;
var _12=window.cursorTrackNode.evpl;
var X=_12[0];
var Y=_12[1];
var _15=this.popupStr;
if(_15==undefined){
_15="Feature under construction.  Stay tuned!";
}
toolTipObjs[_10.tipObjectName].paint(new Array(""+X,""+Y,200,this.title,_15));
return true;
};
FeatureLine.prototype.mouseOutHandler=function(ev){
this.strokecolor="red";
var _17=document.getElementById(this.itemId+"_normal");
toolTipObjs[_17.tipObjectName].clear();
};
FeatureLine.prototype.install=function(_18,_19,_1a){
_18.itemId=_19;
_18.popupStr=_1a;
_18.onmouseover=this.mouseOverHandler;
_18.onmouseout=this.mouseOutHandler;
};

mapbuilder.loadScript(baseDir+"/graphics/MapLayer.js");
mapbuilder.loadScript(baseDir+"/tool/GoogleMapTools.js");
function GoogleMapLayer(_1,_2,_3,_4,_5,_6){
MapLayer.apply(this,new Array(_1,_2,_3,_4,_5,_6));
this.getDiv=function(_7){
var _8=document.getElementById(this.mapPane.outputNodeId).parentNode;
div=document.getElementById(this.layerName);
if(div==null){
div=document.createElement("div");
div.setAttribute("id",this.layerName);
div.style.position="absolute";
div.style.visibility="visible";
div.style.zIndex=_7*this.zIndexFactor;
div.style.top=0;
div.style.left=0;
div.style.width=this.mapPane.model.getWindowWidth();
div.style.height=this.mapPane.model.getWindowHeight();
_8.appendChild(div);
}
return div;
};
this.paint=function(_9,_a,_b){
div=this.getDiv(_b);
div.style.top=0;
div.style.left=0;
gmap=this.mapPane.model.getParam("gmap");
if(!gmap){
gmap=new GMap2(div);
gmap.disableDragging();
this.mapPane.model.setParam("gmap",gmap);
this.mapPane.googleMapTools=new GoogleMapTools();
this.mapPane.googleMapTools.centerAndZoom(this.mapPane.model);
this.mapPane.googleMapTools.useGoogleMapExtent(this.mapPane.model);
config.objects.gmap=gmap;
config.objects.googleMapTools=this.mapPane.googleMapTools;
}else{
this.mapPane.googleMapTools.centerAndZoom(this.mapPane.model);
}
};
}

mapbuilder.loadScript(baseDir+"/graphics/FeatureLineFactory.js");
mapbuilder.loadScript(baseDir+"/graphics/FeaturePointFactory.js");
function FeatureTrackFactory(_1,_2,_3){
this.lineFactory=new FeatureLineFactory(_1,_2,_3);
this.pointFactory=new FeaturePointFactory(_1,_2,_3);
}
FeatureTrackFactory.prototype.clearFeatures=function(_4){
this.lineFactory.clearFeatures(_4);
this.pointFactory.clearFeatures(_4);
};
FeatureTrackFactory.prototype.createFeature=function(_5,_6,_7,_8,_9,_a){
this.lineFactory.createFeature(_5,_6,_7,_8,_9,_a);
var _b=_6[_6.length-1];
this.pointFactory.createFeature(_5,_b,_7,null,null,_a);
};

mapbuilder.loadScript(baseDir+"/graphics/WmsLayer.js");
function MapLayerMgr(_1,_2){
this.layers=new Array();
this.mapPane=_1;
this.model=_2;
this.id="MapLayerMgr";
this.namespace="xmlns:mb='http://mapbuilder.sourceforge.net/mapbuilder' xmlns:wmc='http://www.opengis.net/context' xmlns:xsl='http://www.w3.org/1999/XSL/Transform'";
this.model.addListener("addLayer",this.addLayer,this);
this.model.addListener("deleteLayer",this.deleteLayer,this);
this.model.addListener("hidden",this.hiddenListener,this);
this.model.addListener("refreshWmsLayers",this.refreshWmsLayers,this);
this.model.addListener("refreshOtherLayers",this.paintOtherLayers,this);
this.model.addListener("timestamp",this.timestampListener,this);
}
MapLayerMgr.prototype.refreshWmsLayers=function(_3){
_3.d=new Date();
_3.stylesheet.setParameter("uniqueId",_3.d.getTime());
_3.paintWmsLayers(_3);
};
MapLayerMgr.prototype.timestampListener=function(_4,_5){
var _6=_4.model.timestampList.getAttribute("layerName");
var _7=_4.model.timestampList.childNodes[_5];
var _8=(_7.getAttribute("current")=="1")?"visible":"hidden";
var _9=_4.model.id+"_"+_4.id+"_"+_6+"_"+_7.firstChild.nodeValue;
var _a=document.getElementById(_9);
if(_a){
_a.style.visibility=_8;
}else{
alert("error finding layerId:"+_9);
}
};
MapLayerMgr.prototype.hiddenListener=function(_b,_c){
var _d="visible";
if(_b.model.getHidden(_c)=="1"){
_d="hidden";
}
var _e=_b.model.id+"_"+_b.mapPane.id+"_"+_c;
var _f=document.getElementById(_e);
if(_f){
_f.style.visibility=_d;
imgId="real"+_f.imgId;
img=document.getElementById(imgId);
if(img){
img.style.visibility=_d;
}
}else{
_f=_b.model.getFeatureNode(_c);
var id=_f.selectSingleNode("@id").nodeValue+"_vector";
_f=document.getElementById(id);
if(_f){
_f.setAttribute("visibility",_d);
_f.style.visibility=_d;
}
}
};
MapLayerMgr.prototype.setLayersFromContext=function(_11){
var _12=_11.model.getAllLayers();
for(var i=0;i<_12.length;i++){
var _14=_12[i];
_11.addLayer(_11,_14);
}
};
MapLayerMgr.prototype.addLayer=function(_15,_16){
var _17=null;
service=_16.selectSingleNode("wmc:Server/@service");
if(service){
service=service.nodeValue;
}
var _18=_16.nodeName;
if(service=="GoogleMap"){
_17=new GoogleMapLayer(_15.model,_15.mapPane,"GoogleMapLayer",_16,false,true);
_15.layers.push(_17);
}else{
if((service=="wms")||(service=="OGC:WMS")){
_17=_15.addWmsLayer(_15.model,_15.mapPane,_16);
}else{
if(_18.indexOf("RssLayer")>=0){
var _19=_16.getAttribute("id");
_17=new RssLayer(_15.model,_15.mapPane,_19,_16,false,true);
_15.layers.push(_17);
}else{
if(_18.indexOf("FeatureType")>=0){
var _19=_16.selectSingleNode("wmc:Name").firstChild.nodeValue;
if(_15.getLayer(_19)==null){
_17=new WfsQueryLayer(_15.model.model,_15.mapPane,_19,_16,false,true);
_15.layers.push(_17);
}
}else{
alert("Failed adding Layer:"+_18+" service:"+service);
}
}
}
}
return _17;
};
MapLayerMgr.prototype.addWmsLayer=function(_1a,_1b,_1c){
var _1d=_1c.selectSingleNode("wmc:Name");
if(_1d){
layerName=_1d.firstChild.nodeValue;
}else{
layerName="UNKNOWN";
}
var _1e=_1c.getAttribute("queryable");
var _1f=_1c.getAttribute("hidden");
var _20=new WmsLayer(_1a,_1b,layerName,_1c,_1e,_1f);
_1b.MapLayerMgr.layers.push(_20);
return _20;
};
MapLayerMgr.prototype.paintWmsLayers=function(_21){
for(var i=0;i<_21.layers.length;i++){
var _23=_21.layers[i];
if(_23.isWmsLayer()){
_23.paint(_21,null,i);
}
}
};
MapLayerMgr.prototype.paintOtherLayers=function(_24){
var _25=0;
for(var i=0;i<_24.layers.length;i++){
var _27=_24.layers[i];
if(!_27.isWmsLayer()){
_27.paint(_24,null,i);
_25++;
}
}
};
MapLayerMgr.prototype.getAllLayers=function(){
return layers;
};
MapLayerMgr.prototype.getLayer=function(_28){
for(var i=0;i<this.layers.length;i++){
if(this.layers[i].layerName==_28){
return this.layers[i];
}
}
return null;
};
MapLayerMgr.prototype.deleteAllLayers=function(){
if(this.layers){
for(var i=0;i<this.layers.length;i++){
var _2b=this.layers[i];
_2b.unpaint();
}
}
this.layers=null;
this.layers=new Array();
};
MapLayerMgr.prototype.deleteLayer=function(_2c,_2d){
for(var i=0;i<_2c.layers.length;i++){
var _2f=_2c.layers[i];
if(_2f.layerName==_2d){
_2f.unpaint();
layers=_2c.layers.splice(i,1);
}
}
};

function CanvasGraphics(id,_2){
this.div=_2;
var _3=document.createElement("canvas");
_3.setAttribute("width","800px");
_3.setAttribute("height","400px");
_3.setAttribute("style","position: absolute; top: 0pt; left: 0pt; width: 800px; height: 400px");
_2.appendChild(_3);
var _4=_3.getContext("2d");
this.context=_4;
return this;
}
CanvasGraphics.prototype.setStroke=function(x){
this.context.strokeStyle=x;
};
CanvasGraphics.prototype.setColor=function(_6){
this.context.fillStyle=_6;
this.context.strokeStyle=_6;
};
CanvasGraphics.prototype.drawPolyline=function(_7,_8){
var _9=_7.length;
this.context.beginPath();
this.context.moveTo(_7[0],_8[0]);
for(var i=1;i<_9;i++){
this.context.lineTo(_7[i],_8[i]);
}
this.context.stroke();
};
CanvasGraphics.prototype.drawPolygon=function(_b,_c){
this.drawPolyLine(_b,_c);
this.context.closePath();
};
CanvasGraphics.prototype.fillPolygon=function(_d,_e){
this.drawPolygon(_d,_e);
this.context.fill();
};
CanvasGraphics.prototype.drawCircle=function(X,Y,_11){
this.context.beginPath();
this.context.arc(X,Y,_11,0,Math.PI*2,true);
};
CanvasGraphics.prototype.fillCircle=function(X,Y,_14){
this.drawCircle(X,Y,_14);
this.context.fill();
};
CanvasGraphics.prototype.drawImage=function(src,X,Y,_18,_19){
};
CanvasGraphics.prototype.paint=function(){
};

mapbuilder.loadScript(baseDir+"/graphics/MapLayer.js");
mapbuilder.loadScript(baseDir+"/graphics/SldRenderer.js");
mapbuilder.loadScript(baseDir+"/graphics/VectorGraphics.js");
mapbuilder.loadScript(baseDir+"/widget/TipWidget.js");
mapbuilder.loadScript(baseDir+"/model/Proj.js");
function GmlLayer(_1,_2,_3,_4,_5,_6){
MapLayer.apply(this,new Array(_1,_2,_3,_4,_5,_6));
this.parse=function(){
namespace="xmlns:wmc='http://www.opengis.net/context' xmlns:sld='http://www.opengis.net/sld' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:gml='http://www.opengis.net/gml'";
Sarissa.setXpathNamespaces(this.layerNode,namespace);
this.id=this.model.id+"_"+this.mapPane.id+"_"+this.layerName;
var _7=this.layerNode.selectSingleNode("//wmc:StyleList");
if(_7){
var _8=_7.selectSingleNode("//wmc:Style[wmc:Name='Highlite']");
var _9=_7.selectSingleNode("//wmc:Style[wmc:Name='Normal']");
this.normalSld=new SldRenderer(_9);
this.hiliteSld=new SldRenderer(_8);
}else{
this.normalSld=new SldRenderer(null);
this.hiliteSld=new SldRenderer(null);
}
this.containerProj=new Proj(this.model.getSRS());
width=this.model.getWindowWidth();
height=this.model.getWindowHeight();
div=this.getDiv(this.id);
this.div=div;
this.gr=new VectorGraphics(this.id,div,width,height);
featureNodes=this.layerNode.selectNodes(".//gml:featureMember");
this.features=new Array();
for(k=0;k<featureNodes.length;k++){
this.features[k]=new Array();
this.features[k].node=featureNodes[k];
this.features[k].id=this.id+k;
this.features[k].geoCoords=this.getGeoCoords(featureNodes[k],k+1);
this.features[k].shapes=new Array();
this.features[k].sld=this.normalSld;
this.features[k].group=this.gr.getGroupTag(null,this.features[k].id+"_g");
this.normalSld.setStyle(this.gr,this.features[k].group);
}
if(featureNodes.length>0){
this.gmlType=featureNodes[0].selectSingleNode(".//gml:Point|.//gml:LineString|.//gml:Polygon|.//gml:LinearRing|.//gml:Box|.//gml:Envelope");
if(this.gmlType){
this.gmlType=this.gmlType.nodeName;
}else{
alert("Unsupported GML Geometry for layer:"+this.id);
}
}
};
this.getGeoCoords=function(_a){
coordsNodes=_a.selectNodes(".//gml:pos|.//gml:posList|.//gml:coordinates");
points=new Array();
for(h=0;h<coordsNodes.length;h++){
points[h]=new Array();
dim=2;
if(coordsNodes[h]){
d=coordsNodes[h].selectSingleNode("@srsDimension");
if(d){
dim=parseInt(d.firstChild.nodeValue);
}
coords=coordsNodes[h].firstChild.nodeValue;
}
if(coords){
var re=RegExp("[, \n\t]+","g");
point=coords.split(re);
while(point[0]==""){
point.shift();
}
while(point[point.length-1]==""){
point.pop();
}
for(i=0,j=0;i<point.length;j++,i=i+dim){
points[h][j]=new Array(point[i],point[i+1]);
}
}
}
return points;
};
this.isWmsLayer=function(){
return false;
};
this.getDiv=function(_c,_d){
var _e=document.getElementById(this.mapPane.outputNodeId).parentNode;
var _f=document.getElementById(_c);
if(_f==null){
_f=document.createElement("div");
_f.setAttribute("id",_c);
_f.style.position="absolute";
_f.style.visibility="visible";
_f.style.zIndex=600;
_e.appendChild(_f);
}
_f.style.top=0;
_f.style.left=0;
return _f;
};
this.paint=function(){
this.paint(null,null);
};
this.paint=function(_10,img){
this.paintFeatures();
};
this.unpaint=function(){
};
this.paintFeatures=function(){
for(k=0;k<this.features.length;k++){
id1=this.features[k].id+"_g";
node=document.getElementById(id1);
for(i=0;node.childNodes.length>0;){
node.removeChild(node.childNodes[0]);
}
for(h=0;h<this.features[k].geoCoords.length;h++){
screenCoords=new Array();
for(c=0;c<this.features[k].geoCoords[h].length;c++){
reproj=this.containerProj.Forward(this.features[k].geoCoords[h][c]);
screenCoords[c]=this.model.extent.getPL(reproj);
}
this.features[k].shapes[h]=this.features[k].sld.paint(this.gr,screenCoords,this.features[k].group,this.gmlType);
}
}
};
this.parse();
this.paint();
}

mapbuilder.loadScript(baseDir+"/util/Util.js");
function SVGGraphics(id,_2,_3,_4){
var _5=document.getElementById("svg_element");
if(_5==null){
_5=document.createElementNS("http://www.w3.org/2000/svg","svg");
_5.setAttribute("id","svg_element");
_5.setAttribute("width",_3);
_5.setAttribute("height",_4);
if(_2!=null){
_2.appendChild(_5);
}
}
this.svg=_5;
return this;
}
SVGGraphics.prototype.setStrokeColor=function(x){
this.strokeStyle=x;
};
SVGGraphics.prototype.setStrokeWidth=function(x){
this.strokeWeight=x;
};
SVGGraphics.prototype.setFillColor=function(x){
this.fillStyle=x;
};
SVGGraphics.prototype.setShapeStrokeColor=function(_9,x){
_9.setAttribute("stroke",x);
};
SVGGraphics.prototype.setShapeStrokeWidth=function(_b,x){
_b.setAttribute("stroke-width",x);
};
SVGGraphics.prototype.setShapeFillColor=function(_d,x){
_d.fill=x;
};
SVGGraphics.prototype.drawPolyline=function(_f,_10){
var _11=_f.length;
var pts=_f[0]+","+_10[0];
for(var i=1;i<_11;i++){
pts+=","+_f[i]+","+_10[i];
}
var _14=document.createElementNS("http://www.w3.org/2000/svg","polyline");
_14.setAttribute("points",pts);
if(this.strokeStyle){
_14.setAttribute("stroke",this.strokeStyle);
}
_14.setAttribute("fill","none");
this.svg.appendChild(_14);
return _14;
};
SVGGraphics.prototype.drawPolygon=function(_15,_16){
var _17=this.drawPolyline(_15,_16);
return _17;
};
SVGGraphics.prototype.fillPolygon=function(_18,_19){
this.drawPolygon(_18,_19);
this.fill();
};
SVGGraphics.prototype.drawCircle=function(X,Y,_1c){
};
SVGGraphics.prototype.fillCircle=function(X,Y,_1f){
var _20=document.createElementNS("http://www.w3.org/2000/svg","circle");
_20.setAttribute("cx",X);
_20.setAttribute("cy",Y);
_20.setAttribute("r",_1f);
if(this.strokeStyle){
_20.setAttribute("stroke",this.strokeStyle);
}
if(this.fillStyle){
_20.setAttribute("fill",this.fillStyle);
}
this.svg.appendChild(_20);
return _20;
};
SVGGraphics.prototype.drawImage=function(src,X,Y,_24,_25,dx,dy){
var _28=document.createElementNS("http://www.w3.org/2000/svg","image");
_28.setAttributeNS("http://www.w3.org/1999/xlink","href",src);
var _29=X-dx;
var _2a=Y-dy;
_28.setAttribute("x",_29);
_28.setAttribute("y",_2a);
if(_24!=0){
_28.setAttribute("width",_24);
}
if(_25!=0){
_28.setAttribute("height",_25);
}
this.svg.appendChild(_28);
return _28;
};
SVGGraphics.prototype.swapImage=function(_2b,src){
_2b.setAttributeNS("http://www.w3.org/1999/xlink","href",src);
};
SVGGraphics.prototype.paint=function(){
};

mapbuilder.loadScript(baseDir+"/graphics/VectorGraphics.js");
function FeaturePoint(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b){
var _c=_a.split(" ");
var _d=_b.split(" ");
var _e=document.createElement("div");
if(_5!=undefined){
_e.setAttribute("id",_3+"_normal");
}else{
_e.setAttribute("id",_3+"_lastPos");
}
_e.style.position="absolute";
_e.style.visibility="visible";
_e.style.zIndex=300;
_e.tipObjectName=_6;
_e.title=_4;
var X=_2[0];
var Y=_2[1];
var gr=new VectorGraphics(_3+"_normal",_e);
gr.setColor("red");
var _12=gr.fillCircle(X,Y,3);
_12.itemId=_3;
gr.paint();
this.install(_12,_3,_5);
_1.node.appendChild(_e);
this.normalImageDiv=_e;
return this;
}
FeaturePoint.prototype.clear=function(_13){
var img=this.normalImageDiv.firstChild;
img.onmouseover=null;
img.onmouseout=null;
_13.node.removeChild(this.normalImageDiv);
if(this.highlightImageDiv!=undefined){
img=this.highlightImageDiv.firstChild;
img.onmouseover=null;
img.onmouseout=null;
_13.node.removeChild(this.highlightImageDiv);
}
};
FeaturePoint.prototype.mouseOverHandler=function(ev){
this.strokecolor="yellow";
this.fillcolor="yellow";
normalImageDiv=document.getElementById(this.itemId+"_normal");
var _16=window.cursorTrackObject;
var _17=window.cursorTrackNode.evpl;
var X=_17[0];
var Y=_17[1];
var _1a=this.popupStr;
if(_1a==undefined){
_1a="Feature under construction.  Stay tuned!";
}
toolTipObjs[normalImageDiv.tipObjectName].paint(new Array(""+X,""+Y,200,this.title,_1a));
return false;
};
FeaturePoint.prototype.mouseOutHandler=function(ev){
this.strokecolor="red";
this.fillcolor="red";
var _1c=document.getElementById(this.itemId+"_normal");
_1c.style.visibility="visible";
toolTipObjs[_1c.tipObjectName].clear();
};
FeaturePoint.prototype.install=function(_1d,_1e,_1f){
_1d.itemId=_1e;
_1d.popupStr=_1f;
_1d.onmouseover=this.mouseOverHandler;
_1d.onmouseout=this.mouseOutHandler;
};

mapbuilder.loadScript(baseDir+"/graphics/MapLayer.js");
mapbuilder.loadScript(baseDir+"/graphics/StyledLayerDescriptor.js");
mapbuilder.loadScript(baseDir+"/graphics/VectorGraphics.js");
mapbuilder.loadScript(baseDir+"/widget/TipWidget.js");
mapbuilder.loadScript(baseDir+"/model/Proj.js");
function WfsQueryLayer(_1,_2,_3,_4,_5,_6){
MapLayer.apply(this,new Array(_1,_2,_3,_4,_5,_6));
this.id="WfsQueryLayer";
this.model=_1;
this.uuid=_4.getAttribute("id");
this.featureCount=0;
this.parse=function(){
var _7="xmlns:wmc='http://www.opengis.net/context' xmlns:ows='http://www.opengis.net/ows' xmlns:sld='http://www.opengis.net/sld' xmlns:xlink='http://www.w3.org/1999/xlink'";
var _8=this.layerNode.ownerDocument;
Sarissa.setXpathNamespaces(_8,_7);
var _9=this.layerNode.selectSingleNode("wmc:StyleList");
if(_9==null){
alert("cannot find style node");
}
var _a=_9.selectSingleNode("wmc:Style[wmc:Name='Highlite']");
var _b=_9.selectSingleNode("wmc:Style[wmc:Name='Normal']");
this.normalSld=new StyleLayerDescriptor(_b);
this.hiliteSld=new StyleLayerDescriptor(_a);
this.title=this.layerNode.selectSingleNode("wmc:Title").firstChild.nodeValue;
};
this.paintPoint=function(_c,_d){
if(_d){
_c.hilitePoint(this.gr,this.shape);
}else{
if(this.coords!=null){
var _e=new Proj(this.model.containerModel.getSRS());
var re=RegExp("[, \n\t]+","g");
var _10=this.coords.split(re);
_10=_e.Forward(_10);
var _11=this.model.containerModel.extent.getPL(_10);
this.shape=_c.paintPoint(this.gr,_11);
if(this.shape!=null){
this.shape.id=this.id+"_vector";
this.gr.paint();
this.install(this.shape);
}
}
}
};
this.paintPolygon=function(sld,_13){
if(_13){
sld.hilitePolygon(this.gr,this.shape);
}else{
if(this.coords!=null){
var _14=new Proj(this.model.containerModel.getSRS());
var re=RegExp("[, \n\t]+","g");
var _16=this.coords.split(re);
var _17=new Array(_16.length/2);
var _18=new Array(2);
var _19;
var jj=0;
for(var i=0;i<_16.length;i++){
_18[0]=_16[i];
_18[1]=_16[i+1];
_19=_14.Forward(_18);
_19=this.model.containerModel.extent.getPL(_19);
_17[jj]=_19;
jj++;
i++;
}
this.shape=sld.paintPolygon(this.gr,_17);
this.shape.id=this.id+"_vector";
this.gr.paint();
this.install(this.shape);
}
}
};
this.paintLine=function(sld,_1d){
if(_1d){
sld.hiliteLine(this.gr,this.shape);
}else{
var _1e=new Proj(this.model.containerModel.getSRS());
var re=RegExp("[, \n\t]+","g");
var _20=this.coords.split(re);
var _21=new Array(_20.length/2);
var _22=new Array(2);
var _23;
var jj=0;
for(var i=0;i<_20.length;i++){
_22[0]=_20[i];
_22[1]=_20[i+1];
_23=_1e.Forward(_22);
_23=this.model.extent.containerModel.getPL(_23);
_21[jj]=_23;
jj++;
i++;
}
this.shape=sld.paintLine(this.gr,_21);
this.shape.id=this.id+"_vector";
this.gr.paint();
this.install(this.shape);
}
};
this.getDiv=function(_26){
var _27=document.getElementById(this.mapPane.outputNodeId).parentNode;
var div=document.getElementById("vector_elements");
if(div==null){
div=document.createElement("div");
div.setAttribute("id","vector_elements");
div.style.position="absolute";
div.style.visibility="visible";
div.style.zIndex=600;
_27.appendChild(div);
}
div.style.top=0;
div.style.left=0;
return div;
};
this.paint=function(){
this.paint(null,null);
};
this.paint=function(_29,img){
this.deletePreviousFeatures();
var _2b=this.model.getFeatureNodes();
for(var i=0;i<_2b.length;i++){
featureNode=_2b[i];
type=this.model.getFeatureGeometry(featureNode);
if(type!=undefined){
this.gmlType=type.nodeName;
if(this.gmlType=="gml:Point"){
var pos=type.firstChild;
this.coords=pos.firstChild.nodeValue;
}else{
if(this.gmlType=="gml:LineString"){
var _2e=type.firstChild;
var _2f=_2e.childNodes;
var _30=_2f.length;
this.coords="";
for(var j=0;j<_30;j++){
this.coords+=_2f[j].nodeValue;
}
}else{
if(this.gmlType=="gml:Polygon"){
this.coords=null;
var ext=type.firstChild;
var _33=ext.firstChild;
if(_33.firstChild){
this.posList=_33.firstChild;
this.coords=this.posList.firstChild.nodeValue;
}
}else{
if(this.gmlType=="gml:Box"||this.gmlType=="gml:Envelope"){
var _2e=type.firstChild;
var _2f=_2e.childNodes;
var _30=_2f.length;
this.coords="";
var c=new Array();
c=_2f[0].nodeValue.split(" ");
this.coords+=c[0]+" "+c[1]+",\n"+c[2]+" "+c[1]+",\n"+c[2]+" "+c[3]+",\n"+c[0]+" "+c[3]+",\n"+c[0]+" "+c[1];
}else{
alert("Unsupported GML Geometry:"+this.gmlType);
}
}
}
}
}
this.id="wfs_"+this.uuid+"_"+i;
this.paintShape(this.normalSld,false);
}
this.featureCount=_2b.length;
};
this.deleteShape=function(){
var id=this.id+"_vector";
var _36=document.getElementById(id);
while(_36!=null){
var _37=_36.parentNode;
_37.removeChild(_36);
_36=document.getElementById(id);
}
};
this.deletePreviousFeatures=function(){
for(var i=0;i<this.featureCount;i++){
this.id="wfs_"+this.uuid+"_"+i;
this.deleteShape();
}
};
this.unpaint=function(){
var _39=this.model.getFeatureNodes();
for(var i=0;i<_39.length;i++){
this.id="wfs_"+this.uuid+"_"+i;
this.deleteShape();
}
};
this.paintShape=function(sld,_3c){
if(this.gmlType=="gml:Point"){
this.paintPoint(sld,_3c);
}else{
if(this.gmlType=="gml:LineString"){
this.paintLine(sld,_3c);
}else{
if(this.gmlType=="gml:Polygon"||this.gmlType=="gml:Envelope"||this.gmlType=="gml:Box"){
this.paintPolygon(sld,_3c);
}
}
}
};
this.install=function(_3d){
_3d.onmouseover=this.mouseOverHandler;
_3d.onmouseout=this.mouseOutHandler;
_3d.onmouseup=this.mouseClickHandler;
_3d.model=this.model.id;
};
this.mouseOverHandler=function(ev){
var _3f=this.getAttribute("id").split("_");
var id=_3f[2];
var _41=document.getElementById("mainMapContainer");
if(_41){
_41.oldEventHandler=_41.onmouseup;
_41.onmouseup=null;
_41.onmousedown=null;
}
this.style.cursor="help";
return true;
};
this.mouseOutHandler=function(ev){
this.style.cursor="default";
var _43=this.getAttribute("id").split("_");
var id=_43[2];
var _45=document.getElementById("mainMapContainer");
if(_45){
_45.onmouseup=_45.oldEventHandler;
_45.onmousedown=_45.oldEventHandler;
}
this.style.cursor="default";
return true;
};
this.mouseClickHandler=function(ev){
var _47=this.getAttribute("id").split("_");
var id=_47[2];
config.objects[this.model].setParam("clickFeature",id);
return true;
};
this.clickIt=function(_49,_4a){
var _4b=_49.model.getFeatureNodes();
var _4c=_4b[_4a];
toolTipObjs[_49.tooltip].paintXSL(_4c);
};
this.highlight=function(_4d,_4e){
_4d.paintShape(_4d.hiliteSld,true);
var _4f=_4d.model.getFeatureNodes();
var _50=_4f[_4e];
toolTipObjs[_4d.tooltip].paintXSL(_50);
};
this.dehighlight=function(_51,_52){
_51.paintShape(_51.normalSld,true);
toolTipObjs[_51.tooltip].clear();
};
this.parse();
this.width=null;
this.height=null;
var div=this.getDiv();
this.gr=new VectorGraphics(this.id,div,this.width,this.height);
config.objects[this.model.id].addListener("highlightFeature",this.highlight,this);
config.objects[this.model.id].addListener("dehighlightFeature",this.dehighlight,this);
config.objects[this.model.id].addListener("clickFeature",this.clickIt,this);
this.tooltip=config.objects[this.model.id].tipWidgetId;
}

MapLayer=function(_1,_2,_3,_4,_5,_6){
this.model=_1;
this.mapPane=_2;
this.layerName=_3;
this.layerNode=_4;
this.queryable=_5;
this.visible=_6;
this.zIndexFactor=500;
this.paint=function(_7,_8){
};
this.unpaint=function(){
};
this.isWmsLayer=function(){
return false;
};
};

function VMLGraphics2(id,_2,_3,_4){
this.div=_2;
this.width=_3;
this.height=height;
return this;
}
VMLGraphics2.prototype.getGroupTag=function(_5,id){
tag=document.getElementById(id);
if(!tag){
tag=document.createElement("div");
tag.setAttribute("id",id);
if(!_5){
_5=this.div;
}
_5.appendChild(tag);
}
return tag;
};
VMLGraphics2.prototype.setStrokeColor=function(x){
this.strokeStyle=x;
};
VMLGraphics2.prototype.setStrokeWidth=function(x){
this.strokeWeight=x;
};
VMLGraphics2.prototype.setFillColor=function(x){
this.fillStyle=x;
this.strokeStyle=x;
};
VMLGraphics2.prototype.setShapeStrokeColor=function(_a,x){
_a.setAttribute("strokecolor",x);
};
VMLGraphics2.prototype.setShapeStrokeWidth=function(_c,x){
_c.setAttribute("strokeweight",x);
};
VMLGraphics2.prototype.setShapeFillColor=function(_e,x){
_e.setAttribute("fillcolor",x);
};
VMLGraphics2.prototype.setShapeFill=function(_10,x){
if(x=="none"){
_10.setAttribute("filled",false);
}else{
_10.setAttribute("filled",true);
}
};
VMLGraphics2.prototype.drawPolyline=function(_12,_13,_14){
var _15=_12.length;
var _16=_12[0]+","+_13[0];
for(var i=1;i<_15;i++){
_16+=","+_12[i]+","+_13[i];
}
var _18=document.createElement("vml:polyline");
_18.style.position="absolute";
_18.style.width=""+this.width;
_18.style.height=""+this.height;
_18.filled="false";
_18.strokecolor="#FF0000";
_18.strokeweight="1";
_18.points=_16;
_14.appendChild(_18);
return _18;
};
VMLGraphics2.prototype.drawPolygon=function(_19,_1a,_1b){
return this.drawPolyline(_19,_1a,_1b);
};
VMLGraphics2.prototype.fillPolygon=function(_1c,_1d){
var _1e=this.drawPolygon(_1c,_1d);
_1e.filled="true";
return _1e;
};
VMLGraphics2.prototype.drawCircle=function(X,Y,_21){
alert("VMLGraphics2.drawCircle");
var _22=_21*2;
var _23=document.createElement("vml:oval");
var _24=X-_21;
var _25=Y-_21;
_23.style.position="relative";
_23.style.left=_24;
_23.style.top=_25;
_23.style.width="6";
_23.style.height="6";
_23.strokecolor=this.strokeStyle;
_23.strokeweigth="1pt";
this.div.appendChild(_23);
return _23;
};
VMLGraphics2.prototype.fillCircle=function(X,Y,_28){
var _29=_28*2;
var _2a=document.createElement("vml:oval");
var _2b=X-_28;
var _2c=Y-_28;
_2a.style.position="relative";
_2a.style.left=_2b;
_2a.style.top=_2c;
_2a.style.width=_29;
_2a.style.height=_29;
_2a.fillcolor="#00FF00";
_2a.strokecolor="#00FF00";
this.div.appendChild(_2a);
return _2a;
};
VMLGraphics2.prototype.drawImage=function(src,X,Y,_30,_31,dx,dy){
var _34=X-dx;
var _35=Y-dy;
var _36=document.createElement("vml:rect");
_36.style.position="absolute";
_36.style.left=_34;
_36.style.top=_35;
if(_30!=null){
_36.style.width=_30;
}
if(_31!=null){
_36.style.height=_31;
}
_36.filled="false";
_36.stroked="false";
var _37=document.createElement("vml:imagedata");
_37.src=src;
_36.appendChild(_37);
this.div.appendChild(_36);
return _36;
};
VMLGraphics2.prototype.swapImage=function(_38,src){
var _3a=_38.firstChild;
_3a.src=src;
};
VMLGraphics2.prototype.paint=function(){
};

