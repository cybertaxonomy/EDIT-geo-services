<?php

	require_once(dirname(__FILE__)."/"."./function_rest_gen.php");
	
	function associate_layer_to_style($p_layer_string, $p_delimiter1, $p_delimiter2, $isURL=false)
	{
		$returnedArray=Array();
		$listLayers=explode($p_delimiter1, $p_layer_string);

		foreach ($listLayers as $layerItem)
		{
				
				$pos=strpos( $layerItem, $p_delimiter2);
								
				if($pos===false)
				{
										
					$returnedArray[$layerItem]['value']='';
					$returnedArray[$layerItem]['type']='wms_style';
				}
				else
				{
					
					$arrayLayerAndStyle=Array();
					if($isURL===true && ($p_delimiter2=='/'||$p_delimiter2==':'))
					{
						$arrayLayerAndStyle=explode($p_delimiter2,$layerItem,2);
					}
					else
					{
						$arrayLayerAndStyle=explode($p_delimiter2,$layerItem);
					}					
					if(count($arrayLayerAndStyle)>=2)
					{
						$returnedArray[$arrayLayerAndStyle[0]]['value']=$arrayLayerAndStyle[1];
						if(strpos($arrayLayerAndStyle[1],'http://')===false)
						{
							$returnedArray[$arrayLayerAndStyle[0]]['type']='user_sld';
						}
						else
						{
							$returnedArray[$arrayLayerAndStyle[0]]['type']='sld';
						}
					}
					else
					{
$returnedArray[$layerItem]['value']='';						$returnedArray[$arrayLayerAndStyle[0]]['type']='default';
					}
						
				}	
		}
		
		
		return $returnedArray;
	}

	function generate_xml_simple_style_no_zone($displayedLayer, $keyStyle, $label, $arrayInternalSymbols, $arrayURLSymbols)
{	
	
	$xml="<gml>";

	

	$xml.="<feature>".$displayedLayer."</feature>";

	

	//foreach ($v as $keyStyle=>$value)

	//{// loop style=>value

		//print($keyStyle);

		//print_r($value);

		$xml.="<style><name>".$keyStyle."</name>";
		$xml.="<label>".$label."</label>";

	

		if (array_key_exists($keyStyle,$arrayURLSymbols))

		{//if key exists

			//var_dump($arrayURLSymbols[$keyStyle]);

			$xml.="<hatching>http://".$arrayURLSymbols[$keyStyle]['url']."/".$arrayURLSymbols[$keyStyle]['symbols'].".".$arrayURLSymbols[$keyStyle]['format']."</hatching>";

			$format='image/png';
			switch ($arrayURLSymbols[$keyStyle]['format'])
			{
				
				case ('gif'): 
					$format='image/gif';
				break;

				case ('png'): 
					$format='image/png';
				break;

				case ('jpeg'): 
					$format='image/jpeg';
				break;

			}

			$xml.="<symbol_size>".$arrayURLSymbols[$keyStyle]['size']."</symbol_size>";

			$xml.="<symbol_format>".$format."</symbol_format>";

			//$xml.="<hatch_symbol>".."</hatch_symbol>";

			$xml.="<color>hatching</color>";

		}//if key exists

		else 

		{//if key not exists 

			$xml.="<hatching>NO</hatching>";

			$xml.="<color>".$arrayInternalSymbols[$keyStyle][0]."</color>";

		}//if key not exists

		$xml.="<stroke_color>".$arrayInternalSymbols[$keyStyle][1]."</stroke_color>";

		$xml.="<stroke_width>".$arrayInternalSymbols[$keyStyle][2]."</stroke_width>";

		switch ($arrayInternalSymbols[$keyStyle][3])

		{//loop total symbols

			case ('1_2'): 
				$arrayInternalSymbols[$keyStyle][3]="1 2 1 2";
			break;

			case ('1_4'): 
				$arrayInternalSymbols[$keyStyle][3]="1 4 1 4";
			break;

			case ('2_2'): 
				$arrayInternalSymbols[$keyStyle][3]="2 2 2 2";
			break;

			case ('2_4'): 
				$arrayInternalSymbols[$keyStyle][3]="2 4 2 4";
			break;

			case ('5_7'): 
				$arrayInternalSymbols[$keyStyle][3]="5 7 5 7";
			break;

			case ('10_5'): 
				$arrayInternalSymbols[$keyStyle][3]="10 5 10 5";
			break;

		}//loop total symbols

		$xml.="<stroke_style>".$arrayInternalSymbols[$keyStyle][3]."</stroke_style>";



	//}//loop styles=>values
	$xml.="</style>";
	$xml.="</gml>";

	
	return $xml;
}

