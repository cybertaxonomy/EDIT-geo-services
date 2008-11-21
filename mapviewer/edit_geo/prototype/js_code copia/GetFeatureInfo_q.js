/*
License: LGPL as per: http://www.gnu.org/copyleft/lesser.html
Dependancies: Context
$Id: GetFeatureInfo.js 1802 2005-11-12 03:31:35Z madair1 $
*/

// Ensure this object's dependancies are loaded.
//mapbuilder.loadScript(baseDir+"/tool/jquery.js");

mapbuilder.loadScript(baseDir+"/tool/ButtonBase.js");
/**
 * Implements WMS GetFeatureInfo functionality, popping up a query result
 * window when user clicks on map.
 * @constructor
 * @base ButtonBase
 * @author adair
 * @constructor
 * @param toolNode The XML node in the Config file referencing this object.
 * @param model The widget object which this tool is associated with.
 */
function GetFeatureInfo(widgetNode, model) {
  // Extend ButtonBase
  ButtonBase.apply(this, new Array(widgetNode, model));
  
  /**
   * Calls the centerAt method of the context doc to zoom out, recentering at 
   * the mouse event coordinates.
   * TBD: set the zoomBy property as a button property in conifg
   * @param objRef      Pointer to this AoiMouseHandler object.
   * @param targetNode  The node for the enclosing HTML tag for this widget.
   */
  this.doAction = function(objRef,targetNode) {
  //si l'eina no està activada, no fer res
    if (!objRef.enabled) return;
	//$('#content').empty();

	//alert("usant getfeatureinfo");
	var point=config.objects.mainMap.extent.getXY(config.objects.mainAoi.anchorPoint);
	//var iframe=$('iframe#info');  //the poinid of the iframe
    var carrega=function (point) 
	{
    x = parseFloat(point[0]);	// make into floats
	y = parseFloat(point[1]);
	var ul = new Array();// x, y
	var ur = new Array();
	var bl = new Array();
	var br = new Array();// x, y	
	ul[0] = x-0.1;
	ul[1] = y+0.1;
	bl[0]= x-0.1;
	bl[1]= y-0.1;
	ur[0]= x+0.1;
	ur[1]= y +0.1;
	br[0] = x+0.1;
	br[1] = y-0.1;
    bbox=[];
	bbox.push(ul,bl,ur,br,ul);	
	//console.info(bbox);
   
	};
	carrega(point);
	$.getScript('js_code/bind_results.js');	
	

	  
	
  }

  /**
   * Register for mouseUp events.
   * @param objRef  Pointer to this object.
   */
  this.setMouseListener = function(objRef) {
    if (objRef.mouseHandler) {
      objRef.mouseHandler.model.addListener('mouseup',objRef.doAction,objRef);
	
    }
  
	objRef.context=objRef.widgetNode.selectSingleNode("mb:context");
	if(objRef.context){
		objRef.context=window.config.objects[objRef.context.firstChild.nodeValue];
			}
  }
  config.addListener( "loadModel", this.setMouseListener, this );
  
}

