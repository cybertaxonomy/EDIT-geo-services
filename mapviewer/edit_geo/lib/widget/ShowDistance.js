mapbuilder.loadScript(baseDir+"/widget/WidgetBaseXSL.js");
function ShowDistance(widgetNode,model){
WidgetBaseXSL.apply(this,new Array(widgetNode,model));
this.showDistance=function(objRef){
objRef.distForm=document.getElementById(objRef.formName); 
var totalDistance=objRef.model.values.showDistance;
if(totalDistance>1000.000){if(totalDistance>1000000.000)outputDistance=Math.round(totalDistance/1000)+"  km";else outputDistance=Math.round(totalDistance/100)/10+"  km";
}
else{outputDistance=Math.round(totalDistance)+"  m";}
objRef.distForm.distance.value=outputDistance;
}
this.model.addListener("showDistance",this.showDistance,this);
this.formName="ShowDistance_"+mbIds.getId();
this.stylesheet.setParameter("formName",this.formName); 
}