function xml_to_sld_xslt($p_xml, $displayedLayer, $p_xslt,$path_towrite, $hatching="", $field="", $label_field="")
{	
	$dom_new = new DOMDocument();
	$p=simplexml_load_string($p_xml);
	
	$hatching=$p->style->hatching;
	$xsl = new XSLTProcessor;
	$xsl->setParameter( '', 'symbol', $hatching);
	$xsl->setParameter( '', 'layer', $displayedLayer);
	$xsl->setParameter( '', 'field', $field);
	$xsl->setParameter( '', 'label_field', $label_field);
	$style = realpath($p_xslt);
	
	$dom_new->load($style);
	$xsl->importStyleSheet($dom_new);
	$dom_new->loadXML($p_xml);
	$out = $xsl->transformToXML($dom_new);
	$fp=fopen("$path_towrite","w");
	$write=fwrite($fp,$out);

}

function f_autoFillWMSURL($p_externalWMS, $p_externalWMSVersion, $p_externalWMSLayers, $p_externalWMSStyles, $p_bbox, $p_width, $p_height,  $p_externalWMSFilter )
{

	//print("functionCalled");

		if(isset($p_externalWMSVersion)===false)

		{

					$p_externalWMSVersion='1.1.1';

		}

		if(isset($p_externalWMSStyles)===false)

		{

					$p_externalWMSStyles='';

		}

		if(isset($p_externalWMSFilter)===false)

		{

					$p_externalWMSFilter='';

		}


		$extWFSURL=$p_externalWMS."?REQUEST=GetMap";

						$extWFSURL.="&TRANSPARENT=TRUE";

						$extWFSURL.="&SERVICE=WMS";

						$extWFSURL.="&VERSION=".$p_externalWMSVersion;

						$extWFSURL.="&SRS=EPSG:4326";

						$extWFSURL.="&LAYERS=".$p_externalWMSLayers;

						$extWFSURL.="&STYLES=".$p_externalWMSStyles;

						$extWFSURL.="&FORMAT=image/png";

						$extWFSURL.="&TRANSPARENT=TRUE";
						$extWFSURL.="&bbox=".$p_bbox."&WIDTH=".$p_width."&HEIGHT=".$p_height;

						$extWFSURL.="&FILTER=".urlencode($p_externalWMSFilter);						
//print($extWFSURL);
						$extWFURLArray[]=$extWFSURL;	

	return $extWFSURL;

}





function f_checkWMSParams($p_arrayWMS, $p_param,  $p_nameParam, $p_delimiter1, $p_delimiter2)

{

	if(isset($p_param)===true)

	{	

		$splitParam=preg_split($p_delimiter1,$p_param);

		if(isset($splitParam)===true)

		{

			if(count($splitParam)>0)

			{

				foreach($splitParam as $paramItem)

				{

					if(isset($paramItem)===true)

					{

						$splitParam2=preg_split($p_delimiter2,$paramItem);

						if(count($splitParam2)==2)

						{

							$p_arrayWMS[$splitParam2[0]][$p_nameParam]=$splitParam2[1];

						}

						else if(count($splitParam2)==3&&($p_delimiter2==":"||$p_delimiter2=="[:]"))

						{

							$p_arrayWMS[$splitParam2[0]][$p_nameParam]=$splitParam2[1].':'.$splitParam2[2];

						}

					}

				}	

			}	

		}

	}

	return $p_arrayWMS;

}



