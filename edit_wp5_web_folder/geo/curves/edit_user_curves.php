<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">

<html>
<head>
	<script type="text/javascript" src="jsonp_processor.js"></script>
		<script type="text/javascript" src="jquery.js"></script>
		
		<link href="flot/layout.css" rel="stylesheet" type="text/css"></link>		
	    <!--[if IE]><script language="javascript" type="text/javascript" src="flot/excanvas.pack.js"></script><![endif]-->
	    <script language="javascript" type="text/javascript" src="flot/jquery.flot.js"></script>
		
		<?php
		require_once("../../path_index.php");
		$bbox=$_GET['bbox']; 
		$user=$_GET['user']; 
			$sld=$_GET['sld'];
		$layer=$_GET['layer'];
		$layer2=$_GET['layer2'];
		print '
		<script type="text/javascript">

		var x=function()
		{
var user="'.$user.'";
var layer="'.$layer.'";
var layer2="'.$layer2.'";

		

				url = "http://edit.br.fgov.be/edit_wp5/geo/curves/data_user.php?format=json&callback=curves&columns=false&layer="+layer+"&user="+user;


			$.getJSON(url,{geotable:"point_pol"});


		}'
			?>
		</script>
		</head>
		<body  style="background-color:#dfe5ec" onload="x();">
				<? 
				if ($layer=="tax/reg")
				{
					$title="Records/genera for each polygon";
					$text='
					
					<img  src="'.URL_GEOSERVER.'?SERVICE=wms&VERSION=1.1.1&REQUEST=GetMap&SERVICE=WMS&LAYERS=taxa_record&SRS=EPSG:4326&BBOX=-11,35.57,6,44&WIDTH=400&HEIGHT=200&FORMAT=image/png&SLD="'.URL_SITE.'/synthesys/www/fitxers/sld/temp/'.$user.'/analysis/'.$sld.'&TRANSPARENT=TRUE&UNIQUEID="/>
					 
				';

				}
				if ($layer=="numregs")
				{
					$title="Number of records for each polygon";
				$text='
			
				<img  src="'.URL_GEOSERVER.'?SERVICE=wms&VERSION=1.1.1&REQUEST=GetMap&SERVICE=WMS&LAYERS=topp:country_earth,topp:num_regs&SRS=EPSG:4326&BBOX=-11,35.57,6,44&WIDTH=400&HEIGHT=200&FORMAT=image/png&SLD="'.URL_SITE.'/synthesys/www/fitxers/sld/temp/'.$user.'/analysis/'.$sld.'&TRANSPARENT=TRUE&UNIQUEID="/>';				
				}
				if ($layer=="numgenus")
				{
						$title="Number of genera for each polygon";
				$text='
				<img  src="'.URL_GEOSERVER.'?SERVICE=wms&VERSION=1.1.1&REQUEST=GetMap&SERVICE=WMS&LAYERS=topp:country_earth,topp:num_genus&SRS=EPSG:4326&BBOX=-11,35.57,6,44&WIDTH=400&HEIGHT=200&FORMAT=image/png&SLD="'.URL_SITE.'/synthesys/www/fitxers/sld/temp/'.$user.'/analysis/'.$sld.'&TRANSPARENT=TRUE&UNIQUEID="/>';
				}				
				?>
			
						<h1><? echo $title ?></h1>
					<div> Number of records (X axis) / Number of Genera (Y axis)</div>
					    <div style="float:left">
					<div id="placeholder" style="width:620px;height:450px"></div>
						    </div>

				    <div id="miniature" style="float:left;margin-left:20px;margin-top:0px;">

			
					      <div id="overview" style="width:200px;height:150px"></div>

						      <p id="overviewLegend" style="margin-left:10px"></p>
						<div><? print $text ?></div>
					</div>
			
					
													</div>
							<!-->						 <p><input id="clearSelection" type="button" value="Clear selection" />
												       <input id="setSelection" type="button" value="20-40" /></p></div>
						-->
          
					</body>
			</html>
