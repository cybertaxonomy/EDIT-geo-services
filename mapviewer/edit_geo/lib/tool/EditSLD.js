mapbuilder.loadScript(baseDir+"/tool/ToolBase.js");
function EditSLD(toolNode,model){
ToolBase.apply(this,new Array(toolNode,model));
var styleUrl=baseDir+"/tool/xsl/wmc_AddSld.xsl";this.stylesheet=new XslProcessor(styleUrl);
this.checkThis=function(){
if(document.getElementById("textStyle").checked==true)
{ 
this.addNodeToSLD("TextSymbolizer");
document.getElementById("textStyle").checked=true;
manageDiv('propertyText',1);
alert("checked");
alert(Sarissa.serialize(this.model.doc));
}
else 
{
if(this.model.doc.selectSingleNode("//TextSymbolizer")!=null)
{xpath="//FeatureTypeStyle";
node=this.model.doc.selectSingleNode(xpath);
node.removeChild(this.model.doc.selectSingleNode("//TextSymbolizer").parentNode);
this.addNodeToSLD(document.getElementById("choixFeatureType").value+"Symbolizer");
manageDiv('propertyText',0);
alert(Sarissa.serialize(this.model.doc));
}
}
}
this.updateNode=function(xpath,value){
if(xpath=='//MinScaleDenominator2')
{
node=this.model.doc.selectNodes("//MinScaleDenominator"); 
node[1].firstChild.nodeValue=value;
}
else if(xpath=='//MaxScaleDenominator2')
{
node2=this.model.doc.selectNodes("//MaxScaleDenominator");
node2[1].firstChild.nodeValue=value;
}
else if((this.model.doc.selectSingleNode(xpath)!=null)&&(value))
{ 
this.model.setXpathValue(this.model,xpath,value,false);
}
}
this.insertSldToWmc=function(layerName)
{ 
if(layerName)
{ 
var feature=this.model.getSldNode();
var newNode=this.stylesheet.transformNodeToObject(feature);
Sarissa.setXpathNamespaces(newNode,this.targetModel.namespace);
if(this.debug)alert(newNode.xml);
legendURLNode=this.targetModel.doc.selectSingleNode("//wmc:Layer[wmc:Name='"+layerName+"']/wmc:StyleList/wmc:Style/wmc:LegendURL");
layerNode=this.targetModel.doc.selectSingleNode("//wmc:Layer[wmc:Name='"+layerName+"']");
styleNode=this.targetModel.doc.selectSingleNode("//wmc:Layer[wmc:Name='"+layerName+"']/wmc:StyleList");
if(styleNode)
{
layerNode.removeChild(styleNode);
}
this.targetModel.setParam('addSLD',newNode.documentElement);
if(legendURLNode)
{ 
styleNode=this.targetModel.doc.selectSingleNode("//wmc:Layer[wmc:Name='"+layerName+"']/wmc:StyleList/wmc:Style") 
styleNode.appendChild(legendURLNode);
}
config.objects.mainMap.setParam("refresh");
}
else alert("Select a layer if you want insert sld in wmc");
}
this.insertSldaToWmc=function(layerName){
if(layerName)
{
sl=this.targetModel.doc.createElement("StyleList");
st=this.targetModel.doc.createElement("Style");
st.setAttribute("current","1");
sld=this.targetModel.doc.createElement("SLD");
node=this.model.doc.selectSingleNode("//StyledLayerDescriptor").cloneNode('true');
sld.appendChild(node);
st.appendChild(sld);
sl.appendChild(st);
layerNode=this.targetModel.doc.selectSingleNode("//wmc:Layer[wmc:Name='"+layerName+"']");
styleNode=this.targetModel.doc.selectSingleNode("//wmc:Layer[wmc:Name='"+layerName+"']/wmc:StyleList");
if(styleNode)
{
layerNode.removeChild(styleNode);
layerNode.appendChild(sl);
config.objects.mainMap.setParam("refresh");
}
else
{ 
layerNode.appendChild(sl);
config.objects.mainMap.setParam("refresh");
}
alert("Apres : "+Sarissa.serialize(this.targetModel.doc));
}
else alert("Select a layer if you want insert sld in wmc");
}
this.validSld=function(layerName)
{ 
if(!layerName)
{
alert("pas de layer selectionnee");
}
else if(((document.getElementById("textStyle").checked==true)&&(document.getElementById("selectPropertyCanvas")))||(document.getElementById("textStyle").checked==false))
{ 
this.updateNodeCss(document.getElementById("fill").id,'//PolygonSymbolizer/Fill/CssParameter[@name=',document.getElementById('fill').value);
this.updateNodeCss(document.getElementById('fill').id,'//PointSymbolizer/Graphic/Mark/Fill/CssParameter[@name=',document.getElementById('fill').value);
this.updateNodeCss(document.getElementById('stroke').id,'//CssParameter[@name=',document.getElementById('stroke').value);
this.updateNodeCss('fill','//TextSymbolizer/Fill/CssParameter[@name=',document.getElementById('fontColor').value);
this.insertSldToWmc(layerName);
config.loadModel('mySLD',this.model.url);
}
else if(!document.getElementById("selectPropertyCanvas"))
{
alert("pas de propriete selectionnee");
}
}
}