function f_writeKeyWFSURL($p_arrayWMS, $p_key, $p_bbox, $p_width, $p_height)

{

	return f_autoFillWMSURL($p_arrayWMS[$p_key]["URL"],$p_arrayWMS[$p_key]["VERSION"],$p_arrayWMS[$p_key]["LAYERS"],$p_arrayWMS[$p_key]["STYLES"] ,$p_bbox, $p_width, $p_height);

}


function parseWMS($p_externalwms, $p_externalwms_versions, $p_externalwms_filters)
{
	$arrayWMSIdxURLs=array();		
	if(isset($p_externalwms)===true)
	{
		$arrayWMSIdxURLs=array();		
		$arrayWMSBases=explode('|',$p_externalwms);
		if(count($arrayWMSBases)>0)
		{
			foreach($arrayWMSBases as $key=>$value)
			{

				if(strpos($value,":")!==FALSE)
				{
					
					$wmsParts=explode(":", $value);
					
					if(count($wmsParts)>=2)
					{
						$idxWMS=array_shift($wmsParts);
						if($idxWMS!="http")
						{
							$urlWMS=implode(":",$wmsParts);
							$arrayWMSIdxURLs[$idxWMS]["url"]=$urlWMS;
						}					
					}
							
				}
			}
			$arrayWMSIdxURLs[$idxWMS]["version"]="1.1.1"; //default
			if(isset($p_externalwms_versions))
			{
				$arrayWMSVersions=explode('|',$p_externalwms_versions);
				foreach($arrayWMSVersions as $key=>$value)
				{
					if(strpos($value,":")!==FALSE)
					{
						$wmsParts=explode(":", $value);
						if(count($wmsParts)>=2)
						{
							$idxWMS=array_shift($wmsParts);
							$urlWMS=implode(":",$wmsParts);
							if(array_key_exists($idxWMS,$arrayWMSIdxURLs ))
							{
								$arrayWMSIdxURLs[$idxWMS]["version"]=$urlWMS;
							}
						}
	
					}
				}
			
			}
			$arrayWMSIdxURLs[$idxWMS]["filter"]="";
			if(isset($p_externalwms_filters))
			{
				$arrayWMSFilters=explode('|',$p_externalwms_filters);
				foreach($arrayWMSFilters as $key=>$value)
				{
					if(strpos($value,":")!==FALSE)
					{
						$wmsParts=explode(":", $value);
						if(count($wmsParts)>=2)
						{
							$idxWMS=array_shift($wmsParts);
							$urlWMS=implode(":",$wmsParts);
							if(array_key_exists($idxWMS,$arrayWMSIdxURLs ))
							{
								$arrayWMSIdxURLs[$idxWMS]["filter"]=$urlWMS;
							}
						}
	
					}
				}
			
			}
					
		}

	}
	return $arrayWMSIdxURLs;
}

function handle_exception_rest($p_arrayExceptions)
{
	$headerText=$_SERVER['SERVER_PROTOCOL']. ' 400 Bad Request';	
			header($headerText,true,"400");
			header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
			foreach($p_arrayExceptions as $msg)	
			print($msg);
			print("\n");

}

//ftheeten 05/11/2013
function find_authority_name_for_projection($p_postgisConn, $p_dest_projection )
{
	$returned=NULL;
	$query='SELECT auth_name, auth_srid FROM spatial_ref_sys WHERE srid=$1;';
	$postgis_result=pg_prepare($p_postgisConn, "stmt1" , $query);
	$postgis_result=pg_execute($p_postgisConn, "stmt1" , array($p_dest_projection));
	$row=pg_fetch_array($postgis_result, NULL, PGSQL_ASSOC);
	if(isset($row))
	{
		$returned=$row["auth_name"].":".$row["auth_srid"];
	}

	return $returned;
}

