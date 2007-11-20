MapLayer=function(model,mapPane,layerName,layerNode,queryable,visible){
this.model=model;
this.mapPane=mapPane;
this.layerName=layerName;
this.layerNode=layerNode;
this.queryable=queryable;
this.visible=visible;
this.zIndexFactor=500;
this.paint=function(objRef,img){
}
this.unpaint=function(){
}
this.isWmsLayer=function(){
return false;
}
}
