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
							$returnedArray[$arrayLayerAndStyle[0]]['type']='wms_style';
						}
						else
						{
							$returnedArray[$arrayLayerAndStyle[0]]['type']='sld';
						}
					}
						
				}	
		}
		
		
		return $returnedArray;
	}


	function color_parser($http_col)
	{
		$col=explode('|',$color);
		$total_symbols=array();
		foreach ($col as $color)
		{//loop1
			//ftheeten 14/03/2011
			if(strpos($color,'http://')===false)
			{
				$color=explode(':',$color);
				$symbols_key=$color[0];
				$symbols_val=$color[1];
			}
			else
			{
				$color=explode(':',$color,2);
				$symbols_key=$color[0];
				$symbols_val=$color[1];
			}


			if (!ereg(",",$symbols_val))
			{
				//only fill area; others are default
					$total_symbols[$symbols_key][]=$symbols_val;	
			}	
			else 
			{
				$s=explode(',',$symbols_val);
				foreach ($s as $k=>$v)
				{
					$total_symbols[$symbols_key][]=$v;	
				}
			}
		
		}//loop1

		foreach ($total_symbols as $k=>$v)
		{//loop2
	
			//foreach 	($total_symbols as $k2=>$v2)
			//echo $total_symbols[$k][0]."<br>";
				//var_dump($total_symbols[$k]);
			//$color="a:d7add2,AOOOOOF,2,dotted|b:ab8dc9F";	

			for ($i=0;$i<5;$i++)
			{//loop2.1
				//echo $total_symbols[$k][$i]."<br>";
				switch ($i)
				{
				case 0:
					//if (array_key_exists($i,$total_symbols[$k])){ 
    					if($total_symbols[$k][$i]=="")
					{
   						$total_symbols[$k][$i]="c5bec0";
					}

				case 1:
		 			if($total_symbols[$k][$i]=="")
					{
						$total_symbols[$k][$i]="10090b";				
					}
				case 2:
			 		if($total_symbols[$k][$i]=="")
					{
						$total_symbols[$k][$i]="0.5";				
					}
				/*	case 3:
						 if($total_symbols[$k][$i]=="")
							{
						$total_symbols[$k][$i]="";				
							}*/
				/*	case 4:
						if($total_symbols[$k][$i]=="")
						{
								$total_symbols[$k][$i]="no_style";
						}*/
				case 3:
					if($total_symbols[$k][$i]=="")
					{
						$total_symbols[$k][$i]="no_style";
					}
				case 4:
					if($total_symbols[$k][$i]=="")
					{
						$total_symbols[$k][$i]="no_label";
					}
	  	  		}//fi switch
			}//loop 2.1
			if (array_key_exists($k,$symbols_url))
			{
				$total_symbols[$k]['5']=$symbols_url[$k]['url'];
				$total_symbols[$k]['6']=$symbols_url[$k]['symbols'];
				$total_symbols[$k]['7']=$symbols_url[$k]['size'];
				$total_symbols[$k]['8']=$symbols_url[$k]['format'];
			}
			
		}//loop2
	}
	

	function($p_arrayLayerStyle, $p_arrayStyleDef)
	{
		$arrayGeneral=array();		
		foreach($p_arrayStyleDef as $name=>$value)
		{
			$content=explode('|', $value);

			foreach ($content as $color)
			{//loop col
				
				$defArray=explode(',', $color);
				if(count($defArray)==1)
				{
					$arrayGeneral[$name]['preloaded_style']=true;
					if(strpos($color,'http://')===false)
					{
						$arrayGeneral[$name]['internalwms']=true;
						$arrayGeneral[$name]['sld']=false;
						$arrayGeneral[$name]['external_value']=$defArray[0];
					}
					else
					{
						$arrayGeneral[$name]['internalwms']=false;
						$arrayGeneral[$name]['sld']=true;
						$arrayGeneral[$name]['external_value']=$defArray[0];
					}
				}
				else
				{
					$arrayGeneral[$name]['preloaded_style']=false;
					if(count($defArray)>=1)
					{
						$arrayGeneral[$name]['color']=$defArray[0];
					}
					if(count($defArray)>=2)
					{
						$arrayGeneral[$name]['border']=$defArray[1];
					}
					if(count($defArray)>=3)
					{
						$arrayGeneral[$name]['opacity']=$defArray[2];
					}
				}
	
					
		
			}//loop col
		}
	}

?>
