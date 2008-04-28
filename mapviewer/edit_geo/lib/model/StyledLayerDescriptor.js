function StyledLayerDescriptor(modelNode,parent)
{
ModelBase.apply(this,new Array(modelNode,parent));
this.namespace="xmlns:sld='http://www.opengis.net/sld' xmlns:mb='http://mapbuilder.sourceforge.net/mapbuilder' xmlns:wmc='http://www.opengis.net/context' xmlns:wms='http://www.opengis.net/wms' xmlns:xsl='http://www.w3.org/1999/XSL/Transform' xmlns:ogc='http://www.opengis.net/ogc' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:wfs='http://www.opengis.net/wfs'";
this.getSldNode=function()
{
return this.doc.selectSingleNode("/StyledLayerDescriptor");
//return this.doc.selectSingleNode("/Rule");
}
//crear funcions per crear tants getFilterNodes com sigui;
//hem de definir un array (filtres) que contendrà el nom de les especies que passarem a la funció i als futurs Filtres. 
this.getFilterNode=function() 
{
return this.doc.selectSingleNode("/StyledLayerDescriptor/NamedLayer/UserStyle/FeatureTypeStyle/Rule/Filter");
}

}
