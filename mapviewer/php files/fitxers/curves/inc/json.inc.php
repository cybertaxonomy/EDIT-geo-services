<?php

/**
 * Creates JSON ( http://www.json.org/ ) from an ADODB record set
 *
 * @param 		object 		$rs 		- record set object
 * @return 		string		- resulting json string
 * @version 	v1.0  15 October 2007
 * @author 		Tobin Bradley
 * @license 	http://opensource.org/licenses/gpl-license.php GNU Public License
 * @package 	json.inc
 * 
*/
/*
	"rows": [
		"utms": [
			{"label":"xxx", "data": [
							{
							"nobs":"33" , "nregs":"20"
							},
							{
							"nobs":"55" , "nregs":"20"
							}
							]
			}
			]
	           ]
*/

//function to create JSON to feed FLOT in order to create collector's curve

function rs2json_p($rs)
{
	if (!$rs) 
	{
		trigger_error("Caught Exception: bad recordset passed to rs2json function.", E_USER_ERROR);
		return false;
	}

	$output = '';
	$rowOutput = '';
	
	$totalRows = $rs->numrows();
	$output .= '{"total_rows":"' . $totalRows . '",';
	$output .= '"polygon":';
	if($totalRows > 0)
	{
		$d2=1;	
		{
		$output .= '[';
		$XCounter = 1;

		while ($row = $rs->fetchRow())
		{
			$rowOutput .= '{"row":{';			
			$cols=count($row);
	
			foreach ($row as $key => $val)
			{
		
			//	$totalRows++;
				$rowOutput .='"label":"'. trim($val).'",'; 

				$sql="select nreg,spreg from userre where zonereg='$val' and  nobsreg is not NULL and nreg!=0  order by nreg";
							$pgconn = pgConnection();
							$data_rows = $pgconn->Execute($sql);
							$polygon_rows = $data_rows->numrows();
				$rowOutput .='"polygon_rows":"'.$polygon_rows.'",';							
						//	$rowOutput .= '"data":[';
							$dataCounter = 1;
				$rowOutput .='"data":"';
							while ($row2=$data_rows->fetchRow())
							{
							$info=count($row2);									
	$rowOutput .='['.$row2['nreg'].','.$row2['spreg'].']';
							if ($dataCounter != $polygon_rows)
										{
											$rowOutput .=',';
										}
							$dataCounter++;
							} //fi while (nregs...)

			} //fi foreach UTM	
				$rowOutput .='"}}';	
		
				if ($d2 != $totalRows)
							{
								$rowOutput .= ',';
				
							}		
							$d2++;

			}//fi while (polygons)
		}// fi If totalRows>0
		$output .= $rowOutput.']}';
		}
	else 
	{
		$output .= '"row"';
		//$output .= ']';
	}
	
	//For jsonp
	if (isset($_REQUEST['callback']))
	{ 
		$output = $_REQUEST['callback'] . '(' . $output . ')';
	}
	
return $output;
//	var_dump($output);
}



function rs2json($rs)
{
	if (!$rs) {
		trigger_error("Caught Exception: bad recordset passed to rs2json function.", E_USER_ERROR);
		return false;
	}

	$output = '';
	$rowOutput = '';
	
	$totalRows = $rs->numrows();
	$output .= '{"total_rows":"' . $totalRows . '",';
	$output .= '"rows":';
	
//{"total_rows":"5","rows":[{"row":{"zonereg":"29SMC3","nreg":"1"	
	if($totalRows > 0)
	{
		$output .= '[';
		
		$rowCounter = 1;
		while ($row = $rs->fetchRow())
		{
			$rowOutput .= '{"row":{';
			
			$cols = count($row);
			$colCounter = 1;
			foreach ($row as $key => $val)
			{
				$rowOutput .= '"' . $key . '":';
				$rowOutput .= '"' . trim($val) . '"';
				
				if ($colCounter != $cols)
				{
					$rowOutput .= ',';
				}
				$colCounter++;
			}
			
			$rowOutput .= '}}';
			
			if ($rowCounter != $totalRows)
			{
				$rowOutput .= ',';
			}
			$rowCounter++;
		}
		$output .= $rowOutput . ']';
	}
	else 
	{
		$output .= '"row"';
		//$output .= ']';
	}
	
	$output .= '}';
	
	//For jsonp
	if (isset($_REQUEST['callback'])) { 
		$output = $_REQUEST['callback'] . '(' . $output . ')';
	}
	
	return $output;
}

?>
