<?php
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

?>
