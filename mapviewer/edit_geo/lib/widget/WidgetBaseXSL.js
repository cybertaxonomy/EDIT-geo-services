mapbuilder.loadScript(baseDir+"/widget/WidgetBase.js");
mapbuilder.loadScript(baseDir+"/tool/jquery.js");
function WidgetBaseXSL(widgetNode,model){
WidgetBase.apply(this,new Array(widgetNode,model));
if(!this.stylesheet){
var styleNode=widgetNode.selectSingleNode("mb:stylesheet");
if(styleNode){
this.stylesheet=new XslProcessor(styleNode.firstChild.nodeValue,model.namespace);
}else{
this.stylesheet=new XslProcessor(baseDir+"/widget/"+widgetNode.nodeName+".xsl",model.namespace);
}
}
if(config.widgetText){
var textNodeXpath="/mb:WidgetText/mb:widgets/mb:"+widgetNode.nodeName;
var textParams=config.widgetText.selectNodes(textNodeXpath+"/*");
for(var j=0;j<textParams.length;j++){
this.stylesheet.setParameter(textParams[j].nodeName,textParams[j].firstChild.nodeValue);
}
}
for(var j=0;j<widgetNode.childNodes.length;j++){
if(widgetNode.childNodes[j].firstChild
&&widgetNode.childNodes[j].firstChild.nodeValue)
{
this.stylesheet.setParameter(
widgetNode.childNodes[j].nodeName,
widgetNode.childNodes[j].firstChild.nodeValue);
}
}
this.stylesheet.setParameter("modelId",this.model.id);
this.stylesheet.setParameter("modelTitle",this.model.title);
this.stylesheet.setParameter("widgetId",this.id);
this.stylesheet.setParameter("skinDir",config.skinDir);
this.stylesheet.setParameter("lang",config.lang);
this.paint=function(objRef,refreshId){
if(refreshId&&(refreshId!=objRef.id))return;
if(objRef.model.doc&&objRef.node){
objRef.stylesheet.setParameter("modelUrl",objRef.model.url);
objRef.stylesheet.setParameter("targetModelId",objRef.targetModel.id);
objRef.resultDoc=objRef.model.doc;objRef.prePaint(objRef);
if(objRef.debug)alert("prepaint:"+Sarissa.serialize(objRef.resultDoc));
if(objRef.debug)alert("stylesheet:"+Sarissa.serialize(objRef.stylesheet.xslDom));
var outputNode=document.getElementById(objRef.outputNodeId);
var tempNode=document.createElement("DIV");
var s=objRef.stylesheet.transformNodeToString(objRef.resultDoc);
if(config.serializeUrl&&objRef.debug)postLoad(config.serializeUrl,s);
if(objRef.debug)alert("painting:"+objRef.id+":"+s);
tempNode.innerHTML=s;
if(tempNode.firstChild!=null){tempNode.firstChild.setAttribute("id",objRef.outputNodeId);

if(outputNode)

//si hem creat <DIV id="outputNodeId"> anteriorment...
{

objRef.node.replaceChild(tempNode.firstChild,outputNode);
//alert("OUTPUTNODE:  "+outputNode); //no fa res per què no s'efectua (outputNode=null)
//substituïm un resultat de widget per un altre 
//replaceChild: The replaceChild() method allows you to replace one node by another. Just as with appendChild() and insertBefore(), if the inserted node is already present in the document, it is removed from its current position. The inserted and replaced nodes retain all their child nodes.
}
else
//si encara no hem creat el widget...
{
if (widgetNode.nodeName != 'FeatureInfo') 
//if (model.nodeName != 'Context')   Sembla que no és correcte
//Si tenim FeatureInfo com a widget (sense dins d'un model), efectua else!
{
//alert("OUTPUTNODE model:  "+outputNode);//____ valor "null"
//per qualsevlo widget excepte FeatureInfo, afegir fill "temporal" creat abans
objRef.node.appendChild(tempNode.firstChild);
} 
else 
{
//$("#left").empty();
//$("<h2><p>Resultats amb 42</p></h2>").appendTo("#esquerra");


//$("#titol").html("<b>Nova INFORMACIO</b>");
nou=document.getElementById('left');

//nou=document.getElementById('workspace');
var childs=nou.childNodes;
//alert("numero childs :"+childs.length);
if (childs.length < 1) {
objRef.node.appendChild(tempNode.firstChild);
}
else {

 //alert("numero childs major de 1:"+childs.length);
 $("#left").empty();
 //$("<div><h2><p>Resultats amb 4</p></h2></div>").appendTo("#workspace");
 objRef.node.appendChild(tempNode.firstChild);

 // $("#workspace.table[@class='resultat']").css({'color':'blue'});
//var length=childs.length;
//alert("mes de 1 reposta: "+length);
//ultim=childs[length];
//alert("ultim: "+ultim);
//previous=childs[0].nodeName; 
//alert("previous :"+previous);//resposta: DIV
//next=childs[1];

//alert("estem aplicant el widget  :"+id);
//objRef.node.appendChild(tempNode.firstChild);
//tempNode.firstChild.appendChild(outputNode.firstChild, outputNode);

//objRef.node.replaceChild(tempNode.firstChild);
//alert("ara dibuixem: "+tempNode); //object HTMLDivElement

}


}
}
}
objRef.postPaint(objRef);
}

}
this.model.addListener("refresh",this.paint,this);
this.clearWidget=function(objRef){
var outputNode=document.getElementById(objRef.outputNodeId);
if(outputNode)objRef.node.removeChild(outputNode);
}
this.model.addListener("newModel",this.clearWidget,this);
}