function convertPointProjection($p_postgisConn, $p_latitude, $p_longitude, $p_src_projection, $p_dest_projection)
{
	$returned=NULL;
	
	
		if(is_numeric($p_latitude)&&is_numeric($p_longitude))
		{
			//vulnérabilité statement non preparé!!!
			$query="SELECT ST_XMAX(ST_TRANSFORM(ST_GEOMFROMTEXT('POINT(".$p_longitude." ".$p_latitude.")',".$p_src_projection."),".$p_dest_projection.")) AS longitude, ST_YMAX(ST_TRANSFORM(ST_GEOMFROMTEXT('POINT(".$p_longitude." ".$p_latitude.")',".$p_src_projection."),".$p_dest_projection.")) AS latitude;";
			

			$postgis_result=pg_query($p_postgisConn,$query);
			$row = pg_fetch_array($postgis_result, NULL, PGSQL_ASSOC);
			{
				if(isset($row))
				{
					$returned=$row['longitude'].",".$row["latitude"];
				
				}
										
			
			}
		}
		
	
	return $returned;
}

function rewrite_styles_aliases($p_styles, $p_infolayers)
{
	/*print("styles=");
	print($p_styles);
	
	print("<br/>\n");
	print("layers=");
	print($p_infolayers);
	print("<br/>\n");*/
				
                                $returned=NULL;

                                $assocStyles=Array();

                                $assocNewStyles=Array();

                                $assocNewLayers=Array();

                                $infosS=explode("|",$p_styles);

								$arrayStylesWithData=Array();
								$arrayStylesWithoutData=Array();
                                foreach($infosS as $infoS)

                                {

                                                $tmpAlias=NULL;

                                                $tmpDetail=NULL;

                                                $sDetails=explode(":", $infoS); 

                                                if(count($sDetails)>1)

                                                {

                                                                $tmpAlias=$sDetails[0];

                                                                $tmpDetails=$sDetails;

                                                                array_shift($tmpDetails);

                                                                $assocStyles[$tmpAlias]=$tmpDetails;

                                                }

                                }

                               

                               

                                $infosL=explode("|",$p_infolayers);

                               

                                foreach($infosL as $infoL)

                                {

                                               

                                                $tmpLayerAlias=NULL;

                                               

                                                $tmpStyleAlias=NULL;

                                                $styleRename=str_replace(":", "___", $infoL);

                                                $lDetails=explode(":", $infoL);  

 

                                                if(count($lDetails)>2)

                                                {

                                                               

                                                                $tmpLayerAlias=$lDetails[0];

                                                                $tmpStyleAlias=$lDetails[2];
																$arrayStylesWithData[$tmpStyleAlias]=$tmpStyleAlias;

                                                                if(array_key_exists($tmpStyleAlias, $assocStyles))

                                                                {

                                                                                $renamedStyleInfo=$styleRename.":".implode(":",$assocStyles[$tmpStyleAlias]);

                                                                                $assocNewStyles[]=$renamedStyleInfo;

                                                                }

                                                                else

                                                                {
									header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
									header("Expires: Sat, 26 Jul 1997 05:00:00 GMT"); // Date dans le passé
                                                                                print("<b>ERROR</b>: undefined style $tmpStyleAlias applied to layer $tmpLayerAlias");          
										return -1;     

                                                                }

                                                                $lDetails[2]=$styleRename;

                                                                $renamedLayerInfo=implode(":", $lDetails);

                                                                $assocNewLayers[]=$renamedLayerInfo;

                                                               

                                                }

                                }

								//print_r($arrayStylesWithData);
                               foreach($assocStyles as $keyStyle=>$dataStyle)
							   {
									//print("key style=");
									//print($keyStyle);
									if(array_key_exists($keyStyle, $arrayStylesWithData)===FALSE)
									{
										//print("key not found");
										/*$tmpStyleKey=Array();
										for($is=0;$is<4;$is++)
										{
											$tmpStyleKey[]=	$keyStyle;
										}*/
										$arrayStylesWithoutData[]=$keyStyle.":".implode(":",$dataStyle);
									}
							   }

                                $returnedStyles=implode("||", $assocNewStyles);
								if(count($arrayStylesWithoutData)>0)
								{
									 $returnedStyles.="||".implode("||", $arrayStylesWithoutData);
								}
								
                                $returnedLayers=implode("||", $assocNewLayers);

                                $returned["styles"]=$returnedStyles;

                                $returned["layers"]=$returnedLayers;

                               

                                return $returned;

                }
				
					//20140624 ftheeten
	function writeSLDForLegend_areas($p_sldSource, $p_title, &$p_alreadyProcessed)
	{
	
		
		$xml =  new SimpleXMLElement($p_sldSource);
		$xml->registerXPathNamespace('xmlns', 'http://www.opengis.net/sld');
		$xml->registerXPathNamespace('xmlns:ogc', 'http://www.opengis.net/ogc');
		$xml->registerXPathNamespace('xmlns:xlink', 'http://www.w3.org/1999/xlink');
		$xml->registerXPathNamespace('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance');
		$xml->registerXPathNamespace('xmlns:wfs', 'http://www.opengis.net/wfs');
		$xml->registerXPathNamespace('xsi:schemaLocation', 'http://www.opengis.net/sld StyledLayerDescriptor.xsd3');			
		$arrayStyleSource=Array();
		$arrayStyleLegend=Array();
		
		$style_rules = $xml->xpath('//Rule/Name');
		
		$titleExploded=explode("|", $p_title);
		foreach($titleExploded as $title)
		{
			
			$titleExploded2=explode(":",$title);
			if(count($titleExploded2)>=2)
			{
				$aliasStyle=array_shift($titleExploded2);
				$tmpTitle=implode(":",$titleExploded2);
				$arrayStyleLegend[$aliasStyle]=$tmpTitle;
			}
		}
		
		while($style_rule = each($style_rules)) 
		{
			$nameRule=$style_rule["value"]->__toString();
			$array_structured_name=explode("___",$nameRule);
			
			if(count($array_structured_name)>=3)
			{
				
				$styleMainName=$array_structured_name[2];
				$filterField=NULL;
				$filterValue=NULL;
				$polygonFill=NULL;
				$polygonOpacity=NULL;
				$strokeLine=NULL;
				$strokeWidth=NULL;
				
				$filterField=$style_rule["value"]->xpath("../ogc:Filter/Or/ogc:PropertyIsEqualTo/ogc:PropertyName|../ogc:Filter/Or/ogc:PropertyIsLike/ogc:PropertyName");
				
				$filterValue=$style_rule["value"]->xpath("../ogc:Filter/Or/ogc:PropertyIsEqualTo/ogc:PropertyName|../ogc:Filter/Or/ogc:PropertyIsLike/ogc:PropertyName");
				$polygonFill=$style_rule["value"]->xpath("../PolygonSymbolizer/Fill/CssParameter[@name=\"fill\"]");
				$polygonOpacity=$style_rule["value"]->xpath("../PolygonSymbolizer/Fill/CssParameter[@name='fill-opacity']");
				$strokeLine=$style_rule["value"]->xpath("../PolygonSymbolizer/Stroke/CssParameter[@name='stroke']");
				$strokeWidth=$style_rule["value"]->xpath("../PolygonSymbolizer/Stroke/CssParameter[@name='stroke-width']");
				if(array_key_exists($styleMainName,$arrayStyleSource)===FALSE)
				{
					$arrayStyleDesc=Array();
					
					if(count($filterField)>0)
					{
						$filterField=$filterField[0]->__toString();
						$arrayStyleDesc["filter_field"]=$filterField;
					}
					if(count($filterValue)>0)
					{
						
						$filterValue=$filterValue[0]->__toString();
						$arrayStyleDesc["filter_value"]=$filterValue;
					}
					if(count($polygonFill)>0)
					{
						$polygonFill=$polygonFill[0]->__toString();
						$arrayStyleDesc["polygon_fill"]=$polygonFill;
					}
					if(count($polygonOpacity)>0)
					{
						$polygonOpacity=$polygonOpacity[0]->__toString();
						$arrayStyleDesc["polygon_opacity"]=$polygonOpacity;
					}
					if(count($strokeLine)>0)
					{
						$strokeLine=$strokeLine[0]->__toString();
						$arrayStyleDesc["stroke_line"]=$strokeLine;
					}
					if(count($strokeWidth)>0)
					{
						$strokeWidth=$strokeWidth[0]->__toString();
						$arrayStyleDesc["stroke_width"]=$strokeWidth;
					}
					$arrayStyleSource[$styleMainName]=$arrayStyleDesc;
				}
				
			}
		}
		
		
		//$xmlBegin="<StyledLayerDescriptor xmlns=\"http://www.opengis.net/sld\" xmlns:ogc=\"http://www.opengis.net/ogc\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:wfs=\"http://www.opengis.net/wfs\" version=\"1.0.0\" xsi:schemaLocation=\"http://www.opengis.net/sld StyledLayerDescriptor.xsd3\"><NamedLayer><Name>topp:cyprusdivs</Name><UserStyle><FeatureTypeStyle>";
		
		$xmlBody="";

		foreach($arrayStyleLegend as $styleName=>$styleTitle)
		{

			if(array_key_exists(htmlspecialchars($arrayStyleLegend[$styleName]),$p_alreadyProcessed)===FALSE)
			{
				if(array_key_exists($styleName,$arrayStyleSource))
				{
					$styleDesc=$arrayStyleSource[$styleName];
					$xmlBody.="<Rule>";
					if(array_key_exists($styleName,$arrayStyleLegend))
					{
						$styleName=htmlspecialchars($arrayStyleLegend[$styleName]);
					}
					$p_alreadyProcessed[$styleName]=true;
					$xmlBody.="<Name>".$styleName."</Name>";
					$xmlBody.="<ogc:Filter>";
					$xmlBody.="<Or>";
					$xmlBody.="<ogc:PropertyIsEqualTo>";
					if(array_key_exists("filter_field", $styleDesc ))
					{
						$xmlBody.="<ogc:PropertyName>".$styleDesc["filter_field"]."</ogc:PropertyName>";
					}
				
					if(array_key_exists("filter_value", $styleDesc ))
					{
						$xmlBody.="<ogc:Literal>".$styleDesc["filter_value"]."</ogc:Literal>";
					}
					$xmlBody.="</ogc:PropertyIsEqualTo>";
					$xmlBody.="</Or>";
					$xmlBody.="</ogc:Filter>";
					$xmlBody.="<PolygonSymbolizer>";
					$xmlBody.="<Fill>";
					if(array_key_exists("polygon_fill", $styleDesc ))
					{
						$xmlBody.="<CssParameter name=\"fill\">".$styleDesc["polygon_fill"]."</CssParameter>";
					}
					if(array_key_exists("polygon_opacity", $styleDesc ))
					{
						$xmlBody.="<CssParameter name=\"fill-opacity\">".$styleDesc["polygon_opacity"]."</CssParameter>";
					}
					$xmlBody.="</Fill>";
					$xmlBody.="<Stroke>";
					if(array_key_exists("stroke_line", $styleDesc ))
					{
						$xmlBody.="<CssParameter name=\"stroke\">".$styleDesc["stroke_line"]."</CssParameter>";
					}
					if(array_key_exists("stroke_width", $styleDesc ))
					{
						$xmlBody.="<CssParameter name=\"stroke-width\">".$styleDesc["stroke_width"]."</CssParameter>";
					}
					$xmlBody.="</Stroke>";
					$xmlBody.="</PolygonSymbolizer>";
					$xmlBody.="</Rule>";

				}
			}
		}
		
		//$xmlEnd="</FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>";
		
		/*$path_to_write=$filePath."/".$fileName;
		$fp=fopen($path_to_write,"w+");
		if($fp===FALSE)
		{
			 print("cannot create file $path_to_write");
		}
		else
		{
			//print("can create file");
		}
		$out=$xmlBegin.$xmlBody.$xmlEnd;
		
		$write=fwrite($fp,$out);
		fclose($fp);
		//print("__EXIT__");*/
		
	
		return $xmlBody;
	}
	
	
	//for consistency with version 1.2_dev
	//ftheeten 20140624
	function autocompleteAreaData($p_areaData)
	{
		//print($p_areaData);
		$p_areaData=str_replace('||', '|', $p_areaData);
		$newStyleArray=Array();
		$arrayAD=explode("|", $p_areaData);
		$i=0;
		$initStyle=Array();
		foreach($arrayAD as $AD)
		{
			$arrayAD2=explode(":",$AD);
			if(count($arrayAD2)==3&&($arrayAD2[0]=="tdwg1"||$arrayAD2[0]=="tdwg2"||$arrayAD2[0]=="tdwg3"||$arrayAD2[0]=="tdwg4"))
			{
				$arrayAD2= array($arrayAD2[0], "code", $arrayAD2[1], $arrayAD2[2]);
				
			}
			//if($i==0&&count($arrayAD2)==4)
			if(count($arrayAD2)==4)
			{
				$initStyle=$arrayAD2;
				
			}
			elseif(count($arrayAD2)<4&&count($initStyle)==4)
			{
				$diff=count($initStyle)-count($arrayAD2);
				for($i2=1;$i2<=$diff;$i2++)
				{
					$elem=$initStyle[3-$i2-1];
					array_unshift($arrayAD2,$elem);
				}
			}
			if($arrayAD2[1]=="tdwg1"||$arrayAD2[1]=="tdwg2"||$arrayAD2[1]=="tdwg3"||$arrayAD2[1]=="tdwg4")
			{
				$arrayAD2[0]=$arrayAD2[1];
				$arrayAD2[1]="code";
			}
			
			$newStyle[]=implode(":",$arrayAD2);
			
			$i++;
		}
		//print("<br/>");
		//print(implode("|",$newStyle));
		return implode("|",$newStyle);
		
	}
	
