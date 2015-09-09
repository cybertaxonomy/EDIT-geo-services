<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>
<script type="text/javascript">
	//jQuery.noConflict();

</script>

<script type="text/javascript" src="Highcharts-2.1.6/js/highcharts.js"></script>
<script type="text/javascript" src="Highcharts-2.1.6/js/modules/exporting.js"></script>

 <script type="text/javascript">
		var chart;


		function optionExportChart()
		{
			if($('#hidden_png').length>0)
			{
				if($('#hidden_png').val()=="true")
				{
					chart.exportChart();
				}
			}
		}


		function returnArrayCategories()
		{
			var returnedArray=new Array();
			var flagX=true;
			var i=0;
			var radical="category";
			
			while(flagX==true)
			{
				
				var nameField=radical+'_'+i;
				
				flagX=false;
				if($('#'+nameField).length>0)
				{
					flagX=true;
					var valueCategory=$('#'+nameField).val();
					returnedArray.push(valueCategory);
				}				
				
				
				i++;
			}
			
			return returnedArray;
		}

		function returnArrayValues()
		{
			var returnedArray=new Array();
			var flagX=true;
			var i=0;
			var radical="hidden";
			var radicalLabel="label";
			while(flagX==true)
			{
				
				var nameField=radical+'_'+i+'_0';
				
				flagX=false;
				if($('#'+nameField).length>0)
				{
					flagX=true;
					var valueLabel="";
					var nameLabelField=radicalLabel+'_'+i;
					if($('#'+nameLabelField).length>0)
					{
						valueLabel=$("#"+nameLabelField).val();
					}
					var flagY=true;
					var j=0;
					var arrayBase=new Array();
					while(flagY==true)
					{
						var nameField=radical+'_'+i+'_'+j;
						flagY=false;					
						if($('#'+nameField).length>0)
						{
							flagY=true;
							arrayBase.push(parseFloat($("#"+nameField).val()));
						}
						j++;
					}
					var valueToAdd={name: valueLabel, data: arrayBase};
					returnedArray.push(valueToAdd);
				}				
				
				
				i++;
			}
		
			return returnedArray;
		}
		
		jQuery(document).ready(function() {
			var test_dyna;
			var arrayValues=returnArrayValues();
			var categoryValues=returnArrayCategories();
			var title="";
			var subTitle="";
			var axisX="";
			if($('#hidden_title').length>0)
			{
				title=$('#hidden_title').val();			
			}

			if($('#hidden_subtitle').length>0)
			{
				subtitle=$('#hidden_subtitle').val();
			}

			if($('#hidden_titlex').length>0)
			{
				axisX=$('#hidden_titlex').val();
			}
			chart = new Highcharts.Chart({
				chart: {
					renderTo: 'container',
					defaultSeriesType: 'bar'
				},
				title: {
					text: title
				},
				subtitle: {
					text: subtitle
				},
				xAxis: {
					
					categories:categoryValues,
					returnedArraytitle: {
					text: null
					}
				},
				yAxis: {
					min: 0,
					title: {
						text: axisX,
						align: 'high'
					}
				},
				tooltip: {
					formatter: function() {
						return ''+
							 this.series.name +': '+ this.y +' millions';
					}
				},
				plotOptions: {
					bar: {
						dataLabels: {
							enabled: true
						}
					}
				},
				legend: {
					layout: 'vertical',
					align: 'right',
					verticalAlign: 'top',
					x: -100,
					y: 100,
					floating: true,
					borderWidth: 1,
					//backgroundColor: Highcharts.theme.legendBackgroundColor || '#FFFFFF',
					shadow: true
				},
				credits: {
					enabled: false
				},
	
				series:  arrayValues 
				,
    			//test ftheeten export module
    			exporting: {
       				 enabled: true,
       				 type: 'image/png',
       				 url: 'Highcharts-2.1.6/exporting-server/index.php?'
    				}
			});
			optionExportChart();
			
		});
		

		  
  </script>



		
	</head>
	<body >
		
		<!-- 3. Add the container -->
		<!--<div id="container" style="width: 200px; height: 400px; margin: 0 auto"></div>-->
		
			<div id="container" class="highcharts-container" style="height:410px; margin: 0 2em; clear:both; min-width: 600px">
	</div>
	<input type="hidden" name="hidden_test" id="hidden_test" value="<?php print('1000');?>"/>

	<?php
		
		//data
		$data=$_REQUEST['data'];
		$entries=explode('|',$data);
		$geodata=array();
		$i=0;
		foreach($entries as $key=>$valueX )
		{
			$species=explode(":",$valueX);
			//id of the recordset
			$id=$species[0];
			//geodata of each recordset
			$geo=explode(',',$species[1]);
			$j=0;
			foreach ($geo as $valueY)
			{
				
				$geodata[$id]['value'][]=$valueY;
				$nameField="hidden_".$i."_".$j;		
				print("<input type=\"hidden\" name=\"".$nameField."\" id=\"".$nameField."\" value=\"".$valueY."\">");		
				$j++;
			}
			$i++;
		}
		
		//fieldLabel
		$label=$_REQUEST['labels'];
		$labelElements=explode('|', $label);
		$i=0;
		foreach($labelElements as $value)
		{
			$labelCat=explode(':',$value);
			{
				$category=$labelCat[0];
				$label=$labelCat[1];
				$geodata[$category]['label']=$label;
				$nameField="label_".$i;	
				print("<input type=\"hidden\" name=\"".$nameField."\" id=\"".$nameField."\" value=\"".$label."\">");
				
			}
			$i++;
		}
		//categories
		$categories=$_REQUEST['categories'];
		$catElements=explode('|',$categories);
		$i=0;
		foreach($catElements as $value)
		{
			$nameField="category_".$i;
			print("<input type=\"hidden\" name=\"".$nameField."\" id=\"".$nameField."\" value=\"".$value."\">");
			$i++;
		}

		//mainTitle
		$title=$_REQUEST['title'];
		$nameField="hidden_title";
		print("<input type=\"hidden\" name=\"".$nameField."\" id=\"".$nameField."\" value=\"".$title."\">");
		//SubTitle
		$subtitle=$_REQUEST['subtitle'];
		$nameField="hidden_subtitle";
		print("<input type=\"hidden\" name=\"".$nameField."\" id=\"".$nameField."\" value=\"".$subtitle."\">");

		//AxisX
		$titlex=$_REQUEST['titlex'];
		$nameField="hidden_titlex";
		print("<input type=\"hidden\" name=\"".$nameField."\" id=\"".$nameField."\" value=\"".$titlex."\">");

		//png
		$png=$_REQUEST['png_output'];
		$value="false";
		if(strtolower($png)=="true")
		{
			$value="true";	
		}
		$nameField="hidden_png";	
		print("<input type=\"hidden\" name=\"".$nameField."\" id=\"".$nameField."\" value=\"".$value."\">");
		
	?>

	</body>
</html>
