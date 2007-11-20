mapbuilder.loadScript(baseDir+"/widget/WidgetBase.js");
function SLDEditor(modelNode,parent){
WidgetBaseXSL.apply(this,new Array(modelNode,parent));
this.refresh=function(objRef,layerName){
objRef.stylesheet.setParameter("layerName",layerName);
objRef.paint(objRef,objRef.id);
}
this.model.addListener("SLDChange",this.refresh,this);
this.setAttr=function(objRef,xpath,value,attr){
if(attr)
{
xpath=xpath+"[@name='"+attr+"']";
}
objRef.model.setXpathValue(objRef.model,xpath,value);
}
}
