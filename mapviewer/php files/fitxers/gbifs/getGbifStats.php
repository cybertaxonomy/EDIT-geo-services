<?php
require ('gChart.php');

function ocurrencesPerCountry() {
    $url = "http://www.gbif.org/DataProviders/totalslist?sortby=records";
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_HEADER, 0);

    ob_start();
    curl_exec ($ch);
    curl_close ($ch);
    $data = ob_get_contents();
    ob_end_clean();

    //clean the HTML
    $data = str_replace("&nbsp;","",$data);

    $dom = new DOMDocument();
    @$dom->loadHTML($data);
    $xpath = new DOMXPath($dom);
    $trs = $xpath->evaluate("/html/body/div/table/tr[6]/td/table/tr/td[2]/table[3]/tr");

    $dataProviders = array();
    $names = array();
    $occurrences = array();
    $providers = array();

    for ($i = 1; $i < $trs->length; $i++) {
        $r = array();
    	$r["name"] = $names[] = $trs->item($i)->getElementsByTagName('td')->item(1)->nodeValue;
    	$r["occurrences"] = $occurrences[] = ((int)str_replace(",","",$trs->item($i)->getElementsByTagName('td')->item(2)->nodeValue)/1000000);
    	$r["providers"] = $providers = $trs->item($i)->getElementsByTagName('td')->item(3)->nodeValue;
        $dataProviders[]=$r;
    }

    //get the rest of countries
    $rest_occ= array_slice($occurrences,6,$occurrences->length);
    $rest_total= array_sum($rest_occ);


    $egChart = new gChart;
    $egChart->type = 6;
    $egChart->height = 115;
    $r1 = array_slice($occurrences,0,5);
    array_push($r1,$rest_total);
    $r2 = array_slice($names,0,5);
    array_push($r2,"other");

    $egChart->values = $r1;
    $egChart->valueLabels = $r2;
    
    return $egChart->getUrl();
}


function countryOcurrencesMapByTaxon($name) {
    $url = "http://portaldev2.gbif.org/countries/speciesSearch?query=".urlencode($name)."&view=json&returnType=counts&geoRefOnly=true";
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    ob_start();
    curl_exec ($ch);
    curl_close ($ch);
    $data = ob_get_contents();
    ob_end_clean();
    $json = json_decode($data,true); 
    if(!$json) {
    	echo("<h2>There is a problem with the json_decode function in PHP</h2>");
    	echo("<h2>$url</h2>");
    	echo("<p>$data</p>");
    	die();
    }
    
    //basic URL
    $churl = "http://chart.apis.google.com/chart?cht=t&chs=300x163&chco=ffffff,edf0d4,13390a&chtm=world&chf=bg,s,EAF7FE";
    
    $country_list="";
    $country_data="";
    foreach($json['Resultset']['Result'] as $country) {
        $country_list.=$country['id'];
        $country_data.=$country['count'].",";
    }
    
    //remove last comma
    $country_data = substr($country_data,0,strlen($country_data)-1);
    
    
    //echo(google_chart_encode($country_data,"s"));
    //die();
    
    $churl .= "&chld=".$country_list;
    
    $churl .= google_chart_encode($country_data,"s");
    
    return $churl;
}



