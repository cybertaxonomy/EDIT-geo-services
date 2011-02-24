<?php
$OLURL="http://edit.br.fgov.be:8080/geoserver/openlayers/OpenLayers.js";
				$urlBckLayers=Array();
			//$urlBckLayers[]="http://edit.br.fgov.be/geoserver/wms?service=WMS&version=1.1.1&transparent=true&STYLES=&request=GetMap&service=WMS&epsg=4326&layers=topp:rest_points&format=image/png&bbox=13.50,51.4,15,52.7&width=400&height=350";
			//$urlBckLayers[]="http://isk.geobasis-bb.de/ows/dnm.php?service=WMS&version=1.1.0&request=GetMap&layers=bg,vegetation,gewaesser,siedlung,bln,brb,transport,verkehrsobjekte,strassennamen,ortsnamen,gewaessernamen&styles=&bbox=13.846,51.986,13.912,52.107&width=279&height=512&srs=EPSG:4326&format=image/png";
			$urlBckLayers[]="http://edit.br.fgov.be/geoserver/wms?SERVICE=WMS&VERSION=1.1.1&TRANSPARENT=true&REQUEST=GetMap&SERVICE=WMS&EPSG=4326&layers=europe_west_level_0&EPSG=4326&format=image/png&bbox=13.50,51.4,15,52.7&WIDTH=400&HEIGHT=350&STYLE=";
			/*$urlBckLayers[]="http://edit.br.fgov.be/geoserver/wms?service=WMS&version=1.1.1&transparent=true&STYLES=&request=GetMap&service=WMS&epsg=4326&layers=topp:rest_points&format=image/png&bbox=13.50,51.4,15,52.7&width=400&height=350&SLD=http://edit.br.fgov.be/test_debug/point_271.sld";
			$urlBckLayers[]="http://edit.br.fgov.be/geoserver/wms?service=WMS&VERSION=1.1.1&transparent=true&request=GetMap&service=WMS&layers=bio_spree&EPSG=4326&format=image/png&bbox=13.50,51.4,15,52.7&width=400&height=350&STYLE=";
			$urlBckLayers[]="http://edit.br.fgov.be/geoserver/wms?service=WMS&VERSION=1.1.1&transparent=true&request=GetMap&service=WMS&layers=inob_sprew&EPSG=4326&format=image/png&bbox=13.50,51.4,15,52.7&width=400&height=350&STYLE=";
			$urlBckLayers[]="http://edit.br.fgov.be/geoserver/wms?service=WMS&VERSION=1.1.1&transparent=true&request=GetMap&service=WMS&layers=inun_sprew&EPSG=4326&format=image/png&bbox=13.50,51.4,15,52.7&width=400&height=350&STYLE=";
			*/
			$urlBckLayers[]="http://edit.br.fgov.be:8080/geoserver/wms?service=WMS&VERSION=1.1.1&transparent=true&request=GetMap&service=WMS&layers=topp:waldsee_geb,topp:bio_spree,topp:inob_sprew,topp:inun_sprew&EPSG=4326&format=image/png&bbox=13.50,51.4,15,52.7&width=400&height=350&STYLE=";
			$urlBckLayers[]="http://edit.br.fgov.be/geoserver/wms?service=WMS&VERSION=1.1.1&transparent=true&request=GetMap&service=WMS&layers=waldsee_geb&EPSG=4326&format=image/png&bbox=13.50,51.4,15,52.7&width=400&height=350&STYLE=";
			
			//$urlBckLayers[]="http://edit.br.fgov.be/geoserver/wms?service=WMS&version=1.1.1&transparent=true&STYLES=&request=GetMap&service=WMS&epsg=4326&layers=topp:rest_points&format=image/png&bbox=13.50,51.4,15,52.7&width=400&height=350";
			//$urlBckLayers[]="http://isk.geobasis-bb.de/ows/dnm.php?service=WMS&version=1.1.0&request=GetMap&layers=bg,vegetation,gewaesser&transparent=true&styles=&bbox=13.846,51.986,13.912,52.107&width=279&height=512&srs=EPSG:4326&format=image/png";
			//$urlBckLayers[]="http://edit.br.fgov.be:8080/geoserver/wms?service=WMS&version=1.1.1&transparent=true&STYLES=&request=GetMap&service=WMS&epsg=4326:8080&layers=topp:rest_points&format=image/png&bbox=13.50,51.4,15,52.7&width=400&height=350&SLD=http://edit.br.fgov.be/test_debug/point_271.sld"
			//$urlBckLayers[]="http://edit.br.fgov.be:8080/geoserver/wms?service=WMS&VERSION=1.1.1&transparent=true&request=GetMap&service=WMS&layers=waldsee_geb,bio_spree,inob_sprew,inun_sprew&EPSG=4326&format=image/png&bbox=13.50,51.4,15,52.7&width=400&height=350&STYLE=";
			//$urlBckLayers[]="http://edit.br.fgov.be:8080/geoserver/wms?SERVICE=WMS&VERSION=1.1.1&TRANSPARENT=true&REQUEST=GetMap&SERVICE=WMS&EPSG=4326&layers=europe_west_level_0&EPSG=4326&format=image/png&bbox=13.50,51.4,15,52.7&WIDTH=400&HEIGHT=350&STYLE=";
			
				$nameLayerToQuery="europe_west_level_0";
			$urlBaseLayer="http://isk.geobasis-bb.de/ows/dnm.php?service=WMS&version=1.1.0&request=GetMap&layers=bg,vegetation,gewaesser,siedlung,bln,brb,transport,verkehrsobjekte,strassennamen,ortsnamen,gewaessernamen&styles=&bbox=13.846,51.986,13.912,52.107&width=279&height=512&srs=EPSG:4326&format=image/png";
			
			
			
			
			$layerClickable="topp:rest_points";
			
			
			$OLObject=new OpenLayersEDITREST($urlBckLayers,$OLURL,$urlBaseLayer,$nameLayerToQuery);
			print($OLObject->getScriptOL());

	class OpenLayersEDITREST
	{
			
		protected $arrayUrls=Array();
		protected $urlOpenLayer="";
		protected $urlBaseLayer="";
		protected $layerToQuery="";
		protected $script_js="";
		
		function __construct($p_arrayUrls, $p_urlOpenLayer , $p_urlBaseLayer="", $p_layerToQuery="") 
		{
        		$this->arrayUrls=$p_arrayUrls;
        		$this->urlOpenLayer=$p_urlOpenLayer;
				$this->urlBaseLayer=$p_urlBaseLayer;
				$this->layerToQuery=$p_layerToQuery;
				$this->init();
    	}
		
		
			

		function init()
		{	
			
			foreach($this->arrayUrls as $urlForBBOX)
			{
				$query_bbox = parse_url($urlForBBOX);
			    $param_bbox = explode("&", $query_bbox["query"]);
			    $i=0;
			    //print_r($param_bbox);
			    $minX=0;
			    $minY=0;
			    $maxX=0;
			    $maxY=0;
			    foreach($param_bbox as $q)
			    {
			      
				    list($key, $value) = explode("=", $q);
			        if($key=="BBOX"||$key=="bbox")
			        {
			           $valBBOX=$value;
			             //print($valBBOX." ");
			        	$arrayBBOX=explode(",", $valBBOX);
			        	//print_r($arrayBBOX);
			        	if($i==0)
			        	{
				        	$minX=$arrayBBOX[0];
			    			$minY=$arrayBBOX[1];
			    			$maxX=$arrayBBOX[2];
			    			$maxY=$arrayBBOX[3];
				        }
			        	else
			        	{
				        	if($arrayBBOX[0]<$minX)
				        	{
					        	$minX=$arrayBBOX[0];
					        }
					        if($arrayBBOX[1]<$minY)
				        	{
					        	$minY=$arrayBBOX[1];
					        }
					        if($arrayBBOX[2]>$maxX)
				        	{
					        	$maxX=$arrayBBOX[2];
					        }
					        if($arrayBBOX[3]>$maxY)
				        	{
					        	$maxY=$arrayBBOX[3];
					        }			
				        }
			        	$i++;  
			         }
			    
			    	  
			    } 
			    
			
			}
			
			//print(" minx=".$minX." miny=".$minY." max=".$maxX." maxy=".$maxY);
			
			$this->script_js=''."\n";
			$this->script_js.='<script src="'.$this->urlOpenLayer.'" type="text/javascript"></script>'."\n";
			$this->script_js.='<script defer="defer" type="text/javascript">'."\n";
			$this->script_js.=' 			function PageQuery(q) '."\n";
			$this->script_js.=' 			{'."\n";
			$this->script_js.='	 			'."\n";
			$this->script_js.='				//if(q.length > 1) this.q = q.substring(1, q.length);'."\n";
			$this->script_js.='				//else this.q = null;'."\n";
			$this->script_js.='				if(q.length>1)'."\n";
			$this->script_js.='				{'."\n";
			$this->script_js.='					this.q=q;	'."\n";
			$this->script_js.='				}'."\n";
			$this->script_js.='				else'."\n";
			$this->script_js.='				{'."\n";
			$this->script_js.='					this.q=null;	'."\n";
			$this->script_js.='				}'."\n";
			$this->script_js.='				this.rootURL =new Array();'."\n";
			$this->script_js.='				this.keyValuePairs = new Array();'."\n";
			$this->script_js.='				if(q) '."\n";
			$this->script_js.='					{'."\n";
			$this->script_js.='						for(var i=0; i < this.q.split("?").length; i++) '."\n";
			$this->script_js.='						{'."\n";
			$this->script_js.='						this.rootURL[i] = this.q.split("?")[i];'."\n";
			$this->script_js.='						//alert(this.rootURL[i]);'."\n";
			$this->script_js.='						}'."\n";
			$this->script_js.='											'."\n";
			$this->script_js.='					for(var i=0; i < this.q.split("&").length; i++) '."\n";
			$this->script_js.='						{'."\n";
			$this->script_js.='						this.keyValuePairs[i] = this.q.split("&")[i];'."\n";
			$this->script_js.='						//alert(this.keyValuePairs[i]);'."\n";
			$this->script_js.='						}'."\n";
			$this->script_js.='					}'."\n";
			$this->script_js.='				this.getKeyValuePairs = function() { return this.keyValuePairs; }'."\n";
			$this->script_js.='				this.getValue = function(s) '."\n";
			$this->script_js.='				{'."\n";
			$this->script_js.='					for(var j=0; j < this.keyValuePairs.length; j++) '."\n";
			$this->script_js.='					{'."\n";
			$this->script_js.='						if(this.keyValuePairs[j].split("=")[0] == s)'."\n";
			$this->script_js.='						return this.keyValuePairs[j].split("=")[1];'."\n";
			$this->script_js.='					}'."\n";
			$this->script_js.='				return null;'."\n";
			//$this->script_js.='				return false;'."\n";
			$this->script_js.='				}'."\n";
			$this->script_js.='				this.getParameters = function() '."\n";
			$this->script_js.='				{'."\n";
			$this->script_js.='					var a = new Array(this.getLength());'."\n";
			$this->script_js.='					for(var j=0; j < this.keyValuePairs.length; j++) '."\n";
			$this->script_js.='					{'."\n";
			$this->script_js.='						a[j] = this.keyValuePairs[j].split("=")[0];'."\n";
			$this->script_js.='					}'."\n";
			$this->script_js.='					return a;'."\n";
			$this->script_js.='				}'."\n";
			$this->script_js.='				this.getLength = function() { return this.keyValuePairs.length; }'."\n";
			$this->script_js.='			}'."\n";
			$this->script_js.='			'."\n";
			$this->script_js.='			function queryString(key)'."\n";
			$this->script_js.='			{'."\n";
			$this->script_js.='				var page = new PageQuery(window.location.search);'."\n";
			$this->script_js.='				return unescape(page.getValue(key));'."\n";
			$this->script_js.='			}'."\n";
			$this->script_js.='			'."\n";
			$this->script_js.='			function displayItem(key)'."\n";
			$this->script_js.='			{'."\n";
			$this->script_js.='				if(queryString(key)==\'false\')'."\n";
			$this->script_js.='				{'."\n";
			$this->script_js.='				document.write("you didn\'t enter a ?name=value querystring item.");'."\n";
			$this->script_js.='				}'."\n";
			$this->script_js.='				else'."\n";
			$this->script_js.='				{'."\n";
			$this->script_js.='				document.write(queryString(key));'."\n";
			$this->script_js.='				}'."\n";
			$this->script_js.='			}'."\n";
			$this->script_js.=' '."\n";
			//$this->script_js.=' 			var url_for_js="http://edit.br.fgov.be:8080/geoserver/wms?service=WMS&version=1.1.1&request=GetMap&layers=topp:inun_sprew&styles=&width=279&height=512&srs=EPSG:4326&format=image/png";'."\n";
			//$this->script_js.='            //alert(url_for_js);'."\n";
			//$this->script_js.='            var objectURL_'.$i.'=new PageQuery(url_for_js);'."\n";
			$this->script_js.='            var map;'."\n";
			$this->script_js.='            var untiled;'."\n";
			$this->script_js.='            var tiled;'."\n";
			$this->script_js.='            var pureCoverage = false;'."\n";
			$this->script_js.='            // pink tile avoidance'."\n";
			$this->script_js.='            OpenLayers.IMAGE_RELOAD_ATTEMPTS = 5;'."\n";
			$this->script_js.='            // make OL compute scale according to WMS spec'."\n";
			$this->script_js.='            OpenLayers.DOTS_PER_INCH = 25.4 / 0.28;'."\n";
			$this->script_js.='        '."\n";
			$this->script_js.='            function init(){'."\n";
			$this->script_js.='                // if this is just a coverage or a group of them, disable a few items,'."\n";
			$this->script_js.='                // and default to jpeg format'."\n";
			$this->script_js.='                format = \'image/png\';'."\n";
			$this->script_js.='                if(pureCoverage) {'."\n";
			$this->script_js.='                    document.getElementById(\'filterType\').disabled = true;'."\n";
			$this->script_js.='                    document.getElementById(\'filter\').disabled = true;'."\n";
			$this->script_js.='                    document.getElementById(\'antialiasSelector\').disabled = true;'."\n";
			$this->script_js.='                    document.getElementById(\'updateFilterButton\').disabled = true;'."\n";
			$this->script_js.='                    document.getElementById(\'resetFilterButton\').disabled = true;'."\n";
			$this->script_js.='                    document.getElementById(\'jpeg\').selected = true;'."\n";
			$this->script_js.='                    format = "image/jpeg";'."\n";
			$this->script_js.='                }'."\n";
			$this->script_js.='            '."\n";
			//$this->script_js.='                var bounds = new OpenLayers.Bounds('."\n";
			//$this->script_js.='                    13.846, 51.986,'."\n";
			//$this->script_js.='                    13.912, 52.107'."\n";
			//$this->script_js.='                );'."\n";
			
			$this->script_js.='                var bounds = new OpenLayers.Bounds('."\n";
			$this->script_js.='                    '.$minX.', '.$minY.','."\n";
			$this->script_js.='                    '.$maxX.', '.$maxY.' '."\n";
			$this->script_js.='                );'."\n";
			$this->script_js.='                var options = {'."\n";
			$this->script_js.='                    controls: [],'."\n";
			$this->script_js.='                    maxExtent: bounds,'."\n";
			//$this->script_js.='                    maxResolution: 0.00047265625,'."\n";
			$this->script_js.='                    projection: "EPSG:4326",'."\n";
			$this->script_js.='                    units: \'degrees\''."\n";
			$this->script_js.='                };'."\n";
			$this->script_js.='                map = new OpenLayers.Map(\'map\', options);'."\n";
			$this->script_js.='            '."\n";
			$this->script_js.='                // setup tiled layer'."\n";
			$i=0;
			$idxBaseLayer=0;
			if(strlen($this->urlBaseLayer)>0)
			{
				//$idxBaseLayer=1;
				/*$this->script_js.=' 			var url_for_js_'.$i.'=\''.$urlBaseLayer.'\';'."\n";
				$this->script_js.='            var objectURL_'.$i.'=new PageQuery(url_for_js_'.$i.');'."\n";
				$this->script_js.='            //alert(objectURL_'.$i.'.getValue("SLD"));'."\n";
				$this->script_js.='                var tiled_'.$i.' = new OpenLayers.Layer.WMS('."\n";
				//$this->script_js.='                    "inun_sprew - tiled_'.$i.'", objectURL_'.$i.'.rootURL[0],'."\n";
				$this->script_js.='                    objectURL_'.$i.'.getValue("layers"), objectURL_'.$i.'.rootURL[0],'."\n";
				$this->script_js.='                    {'."\n";
				$this->script_js.='                        width: objectURL_'.$i.'.getValue("width"),'."\n";
				$this->script_js.='                        srs: objectURL_'.$i.'.getValue("srs"),'."\n";
				$this->script_js.='                        layers: objectURL_'.$i.'.getValue("layers"),'."\n";
				$this->script_js.='                        height: objectURL_'.$i.'.getValue("height"),'."\n";
				$this->script_js.='                        styles: \'\','."\n";
				$this->script_js.='                        format: objectURL_'.$i.'.getValue("format"),'."\n";
				$this->script_js.='                        SLD: objectURL_'.$i.'.getValue("SLD"),'."\n";
				$this->script_js.='                        tiled : \'true\','."\n";
				$this->script_js.='                        transparent: \'true\','."\n";
				$this->script_js.='                        tilesOrigin : map.maxExtent.left + \',\' + map.maxExtent.bottom'."\n";
				$this->script_js.='                    },'."\n";
				$this->script_js.='                    {'."\n";
				$this->script_js.='                        isBaseLayer: true,'."\n";
				$this->script_js.='                        buffer: 0,'."\n";
				$this->script_js.='                        displayOutsideMaxExtent: true'."\n";
				$this->script_js.='                    } '."\n";
				$this->script_js.='                );'."\n";
			
			
			
				$this->script_js.='               //alert(objectURL_'.$i.'.getValue("version"));'."\n";
				$this->script_js.='               //alert(objectURL_'.$i.'.rootURL[0]);'."\n";
				$this->script_js.='               var untiled_'.$i.' = new OpenLayers.Layer.WMS('."\n";
				//$this->script_js.='                    "inun_sprew - Untiled_'.$i.'", objectURL_'.$i.'.rootURL[0],'."\n";
				$this->script_js.='                    objectURL_'.$i.'.getValue("layers")+"_untiled", objectURL_'.$i.'.rootURL[0],'."\n";
				$this->script_js.='                    {'."\n";
				$this->script_js.='                        width: objectURL_'.$i.'.getValue("width"),'."\n";
				$this->script_js.='                        srs: objectURL_'.$i.'.getValue("srs"),'."\n";
				$this->script_js.='                        layers: objectURL_'.$i.'.getValue("layers"),'."\n";
				$this->script_js.='                        height: objectURL_'.$i.'.getValue("height"),'."\n";
				$this->script_js.='                        styles: \'\','."\n";
				$this->script_js.='                        SLD: objectURL_'.$i.'.getValue("SLD"),'."\n";
				//$this->script_js.='                        transparent: \'true\','."\n";
				$this->script_js.='                        format: format '."\n";
				$this->script_js.='                    },'."\n";
				$this->script_js.='                    {singleTile: true, ratio: 1} '."\n";
				$this->script_js.='                );'."\n";
				$this->script_js.='                '."\n";
				$this->script_js.='                map.addLayers([untiled_'.$i.', tiled_'.$i.']);'."\n";*/
				$this->script_js.=$this->writeLayerText($this->urlBaseLayer,$i,true);
				$i++;
			}
			
			foreach($this->arrayUrls as $tmpLayers)
			{
				/*$this->script_js.=' 			var url_for_js_'.$i.'=\''.$tmpLayers.'\';'."\n";
				$this->script_js.='            var objectURL_'.$i.'=new PageQuery(url_for_js_'.$i.');'."\n";
				$this->script_js.='            //alert(objectURL_'.$i.'.getValue("SLD"));'."\n";
				$this->script_js.='                var tiled_'.$i.' = new OpenLayers.Layer.WMS('."\n";
				//$this->script_js.='                    "inun_sprew - tiled_'.$i.'", objectURL_'.$i.'.rootURL[0],'."\n";
				$this->script_js.='                    objectURL_'.$i.'.getValue("layers"), objectURL_'.$i.'.rootURL[0],'."\n";
				$this->script_js.='                    {'."\n";
				$this->script_js.='                        width: objectURL_'.$i.'.getValue("width"),'."\n";
				$this->script_js.='                        srs: objectURL_'.$i.'.getValue("srs"),'."\n";
				$this->script_js.='                        layers: objectURL_'.$i.'.getValue("layers"),'."\n";
				$this->script_js.='                        height: objectURL_'.$i.'.getValue("height"),'."\n";
				$this->script_js.='                        styles: \'\','."\n";
				$this->script_js.='                        format: objectURL_'.$i.'.getValue("format"),'."\n";
				$this->script_js.='                        SLD: objectURL_'.$i.'.getValue("SLD"),'."\n";
				$this->script_js.='                        tiled : \'true\','."\n";
				$this->script_js.='                        transparent: \'true\','."\n";
				$this->script_js.='                        tilesOrigin : map.maxExtent.left + \',\' + map.maxExtent.bottom'."\n";
				$this->script_js.='                    },'."\n";
				$this->script_js.='                    {'."\n";
				$this->script_js.='                        buffer: 0,'."\n";
				$this->script_js.='                        displayOutsideMaxExtent: true'."\n";
				$this->script_js.='                    } '."\n";
				$this->script_js.='                );'."\n";
			
			
			
				$this->script_js.='               //alert(objectURL_'.$i.'.getValue("version"));'."\n";
				$this->script_js.='               //alert(objectURL_'.$i.'.rootURL[0]);'."\n";
				$this->script_js.='               var untiled_'.$i.' = new OpenLayers.Layer.WMS('."\n";
				//$this->script_js.='                    "inun_sprew - Untiled_'.$i.'", objectURL_'.$i.'.rootURL[0],'."\n";
				$this->script_js.='                    objectURL_'.$i.'.getValue("layers")+"_untiled", objectURL_'.$i.'.rootURL[0],'."\n";
				$this->script_js.='                    {'."\n";
				$this->script_js.='                        width: objectURL_'.$i.'.getValue("width"),'."\n";
				$this->script_js.='                        srs: objectURL_'.$i.'.getValue("srs"),'."\n";
				$this->script_js.='                        layers: objectURL_'.$i.'.getValue("layers"),'."\n";
				$this->script_js.='                        height: objectURL_'.$i.'.getValue("height"),'."\n";
				$this->script_js.='                        styles: \'\','."\n";
				$this->script_js.='                        SLD: objectURL_'.$i.'.getValue("SLD"),'."\n";
				//$this->script_js.='                        transparent: \'true\','."\n";
				$this->script_js.='                        format: format '."\n";
				$this->script_js.='                    },'."\n";
				$this->script_js.='                    {singleTile: true, ratio: 1} '."\n";
				$this->script_js.='                );'."\n";
				$this->script_js.='                '."\n";
				$this->script_js.='                map.addLayers([untiled_'.$i.', tiled_'.$i.']);'."\n";*/
				$this->script_js.=$this->writeLayerText($tmpLayers,$i);
				$i++;
			}
			$this->script_js.=''."\n";
			$this->script_js.='                // build up all controls            '."\n";
			$this->script_js.='                map.addControl(new OpenLayers.Control.PanZoomBar({'."\n";
			$this->script_js.='                    position: new OpenLayers.Pixel(2, 15)'."\n";
			$this->script_js.='                }));'."\n";
			$this->script_js.='                map.addControl(new OpenLayers.Control.Navigation());'."\n";
			$this->script_js.='                map.addControl(new OpenLayers.Control.Scale($(\'scale\')));'."\n";
			$this->script_js.='                map.addControl(new OpenLayers.Control.MousePosition({element: $(\'location\')}));'."\n";
			$this->script_js.='                map.zoomToExtent(bounds);'."\n";
			$this->script_js.='                '."\n";
			$this->script_js.='                // wire up the option button'."\n";
			$this->script_js.='                var options = document.getElementById("options");'."\n";
			$this->script_js.='                options.onclick = toggleControlPanel;'."\n";
			$this->script_js.='                '."\n";
			$this->script_js.='                // support GetFeatureInfo'."\n";
			if(strlen($this->layerToQuery)>0)
			{
				$this->script_js.='                map.events.register(\'click\', map, function (e) {'."\n";
				$this->script_js.='                    document.getElementById(\'nodelist\').innerHTML = "Loading... please wait...";'."\n";
				$this->script_js.='                    var params = {'."\n";
				$this->script_js.='                        REQUEST: "GetFeatureInfo",'."\n";
				$this->script_js.='                        EXCEPTIONS: "application/vnd.ogc.se_xml",'."\n";
				$this->script_js.='                        BBOX: map.getExtent().toBBOX(),'."\n";
				$this->script_js.='                        X: e.xy.x,'."\n";
				$this->script_js.='                        Y: e.xy.y,'."\n";
				$this->script_js.='                        INFO_FORMAT: \'text/html\','."\n";
				//$this->script_js.='                        QUERY_LAYERS: map.layers[0].params.LAYERS,'."\n";
				//$this->script_js.='                        QUERY_LAYERS: map.layers['.$idxBaseLayer.'].params.LAYERS,'."\n";
				$this->script_js.='                        QUERY_LAYERS: \''.$this->layerToQuery.'\', '."\n";
				$this->script_js.='                        FEATURE_COUNT: 50,'."\n";
				$this->script_js.='                        Srs: \'EPSG:4326\','."\n";
				$this->script_js.='                        Layers: \''.$this->layerToQuery.'\','."\n";
				$this->script_js.='                        Styles: \'\','."\n";
				$this->script_js.='                        WIDTH: map.size.w,'."\n";
				$this->script_js.='                        HEIGHT: map.size.h,'."\n";
				$this->script_js.='                        format: format};'."\n";
				$this->script_js.='                    OpenLayers.loadURL("http://edit.br.fgov.be/geoserver/wms", params, this, setHTML, setHTML);'."\n";
				$this->script_js.='                    OpenLayers.Event.stop(e);'."\n";
				$this->script_js.='                });'."\n";
			}
			$this->script_js.='            }'."\n";
			$this->script_js.='            '."\n";
			$this->script_js.='            // sets the HTML provided into the nodelist element'."\n";
			$this->script_js.='            function setHTML(response){'."\n";
			$this->script_js.='                 document.getElementById(\'nodelist\').innerHTML = response.responseText;'."\n";
			$this->script_js.='            };'."\n";
			$this->script_js.='            '."\n";
			$this->script_js.='            // shows/hide the control panel'."\n";
			$this->script_js.='            function toggleControlPanel(event){'."\n";
			$this->script_js.='                var toolbar = document.getElementById("toolbar");'."\n";
			$this->script_js.='                if (toolbar.style.display == "none") {'."\n";
			$this->script_js.='                    toolbar.style.display = "block";'."\n";
			$this->script_js.='                }'."\n";
			$this->script_js.='                else {'."\n";
			$this->script_js.='                    toolbar.style.display = "none";'."\n";
			$this->script_js.='                }'."\n";
			$this->script_js.='                event.stopPropagation();'."\n";
			$this->script_js.='                map.updateSize()'."\n";
			$this->script_js.='            }'."\n";
			$this->script_js.='            '."\n";
			$this->script_js.='            // Tiling mode, can be \'tiled\' or \'untiled\'            '."\n";
			$this->script_js.='            function setTileMode(tilingMode){'."\n";
			$this->script_js.='                if (tilingMode == \'tiled\') {'."\n";
			$this->script_js.='                    untiled.setVisibility(false);'."\n";
			$this->script_js.='                    tiled.setVisibility(true);'."\n";
			$this->script_js.='                    map.setBaseLayer(tiled);'."\n";
			$this->script_js.='                }'."\n";
			$this->script_js.='                else {'."\n";
			$this->script_js.='                    untiled.setVisibility(true);'."\n";
			$this->script_js.='                    tiled.setVisibility(false);'."\n";
			$this->script_js.='                    map.setBaseLayer(untiled);'."\n";
			$this->script_js.='                }'."\n";
			$this->script_js.='            }'."\n";
			$this->script_js.='            '."\n";
			$this->script_js.='            // changes the current tile format'."\n";
			$this->script_js.='            function setImageFormat(mime){'."\n";
			$this->script_js.='                // we may be switching format on setup'."\n";
			$this->script_js.='                if(tiled == null)'."\n";
			$this->script_js.='                  return;'."\n";
			$this->script_js.='                  '."\n";
			$this->script_js.='                tiled.mergeNewParams({'."\n";
			$this->script_js.='                    format: mime'."\n";
			$this->script_js.='                });'."\n";
			$this->script_js.='                untiled.mergeNewParams({'."\n";
			$this->script_js.='                    format: mime'."\n";
			$this->script_js.='                });'."\n";
			$this->script_js.='                /*'."\n";
			$this->script_js.='                var paletteSelector = document.getElementById(\'paletteSelector\')'."\n";
			$this->script_js.='                if (mime == \'image/jpeg\') {'."\n";
			$this->script_js.='                    paletteSelector.selectedIndex = 0;'."\n";
			$this->script_js.='                    setPalette(\');'."\n";
			$this->script_js.='                    paletteSelector.disabled = true;'."\n";
			$this->script_js.='                }'."\n";
			$this->script_js.='                else {'."\n";
			$this->script_js.='                    paletteSelector.disabled = false;'."\n";
			$this->script_js.='                }'."\n";
			$this->script_js.='                */'."\n";
			$this->script_js.='            }'."\n";
			$this->script_js.='            '."\n";
			$this->script_js.='            // sets the chosen style'."\n";
			$this->script_js.='            function setStyle(style){'."\n";
			$this->script_js.='                // we may be switching style on setup'."\n";
			$this->script_js.='                if(tiled == null)'."\n";
			$this->script_js.='                  return;'."\n";
			$this->script_js.='                  '."\n";
			$this->script_js.='                tiled.mergeNewParams({'."\n";
			$this->script_js.='                    styles: style'."\n";
			$this->script_js.='                });'."\n";
			$this->script_js.='                untiled.mergeNewParams({'."\n";
			$this->script_js.='                    styles: style'."\n";
			$this->script_js.='                });'."\n";
			$this->script_js.='            }'."\n";
			$this->script_js.='            '."\n";
			$this->script_js.='            function setAntialiasMode(mode){'."\n";
			$this->script_js.='                tiled.mergeNewParams({'."\n";
			$this->script_js.='                    format_options: \'antialias:\' + mode'."\n";
			$this->script_js.='                });'."\n";
			$this->script_js.='                untiled.mergeNewParams({'."\n";
			$this->script_js.='                    format_options: \'antialias:\' + mode'."\n";
			$this->script_js.='                });'."\n";
			$this->script_js.='            }'."\n";
			$this->script_js.='            '."\n";
			$this->script_js.='            function setPalette(mode){'."\n";
			$this->script_js.='                if (mode == \'\') {'."\n";
			$this->script_js.='                    tiled.mergeNewParams({'."\n";
			$this->script_js.='                        palette: null'."\n";
			$this->script_js.='                    });'."\n";
			$this->script_js.='                    untiled.mergeNewParams({'."\n";
			$this->script_js.='                        palette: null'."\n";
			$this->script_js.='                    });'."\n";
			$this->script_js.='                }'."\n";
			$this->script_js.='                else {'."\n";
			$this->script_js.='                    tiled.mergeNewParams({'."\n";
			$this->script_js.='                        palette: mode'."\n";
			$this->script_js.='                    });'."\n";
			$this->script_js.='                    untiled.mergeNewParams({'."\n";
			$this->script_js.='                        palette: mode'."\n";
			$this->script_js.='                    });'."\n";
			$this->script_js.='                }'."\n";
			$this->script_js.='            }'."\n";
			$this->script_js.='            '."\n";
			$this->script_js.='            function setWidth(size){'."\n";
			$this->script_js.='                var mapDiv = document.getElementById(\'map\');'."\n";
			$this->script_js.='                var wrapper = document.getElementById(\'wrapper\');'."\n";
			$this->script_js.='                '."\n";
			$this->script_js.='                if (size == "auto") {'."\n";
			$this->script_js.='                    // reset back to the default value'."\n";
			$this->script_js.='                    mapDiv.style.width = null;'."\n";
			$this->script_js.='                    wrapper.style.width = null;'."\n";
			$this->script_js.='                }'."\n";
			$this->script_js.='                else {'."\n";
			$this->script_js.='                    mapDiv.style.width = size + "px";'."\n";
			$this->script_js.='                    wrapper.style.width = size + "px";'."\n";
			$this->script_js.='                }'."\n";
			$this->script_js.='                // notify OL that we changed the size of the map div'."\n";
			$this->script_js.='                map.updateSize();'."\n";
			$this->script_js.='            }'."\n";
			$this->script_js.='            '."\n";
			$this->script_js.='            function setHeight(size){'."\n";
			$this->script_js.='                var mapDiv = document.getElementById(\'map\');'."\n";
			$this->script_js.='                '."\n";
			$this->script_js.='                if (size == "auto") {'."\n";
			$this->script_js.='                    // reset back to the default value'."\n";
			$this->script_js.='                    mapDiv.style.height = null;'."\n";
			$this->script_js.='                }'."\n";
			$this->script_js.='                else {'."\n";
			$this->script_js.='                    mapDiv.style.height = size + "px";'."\n";
			$this->script_js.='                }'."\n";
			$this->script_js.='                // notify OL that we changed the size of the map div'."\n";
			$this->script_js.='                map.updateSize();'."\n";
			$this->script_js.='            }'."\n";
			$this->script_js.='            '."\n";
			$this->script_js.='            function updateFilter(){'."\n";
			$this->script_js.='                if(pureCoverage)'."\n";
			$this->script_js.='                  return;'."\n";
			$this->script_js.='            '."\n";
			$this->script_js.='                var filterType = document.getElementById(\'filterType\').value;'."\n";
			$this->script_js.='                var filter = document.getElementById(\'filter\').value;'."\n";
			$this->script_js.='                '."\n";
			$this->script_js.='                // by default, reset all filters                '."\n";
			$this->script_js.='                var filterParams = {'."\n";
			$this->script_js.='                    filter: null,'."\n";
			$this->script_js.='                    cql_filter: null,'."\n";
			$this->script_js.='                    featureId: null'."\n";
			$this->script_js.='                };'."\n";
			$this->script_js.='                if (OpenLayers.String.trim(filter) != "") {'."\n";
			$this->script_js.='                    if (filterType == "cql") '."\n";
			$this->script_js.='                        filterParams["cql_filter"] = filter;'."\n";
			$this->script_js.='                    if (filterType == "ogc") '."\n";
			$this->script_js.='                        filterParams["filter"] = filter;'."\n";
			$this->script_js.='                    if (filterType == "fid") '."\n";
			$this->script_js.='                        filterParams["featureId"] = filter;'."\n";
			$this->script_js.='                }'."\n";
			$this->script_js.='                // merge the new filter definitions'."\n";
			$this->script_js.='                mergeNewParams(filterParams);'."\n";
			$this->script_js.='            }'."\n";
			$this->script_js.='            '."\n";
			$this->script_js.='            function resetFilter() {'."\n";
			$this->script_js.='                if(pureCoverage)'."\n";
			$this->script_js.='                  return;'."\n";
			$this->script_js.='            '."\n";
			$this->script_js.='                document.getElementById(\'filter\').value = "";'."\n";
			$this->script_js.='                updateFilter();'."\n";
			$this->script_js.='            }'."\n";
			$this->script_js.='            '."\n";
			$this->script_js.='            function mergeNewParams(params){'."\n";
			$this->script_js.='                tiled.mergeNewParams(params);'."\n";
			$this->script_js.='                untiled.mergeNewParams(params);'."\n";
			$this->script_js.='            }'."\n";
			$this->script_js.='        </script>'."\n";
			$this->script_js.='    </head>'."\n";
			$this->script_js.='    <body onload="init()">'."\n";
			$this->script_js.='        <div id="toolbar" style="display: none;">'."\n";
			$this->script_js.='            <ul>'."\n";
			$this->script_js.='                <li>'."\n";
			$this->script_js.=''."\n";
			$this->script_js.='                    <a>Tiling:</a>'."\n";
			$this->script_js.='                    <select id="tilingModeSelector" onchange="setTileMode(value)">'."\n";
			$this->script_js.='                        <option value="untiled">Single tile</option>'."\n";
			$this->script_js.='                        <option value="tiled">Tiled</option>'."\n";
			$this->script_js.='                    </select>'."\n";
			$this->script_js.='                </li>'."\n";
			$this->script_js.='                <li>'."\n";
			$this->script_js.=''."\n";
			$this->script_js.='                    <a>Antialias:</a>'."\n";
			$this->script_js.='                    <select id="antialiasSelector" onchange="setAntialiasMode(value)">'."\n";
			$this->script_js.='                        <option value="full">Full</option>'."\n";
			$this->script_js.='                        <option value="text">Text only</option>'."\n";
			$this->script_js.='                        <option value="none">Disabled</option>'."\n";
			$this->script_js.='                    </select>'."\n";
			$this->script_js.='                </li>'."\n";
			$this->script_js.=''."\n";
			$this->script_js.='                <li>'."\n";
			$this->script_js.='                    <a>Format:</a>'."\n";
			$this->script_js.='                    <select id="imageFormatSelector" onchange="setImageFormat(value)">'."\n";
			$this->script_js.='                        <option value="image/png">PNG 24bit</option>'."\n";
			$this->script_js.='                        <option value="image/png8">PNG 8bit</option>'."\n";
			$this->script_js.='                        <option value="image/gif">GIF</option>'."\n";
			$this->script_js.='                        <option id="jpeg" value="image/jpeg">JPEG</option>'."\n";
			$this->script_js.=''."\n";
			$this->script_js.='                    </select>'."\n";
			$this->script_js.='                </li>'."\n";
			$this->script_js.='                <li>'."\n";
			$this->script_js.='                    <a>Styles:</a>'."\n";
			$this->script_js.='                    <select id="imageFormatSelector" onchange="setStyle(value)">'."\n";
			$this->script_js.='                        <option value="">Default</option>'."\n";
			$this->script_js.='                    </select>'."\n";
			$this->script_js.='                </li>'."\n";
			$this->script_js.=''."\n";
			$this->script_js.='                <!-- Commented out for the moment, some code needs to be extended in '."\n";
			$this->script_js.='                     order to list the available palettes'."\n";
			$this->script_js.='                <li>'."\n";
			$this->script_js.='                    <a>Palette:</a>'."\n";
			$this->script_js.='                    <select id="paletteSelector" onchange="setPalette(value)">'."\n";
			$this->script_js.='                        <option value="">None</option>'."\n";
			$this->script_js.='                        <option value="safe">Web safe</option>'."\n";
			$this->script_js.='                    </select>'."\n";
			$this->script_js.='                </li>'."\n";
			$this->script_js.='                -->'."\n";
			$this->script_js.='                <li>'."\n";
			$this->script_js.='                    <a>Width/Height:</a>'."\n";
			$this->script_js.='                    <select id="widthSelector" onchange="setWidth(value)">'."\n";
			$this->script_js.='                        <!--'."\n";
			$this->script_js.='                        These values come from a statistics of the viewable area given a certain screen area'."\n";
			$this->script_js.='                        (but have been adapted a litte, simplified numbers, added some resolutions for wide screen)'."\n";
			$this->script_js.='                        You can find them here: http://www.evolt.org/article/Real_World_Browser_Size_Stats_Part_II/20/2297/'."\n";
			$this->script_js.='                        --><option value="auto">Auto</option>'."\n";
			$this->script_js.='                        <option value="600">600</option>'."\n";
			$this->script_js.='                        <option value="750">750</option>'."\n";
			$this->script_js.=''."\n";
			$this->script_js.='                        <option value="950">950</option>'."\n";
			$this->script_js.='                        <option value="1000">1000</option>'."\n";
			$this->script_js.='                        <option value="1200">1200</option>'."\n";
			$this->script_js.='                        <option value="1400">1400</option>'."\n";
			$this->script_js.='                        <option value="1600">1600</option>'."\n";
			$this->script_js.='                        <option value="1900">1900</option>'."\n";
			$this->script_js.=''."\n";
			$this->script_js.='                    </select>'."\n";
			$this->script_js.='                    <select id="heigthSelector" onchange="setHeight(value)">'."\n";
			$this->script_js.='                        <option value="auto">Auto</option>'."\n";
			$this->script_js.='                        <option value="300">300</option>'."\n";
			$this->script_js.='                        <option value="400">400</option>'."\n";
			$this->script_js.='                        <option value="500">500</option>'."\n";
			$this->script_js.='                        <option value="600">600</option>'."\n";
			$this->script_js.=''."\n";
			$this->script_js.='                        <option value="700">700</option>'."\n";
			$this->script_js.='                        <option value="800">800</option>'."\n";
			$this->script_js.='                        <option value="900">900</option>'."\n";
			$this->script_js.='                        <option value="1000">1000</option>'."\n";
			$this->script_js.='                    </select>'."\n";
			$this->script_js.='                </li>'."\n";
			$this->script_js.='                <li>'."\n";
			$this->script_js.=''."\n";
			$this->script_js.='                    <a>Filter:</a>'."\n";
			$this->script_js.='                    <select id="filterType">'."\n";
			$this->script_js.='                        <option value="cql">CQL</option>'."\n";
			$this->script_js.='                        <option value="ogc">OGC</option>'."\n";
			$this->script_js.='                        <option value="fid">FeatureID</option>'."\n";
			$this->script_js.='                    </select>'."\n";
			$this->script_js.='                    <input type="text" size="80" id="filter"/>'."\n";
			$this->script_js.=''."\n";
			$this->script_js.='                    <img id="updateFilterButton" src="http://edit.br.fgov.be/geoserver/openlayers/img/east-mini.png" onClick="updateFilter()" title="Apply filter"/>'."\n";
			$this->script_js.='                    <img id="resetFilterButton" src="http://edit.br.fgov.be/geoserver/openlayers/img/cancel.png" onClick="resetFilter()" title="Reset filter"/>'."\n";
			$this->script_js.='                </li>'."\n";
			$this->script_js.='            </ul>'."\n";
			$this->script_js.='        </div>'."\n";
			$this->script_js.='        <div id="map">'."\n";
			$this->script_js.='            <img id="options" title="Toggle options toolbar" src="http://edit.br.fgov.be:8080/geoserver/options.png"/>'."\n";
			$this->script_js.='        </div>'."\n";
			$this->script_js.='        <div id="wrapper">'."\n";
			$this->script_js.=''."\n";
			$this->script_js.='            <div id="location">location</div>'."\n";
			$this->script_js.='            <div id="scale">'."\n";
			$this->script_js.='            </div>'."\n";
			$this->script_js.='        </div>'."\n";
			$this->script_js.='        <div id="nodelist">'."\n";
			$this->script_js.='            <em>Click on the map to get feature info</em>'."\n";
			$this->script_js.='        </div>'."\n";
			$this->script_js.='    </body>'."\n";
			
		}
			
			function writeLayerText($url, $indexLayer, $isBaseLayer=false)
			{
				$returnedStr="";
					$returnedStr.=' 			var url_for_js_'.$indexLayer.'=\''.$url.'\';'."\n";
				$returnedStr.='            var objectURL_'.$indexLayer.'=new PageQuery(url_for_js_'.$indexLayer.');'."\n";
				$returnedStr.='            //alert(objectURL_'.$indexLayer.'.getValue("SLD"));'."\n";
				$returnedStr.='                var tiled_'.$indexLayer.' = new OpenLayers.Layer.WMS('."\n";
				//$returnedStr.='                    "inun_sprew - tiled_'.$i.'", objectURL_'.$i.'.rootURL[0],'."\n";
				$returnedStr.='                    objectURL_'.$indexLayer.'.getValue("layers"), objectURL_'.$indexLayer.'.rootURL[0],'."\n";
				$returnedStr.='                    {'."\n";
				$returnedStr.='                        width: objectURL_'.$indexLayer.'.getValue("width"),'."\n";
				$returnedStr.='                        srs: objectURL_'.$indexLayer.'.getValue("srs"),'."\n";
				$returnedStr.='                        layers: objectURL_'.$indexLayer.'.getValue("layers"),'."\n";
				$returnedStr.='                        height: objectURL_'.$indexLayer.'.getValue("height"),'."\n";
				$returnedStr.='                        styles: \'\','."\n";
				$returnedStr.='                        format: objectURL_'.$indexLayer.'.getValue("format"),'."\n";
				$returnedStr.='                        SLD: objectURL_'.$indexLayer.'.getValue("SLD"),'."\n";
				$returnedStr.='                        tiled : \'true\','."\n";
				$returnedStr.='                        transparent: \'true\','."\n";
				$returnedStr.='                        tilesOrigin : map.maxExtent.left + \',\' + map.maxExtent.bottom'."\n";
				$returnedStr.='                    },'."\n";
				$returnedStr.='                    {'."\n";
				if($isBaseLayer===true)
				{
					$returnedStr.='                        isBaseLayer: true,'."\n";
				}
				$returnedStr.='                        buffer: 0,'."\n";
				$returnedStr.='                        displayOutsideMaxExtent: true'."\n";
				$returnedStr.='                    } '."\n";
				$returnedStr.='                );'."\n";
			
			
			
				$returnedStr.='               //alert(objectURL_'.$indexLayer.'.getValue("version"));'."\n";
				$returnedStr.='               //alert(objectURL_'.$indexLayer.'.rootURL[0]);'."\n";
				$returnedStr.='               var untiled_'.$indexLayer.' = new OpenLayers.Layer.WMS('."\n";
				//$returnedStr.='                    "inun_sprew - Untiled_'.$indexLayer.'", objectURL_'.$indexLayer.'.rootURL[0],'."\n";
				$returnedStr.='                    objectURL_'.$indexLayer.'.getValue("layers")+"_untiled", objectURL_'.$indexLayer.'.rootURL[0],'."\n";
				$returnedStr.='                    {'."\n";
				$returnedStr.='                        width: objectURL_'.$indexLayer.'.getValue("width"),'."\n";
				$returnedStr.='                        srs: objectURL_'.$indexLayer.'.getValue("srs"),'."\n";
				$returnedStr.='                        layers: objectURL_'.$indexLayer.'.getValue("layers"),'."\n";
				$returnedStr.='                        height: objectURL_'.$indexLayer.'.getValue("height"),'."\n";
				$returnedStr.='                        styles: \'\','."\n";
				$returnedStr.='                        SLD: objectURL_'.$indexLayer.'.getValue("SLD"),'."\n";
				//$returnedStr.='                        transparent: \'true\','."\n";
				$returnedStr.='                        format: format '."\n";
				$returnedStr.='                    },'."\n";
				$returnedStr.='                    {singleTile: true, ratio: 1} '."\n";
				$returnedStr.='                );'."\n";
				$returnedStr.='                '."\n";
				$returnedStr.='                map.addLayers([untiled_'.$indexLayer.', tiled_'.$indexLayer.']);'."\n";
				
				return $returnedStr;	
			}

			function getScriptOL()
			{
				return	$this->script_js;
			}

	}
?>