function calculate_bbox_for_distrib($p_distribData)
	{
		$minLat=NULL;
		$minLong=NULL;
		$maxLong=NULL;
		$maxLat=NULL;
		$subGroups=explode("||",$p_distribData);
		$i=0;
		foreach($subGroups as $key=>$value)
		{
			$dists=explode(":", $value);
			if(isset($dists[1]))
			{
				$geo=explode('|',$dists[1]);
				foreach ($geo as $key=>$value)
				{
							$geos=explode(',',$value);

							if(count($geos)>=2&&strlen($geos[0])>0&&strlen($geos[1])>0)
							{
								$lonTmp=$geos[1];
								$latTmp= $geos[0];
								if($i==0)
								{
									$minLat=$latTmp;
									$minLong=$lonTmp;
									$maxLat=$latTmp;
									$maxLong=$lonTmp;
								}
								else
								{
									if($latTmp<$minLat)
									{
										$minLat=$latTmp;
									}
									if($latTmp>$maxLat)
									{
										$maxLat=$latTmp;
									}
									if($lonTmp<$minLong)
									{
										$minLong=$lonTmp;
									}
									if($lonTmp>$maxLong)
									{
										$maxLong=$lonTmp;
									}
								}
								$i++;
							}
				}
			}
		}
		$returned=NULL;
		if(isset($minLat)&&isset($maxLat)&&isset($minLong)&&isset($maxLong))
		{
			$minLat=$minLat-0.1;
			$maxLat=$maxLat+0.1;
			$minLong=$minLong-0.1;
			$maxLong=$maxLong+0.1;			
			$returned=$minLong.",".$minLat.",".$maxLong.",".$maxLat;
		}
		return $returned;
	}

?>