// convert data to Google Chart API's simple, text or extended encoding
// accepts $datastring in the format "1,2,3|4,5,6|7,8,9,10,11" (use "_" for a null data point)
// accepts $method in the format "s" "t" or "e"
// (optional) accepts $axestolabel string in the format "x,y" "x,y,r,t" etc.
// (optional) accepts $min number to set the minimum value on the y-axis
// (optional) accepts $max number to set the maximum value on the y-axis
function google_chart_encode($datastring, $method, $axestolabel="", $min="", $max="") {

	// Google encoding strings
	$simple_encoding = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	$extended_encoding = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.';

	// Google encoding values
	if ($method == "s") {
		// simple encoding
		$data_header .= "&chd=s:";
		$data_delimiter = "";
		$data_setdelimiter = ",";
		$data_missing = "_";
	} else if ($method == "t") {
		// text encoding
		$data_header = "&chd=t:";
		$data_delimiter = ",";
		$data_setdelimiter = "|";
		$data_missing = "_"; // (really is -1, but this looks like real data. will swap it out later)
	} else {
		// extended encoding
		$data_header = "&chd=e:";
		$data_delimiter = "";
		$data_setdelimiter = ",";
		$data_missing = "__";
	}

	// padding settings (leave some room on the yaxis, if no min or max is set)
	if (is_numeric($min) || is_numeric($max)) {
		$valuepadding = 0; // no padding
	} else {
		$valuepadding = 0.05; // pad by 5%, if needed
	}

	// strip everything but numbers and a few special characters
	$datastring = preg_replace("/[^\d\-\.,|_]/", "", $datastring);

	// remove any extra commas
	$datastring = preg_replace("/,+/", ",", $datastring);
	$datastring = trim($datastring, ",");

	// split $datastring into an array of separate strings
	$dataarray = explode("|", $datastring);
	
	// process each string in the array, and find the max length
	for ($i = 0; $i < sizeof($dataarray); $i++) {

		// split string into an array
		$dataarray[$i] = explode(",", $dataarray[$i]);
	
		// find length of each data set
		$localmaxlength[$i] = sizeof($dataarray[$i]);

	}

	if (!is_numeric($min) || !is_numeric($max)) {
		// no max and min values specified

		// split $datastring into an array of numbers for counting purposes
		$countstring = str_replace("_", "", $datastring);
		$countstring = preg_replace("/,+/", ",", $countstring);
		$countarray = explode("|", $countstring);

		// process each number in the array, and find the max and min value
		for ($i = 0; $i < sizeof($countarray); $i++) {
	
			// split string into an array
			$countarray[$i] = explode(",", $countarray[$i]);

			// find max and min values
			$localmaxvalue[$i] = max($countarray[$i]);
			$localminvalue[$i] = min($countarray[$i]);
	
		}
	}

	// determine overall max values
	if (is_numeric($max)) {
		// maximum value set in request
		$maxvalue = $max;
	} else {
		// determine from data
		$maxvalue = max($localmaxvalue);
	}	
	if (is_numeric($min)) {
		// minimum value set in request
		$minvalue = $min;
	} else {
		// determine from data
		$minvalue = min($localminvalue);
	}
	$maxlength = max($localmaxlength);

	// determine the full range of data for all data sets
	if ($minvalue >= 0 && $maxvalue >= 0) {
		// all numbers are positive, so the baseline = 0
		$maxy = $maxvalue + ($maxvalue * $valuepadding); // pad the top
		$miny = 0;
		$yrange = $maxy;
		$yorigin = 0;
	} else if ($minvalue < 0 && $maxvalue < 0) {
		// all numbers are negative, so the topline = 0 and the baseline = $minvalue
		$maxy = 0;
		$miny = $minvalue - ($maxvalue * $valuepadding); // pad the bottom
		$yrange = $miny;
		$yorigin = $minvalue;
	} else {
		// there are some negative numbers, so topline = $maxvalue, baseline = $minvalue
		$maxy = $maxvalue + ($maxvalue * $valuepadding); // pad the top
		$miny = $minvalue - ($maxvalue * $valuepadding); // and the bottom
		$yrange = $maxy + abs($miny);
		$yorigin = abs($miny);
		// because the data is positive and negative, we need to draw a fake x-axis
		$draworigin=true;
	}

	// set up an array to handle the chart data
	$chartdata = array();

	// draw a custom origin if needed
	// (the encoding methods used here are explained in more detail below)
	if ($draworigin) {
		if ($method == "s") {
			// simple encoding
			$ylocation = round((strlen($simple_encoding)-1) * $yorigin / $yrange);
			// add two points to draw the origin
			array_push($chartdata, substr($simple_encoding, $ylocation, 1) . $data_delimiter);
			array_push($chartdata, substr($simple_encoding, $ylocation, 1) . $data_delimiter . $data_setdelimiter);
		} else if ($method == "t") {
			// text encoding
			$ylocation = 100 * $yorigin/ $yrange;
			// add two points to draw the origin
			array_push($chartdata, number_format($ylocation, 1) . $data_delimiter);
			array_push($chartdata, number_format($ylocation, 1) . $data_delimiter . $data_setdelimiter);
		} else {
			// extended encoding
			$ylocation = (4095 * ($yorigin + $currentvalue) / $yrange);
			$firstchar = floor($ylocation / 64);
			$secondchar = $ylocation % 64; // modulus
			$mappedchar = substr($extended_encoding, $firstchar, 1) .  substr($extended_encoding, $secondchar, 1);
			// add two points to draw the origin
			array_push($chartdata, $mappedchar . $data_delimiter);
			array_push($chartdata, $mappedchar . $data_delimiter . $data_setdelimiter);
		}
	}

	// process each data set
	for ($i = 0; $i < sizeof($dataarray); $i++) {

		// process each item in the array
		$thisdataarray = $dataarray[$i];
	
		// zero-pad to match the longest data set
		while (sizeof($thisdataarray) < $maxlength) {
			array_push($thisdataarray, $data_missing);		
		}

		if ($method == "s") {
			// ============= SIMPLE ENCODING =============
		
			// process elements
			for ($j = 0; $j < sizeof($thisdataarray); $j++) {
				$currentvalue = $thisdataarray[$j];
				if (is_numeric($currentvalue)) {

					// map data to $simple_encoding string
					$ylocation = round((strlen($simple_encoding)-1) * ($yorigin + $currentvalue) / $yrange);

					// add point data
					array_push($chartdata, substr($simple_encoding, $ylocation, 1) . $data_delimiter);

				} else {
					// add empty point data
					array_push($chartdata, $data_missing . $data_delimiter);
				}
			}

			// ============= END SIMPLE ENCODING =============
		} else if ($method == "t") {
			// ============= TEXT ENCODING =============
	
			// process elements
			for ($j = 0; $j < sizeof($thisdataarray); $j++) {
				$currentvalue = $thisdataarray[$j];
				if (is_numeric($currentvalue)) {

					// convert data to 0-100 range
					$ylocation = 100 * ($yorigin + $currentvalue) / $yrange;

					// add point data
					array_push($chartdata, number_format($ylocation, 1) . $data_delimiter); // format 0.0,

				} else {
					// add empty point data
					array_push($chartdata, $data_missing . $data_delimiter);
				}
			}
			// ============= END TEXT ENCODING =============
		} else {
			// ============= EXTENDED ENCODING =============
	
			// process elements
			for ($j = 0; $j < sizeof($thisdataarray); $j++) {
				$currentvalue = $thisdataarray[$j];
				if (is_numeric($currentvalue)) {
			
					// convert data to 0-4095 range
					$ylocation = (4095 * ($yorigin + $currentvalue) / $yrange);
				
					// find first character location (round down to integer)
					$firstchar = floor($ylocation / 64);
				
					// find second character location
					$secondchar = $ylocation % 64; // modulus
					
					// find combined location in $extended_encoding string
					$mappedchar = substr($extended_encoding, $firstchar, 1) .  substr($extended_encoding, $secondchar, 1);
		
					// add point data
					array_push($chartdata, $mappedchar . $data_delimiter);

				} else {
					// add empty point data
					array_push($chartdata, $data_missing . $data_delimiter);
				}
			}
			// ============= END EXTENDED ENCODING =============
		}

		// add a set delimiter
		array_push($chartdata, $data_setdelimiter);

	}

	// get chart data and store it in a buffer
	$buffer = implode('', $chartdata);

	// remove any trailing or extra delimiters
	$buffer = rtrim($buffer, $data_setdelimiter);
	$buffer = rtrim($buffer, $data_delimiter);
	$buffer = str_replace(($data_delimiter . $data_setdelimiter), $data_setdelimiter, $buffer);
	
	// fix temporary "_" as missing data
	if ($method == "t") {
		$buffer = str_replace("_", "-1", $buffer);
	}

	// draw chart labels if needed (x,y,r,t)
	$labelbuffer = "";
	if ($axestolabel) {

		$labelbuffer .= "&chxt=" . $axestolabel . "\r";
		$indexid = 0;

		if (strstr($axestolabel, "x")) {
			// label x axis
			$valuebuffer .= $indexid . ",0," . ($maxlength - 1) . "|";
			$indexid++;
		}
		if (strstr($axestolabel, "y")) {
			// label y axis
			$valuebuffer .= $indexid . "," . $miny . "," . $maxy . "|";
			$indexid++;
		}
		if (strstr($axestolabel, "t")) {
			// label top axis
			$valuebuffer .= $indexid . ",0," . ($maxlength - 1) . "|";
			$indexid++;
		}
		if (strstr($axestolabel, "r")) {
			// label right axis
			$valuebuffer .= $indexid . "," . $miny . "," . $maxy . "|";
			$indexid++;
		}
		$valuebuffer = trim($valuebuffer, "|");

		$labelbuffer .= "&chxr=" . $valuebuffer . "\r";
	};

	// return the encoded data
	return $labelbuffer . $data_header . $buffer;
}


?>


