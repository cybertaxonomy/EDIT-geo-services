<?php

	require_once("./function_rest_gen.php");
	
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

?>
