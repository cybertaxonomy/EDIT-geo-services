<?
require 'jsonwrapper.php';
@session_start();
$sessionid=session_id();

function isAjax() {
return (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && 
    ($_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest'));
}
if (!isAjax()) {echo "No AJAX request...";} 
else
{
   $conn = pg_connect(POSTGIS_CS);

   
if (pg_ErrorMessage($conn)) 
{ 
	 echo "<p><b>Ocurrio un error conectando a la base de datos: .</b></p>"; 
	 }
	else 
	{


$user=$_GET['user'];
if (!(session_is_registered($user))) {

session_register($user);
}
else
{
//WE DELETE POINT_POL VALUES!!!!! (IT MUST BE IMPROVED OTHERWISE TWO USERS CANNOT ANALYZE ON THE SAME TIME)
	$sql="delete from point_pol where userid='$user';vacuum analyze point_pol;";
	
	pg_exec ($conn, $sql) or die ("nooo");
	
//	echo $user." has 	YES  been there";
}


$polygon=$_GET['polygon'];

include 'ppol_records.php';
$sxe = simplexml_load_string($xmlstr);
include 'ppol_taxa_records.php';
$taxa_xml = simplexml_load_string($taxa_record);
include 'ppol_genera.php';
$genera_xml = simplexml_load_string($xmlstr_genera);
//$pol=$_GET['param'];
//$user=$_GET['user'];
$sld_num_regs=(rand()%3000)."_num_regs.sld";
$sld_taxa_rec=(rand()%3000)."_taxa_record.sld";
$sld_genera=(rand()%3000)."_genera.sld";

$sld_path=DIR_PLATFORM.'/edit_wp5/geo/sld/';
$regs_path=DIR_PLATFORM.'/edit_wp5/geo/sld/'.$sld_num_regs;
$taxa_xml_path=DIR_PLATFORM.'/edit_wp5/geo/sld/'.$sld_taxa_rec;
$gen_path=DIR_PLATFORM.'/edit_wp5/geo/sld/'.$sld_genera;



    $poligon_sql="DELETE FROM sld10;";


$poligon_sql.="insert into point_pol (userid,code,the_geom,numreg,numtax) select p.userid, poly.code,poly.the_geom, COUNT(p.pk),count(distinct(p.genus)) from user_points p INNER JOIN $polygon poly ON p.userid='$user' and poly.the_geom && p.the_geom and CONTAINS(poly.the_geom,p.the_geom) group by p.userid,poly.code,poly.the_geom";


    pg_exec($poligon_sql) or die ("algun errorrrr poligon_sql11");		
//$update="UPDATE point_pol SET taxa_record = round2(((SELECT (CASE WHEN numtax>0 THEN numtax/numreg ELSE 1 END))),4) where userid='$user'";
$update="UPDATE point_pol SET taxa_record = round2(((SELECT (CASE WHEN numtax>0 THEN numtax/numreg ELSE 1 END))),4) where userid='$user'";
pg_exec($update) or die ("error in update");

$r="select distinct(numreg) from point_pol where userid='$user' order by numreg";
$s="select distinct(numtax) from point_pol where userid='$user' order by numtax";
$tax_rec="select distinct(taxa_record) from point_pol where userid='$user' order by taxa_record";



$postgis_result=pg_exec($r) or die("aixo no va be");
$postgis_result2=pg_exec($s) or die("aixo no va be");
$pg_tax_rec=pg_exec($tax_rec) or die("aixo no va be");
//tax/rec
$numFilas_tax_rec =pg_NumRows($pg_tax_rec);
//records
$numFilas_t =pg_NumRows($postgis_result);
//genus
$numFilas2 =pg_NumRows($postgis_result2);



if ($numFilas_tax_rec<10)
{
$gml = new DOMDocument;

$gml ="<?xml version=\"1.0\" encoding=\"LATIN1\"?>";
$gml.="<gml><total>".$numFilas_tax_rec."</total>";

for($i=0;$i<$numFilas_tax_rec;$i++)
{
	$array = pg_Fetch_Array($pg_tax_rec,$i);
	$gml .="<polygon>";
	$gml .="<order>".$i."</order><tax_rec>".$array[0]."</tax_rec>";
	$gml.="</polygon>";
}
$gml.="</gml>";
//pg_close($conn);
$dom_new = new DOMDocument();
$xsl = new XSLTProcessor;
$xsl->setParameter( '', 'userid', $user);
//if we have very few records we generate a different legend!
if ($numFilas_tax_rec<6)
{

$style = realpath('php_xsl/pp5_tax_rec_SLD.xsl');
}
else 
{
	$style = realpath('php_xsl/pp10_tax_rec_SLD.xsl');
}
$dom_new->load($style);
$xsl->importStyleSheet($dom_new);
$dom_new->loadXML($gml);
$out = $xsl->transformToXML($dom_new);
	$fp=fopen($sld_path.$sld_taxa_rec,"w");
	$write=fwrite($fp,$out);

 }
$v['sld_taxa_rec']=$sld_taxa_rec;	
//over Genus
if ($numFilas2<10)
{
$gml = new DOMDocument;

$gml ="<?xml version=\"1.0\" encoding=\"LATIN1\"?>";
$gml.="<gml><total>".$numFilas2."</total>";

for($i=0;$i<$numFilas2;$i++)
{
	$array = pg_Fetch_Array($postgis_result2,$i);
	$gml .="<polygon>";
	$gml .="<order>".$i."</order><numtax>".$array[0]."</numtax>";
	$gml.="</polygon>";
}
$gml.="</gml>";
//pg_close($conn);
$dom_new = new DOMDocument();
$xsl = new XSLTProcessor;
$xsl->setParameter( '', 'userid', $user);
//if we have very few records we generate a different legend!
if ($numFilas2<6)
{
$style = realpath('php_xsl/pp5_numgenus_SLD.xsl');
}
else 
{
	$style = realpath('php_xsl/pp10_numgenus_SLD.xsl');
}
$dom_new->load($style);
$xsl->importStyleSheet($dom_new);
$dom_new->loadXML($gml);
$out = $xsl->transformToXML($dom_new);

$v['sld_genera']=$sld_genera;


	$fp=fopen($sld_path.$sld_genera,"w");
	$write=fwrite($fp,$out);
 }   
//NOW, THE RECORDS
if ($numFilas_t<10)
{
$gml = new DOMDocument;

$gml ="<?xml version=\"1.0\" encoding=\"LATIN1\"?>";
$gml.="<gml><total>".$numFilas_t."</total>";
for($i=0;$i<$numFilas_t;$i++)
{
	$array = pg_Fetch_Array($postgis_result,$i);
	$gml .="<polygon>";
	$gml .="<order>".$i."</order><numreg>".$array[0]."</numreg>";
	$gml.="</polygon>";
}
$gml.="</gml>";
//pg_close($conn);
$dom_new = new DOMDocument();
$xsl = new XSLTProcessor;
$xsl->setParameter( '', 'userid', $user);
//if we have very few records we generate a different legend!
if ($numFilas<6)
{
$style = realpath('php_xsl/pp5_numreg_SLD.xsl');
}
else 
{
	$style = realpath('php_xsl/pp10_numreg_SLD.xsl');
}
$dom_new->load($style);
$xsl->importStyleSheet($dom_new);
$dom_new->loadXML($gml);
$out = $xsl->transformToXML($dom_new);

$v['sld_num_regs']=$sld_num_regs;
	$fp=fopen($sld_path.$sld_num_regs,"w");
	$write=fwrite($fp,$out);
 }  

else
{
//SLD10 TABLE STORES RANGES (0-10, 10-20....) that will be used on the legend
$poligon_sql3="BEGIN;INSERT INTO sld10 (categoria, userid) VALUES (1, '$user');INSERT INTO sld10 (categoria, userid) VALUES (2, '$user'); INSERT INTO sld10 (categoria, userid) VALUES (3, '$user'); INSERT INTO sld10 (categoria, userid) VALUES (4, '$user'); INSERT INTO sld10 (categoria, userid) VALUES (5, '$user'); INSERT INTO sld10 (categoria, userid) VALUES (6, '$user');INSERT INTO sld10 (categoria, userid) VALUES (7, '$user');INSERT INTO sld10 (categoria, userid) VALUES (8, '$user');  INSERT INTO sld10 (categoria, userid) VALUES (9, '$user'); INSERT INTO sld10 (categoria, userid) VALUES (10, '$user');COMMIT;";	  

//generate MAX and  MINs for GENERA in SLD10 table
$poligon_sql3.="UPDATE ONLY sld10 set max_g = (select max(numtax) from point_pol where userid='$user')*categoria/10 where userid='$user';UPDATE ONLY sld10 set min_g = ((max_g - ((select max (numtax) from point_pol  where userid='$user'))/10)) where categoria = 1 and userid='$user';";

//generate MAX and  MINs for RECORDS in SLD10 table
$poligon_sql3.="UPDATE ONLY sld10 set maximo = (select max(numreg) from point_pol where userid='$user')*categoria/10 where userid='$user';UPDATE ONLY sld10 set minimo = ((maximo - ((select max (numreg) from point_pol  where userid='$user'))/10)) where categoria = 1 and userid='$user';";

pg_exec($poligon_sql3) or die ("algun errorrrr333");
$pol4="UPDATE ONLY sld10 set minimo = ((maximo - ((select max (numreg) from point_pol  where userid='$user'))/10)+1) where categoria != 1 and userid='$user';";

$pol4.="UPDATE ONLY sld10 set min_g = ((max_g - ((select max (numtax) from point_pol  where userid='$user'))/10)+1) where categoria != 1 and userid='$user';";

pg_exec($pol4) or die ("algun errorrrr444");


$sql="select distinct(categoria) from sld10 where userid='$user'";
$postgis_result=pg_query($sql) or die ("algun error");
$numFilas =pg_NumRows($postgis_result);

$low_taxa="select ((max(taxa_record)-min(taxa_record))/10) from point_pol where userid='$user'";
$low_taxa_result=pg_query($low_taxa) or die ("algun errorxu1");
$taxarec = pg_Fetch_Array($low_taxa_result,0);

$min="select min(taxa_record),min(numreg) from point_pol where userid='$user'";
$min_result=pg_query($min) or die ("algun errorxu2");
$minimo = pg_Fetch_Array($min_result,0);



for($z=0;$z<$numFilas;$z++)
{
$result_matriz2 = pg_Fetch_Array($postgis_result,$z);
$categoria=$result_matriz2[0];

$sql_min="select minimo,min_g from sld10 where userid='$user' and categoria=$categoria;";

$sql_min_execute=pg_query($sql_min) or die ("no min");
$sql_min_array = pg_Fetch_Array($sql_min_execute,0);

$sql_max="select maximo,max_g from sld10 where userid='$user' and categoria=$categoria;";

$sql_max_execute=pg_query($sql_max) or die ("no max");
$sql_max_array = pg_Fetch_Array($sql_max_execute,0);

$min_registros=$sql_min_array[0];
$max_registros=$sql_max_array[0];

$min_genera=$sql_min_array[1];
$max_genera=$sql_max_array[1];


$min_max=$min_registros."-".$max_registros;
//CAMBIAR!!!
//$min_max_genera=$min_genera."-".$max_genera;
$min_max_genera=$max_genera."-".$min_genera;

//WE GENERATE THE SLDs, updating XMLs coming from .php with generated SLD10 table values
$sxe->NamedLayer->UserStyle->FeatureTypeStyle->Rule[$z]->Name=$min_max;
//$sxe->NamedLayer->UserStyle->FeatureTypeStyle->Rule[$z]->Name=$min_max;
$sxe->NamedLayer->UserStyle->FeatureTypeStyle->Rule[$z]->Filter->And->PropertyIsEqualTo->Literal=$user;
$sxe->NamedLayer->UserStyle->FeatureTypeStyle->Rule[$z]->Filter->And->PropertyIsGreaterThanOrEqualTo->Literal=$min_registros;
$sxe->NamedLayer->UserStyle->FeatureTypeStyle->Rule[$z]->Filter->And->PropertyIsLessThanOrEqualTo->Literal=$max_registros;

$genera_xml->NamedLayer->UserStyle->FeatureTypeStyle->Rule[$z]->Name=$min_max_genera;
$genera_xml->NamedLayer->UserStyle->FeatureTypeStyle->Rule[$z]->Filter->And->PropertyIsEqualTo->Literal=$user;
$genera_xml->NamedLayer->UserStyle->FeatureTypeStyle->Rule[$z]->Filter->And->PropertyIsGreaterThanOrEqualTo->Literal=$max_genera;
$genera_xml->NamedLayer->UserStyle->FeatureTypeStyle->Rule[$z]->Filter->And->PropertyIsLessThanOrEqualTo->Literal=$min_genera;



$minimo_taxa_record=$minimo[0]+($taxarec[0]*($categoria-1));
$minimo_taxa_record=round($minimo_taxa_record,4);
//echo round($minimo_taxa_record,4)."<br>";

$maximo_taxa_record=$minimo[0]+($taxarec[0]*($categoria));
$maximo_taxa_record=round($maximo_taxa_record,4);
$min_max=$minimo_taxa_record."-".$maximo_taxa_record;
//echo $min_max."for taxa ".$z;

$taxa_xml->NamedLayer->UserStyle->FeatureTypeStyle->Rule[$z]->Filter->And->PropertyIsEqualTo->Literal=$user;
$taxa_xml->NamedLayer->UserStyle->FeatureTypeStyle->Rule[$z]->Filter->And->PropertyIsGreaterThanOrEqualTo->Literal=$minimo_taxa_record;
$taxa_xml->NamedLayer->UserStyle->FeatureTypeStyle->Rule[$z]->Filter->And->PropertyIsLessThanOrEqualTo->Literal=$maximo_taxa_record;
$taxa_xml->NamedLayer->UserStyle->FeatureTypeStyle->Rule[$z]->Name=$min_max;

}

$sxe->NamedLayer->UserStyle->FeatureTypeStyle->Rule[$numFilas]->Filter->PropertyIsEqualTo->Literal=$user;
$taxa_xml->NamedLayer->UserStyle->FeatureTypeStyle->Rule[$numFilas]->Filter->PropertyIsEqualTo->Literal=$user;
$genera_xml->NamedLayer->UserStyle->FeatureTypeStyle->Rule[$numFilas]->Filter->PropertyIsEqualTo->Literal=$user;


$v['sld_num_regs']=$sld_num_regs;


$sxe->asXML($regs_path);

$taxa_xml->asXML($taxa_xml_path);

$genera_xml->asXML($gen_path);

}
$bbox_sql="select extent(the_geom) from (Select distinct code,the_geom from point_pol where userid='$user' limit 15) as x"; 
			$postgis_result=pg_query($bbox_sql);
			while ($row = pg_fetch_array($postgis_result, NULL, PGSQL_ASSOC))
				 {
		$b=substr($row['extent'],4);
		$c=substr($b,0,-1); 
		$bbox=str_replace(' ',',',$c);
		$v['bbox']=$bbox;
				}

echo json_encode($v);
}
}
?>