<?php
$upload_dir = "/var/www/synthesys/www/fitxers/loaded_CSVs/"; // Directory for file storing// Directory for file storing

session_start();
//if some user comes back from edit mapViewer tool to insert again data... don't use the same sessionid! destroy it and create a new one
session_regenerate_id();
$sessionid=session_id();
$userid	= safehtml($_POST['userid']);
session_register("userid");

//these next 3 php files have a Web Map Context (WMC) as a XML string to be modified later (we will add the path to the newly created SLD)
include 'toXML/world.php';
include 'toXML/europe.php';
include 'toXML/iberia_sld.php';
//will be modified in order to insert the path to SLD in mySLD (defaultUrl parameter). It allows to manipulate the SLD easily later (in mapViewer tool)
include 'toXML/config_user.php';

//just a userid filter in a <SLD> in the WMC because EPSG in WMC is not 4326... TODO
include 'toXML/edit_europe_conic.php';
include 'toXML/edit_iberia_utm30.php';

$tf = $upload_dir.'/'.md5(rand()).".test";
$f = @fopen($tf, "w");
if ($f == false) 
    die("Fatal error! {$upload_dir} is not writable. Set 'chmod 777 {$upload_dir}'
        or something like this");
fclose($f);
unlink($tf);

if (isset($_POST['fileframe'])) 
{
    $result = 'ERROR';
    $result_msg = 'No FILE field found';

    if (isset($_FILES['file']))  // file was send from browser
    {
        if ($_FILES['file']['error'] == UPLOAD_ERR_OK)  // no error
        {
		  
            $filename = $_FILES['file']['name']; // file name 
            move_uploaded_file($_FILES['file']['tmp_name'], $upload_dir.'/'.$filename);
            // main action -- move uploaded file to $upload_dir 
            $result = 'OK';
        }
        elseif ($_FILES['file']['error'] == UPLOAD_ERR_INI_SIZE)
            $result_msg = 'The uploaded file exceeds the upload_max_filesize directive in php.ini';
        else 
            $result_msg = 'Unknown error';
    echo '<html><head><title>-</title></head><body>';
    echo '<script language="JavaScript" type="text/javascript">'."\n";
    echo 'var parDoc = window.parent.document;';
    if ($result == 'OK')
    {
        // Simply updating status of fields and submit button
        echo 'parDoc.getElementById("upload_status").value = "file successfully uploaded";';
        echo 'parDoc.getElementById("filename").value = "'.$filename.'";';
        echo 'parDoc.getElementById("filenamei").value = "'.$filename.'";';
        echo 'parDoc.getElementById("upload_button").disabled = false;';
    }
    else
    {
        echo 'parDoc.getElementById("upload_status").value = "ERROR: '.$result_msg.'";';
    }
    echo "\n".'</script></body></html>';   
    exit(); // do not go futher 
}
}
function safehtml($s)
{
    $s=str_replace("&", "&amp;", $s);
    $s=str_replace("<", "&lt;", $s);
    $s=str_replace(">", "&gt;", $s);
    $s=str_replace("'", "&apos;", $s);
    $s=str_replace("\"", "&quot;", $s);
    return $s;
}
if (isset($_POST['userid']) )
{
    $filename = $_POST['filename'];
    $size = filesize($upload_dir.'/'.$filename);
	$total=$upload_dir.'/'.$filename;
    $date = date('r', filemtime($upload_dir.'/'.$filename));
    
	$userid	= safehtml($_POST['userid']);
	
	$lat= safehtml($_POST['lat']);
	$lon= safehtml($_POST['lon']);
	$fields= safehtml($_POST['fields']);
	//we give a name we "know" to the future SLD
	$sld_file=$userid.".sld";	
	$sld_path="http://edit.csic.es/fitxers/sld/$sld_file";
	//load and manipulate config_file
	$config_file=simplexml_load_string($config_xmlstr);
	$config_file->models->StyledLayerDescriptor->defaultModelUrl=$sld_path;
	//update <OnlineResource> to point to SLD path
	$xml_iberia= simplexml_load_string($xmlstr1);
	$xml_iberia->LayerList->Layer[2]->StyleList->Style->SLD->OnlineResource['xlink:href']=$sld_path;

	$xml_world= simplexml_load_string($xmlstr2);
	$xml_world->LayerList->Layer[1]->StyleList->Style->SLD->OnlineResource['xlink:href']=$sld_path;

	$xml_europe= simplexml_load_string($xmlstr3);
	$xml_europe->LayerList->Layer[2]->StyleList->Style->SLD->OnlineResource['xlink:href']=$sld_path;

	//update Literal value (filter by userid)
	$xml_iberia_utm30= simplexml_load_string($xmlstr4);
	$xml_iberia_utm30->LayerList->Layer[9]->StyleList->Style->SLD->StyledLayerDescriptor->NamedLayer->UserStyle->FeatureTypeStyle->Rule->Filter->And->PropertyIsEqualTo->Literal=$userid;

	$xml_europe_conic= simplexml_load_string($xmlstr5);
	$xml_europe_conic->LayerList->Layer[7]->StyleList->Style->SLD->StyledLayerDescriptor->NamedLayer->UserStyle->FeatureTypeStyle->Rule->Filter->And->PropertyIsEqualTo->Literal=$userid;

	//we save these new XML (will be used as WMC files in MapBuilder to get layers)
	$xml_iberia->asXML('XMLs/iberia.xml');
	$config_file->asXML('XMLs/config_user_sld.xml');
	$xml_world->asXML('XMLs/world.xml');
	$xml_europe->asXML('XMLs/europe.xml');
	$xml_iberia_utm30->asXML('XMLs/edit_iberia_utm30.xml');
	$xml_europe_conic->asXML('XMLs/edit_europe_conic.xml');
		
			$conn = pg_connect("host=localhost port=5432 password= user= dbname=");
			if (pg_ErrorMessage($conn)) { 
			echo "<p><b>Ocurrio un error conectando a la base de datos: .</b></p>"; 
			}
			else {
		//edit_import_prova is Franck's Teethen script (RMCA)  modified to insert CSV file 
		//check also edit_import_csvgis (original script) 
		$inserta="SET CLIENT_ENCODING TO 'LATIN1';select * from edit_import_prova ('$total','$fields','$lon','$lat',4326,',','$userid',current_date::timestamp);insert into user_table values ('$userid','$sessionid');";

			pg_exec($inserta) or die ("Some error occurred; is your data format right? Did you fill all the parameters correctly? Does your data have some 'strange' (non LATIN1 encoding) character ??");

			$misql="select distinct(genus) from test_csvimportgispoints2 where userid='$userid'";//family='".$GET['family']."'";
			$postgis_result=pg_exec($misql) or die;
			$numFilas =pg_NumRows($postgis_result);	
    //we will create a new XML file that will be used to be get the user SLD	
	//this SLD has to filters: userid and Genus name  but could be different (classification by species, etc.)
	$gml = new DOMDocument;
	$gml ="<?xml version=\"1.0\" encoding=\"LATIN1\"?>";
	$gml.="<featureType>";
	//for each genus...
	for($i=0;$i<$numFilas;$i++)
	{
	$result_matriz = pg_Fetch_Array($postgis_result,$i);
	$gml .="<genus>";
	$gml .="<name>".$result_matriz[0]."</name>";
	$sql2="select distinct(specie) from test_csvimportgispoints2 where genus='".$result_matriz[0]."' and userid='$userid'";
	$postgis_result2=pg_exec($sql2) or die;
	//how many species for each genus?
	$numFilas2 =pg_NumRows($postgis_result2);
	$gml .="<species>";
	for($z=0;$z<$numFilas2;$z++)
	{
	$result_matriz2 = pg_Fetch_Array($postgis_result2,$z);
	$gml .="<spname>".$result_matriz2[0]."</spname>";
	}
	$gml .="</species>";
	$gml .="</genus>";
	}
	$gml .="</featureType>";
	pg_close($conn);
	//we will create the SLD 
	$dom_new = new DOMDocument();
	$xsl = new XSLTProcessor;
	//userid filtering
	$xsl->setParameter( '', 'user', "$userid");
	$style = realpath('php_xsl/SLDs_php.xsl');
	$dom_new->load($style);
	$xsl->importStyleSheet($dom_new);
	$dom_new->loadXML($gml);
	$out = $xsl->transformToXML($dom_new);
	$sld_path_towrite="/var/www/synthesys/www/fitxers/sld/$sld_file";
	$fp=fopen("$sld_path_towrite","w");
	$write=fwrite($fp,$out);

	if (isset($_POST['selectContext'])) 
	{
	$context=safehtml($_POST['selectContext']);
	
	if ($context=="worldContext")
	{
	$final="edit_user_sld.html?context=world";
	header("Location: http://edit.csic.es/edit_geo/prototype/$final"); 
    exit(); 
	}
	elseif ($context=="europeContext")  {
	$final="edit_user_sld.html?context=europe";
	header("Location: http://edit.csic.es/edit_geo/prototype/$final"); 
    exit(); 
	}
	
	elseif ($context=="iberiaContext")  {
	$final="edit_user_sld.html?context=iberia";
	//header("Location: http://edit3.csic.es/fitxers/borrar_usuari.php"); 
	header("Location: http://edit.csic.es/edit_geo/prototype/$final"); 
    exit(); 
	}	
    // redirect was send, so we're exiting now
	} //Fi IF context			
			} //Fi if connexio database
			} 

?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="content-type"
        content="text/html; charset=utf-8" />
  <meta name="robots"
        content="all" />
  <meta name="generator"
        content="RapidWeaver" />
  <meta name="generatorversion"
        content="3.5.1 (Build 264)" />

  <title>Upload point data file</title>
  <link rel="stylesheet"
        type="text/css"
        media="screen"
        href="rw_common/themes/company/styles.css" />
  <link rel="stylesheet"
        type="text/css"
        media="print"
        href="rw_common/themes/company/print.css" />
  <link rel="stylesheet"
        type="text/css"
        media="handheld"
        href="rw_common/themes/company/handheld.css" />
  <link rel="stylesheet"
        type="text/css"
        media="screen"
        href="rw_common/themes/company/css/styles/orange.css" />
  <link rel="stylesheet"
        type="text/css"
        media="screen"
        href=
        "rw_common/themes/company/css/sidebar/sidebar_right.css" />
<script type="text/javascript"
      src="rw_common/themes/company/javascript.js">
</script>
</head>

<body>

  <div id="topBar"></div>
  <!-- bar that runs along the browser window -->

  <div id="viewingButton">
    <!-- rounded buttong displaying which page you are viewing -->

    <div id="left"></div>

    <div id="text">
      Upload file
    </div>

    <div id="right"></div>
  </div><!-- end viewing button -->

  <div id="container">
    <!-- Start container -->

    <div id="contentContainer">
      <!-- Start main content wrapper -->

      <div id="content">
        <!-- Start content -->
		<h3 align="center">In this site you can upload your point data to visualize in the EDIT mapViewer.</h3>
		<div align="center">	 <br>

    It must be a CSV (comma-separated values) file and have at least latitude and longitude in WGS84 datum and a field (genus, species...) for future filtering and symbolization.  <p>
    The system is currently designed to work with Genus and Species, and these must be the third (and fourth) field in your CSV.    
	You can try to work with other kind of fields, but you must have at least a <strong>third</strong> field in the CSV.
<div>
<p>
<div id="important">
<strong>Important:</strong> <ul style="list-style:square"><li>data will be deleted as soon as you leave the session</li>
							<li  style="width: 340px;">EDIT mapViewer only works completely fine, for the moment, 
												with Firefox 2.0</li>
							<li  style="width: 340px;">You must have javascript enabled!</li>
							</ul>
</div>
							</div>							

		</div>

</p>
        <p>&nbsp;        </p>
        <form action="<?=$PHP_SELF?>" target="upload_iframe" method="post" enctype="multipart/form-data">
<input type="hidden" name="fileframe" value="true">


<!-- Target of the form is set to hidden iframe -->
<!-- From will send its post data to fileframe section of 
     this PHP script (see above) -->
<label for="file">CSV file uploader:</label>
<p>
    <!-- JavaScript is called by OnChange attribute -->
    <input type="file" name="file" id="file" onChange="jsUpload(this)">
</p>

        </form>
<script type="text/javascript">

function jsUpload(upload_field)
{
    // this is just an example of checking file extensions
    // if you do not need extension checking, remove 
    // everything down to line
    // upload_field.form.submit();

    var re_text = /\.txt|\.xml|\.csv/i;
    var filename = upload_field.value;

    /* Checking file type */
    if (filename.search(re_text) == -1)
    {
        alert("File does not have text(txt, xml, zip) extension");
        upload_field.form.reset();
        return false;
    }

    upload_field.form.submit();
    document.getElementById('upload_status').value = "uploading file...";
    upload_field.disabled = true;
    return true;
}
</script>
<iframe name="upload_iframe" style="width: 400px; height: 100px; display: none;">
</iframe>
<p>
  <!-- For debugging purposes, it's often useful to remove
     "display: none" from style="" attribute -->
  
  Upload status:
  <input type="text" name="upload_status" id="upload_status" 
       value="not uploaded" size="44" disabled>
  <br>
  
  File name:
  <input type="text" name="filenamei" id="filenamei" value="none" disabled>
</p>
<form action="<?=$PHP_SELF?>" method="POST">
<!-- one field is "disabled" for displaying-only. Other, hidden one is for 
    sending data -->
<input type="hidden" name="filename" id="filename">
  <label>
  Extent / context
  <select name="selectContext" accesskey="b">
    <option value="worldContext">World</option>
    <option value="europeContext">Europe</option>
    <option value="iberiaContext">Iberian Peninsula</option>
  </select>
    </label>
<br>
<br>
<label>Your userID (name, for example):</label>

<textarea name="userid" cols="10" rows="1"></textarea>
<br>
<label>How many fields does your CSV have?</label>

<textarea rows="1" cols="3" name="fields"></textarea>
<br>
<label>Position of longitude</label>

<textarea rows="1" cols="5" name="lon"></textarea><br>
<label>Position of latitude</label>

<textarea rows="1" cols="3" name="lat"></textarea>
<br>

<br>

<input type="submit" id="upload_button" value="save file" disabled>
</form>
<p><strong>Here you can download an example of a CSV file:</strong></p>
<p><strong> <a href="http://edit3.csic.es/web/page1/Downloads/scarabeidae.csv">	Iberian Scarabaeidae (15143 rows)</a></strong></p>
<p><strong>Number of fields: 5. Position of longitude: 1. Position of latitude: 2. </p>
<div id="author">Data of iberian Scarabaeidae collected by Dr. Jorge Miguel Lobo (Associate Professor of Research at MNCN) from different sources <br>
Contact:  mcnj117@mncn.csic.es</div>
<p><br>
<strong><a href="http://edit3.csic.es/web/page1/Downloads/crocuta.csv">	Download "Crocuta crocuta" CSV (2813 rows)</a>
<p>Number of fields: 2. Position of latitude: 1. Position of longitude: 2.</strong></p>
<div id="author">Data collected by Sara Varela González (phD student at MNCN (Madrid)) mainly from the book "Status survey and conservation action plan. Hyaenas" (IUCN/SSC Hyaena specialist group; Mills, G. & Hofer, H., 1998) and different faunal lists of African Wildlife Parks. <br>
				Contact:  mcnsv707@mncn.csic.es</div>
<br>	
      </div>
      <!-- End content -->

      <div class="clearer"></div>

      <div id="footer">
        <!-- Start Footer -->

        <p>2007 Geoplatform  MNCN  - <a href=
        "mailto:mcnj117@mncn.csic.es">Jorge M. Lobo</a></p>

        <div id="breadcrumbcontainer">
          <!-- Start the breadcrumb wrapper -->

          <ul>
            <li><a href="index.html">Home</a>&nbsp;&gt;&nbsp;</li>
          </ul>
        </div><!-- End breadcrumb -->
      </div><!-- End Footer -->
    </div><!-- End main content wrapper -->

    <div id="sidebarContainer">
      <!-- Start Sidebar wrapper -->

      <div id="pageHeader">
        <!-- Start page header -->

        <div id="highlight"></div>

        <h1>Geoplatform MNCN </h1>

        <h2>MNCN - CSIC </h2>
      </div><!-- End page header -->

      <div id="navcontainer">
        <!-- Start Navigation -->

        <ul>
          <li><a href="index.html"
             rel="self"
             id="current"
             name="current">Home</a></li>
			 
        </ul>
      </div><!-- End navigation -->

      <div class="sideHeader"></div><!-- Sidebar header -->

      <div id="sidebar">
        <!-- Start sidebar content -->

        <br />
        <!-- sidebar content you enter in the page inspector -->
         <!-- sidebar content such as the blog archive links -->
      </div><!-- End sidebar content -->
    </div><!-- End sidebar wrapper -->
  </div><!-- End container -->
</body>
</html>
